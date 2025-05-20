// colore sfondo
document.body.style.backgroundColor = "#E7E8F5";    

// VARIABILI, COSTANTI, ETC
const card_container = document.getElementById('lista_card');
const close = document.getElementById("close");
const modal = document.getElementById("modal_id");
const name_store = getQueryParam('store');

// set per il for-each
let mostrato = new Set();

// EVENT-LISTENERS PER LA CHIUSURA DEL FORM
close.addEventListener("click", () => modal.classList.remove('show-modal'));

window.addEventListener('click', e => {
    e.target === modal ? modal.classList.remove('show-modal') : false;
});

// FUNZIONI

// per recuperare il parametro 'id' che passeremo da index.js
function getQueryParam(param) {
    const params = new URLSearchParams(window.location.search);
    return params.get(param);
}

// fetch-barcodes
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

// fetch-logo
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

// funzione che raccoglie le due precedenti. Costruzione delle card attraverso una manipolazione del DOM (appendChild)
function start() {
    
        const logoCard = document.createElement("img");
    getLogoByStoreName(name_store).then(store => {
        
        logoCard.setAttribute("src", store.link);
        logoCard.setAttribute("alt", store.storeName);
        logoCard.setAttribute("width", "12%");
        logoCard.setAttribute("height", "12%");
        logoCard.setAttribute("id", "immagine_store");
    });
        card_container.appendChild(logoCard);
        card_container.appendChild(document.createElement("br"));

    getCardsByStoreName(name_store).then(cards => {
        cards.forEach(c => {
            const mostratoId = (typeof c.store === 'object' && c.store !== null) ? c.store.id : c.store;
            const blocco_card = document.createElement("div");
            blocco_card.classList.add("d-flex");
            blocco_card.classList.add("flex-column");
            blocco_card.classList.add("align-items-center");
            
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
                    note_section.textContent = "(nessuna nota)";
                } else {
                    note_section.textContent = "Note: " + c.notes;
                }

                //creazione div con bottoni 'modifica' e 'elimina'
                const blocco_opzioni = document.createElement("div");
                blocco_opzioni.classList.add("d-flex");
                blocco_opzioni.classList.add("justify-content-center");
                // edit button
                const modifica_btn = document.createElement("button");
                modifica_btn.classList.add("edit");
                modifica_btn.setAttribute("type", "button");
                modifica_btn.addEventListener('click', () => apertura_form(c.number, c.notes, c.id));
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
                modifica_btn.appendChild(mod_icona);

                // remove button
                const elimina_btn = document.createElement("button");
                elimina_btn.classList.add("remove");
                elimina_btn.setAttribute("text", "Elimina card");
                elimina_btn.setAttribute("type", "button");
                elimina_btn.addEventListener('click', () => elimina(c.id));
                const remove_icon = document.createElementNS("http://www.w3.org/2000/svg","svg");
                remove_icon.setAttribute("width", "16");
                remove_icon.setAttribute("height", "16");
                remove_icon.setAttribute("fill", "currentColor");
                remove_icon.setAttribute("viewBox", "0 0 16 16");
                remove_icon.classList.add("bi");
                remove_icon.classList.add("bi-trash3");
                
                const remove_path = document.createElementNS("http://www.w3.org/2000/svg", "path");
                remove_path.setAttribute("d", "M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5");

                remove_icon.appendChild(remove_path);
                elimina_btn.appendChild(remove_icon);


                blocco_opzioni.appendChild(modifica_btn);
                blocco_opzioni.appendChild(elimina_btn);


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


//elimina card
function elimina (id) {
    if(!window.confirm("Vuoi eliminare questa card?"))
        return location.reload();


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

// per aprire il form
function apertura_form(numero_carta, note, id) {
    modal.classList.add('show-modal');
    const numero_input = document.getElementById('numero');
    numero_input.value = numero_carta;
    const note_input = document.getElementById('note');
    note_input.value = note;

    // event listenter per il click sul tasto di invio del form
    document.getElementById('invio-form').onclick = function() {
        if (numero_input.value < 11) {
            alert("Inserire 12 cifre per il nuovo numero della card");
            location.reload();
        }
       modifica_func(numero_input.value, note_input.value, id);
    };

    // event listener per il tasto di invio all'interno del form
    document.getElementById('invio-form').addEventListener("keydown", function (e) {
        
        if (e.code==="Enter") {
            modifica_func(numero_input.value, note_input.value, id);    
        }
        
        if (numero_input.value < 11) {
            alert("Inserire 12 cifre per il nuovo numero della card");
            location.reload();
        }

    })
}

// per modificare una specifica card
function modifica_func (num, note, id) {
    return fetch("http://localhost:8080/api/card/"+id, {
        method: "PUT",
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ number: num, notes: note })
    })
        .then(response => {
            if(!response.ok) {
                throw new Error('Errore');
            }
            return response.json();
        })
        .then(data => {
            alert("Modifica effettuata!");
            location.href = "index.html";
            modal.classList.remove('show-modal');
            console.log("Card modificata: ", data);
        })
        .catch(error => {
            console.error("Errore: ", error);
        })
}

// avvio funzione principale
start();


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