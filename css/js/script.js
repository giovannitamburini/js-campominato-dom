
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
        createCell(cellContainerElement, contatore + 1, cellPixel);

        // - aggiungo un unità al contatore per non creare un loop infinito
        contatore++
    }

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

    // rendo di nuovo disponibile il tasti di selezione difficoltà e di generazione griglia
    optionContainerElement.style.display = 'flex';
})



//FUNCTION----------------------------------------------

//- funzione generatrice di cella
function createCell (container, index, pixel) {

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

    //aggiungo un evento click al parametro cella
    cell.addEventListener('click', function() {

        //aggiungo/cambio il background dell'elemento cell
        cell.style.backgroundColor = '#00FFFF';

        //stampo in console il parametro index inserito all'interno dell'elemento cell
        console.log(index);
    })

    return cell

}