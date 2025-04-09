const studentTable = document.getElementById("studentTable");
const rowContainer = document.getElementById("rowContainer");
const registerBtn = document.getElementById("registerBtn");
const deleteBtn = document.getElementById("deleteBtn");
const mainCheckBox = document.getElementById("mainCheckBox");
const selectedIds = new Set();
let studentData;

deleteBtn.addEventListener("click", () => {
    const popup = document.getElementById("confirmPopup");
    popup.style.display = "flex";

    document.getElementById("confirmDelete").onclick = function () {
        handleBulkDelete();
        popup.style.display = "none"; // Close popup after confirming
    };

    document.getElementById("cancelDelete").onclick = function () {
        popup.style.display = "none"; // Close popup without deleting
    };
});

registerBtn.addEventListener("click", function () {
    window.location.href = "form.html";
});

mainCheckBox.addEventListener("change", check_uncheck_all);

rowContainer.addEventListener("change", (event) => {
    if (event.target && event.target.classList.contains("check")) {
        const checkbox = event.target;
        const studentId = checkbox.closest("tr").dataset.studentId;

        if (checkbox.checked) {
            check(studentId);
        } else {
            uncheck(studentId);
        }
        updateMainCheckbox();
    }
});

async function getStudentData() {
    try {
        const url = "http://localhost:5000/user/get/studentData";
        const response = await fetch(url, {
            method: "GET",
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();
        studentData = data.studentData;
        console.log("studentData:", studentData);
        const {countries,states,cities} = data;
        rowContainer.innerHTML = "";
        let count = 1;

        studentData.map((obj) => {
            const newRow = document.createElement("tr");
            newRow.dataset.studentId = obj.studentId; // Add data attribute for easy access

            // Find name from respective arrays
            const countryName =
                countries.find((c) => c.id == obj.country)?.name || "-";
            const stateName = states.find((s) => s.id == obj.state)?.name || "-";
            const cityName = cities.find((c) => c.id == obj.city)?.name || "-";

            const fileUrl =
                obj.profile && obj.profile.path
                    ? `http://localhost:5000/${obj.profile.path}`
                    : `http://localhost:5000/uploads/${obj.profile}`; // Use default image if not available

            //Without += overwriting the newRow's inner content after appending the checkbox
            newRow.innerHTML += `
            <td><input type="checkbox" name="select" class="check" /></td>
            <td>${count++}</td>
            <td><img src=${fileUrl} class="userImg" alt="user-image" /></td>
            <td>${!obj.firstName ? "-" : obj.firstName}</td>
            <td>${!obj.lastName ? "-" : obj.lastName}</td>
            <td>${!obj.email ? "-" : obj.email}</td>
            <td>${!obj.contactNo ? "-" : obj.contactNo}</td>
            <td>${!obj.dateOfBirth ? "-" : obj.dateOfBirth}</td>
            <td>${!obj.studentId ? "-" : obj.studentId}</td>
            <td>${!obj.gender ? "-" : obj.gender}</td>
            <td>${!obj.address ? "-" : obj.address}</td>
            <td>${!obj.country ? "-" : countryName}</td>
            <td>${!obj.state ? "-" : stateName}</td>
            <td>${!obj.city ? "-" : cityName}</td>
            `;

            const editTd = document.createElement('td');
            const editImg = document.createElement('img');
            editImg.src = '/assets/edit.svg';
            editImg.classList.add("editIcon");
            editImg.alt = 'edit-icon';
            editTd.appendChild(editImg);
            newRow.appendChild(editTd);
            rowContainer.appendChild(newRow);

            const deleteTd = document.createElement('td');
            const deleteImg = document.createElement('img');
            deleteImg.src = '/assets/delete.svg';
            deleteImg.classList.add("deleteIcon");
            deleteImg.alt = 'delete-icon';
            deleteTd.appendChild(deleteImg);
            newRow.appendChild(deleteTd);

            rowContainer.appendChild(newRow);

            deleteImg.addEventListener("click", function () {
                console.log("🚀 ~ obj.studentId:", obj.studentId)
                const popup = document.getElementById("confirmPopup");
                popup.style.display = "flex";

                document.getElementById("confirmDelete").onclick = function () {
                    deleteSingleStudent(obj.studentId);
                    popup.style.display = "none"; // Close popup after confirming
                };

                document.getElementById("cancelDelete").onclick = function () {
                    popup.style.display = "none"; // Close popup without deleting
                };
            });

            editImg.addEventListener("click", function () {
                console.log("🚀 ~ obj.studentId:", obj.studentId)
                editStudentData(obj.studentId);
            });
        });
    } catch (error) {
        console.log("Error: ", error);
    }
}

function check(id) {
    selectedIds.add(id);
}

function uncheck(id) {
    selectedIds.delete(id);
}

function updateMainCheckbox() {
    const checkBoxes = document.getElementsByClassName("check");
    mainCheckBox.checked =
        checkBoxes.length > 0 && selectedIds.size === checkBoxes.length;
}

function check_uncheck_all() {
    const checkBoxes = document.getElementsByClassName("check");
    const isChecked = mainCheckBox.checked;

    for (let checkbox of checkBoxes) {
        checkbox.checked = isChecked;
        const studentId = checkbox.closest("tr").dataset.studentId;
        if (isChecked) {
            selectedIds.add(studentId);
        } else {
            selectedIds.delete(studentId);
        }
    }
    console.log("selectedIds: ", selectedIds);
}

async function deleteSingleStudent(studentId) {
    try {
        const url = "http://localhost:5000/user/delete/studentRecord";
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // body: JSON.stringify(studentId),     // Dont send the id alone
            body: JSON.stringify({ studentId }),
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();
        if (data.success) {
            console.log(data.message);
            getStudentData();
        } else {
            console.log(data.message);
        }
    } catch (error) {
        console.error("Error: ", error);
    }
}

async function handleBulkDelete() {
    try {
        let obj = { selectedIds: Array.from(selectedIds) };
        const url = "http://localhost:5000/user/delete/bulkDelete";
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ obj }),
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();
        if (data.success) {
            console.log(data.message);
            getStudentData();
        } else {
            console.log(data.message);
        }
    } catch (error) {
        console.error("Error: ", error);
    }
}

function editStudentData(studentId) {
    window.location.href = `/form.html?studentId=${studentId}`;
}

getStudentData();
