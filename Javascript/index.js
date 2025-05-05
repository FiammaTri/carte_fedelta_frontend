let mostrato = new Set(); //utile per tenere traccia degli ID già mostrati

const container = document.createElement("div");
container.classList.add("flex-container");
const cardContainer = document.getElementById("card-container");

var tutte = true;
//Creazione delle card
if (tutte) {
document.addEventListener("DOMContentLoaded", function () {

    getCards().then(cards => {
        cards.forEach(card => {

            //verifica il nome dello store
            const store = card.store;
            //prende l'id sia se viene passato come oggetto che come numero
            const mostratoId = (typeof store === 'object' && store !== null) ? store.id : store;

            //se l'id non è presente inizia il ciclo di creazione della card
            if (!mostrato.has(mostratoId)) {
                mostrato.add(mostratoId);

                const carta = document.createElement("div");
                carta.classList.add("carta");

                const logo = document.createElement("img");
                logo.classList.add("logo");
                logo.src = card.store.link;

                const negozio = document.createElement("div");
                negozio.classList.add("store-name");
                negozio.textContent = card.store.name;

                const numero = document.createElement("div"); //utile solo in fase di testing, da rimuovere
                numero.classList.add("numero");
                numero.textContent = card.number;

                // bottone per i dettagli ('div'+'a')

                const div_bottone = document.createElement("div");
                div_bottone.classList.add("discover_more");

                const link_dettaglio = document.createElement("a");
                link_dettaglio.classList.add("style_btn");
                link_dettaglio.setAttribute("href", "card.html?id=" + card.id);
                link_dettaglio.textContent = "Dettagli";
                div_bottone.appendChild(link_dettaglio);

                carta.appendChild(logo);
                carta.appendChild(negozio);
                carta.appendChild(numero);
                carta.appendChild(div_bottone);

                container.appendChild(carta);

            }

        });
        cardContainer.appendChild(container);
    });
});
};


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

function tutte () {
    if (!tutte)
    cardContainer.element.style.visibility = 'hidden';
}

document.getElementById('ricerca-testo').addEventListener('submit', function (event) {
    event.preventDefault();
    tutte=false;
    
    const store_search = document.getElementById('tasto-ricerca').value;
    console.log(store_search);

    if(store_search==="") {
        alert("Inserire nome store");
        tutte=true;
        return;
    }
    tutte();

    getCardsByName(store_search).then(cards => {
        cards.forEach(card => {

            //verifica il nome dello store
            const store = card.store;
            //prende l'id sia se viene passato come oggetto che come numero
            const mostratoId = (typeof store === 'object' && store !== null) ? store.id : store;

            //se l'id non è presente inizia il ciclo di creazione della card
            if (!mostrato.has(mostratoId)) {
                mostrato.add(mostratoId);

                const carta = document.createElement("div");
                carta.classList.add("carta");

                const logo = document.createElement("img");
                logo.classList.add("logo");
                logo.src = card.store.link;

                const negozio = document.createElement("div");
                negozio.classList.add("store-name");
                negozio.textContent = card.store.storeName;

                const numero = document.createElement("div"); //utile solo in fase di testing, da rimuovere
                numero.classList.add("numero");
                numero.textContent = card.number;

                // bottone per i dettagli ('div'+'a')

                const div_bottone = document.createElement("div");
                div_bottone.classList.add("discover_more");

                const link_dettaglio = document.createElement("a");
                link_dettaglio.classList.add("style_btn");
                link_dettaglio.setAttribute("href", "card.html?id=" + card.id);
                link_dettaglio.textContent = "Dettagli";
                div_bottone.appendChild(link_dettaglio);

                carta.appendChild(logo);
                carta.appendChild(negozio);
                carta.appendChild(numero);
                carta.appendChild(div_bottone);

                container.appendChild(carta);

            }

        });
        cardContainer.appendChild(container);
    });
})