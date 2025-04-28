document.addEventListener("DOMContentLoaded", function () {
    fetch (`http://localhost:8080/api/card`, {
        method: "GET"
    })
        .then(response => response.json())
        .then(cards => {
            const card = cards.map(c => {
                let id_value = c.id;
                let number_value = c.number;
                return `<svg class="barcode"
                            jsbarcode-format="ean13"
                            jsbarcode-value="${number_value}"
                            jsbarcode-textmargin="0"
                            jsbarcode-font="monospace"
                            jsbarcode-width="2"
                            jsbarcode-height="100"
                            jsbarcode-displayValue=true>
                        </svg>`;
            }).join('');
            document.getElementById('lista_card').innerHTML = card;
            JsBarcode(".barcode").init();
        })
        .catch(error => console.error("errore: ", error));
    
});


