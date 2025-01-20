let level = 1;
let levelCompleted = false; // Variable pour suivre si le niveau a été complété

document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("start-button");
    const newLevelButton = document.getElementById("new-level-button");
    const restartButton = document.getElementById("restart-button");
    const gameBoard = document.getElementById("game-board");
    const levelDisplay = document.getElementById("level");
    const maxLevelDisplay = document.getElementById("max-level");

    // Afficher les cartes initiales
    function displayInitialCards() {
        gameBoard.innerHTML = "";
        for (let i = 0; i < 5; i++) {
            const cardElement = document.createElement("div");
            cardElement.classList.add("card");
            cardElement.textContent = "🃏";
            gameBoard.appendChild(cardElement);
        }
    }

    displayInitialCards();

    // Lancer le jeu
    startButton.addEventListener("click", () => {
        startButton.style.display = "none";
        newLevelButton.style.display = "none";  // Masquer le bouton "Niveau suivant" au début
        loadNewLevel();
    });

    // Charger un nouveau niveau
    newLevelButton.addEventListener("click", () => {
        if (levelCompleted) {
            level++;
            levelDisplay.textContent = `Niveau: ${level}`;
            loadNewLevel();
        }
    });

    // Recommencer le jeu
    restartButton.addEventListener("click", () => {
        level = 1;
        levelDisplay.textContent = `Niveau: ${level}`;
        loadRestart();
    });

    // Fonction pour charger un nouveau niveau depuis le serveur
    function loadNewLevel() {
        fetch("/new_level", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ level: level }),
        })
            .then((response) => response.json())
            .then((data) => {
                gameBoard.innerHTML = "";
                maxLevelDisplay.textContent = `Niveau maximal atteint: ${data.max_level}`;
                data.cards.forEach((card) => {
                    const cardElement = document.createElement("div");
                    cardElement.classList.add("card");
                    cardElement.textContent = "🃏";
                    cardElement.addEventListener("click", () => flipCard(card, cardElement));
                    gameBoard.appendChild(cardElement);
                });

                // Réinitialiser l'état de la réussite du niveau
                levelCompleted = false;

                // Afficher le bouton "Recommencer" à partir du niveau 2
                if (level >= 2) {
                    restartButton.style.display = "inline-block";
                }
            });
    }

    // Fonction pour redémarrer depuis le début
    function loadRestart() {
        fetch("/restart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        })
            .then((response) => response.json())
            .then((data) => {
                gameBoard.innerHTML = "";
                maxLevelDisplay.textContent = `Niveau maximal atteint: ${data.max_level}`;
                data.cards.forEach((card) => {
                    const cardElement = document.createElement("div");
                    cardElement.classList.add("card");
                    cardElement.textContent = "🃏";
                    cardElement.addEventListener("click", () => flipCard(card, cardElement));
                    gameBoard.appendChild(cardElement);
                });

                restartButton.style.display = "none";
            });
    }

    // Retourner une carte
    function flipCard(cardValue, cardElement) {
        fetch("/check_card", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ card_value: cardValue }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === "error") {
                    alert(data.message);
                    // Réinitialiser toutes les cartes
                    document.querySelectorAll(".card").forEach((card) => (card.textContent = "🃏"));
                } else if (data.status === "success") {
                    alert(`${data.message} Temps: ${data.time}s`);
                    levelCompleted = true; // Marquer que le niveau est complété
                    newLevelButton.style.display = "inline-block"; // Afficher le bouton Niveau suivant
                } else {
                    cardElement.textContent = cardValue; // Révéler la carte correctement
                }
            });
    }
    const instructionsButton = document.getElementById("instructions-button");
    const modal = document.getElementById("instructions-modal");
    const closeButton = modal.querySelector(".close-button");

    // Ouvrir la modale
    instructionsButton.addEventListener("click", () => {
        modal.style.display = "block";
    });

    // Fermer la modale
    closeButton.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Fermer la modale en cliquant en dehors du contenu
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});
