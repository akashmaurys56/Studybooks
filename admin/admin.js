

// Firebase DB
const db = firebase.firestore();


// ---------------- POPUP CONTROL ----------------

function closeAllPopups(){
document.getElementById("sectionPopup").style.display="none";
document.getElementById("classPopup").style.display="none";
document.getElementById("subjectPopup").style.display="none";
document.getElementById("chapterPopup").style.display="none";
}


// ---------------- ADD SECTION ----------------

function addSection(){
closeAllPopups();
document.getElementById("sectionPopup").style.display="flex";
}

function saveSection(){

let name=document.getElementById("sectionInput").value;

if(name===""){
alert("Enter Section Name");
return;
}

db.collection("sections").add({
name:name
}).then(()=>{
alert("Section Added");
closeAllPopups();
});

}



// ---------------- LOAD SECTIONS ----------------

function loadSections(selectId){

let select=document.getElementById(selectId);

select.innerHTML="";

db.collection("sections").get().then((snapshot)=>{

snapshot.forEach((doc)=>{

let option=document.createElement("option");
option.value=doc.id;
option.text=doc.data().name;

select.appendChild(option);

});

});

}



// ---------------- ADD CLASS ----------------

function addClass(){

closeAllPopups();

document.getElementById("classPopup").style.display="flex";

loadSections("classSectionSelect");

}

function saveClass(){

let sectionId=document.getElementById("classSectionSelect").value;

let name=document.getElementById("classInput").value;

if(name===""){
alert("Enter Class Name");
return;
}

db.collection("classes").add({
name:name,
sectionId:sectionId
}).then(()=>{
alert("Class Added");
closeAllPopups();
});

}



// ---------------- LOAD CLASSES ----------------

function loadClasses(sectionId,selectId){

let select=document.getElementById(selectId);

select.innerHTML="";

db.collection("classes")
.where("sectionId","==",sectionId)
.get()
.then((snapshot)=>{

snapshot.forEach((doc)=>{

let option=document.createElement("option");
option.value=doc.id;
option.text=doc.data().name;

select.appendChild(option);

});

});

}



// ---------------- ADD SUBJECT ----------------

function addSubject(){

closeAllPopups();

document.getElementById("subjectPopup").style.display="flex";

loadSections("subjectSectionSelect");

}

document.getElementById("subjectSectionSelect").onchange=function(){

loadClasses(this.value,"subjectClassSelect");

};


function saveSubject(){

let sectionId=document.getElementById("subjectSectionSelect").value;

let classId=document.getElementById("subjectClassSelect").value;

let name=document.getElementById("subjectInput").value;

if(name===""){
alert("Enter Subject Name");
return;
}

db.collection("subjects").add({
name:name,
sectionId:sectionId,
classId:classId
}).then(()=>{
alert("Subject Added");
closeAllPopups();
});

}



// ---------------- LOAD SUBJECTS ----------------

function loadSubjects(classId,selectId){

let select=document.getElementById(selectId);

select.innerHTML="";

db.collection("subjects")
.where("classId","==",classId)
.get()
.then((snapshot)=>{

snapshot.forEach((doc)=>{

let option=document.createElement("option");
option.value=doc.id;
option.text=doc.data().name;

select.appendChild(option);

});

});

}



// ---------------- ADD CHAPTER ----------------

function addChapter(){

closeAllPopups();

document.getElementById("chapterPopup").style.display="flex";

loadSections("chapterSectionSelect");

}


document.getElementById("chapterSectionSelect").onchange=function(){

loadClasses(this.value,"chapterClassSelect");

};


document.getElementById("chapterClassSelect").onchange=function(){

loadSubjects(this.value,"chapterSubjectSelect");

};


function saveChapter(){

let sectionId=document.getElementById("chapterSectionSelect").value;

let classId=document.getElementById("chapterClassSelect").value;

let subjectId=document.getElementById("chapterSubjectSelect").value;

let name=document.getElementById("chapterInput").value;

if(name===""){
alert("Enter Chapter Name");
return;
}

db.collection("chapters").add({
name:name,
sectionId:sectionId,
classId:classId,
subjectId:subjectId
}).then(()=>{
alert("Chapter Added");
closeAllPopups();
});

}



// ---------------- LOGOUT ----------------

function logout(){

localStorage.removeItem("admin");

window.location.href="admin-login.html";

}