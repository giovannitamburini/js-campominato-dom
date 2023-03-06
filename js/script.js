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
    cell.classList.add('red');
    //appendo ad un elemento (in questo caso il parametro 'container') la cella creata
    container.append(cell);

    // richiamo la funzione che crea l'evento click sulla singola cella e che crea l'interazione dinamica(backgrond color, esiti...)
    endGame(cell, array, index, numeroCelle, resultGame)

    // ciò che ottengo dalla funzione
    return cell

}

// funzione generatrice dell'inetrazioni con le singole celle durante il gioco
function endGame (cell, array, index, numeroCelle, resultGame) {

    contatoreClick = 0;

     //aggiungo un evento click al parametro cella
    cell.addEventListener('click', function () {
    
        //stampo in console il parametro index inserito all'interno dell'elemento cell
        console.log(index);
    
        //aggiungo un unità al contatore per conteggiare il numero di volte che ho cliccato
        contatoreClick++
            
        // condizione di verifica della presenza di un numero nella lista array dove sono indicati i numeri in cui sono inserite le bombe
        if (contatoreClick < numeroCelle - 15) {

            if (array.includes(index)) {
            
                // background red per le celle bomba
                cell.style.backgroundColor = 'red';

                // creo una variabile per creare un array di celle
                let together = document.querySelectorAll('.red');

                // imposto un valore inziale per il contatore
                contatoreRemoveClick = 0;

                //creo un ciclo che al cliccare di una bomba, rivela tutte le caselle bomba presenti nella griglia
                while (contatoreRemoveClick < numeroCelle) {

                    // condizione tale per cui se il numero all'interno della cella controllata è contenuto nell'elenco dei numeri in cui ci sono le bombe
                    if (array.includes(parseInt(together[contatoreRemoveClick].textContent))) {

                        // aggiungo il background di colore rosso(come avverrebbe se lo cliccassi normalmente)
                        together[contatoreRemoveClick].style.backgroundColor = 'red';

                    } else {

                        // aggiungo il background di colore azzurro(come avverrebbe se lo cliccassi normalmente)
                        together[contatoreRemoveClick].style.backgroundColor = '#00FFFF';

                    }

                    // rimozione dell'evento click ma non funziona
                    // cell.removeEventListener('click');
                    
                    //aumento di un'unità il contatore per non creare un loop infinito
                    contatoreRemoveClick++
                }
            
                // creazione e inserimento nel Dom del risultato
                let result = document.createElement('div');
                result.innerText = 'HAI PERSO, il tuo punteggio è: ' + (contatoreClick - 1);
                result.style.color = 'white';
                result.style.fontSize = '1.5em'
                resultGame.append(result);
                
            } else {
                
                //aggiungo/cambio il background dell'elemento cell
                cell.style.backgroundColor = '#00FFFF';
            
            }
          
          // caso in cui vinci senza mai cliccare le bombe
        } else {

            // appendo un elemento nel Dom all'interno del quale è inserito il messaggio della vittoria
            let winResult = document.createElement('div');
            winResult.innerHTML = 'HAI VINTO';
            winResult.style.color = 'white';
            winResult.style.fontSize = '1.5em';
            resultGame.append(winResult);

            // aggiungo all'ultima casella cliccata(che decreta la vittoria) il background
            cell.style.backgroundColor = '#00FFFF';
    
        }
    
    })

     // ciò che ottengo dalla funzione
    return cell
}


//funzione generatrice numero casuale dove il parametro max indica il massimo numero creabile
function generateNumbers (max, array) {

    // creo un contatore per uscire dal ciclo
    contatoreRandom = 0;

    // creo un ciclo per generare numeri casuali
    while (contatoreRandom < 16) {

        // creo una variabile che è uguale a un numero generato casualmente
        let randomNumber = Math.floor(Math.random() * (max - 1 + 1) + 1);

        // condizione tale per cui se il numero generato è già presente nella lista dei numeri generati
        if(array.includes(randomNumber)) {

            //il contatore diminuisce di un unità per poter ripetere la generazione una voltà in più
            contatoreRandom--
            
        } else {
            
            // aggiunta del numero generato (caso in cui non è mai stato generato come valore) nella lista
            array.push(randomNumber);

        }
        
        // aumento il contatore di un unità per non creare un loop infinito
        contatoreRandom++
    }

    // ciò che ottengo dalla funzione
    return randomNumber;
}

