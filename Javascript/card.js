// funzione per recuperare il parametro 'id' che passeremo da index.js
function getQueryParam(param) {
    const params = new URLSearchParams(window.location.search);
    return params.get(param);
}

document.body.style.backgroundColor = "#E7E8F5";    // colore sfondo

const card_container = document.getElementById('lista_card');

// costante per completare l'url
const card_id = getQueryParam('id');
const name_store = getQueryParam('store');

let mostrato = new Set();

start();


// funzioni-fetch
function getCardsById(id) {
    return fetch("http://localhost:8080/api/card/" + id, {
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

function getCardsByStoreName(name) {
    return fetch("http://localhost:8080/api/card/store/" + name, {
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


function start() {

    getCardsById(card_id).then(card => {
        const logoCard = document.createElement("img");
        logoCard.setAttribute("src", card.store.link);
        logoCard.setAttribute("alt", card.store.logoName);
        logoCard.setAttribute("width", "12%");
        logoCard.setAttribute("height", "12%");
        logoCard.setAttribute("id", "immagine_store");

        const break_line = document.createElement("br");

        card_container.appendChild(logoCard);
        card_container.appendChild(break_line);
    });

    getCardsByStoreName(name_store).then(cards => {
        cards.forEach(c => {
            const mostratoId = (typeof c.store === 'object' && c.store !== null) ? c.store.id : c.store;
            const blocco_card = document.createElement("div");
            if (!mostrato.has(mostratoId)) {

                blocco_card.classList.add("z-3");
                blocco_card.classList.add("p-5");
                blocco_card.classList.add("rounded-3");
                blocco_card.classList.add("card_code");

                const codice_barre = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                codice_barre.classList.add("barcode");
                codice_barre.setAttribute("jsbarcode-format", "ean13");
                codice_barre.setAttribute("jsbarcode-value", c.number);
                codice_barre.setAttribute("jsbarcode-textmargin", "0");
                codice_barre.setAttribute("jsbarcode-font", "sans-serif");
                codice_barre.setAttribute("jsbarcode-width", "2");
                codice_barre.setAttribute("jsbarcode-height", "100");
                codice_barre.setAttribute("jsbarcode-displayValue", "true");

                blocco_card.appendChild(codice_barre);
                console.log(c.number);
            }
            card_container.appendChild(blocco_card);
            
        });
    JsBarcode(".barcode").init();
    })
    
}

/*

innerHTML per i barcode
img ----- <img src="${card.store.link}" alt="${card.store.logoName}" width="12%" height="12%" id="immagine_store">
        <br>


div card ------- <div class="z-3 p-5 rounded-3" id="card_code">
                            <svg class="barcode"
                                jsbarcode-format="ean13"
                                jsbarcode-value="${c.number}"
                                jsbarcode-textmargin="0"
                                jsbarcode-font="sans-serif"
                                jsbarcode-width="2"
                                jsbarcode-height="100"
                                jsbarcode-displayValue=true>
                            </svg>
                        </div>

                        JsBarcode(".barcode").init();
*/