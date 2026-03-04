# Rillette

Application web de gestion de films développée avec Angular.

## Prérequis

- Node.js v18+
- Angular CLI
- Le backend doit tourner sur `http://localhost:8080`

## Installation

Clone le projet :

git clone https://github.com/GaetanPsx/Cin-ma
cd Cin-ma

Installe les dépendances :

npm install

## Lancement

Lance le serveur de développement :

ng serve

L'application sera accessible sur `http://localhost:4200`.

## Variables à configurer

L'URL du backend est définie dans `src/app/services/movies-api.ts` :

private readonly url = 'http://localhost:8080/movies';

Modifie cette valeur si ton backend tourne sur un port différent.

## Technologies et librairies utilisées

- **Angular** — Framework frontend principal
- **Bootstrap** — Mise en page et composants CSS
- **ngx-toastr** — Notifications de succès et d'erreur
- **Swiper.js** — Carrousel de films sur la page d'accueil
- **RxJS** — Gestion des données asynchrones et des Observables
