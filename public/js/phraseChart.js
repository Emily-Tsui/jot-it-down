const bodEl = document.getElementById("tbod")
const userId = localStorage.getItem('userId');

fetch('/api/phrases' + userId)
    .then(res => res.json())
    .then(data => {

        data.forEach(createExistingRow);

    })
    .catch(function(error) {

        console.log('Fetch error:', error);

    });

const inputPhrase = document.getElementById("input-phrase")

let myPhrase = ""
const inputBtn = document.getElementById("input-button")

let myPronunciation = ""
const inputPro = document.getElementById("input-pronunciation")

let myDefinition = ""
const inputDef = document.getElementById("input-definition")

let selectedRow = null

let selectedRowId = null;



inputBtn.addEventListener("click", function() {
    addEntries()
})

function addEntries() {
    myPhrase = inputPhrase.value  
    myPronunciation = inputPro.value 
    myDefinition = inputDef.value

    if (selectedRowId !== null) {

    fetch('/api/phrases/' + selectedRowId, {

        method: 'PUT',

        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({

            phrase: myPhrase,
            definition: myDefinition,
            pronunciation: myPronunciation

        })

    })
    .then(function(response) {

        return response.json();

    })
    .then(function(data) {

        console.log(data);

        selectedRow.children[0].innerHTML = myPhrase;
        selectedRow.children[1].innerHTML = myPronunciation;
        selectedRow.children[2].innerHTML = myDefinition;

        selectedRow = null;
        selectedRowId = null;

    })
    .catch(function(error) {

        console.log('Update error:', error);

    });

    return;

    }

    fetch('/api/phrases', {

    method: 'POST',

    headers: {
        'Content-Type': 'application/json'
    },

    body: JSON.stringify({
        userId: userId,
        phrase: myPhrase,
        definition: myDefinition,
        pronunciation: myPronunciation

    })

    })
    .then(function(response) {

        return response.json();

    })
    .then(function(data) {

        console.log('POST success:', data);

    })
    .catch(function(error) {

        console.log('POST error:', error);

    });

    let currentWord = myPhrase
    let currentPro = myPronunciation
    let currentDef = myDefinition


    let newRow = document.createElement("tr") //container for each cell data

    let phrase = createTableCells(myPhrase)
    let pro = createTableCells(myPronunciation)
    let def = createTableCells(myDefinition)

    let myDeleteBtn = document.createElement("button")
    let del = createTableCells(myDeleteBtn)
    myDeleteBtn.innerHTML = "Delete"

    let myEditBtn = document.createElement("button")
    let edit = createTableCells(myEditBtn)
    myEditBtn.innerHTML = "Edit"

    newRow.append(phrase)
    newRow.append(pro)
    newRow.append(def)
    newRow.append(del)
    newRow.append(edit)
  

    myDeleteBtn.onclick = function () {
        let confirmDelete = confirm("Are you sure you want to delete this row? You may edit the item before permanently removing the item.")

        if (confirmDelete) {
            deleteRow(newRow)
        }
    }

    myEditBtn.onclick = function () {
        inputPhrase.value = currentWord
        inputPro.value = currentPro
        inputDef.value = currentDef

        selectedRow = newRow
    }   

  

    if (selectedRow !== null) {
    selectedRow.children[0].innerHTML = myPhrase
    selectedRow.children[1].innerHTML = myPronunciation
    selectedRow.children[2].innerHTML = myDefinition

    selectedRow = null
    return
}


    bodEl.append(newRow)

    
}

function createTableCells(data) {
    let val = document.createElement("td")
    val.append(data)

    return val

}

function createExistingRow(phraseObj) {

    let newRow = document.createElement("tr");

    newRow.dataset.id = phraseObj.id;

    let phrase = createTableCells(phraseObj.phrase);
    let pro = createTableCells(phraseObj.pronunciation);
    let def = createTableCells(phraseObj.definition);

    let myDeleteBtn = document.createElement("button");
    myDeleteBtn.innerHTML = "Delete";

     myDeleteBtn.onclick = function () {

    let confirmDelete = confirm(
        "Are you sure you want to delete this row?"
    );
        if (confirmDelete) {
            deleteRow(newRow);
        }
    }

    let myEditBtn = document.createElement("button");
    myEditBtn.innerHTML = "Edit";

    myEditBtn.onclick = function () {
        inputPhrase.value = phraseObj.phrase;
        inputPro.value = phraseObj.pronunciation;
        inputDef.value = phraseObj.definition;

        selectedRow = newRow;
        selectedRowId = newRow.dataset.id;

        console.log("Editing phrase:", selectedRowId);
    }

    let del = createTableCells(myDeleteBtn);
    let edit = createTableCells(myEditBtn);

    newRow.append(phrase);
    newRow.append(pro);
    newRow.append(def);
    newRow.append(del);
    newRow.append(edit);

    bodEl.append(newRow);

}


function editRow() {

}


function deleteRow(row) {

    let rowId = row.dataset.id;

    fetch('/api/phrases/' + rowId, {

        method: 'DELETE'

    })
    .then(function(response) {

        return response.json();

    })
    .then(function(data) {

        console.log(data);

        row.remove();

    })
    .catch(function(error) {

        console.log('Delete error:', error);

    });

}
