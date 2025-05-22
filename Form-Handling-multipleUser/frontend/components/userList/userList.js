const rowContainer = document.getElementById("rowContainer");
const selectedIds = new Set();
const userId = localStorage.getItem('userId');

document.getElementById("registerBtn").addEventListener("click", () => {
    window.location.href = "../../auth/register.html";
});

// Event: Toggle individual checkbox
rowContainer.addEventListener("change", (event) => {
    if (event.target && event.target.classList.contains("check")) {
        const checkbox = event.target;
        const id = Number(checkbox.closest("tr").dataset.id);
        checkbox.checked ? selectedIds.add(id) : selectedIds.delete(id);
        updateMainCheckbox_State();
    }
});

function updateMainCheckbox_State() {
    const checkBoxes = document.getElementsByClassName("check");
    document.getElementById("mainCheckBox").checked = checkBoxes.length > 0 && selectedIds.size === checkBoxes.length;
    console.log("selectedIds: ",selectedIds);
}

document.getElementById("deleteBtn").addEventListener("click", () => handleDelete(null));

async function getUserData() {
    try {
        const url = 'http://localhost:5000/auth/get/userData';
        const data = await fetchReq(url, "GET");
        renderUserRows(data);
    } catch (error) {
        console.log("Error: ", error);
    }
}

function renderUserRows(data) {
    rowContainer.innerHTML = "";
    const filteredData = data.filter(user => user.id != userId);
    console.log("filteredData:", filteredData);
    filteredData.map((user, index) => {
        const newRow = document.createElement("tr");
        newRow.dataset.id = user.id;
        newRow.innerHTML += `
            <td><input type="checkbox" name="select" class="check"/></td>
            <td>${index + 1}</td>
            <td>${user.name || "-"}</td>
            <td>${user.email || "-"}</td>
            <td>${user.role || "-"}</td>
            <td><div class="actionImage">
            <img src='../../assets/icons/edit.svg' class="editIcon" alt="edit-icon" onclick="editStudentData(${user.id})" /><img src='../../assets/icons/delete.svg' class="deleteIcon" alt="delete-icon" onclick="handleDelete(${user.id})" /></div></td>
            `;
        rowContainer.appendChild(newRow);
    })
}

function handleDelete(userId = null) {
    const popup = document.getElementById("confirmPopup");
    popup.style.display = "flex";

    document.getElementById("confirmDelete").onclick = function () {
        deleteStudent(userId);
        popup.style.display = "none"; // Close popup after confirming
    };

    document.getElementById("cancelDelete").onclick = function () {
        popup.style.display = "none"; // Close popup without deleting
    };
}

async function deleteStudent(userId) {
    try {
        let idsToDelete = userId ? [userId] : Array.from(selectedIds);

        const url = "http://localhost:5000/auth/delete/userData";
        const data = await fetchReq(url,"POST", JSON.stringify({ userIds : idsToDelete }));
        if (data.success) {
            getUserData();
            if (!userId) selectedIds.clear();
        }
    } catch (error) {
        console.error("Error: ", error);
    }
}

// Navigate to edit form
function editStudentData(id) {
    window.location.href = `../userForm/userForm.html?id=${id}`;
}

getUserData();