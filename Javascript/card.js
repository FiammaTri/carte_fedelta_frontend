// funzione per recuperare il parametro 'id' che passeremo da index.js
function getQueryParam(param) {
    const params = new URLSearchParams(window.location.search);
    return params.get(param);
  }

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
                        <img src="${card.store_name.link}" alt="${card.store_name.logo_name}" width="10%" height="10%">
                        <br>
                        <svg class="barcode"
                            jsbarcode-format="ean13"
                            jsbarcode-value="${card.number}"
                            jsbarcode-textmargin="0"
                            jsbarcode-font="monospace"
                            jsbarcode-width="2"
                            jsbarcode-height="100"
                            jsbarcode-displayValue=true>
                        </svg>
            `;

            JsBarcode(".barcode").init();
        })
        .catch(error => console.error("errore: ", error));
    
});


