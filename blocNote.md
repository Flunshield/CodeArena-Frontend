Tests de Fonctionnalités

Exemple : Tester une API qui calcule des statistiques.

```
[
  {
    "name": "Test Moyenne",
    "condition": "getAverage([10, 20, 30]) === 20",
    "successMessage": "La moyenne est correcte.",
    "failureMessage": "Erreur de calcul de la moyenne."
  },
  {
    "name": "Test Médiane",
    "condition": "getMedian([10, 20, 30, 40]) === 25",
    "successMessage": "La médiane est correcte.",
    "failureMessage": "Erreur de calcul de la médiane."
  }
]
```

Tests d'Intégrité des Données
Exemple : Tester une API de gestion de données pour assurer que les entrées invalides sont correctement gérées.

```
[
{
"name": "Test Entrée Nulle",
"condition": "postData(null) === 'Invalid input'",
"successMessage": "Gestion correcte des entrées nulles.",
"failureMessage": "Échec de la gestion des entrées nulles."
},
{
"name": "Test Entrée Mal Formée",
"condition": "postData('unstructured string') === 'Invalid input'",
"successMessage": "Gestion correcte des chaînes mal formées.",
"failureMessage": "Échec de la gestion des entrées mal formées."
}
]
```


