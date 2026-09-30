# ADR 002 — Lieux d’échange : liste fermée

| | |
| --- | --- |
| Statut | Accepté |
| Date | 2026-09-29 |
| Portée | Canal A, itération 1 |
| Qualités visées | Sûreté, contrôlabilité, simplicité |
| Lié | ADR 001 (identité) ; axiome un item / un échange / un jeton |

## 1. Énoncé du problème

L’échange matériel a lieu hors ligne. Si le système accepte une adresse saisie librement, deux inconnus peuvent convenir d’un domicile, d’un stationnement isolé ou d’un horaire sans témoin. Le produit se présente comme une alternative aux groupes « donner au suivant », où cette dérive est déjà observée.

La question n’est pas « comment géolocaliser ». C’est : **qui a le droit de nommer le lieu**.

## 2. Critères

1. **Présence d’un cadre public** — caméras d’établissement et heures d’ouverture vérifiables.
2. **Interdiction du domicile** — aucune chaîne de caractères libre n’entre dans le jeton.
3. **Énumérabilité** — le domaine peut tester « ce point existe-t-il ? » sans appel réseau.
4. **Accessibilité** — une personne sans voiture doit pouvoir épingler deux ou trois points de la liste, pas un carnet d’humains.

## 3. Solutions examinées

| | Cadre public | Domicile possible | Testable en unitaire | Charge v1 |
| --- | --- | --- | --- | --- |
| A. Adresse libre (texte) | Non garanti | Oui | Non | Faible à coder, élevée à assumer |
| B. Carte + pin arbitraire | Variable | Oui | Faible | Géocodeur, abus |
| C. Liste fermée dans le code / la base | Oui, par construction | Non | Oui | Courte liste Boisbriand |
| D. Relais (casiers, Postes, friperie) | Oui | Non | Oui | Hors canal A |

A et B échouent les critères 1 et 2.  
D est reporté (canaux B et C) : utile, mais ce n’est pas le plus petit système qui tient l’invariant de sûreté.

## 4. Décision

**C.** L’utilisateur choisit un identifiant parmi `POINTS_AUTORISES`. Le jeton ne stocke que cet identifiant (`pointId`), jamais une ligne d’adresse saisie.

Les points v1 sont des lieux publics de Boisbriand (bibliothèque, hôtel de ville, IGA Faubourg, Tim Hortons recensés). Les horaires officiels, lorsqu’ils sont documentés par la Ville ou le commerçant, sont encodés dans le domaine ; à défaut le point reste marqué « à vérifier » plutôt que d’inventer une plage.

Les favoris sont un sous-ensemble de cette liste (maximum trois), pas une liste de personnes.

## 5. Conséquences

Favorables : le test `estPointAutorise(id)` est déterministe ; l’UI ne peut pas « oublier » la règle ; un entretien au tableau se démontre avec deux identifiants et un rejet.

Défavorables : un lieu absent de la liste n’existe pas pour l’app, même s’il est public. Étendre la liste est une modification de domaine, pas un champ texte. Les canaux B et C restent des ADR distincts.

## 6. Révision

Revoir si la Ville propose un point filmé non listé, ou si B/C passent en itération courante. Ne pas rouvir A « pour plus de souplesse » : la souplesse est le risque qu’on élimine.
