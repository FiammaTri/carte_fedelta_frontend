let mostrato = new Set(); //utile per tenere traccia degli ID già mostrati

const cardContainer = document.getElementById("card-container");

starting_point();

//funzione per la creazione delle carte
function creazioneCard (card, container) {
                const carta = document.createElement("div");
                carta.classList.add("carta");

                const logoContainer = document.createElement("div");
                logoContainer.classList.add("logoContainer");

                const logo = document.createElement("img");
                logo.classList.add("logo");
                logo.src = card.store.link;

                const negozio = document.createElement("div");
                negozio.classList.add("store-name");
                negozio.textContent = card.store.logoName;

                const link_dettaglio = document.createElement("a");
                link_dettaglio.setAttribute("href", "card.html?id=" + card.id + "&store=" +card.store.logoName);
                
                logoContainer.appendChild(logo);
                carta.appendChild(logoContainer);
                carta.appendChild(negozio);
                link_dettaglio.appendChild(carta);
                container.appendChild(link_dettaglio);
}

function starting_point () {
    
    while(cardContainer.firstChild) {
        cardContainer.removeChild(cardContainer.firstChild);
    }

    const container = document.createElement("div");
    container.classList.add("flex-container");
    
    mostrato = new Set();
    
    getCards().then(cards => {
        cartaPlus(container);
        cards.forEach(card => {

            //verifica il nome dello store
            const store = card.store;
            //prende l'id sia se viene passato come oggetto che come numero
            const mostratoId = (typeof store === 'object' && store !== null) ? store.id : store;

            //se l'id non è presente inizia il ciclo di creazione della card
            if (!mostrato.has(mostratoId)) {
                mostrato.add(mostratoId);
                creazioneCard(card, container);

            }

        });
        
        cardContainer.appendChild(container);
    });
}


function getCards() {
    return fetch("http://localhost:8080/api/card", {
        method: "GET"
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Errore durante il caricamento delle card");
            }
            return response.json();
        })
        .catch(error => {

            console.error("Errore:", error);
            document.getElementById("error-message").textContent = "Impossibile caricare le card. Riprova più tardi.";
            return [];
        });

}

function getCardsByName(search_value) {
    return fetch("http://localhost:8080/api/card/store/"+search_value, {
        method: "GET"
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Errore durante il caricamento delle card");
            }
            return response.json();
        })
        .catch(error => {

            console.error("Errore:", error);
            document.getElementById("error-message").textContent = "Impossibile caricare le card. Riprova più tardi.";
            return [];
        });
}


document.getElementById('ricerca-testo').addEventListener('submit', function (event) {
    event.preventDefault();

    const store_search = document.getElementById('tasto-ricerca').value;
    console.log(store_search);

    if(store_search==="") {
        starting_point();
        return;
    }

    // aggiunta: svuotare cardContainer con removeChild()
    while (cardContainer.firstChild) {
        cardContainer.removeChild(cardContainer.firstChild);
    }

    // creazione di un nuovo div
    const new_container = document.createElement("div");
    new_container.classList.add("card-ricerca");
    new_container.classList.add("flex-container");

    // reset mostrato
    mostrato = new Set(); 

    getCardsByName(store_search).then(cards => {
        cards.forEach(card => {
            
            //verifica il nome dello store
            const store = card.store;
            //prende l'id sia se viene passato come oggetto che come numero
            const mostratoId = (typeof store === 'object' && store !== null) ? store.id : store;

            //se l'id non è presente inizia il ciclo di creazione della card
            if (!mostrato.has(mostratoId)) {
                mostrato.add(mostratoId);

                creazioneCard(card, new_container);
            };
            cardContainer.appendChild(new_container);
    });
});
<<<<<<< HEAD
});

function cartaPlus (container) {
        
    const link = document.createElement("a");
    link.setAttribute("href", "plus.html"); 

    const cartaPlus = document.createElement("div");
    cartaPlus.classList.add("carta");

    const plusContainer = document.createElement("div");
    plusContainer.classList.add("plusContainer");

    const plus = document.createElement("i");
    plus.classList.add("fa-solid", "fa-square-plus");

    plusContainer.appendChild(plus);
    cartaPlus.appendChild(plusContainer);
    link.appendChild(cartaPlus);

    container.appendChild(link);

}
=======
});
>>>>>>> 028ffac0384436c5f8218c38adb954958816b842
