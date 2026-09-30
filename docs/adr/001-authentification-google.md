# ADR 001 — Authentification avec un compte Google

- Statut : accepté
- Date : 2026-09-29
- Décision : connexion uniquement via OAuth Google (Auth.js)

## Contexte

L’application permet de publier une offre ou un besoin, puis d’ouvrir un jeton entre deux personnes. Il faut savoir qui publie et qui répond, sans créer un réseau social.

Le public visé inclut des parents et des aînés peu à l’aise avec le web. Une deuxième boîte « créer un mot de passe » augmente les abandons et les comptes oubliés.

## Options regardées

1. Compte courriel + mot de passe maison  
2. Connexion Facebook / fil social  
3. Compte Google seulement (OAuth)  
4. Pas de compte, tout public

## Décision

Option 3.

Google fournit un identifiant stable (courriel + id) sans que je stocke un mot de passe. Auth.js gère la session. Un compte suffit pour publier, répondre, et ouvrir un jeton.

## Pourquoi pas les autres

- Mot de passe maison : à stocker, à réinitialiser, à défendre. Charge hors v1.
- Facebook : c’est exactement le chaos qu’on sort du produit (likes, commentaires, fil). L’app n’est pas un réseau social.
- Sans compte : impossible d’attribuer une annonce, un jeton, ou une suppression admin.

## Conséquences

- Il faut un écran Google Cloud (origines + redirect) pour localhost et pour entraideboisbriand.com.
- Les gens sans Gmail sont exclus en v1. Accepté. Un second fournisseur (Apple, courriel) peut s’ajouter plus tard sans changer le métier.
- La session vit dans l’app, pas dans un fil public.

## Ce que ça ne change pas

Un item, un échange, un jeton. Pas de carnet de personnes. Pas de salon général.
