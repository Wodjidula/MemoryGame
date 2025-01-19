# Jeu de Mémoire

**Un jeu de mémoire simple créé avec Flask.**

## Description

Ce projet implémente un jeu de mémoire basique où le joueur doit retourner des cartes dans leur ordre de valeur croissante. 

## Fonctionnalités

* **Niveaux multiples:** Progressez à travers des niveaux de difficulté croissants.
* **Scoring:** Suivez vos meilleurs scores pour chaque niveau.
* **Interface utilisateur:** Interface web simple et intuitive.
* **Design réactif:** Le jeu s'adapte à différentes tailles d'écran.

## Technologies utilisées

* **Flask:** Framework web Python pour construire l'application.
* **HTML, CSS, JavaScript:** Technologies front-end pour créer l'interface du jeu.

## Installation

1. **Cloner le dépôt:**
   ```bash
   git clone https://github.com/Wodjidula/MemoryGame.git
2. **Créer un environnement virtuel (recommandé):**
   ```bash
   python3 -m venv venv
3. **Installer les dépendances:**
   ```bash
   pip install -r requirements.txt
4. **Lancer l'application:**
   ```bash
   flask run

## Règles du jeu

    Le jeu commence avec un ensemble de cartes faces cachées.
    Le joueur clique sur une carte pour révéler sa valeur.
    Le joueur doit retourner toutes les cartes mais dans l'ordre croissant.
    Si la carte retournée n'est pas celle esperée, toutes les cartes révelées sont retournées.
    Les temps de complétion les plus rapides donnent des scores plus élevés.

## Contribuer

Les contributions sont les bienvenues ! N'hésitez pas à soumettre une demande de tirage (pull request) ou à ouvrir une issue.
Pour toute question ou demande, veuillez contacter evaristeisgood@gmail.com
