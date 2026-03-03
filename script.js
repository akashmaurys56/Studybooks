let currentPage = "home";

/* ===== LOAD HOME ===== */
const appData = {

    "NCERT Books (English)": {

        "Class 9": {
            "Maths": ["Number Systems", "Polynomials", "Coordinate Geometry"],
            "Science": ["Matter in Our Surroundings", "Atoms and Molecules"],
            "English": ["The Fun They Had", "The Sound of Music"]
        },

        "Class 10": {
            "Maths": ["Real Numbers", "Polynomials", "Quadratic Equations"],
            "Science": ["Chemical Reactions", "Life Processes"],
            "English": ["A Letter to God", "Nelson Mandela"]
        },

        "Class 11": {
            "Physics": ["Physical World", "Units and Measurements"],
            "Chemistry": ["Some Basic Concepts of Chemistry"],
            "Maths": ["Sets", "Relations and Functions"]
        },

        "Class 12": {
            "Physics": ["Electric Charges", "Current Electricity"],
            "Chemistry": ["Solid State", "Solutions"],
            "Maths": ["Relations and Functions", "Matrices"]
        }
    },

    "NCERT Books (Hindi)": {

        "Class 9": {
            "गणित": ["संख्या पद्धति", "बहुपद"],
            "विज्ञान": ["हमारे आसपास के पदार्थ"],
            "हिंदी": ["दो बैलों की कथा"]
        },

        "Class 10": {
            "गणित": ["वास्तविक संख्याएँ", "बहुपद"],
            "विज्ञान": ["रासायनिक अभिक्रियाएँ"],
            "हिंदी": ["बड़े भाई साहब"]
        },

        "Class 11": {
            "भौतिकी": ["भौतिक जगत"],
            "रसायन विज्ञान": ["रसायन के मूल सिद्धांत"]
        },

        "Class 12": {
            "भौतिकी": ["विद्युत आवेश"],
            "रसायन विज्ञान": ["ठोस अवस्था"]
        }
    },

    "NCERT Solutions": {
        "Class 9": {
            "Maths Solutions": ["Chapter 1 Solutions", "Chapter 2 Solutions"]
        },
        "Class 10": {
            "Maths Solutions": ["Real Numbers Solutions"]
        }
    },

    "NCERT Notes": {
        "Class 9": {
            "Science Notes": ["Matter Notes"]
        },
        "Class 10": {
            "Science Notes": ["Chemical Reaction Notes"]
        }
    }

};

async function loadHome() {

    currentPage = "home";

    document.getElementById("pageTitle").innerText = "StudyBooks";

    document.querySelector(".menu-btn").style.display = "flex";
    document.getElementById("backBtn").style.display = "none";

    let html = "<div class='grid'>";

    const querySnapshot = await getDocs(collection(db, "sections"));

    querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();

        html += `
            <div class="card">
                <span class="icon material-icons">menu_book</span>
                ${data.name}
            </div>
        `;
    });

    html += "</div>";

    document.getElementById("content").innerHTML = html;
}

/* ===== OPEN SECTION ===== */

async function openSection(sectionId, sectionName) {

    currentPage = "class";

    document.getElementById("pageTitle").innerText = sectionName;

    document.querySelector(".menu-btn").style.display = "none";
    document.getElementById("backBtn").style.display = "flex";

    closeMenu();

    let html = "<div class='grid'>";

    const snapshot = await db.collection("sections")
                             .doc(sectionId)
                             .collection("classes")
                             .get();

    snapshot.forEach(doc => {
        const data = doc.data();
        html += `
            <div class="card" onclick="openClass('${sectionId}','${doc.id}','${data.name}')">
                ${data.name}
            </div>
        `;
    });

    html += "</div>";

    document.getElementById("content").innerHTML = html;
}

async function openClass(sectionId, classId, className) {

    currentPage = "subject";

    document.getElementById("pageTitle").innerText = className;

    let html = "<div class='grid'>";

    const snapshot = await db.collection("sections")
                             .doc(sectionId)
                             .collection("classes")
                             .doc(classId)
                             .collection("subjects")
                             .get();

    snapshot.forEach(doc => {
        const data = doc.data();
        html += `
            <div class="card" onclick="openSubject('${sectionId}','${classId}','${doc.id}','${data.name}')">
                ${data.name}
            </div>
        `;
    });

    html += "</div>";

    document.getElementById("content").innerHTML = html;
}

async function openSubject(sectionId, classId, subjectId, subjectName) {

    currentPage = "chapter";

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
}

/* ===== BACK ===== */

function goBack() {
    loadHome();
}

/* ===== MENU ===== */

function toggleMenu() {
    const menu = document.getElementById("sideMenu");

    if (menu.style.left === "0px") {
        menu.style.left = "-220px";
    } else {
        menu.style.left = "0px";
    }
}

function closeMenu() {
    document.getElementById("sideMenu").style.left = "-220px";
}

/* ===== DARK MODE ===== */

function setDarkMode() {
    document.body.classList.add("dark");
    closeMenu();
}

function setLightMode() {
    document.body.classList.remove("dark");
    closeMenu();
}

/* ===== INIT ===== */

loadHome();