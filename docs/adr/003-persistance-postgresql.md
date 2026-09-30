# ADR 003 — Persistance : PostgreSQL

| | |
| --- | --- |
| Statut | Accepté |
| Date | 2026-09-29 |
| Portée | Canal A ; schéma métier (annonce, jeton, message) |
| Qualités visées | Intégrité, durabilité, indépendance de l’UI |
| Lié | ADR 001 (User) ; ADR 002 (`pointId` énumérable) |

## 1. Énoncé du problème

Le domaine impose des invariants : une annonce a un auteur ; un jeton relie exactement deux utilisateurs et un item ; un message n’existe que dans ce jeton ; un lieu d’échange est un identifiant de liste fermée. Ces règles doivent survivre à un changement de page Next.js, à un redémarrage du Pi, et à une évolution d’interface dans quinze ans.

Il faut donc un lieu de vérité qui n’est pas le répertoire `app/`.

## 2. Critères

1. **Intégrité référentielle** — le moteur refuse un jeton sans annonce, un message sans jeton.
2. **Durée de vie** — le schéma reste lisible si l’UI est réécrite (contrainte de session : horizon long, pas un devoir jetable).
3. **Transactions** — accepter une réponse et créer le jeton doivent réussir ensemble ou échouer ensemble.
4. **Exploitation locale** — doit tourner sur un Raspberry Pi sans service cloud obligatoire.

## 3. Solutions examinées

| | Intégrité | Transactions | Horizon 15 ans | Sur Pi |
| --- | --- | --- | --- | --- |
| A. Fichiers JSON | Non | Non | Fragile | Oui |
| B. SQLite fichier unique | Partielle | Oui | Possible, un fichier à corrompre | Oui |
| C. PostgreSQL 16 | Oui (FK, unicités) | Oui | Standard SQL | Oui (Docker) |
| D. Base hébergée seulement (Neon, etc.) | Oui | Oui | Oui | Dépend d’une facture |

A ne peut pas exprimer « un item, un échange ».  
B suffirait pour un prototype de cours ; la corruption d’un seul fichier et l’absence de rôles distincts pèsent si le site doit vivre.  
D contredit le choix d’hébergement à coût nul (Pi + tunnel).

## 4. Décision

**C.** PostgreSQL 16, conteneur Docker, schéma décrit par Prisma.  
Les migrations (`prisma/migrations`) sont la trace du modèle. L’UI lit et écrit via le client généré ; elle ne possède pas les règles.

Le jeton est une valeur unique en base (`Echange.jeton`), pas un fil de discussion calculé dans React.

## 5. Conséquences

Favorables : les tests de domaine restent indépendants de Next ; un `migrate deploy` sur le Pi rejoue l’histoire du schéma ; on peut remplacer l’interface sans exporter un JSON ad hoc.

Défavorables : Docker est un prérequis de l’exploitation ; une coupure du volume `pgdata` perd les annonces si aucune sauvegarde n’existe encore. Dette d’exploitation, pas de modèle.

Hors décision : le moteur de recherche plein texte, le multi-région, un ORM autre que Prisma.

## 6. Révision

Revoir si l’hébergement quitte le Pi pour de bon, ou si une contrainte de cours impose un autre SGBD. Ne pas revenir à JSON « pour aller plus vite » : la vitesse se paie sur l’invariant du jeton.
