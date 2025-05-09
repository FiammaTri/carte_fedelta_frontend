// funzione per recuperare il parametro 'id' che passeremo da index.js
function getQueryParam(param) {
    const params = new URLSearchParams(window.location.search);
    return params.get(param);
  }

document.body.style.backgroundColor = "#E7E8F5";


// costante per completare l'url
const card_id = getQueryParam('id');

// fetch avvio pagina (mostrare il contenuto delle card - barcode e logo)
document.addEventListener("DOMContentLoaded", function () {
    fetch (`http://localhost:8080/api/card/`+card_id, {
        method: "GET"
    })
        .then(response => response.json())
        .then(card => {
            const card_container = document.getElementById('lista_card');

            card_container.innerHTML = `
                        <img src="${card.store.link}" alt="${card.store.logoName}" width="12%" height="12%" id="immagine_store">
                        <br>
                        <div class="z-3 p-5 rounded-3" id="card_code">
                            <svg class="barcode" weight="100%"s
                                jsbarcode-format="ean13"
                                jsbarcode-value="${card.number}"
                                jsbarcode-textmargin="0"
                                jsbarcode-font="sans-serif"
                                jsbarcode-width="2"
                                jsbarcode-height="100"
                                jsbarcode-displayValue=true>
                            </svg>
                        </div>
            `;

            JsBarcode(".barcode").init();
        })
        .catch(error => console.error("errore: ", error));
    
});


