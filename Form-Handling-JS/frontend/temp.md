npx live-server --port=5500 --no-browser

add profile pic

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