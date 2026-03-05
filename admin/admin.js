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
