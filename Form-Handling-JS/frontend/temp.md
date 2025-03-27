npx live-server --port=5500 --no-browser

add profile pic
also add the delete functionality
implement a condition in the form.js ki jab user edit pe click karke from.html me jaaye data tab hi append ho bss - check karo condition lgake ki page pr kese ja rha hai wo back karke ya redirect karke

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Form to Table</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        }
        #userTable {
            width: 100%;
            border-collapse: collapse;
            display: none;
        }
        #userTable th, #userTable td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
        }
        #userTable th {
            background-color: #f2f2f2;
        }
    </style>
</head>
<body>

    <form id="userForm">
        <label>Name: <input type="text" id="name" required></label><br><br>
        <label>Email: <input type="email" id="email" required></label><br><br>
        <label>Age: <input type="number" id="age" required></label><br><br>
        <button type="submit">Submit</button>
    </form>

    <table id="userTable">
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
            </tr>
        </thead>
        <tbody id="tableBody"></tbody>
    </table>

    <script>
        document.getElementById("userForm").addEventListener("submit", function(event) {
            event.preventDefault(); // Form ka default behavior rokna

            // Form values fetch karna
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const age = document.getElementById("age").value;

            // Table me new row insert karna
            const tableBody = document.getElementById("tableBody");
            const newRow = `<tr><td>${name}</td><td>${email}</td><td>${age}</td></tr>`;
            tableBody.innerHTML = newRow;

            // Form ko hide karna aur table ko show karna
            document.getElementById("userForm").style.display = "none";
            document.getElementById("userTable").style.display = "table";
        });
    </script>
</body>
</html>


// Now add a new row to the table
const tableBody = document.querySelector('#formDataTable tbody');
const newRow = document.createElement('tr');

// Create and append each table cell for the new row
newRow.innerHTML = `
  <td>${firstNameValue}</td>
  <td>${lastNameValue}</td>
  <td>${userEmailValue}</td>
  <td>${phNumberValue}</td>
  <td>${dateOfBirthValue}</td>
  <td>${studentIdValue}</td>
  <td>${genderValue}</td>
  <td>${parentNameValue}</td>
  <td>${parentRelValue}</td>
  <td>${parentContactNoValue}</td>
  <td>${parentEmailValue}</td>
  <td>${streetAddressValue}</td>
  <td>${selectedCountry}</td>
  <td>${selectedState}</td>
  <td>${selectedCity}</td>
`;

// Append the new row to the table body
tableBody.appendChild(newRow);

// Optionally, clear the form after submission
document.querySelector('form').reset();


document.getElementById('myTable').addEventListener('change', (event) => {
    if (event.target.classList.contains('check')) {
        const checkbox = event.target;
        const isChecked = checkbox.checked;
        console.log(`Checkbox ${checkbox.parentElement.parentElement.querySelector('th').innerText} clicked: ${isChecked ? 'Checked' : 'Unchecked'}`);
    }
});



async function getFormData() {
    try {
        const response = await fetch("http://localhost:4500/get/formData", {
            method: "GET",
        });
        const data = await response.json();
        formData = data.formData;
        console.log("data: ", formData);

        let count = 1;

        // general information
        let info = {
            Name: `${formData.firstName} ${formData.lastName}`,
            Email: formData.userEmail,
            ContactNo: formData.contactNo,
            Date_Of_Birth: formData.dateOfBirth,
            Gender: formData.gender,
            StudentId: formData.studentId,
        };

        // Add data to table
        for (const [key, value] of Object.entries(info)) {
            const newRow = document.createElement('tr');
            const td = document.createElement('td');
            td.innerHTML = '<input type="checkbox" name="select" class="check">';
            newRow.innerHTML = `
                <th>${count++}</th>
                <td>${key}</td>
                <td>${value}</td>
            `;
            newRow.appendChild(td);
            personal_info.appendChild(newRow);
        }

        // Parent/Guardian Information
        let parent_obj = {
            parentName: formData.parentName,
            parentRel: formData.parentRel,
            parentContactNo: formData.parentContactNo,
            parentEmail: formData.parentEmail,
        };
        for (const [key, value] of Object.entries(parent_obj)) {
            const newRow = document.createElement('tr');
            const td = document.createElement('td');
            td.innerHTML = '<input type="checkbox" name="select" class="check">';
            newRow.innerHTML = `
                <th>${count++}</th>
                <td>${key}</td>
                <td>${value}</td>
            `;
            newRow.appendChild(td);
            parent_info.appendChild(newRow);
        }

        // Address Information
        let address_obj = {
            Address: formData.address,
            Country: formData.country,
            State: formData.state,
            City: formData.city,
        };
        for (const [key, value] of Object.entries(address_obj)) {
            const newRow = document.createElement('tr');
            const td = document.createElement('td');
            td.innerHTML = '<input type="checkbox" name="select" class="check">';
            newRow.innerHTML = `
                <th>${count++}</th>
                <td>${key}</td>
                <td>${value}</td>
            `;
            newRow.appendChild(td);
            address_info.appendChild(newRow);
        }

        // Now add the event listeners after the table is populated
        const checkBoxes = document.getElementsByClassName('check');
        for (let i = 0; i < checkBoxes.length; i++) {
            checkBoxes[i].addEventListener('change', (event) => {
                const checkbox = event.target;
                const isChecked = checkbox.checked;
                console.log(`Checkbox ${i + 1} clicked: ${isChecked ? 'Checked' : 'Unchecked'}`);
            });
        }

    } catch (error) {
        console.log("Error: ", error);
    }
}



