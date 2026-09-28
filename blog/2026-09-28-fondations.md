# 28 septembre 2026 — Fondations

Billet exigé par le Jalon 1 du cours INF 1410 (TÉLUQ).

## Qui sont les utilisateurs et quel problème je résous ?

Les utilisateurs sont des citoyennes et citoyens de Boisbriand (et, plus largement, de la MRC Thérèse-De Blainville) qui donnent ou cherchent déjà des ressources dans des groupes Facebook de type « donner au suivant » : vêtements, denrées non périssables, articles pour enfants.

Le problème n’est pas l’absence d’entraide. C’est le désordre autour : commentaires, likes, rendez-vous au domicile, adresses échangées n’importe où, aucune trace claire qu’un item est encore disponible.

Je construis un service web transactionnel étroit. On publie une offre ou un besoin. On accepte une seule mise en relation. On se voit uniquement dans un lieu public choisi dans une liste fermée. Un item produit un échange et un jeton. Le clavardage n’existe que dans ce jeton et meurt à la clôture. Il n’y a pas de salon, pas de carnet de personnes, pas d’adresse libre.

## Choix techniques

| Choix | Décision |
| --- | --- |
| Langage | TypeScript |
| Application | Next.js (interface et partie serveur dans un même dépôt) |
| Données | PostgreSQL |
| Identité | OAuth Google (compte Gmail) |
| Tests | Vitest |
| CI | GitHub Actions, à chaque poussée |
| Reproductibilité | Docker Compose (dès que l’app dépasse le cœur métier) |
| Hébergement | service payant portable (Fly, Railway, Render ou VPS), décidé au déploiement |

Aujourd’hui le dépôt contient le cœur métier testé (liste fermée des lieux, jeton, mort du chat) et la pipeline. Next.js et Postgres arriveront dès que ces fondations sont approuvées. Je ne gonfle pas le Jalon 1 avec une peau vide.

## Alternatives considérées

**Django (Python, tout-en-un).** Solide pour quinze ans, admin déjà là, très « civic tech ». Je l’ai écarté pour l’instant parce que je maintiens déjà du React et qu’un second langage augmenterait la charge d’une personne seule.

**React + Express (Node nu) dans deux déploiements.** Je connais le motif. Deux repos ou deux services à garder allumés, c’est ce qui éteint les projets après un cours. Next.js garde un seul dépôt.

**MongoDB.** Interdit par l’esprit du cours (SQL exigé) et mal adapté : utilisateur, annonce, échange et lieu sont relationnels.

**Auth maison (courriel + mot de passe stocké).** Plus de surface à protéger, pour un gain nul. Google ouvre une session. Ce n’est pas un réseau social.

**Canaux postal et friperie dès le Jalon 1.** Ambition réelle, mauvais calibrage solo. Ils restent des issues « plus tard ».

## Ce qui est encore incertain

- L’hébergeur exact. Je paierai ; je refuse un verrouillage sans export SQL.
- Google comme seule porte. Une personne sans compte Gmail est exclue. Un lien magique par courriel pourra s’ajouter plus tard.
- La granularité des heures d’ouverture par lieu (données à vérifier une à une à Boisbriand).
- Le moment où Next.js et Postgres entrent dans le dépôt sans noyer le Jalon 1.
- L’approbation du cadrage par la personne tutrice : trop étroit ou juste assez.
