const studentTable = document.getElementById('studentTable');
const rowContainer = document.getElementById('rowContainer');
const registerBtn = document.getElementById('registerBtn');

registerBtn.addEventListener('click',function() {
    window.location.href = 'form.html';
})

async function getStudentData() {
    try {
        const url = 'http://localhost:5000/get/studentData';
        const response = await fetch(url, {
            method: "GET",
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();
        const { studentData } = data;
        console.log("studentData:", studentData);

        let count = 1;
        studentData.map((obj) => {
            const newRow = document.createElement('tr');

            // Create checkbox cell
            const td = document.createElement('td');
            td.innerHTML = '<input type="checkbox" name="select" class="check">';
            newRow.appendChild(td);

            // Image Preview
            const tdImage = document.createElement('td');
            const fileUrl = obj.profile && obj.profile.path
                ? `http://localhost:5000/${obj.profile.path}`
                : `http://localhost:5000/uploads/${obj.profile}`;      // Use default image if not available

            const img = document.createElement('img');
            img.src = fileUrl;
            img.alt = "Student Profile";
            img.classList.add("userImg");

            tdImage.appendChild(img);
            newRow.appendChild(tdImage);

            //other data cells
            //Without += overwriting the newRow's inner content after appending the checkbox
            newRow.innerHTML += `       
            <td>${count++}</td>
            <td>${obj.firstName !== null ? obj.firstName : "-"}</td>
            <td>${obj.lastName !== null ? obj.lastName : "-"}</td>
            <td>${obj.email !== null ? obj.email : "-"}</td>
            <td>${obj.contactNo !== null ? obj.contactNo : "-"}</td>
            <td>${obj.dateOfBirth !== null ? obj.dateOfBirth : "-"}</td>
            <td>${obj.studentId !== null ? obj.studentId : "-"}</td>
            <td>${obj.gender !== null ? obj.gender : "-"}</td>
            <td>${obj.address !== null ? obj.address : "-"}</td>
            <td>${obj.country !== null ? obj.country : "-"}</td>
            <td>${obj.state !== null ? obj.state : "-"}</td>
            <td>${obj.city !== null ? obj.city : "-"}</td>
            `
            //Edit Icon
            const editTd = document.createElement('td');
            const editImg = document.createElement('img');
            editImg.src = './assets/edit.svg';
            editImg.classList.add('editIcon')
            editTd.appendChild(editImg);
            newRow.appendChild(editTd);

            //Delete Icon
            const deleteTd = document.createElement('td');
            const deleteImg = document.createElement('img');
            deleteImg.src = './assets/delete.svg';
            deleteImg.classList.add('deleteIcon');
            deleteTd.appendChild(deleteImg);
            newRow.appendChild(deleteTd);
            rowContainer.appendChild(newRow);
        })
    } catch (error) {
        console.log("Error: ", error);
    }
}

getStudentData();