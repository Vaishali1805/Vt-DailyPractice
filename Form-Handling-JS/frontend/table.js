const table = document.getElementById('myTable');
const general_info = document.getElementById('general_info');
// const personal_info = document.getElementById('personal_info');
// const parent_info = document.getElementById('parent_info');
// const address_info = document.getElementById('address_info');
const edit_btn = document.getElementById('edit_btn');
const delete_btn = document.getElementById('delete_btn');
const mainCheckBox = document.querySelector('.mainCheckBox');

edit_btn.addEventListener('click', handleEdit);
delete_btn.addEventListener('click', deleteFields);
mainCheckBox.addEventListener('change', check_uncheck_all);

let formData = {};
let fileData = {};
let selectedFields = new Set();

function handleEdit() {
    console.log("handleEdit");
    console.log("formData: ", formData);
    localStorage.setItem("formData", JSON.stringify(formData));
    window.location.href = '/form.html?type=4'
    // window.location.href = `/form.html?formData=${JSON.stringify(formData)}`;        //Not a good approach
}

//Get the data and show it in a table
async function getFormData() {
    try {
        const response = await fetch("http://localhost:4500/get/formData", {
            method: "GET",
        });
        // if (!response.ok) {
        //     throw new Error(`Response status: ${response.status}`);
        // }
        const data = await response.json();
        // const {formData} = data;
        formData = data.formData;
        fileData = data.fileData;
        console.log("fileData: ", fileData);

        general_info.textContent = "";
        let count = 1;

        // http://localhost:3500/uploads\singleUploads\1743078963892_gabriel-lebel-bernier-singles2.jpg
        // http://localhost:4500/uploads\1743079391781_pexels-matthew-montrone-230847-1324803.jpg
        
        //profile picture
        console.log("fileData.path: ",fileData.path);
        const fileUrl = `http://localhost:4500/${fileData.path}`;
        console.log("fileUrl: ",fileUrl);

        // const url = fileUrl.replace(/\\/g, "/");
        // console.log("fileUrl:------------------ ",url);

        const newRow = document.createElement('tr');
        const td = document.createElement('td');
        td.innerHTML = '<input type="checkbox" name="select" class="check">'

        newRow.innerHTML = `
            <th>${count++}</th>
            <td>${`Profile Picture`}</td>
            `;
        const imageContainer = document.createElement('td');
        const img = document.createElement('img');
        img.src = fileUrl;
        img.alt = 'userImage';
        img.classList.add("userImg")
        imageContainer.appendChild(img);
        newRow.appendChild(imageContainer);
        newRow.appendChild(td);
        general_info.appendChild(newRow);

        //other form fields
        for (const [key, value] of Object.entries(formData)) {
            const newRow = document.createElement('tr');
            const td = document.createElement('td');
            td.innerHTML = '<input type="checkbox" name="select" class="check">'

            newRow.innerHTML = `
            <th>${count++}</th>
            <td>${key}</td>
            <td>${value}</td>
            `;
            newRow.appendChild(td);
            general_info.appendChild(newRow);
        }

        // //general information
        // // let {parentName,parentRel,parentContactNo,parentEmail,address,country,state,city,...info} = formData;
        // let info = {
        //     Name: `${formData.firstName} ${formData.lastName}`,
        //     Email: formData.Email,
        //     ContactNo: formData.ContactNo,
        //     Date_Of_Birth: formData.Date_Of_Birth,
        //     Gender: formData.Gender,
        //     StudentId: formData.StudentId,
        // }
        // for (const [key, value] of Object.entries(info)) {
        //     const newRow = document.createElement('tr');
        // const td = document.createElement('td');
        // td.innerHTML = '<input type="checkbox" name="select" class="check">'

        // newRow.innerHTML = `
        // <th>${count++}</th>
        // <td>${key}</td>
        // <td>${value}</td>
        // `;
        // newRow.appendChild(td);
        // personal_info.appendChild(newRow);
        // }

        // //Parent/Guardian Information
        // let parent_obj = {
        //     ParentName: formData.ParentName,
        //     ParentRel: formData.ParentRel,
        //     ParentContactNo: formData.ParentContactNo,
        //     ParentEmail: formData.ParentEmail,
        // }
        // for (const [key, value] of Object.entries(parent_obj)) {
        //     const newRow = document.createElement('tr');
        //     const td = document.createElement('td');
        //     td.innerHTML = '<input type="checkbox" name="select" class="check">'
        //     newRow.innerHTML = `
        //     <th>${count++}</th>
        //     <td>${key}</td>
        //     <td>${value}</td>
        //     `;
        //     newRow.appendChild(td);
        //     parent_info.appendChild(newRow);
        // }

        // //Address Information
        // let address_obj = {
        //     Address: formData.Address,
        //     Country: formData.Country,
        //     State: formData.State,
        //     City: formData.City,
        // }
        // for (const [key, value] of Object.entries(address_obj)) {
        //     const newRow = document.createElement('tr');
        //     const td = document.createElement('td');
        //     td.innerHTML = '<input type="checkbox" name="select" class="check">'
        //     newRow.innerHTML = `
        //     <th>${count++}</th>
        //     <td>${key}</td>
        //     <td>${value}</td>
        //     `;
        //     newRow.appendChild(td);
        //     address_info.appendChild(newRow);
        // }

        const checkBoxes = document.getElementsByClassName('check');
        const rows = document.getElementsByTagName('tr');

        for (let i = 0; i < checkBoxes.length; i++) {
            checkBoxes[i].addEventListener('change', (event) => {
                const checkbox = event.target;
                let index = i + 1;
                // if (index >= 7 && index <= 10)
                //     index += 1;
                // else if (index >= 11 && index <= 14)
                //     index += 2;

                let childArray = Array.from(rows[index].children);
                let key = childArray[1].textContent;
                const isChecked = checkbox.checked;
                // console.log(`Checkbox ${i + 1} clicked: ${isChecked ? 'Checked' : 'Unchecked'}`);
                if (isChecked) {
                    check(key)
                }
                else {
                    unCheck(key);
                }
                updateMainCheckbox()
            });
        }
    } catch (error) {
        console.log("Error: ", error);
    }
}

function check(key) {
    selectedFields.add(key);
    // console.log("selectedFields: ", selectedFields);
}

function unCheck(key) {
    selectedFields.delete(key);
    // console.log("selectedFields: ", selectedFields);
}

function updateMainCheckbox() {
    const checkBoxes = document.getElementsByClassName('check');
    // console.log("checkBoxes: ",checkBoxes)
    mainCheckBox.checked = checkBoxes.length > 0 && selectedFields.size === checkBoxes.length;
}

function check_uncheck_all() {
    const checkBoxes = document.getElementsByClassName('check');
    if (this.checked) {
        for (let i = 0; i < checkBoxes.length; i++) {
            checkBoxes[i].checked = true;
        }
        for (key in formData) {
            selectedFields.add(key);
        }
        // console.log("selectedFields: ", selectedFields);
    } else {
        for (let i = 0; i < checkBoxes.length; i++) {
            checkBoxes[i].checked = false;
        }
        selectedFields.clear();
        // console.log("selectedFields: ", selectedFields);
    }
}

async function deleteFields() {
    try {
        let obj = { selectedFields: Array.from(selectedFields) };
        // console.log("obj: ", obj);
        const response = await fetch('http://localhost:4500/delete/formData', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ obj }),
        });
        const data = await response.json();
        console.log("message:", data.message)
        getFormData();

    } catch (error) {
        console.log("Error: ", error);
    }
}

getFormData();