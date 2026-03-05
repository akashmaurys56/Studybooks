var db = firebase.firestore();

window.onload = function(){
loadSections();
};

function addSection(){

let name=document.getElementById("sectionName").value;

if(!name){
alert("Enter section name");
return;
}

db.collection("sections").add({
name:name
}).then(function(){

alert("Section added");

loadSections();

});

}

function loadSections(){

db.collection("sections").get().then(function(snap){

let html="";

snap.forEach(function(doc){

html+=`<option value="${doc.data().name}">
${doc.data().name}

</option>`;});

document.getElementById("classSection").innerHTML=html;

});

}

function addClass(){

let section=document.getElementById("classSection").value;
let name=document.getElementById("className").value;

if(!section || !name){
alert("Fill all fields");
return;
}

db.collection("classes").add({
section:section,
name:name
}).then(function(){

alert("Class added");

});

}