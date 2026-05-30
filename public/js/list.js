let tableBodEl = document.querySelector("#table-body-list");
let flashContainer = document.querySelector("#flashcard-container");
let backendVocab = []; //used for flashcards, tables, and randomizer microservice [0], .length, [randomIndex]\
let backendPhrase = [];

//Connecting list.js with backend data from vocabRoutes.js
fetch('/api/vocab')
    .then(res => res.json())
    .then(data => {
        backendVocab = data;
        console.log('Backend vocab data: ', backendVocab);

        //Using backend data to create table rows dynamically
        backendVocab.forEach(wordObject)

        function wordObject(wordObj) {
            let row = document.createElement('tr');

            let typeCell = document.createElement('td');
            let wordCell = document.createElement('td');

            typeCell.textContent = 'Vocabulary';
            wordCell.textContent = wordObj.word;

            row.dataset.id = wordObj.id;

            row.append(typeCell);
            row.append(wordCell);

            tableBodEl.append(row);
        }
    })

    .catch(function(error){
        console.log('Fetch error: ', error);
    })



fetch('/api/phrases')
    .then(res => res.json())
    .then(data => {
        backendPhrase = data;
        console.log('Backend phrase data: ', backendPhrase);

        //Using backend data to create table rows dynamically
        backendPhrase.forEach(phraseObject)

        function phraseObject(phraseObj) {
            // let row = document.createElement('tr');
            // let phraseCell = document.createElement('td');

            // phraseCell.textContent = phraseObj.phrase;

            // row.dataset.id = phraseObj.id;

            // row.append(phraseCell);

            // tableBodEl.append(row);
            let row = document.createElement('tr');

            let typeCell = document.createElement('td');
            let phraseCell = document.createElement('td');

            typeCell.textContent = 'Phrase';
            phraseCell.textContent = phraseObj.phrase;

            row.dataset.id = phraseObj.id;

            row.append(typeCell);
            row.append(phraseCell);

            tableBodEl.append(row);
        }
    })

    .catch(function(error){
        console.log('Fetch error: ', error);
    })
        
        

//Objects
// let dict = {
    // "El menú" : {
    //     definition: "menu",
    //     pronunciation: "Like the English way menu."
    // },

    // "Las revistas" : {
    //     definition: "magazines",
    //     pronunciation: "Try pronouncing the beginning r with 1 tongue roll and pronounce the s at the end."
    // },

    // "El estudio" : {
    //     definition: "the study",
    //     pronunciation: "emphasize the second syllable and the d is not a hard sounding d."
    // },

//     "¡Hasta luégo!" : {
//         definition: "See you later",
//         pronunciation: "h is silent."
//     },

//     "De lunes a viernes" : {
//         definition: "From Monday to Friday",
//         pronunciation: "days of the week are spelled in lowercase in Spanish."
//     },

//     "¿Cuánto cuestas?" : {
//         definition: "How much does it cost?",
//         pronunciation: "The t is pronounced with the air in between the roof of the mouth and tongue."
//     }
// }


tableBodEl.addEventListener("click", tableFunc)

function tableFunc(event) {
    
    if(event.target.nodeName == "TD"){
        flashContainer.textContent = ""

        let closeBtn = document.createElement("button")

        let tagText = event.target.innerText

        // Helps with differentiating showing a flashcard for column type or column entry, so no flashcard shows for type that is clicked
        if (tagText === "Vocabulary" || tagText === "Phrase") {
            return;
        }

        let selectedWord = backendVocab.find(findWord)

        let selectedPhrase = backendPhrase.find(findPhrase)

        function findPhrase(phraseObj) {
            return phraseObj.phrase === tagText;
        }

        function findWord(wordObj){
            return wordObj.word === tagText;
        }

        console.log(selectedWord);
        console.log(selectedPhrase);

        let defEl = document.createElement("p")
        let proEl = document.createElement("p")

        let defLabel = document.createElement("label")
        let proLabel = document.createElement("label")

        defLabel.innerHTML = "Definition: "
        proLabel.innerHTML = "Pronunciation: "

        defEl.append(defLabel)
        proEl.append(proLabel)

        if (selectedWord) {
            defEl.append(selectedWord.definition);
            proEl.append(selectedWord.pronunciation);
        }
        else if (selectedPhrase) {
            defEl.append(selectedPhrase.definition);
            proEl.append(selectedPhrase.pronunciation);
        }

        // defEl.append(dict[tagText].definition)
        // defEl.append(selectedWord.definition)
        // proEl.append(dict[tagText].pronunciation)
        // proEl.append(selectedWord.pronunciation)

        flashContainer.append(defEl)
        flashContainer.append(proEl)

        closeBtn.innerHTML = "Close"
        flashContainer.append(closeBtn)

        flashContainer.style.display = "block"

        closeBtn.addEventListener("click", function () {
            flashContainer.style.display = "none"
        })
        
        }
}

