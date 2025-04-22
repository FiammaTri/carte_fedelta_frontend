//Creazione delle card
document.addEventListener ("DOMContentLoaded", function () {
    const container = document.createElement("div");
        container.classList.add("flex-container");

    getCards().then(cards => {
        cards.forEach(card => {
            const carta = document.createElement("div");
            carta.classList.add("carta");

            var logo = document.createElement("img");
            logo.src= card.store_name.logo;

            const negozio = document.createElement("div");
            negozio.classList.add("store-name");
            negozio.textContent = card.store_name.name;

            carta.appendChild(logo);
            carta.appendChild(negozio);
            container.appendChild(carta);
            const cardContainer = document.getElementById("card-container");
            cardContainer.appendChild(container);
            });
    });
});


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


function immagine(){
    const img = document.createElement('img');
    const file = document
const reader = new FileReader();

reader.addEventListener("load", function(){
    img.src=reader.result;
}, false);
if (file) {
    reader.readAsDataURL(file);
}

}

/*
//Filtro card
document.addEventListener("DOMContentLoaded", function() {
    const filtri = document.querySelectorAll(".bottone-ricerca");
    filtri.forEach(filtro => {
        filtro.addEventListener("click", function() {
            const valore = this.id;
            const card = document.querySelectorAll("#flex-container");

            filtri.forEach(riga => {
                if (valore === "")
            })
        })
    })
})
*/