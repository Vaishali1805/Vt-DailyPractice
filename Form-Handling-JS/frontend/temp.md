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


function validate_form() {
    // Get form fields
    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const inputEmail = document.getElementById("inputEmail");
    const ph_Number = document.getElementById("ph_Number");
    const dateOfBirth = document.getElementById("dateOfBirth");
    const studentId = document.getElementById("studentId");
    const guardianName = document.getElementById("guardianName");

    // Error message fields
    const nameErr_msg = document.getElementById("nameErr_msg");
    const emailError_msg = document.getElementById("emailError_msg");
    const phError_msg = document.getElementById("phError_msg");
    const dobError_msg = document.getElementById("dobError_msg");
    const studentIdError_msg = document.getElementById("studentIdError_msg");
    const guardianError_msg = document.getElementById("guardianError_msg");

    // Regular Expressions
    const EmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const ph_Pattern = /^(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/;

    let isValid = true; // Flag for form validation

    // Helper function to set error messages
    function setError(element, message) {
        element.textContent = message;
        isValid = false;
    }

    // Name Validation
    if (!firstName.value.trim() || !lastName.value.trim()) {
        setError(nameErr_msg, '*First name and last name are required');
    } else if (firstName.value.length < 2 || firstName.value.length > 30 || lastName.value.length < 2 || lastName.value.length > 30) {
        setError(nameErr_msg, '*First and last name must be between 2 and 30 characters');
    } else {
        nameErr_msg.textContent = ""; // Clear error if valid
    }

    // Email Validation
    if (!inputEmail.value.trim()) {
        setError(emailError_msg, '*Email is required');
    } else if (!EmailPattern.test(inputEmail.value)) {
        setError(emailError_msg, '*Invalid email address');
    } else {
        emailError_msg.textContent = "";
    }

    // Phone Number Validation
    if (!ph_Number.value.trim()) {
        setError(phError_msg, '*Contact number is required');
    } else if (!ph_Pattern.test(ph_Number.value)) {
        setError(phError_msg, '*Invalid contact number');
    } else {
        phError_msg.textContent = "";
    }

    // Date of Birth Validation
    if (!dateOfBirth.value || isNaN(Date.parse(dateOfBirth.value))) {
        setError(dobError_msg, '*Invalid date of birth');
    } else {
        dobError_msg.textContent = "";
    }

    // Student ID Validation (Assuming it should be numeric and at least 5 characters)
    if (!studentId.value.trim()) {
        setError(studentIdError_msg, '*Student ID is required');
    } else if (isNaN(studentId.value) || studentId.value.length < 5) {
        setError(studentIdError_msg, '*Invalid Student ID');
    } else {
        studentIdError_msg.textContent = "";
    }

    // Guardian Name Validation
    if (!guardianName.value.trim()) {
        setError(guardianError_msg, '*Guardian name is required');
    } else {
        guardianError_msg.textContent = "";
    }

    return isValid; // Return final validation status
}
