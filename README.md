# Entraide Boisbriand

Une application pour donner et recevoir sans fil public, sans rendez-vous au domicile.

## À qui s’adresse l’application

Vous habitez Boisbriand (ou la MRC Thérèse-De Blainville).
Vous avez un manteau d’enfant trop petit, une boîte de denrées non périssables, ou au contraire un besoin urgent.
Aujourd’hui ça se publie dans un groupe « donner au suivant ». Les commentaires s’empilent. Les rendez-vous se font n’importe où. Parfois chez quelqu’un.

Cette application est faite pour **vous**, pas pour collectionner des amis.

## Le problème

L’entraide existe déjà. Elle est noyée.

- trop de fils publics
- des adresses de domicile échangées en privé
- aucune trace claire : l’item est-il encore disponible ?
- difficile de se rejoindre quand on n’a pas de voiture

## La solution

Vous publiez **une offre** ou **un besoin** (un item à la fois), avec une photo si vous voulez.
Quelqu’un répond. Vous acceptez **une** réponse.
L’application crée un **échange** lié à un **jeton unique**.
Vous choisissez un lieu dans une **liste fermée** : bibliothèque, IGA, Tim Hortons, etc. Des lieux publics, ouverts, fréquentés.
Vous vous parlez **seulement** dans le fil de cet échange.
Quand l’item est remis (ou annulé), le jeton meurt. Vous ne restez pas en contact dans l’application.

Vous pourrez épingler 2 ou 3 **lieux favoris** (pas des personnes) si vous vous déplacez à pied.

## Ce que l’application ne fait pas

- pas de salon public
- pas de commentaires sous l’annonce
- pas d’adresse tapée à la main
- pas de rendez-vous à domicile
- pas de réseau d’« amis entraide »

## Première version (canal A)

Rencontre en personne, lieu autorisé seulement.

Plus tard, si ce canal tient : dépôt postal, casier, ou friperie partenaire. Pas avant.

## Compte

Connexion avec **Google / Gmail**.
Cela sert à savoir qui publie et qui s’engage dans un échange. Ce n’est pas un réseau social.

## Où en est le prototype

Dépôt unique Next.js + TypeScript + PostgreSQL.
Déjà en local : connexion Google, publication, photo, liste fermée de lieux, réponse, jeton, suppression admin.
Pas encore déployé en ligne.

## Blogue technique

- [28 septembre 2026 — Fondations](blog/2026-09-28-fondations.md)

## Licence

Logiciel libre. Le dépôt est public.

Projet réalisé dans le cadre du cours INF 1410 (TÉLUQ), session Automne 2026, puis maintenu en open source.
