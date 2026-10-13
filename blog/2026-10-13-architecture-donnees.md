---
title: Architecture et données
date: 2026-10-13
---

**Décision architecturale**

J’ai choisi Next.js avec TypeScript, PostgreSQL et une authentification Google. Le contexte : une application transactionnelle qui doit survivre au cours, avec des utilisateurs réels et des données personnelles. J’ai écarté un backend séparé (plus de pièces à maintenir pour une personne seule) et une base document (les relations item–échange–jeton sont strictes). La liste fermée de lieux est une règle métier, pas une préférence d’interface : elle est dans le schéma et dans les validations.

**Obstacle**

Le premier déploiement payant (Fly) dépassait ce que je voulais dépenser pour un projet qui doit durer. J’ai basculé sur un Raspberry Pi chez moi, avec un tunnel Cloudflare. L’application est en ligne, le domaine pointe dessus, et je n’ai pas de facture mensuelle. Le déploiement reste manuel pour l’instant ; le CI/CD automatique viendra au Jalon 4.

**Schéma**

Le schéma montre qu’un item n’a qu’un échange, et qu’un échange n’a qu’un jeton. Pas de fil public, pas de relation « ami ». Les lieux sont une table de référence, pas un champ libre. Ça force la règle de sécurité dès la base : on ne peut pas stocker une adresse personnelle.
