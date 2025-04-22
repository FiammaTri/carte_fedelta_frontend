
document.addEventListener("DOMContentLoaded", function () {
    fetch (`http://localhost:8080/api/card`, {
        method: "GET"
    })
        .then(response => response.json())
        .then(cards => {
            const card = cards.map(c => {
                
                return `<svg class="barcode"
                            jsbarcode-format="EAN13"
                            jsbarcode-value="123456789012"
                            jsbarcode-textmargin="0"
                            jsbarcode-fontoptions="bold">
                        </svg>`;
            }).join('');
            document.getElementById('lista_card').innerHTML = card;
        })
        .catch(error => console.error("errore: ", error));
    
});

JsBarcode(".barcode").init();