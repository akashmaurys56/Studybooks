import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 1. Firebase Configuration (Apna config yahan paste karein)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_ID",
    appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 2. Add Content to Firestore
const form = document.getElementById('addBookForm');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const data = {
        title: document.getElementById('title').value,
        category: document.getElementById('category').value,
        language: document.getElementById('language').value,
        url: document.getElementById('fileUrl').value,
        timestamp: new Date()
    };

    try {
        await addDoc(collection(db, "studyMaterial"), data);
        alert("Data Saved Successfully!");
        form.reset();
        loadData(); // Table refresh karne ke liye
    } catch (error) {
        console.error("Error adding document: ", error);
    }
});

// 3. Load & Display Data
async function loadData() {
    const querySnapshot = await getDocs(collection(db, "studyMaterial"));
    const tableBody = document.getElementById('contentBody');
    tableBody.innerHTML = "";

    querySnapshot.forEach((docSnap) => {
        const item = docSnap.data();
        const row = `
            <tr>
                <td>${item.title}</td>
                <td>${item.category}</td>
                <td>${item.language}</td>
                <td><button onclick="deleteItem('${docSnap.id}')" class="delete-btn">Delete</button></td>
            </tr>`;
        tableBody.innerHTML += row;
    });
}

// 4. Delete Data
window.deleteItem = async (id) => {
    if(confirm("Are you sure?")) {
        await deleteDoc(doc(db, "studyMaterial", id));
        loadData();
    }
}

// 5. Load Users (Gmail)
async function loadUsers() {
    const userSnapshot = await getDocs(collection(db, "users"));
    const userList = document.getElementById('userList');
    userList.innerHTML = "";
    
    userSnapshot.forEach((u) => {
        const userData = u.data();
        userList.innerHTML += `<li>${userData.email}</li>`;
    });
}

// Initial Load
loadData();
loadUsers();
