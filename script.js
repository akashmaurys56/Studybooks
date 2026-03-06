let navigationStack = [];
let currentPage = { type: "sections" };

const content = document.getElementById("content");

function renderPage() {

if (currentPage.type === "sections") {
loadSections();
}

if (currentPage.type === "classes") {
loadClasses(currentPage.sectionId);
}

if (currentPage.type === "subjects") {
loadSubjects(currentPage.sectionId, currentPage.classId);
}

if (currentPage.type === "chapters") {
loadChapters(currentPage.sectionId, currentPage.classId, currentPage.subjectId);
}

}







/* ================= SECTIONS ================= */

async function loadSections(){

document.getElementById("pageTitle").innerText = "Sections";

let html = `<div class="grid">`;

const snapshot = await db.collection("sections").get();

snapshot.forEach(doc => {

const data = doc.data();

html += `
<div class="card"
onclick="openSection('${doc.id}','${data.name}')">
${data.name}
</div>
`;

});

html += `</div>`;

content.innerHTML = html;

}





function openSection(sectionId,sectionName){

navigationStack.push({...currentPage});

currentPage={
type:"classes",
sectionId
};

document.getElementById("pageTitle").innerText = sectionName;

renderPage();

}







/* ================= CLASSES ================= */

async function loadClasses(sectionId){

let html = `<div class="grid">`;

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

html += `</div>`;

content.innerHTML = html;

}




function openClass(sectionId,classId,className){

navigationStack.push({...currentPage});

currentPage={
type:"subjects",
sectionId,
classId
};

document.getElementById("pageTitle").innerText = className;

renderPage();

}







/* ================= SUBJECTS ================= */

async function loadSubjects(sectionId,classId){

let html = `<div class="grid">`;

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

html += `</div>`;

content.innerHTML = html;

}





function openSubject(sectionId,classId,subjectId,subjectName){

navigationStack.push({...currentPage});

currentPage={
type:"chapters",
sectionId,
classId,
subjectId
};

document.getElementById("pageTitle").innerText = subjectName;

renderPage();

}








/* ================= CHAPTERS ================= */

async function loadChapters(sectionId,classId,subjectId){

let html = `<div class="grid">`;

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

html += `</div>`;

content.innerHTML = html;

}







/* ================= BACK ================= */

function goBack(){

if(navigationStack.length > 0){

currentPage = navigationStack.pop();

renderPage();

}

}







/* ================= START ================= */

renderPage();