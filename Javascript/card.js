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

function getLogoByStoreName(name) {
    return fetch("http://localhost:8080/api/store/byName/" + name, {
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

    getLogoByStoreName(name_store).then(store => {
        const logoCard = document.createElement("img");
        logoCard.setAttribute("src", store.link);
        logoCard.setAttribute("alt", store.storeName);
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

                const note_section = document.createElement("p");

                if (c.notes === null) {
                    note_section.textContent = "Note: \nVuoto";
                } else {
                    note_section.textContent = "Note: \n" + c.notes;
                }

                //creazione div con bottoni 'modifica' e 'elimina'
                const blocco_opzioni = document.createElement("div");
                blocco_opzioni.classList.add("d-flex");
                blocco_opzioni.classList.add("justify-content-center");
                // edit button
                const modifica = document.createElement("button");
                modifica.classList.add("edit");
                modifica.setAttribute("type", "button");
                const mod_icona = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                mod_icona.setAttribute("width", "16");
                mod_icona.setAttribute("height", "16");
                mod_icona.setAttribute("fill", "currentColor");
                mod_icona.setAttribute("viewBox", "0 0 16 16");
                mod_icona.classList.add("bi");
                mod_icona.classList.add("bi-pencil");

                const edit_path = document.createElementNS("http://www.w3.org/2000/svg", "path");
                edit_path.setAttribute("d", "M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325");

                mod_icona.appendChild(edit_path);
                modifica.appendChild(mod_icona);

                // remove button
                const elimina = document.createElement("button");
                modifica.classList.add("remove");
                elimina.setAttribute("type", "button");
                const remove_icon = document.createElementNS("http://www.w3.org/2000/svg","svg");
                remove_icon.setAttribute("width", "16");
                remove_icon.setAttribute("height", "16");
                remove_icon.setAttribute("fill", "currentColor");
                remove_icon.setAttribute("viewBox", "0 0 16 16");
                remove_icon.classList.add("bi");
                remove_icon.classList.add("bi-trash3");
                remove_icon.setAttribute("onclick", "elimina("+c.id+")");
                
                const remove_path = document.createElementNS("http://www.w3.org/2000/svg", "path");
                remove_path.setAttribute("d", "M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5");

                remove_icon.appendChild(remove_path);
                elimina.appendChild(remove_icon);


                blocco_opzioni.appendChild(modifica);
                blocco_opzioni.appendChild(elimina);


                blocco_card.appendChild(codice_barre);
                blocco_card.appendChild(note_section);
                blocco_card.appendChild(blocco_opzioni);

                
                console.log(c.number);
            }
            card_container.appendChild(blocco_card);

        });
        JsBarcode(".barcode").init();
    })

}


//funzione elimina
function elimina (id) {
    return fetch("http://localhost:8080/api/card/"+id, {
        method: "DELETE"
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Errore durante il caricamento delle card");
            }
            alert("Card eliminata");
            response.json();
            return location.reload();
        })
        .catch(error => {

            console.error("Errore:", error);
            return [];
        });
    
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