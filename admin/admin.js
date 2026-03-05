var db = firebase.firestore();


async function addSection(){

let name = prompt("Enter Section Name");

if(!name) return;

await db.collection("sections").add({
name:name
});

alert("Section Added");

}


async function showSections(){

const snap = await db.collection("sections").get();

let html = "";

snap.forEach(doc=>{

html += `
<div class="item">

${doc.data().name}

<button onclick="deleteSection('${doc.id}')">
Delete
</button>

</div>
`;

});

document.getElementById("content").innerHTML = html;

}


async function deleteSection(id){

if(!confirm("Delete section?")) return;

await db.collection("sections").doc(id).delete();

showSections();

}