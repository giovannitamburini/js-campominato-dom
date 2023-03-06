/*
CONSEGNA

Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe. Attenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.

In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.

La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).

Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
*/



//- creo un bottone nel body HTML e lo richiamo in js
let generatorElement = document.getElementById('generator');

// - richiamo dal Dom l'elemento select della difficoltà
let difficultyElement = document.getElementById('difficulty');

// - richiamo dal Dom l'elemento contenitore dei tasti di selezione e di generazione griglia
let optionContainerElement = document.getElementById('option-container');

// - creo un div-container all'interno del quale inserirò gli elementi che si creeranno all'evento click del prossimo punto
let cellContainerElement = document.getElementById('cell-container');

// - richiamo dal Dom l'elemento button per resettare la tabella
let resetElement = document.getElementById('reset');

let numberCells = 0;


// ESERCIZIO CAMPOMINATO DOM

// - creo una variabile per generare tramite funzione un numero casuale
let randomNumber;

// - creo una lista dove inserirò i numeri all'interno dei quali sarà inseita la bomba
let bombNumbers = [];

// richiamo un elemento dal Dom all'interno del quale inserirò il responso del gioco
let responseElement = document.getElementById('response');


// - creo un evento click sul bottone
generatorElement.addEventListener('click', function() {

    // rendo visibile il bottone per resettare la griglia
    resetElement.style.display = 'block';

    // - imposto un contatore che mi servirà per uscire dal ciclo while
    contatore = 0;

    // creo una varibaile per impostare la misura della cella in px in base alla difficoltà selezionata
    let cellPixel;


    // - condizione difficoltà selezionata = easy
    if (difficultyElement.value == 'easy') {

        //numero celle
        numberCells = 100;
        //misura in px della singola cella
        cellPixel = '50px';
        
    // - condizione difficoltà selezionata = normal
    } else if (difficultyElement.value == 'normal') {

        //numero celle
        numberCells = 81;
        //misura in px della singola cella
        cellPixel = 'calc( 500px / 9)';

    // - condizione difficoltà selezionata = hard
    } else {

        //numero celle
        numberCells = 49;
        //misura in px della singola cella
        cellPixel = 'calc(500px / 7)';

    }

    // creo un ciclo che generi la griglia
    while (contatore < numberCells) {

        // - richiamo la funzione generatrice di cella
        createCell(cellContainerElement, contatore + 1, cellPixel, bombNumbers, responseElement, numberCells);

        // - aggiungo un unità al contatore per non creare un loop infinito
        contatore++
    }

    // - implemento la funzione generatrice di numeri casuali
    generateNumbers(numberCells, bombNumbers);

    // tolgo i tasti di selezione difficoltà e del generatore di griglia
    optionContainerElement.style.display = 'none';
})


// RESET BUTTON

// creo un evento click sul bottone reset
resetElement.addEventListener('click', function(){

    // imposto il contatore
    contatoreRemove = 0;

    // creo un ciclo per rimuovere ogni cella tramite iil tasto reset
    while (contatoreRemove < numberCells) {

        // rimuovo l'ultimo figlio dal container di celle
        cellContainerElement.removeChild(cellContainerElement.lastChild);
        
        // aggiungo un unità al contatore per non creare un loop infinito
        contatoreRemove++
    }

    // nascondo il tasto reset dopo averlo utilizzato
    resetElement.style.display = 'none';

    // elimino il contenuto del responso
    responseElement.innerHTML = '';

    // rendo di nuovo disponibile il tasti di selezione difficoltà e di generazione griglia
    optionContainerElement.style.display = 'flex';

    //svuoto la lista di numeri creati casualmente
    bombNumbers = [];
})



//FUNCTION----------------------------------------------

//- funzione generatrice di cella
function createCell (container, index, pixel, array, resultGame, numeroCelle) {

    //creo un elemento div
    let cell = document.createElement('div');

    //inserisco qualcosa(in questo caso il parametro 'index') all'interno dell'elemento creato
    cell.innerHTML = index;

    //modifico lo stile dell'elemento creato
    cell.style.width = pixel;
    cell.style.height = pixel;
    cell.style.border = '1px solid black';

    //modifico lo stile per posizionare centralmente il contenuto della cella creata
    cell.style.display = 'flex';
    cell.style.justifyContent = 'center';
    cell.style.alignItems = 'center';

    //appendo ad un elemento (in questo caso il parametro 'container') la cella creata
    container.append(cell);

    // imposto un contatore per indicare il puteggio
    contatoreClick = 0;

    //aggiungo un evento click al parametro cella
    cell.addEventListener('click', function() {

        //stampo in console il parametro index inserito all'interno dell'elemento cell
        console.log(index);

        //aggiungo un unità al contatore per conteggiare il numero di volte che ho cliccato
        contatoreClick++
        
        // condizione di verifica della presenza di un numero nella lista array dove sono indicati i numeri in cui sono inserite le bombe

        if (contatoreClick < numeroCelle - 16) {

            if (array.includes(index)) {
        
                // background red per le celle bomba
                cell.style.backgroundColor = 'red';
        
                // creazione e inserimento nel Dom del risultato
                let result = document.createElement('div');
                result.innerText = 'HAI PERSO, il tuo punteggio è: ' + (contatoreClick - 1);
                resultGame.append(result);
            
            } else {
            
                //aggiungo/cambio il background dell'elemento cell
                cell.style.backgroundColor = '#00FFFF';
        
            }
            
        } else {

            let winResult = document.createElement('div');
            winResult.innerHTML = 'HAI VINTO';
            resultGame.append(winResult);

        }

    })


    return cell 

}


//funzione generatrice numero casuale dove il parametro max indica il massimo numero creabile
function generateNumbers (max, array) {

    // creo un contatore per uscire dal ciclo
    contatoreRandom = 0;

    // creo un ciclo per generare numeri casuali
    while (contatoreRandom < 16) {

        let randomNumber = Math.floor(Math.random() * (max - 1 + 1) + 1);

        if(array.includes(randomNumber)) {

            contatoreRandom--
            
        } else {
            
            array.push(randomNumber);

        }
        
        contatoreRandom++
    }

    return randomNumber;
}

