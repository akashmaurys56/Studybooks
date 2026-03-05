// Sample Data
const users = [
    { id: 1, name: "Ali Khan", role: "Editor" },
    { id: 2, name: "Sara Ahmed", role: "Admin" },
    { id: 3, name: "Zain Malik", role: "Subscriber" }
];

// 1. Function to Load Table Data
function loadTableData() {
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = ""; // Purana data clear karein

    users.forEach(user => {
        let row = `<tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.role}</td>
            <td><button onclick="deleteUser(${user.id})">Delete</button></td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

// 2. Function to Delete User (Logic)
function deleteUser(id) {
    alert("Deleting user with ID: " + id);
    // Yahan tum API call ya array filtering ka logic daal sakte ho
}

// 3. Navigation Logic
function showSection(sectionName) {
    document.getElementById('page-title').innerText = sectionName.toUpperCase();
    console.log("Switching to: " + sectionName);
    // Yahan tum content change karne ka logic add kar sakte ho
}

// Page load hote hi data dikhao
window.onload = loadTableData;
