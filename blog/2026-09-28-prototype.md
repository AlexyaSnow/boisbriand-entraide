# 28 septembre 2026 — Prototype local, lecture critique

Deuxième entrée du blogue. Le Jalon 1 demande des fondations, pas une application finie. Cette note dit ce qui est vrai, ce qui est fragile, et ce qui manque encore.

## Invariants métier (non négociables)

1. Un item produit au plus un échange et un jeton.
2. Le clavardage n’existe que dans ce jeton, et seulement tant que l’échange est ouvert.
3. Aucune adresse libre. Les lieux viennent d’une liste fermée, publique, avec horaire.
4. Pas de graphe social : pas de salon, pas de carnet de personnes.
5. L’identité sert à lier une annonce et deux comptes à un jeton. Rien de plus.

Ces règles sont testées dans `tests/echange.test.ts`, `tests/points.test.ts`, `tests/annonce.test.ts` et `tests/admin.test.ts`. La CI exécute `npm test` à chaque poussée sur `main`.

## Ce qui est implanté ce soir

| Capacité | État | Limite |
| --- | --- | --- |
| Vision client (README) | rédigée du point de vue usager | reste courte |
| Issues + labels | 15 stories | plusieurs encore ouvertes (chat, favoris, canaux B/C) |
| CI Vitest | verte sur `main` | ne lance pas `next build`, ne parle pas à Postgres |
| Connexion Google | locale | écran de consentement en mode test |
| Publication offre/besoin | Postgres | pas de moderation humaine hors admin |
| Photo | WebP compressée, disque local + envoi S3 | CloudFront encore à valider bout-en-bout |
| Lieux + ouvert/fermé | 8 points Boisbriand | plusieurs horaires « à vérifier » |
| Répondre | une réponse par compte | pas testé à deux sessions dans la CI |
| Accepter → jeton | oui | le fil de messages n’existe pas encore |
| Admin (supprimer) | courriel dans `ADMIN_EMAILS` | un seul humain, pas de journal d’audit |
| Déploiement public | non | hors exigence du Jalon 1 |

## Décisions et alternatives écartées

**Un dépôt Next.js plutôt que React + API séparée.** Moins de surfaces à garder allumées après le cours. Coût : le serveur et l’interface grandissent dans le même arbre ; il faudra des frontières plus nettes au Jalon 2 (ADRs).

**PostgreSQL plutôt que Mongo.** Le domaine est relationnel (usager, annonce, réponse, échange). Le cours exige du SQL.

**OAuth Google plutôt qu’un mot de passe maison.** Moins de secrets à stocker. Coût : exclusion de quiconque n’a pas Gmail. Un lien magique reste possible plus tard.

**Photos : disque en local, S3 + CloudFront en option.** Le Jalon 1 n’exige pas un CDN. Le bucket `entraide-boisbriand-photos` existe en `ca-central-1`. La lecture publique passe par CloudFront (OAC). Tant que `AUTH_URL` contient `localhost`, l’interface affiche le fichier local pour ne pas dépendre d’un 403 CDN.

**Canaux postal et friperie reportés.** Calibrage solo. Issues #14 et #15.

## Risques pour la note du Jalon 1

Le site du cours évalue des fondations, puis **l’approbation du cadrage**. Une checklist verte ne force pas 100 %.

- Cadrage trop étroit : pas de chat à l’écran, pas de favoris, pas de déploiement.
- Cadrage trop large : AWS + i18n + admin le même soir que les livrables minimum.
- Tests : ils couvrent le métier pur, pas Auth.js ni Prisma. Un correcteur peut le signaler.
- GitHub Projects : optionnel en solo. Je ne simule pas une équipe.
- Secrets : `.env` et clés AWS hors dépôt. Si une clé a fuité hors Git, elle devra être révoquée.

## Prochaine coupe honnête (après remise)

1. Fil de messages borné au jeton, coupé à la clôture.
2. Choix d’un lieu de la liste au moment de l’acceptation.
3. ADR Jalon 2 : frontière domaine / actions / UI, schéma de données dessiné.
4. Déploiement payant avec export SQL.
5. Resserrer la politique IAM (plus `AmazonS3FullAccess`).

Si le cadrage est refusé, on rétrécit avant d’ajouter du chat.
