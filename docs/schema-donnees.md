# Schéma de données — Entraide Boisbriand (canal A)

INF 1410, travail solo. Source de vérité technique : `prisma/schema.prisma` et les migrations.  
Ce fichier commente le **métier**, pas l’interface.

## Ce que le domaine impose

- 1 annonce = 1 item (offre **ou** besoin)
- plusieurs réponses possibles ; **un seul** échange à la fois
- 1 échange = 1 jeton unique = le seul fil de messages
- lieu = identifiant d’une **liste fermée** (code `POINTS_AUTORISES`), jamais une adresse tapée
- favoris = lieux, pas des personnes
- clôture « remis » prévue : les deux usagers + un admin ; 7 jours sans réponse de l’autre → litige (admin tranche)

Le schéma SQL doit pouvoir dire non : pas de second jeton sur la même annonce, pas de message orphelin.

## Tables Auth.js (hors métier)

`User`, `Account`, `Session`, `VerificationToken` : session Google.  
Aucun mot de passe local. Pas de graphe d’amis.

## Tables métier

| Table | Rôle | Champs utiles | Interdit |
| --- | --- | --- | --- |
| `Annonce` | L’item publié | `type` offre/besoin, `categorie`, `titre`, `detail`, `photos[]` (max 4 côté app), `photoUrl` vignette, `statut` ouverte/reservee/fermee | adresse libre, fil public |
| `Reponse` | « Je veux cet item » avant le jeton | `annonceId` + `auteurId` uniques ensemble | texte de chat |
| `Echange` | Le contrat | `jeton` unique, `annonceId` unique, `offrantId`, `demandeurId`, `pointId` (liste fermée), `creneauDebut`, `statut` | 2e item, 2e jeton parallèle |
| `Message` | Chat **dans** le jeton | `texte`, auteur, date | salon sur l’annonce |
| `FavoriLieu` | Lieux préférés | `userId` + `pointId` uniques | carnet de contacts |

## Relations (une phrase)

Un `User` publie une `Annonce`. D’autres `User` créent des `Reponse`. L’auteur en accepte une : création d’un `Echange` (jeton). Les `Message` n’existent que rattachés à cet `Echange`. Favori = couple utilisateur / identifiant de lieu.

Contraintes Prisma déjà en place :

- `Echange.annonceId` unique → une annonce, un jeton
- `Echange.jeton` unique
- `Reponse` unique `(annonceId, auteurId)`
- `FavoriLieu` unique `(userId, pointId)`
- suppression en cascade des messages si l’échange part

## Statuts

**Annonce :** `ouverte` → `reservee` (jeton créé) → `fermee` (remis ou annulé).

**Échange (code actuel) :** `ouvert` | `remis` | `annule`.

**Échange (règle métier acceptée, à coller plus tard si on code la clôture serrée) :**  
`ouvert` → déclaration remis → validation de l’autre → confirmation admin → `remis`.  
Silence 7 jours → `litige`. Annulation à tout moment → `annule` (pas de compteur).

Le compteur « familles aidées / paniers » ne lit que `Echange.statut = remis`.

## Ce qui n’a pas de table

- les lieux publics (fichier / module, pas une table éditable par l’usager)
- likes, commentaires d’annonce, avis sur une personne
- canaux B (casiers / Postes) et C (friperie)

## Ce que ça dit du domaine

La base n’est pas un réseau. C’est un **pipeline court** : item → acceptation → lieu filmé → mort du jeton. Si on ajoutait une table « amis » ou une adresse libre, le schéma cesserait de correspondre au cadrage validé.
