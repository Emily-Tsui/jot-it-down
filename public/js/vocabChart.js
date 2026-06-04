const bodEl = document.getElementById("tbod")
const userId = localStorage.getItem('userId');

console.log('Current userId:', userId);

fetch('/api/vocab?userId=' + userId)
    .then(res => res.json())
    .then(data => {

        console.log('Loaded rows:', data);

        data.forEach(createExistingRow);

    })

const inputVocab = document.getElementById("input-vocab")

let myWord = ""

const inputBtn = document.getElementById("input-button")

let myPronunciation = ""
const inputPro = document.getElementById("input-pronunciation")

let myDefinition = ""
const inputDef = document.getElementById("input-definition")

let selectedRow = null

let selectedRowId = null



inputBtn.addEventListener("click", function() {
    // event.preventDefault()

    console.log('Add button clicked')
    addEntries()
})

function addEntries() {

    console.log("Inside addEntries");
    myWord = inputVocab.value  
    myPronunciation = inputPro.value 
    myDefinition = inputDef.value

    // if (selectedRowId !== null) {
    //     console.log("UPDATE MODE");
    //     return;
    // }

    fetch('/api/vocab?userId=' + userId, {

    method: 'POST',

    headers: {
        'Content-Type': 'application/json'
    },

    body: JSON.stringify({
        
        userId: userId,
        word: myWord,
        definition: myDefinition,
        pronunciation: myPronunciation

    })

    })
    .then(function(response) {

        return response.json();

    })
    .then(function(data) {

        console.log('POST success:', data);

        console.log('New SQLite ID:', data.id);

        newRow.dataset.id = data.id;

    })
    .catch(function(error) {

        console.log('POST error:', error);

    });

    if (selectedRowId !== null) {

    fetch('/api/vocab/' + selectedRowId, {

        method: 'PUT',

        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({

            word: myWord,
            definition: myDefinition,
            pronunciation: myPronunciation

        })

    })
    .then(function(response) {

        return response.json();

    })
    .then(function(data) {

        console.log(data);

        selectedRow.children[0].innerHTML = myWord;
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

    let currentWord = myWord
    let currentPro = myPronunciation
    let currentDef = myDefinition


    let newRow = document.createElement("tr") //container for each cell data

    let word = createTableCells(myWord)
    let pro = createTableCells(myPronunciation)
    let def = createTableCells(myDefinition)

    let myDeleteBtn = document.createElement("button")
    let del = createTableCells(myDeleteBtn)
    myDeleteBtn.innerHTML = "Delete"

    let myEditBtn = document.createElement("button")
    let edit = createTableCells(myEditBtn)
    myEditBtn.innerHTML = "Edit"

    newRow.append(word)
    newRow.append(pro)
    newRow.append(def)
    newRow.append(del)
    newRow.append(edit)

    // newDataVocab.append(myWord)
    // newRow.append(newDataVocab)
    // console.log(myWord)

    // newDataPro.append(myPronunciation)
    // newRow.append(newDataPro)
    // console.log(myPronunciation)

    // newDataDef.append(myDefinition)
    // newRow.append(newDataDef)
    // console.log(myDefinition)

    

    myDeleteBtn.onclick = function () {
        let confirmDelete = confirm("Are you sure you want to delete this row? You may edit the item before permanently removing the item.")

        if (confirmDelete) {
            deleteRow(newRow)
        }
    }

    myEditBtn.onclick = function () {
        

        inputVocab.value = currentWord
        inputPro.value = currentPro
        inputDef.value = currentDef

        selectedRow = newRow
        selectedRowId = newRow.dataset.id
        console.log(selectedRowId);
    }   

    if (selectedRow !== null) {
    selectedRow.children[0].innerHTML = myWord
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


function editRow() {

}


function createExistingRow(wordObj) {

    let newRow = document.createElement("tr");

    newRow.dataset.id = wordObj.id;

    let word = createTableCells(wordObj.word);
    let pro = createTableCells(wordObj.pronunciation);
    let def = createTableCells(wordObj.definition);

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
        inputVocab.value = wordObj.word;
        inputPro.value = wordObj.pronunciation;
        inputDef.value = wordObj.definition;

        selectedRow = newRow;
        selectedRowId = newRow.dataset.id;

        console.log("Editing row:", selectedRowId);
    }

    let del = createTableCells(myDeleteBtn);
    let edit = createTableCells(myEditBtn);

    newRow.append(word);
    newRow.append(pro);
    newRow.append(def);
    newRow.append(del);
    newRow.append(edit);

    bodEl.append(newRow);

}

// function deleteRow(row) {
//     row.remove()
// }

function deleteRow(row) {

    let rowId = row.dataset.id;

    fetch('/api/vocab/' + rowId, {

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