async function getData() {
  let formDataString = localStorage.getItem("formData");

  if (!formDataString) {
    console.log("No data found in localStorage!");
    return;
  }

  let formData;
  try {
    formData = JSON.parse(formDataString);
  } catch (error) {
    console.error("Error parsing JSON from localStorage:", error);
    return;
  }

  console.log("🚀 ~ getData ~ formData:", formData);

  if (formData) {
    firstName.value = formData.FirstName || "";
    lastName.value = formData.LastName || "";
    userEmail.value = formData.Email || "";
    ph_Number.value = formData.ContactNo || "";
    dateOfBirth.value = formData.Date_Of_Birth || "";
    studentId.value = formData.StudentId || "";
    gender.value = formData.Gender || "";
    parentName.value = formData.ParentName || "";
    parentRel.value = formData.ParentRel || "";
    parent_contactNo.value = formData.ParentContactNo || "";
    parent_email.value = formData.ParentEmail || "";
    streetAddress.value = formData.Address || "";

    // Country Select
    await getAllCountries_API(); // API Call
    let countryOption = [...selectCountry.options].find(opt => opt.text === formData.Country);
    if (countryOption) {
      selectCountry.value = countryOption.value;
    }

    //  State Select
    if (formData.Country) {
      let countryObj = JSON.parse(selectCountry.value);
      await getStates_API(countryObj.code); // API Call
      let stateOption = [...selectState.options].find(opt => opt.text === formData.State);
      if (stateOption) {
        selectState.value = stateOption.value;
      }
    }

    // City Select
    if (formData.Country && formData.State) {
      let countryObj = JSON.parse(selectCountry.value);
      let stateObj = JSON.parse(selectState.value);
      await getCities_API(countryObj.code, stateObj.code); // API Call
      let cityOption = [...selectCity.options].find(opt => opt.text === formData.City);
      if (cityOption) {
        selectCity.value = cityOption.value;
      }
    }
  }
}



// Get All Countries API
function getAllCountries_API() {
  fetch("https://api.countrystatecity.in/v1/countries", { 
    headers: { "X-CSCAPI-KEY": api_key } 
  })
    .then((res) => res.json())
    .then((data) => {
      selectCountry.innerHTML = '<option value="">Select Country</option>'; // Default option
      data.forEach((country) => {
        let option = document.createElement("option");
        const obj = { code: country.iso2, name: country.name };
        option.value = JSON.stringify(obj);
        option.textContent = country.name;
        selectCountry.appendChild(option);
      });
    })
    .catch((err) => console.error("Error fetching countries: ", err));
}

// Get States API (with fixed event listener)
function getStates_API(countryCode) {
  fetch(`https://api.countrystatecity.in/v1/countries/${countryCode}/states`, { 
    headers: { "X-CSCAPI-KEY": api_key } 
  })
    .then(res => res.json())
    .then((data) => {
      selectState.innerHTML = '<option value="">Select State</option>';

      if (!data.length) {
        console.warn("No states available");
        return;
      }

      data.forEach((state) => {
        let option = document.createElement("option");
        const obj = { code: state.iso2, name: state.name };
        option.value = JSON.stringify(obj);
        option.textContent = state.name;
        selectState.appendChild(option);
      });
    })
    .catch((err) => console.error("Error fetching states: ", err));
}

// Fix: Remove previous event listeners before adding a new one
selectState.addEventListener("change", function () {
  const obj = JSON.parse(this.value);
  const stateCode = obj?.code;

  if (selectCountry.value && stateCode) {
    const countryObj = JSON.parse(selectCountry.value);
    getCities_API(countryObj.code, stateCode);
  }
});

// Get Cities API
function getCities_API(countryCode, stateCode) {
  console.log(`Fetching cities for Country: ${countryCode}, State: ${stateCode}`);

  fetch(`https://api.countrystatecity.in/v1/countries/${countryCode}/states/${stateCode}/cities`, { 
    headers: { "X-CSCAPI-KEY": api_key } 
  })
    .then(res => res.json())
    .then((data) => {
      selectCity.innerHTML = '<option value="">Select City</option>';
      console.log("Fetched Cities Data: ", data);

      if (!data.length) {
        console.warn("No cities available");
        return;
      }

      data.forEach((city) => {
        let option = document.createElement("option");
        option.value = city.name;  // City name as value
        option.textContent = city.name;
        selectCity.appendChild(option);
      });
    })
    .catch((err) => console.error("Error fetching cities: ", err));
}


