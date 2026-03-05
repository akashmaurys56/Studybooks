var db = firebase.firestore();

function logout(){
localStorage.removeItem("admin");
window.location.href="admin-login.html";
}

function addSection(){
let name=prompt("Section Name");
if(!name)return;

db.collection("sections").add({name:name});

alert("Section Added");
}

function addClass(){
let name=prompt("Class Name");
if(!name)return;

db.collection("classes").add({name:name});

alert("Class Added");
}

function addSubject(){
let name=prompt("Subject Name");
if(!name)return;

db.collection("subjects").add({name:name});

alert("Subject Added");
}

function addChapter(){
let name=prompt("Chapter Name");
if(!name)return;

db.collection("chapters").add({name:name});

alert("Chapter Added");
}

function addSection(){

closeAllPopups();

document.getElementById("sectionPopup").style.display="flex";

}

function closePopup(){

document.getElementById("sectionPopup").style.display="none";

}

function saveSection(){

let name=document.getElementById("sectionInput").value;

if(!name){
alert("Enter section name");
return;
}

db.collection("sections").add({
name:name
});

document.getElementById("sectionInput").value="";
closePopup();

alert("Section Added");

}

document.getElementById("sectionPopup").style.display="flex";
document.getElementById("sectionPopup").style.display="none";

function addClass(){

closeAllPopups();

document.getElementById("classPopup").style.display="flex";

loadSections("classSectionSelect");

}

function closeClassPopup(){

document.getElementById("classPopup").style.display="none";

}

function saveClass(){

let section=document.getElementById("classSectionSelect").value;
let name=document.getElementById("classInput").value;

db.collection("classes").add({
section:section,
name:name
});

closeClassPopup();

alert("Class Added");

}

function addSubject(){

closeAllPopups();

document.getElementById("subjectPopup").style.display="flex";

loadSections("subjectSectionSelect");

}

function closeSubjectPopup(){

document.getElementById("subjectPopup").style.display="none";

}

function saveSubject(){

let section=document.getElementById("subjectSectionSelect").value;
let className=document.getElementById("subjectClassSelect").value;
let name=document.getElementById("subjectInput").value;

db.collection("subjects").add({
section:section,
class:className,
name:name
});

closeSubjectPopup();

alert("Subject Added");

}

function addChapter(){

closeAllPopups();

document.getElementById("chapterPopup").style.display="flex";

loadSections("chapterSectionSelect");

}

function closeChapterPopup(){

document.getElementById("chapterPopup").style.display="none";

}

function saveChapter(){

let section=document.getElementById("chapterSectionSelect").value;
let className=document.getElementById("chapterClassSelect").value;
let subject=document.getElementById("chapterSubjectSelect").value;
let name=document.getElementById("chapterInput").value;

db.collection("chapters").add({
section:section,
class:className,
subject:subject,
name:name
});

closeChapterPopup();

alert("Chapter Added");

}

function closeAllPopups(){

document.getElementById("sectionPopup").style.display="none";
document.getElementById("classPopup").style.display="none";
document.getElementById("subjectPopup").style.display="none";
document.getElementById("chapterPopup").style.display="none";

}
