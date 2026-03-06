firebase.auth().onAuthStateChanged(function(user){

if(user){

// user logged in
console.log("User logged in");

}else{

// not logged in
window.location.href="login.html";

}

});

let navigationStack = [];
let currentPage = { type: "home" };

const ADMIN_EMAIL = "mauryaumesh195@gmail.com";


/* ================= MENU ================= */

function toggleMenu() {

const menu = document.getElementById("sideMenu");

if(menu.style.left === "0px"){
menu.style.left = "-220px";
}else{
menu.style.left = "0px";
}

}

function closeMenu(){
document.getElementById("sideMenu").style.left = "-220px";
}

function setDarkMode(){
document.body.classList.add("dark");
closeMenu();
}

function setLightMode(){
document.body.classList.remove("dark");
closeMenu();
}

function logout(){

firebase.auth().signOut().then(()=>{

window.location.href="login.html";

});

}

/* ================= HOME ================= */

async function loadHome(){

currentPage = { type:"home" };

document.getElementById("pageTitle").innerText = "StudyBooks";

document.querySelector(".menu-btn").style.display = "flex";
document.getElementById("backBtn").style.display = "none";

let html = "<div class='grid'>";

const snapshot = await db.collection("sections").get();

snapshot.forEach(doc => {

const data = doc.data();
const sectionName = data.name || "No Name";

html += `
<div class="card"
onclick="openSection('${doc.id}','${sectionName}')">

<span class="icon material-icons">menu_book</span>

${sectionName}

</div>
`;

});

html += "</div>";

document.getElementById("content").innerHTML = html;

}


/* ================= SECTION ================= */

async function openSection(sectionId,sectionName,save=true){

if(save){
navigationStack.push({...currentPage});
}

currentPage={
type:"section",
sectionId,
sectionName
};

document.getElementById("pageTitle").innerText = sectionName;

document.querySelector(".menu-btn").style.display = "none";
document.getElementById("backBtn").style.display = "flex";

closeMenu();

let html="<div class='grid'>";

const snapshot = await db.collection("sections")
.doc(sectionId)
.collection("classes")
.get();

snapshot.forEach(doc => {

const data = doc.data();

html += `
<div class="card"
onclick="openClass('${sectionId}','${doc.id}','${data.name}')">
${data.name}
</div>
`;

});

html+="</div>";

document.getElementById("content").innerHTML = html;

}


/* ================= CLASS ================= */

async function openClass(sectionId,classId,className,save=true){

if(save){
navigationStack.push({...currentPage});
}

currentPage={
type:"class",
sectionId,
classId,
className
};

document.getElementById("pageTitle").innerText = className;

let html="<div class='grid'>";

const snapshot = await db.collection("sections")
.doc(sectionId)
.collection("classes")
.doc(classId)
.collection("subjects")
.get();

snapshot.forEach(doc => {

const data = doc.data();

html += `
<div class="card"
onclick="openSubject('${sectionId}','${classId}','${doc.id}','${data.name}')">
${data.name}
</div>
`;

});

html+="</div>";

document.getElementById("content").innerHTML = html;

}


/* ================= SUBJECT ================= */

async function openSubject(sectionId,classId,subjectId,subjectName,save=true){

if(save){
navigationStack.push({...currentPage});
}

currentPage={
type:"subject",
sectionId,
classId,
subjectId,
subjectName
};

document.getElementById("pageTitle").innerText = subjectName;

let html = "<div class='grid'>";

const snapshot = await db.collection("sections")
.doc(sectionId)
.collection("classes")
.doc(classId)
.collection("subjects")
.doc(subjectId)
.collection("chapters")
.get();

snapshot.forEach(doc => {

const data = doc.data();

html += `
<div class="card">
${data.name}
</div>
`;

});

html += "</div>";

document.getElementById("content").innerHTML = html;

/* ================= BACK ================= */

function goBack(){

if(navigationStack.length > 0){

currentPage = navigationStack.pop();
renderPage();

}else{

loadHome();

}

}


/* ================= RENDER ================= */

async function renderPage(){

if(currentPage.type==="home"){
loadHome();
}

if(currentPage.type==="section"){
openSection(currentPage.sectionId,currentPage.sectionName,false);
}

if(currentPage.type==="class"){
openClass(
currentPage.sectionId,
currentPage.classId,
currentPage.className,
false
);
}

if(currentPage.type==="subject"){
openSubject(
currentPage.sectionId,
currentPage.classId,
currentPage.subjectId,
currentPage.subjectName,
false
);
}

}

function checkLogin(){

const email = localStorage.getItem("userEmail");

if(!email){

window.location.href = "login.html";
return;

}

if(email === ADMIN_EMAIL){

document.body.classList.add("admin");

}

}

function logout(){

firebase.auth().signOut().then(()=>{

window.location.href="login.html";

});

}

function openAdmin(){

document.getElementById("pageTitle").innerText = "Admin Panel";

document.getElementById("content").innerHTML = `

<div class="grid">

<div class="card" onclick="showAddSection()">
<span class="material-icons">add</span>
Add Section
</div>

</div>

`;

}

function showAddSection(){

document.getElementById("pageTitle").innerText = "Add Section";

document.getElementById("content").innerHTML = `

<input id="sectionName" placeholder="Section Name">

<button onclick="addSection()">Add Section</button>

`;

}

function addSection(){

const name = document.getElementById("sectionName").value;

if(!name){
alert("Enter section name");
return;
}

db.collection("sections").add({

name:name

}).then(()=>{

alert("Section Added");

loadHome();

});

} 





/* ================= START ================= */

checkLogin();

function readOnline(name){

let file = name.toLowerCase().replace(/ /g,"");

let url =
"https://akashmaurys56.github.io/Studybooks/pdf/class9/science/" + file + ".pdf";

window.location.href = "pdf-reader.html?file=" + url;

}

function downloadPDF(name){

let file = name.toLowerCase().replace(/ /g,"");

let url =
"https://akashmaurys56.github.io/Studybooks/pdf/class9/science/" + file + ".pdf";

let a = document.createElement("a");

a.href = url;
a.download = file;
a.click();

}