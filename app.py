from flask import Flask, render_template, jsonify, request
import random
import json
import time

app = Flask(__name__)

# Variables globales pour la gestion du jeu
cards = []
revealed_cards = []
start_time = None
scores = []
max_level = 1

# Charger les scores depuis le fichier JSON
def load_scores():
    try:
        with open('scores.json', 'r') as file:
            return json.load(file)
    except FileNotFoundError:
        return [{"time": float('inf')} for _ in range(3)]

# Sauvegarder les scores dans le fichier JSON
def save_scores(scores):
    with open('scores.json', 'w') as file:
        json.dump(scores, file)

# Route principale
@app.route("/")
def index():
    global scores
    scores = load_scores()
    return render_template("index.html", scores=scores, max_level=max_level)

# Route pour démarrer un nouveau niveau
@app.route("/new_level", methods=["POST"])
def new_level():
    global cards, start_time, revealed_cards, max_level
    level = request.json.get("level", 1)
    max_level = max(max_level, level)  # Mettre à jour le niveau maximal atteint
    cards = list(range(1, level * 5 + 1))
    random.shuffle(cards)
    revealed_cards = []
    start_time = time.time()
    return jsonify({"cards": cards, "level": level, "max_level": max_level})

# Route pour recommencer le jeu depuis le début
@app.route("/restart", methods=["POST"])
def restart():
    global cards, revealed_cards, start_time
    level = 1
    cards = list(range(1, level * 5 + 1))
    random.shuffle(cards)
    revealed_cards = []
    start_time = time.time()
    return jsonify({"cards": cards, "level": level, "max_level": max_level})

# Route pour vérifier les cartes retournées
@app.route("/check_card", methods=["POST"])
def check_card():
    global revealed_cards, start_time, scores
    card_value = request.json.get("card_value")
    
    # Vérifier si la carte retournée est celle attendue
    expected_value = len(revealed_cards) + 1
    if card_value != expected_value:
        revealed_cards = []  # Réinitialiser les cartes révélées
        return jsonify({"status": "error", "message": f"Erreur : la carte attendue était {expected_value}, mais vous avez choisi {card_value}."})

    # Ajouter la carte à la liste des cartes révélées si correcte
    revealed_cards.append(card_value)

    # Si toutes les cartes sont correctement retournées
    if len(revealed_cards) == len(cards):
        elapsed_time = round(time.time() - start_time, 2)
        scores.append({"time": elapsed_time})
        scores = sorted(scores, key=lambda x: x["time"])[:3]
        save_scores(scores)
        return jsonify({"status": "success", "message": "Niveau terminé !", "time": elapsed_time})

    return jsonify({"status": "ok"})

# Lancer l'application Flask
if __name__ == "__main__":
    app.run(debug=True)
