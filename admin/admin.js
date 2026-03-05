var db = firebase.firestore();

let currentType = "";

function openModal(type){

currentType = type;

document.getElementById("modal").style.display = "flex";

document.getElementById("input1").value="";

if(type=="section"){
document.getElementById("modalTitle").innerText="Add Section";
}

if(type=="class"){
document.getElementById("modalTitle").innerText="Add Class";
}

if(type=="subject"){
document.getElementById("modalTitle").innerText="Add Subject";
}

if(type=="chapter"){
document.getElementById("modalTitle").innerText="Add Chapter";
}

}

function closeModal(){

document.getElementById("modal").style.display="none";

}

function saveData(){

let name = document.getElementById("input1").value;

if(!name){
alert("Enter name");
return;
}

if(currentType=="section"){

db.collection("sections").add({
name:name
});

}

if(currentType=="class"){

db.collection("classes").add({
name:name
});

}

if(currentType=="subject"){

db.collection("subjects").add({
name:name
});

}

if(currentType=="chapter"){

db.collection("chapters").add({
name:name
});

}

alert("Saved");

closeModal();

}