const bodEl = document.getElementById("tbod")

const inputPhrase = document.getElementById("input-phrase")

let myPhrase = ""
const inputBtn = document.getElementById("input-button")

let myPronunciation = ""
const inputPro = document.getElementById("input-pronunciation")

let myDefinition = ""
const inputDef = document.getElementById("input-definition")

let selectedRow = null



inputBtn.addEventListener("click", function() {
    addEntries()
})

function addEntries() {
    myPhrase = inputPhrase.value  
    myPronunciation = inputPro.value 
    myDefinition = inputDef.value

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


function editRow() {

}


function deleteRow(row) {
    row.remove()
}

