const table = document.getElementById('myTable');
const personal_info = document.getElementById('personal_info');
const parent_info = document.getElementById('parent_info');
const address_info = document.getElementById('address_info');

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
        const {formData} = data;
        console.log("data: ",formData);

        const {parentName,parentRel,parentContactNo,parentEmail,address,country,state,city,...info} = formData;
        console.log("object: ",info);
        const count = 1;
        console.log("personal_info: ",personal_info);
        for(const [key,value] of Object.entries(info)){
            const newRow = document.createElement('tr');
            // const head = document.createElement('td');
            // head.textContent = count++;
            // const row1 = document.createElement('tr');
            // row1.textContent = key;
            // const row2 = document.createElement('tr');
            // row2.textContent = value;

            newRow.innerHTML = `
            <td>${count}</td>
            <tr>${key}</tr>
            <tr>${value}</tr>
            `;
            personal_info.appendChild(newRow);
        }

    } catch (error) {
        console.log("Error: ", error);
    }
}

getFormData();