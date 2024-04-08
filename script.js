function addPoznamka() {
    var userPoznamka = document.getElementById("userPoznamka").value;
    var time = new Date().toLocaleString();
    var existingPoznamky = JSON.parse(localStorage.getItem("poznamky")) || [];
    existingPoznamky.push({ id: generateUniqueId(), note: userPoznamka, time: time });
    localStorage.setItem("poznamky", JSON.stringify(existingPoznamky));
    document.getElementById("userPoznamka").value = "";
    viewPoznamky();
}

function viewPoznamky() {
    var allPoznamkyDiv = document.getElementById("allpoznamky");
    allPoznamkyDiv.innerHTML = "";
    var poznamky = JSON.parse(localStorage.getItem("poznamky")) || [];
    poznamky.forEach(function(item) {
        var noteDiv = document.createElement("div");
        var noteText = document.createTextNode(item.note + " (" + item.time + ")");
        noteDiv.appendChild(noteText);

        var editButton = document.createElement("button");
        editButton.textContent = "Upravit";
        editButton.onclick = function() {
            editPoznamka(item.id, item.note);
        };
        noteDiv.appendChild(editButton);

        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Smazat";
        deleteButton.onclick = function() {
            deletePoznamka(item.id);
        };
        noteDiv.appendChild(deleteButton);

        allPoznamkyDiv.appendChild(noteDiv);
    });
}

function editPoznamka(id, currentNote) {
    var newNote = prompt("Zadej novou poznámku:", currentNote);
    if (newNote !== null) {
        var poznamky = JSON.parse(localStorage.getItem("poznamky")) || [];
        var index = poznamky.findIndex(function(item) {
            return item.id === id;
        });
        if (index !== -1) {
            poznamky[index].note = newNote;
            localStorage.setItem("poznamky", JSON.stringify(poznamky));
            viewPoznamky();
        }
    }
}

function deletePoznamka(id) {
    var confirmation = confirm("Opravdu chcete smazat tuto poznámku?");
    if (confirmation) {
        var poznamky = JSON.parse(localStorage.getItem("poznamky")) || [];
        var updatedPoznamky = poznamky.filter(function(item) {
            return item.id !== id;
        });
        localStorage.setItem("poznamky", JSON.stringify(updatedPoznamky));
        viewPoznamky();
    }
}

function generateUniqueId() {
    return Math.random().toString(36).substr(2, 9);
}

viewPoznamky();