const rowContainer = document.getElementById("rowContainer");
const selectedIds = new Set();
const userId = getLocalStorageData("userId");
let allUserData;
let isAdmin;

document.getElementById("registerBtn").addEventListener("click", () => {
  redirectToPath("../../auth/register.html");
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
  document.getElementById("mainCheckBox").checked =
    checkBoxes.length && selectedIds.size === checkBoxes.length;
  // console.log("selectedIds: ", selectedIds);
}

function check_uncheck_all() {
  const checkBoxes = document.querySelectorAll(".check");
  const checkAll = document.getElementById("mainCheckBox").checked;
  checkBoxes.forEach((checkbox) => {
    checkbox.checked = checkAll;
    const userId = Number(checkbox.closest("tr").dataset.id);
    checkAll ? selectedIds.add(userId) : selectedIds.delete(userId);
  });
}

document.getElementById("deleteBtn").addEventListener("click", () => handleDelete());

async function getUserData() {
  try {
    checkLoginStatus();
    const url = BASE_URL + routes.getData;
    allUserData = await fetchReq(url, "GET");
    isAdmin = allUserData.find((user) => user.id === userId)?.role === "Admin";
    if (!isAdmin)
      document.getElementById("actionColumn").style.display = "none";
    renderUserRows(allUserData);
  } catch (error) {
    console.log("Error: ", error);
  }
}

function renderUserRows(data) {
  rowContainer.innerHTML = "";
  const filteredData = data.filter((user) => user.id !== userId);
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
            ${!isAdmin
        ? ""
        : `
                <td>
                    <div class="actionImage">
                        <img src='../../assets/icons/edit.svg' class="editIcon" alt="edit-icon" onclick="editStudentData(${user.id})" />
                        <img src='../../assets/icons/delete.svg' class="deleteIcon" alt="delete-icon" onclick="handleDelete(${user.id})" />
                    </div>
                </td>
            `
      }
            `;
    rowContainer.appendChild(newRow);
  });
}

function handleDelete(userId = null) {
  showPopup(
    "Are you sure you want to delete this student?",
    () => deleteStudent(userId),
    () => { } // No specific cancel action needed
  );
}

async function deleteStudent(userId) {
  try {
    let idsToDelete = userId ? [userId] : Array.from(selectedIds);

    const url = BASE_URL + routes.deleteData;
    const data = await fetchReq(url,"POST",JSON.stringify({ userIds: idsToDelete }));
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
  const userData = allUserData.find((user) => user.id === id);
  setLocalStorageData("userData",userData);
  redirectToPath(`../userForm/userForm.html?id=${id}`);
}

function openUserProfile() {
  const userData = allUserData.find((user) => user.id === userId);
  localStorage.setItem("userData", JSON.stringify(userData));
  redirectToPath(`../userForm/userForm.html?id=${userId}`);
}

function handleLogout() {
  showPopup(
    "Are you sure you want to log out?",
    () => {
      localStorage.clear();
      redirectToPath("../../auth/login.html");
    },
    () => { } // No specific cancel action needed
  );
}

function checkLoginStatus() {
  const id = getLocalStorageData('userId');
    if(!id){
        redirectToPath('../../auth/login.html');
    }
}

getUserData();