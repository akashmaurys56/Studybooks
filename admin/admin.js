var db = firebase.firestore();

window.onload = function(){

loadSections("classSection");
loadSections("subjectSection");
loadSections("chapterSection");

};

/* SECTION */

function addSection(){

let name=document.getElementById("sectionName").value;

if(!name){
alert("Enter section name");
return;
}

db.collection("sections").add({
name:name
});

alert("Section Added");

}

/* CLASS */

function addClass(){

let section=document.getElementById("classSection").value;
let name=document.getElementById("className").value;

db.collection("classes").add({
section:section,
name:name
});

alert("Class Added");

}

/* SUBJECT */

function addSubject(){

let section=document.getElementById("subjectSection").value;
let className=document.getElementById("subjectClass").value;
let name=document.getElementById("subjectName").value;

db.collection("subjects").add({
section:section,
class:className,
name:name
});

alert("Subject Added");

}

/* CHAPTER */

function addChapter(){

let section=document.getElementById("chapterSection").value;
let className=document.getElementById("chapterClass").value;
let subject=document.getElementById("chapterSubject").value;
let name=document.getElementById("chapterName").value;

db.collection("chapters").add({
section:section,
class:className,
subject:subject,
name:name
});

alert("Chapter Added");

}

/* LOAD SECTIONS */

function loadSections(selectId){

db.collection("sections").get().then(function(snap){

let html="";

snap.forEach(function(doc){

html+=`<option value="${doc.data().name}">
${doc.data().name}

</option>`;});

document.getElementById(selectId).innerHTML=html;

});

}