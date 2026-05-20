import type { Exercise } from "./courseData";

// Exercices supplémentaires pour chaque module — niveau débutant absolu
// Beaucoup de pratique, explications simples, pas à pas
export const bonusExercises: Record<string, Record<string, Exercise[]>> = {

  // ═══════════════════════════════════════════════
  // C 00 — write(), ASCII, boucles
  // ═══════════════════════════════════════════════
  "c00": {
    "c00-write": [
      {
        id: "c00-bonus-1",
        type: "mcq",
        question: "Que fait cette ligne ?\n  write(1, &c, 1);",
        options: [
          "Elle affiche la variable c sur l'écran",
          "Elle lit un caractère depuis le clavier",
          "Elle écrit 1 octet (la valeur de c) sur la sortie standard",
          "Elle copie c dans la mémoire"
        ],
        answer: "Elle écrit 1 octet (la valeur de c) sur la sortie standard",
        explanation: "write(fd, pointeur, taille) : fd=1 = écran (stdout), &c = adresse de c (pointeur), 1 = 1 seul octet à écrire."
      },
      {
        id: "c00-bonus-2",
        type: "mcq",
        question: "Quel fichier d'en-tête faut-il inclure pour utiliser write() ?",
        options: ["#include <stdio.h>", "#include <unistd.h>", "#include <stdlib.h>", "#include <string.h>"],
        answer: "#include <unistd.h>",
        explanation: "write() est un appel système UNIX défini dans <unistd.h>. <stdio.h> contient printf(), <stdlib.h> contient malloc(), <string.h> contient strlen()."
      },
      {
        id: "c00-bonus-3",
        type: "fill",
        question: "Complète : pour afficher la lettre 'A' avec write(), tu écris :\n  char c = ___;\n  write(1, &c, 1);",
        answer: "'A'",
        explanation: "On met 'A' dans la variable c. En ASCII, 'A' = 65. write() lit l'octet stocké à l'adresse &c et l'affiche sur l'écran."
      },
      {
        id: "c00-bonus-4",
        type: "output",
        question: "Que va afficher ce code ?\n\nvoid ft_putchar(char c)\n{\n    write(1, &c, 1);\n}\n\nft_putchar('1');\nft_putchar('3');\nft_putchar('3');\nft_putchar('7');",
        options: ["1337", "1 3 3 7", "abcd", "Rien"],
        answer: "1337",
        explanation: "Chaque appel ft_putchar() affiche UN caractère. Les 4 appels affichent '1', '3', '3', '7' collés = \"1337\"."
      },
      {
        id: "c00-bonus-5",
        type: "mcq",
        question: "Quelle est la valeur ASCII de '0' (le chiffre zéro) ?",
        options: ["0", "48", "57", "65"],
        answer: "48",
        explanation: "Table ASCII : '0'=48, '1'=49, ..., '9'=57, 'A'=65, 'a'=97. Pour afficher un chiffre n avec write(), on doit écrire : char c = n + '0'; (car 0 + 48 = '0', 1 + 48 = '1', etc.)"
      },
      {
        id: "c00-bonus-6",
        type: "output",
        question: "Que va afficher ce code ?\n\nchar c;\nc = 'a';\nwhile (c <= 'e')\n{\n    write(1, &c, 1);\n    c++;\n}",
        options: ["abcde", "abcdef", "a b c d e", "ABCDE"],
        answer: "abcde",
        explanation: "c commence à 'a' (97). Chaque c++ augmente d'un la valeur ASCII : a(97), b(98), c(99), d(100), e(101). La boucle s'arrête quand c > 'e' (101). Résultat : \"abcde\"."
      },
      {
        id: "c00-bonus-7",
        type: "fill",
        question: "Pour afficher le chiffre 7 avec write(), tu dois d'abord le convertir en caractère. Écris l'expression qui donne le char correspondant au chiffre 7 :",
        answer: "7 + '0'",
        explanation: "'0' vaut 48 en ASCII. 7 + 48 = 55, qui est le code ASCII de '7'. Donc write(1, &(char){7 + '0'}, 1) affiche bien le caractère '7'."
      },
      {
        id: "c00-bonus-8",
        type: "mcq",
        question: "Combien de paramètres prend la fonction write() ?",
        options: ["1", "2", "3", "4"],
        answer: "3",
        explanation: "write(fd, buf, count) : 3 paramètres. fd = descripteur de fichier (1 pour l'écran), buf = pointeur vers les données à écrire, count = nombre d'octets à écrire."
      },
      {
        id: "c00-bonus-9",
        type: "output",
        question: "Que va afficher ce code ?\n\nchar c = 'Z';\nwrite(1, &c, 1);\nc = c + 32;\nwrite(1, &c, 1);",
        options: ["Zz", "ZZ", "zZ", "z z"],
        answer: "Zz",
        explanation: "'Z' = ASCII 90. 90 + 32 = 122 = 'z'. On affiche d'abord 'Z' puis 'z'. La différence de 32 entre majuscule et minuscule est une règle ASCII fondamentale."
      },
      {
        id: "c00-bonus-10",
        type: "mcq",
        question: "Dans write(1, &c, 1), que représente le '1' final ?",
        options: [
          "Le numéro de la ligne à écrire",
          "Le nombre d'octets à écrire (ici, 1 seul octet = 1 char)",
          "La taille de la variable c",
          "Le descripteur de fichier"
        ],
        answer: "Le nombre d'octets à écrire (ici, 1 seul octet = 1 char)",
        explanation: "Le 3ème paramètre de write() est la taille : combien d'octets écrire. Un char = 1 octet donc on met 1. Si on voulait écrire une chaîne de 5 chars, on mettrait 5."
      },
      {
        id: "c00-bonus-11",
        type: "mcq",
        question: "Quelle est la valeur ASCII de 'a' (minuscule) ?",
        options: ["65", "90", "97", "122"],
        answer: "97",
        explanation: "Retiens : 'A'=65, 'Z'=90, 'a'=97, 'z'=122. La différence majuscule/minuscule est toujours 32. 'a' = 'A' + 32 = 65 + 32 = 97."
      },
      {
        id: "c00-bonus-12",
        type: "fill",
        question: "ft_print_reverse_alphabet affiche les lettres de 'z' à 'a'. Quelle est la première ligne de la fonction :\n\nvoid ft_print_reverse_alphabet(void)\n{\n    char z;\n    z = ___;\n    while (z >= 'a') { ... }",
        answer: "'z'",
        explanation: "On commence à 'z' (ASCII 122) et on décrémente jusqu'à 'a' (ASCII 97). La condition z >= 'a' garantit qu'on affiche 'a' avant de s'arrêter."
      },
      {
        id: "c00-bonus-13",
        type: "output",
        question: "ft_is_negative(0) affiche quoi ?",
        options: ["N", "P", "0", "Rien"],
        answer: "P",
        explanation: "0 n'est PAS négatif (0 >= 0), donc on affiche 'P' (Positif). Seuls les nombres STRICTEMENT inférieurs à 0 affichent 'N'. C'est un piège classique de la Piscine !"
      },
      {
        id: "c00-bonus-14",
        type: "mcq",
        question: "Pourquoi utilise-t-on write() et pas printf() à la Piscine ?",
        options: [
          "printf() est plus lente",
          "printf() est interdite dans la plupart des exercices — write() est un appel système direct",
          "printf() ne peut pas afficher des caractères",
          "write() est plus facile à utiliser"
        ],
        answer: "printf() est interdite dans la plupart des exercices — write() est un appel système direct",
        explanation: "À la Piscine, le but est d'apprendre les bases. printf() fait beaucoup de choses automatiquement. write() est le vrai appel système Unix : tu contrôles exactement ce qui est écrit, byte par byte."
      },
      {
        id: "c00-bonus-15",
        type: "order",
        question: "Mets ces étapes dans l'ordre pour écrire ft_putchar correctement :",
        options: [
          "#include <unistd.h>",
          "void ft_putchar(char c)",
          "{",
          "    write(1, &c, 1);",
          "}"
        ],
        answer: ["#include <unistd.h>", "void ft_putchar(char c)", "{", "    write(1, &c, 1);", "}"],
        explanation: "Ordre obligatoire : 1) include pour avoir accès à write(), 2) prototype de la fonction, 3) accolade ouvrante, 4) le corps de la fonction, 5) accolade fermante."
      }
    ],
    "c00-loops": [
      {
        id: "c00-loop-bonus-1",
        type: "mcq",
        question: "Combien de fois s'exécute la boucle ?\n\nint i = 0;\nwhile (i < 5)\n    i++;",
        options: ["4 fois", "5 fois", "6 fois", "0 fois"],
        answer: "5 fois",
        explanation: "i commence à 0. La boucle s'exécute pour i=0, i=1, i=2, i=3, i=4. Quand i=5, la condition i<5 est fausse → arrêt. Total : 5 exécutions."
      },
      {
        id: "c00-loop-bonus-2",
        type: "output",
        question: "Que va afficher ce code ?\n\nint n = 3;\nwhile (n > 0)\n{\n    write(1, \"*\", 1);\n    n--;\n}",
        options: ["***", "**", "****", "3"],
        answer: "***",
        explanation: "n commence à 3. Boucle : n=3→affiche *, n=2→affiche *, n=1→affiche *. Quand n=0, 0>0 est faux → arrêt. Total : 3 étoiles."
      },
      {
        id: "c00-loop-bonus-3",
        type: "fill",
        question: "ft_putnbr affiche un entier. Pour afficher le chiffre 4 d'un nombre comme 42, on utilise :\n  print(nb % ___ + '0');",
        answer: "10",
        explanation: "42 % 10 = 2 (dernier chiffre). 42 / 10 = 4 (reste). La récursion divise par 10 pour extraire les chiffres de droite à gauche. % 10 donne toujours le chiffre des unités."
      },
      {
        id: "c00-loop-bonus-4",
        type: "mcq",
        question: "Quelle est la différence entre 'while' et 'for' en C ?",
        options: [
          "while est plus rapide que for",
          "for est surtout utilisé quand on connaît le nombre d'itérations, while quand on ne le connaît pas",
          "while peut s'arrêter, for ne peut pas",
          "Il n'y a aucune différence"
        ],
        answer: "for est surtout utilisé quand on connaît le nombre d'itérations, while quand on ne le connaît pas",
        explanation: "Mais à la Piscine, la norme 42 interdit souvent 'for' — on utilise 'while' partout. Les deux produisent le même résultat."
      },
      {
        id: "c00-loop-bonus-5",
        type: "output",
        question: "Que va afficher ft_putnbr(-42) ?",
        options: ["-42", "42", "−42", "Rien / crash"],
        answer: "-42",
        explanation: "ft_putnbr gère les négatifs : si nb < 0, on affiche '-' puis on affiche la valeur absolue. -42 → affiche '-' puis affiche 42 → résultat : \"-42\"."
      }
    ]
  },

  // ═══════════════════════════════════════════════
  // C 01 — Pointeurs
  // ═══════════════════════════════════════════════
  "c01": {
    "c01-pointers": [
      {
        id: "c01-bonus-1",
        type: "mcq",
        question: "Un pointeur, c'est quoi ?",
        options: [
          "Une variable qui contient un nombre",
          "Une variable qui contient une adresse mémoire",
          "Une fonction qui pointe vers un résultat",
          "Un type de boucle spéciale"
        ],
        answer: "Une variable qui contient une adresse mémoire",
        explanation: "Un pointeur ne stocke pas une valeur directement. Il stocke l'ADRESSE où la valeur est en mémoire. Comme une adresse postale : le pointeur = l'adresse, la maison = la vraie valeur."
      },
      {
        id: "c01-bonus-2",
        type: "fill",
        question: "Pour obtenir l'adresse d'une variable x, on utilise l'opérateur ___.",
        answer: "&",
        explanation: "& = 'adresse de'. int x = 42; int *p = &x; → p contient l'adresse de x en mémoire."
      },
      {
        id: "c01-bonus-3",
        type: "fill",
        question: "Pour lire ou modifier la valeur à l'adresse stockée dans un pointeur p, on utilise l'opérateur ___.",
        answer: "*",
        explanation: "* = 'déréférence' (accède à la valeur). Si p pointe vers x : *p donne la valeur de x. *p = 100 modifie x à travers le pointeur."
      },
      {
        id: "c01-bonus-4",
        type: "output",
        question: "Que contient x après l'exécution ?\n\nint x = 10;\nint *p = &x;\n*p = 42;",
        options: ["10", "42", "L'adresse de x", "0"],
        answer: "42",
        explanation: "p pointe vers x. *p = 42 modifie la valeur À l'adresse de x, c'est-à-dire x lui-même. Après : x == 42."
      },
      {
        id: "c01-bonus-5",
        type: "mcq",
        question: "Pourquoi ft_swap prend-il des pointeurs (int *a, int *b) au lieu de valeurs (int a, int b) ?",
        options: [
          "C'est une obligation du compilateur",
          "Parce qu'en C, les paramètres sont copiés — sans pointeurs, les modifications n'affectent pas les variables originales",
          "Parce que les pointeurs sont plus rapides",
          "Pour éviter les débordements de mémoire"
        ],
        answer: "Parce qu'en C, les paramètres sont copiés — sans pointeurs, les modifications n'affectent pas les variables originales",
        explanation: "En C, quand tu passes 'int a' à une fonction, c'est une COPIE. Modifier 'a' dans la fonction ne change rien dehors. Avec 'int *a', on passe l'adresse originale et on peut modifier la vraie variable."
      },
      {
        id: "c01-bonus-6",
        type: "output",
        question: "Que valent a et b après l'appel ?\n\nvoid ft_swap(int *a, int *b)\n{\n    int c = *a;\n    *a = *b;\n    *b = c;\n}\n\nint x = 5, y = 10;\nft_swap(&x, &y);",
        options: ["x=5, y=10 (inchangés)", "x=10, y=5", "x=0, y=0", "Erreur"],
        answer: "x=10, y=5",
        explanation: "ft_swap échange les valeurs via les pointeurs. c=5, *a devient 10, *b devient 5. Après : x=10, y=5. Sans pointeurs, x et y resteraient inchangés."
      },
      {
        id: "c01-bonus-7",
        type: "mcq",
        question: "Comment déclare-t-on un pointeur vers un int en C ?",
        options: ["int p;", "int &p;", "int *p;", "pointer int p;"],
        answer: "int *p;",
        explanation: "La syntaxe est : type *nom. Le * signifie que p est un POINTEUR vers un int. On peut aussi écrire 'int* p;' (même chose, style différent)."
      },
      {
        id: "c01-bonus-8",
        type: "fill",
        question: "ft_ft(int *nbr) met la valeur 42 dans la variable pointée. Comment s'écrit le corps de cette fonction ?\n\nvoid ft_ft(int *nbr)\n{\n    ___ = 42;\n}",
        answer: "*nbr",
        explanation: "*nbr déréférence le pointeur : on accède à la valeur à l'adresse stockée dans nbr. *nbr = 42 modifie cette valeur. Sans le *, on modifierait le pointeur lui-même (son adresse), pas la valeur pointée."
      },
      {
        id: "c01-bonus-9",
        type: "mcq",
        question: "Qu'est-ce qu'un 'tableau' en C par rapport aux pointeurs ?",
        options: [
          "C'est complètement différent",
          "Un tableau est en réalité un pointeur vers son premier élément",
          "Un tableau ne peut pas être utilisé avec des pointeurs",
          "Un tableau est plus grand qu'un pointeur"
        ],
        answer: "Un tableau est en réalité un pointeur vers son premier élément",
        explanation: "int tab[5] → tab est l'adresse du premier élément. tab[2] est identique à *(tab + 2). C'est pourquoi on peut passer un tableau comme paramètre avec 'int *tab'."
      },
      {
        id: "c01-bonus-10",
        type: "output",
        question: "Que va afficher ce code ?\n\nvoid ft_ft(int *nbr)\n{\n    *nbr = 42;\n}\n\nint x = 0;\nft_ft(&x);\n// Affiche x ici",
        options: ["0", "42", "L'adresse de x", "Undefined"],
        answer: "42",
        explanation: "On passe &x (l'adresse de x) à ft_ft. Dans la fonction, *nbr = 42 modifie la valeur à cette adresse = x. Après l'appel, x == 42."
      },
      {
        id: "c01-bonus-11",
        type: "mcq",
        question: "ft_strlen compte la longueur d'une chaîne. Pourquoi la boucle s'arrête-t-elle sur str[i] != '\\0' ?",
        options: [
          "Parce que '\\0' est le caractère le plus grand",
          "Parce qu'en C, toutes les chaînes se terminent par '\\0' (ASCII 0) qui marque la fin",
          "Parce que '\\0' est une erreur",
          "Par convention, sans raison technique"
        ],
        answer: "Parce qu'en C, toutes les chaînes se terminent par '\\0' (ASCII 0) qui marque la fin",
        explanation: "Les strings en C sont des tableaux de char terminés par '\\0'. strlen compte les chars jusqu'à ce '\\0' terminal (non inclus). Sans ce sentinel, on ne saurait pas où la string se termine."
      },
      {
        id: "c01-bonus-12",
        type: "output",
        question: "ft_strlen(\"hello\") retourne :",
        options: ["4", "5", "6", "0"],
        answer: "5",
        explanation: "\"hello\" = ['h','e','l','l','o','\\0']. On compte jusqu'à '\\0' (non inclus) → 5 caractères. Le '\\0' lui-même n'est pas compté."
      },
      {
        id: "c01-bonus-13",
        type: "mcq",
        question: "ft_rev_int_tab inverse un tableau. Pourquoi la boucle s'arrête-t-elle à (size / 2) ?",
        options: [
          "Par hasard",
          "Pour éviter de faire deux échanges et revenir à l'état initial",
          "Parce que la moitié du tableau est toujours vide",
          "C'est une limitation de C"
        ],
        answer: "Pour éviter de faire deux échanges et revenir à l'état initial",
        explanation: "Si on échangeait tous les éléments jusqu'à la fin, on échangerait d'abord tab[0]↔tab[4], puis tab[4]↔tab[0] (re-échange) → tableau identique à l'original. On s'arrête au milieu."
      },
      {
        id: "c01-bonus-14",
        type: "fill",
        question: "Dans ft_div_mod, on veut stocker le quotient de a/b dans le pointeur div. Comment écrit-on ça ?\n\nvoid ft_div_mod(int a, int b, int *div, int *mod)\n{\n    ___ = a / b;\n    *mod = a % b;\n}",
        answer: "*div",
        explanation: "*div déréférence le pointeur div et modifie la valeur à l'adresse qu'il pointe. Sans le *, on modifierait le pointeur lui-même (son adresse), pas la variable de l'appelant."
      },
      {
        id: "c01-bonus-15",
        type: "mcq",
        question: "ft_sort_int_tab trie un tableau. Si tab[i] > tab[i+1], que fait-on ?",
        options: [
          "On supprime tab[i]",
          "On échange tab[i] et tab[i+1] et on repart du début",
          "On arrête le tri",
          "On copie le tableau dans un autre"
        ],
        answer: "On échange tab[i] et tab[i+1] et on repart du début",
        explanation: "C'est le Bubble sort : si deux éléments adjacents sont dans le mauvais ordre, on les échange (via une variable temporaire) et on recommence depuis le début (i = -1, puis i++ → i = 0)."
      }
    ]
  },

  // ═══════════════════════════════════════════════
  // C 02 — Chaînes de caractères
  // ═══════════════════════════════════════════════
  "c02": {
    "c02-strings": [
      {
        id: "c02-bonus-1",
        type: "mcq",
        question: "Qu'est-ce qu'une 'string' (chaîne) en C ?",
        options: [
          "Un type spécial du langage C",
          "Un tableau de char terminé par le caractère '\\0'",
          "Une suite de nombres entiers",
          "Une liste chainée de caractères"
        ],
        answer: "Un tableau de char terminé par le caractère '\\0'",
        explanation: "En C, il n'y a PAS de type 'string'. Une string est simplement un tableau de char avec un '\\0' à la fin. \"hello\" = {'h','e','l','l','o','\\0'} en mémoire."
      },
      {
        id: "c02-bonus-2",
        type: "fill",
        question: "ft_strcpy copie src dans dest. Après la boucle de copie, quelle ligne est INDISPENSABLE ?\n\nwhile (src[i] != '\\0') { dest[i] = src[i]; i++; }\ndest[___] = '\\0';",
        answer: "i",
        explanation: "Après la copie, i pointe sur la position après le dernier char copié. On DOIT ajouter '\\0' à dest[i] pour signaler la fin de la chaîne. Sans ça, dest n'est pas une string valide."
      },
      {
        id: "c02-bonus-3",
        type: "output",
        question: "Que retourne ft_str_is_alpha(\"Hello123\") ?",
        options: ["0", "1", "8", "-1"],
        answer: "0",
        explanation: "ft_str_is_alpha retourne 1 SEULEMENT si TOUS les caractères sont alphabétiques. '1', '2', '3' ne sont pas alphabétiques → la fonction retourne 0."
      },
      {
        id: "c02-bonus-4",
        type: "mcq",
        question: "Pour convertir 'A' en 'a' (majuscule → minuscule), on fait :",
        options: ["'A' - 32", "'A' + 32", "'A' * 2", "'A' / 2"],
        answer: "'A' + 32",
        explanation: "En ASCII : 'A'=65, 'a'=97. 97 - 65 = 32. Pour aller de majuscule à minuscule : +32. Pour aller de minuscule à majuscule : -32. C'est ft_strlowcase et ft_strupcase."
      },
      {
        id: "c02-bonus-5",
        type: "output",
        question: "ft_strupcase(\"hello\") retourne :",
        options: ["\"hello\"", "\"HELLO\"", "\"Hello\"", "\"hELLO\""],
        answer: "\"HELLO\"",
        explanation: "ft_strupcase convertit TOUTES les minuscules en majuscules en soustrayant 32. h→H, e→E, l→L, l→L, o→O. Les non-alphabétiques restent inchangés."
      },
      {
        id: "c02-bonus-6",
        type: "mcq",
        question: "ft_strncpy(dest, src, n) : que se passe-t-il si src est plus court que n ?",
        options: [
          "La fonction s'arrête quand src se termine",
          "La fonction remplit le reste de dest avec des '\\0'",
          "La fonction retourne une erreur",
          "La fonction copie des caractères aléatoires"
        ],
        answer: "La fonction remplit le reste de dest avec des '\\0'",
        explanation: "Comportement spécial de strncpy : si src fait 3 chars et n=10, les 3 premiers chars de src sont copiés, puis les 7 positions restantes sont remplies de '\\0'. C'est une sécurité."
      },
      {
        id: "c02-bonus-7",
        type: "fill",
        question: "Pour vérifier si un char 'c' est une MINUSCULE, on écrit :\n  if (___ && ___)",
        answer: "'a' <= c",
        explanation: "La vérification complète est : if ('a' <= c && c <= 'z'). Les minuscules sont entre ASCII 97 ('a') et ASCII 122 ('z')."
      },
      {
        id: "c02-bonus-8",
        type: "output",
        question: "ft_strcapitalize(\"hello world\") retourne :",
        options: ["\"Hello World\"", "\"HELLO WORLD\"", "\"hello world\"", "\"Hello world\""],
        answer: "\"Hello World\"",
        explanation: "ft_strcapitalize met en majuscule le 1er char de chaque 'mot'. Un mot commence après un séparateur (espace, ponctuation...). 'h' → 'H', 'w' → 'W'."
      },
      {
        id: "c02-bonus-9",
        type: "mcq",
        question: "Quelle est la différence entre ft_strcpy et ft_strncpy ?",
        options: [
          "Aucune différence",
          "ft_strncpy copie au maximum n caractères (sécurité anti-débordement)",
          "ft_strcpy est plus rapide",
          "ft_strncpy ne copie pas le '\\0'"
        ],
        answer: "ft_strncpy copie au maximum n caractères (sécurité anti-débordement)",
        explanation: "ft_strcpy copie toute la string (risque de débordement si dest est trop petit). ft_strncpy copie au maximum n chars, ce qui protège contre les buffer overflows."
      },
      {
        id: "c02-bonus-10",
        type: "output",
        question: "Que retourne ft_str_is_numeric(\"42\") ?",
        options: ["0", "1", "42", "2"],
        answer: "1",
        explanation: "'4' et '2' sont tous les deux des chiffres (entre '0' et '9'). ft_str_is_numeric retourne 1 si TOUS les chars sont numériques. \"42\" → retourne 1."
      },
      {
        id: "c02-bonus-11",
        type: "mcq",
        question: "ft_strlcpy est plus sûre que ft_strcpy parce que :",
        options: [
          "Elle est plus rapide",
          "Elle prend une taille maximale et garantit toujours un '\\0' final dans dest",
          "Elle gère les caractères Unicode",
          "Elle peut copier des nombres"
        ],
        answer: "Elle prend une taille maximale et garantit toujours un '\\0' final dans dest",
        explanation: "strlcpy(dest, src, size) copie au plus (size-1) chars et ajoute toujours '\\0'. Même si src est trop long, dest sera toujours une string valide. C'est la version sécurisée."
      },
      {
        id: "c02-bonus-12",
        type: "output",
        question: "ft_str_is_lowercase(\"hello World\") retourne :",
        options: ["0", "1", "5", "-1"],
        answer: "0",
        explanation: "'W' est une majuscule, pas une minuscule. ft_str_is_lowercase retourne 0 dès qu'UN seul char n'est pas minuscule. Un seul 'W' suffit à faire retourner 0."
      },
      {
        id: "c02-bonus-13",
        type: "fill",
        question: "Pour vérifier si un char 'c' est une MAJUSCULE :\n  if ('A' <= c && c <= ___)",
        answer: "'Z'",
        explanation: "Les majuscules vont de 'A' (ASCII 65) à 'Z' (ASCII 90). La vérification complète : if ('A' <= c && c <= 'Z')."
      },
      {
        id: "c02-bonus-14",
        type: "mcq",
        question: "Dans ft_strupcase, pourquoi fait-on str[i] = str[i] - 32 ?",
        options: [
          "Pour supprimer le caractère",
          "Pour convertir la minuscule en majuscule (ASCII minuscule = ASCII majuscule + 32)",
          "Pour avancer dans la chaîne",
          "Pour tester si c'est une lettre"
        ],
        answer: "Pour convertir la minuscule en majuscule (ASCII minuscule = ASCII majuscule + 32)",
        explanation: "'a'=97, 'A'=65 → différence = 32. Donc 'a' - 32 = 'A'. Cette formule fonctionne pour toutes les lettres car la distance est toujours 32 dans la table ASCII."
      },
      {
        id: "c02-bonus-15",
        type: "output",
        question: "ft_strlcpy(dest, \"hello\", 4) : que contient dest après l'appel ?",
        options: ["\"hello\"", "\"hel\"", "\"hell\"", "\"\""],
        answer: "\"hel\"",
        explanation: "size=4 → on copie au maximum (4-1)=3 chars, puis on ajoute '\\0'. Donc dest contient 'h','e','l','\\0' = \"hel\". La troncature est signalée par le retour (longueur de src = 5 >= size = 4)."
      }
    ]
  },

  // ═══════════════════════════════════════════════
  // C 03 — Comparaison et concaténation
  // ═══════════════════════════════════════════════
  "c03": {
    "c03-strcomp": [
      {
        id: "c03-bonus-1",
        type: "mcq",
        question: "ft_strcmp(\"abc\", \"abc\") retourne :",
        options: ["1", "-1", "0", "3"],
        answer: "0",
        explanation: "strcmp retourne 0 si les deux chaînes sont identiques. Non-nul si elles diffèrent. Mémorise : 0 = égal, <0 = s1 avant s2, >0 = s1 après s2 (ordre alphabétique)."
      },
      {
        id: "c03-bonus-2",
        type: "mcq",
        question: "ft_strcmp(\"abc\", \"abd\") retourne :",
        options: ["Valeur positive", "Valeur négative", "0", "1 ou -1 exactement"],
        answer: "Valeur négative",
        explanation: "'c'=99, 'd'=100. Au dernier char différent : 'c' - 'd' = 99 - 100 = -1. Négatif = s1 vient avant s2 alphabétiquement. \"abc\" < \"abd\"."
      },
      {
        id: "c03-bonus-3",
        type: "output",
        question: "ft_strcat(dest, src) où dest=\"Hello\" et src=\" World\". Que contient dest après l'appel ?",
        options: ["\"Hello\"", "\" World\"", "\"Hello World\"", "\"World Hello\""],
        answer: "\"Hello World\"",
        explanation: "ft_strcat cherche la fin de dest (le '\\0' après 'Hello'), puis copie src depuis cet endroit. Résultat : dest = \"Hello World\"."
      },
      {
        id: "c03-bonus-4",
        type: "fill",
        question: "Dans ft_strcat, la première boucle sert à :\n  while (dest[i] != '\\0')\n      i++;\nElle trouve ___ de dest.",
        answer: "la fin",
        explanation: "On cherche la position du '\\0' de dest. Après la boucle, i = strlen(dest). On commence à copier src à partir de cette position pour coller les deux strings."
      },
      {
        id: "c03-bonus-5",
        type: "output",
        question: "ft_strstr(\"bonjour monde\", \"monde\") retourne :",
        options: ["NULL (0)", "Le pointeur vers 'monde' dans la string", "5", "\"monde\""],
        answer: "Le pointeur vers 'monde' dans la string",
        explanation: "ft_strstr retourne l'ADRESSE de la première occurrence de 'monde' dans la string source. Si non trouvé → NULL. Si to_find est vide → retourne str."
      },
      {
        id: "c03-bonus-6",
        type: "mcq",
        question: "ft_strncmp compare au maximum n caractères. Pourquoi ?",
        options: [
          "Pour aller plus vite",
          "Pour comparer seulement le début des chaînes (utile pour les préfixes)",
          "Parce que strcmp ne fonctionne pas bien",
          "Pour économiser de la mémoire"
        ],
        answer: "Pour comparer seulement le début des chaînes (utile pour les préfixes)",
        explanation: "Exemple : strncmp(\"bonjour\", \"bonsoir\", 3) = 0 (les 3 premiers chars \"bon\" sont identiques). Très utile pour tester si une string commence par un certain préfixe."
      },
      {
        id: "c03-bonus-7",
        type: "output",
        question: "ft_strstr(\"hello\", \"\") retourne :",
        options: ["NULL", "\"hello\"", "\"\"", "Crash"],
        answer: "\"hello\"",
        explanation: "Cas spécial : si to_find est vide (\"\" = juste un '\\0'), ft_strstr retourne str immédiatement. La chaîne vide est toujours 'trouvée' au début."
      },
      {
        id: "c03-bonus-8",
        type: "fill",
        question: "ft_strcmp compare deux strings et retourne s1[i] - s2[i] au premier caractère différent. Si s1=\"A\" et s2=\"B\", le résultat est ___.",
        answer: "-1",
        explanation: "'A'=65, 'B'=66. 65 - 66 = -1. Négatif = s1 vient avant s2 en ordre ASCII. Positif = s1 vient après. 0 = identiques."
      },
      {
        id: "c03-bonus-9",
        type: "mcq",
        question: "ft_strlcat retourne :",
        options: [
          "La longueur de dest après la concaténation",
          "La taille totale que la string aurait eue sans limite (len(dest) + len(src))",
          "0 si succès, -1 si erreur",
          "Le nombre de chars copiés"
        ],
        answer: "La taille totale que la string aurait eue sans limite (len(dest) + len(src))",
        explanation: "strlcat retourne len_dest + len_src. Si ce retour >= size, il y a eu troncature. C'est un moyen de détecter si la concaténation a été tronquée."
      },
      {
        id: "c03-bonus-10",
        type: "output",
        question: "ft_strncat(dest, \" !!\", 2) où dest=\"Hello\". Que contient dest ?",
        options: ["\"Hello !!\"", "\"Hello !\"", "\"Hello\"", "\"Hello  \""],
        answer: "\"Hello !\"",
        explanation: "ft_strncat copie au maximum 2 chars de \" !!\". Les 2 premiers chars de \" !!\" sont ' ' et '!'. Donc dest = \"Hello\" + \" !\" + '\\0' = \"Hello !\"."
      }
    ]
  },

  // ═══════════════════════════════════════════════
  // C 04 — Conversion et affichage
  // ═══════════════════════════════════════════════
  "c04": {
    "c04-numbers": [
      {
        id: "c04-bonus-1",
        type: "mcq",
        question: "ft_atoi(\"   -42abc\") retourne :",
        options: ["-42", "42", "0", "Erreur"],
        answer: "-42",
        explanation: "ft_atoi ignore les espaces au début, lit le signe '-', lit les chiffres '4' et '2', s'arrête à 'a' (premier non-chiffre). Résultat : -42."
      },
      {
        id: "c04-bonus-2",
        type: "output",
        question: "ft_putnbr(0) affiche :",
        options: ["Rien", "\"0\"", "\"\\0\"", "Crash"],
        answer: "\"0\"",
        explanation: "0 est un chiffre (0-9), donc on affiche directement 0 + '0' = '0'. La récursion n'est pas appelée (0 < 10). On affiche bien le caractère '0'."
      },
      {
        id: "c04-bonus-3",
        type: "fill",
        question: "Dans ft_atoi, pour convertir le char '7' en l'entier 7, on écrit :\n  nbr += str[a] - ___",
        answer: "'0'",
        explanation: "'7' - '0' = 55 - 48 = 7. Soustraire '0' convertit tout chiffre ASCII en son entier équivalent. '0'-'0'=0, '1'-'0'=1, ..., '9'-'0'=9."
      },
      {
        id: "c04-bonus-4",
        type: "mcq",
        question: "ft_putnbr_base(255, \"0123456789abcdef\") affiche :",
        options: ["\"255\"", "\"ff\"", "\"FF\"", "\"11111111\""],
        answer: "\"ff\"",
        explanation: "255 en hexadécimal = ff. La base est \"0123456789abcdef\" (longueur 16). 255 / 16 = 15, base[15] = 'f'. 255 % 16 = 15, base[15] = 'f'. Résultat : \"ff\"."
      },
      {
        id: "c04-bonus-5",
        type: "output",
        question: "ft_putnbr_base(10, \"01\") affiche :",
        options: ["\"10\"", "\"1010\"", "\"2\"", "\"A\""],
        answer: "\"1010\"",
        explanation: "Base binaire (base 2 : \"01\"). 10 en binaire = 1010. La récursion divise par 2 à chaque fois : 10→5→2→1→0. Les chiffres sont base[0]='0' et base[1]='1'."
      },
      {
        id: "c04-bonus-6",
        type: "mcq",
        question: "ft_atoi(\"+--+42\") retourne :",
        options: ["42", "-42", "0", "Erreur"],
        answer: "42",
        explanation: "La boucle de signe lit tous les '+' et '-' consécutifs. '+' → sign*=1, '-' → sign*=-1. '+--+' → 1 * -1 * -1 * 1 = 1 (positif). Résultat : 42 * 1 = 42."
      },
      {
        id: "c04-bonus-7",
        type: "fill",
        question: "ft_strlen retourne le nombre de chars SANS compter le ___.",
        answer: "'\\0'",
        explanation: "Le '\\0' est le terminateur de string mais n'est pas un 'caractère' de la string en pratique. strlen(\"hello\") = 5 (pas 6, même si 'hello\\0' fait 6 octets en mémoire)."
      },
      {
        id: "c04-bonus-8",
        type: "mcq",
        question: "Pourquoi ft_putnbr utilise-t-il un 'long' au lieu d'un 'int' ?",
        options: [
          "Pour aller plus vite",
          "Pour gérer INT_MIN (-2147483648) dont la valeur absolue dépasse INT_MAX",
          "Parce que long est obligatoire avec write()",
          "Pour afficher des grands nombres"
        ],
        answer: "Pour gérer INT_MIN (-2147483648) dont la valeur absolue dépasse INT_MAX",
        explanation: "INT_MIN = -2147483648. INT_MAX = 2147483647. Si on fait -1 * INT_MIN avec un int, on déborde (2147483648 > INT_MAX). Avec un long, pas de problème car long est plus grand."
      }
    ]
  },

  // ═══════════════════════════════════════════════
  // C 05 — Récursion
  // ═══════════════════════════════════════════════
  "c05": {
    "c05-recursion": [
      {
        id: "c05-bonus-1",
        type: "mcq",
        question: "Qu'est-ce que la récursion ?",
        options: [
          "Une boucle très rapide",
          "Une fonction qui s'appelle elle-même",
          "Un type de tableau en C",
          "Une erreur de programmation"
        ],
        answer: "Une fonction qui s'appelle elle-même",
        explanation: "Une fonction récursive se rappelle elle-même pour résoudre un problème en le décomposant. Elle DOIT avoir un cas de base (condition d'arrêt) sinon elle boucle indéfiniment."
      },
      {
        id: "c05-bonus-2",
        type: "fill",
        question: "ft_recursive_factorial(5) calcule 5! = 120. Le cas de base est :\n  if (nb == 0 || nb == 1)\n      return ___",
        answer: "1",
        explanation: "0! = 1 et 1! = 1 par définition mathématique. C'est le cas de base qui arrête la récursion. Sans lui, la fonction s'appellerait infiniment → stack overflow."
      },
      {
        id: "c05-bonus-3",
        type: "output",
        question: "ft_recursive_factorial(4) retourne :",
        options: ["4", "12", "24", "120"],
        answer: "24",
        explanation: "4! = 4 × 3! = 4 × 6 = 24. La récursion : f(4)=4*f(3), f(3)=3*f(2), f(2)=2*f(1), f(1)=1. On remonte : 1→2→6→24."
      },
      {
        id: "c05-bonus-4",
        type: "mcq",
        question: "Qu'est-ce qu'un 'stack overflow' en récursion ?",
        options: [
          "Quand la récursion donne un mauvais résultat",
          "Quand il y a trop d'appels récursifs qui saturent la mémoire de la pile (stack)",
          "Quand on utilise trop de variables locales",
          "Une erreur de compilation"
        ],
        answer: "Quand il y a trop d'appels récursifs qui saturent la mémoire de la pile (stack)",
        explanation: "Chaque appel de fonction crée un 'stack frame' en mémoire. La stack a une taille limitée (~8 Mo). Trop de récursions → la stack est pleine → crash (Segmentation fault)."
      },
      {
        id: "c05-bonus-5",
        type: "output",
        question: "ft_fibonacci(6) retourne :",
        options: ["5", "8", "13", "6"],
        answer: "8",
        explanation: "Suite de Fibonacci : 0,1,1,2,3,5,8,13,21... Index 0=0, 1=1, 2=1, 3=2, 4=3, 5=5, 6=8. f(6) = f(5) + f(4) = 5 + 3 = 8."
      },
      {
        id: "c05-bonus-6",
        type: "mcq",
        question: "ft_is_prime(1) retourne :",
        options: ["1 (premier)", "0 (pas premier)", "Erreur", "-1"],
        answer: "0 (pas premier)",
        explanation: "1 n'est PAS un nombre premier par définition mathématique. Les premiers commencent à 2. ft_is_prime retourne 0 pour tout nb < 2 (0, 1, négatifs)."
      },
      {
        id: "c05-bonus-7",
        type: "output",
        question: "ft_sqrt(16) retourne :",
        options: ["2", "4", "8", "0"],
        answer: "4",
        explanation: "4 × 4 = 16 → ft_sqrt(16) = 4. ft_sqrt cherche i tel que i*i == nb. Si aucun i entier ne satisfait cette condition, elle retourne 0 (nb n'est pas un carré parfait)."
      },
      {
        id: "c05-bonus-8",
        type: "output",
        question: "ft_sqrt(15) retourne :",
        options: ["3", "4", "0", "3.87"],
        answer: "0",
        explanation: "15 n'est pas un carré parfait (√15 ≈ 3.87). ft_sqrt ne retourne que des racines exactes entières. Comme 3×3=9≠15 et 4×4=16≠15, elle retourne 0."
      },
      {
        id: "c05-bonus-9",
        type: "fill",
        question: "ft_find_next_prime(8) cherche le premier nombre premier >= 8. La réponse est ___.",
        answer: "11",
        explanation: "8 n'est pas premier (8=2×4). 9 n'est pas premier (9=3×3). 10 n'est pas premier (10=2×5). 11 est premier ! ft_find_next_prime(8) = 11."
      },
      {
        id: "c05-bonus-10",
        type: "mcq",
        question: "Quelle est la différence entre ft_iterative_factorial et ft_recursive_factorial ?",
        options: [
          "Elles donnent des résultats différents",
          "La version itérative utilise une boucle, la récursive s'appelle elle-même — même résultat",
          "La version récursive est toujours plus rapide",
          "La version itérative peut gérer des plus grands nombres"
        ],
        answer: "La version itérative utilise une boucle, la récursive s'appelle elle-même — même résultat",
        explanation: "Les deux calculent le même résultat. La version itérative utilise while(i<=nb) { fact*=i; }. La récursive fait nb * f(nb-1). La version itérative est souvent plus efficace (moins de stack frames)."
      },
      {
        id: "c05-bonus-11",
        type: "output",
        question: "ft_iterative_power(2, 8) retourne :",
        options: ["16", "64", "256", "512"],
        answer: "256",
        explanation: "2^8 = 2×2×2×2×2×2×2×2 = 256. La boucle multiplie nb par lui-même (power-1) fois : i=2, nb = 2*2=4, 4*2=8, 8*2=16, 16*2=32, 32*2=64, 64*2=128, 128*2=256."
      },
      {
        id: "c05-bonus-12",
        type: "mcq",
        question: "ft_iterative_power(5, 0) retourne :",
        options: ["0", "1", "5", "Erreur"],
        answer: "1",
        explanation: "Tout nombre élevé à la puissance 0 vaut 1. C'est une convention mathématique. La fonction vérifie en premier : if (power == 0) return 1;"
      }
    ]
  },

  // ═══════════════════════════════════════════════
  // C 06 — Arguments du programme
  // ═══════════════════════════════════════════════
  "c06": {
    "c06-args": [
      {
        id: "c06-bonus-1",
        type: "mcq",
        question: "Que contient argv[0] ?",
        options: [
          "Le premier argument passé par l'utilisateur",
          "Le nom (chemin) du programme lui-même",
          "Le nombre d'arguments",
          "Rien (tableau vide)"
        ],
        answer: "Le nom (chemin) du programme lui-même",
        explanation: "argv[0] = chemin vers l'exécutable. argv[1] = premier vrai argument, argv[2] = deuxième, etc. argc compte TOUS les arguments y compris argv[0]."
      },
      {
        id: "c06-bonus-2",
        type: "fill",
        question: "On lance : ./prog bonjour monde. argv[1] contient ___ et argv[2] contient ___.",
        answer: "bonjour",
        explanation: "argv[0]=\"./prog\", argv[1]=\"bonjour\", argv[2]=\"monde\". argc vaut 3 (3 éléments dans argv)."
      },
      {
        id: "c06-bonus-3",
        type: "output",
        question: "On lance ./prog un deux trois. argc vaut :",
        options: ["2", "3", "4", "1"],
        answer: "4",
        explanation: "argc compte le nom du programme + tous les arguments. './prog' + 'un' + 'deux' + 'trois' = 4. argc est toujours >= 1 (au minimum le nom du programme)."
      },
      {
        id: "c06-bonus-4",
        type: "mcq",
        question: "Dans ft_print_params, pourquoi i commence-t-il à 1 et pas 0 ?",
        options: [
          "Par erreur",
          "Parce que argv[0] est le nom du programme et on ne veut pas l'afficher",
          "Pour sauter le premier argument vide",
          "Parce que les tableaux C commencent à 1"
        ],
        answer: "Parce que argv[0] est le nom du programme et on ne veut pas l'afficher",
        explanation: "Le sujet demande d'afficher les paramètres passés par l'utilisateur, pas le nom du programme. argv[0] = nom du programme, argv[1..argc-1] = vrais paramètres."
      },
      {
        id: "c06-bonus-5",
        type: "output",
        question: "On lance ./prog trois deux un. ft_rev_params affiche :",
        options: ["trois\ndeux\nun", "un\ndeux\ntrois", "./prog", "un deux trois"],
        answer: "un\ndeux\ntrois",
        explanation: "ft_rev_params affiche les arguments en ordre INVERSE. Le dernier argument (\"un\") est affiché en premier. On commence à argc-1 et on décrémente jusqu'à 1."
      },
      {
        id: "c06-bonus-6",
        type: "mcq",
        question: "ft_sort_params trie les arguments. Avec './prog banana apple cherry', il affiche :",
        options: [
          "banana\napple\ncherry",
          "apple\nbanana\ncherry",
          "cherry\nbanana\napple",
          "apple\ncherry\nbanana"
        ],
        answer: "apple\nbanana\ncherry",
        explanation: "ft_sort_params trie par ordre ASCII/alphabétique croissant. 'apple' < 'banana' < 'cherry'. L'algorithme utilisé est le bubble sort sur le tableau argv."
      }
    ]
  },

  // ═══════════════════════════════════════════════
  // C 07 — Allocation mémoire
  // ═══════════════════════════════════════════════
  "c07": {
    "c07-malloc": [
      {
        id: "c07-bonus-1",
        type: "mcq",
        question: "malloc() retourne :",
        options: [
          "Un entier représentant la taille allouée",
          "Un pointeur vers le bloc de mémoire alloué, ou NULL si échec",
          "La valeur 0",
          "Un booléen (succès/échec)"
        ],
        answer: "Un pointeur vers le bloc de mémoire alloué, ou NULL si échec",
        explanation: "malloc(n) alloue n octets sur le tas (heap) et retourne un pointeur void* vers ce bloc. TOUJOURS vérifier si le retour est NULL avant d'utiliser le pointeur."
      },
      {
        id: "c07-bonus-2",
        type: "fill",
        question: "Pour allouer de la mémoire pour 10 entiers, on écrit :\n  int *tab = malloc(10 * sizeof(___));",
        answer: "int",
        explanation: "sizeof(int) donne la taille d'un int en octets (généralement 4). 10 * 4 = 40 octets. On alloue assez d'espace pour stocker 10 ints."
      },
      {
        id: "c07-bonus-3",
        type: "mcq",
        question: "Qu'est-ce qu'un 'memory leak' (fuite mémoire) ?",
        options: [
          "Quand la mémoire devient corrompue",
          "Quand on alloue de la mémoire avec malloc sans jamais la libérer avec free()",
          "Quand une variable sort de sa portée",
          "Une erreur de compilation"
        ],
        answer: "Quand on alloue de la mémoire avec malloc sans jamais la libérer avec free()",
        explanation: "La mémoire malloc'd reste réservée jusqu'à free() ou fin du programme. Si on perd le pointeur sans faire free(), cette mémoire est perdue pour toujours = memory leak. Cause des crashs sur les longues exécutions."
      },
      {
        id: "c07-bonus-4",
        type: "output",
        question: "ft_range(3, 7) retourne un tableau contenant :",
        options: ["[3, 4, 5, 6, 7]", "[3, 4, 5, 6]", "[1, 2, 3, 4]", "NULL"],
        answer: "[3, 4, 5, 6]",
        explanation: "ft_range(min, max) crée un tableau de min JUSQU'À max-1 (max exclus). [3, 4, 5, 6] de taille (7-3)=4. Le dernier élément est toujours max-1."
      },
      {
        id: "c07-bonus-5",
        type: "output",
        question: "ft_range(5, 5) retourne :",
        options: ["[5]", "[5, 5]", "NULL", "Crash"],
        answer: "NULL",
        explanation: "Si min >= max, ft_range retourne NULL. 5 >= 5 → NULL. Il n'y a aucun entier de 5 à 4 (max-1). Cas invalide = NULL."
      },
      {
        id: "c07-bonus-6",
        type: "mcq",
        question: "ft_strdup(\"hello\") fait quoi ?",
        options: [
          "Affiche 'hello' deux fois",
          "Crée une copie de 'hello' dans une nouvelle zone mémoire allouée avec malloc",
          "Retourne l'adresse de 'hello'",
          "Compare 'hello' avec lui-même"
        ],
        answer: "Crée une copie de 'hello' dans une nouvelle zone mémoire allouée avec malloc",
        explanation: "strdup = string duplicate. Elle alloue strlen(src)+1 octets, copie src dedans et retourne le nouveau pointeur. L'appelant est responsable de free() la mémoire."
      },
      {
        id: "c07-bonus-7",
        type: "fill",
        question: "Dans ft_strdup, on alloue src_len + ___ octets pour la nouvelle string.",
        answer: "1",
        explanation: "Le +1 est pour le caractère '\\0' final. strlen(\"hello\")=5, mais \"hello\" occupe 6 octets en mémoire ('h','e','l','l','o','\\0'). Sans le +1, le '\\0' n'aurait pas de place."
      },
      {
        id: "c07-bonus-8",
        type: "mcq",
        question: "ft_strjoin(3, [\"a\", \"b\", \"c\"], \"-\") retourne :",
        options: ["\"abc\"", "\"a-b-c\"", "\"a b c\"", "NULL"],
        answer: "\"a-b-c\"",
        explanation: "ft_strjoin joint les strings avec le séparateur sep entre chaque paire. 3 strings, 2 séparateurs → \"a\" + \"-\" + \"b\" + \"-\" + \"c\" = \"a-b-c\"."
      },
      {
        id: "c07-bonus-9",
        type: "mcq",
        question: "Après free(ptr), que faut-il faire avec ptr ?",
        options: [
          "Rien, ptr est automatiquement NULL",
          "Mettre ptr = NULL pour éviter un dangling pointer",
          "Appeler free(ptr) une deuxième fois",
          "Réallouer ptr avec malloc"
        ],
        answer: "Mettre ptr = NULL pour éviter un dangling pointer",
        explanation: "Après free(), ptr pointe encore vers l'ancienne adresse (maintenant invalide). C'est un 'dangling pointer' — dangereux si utilisé par erreur. Mettre ptr=NULL transforme le bug potentiel en crash clair (déréférencer NULL)."
      },
      {
        id: "c07-bonus-10",
        type: "output",
        question: "ft_ultimate_range(&range, 1, 4) : que vaut le retour de la fonction ?",
        options: ["4", "3", "1", "NULL"],
        answer: "3",
        explanation: "ft_ultimate_range retourne la taille du tableau créé. max - min = 4 - 1 = 3. Le tableau contient [1, 2, 3]. La taille est aussi stockée dans 'i' qui est retourné."
      }
    ]
  },

  // ═══════════════════════════════════════════════
  // C 08 — Headers et structures
  // ═══════════════════════════════════════════════
  "c08": {
    "c08-headers": [
      {
        id: "c08-bonus-1",
        type: "mcq",
        question: "Pourquoi met-on #ifndef FT_H / #define FT_H / #endif dans un fichier .h ?",
        options: [
          "C'est une obligation du compilateur",
          "Pour éviter que le fichier soit inclus plusieurs fois (double inclusion)",
          "Pour définir une variable globale FT_H",
          "Pour accélérer la compilation"
        ],
        answer: "Pour éviter que le fichier soit inclus plusieurs fois (double inclusion)",
        explanation: "Si a.c inclut b.h et c.h, et que b.h inclut c.h aussi, c.h serait inclus deux fois → erreurs de redéclaration. Le garde #ifndef évite ça : si FT_H est déjà défini, on saute tout le contenu."
      },
      {
        id: "c08-bonus-2",
        type: "mcq",
        question: "Un prototype de fonction dans un .h sert à :",
        options: [
          "Définir le corps de la fonction",
          "Déclarer la signature (nom, paramètres, type de retour) pour que le compilateur sache que la fonction existe",
          "Créer une copie de la fonction",
          "Remplacer la fonction"
        ],
        answer: "Déclarer la signature (nom, paramètres, type de retour) pour que le compilateur sache que la fonction existe",
        explanation: "Le prototype dit au compilateur : 'cette fonction existe, voici son interface'. La définition (corps) est dans le .c. Sans prototype, le compilateur se plaint si tu appelles une fonction avant sa définition."
      },
      {
        id: "c08-bonus-3",
        type: "fill",
        question: "La macro ABS(Value) dans ft_abs.h est définie comme :\n  #define ABS(Value) (Value > 0) ? Value : (___)",
        answer: "-Value",
        explanation: "Si Value > 0 → retourner Value tel quel. Sinon → retourner -Value (valeur absolue). ABS(-5) = ((-5) > 0) ? -5 : 5 = 5."
      },
      {
        id: "c08-bonus-4",
        type: "mcq",
        question: "typedef struct x_point { int x; int y; } t_point; — que fait typedef ici ?",
        options: [
          "Il crée une nouvelle structure",
          "Il crée un alias : t_point est un raccourci pour 'struct x_point'",
          "Il définit les valeurs de x et y",
          "Il protège la structure contre les modifications"
        ],
        answer: "Il crée un alias : t_point est un raccourci pour 'struct x_point'",
        explanation: "Sans typedef, on doit écrire 'struct x_point p;'. Avec typedef, on peut écrire simplement 't_point p;'. C'est une commodité syntaxique très utilisée en C."
      },
      {
        id: "c08-bonus-5",
        type: "fill",
        question: "Pour accéder au membre x d'une variable de type t_point nommée p, on écrit ___.",
        answer: "p.x",
        explanation: "L'opérateur '.' accède aux membres d'une structure. p.x = 5 modifie le membre x de p. Si p est un pointeur : p->x (flèche). Ici p est une variable, donc p.x."
      },
      {
        id: "c08-bonus-6",
        type: "mcq",
        question: "Quelle est la différence entre #include <file.h> et #include \"file.h\" ?",
        options: [
          "Aucune différence",
          "<file.h> cherche dans les dossiers système, \"file.h\" cherche d'abord dans le dossier courant",
          "<file.h> est pour C, \"file.h\" est pour C++",
          "\"file.h\" est plus rapide"
        ],
        answer: "<file.h> cherche dans les dossiers système, \"file.h\" cherche d'abord dans le dossier courant",
        explanation: "<unistd.h> cherche dans /usr/include et autres dossiers système. \"ft.h\" cherche d'abord dans ton dossier du projet. Convention : <> pour libc, \"\" pour tes propres headers."
      },
      {
        id: "c08-bonus-7",
        type: "mcq",
        question: "EVEN(4) avec #define EVEN(nbr) (nbr % 2) == 0 retourne :",
        options: ["0", "1", "2", "4"],
        answer: "1",
        explanation: "EVEN(4) → (4 % 2) == 0 → 0 == 0 → 1 (vrai). EVEN(3) → (3 % 2) == 0 → 1 == 0 → 0 (faux). En C, 1 = vrai, 0 = faux."
      },
      {
        id: "c08-bonus-8",
        type: "output",
        question: "Dans ft_strs_to_tab, le dernier élément du tableau retourné a str = ___.",
        options: ["\"\"", "0 (NULL)", "-1", "Le dernier string"],
        answer: "0 (NULL)",
        explanation: "ft_strs_to_tab ajoute un élément sentinel à la fin : conv[ac].str = 0 (NULL). Cela permet d'itérer sur le tableau sans connaître sa taille : while (tab[i].str != NULL)."
      }
    ]
  }
};
