# ADR 001 — Identification des intervenants

| | |
| --- | --- |
| Statut | Accepté |
| Date | 2026-09-29 |
| Portée | Canal A, itération 1 |
| Qualités visées | Confidentialité, simplicité d’usage, évolutivité |

## 1. Énoncé du problème

Le métier relie deux rôles autour d’un seul item : celui qui publie, celui qui répond. L’acceptation produit un jeton, unique, qui meurt à la remise ou à l’annulation. Sans identité stable, on ne peut ni attribuer une annonce, ni borner le fil de discussion, ni exercer le droit de retrait (suppression d’une fiche abusive).

Il faut donc un mécanisme d’authentification. Il ne doit pas introduire un graphe social (abonnements, fil, réactions), ni une gestion locale de secrets si une solution éprouvée suffit.

## 2. Critères

Les options sont jugées sur quatre critères, ordonnés :

1. **Minimisation des secrets hébergés** — l’application ne doit pas devenir un coffre-fort de mots de passe.
2. **Séparation d’avec le social** — le fournisseur ne doit pas ramener likes, commentaires ou graphe d’amis dans le produit.
3. **Charge cognitive** — une personne peu habituée au web doit pouvoir publier sans créer un n-ème couple identifiant / mot de passe.
4. **Coût de substitution** — changer de fournisseur plus tard ne doit pas forcer à réécrire les règles d’échange.

## 3. Solutions examinées

| | Secrets chez nous | Couplage social | Compte à créer | Substitution |
| --- | --- | --- | --- | --- |
| A. Courriel + mot de passe local | Oui (hachage, reset, fuite) | Non | Oui | Facile |
| B. OAuth Facebook | Non | Fort | Souvent déjà là | Moyen |
| C. OAuth Google | Non | Faible (profil seulement) | Souvent déjà là | Moyen |
| D. Aucun compte | — | — | Non | Impossible à attribuer |

D est éliminé : le jeton exige deux identifiants distincts.  
A déplace le risque vers l’hébergeur (Pi, disque, sauvegardes) sans gain métier.  
B contredit le cadrage : on retire l’entraide des groupes Facebook précisément pour éviter le fil public.

## 4. Décision

**C.** Auth.js, fournisseur Google, session côté application.  
L’identifiant retenu est celui que Google expose (sous-jacent : `sub` + courriel). Aucun mot de passe n’est stocké dans PostgreSQL.

Le domaine `entraideboisbriand.com` et `localhost:3000` sont les deux origines autorisées du client OAuth. Le périmètre demandé se limite à `openid email profile`.

## 5. Conséquences

Favorables : pas de table de mots de passe ; un clic pour une personne qui a déjà Gmail ; le schéma métier (`User`, `Annonce`, `Echange`) reste indépendant du fournisseur.

Défavorables : exclusion, en v1, de quiconque refuse Google. Dette assumée. Un second fournisseur (Apple, ou courriel magique) s’ajoute par configuration Auth.js, sans modifier le cycle item → acceptation → jeton → clôture.

Hors décision : le carnet de personnes, le fil public, les canaux B et C.

## 6. Révision

Revoir cet ADR si un second fournisseur devient un besoin mesurable (plaintes répétées, public aîné sans Gmail) ou si Google restreint le client OAuth.
