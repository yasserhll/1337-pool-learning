// ============================================================
// 42 CURSUS STUDENT — COURS COMPLETS PAR PROJET
// Données détaillées : théorie, exemples, exercices
// ============================================================

import type { CodeExample, Exercise, Lesson } from "./courseData";
export type { CodeExample, Exercise, Lesson };

export interface StudentModule {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  rank: 0 | 1 | 2 | 3 | 4 | 5;
  xp: number;
  duration: string;
  difficulty: "Débutant" | "Intermédiaire" | "Avancé";
  skills: string[];
  description: string;
  lessons: Lesson[];
  subjectGuide: string;
  color: string;
}

// ============================================================
// LIBFT — Rang 0
// ============================================================
const libftLessons: Lesson[] = [
  {
    id: "libft-01",
    title: "Comprendre Libft",
    emoji: "📦",
    duration: "20 min",
    difficulty: "Débutant",
    theory: `## Qu'est-ce que Libft ?

Libft est ton premier grand projet à 42/1337. L'objectif : **recoder toi-même les fonctions de la bibliothèque standard C** (string.h, stdlib.h, etc.) que tu utiliseras dans TOUS tes futurs projets.

### Pourquoi recoder des fonctions existantes ?

1. **Comprendre ce que tu utilises** — beaucoup d'étudiants utilisent strlen() sans savoir comment elle fonctionne réellement
2. **Avoir ta propre bibliothèque** — dans les projets suivants, tu n'as souvent pas accès aux fonctions standard ; tu devras utiliser les tiennes
3. **Maîtriser les pointeurs** — la majorité des fonctions Libft manipulent des pointeurs en profondeur

### Structure du projet

Libft se divise en 3 parties :
- **Partie 1** : Fonctions de la libc (memset, strlen, strchr…)
- **Partie 2** : Fonctions additionnelles (substr, strjoin, split, itoa…)
- **Bonus** : Listes chaînées (lstnew, lstadd_front…)

### Le Makefile est obligatoire

Tu dois créer une **archive statique** \`libft.a\` avec la commande \`ar\`. Le Makefile doit avoir au minimum les règles : \`all\`, \`clean\`, \`fclean\`, \`re\`.

\`\`\`makefile
NAME = libft.a
CC = cc
CFLAGS = -Wall -Wextra -Werror
SRCS = ft_strlen.c ft_memset.c ft_strchr.c ...
OBJS = $(SRCS:.c=.o)

all: $(NAME)

$(NAME): $(OBJS)
    ar rcs $(NAME) $(OBJS)
\`\`\`

### La norme (Norminette)

Chaque fichier .c doit respecter la **norme 42** :
- Max 25 lignes par fonction
- Max 80 colonnes par ligne
- Max 5 fonctions par fichier
- Pas de variables non utilisées`,

    howToRead: `Lis le sujet PDF dans l'ordre. Commence par la Partie 1 (fonctions libc), valide-les avec un testeur (libft-unit-test ou moulinette), puis passe à la Partie 2. Le bonus ne vaut la peine que si la partie obligatoire est parfaite.`,

    examples: [
      {
        title: "ft_strlen — calculer la longueur d'une chaîne",
        description: "La version 42 de strlen. Parcourt le tableau de char jusqu'au '\\0' et compte les octets.",
        code: `size_t  ft_strlen(const char *s)
{
    size_t  len;

    len = 0;
    while (*s++)
        len++;
    return (len);
}`,
        output: `ft_strlen("hello") → 5
ft_strlen("")      → 0
ft_strlen("42")    → 2`,
        explanation: `Le pointeur s avance avec *s++ : on déréférence d'abord (lire la valeur), puis on incrémente l'adresse. Quand *s vaut '\\0' (fin de chaîne), la boucle s'arrête. IMPORTANT : le '\\0' n'est PAS compté dans la longueur.`,
      },
      {
        title: "ft_memset — remplir une zone mémoire",
        description: "Remplit n octets de la mémoire pointée par s avec l'octet c.",
        code: `void  *ft_memset(void *s, int c, size_t n)
{
    unsigned char  *ptr;

    ptr = (unsigned char *)s;
    while (n-- > 0)
        *ptr++ = (unsigned char)c;
    return (s);
}`,
        output: `char buf[5];
ft_memset(buf, 0, 5);   // buf = {0,0,0,0,0}
ft_memset(buf, 'A', 3); // buf = {65,65,65,0,0}`,
        explanation: `On cast en unsigned char* car on travaille octet par octet. Le paramètre c est un int (par compatibilité avec la libc) mais on le cast en unsigned char pour éviter les problèmes de signe. On retourne s (le pointeur de départ) pour permettre le chaînage.`,
      },
      {
        title: "ft_split — découper une chaîne en tableau",
        description: "Découpe la chaîne s en un tableau de sous-chaînes séparées par le délimiteur c.",
        code: `static size_t  count_words(char const *s, char c)
{
    size_t  count;

    count = 0;
    while (*s)
    {
        while (*s && *s == c)
            s++;
        if (*s)
            count++;
        while (*s && *s != c)
            s++;
    }
    return (count);
}

char  **ft_split(char const *s, char c)
{
    char    **result;
    size_t  i;
    size_t  wordlen;

    if (!s)
        return (NULL);
    result = malloc(sizeof(char *) * (count_words(s, c) + 1));
    if (!result)
        return (NULL);
    i = 0;
    while (*s)
    {
        while (*s && *s == c)
            s++;
        if (*s)
        {
            wordlen = 0;
            while (s[wordlen] && s[wordlen] != c)
                wordlen++;
            result[i++] = ft_substr(s, 0, wordlen);
            s += wordlen;
        }
    }
    result[i] = NULL;
    return (result);
}`,
        output: `ft_split("hello world foo", ' ')
→ ["hello", "world", "foo", NULL]

ft_split(",,a,,b,,", ',')
→ ["a", "b", NULL]`,
        explanation: `ft_split est une des fonctions les plus complexes. Stratégie : 1) compter les mots (pour allouer le bon tableau), 2) extraire chaque mot avec ft_substr. Le tableau se termine TOUJOURS par NULL. Gère les délimiteurs consécutifs et les bords de chaîne.`,
      },
      {
        title: "ft_itoa — entier vers chaîne",
        description: "Convertit un entier (même négatif, même INT_MIN) en chaîne de caractères allouée.",
        code: `static int  count_digits(int n)
{
    int  count;

    count = (n <= 0) ? 1 : 0;
    while (n != 0)
    {
        n /= 10;
        count++;
    }
    return (count);
}

char  *ft_itoa(int n)
{
    char    *str;
    int     len;
    long    nb;

    nb = (long)n;
    len = count_digits(n);
    str = malloc(sizeof(char) * (len + 1));
    if (!str)
        return (NULL);
    str[len] = '\0';
    if (nb < 0)
    {
        str[0] = '-';
        nb = -nb;
    }
    while (len-- > (n < 0 ? 1 : 0))
    {
        str[len] = '0' + (nb % 10);
        nb /= 10;
    }
    return (str);
}`,
        output: `ft_itoa(42)         → "42"
ft_itoa(-2147483648) → "-2147483648"  // INT_MIN !
ft_itoa(0)          → "0"`,
        explanation: `Le piège classique : INT_MIN = -2147483648. Si tu fais n = -n quand n == INT_MIN, tu obtiens un overflow (INT_MAX = 2147483647 < 2147483648). Solution : travailler avec un long pour le calcul.`,
      },
    ],

    exercises: [
      {
        id: "libft-ex01",
        type: "mcq",
        question: "Que retourne ft_strlen(\"\\0hello\") ?",
        options: ["0", "5", "6", "1"],
        answer: "0",
        explanation: "La chaîne commence par '\\0' donc la boucle while(*s++) s'arrête immédiatement. La longueur est 0.",
      },
      {
        id: "libft-ex02",
        type: "mcq",
        question: "Pourquoi ft_memset prend un int c mais travaille avec unsigned char ?",
        options: [
          "Par compatibilité avec la libc standard",
          "Pour les performances",
          "Parce que int est plus rapide",
          "C'est une erreur dans le sujet",
        ],
        answer: "Par compatibilité avec la libc standard",
        explanation: "La signature de memset dans la libc prend int pour la valeur. Mais on ne remplit qu'un octet à la fois, donc on cast en unsigned char pour éviter les comportements indéfinis avec les valeurs négatives.",
      },
      {
        id: "libft-ex03",
        type: "fill",
        question: "Complète ft_strdup : alloue une copie de la chaîne src.",
        context: `char  *ft_strdup(const char *src)
{
    char    *copy;
    size_t  len;

    len = ft_strlen(src);
    copy = ________(sizeof(char) * (len + ________));
    if (!copy)
        return (NULL);
    ft_memcpy(copy, src, len + 1);
    return (copy);
}`,
        answer: "malloc",
        explanation: "On alloue len+1 octets pour inclure le '\\0' final. ft_memcpy copie ensuite len+1 octets (la chaîne + son terminateur).",
      },
      {
        id: "libft-ex04",
        type: "output",
        question: "Quel est le résultat de ce code ?",
        context: `char  **tab;
int   i;

tab = ft_split("a::b::c", ':');
i = 0;
while (tab[i])
{
    printf("%s\\n", tab[i]);
    i++;
}`,
        answer: "a\nb\nc",
        explanation: "ft_split sépare par ':'. Les '::' consécutifs sont ignorés (considérés comme un seul séparateur). On obtient 3 mots : a, b, c — chacun sur une ligne.",
      },
      {
        id: "libft-ex05",
        type: "mcq",
        question: "Quelle règle doit respecter le tableau retourné par ft_split ?",
        options: [
          "Se terminer par NULL",
          "Se terminer par une chaîne vide \"\"",
          "Avoir un compteur en premier élément",
          "Être trié alphabétiquement",
        ],
        answer: "Se terminer par NULL",
        explanation: "Par convention 42 (et Unix), les tableaux de chaînes (comme argv) se terminent par NULL. Ton ft_split doit donc allouer count_words+1 slots et mettre NULL dans le dernier.",
      },
    ],

    traps: [
      "Oublier le +1 dans malloc pour le '\\0' final → segfault",
      "Ne pas vérifier si malloc retourne NULL → segfault garanti",
      "ft_strlcpy/ft_strlcat : la taille include le '\\0', contrairement à strncpy",
      "ft_itoa : INT_MIN (-2147483648) overflow si tu fais -n avec int",
      "Libft bonus (listes) : ne pas faire le bonus si la partie obligatoire n'est pas parfaite",
      "Le Makefile doit créer libft.a avec 'ar rcs' et non 'gcc -o'",
    ],

    tips: [
      "Utilise un testeur externe : 'libft-unit-test' ou 'francinette' pour vérifier chaque fonction",
      "Commence par les fonctions simples (strlen, isalpha) pour comprendre le pattern",
      "Lis le man de chaque fonction avant de la recoder : les cas limites y sont décrits",
      "Pour ft_split : teste avec des délimiteurs en début/fin de chaîne et des délimiteurs consécutifs",
      "Commite souvent avec git — le jury peut regarder ton historique",
    ],
  },

  {
    id: "libft-02",
    title: "Listes chaînées (Bonus)",
    emoji: "🔗",
    duration: "30 min",
    difficulty: "Intermédiaire",
    theory: `## Les listes chaînées en C

Une **liste chaînée** est une structure de données où chaque élément (nœud) contient une valeur et un pointeur vers l'élément suivant.

### Structure t_list

42 impose cette structure exacte dans libft.h :

\`\`\`c
typedef struct s_list
{
    void            *content;
    struct s_list   *next;
}   t_list;
\`\`\`

- \`content\` est un \`void *\` — il peut pointer vers n'importe quel type (int, char, struct...)
- \`next\` est un pointeur vers le nœud suivant (NULL pour le dernier)

### Visualisation

\`\`\`
[content=42|next] → [content="hi"|next] → [content=3.14|next=NULL]
\`\`\`

### Les 9 fonctions bonus

| Fonction | Rôle |
|---|---|
| ft_lstnew | Crée un nouveau nœud |
| ft_lstadd_front | Ajoute en tête |
| ft_lstsize | Compte les nœuds |
| ft_lstlast | Retourne le dernier nœud |
| ft_lstadd_back | Ajoute en queue |
| ft_lstdelone | Supprime un nœud |
| ft_lstclear | Vide toute la liste |
| ft_lstiter | Applique une fonction à chaque nœud |
| ft_lstmap | Crée une nouvelle liste transformée |`,

    howToRead: `Le bonus Libft est optionnel mais TRÈS recommandé. Les listes chaînées reviennent dans de nombreux projets futurs (minishell, etc.). Fais le bonus seulement si tu as une note parfaite sur la partie obligatoire.`,

    examples: [
      {
        title: "ft_lstnew et ft_lstadd_back — construire une liste",
        description: "Créer des nœuds et les chaîner en fin de liste.",
        code: `t_list  *ft_lstnew(void *content)
{
    t_list  *node;

    node = malloc(sizeof(t_list));
    if (!node)
        return (NULL);
    node->content = content;
    node->next = NULL;
    return (node);
}

void  ft_lstadd_back(t_list **lst, t_list *new)
{
    t_list  *last;

    if (!lst || !new)
        return ;
    if (!*lst)
    {
        *lst = new;
        return ;
    }
    last = ft_lstlast(*lst);
    last->next = new;
}

// Utilisation
int main(void)
{
    t_list  *list = NULL;

    ft_lstadd_back(&list, ft_lstnew("premier"));
    ft_lstadd_back(&list, ft_lstnew("deuxieme"));
    ft_lstadd_back(&list, ft_lstnew("troisieme"));
    // list → "premier" → "deuxieme" → "troisieme" → NULL
}`,
        output: `Liste : premier → deuxieme → troisieme → NULL`,
        explanation: `ft_lstadd_back prend un pointeur vers le pointeur de liste (t_list **) pour pouvoir modifier la tête si la liste est vide. Si *lst == NULL, on initialise directement. Sinon on va jusqu'au dernier nœud avec ft_lstlast et on chaîne.`,
      },
      {
        title: "ft_lstclear — libérer toute la liste",
        description: "Parcourt la liste et libère chaque nœud avec la fonction del fournie.",
        code: `void  ft_lstclear(t_list **lst, void (*del)(void *))
{
    t_list  *current;
    t_list  *next;

    if (!lst || !del)
        return ;
    current = *lst;
    while (current)
    {
        next = current->next;   // sauvegarder avant de free
        del(current->content);  // libérer le contenu
        free(current);          // libérer le nœud
        current = next;         // avancer
    }
    *lst = NULL;                // remettre la tête à NULL
}`,
        output: `// Après ft_lstclear(&list, free) : list == NULL`,
        explanation: `L'ordre est crucial : sauvegarder next AVANT de free. Si tu free(current) d'abord, current->next devient inaccessible (mémoire libérée = comportement indéfini). Ne jamais oublier de remettre *lst = NULL à la fin.`,
      },
    ],

    exercises: [
      {
        id: "libft-list01",
        type: "mcq",
        question: "Pourquoi ft_lstadd_back prend t_list **lst (double pointeur) ?",
        options: [
          "Pour pouvoir modifier la tête de liste si elle est NULL",
          "C'est une erreur, t_list* suffit",
          "Pour la performance",
          "Pour respecter la norme",
        ],
        answer: "Pour pouvoir modifier la tête de liste si elle est NULL",
        explanation: "Si la liste est vide (*lst == NULL), ft_lstadd_back doit modifier le pointeur de tête lui-même. Avec t_list* (simple pointeur), on ne modifie qu'une copie locale. Avec t_list** (double pointeur), on modifie la vraie variable de l'appelant.",
      },
      {
        id: "libft-list02",
        type: "order",
        question: "Remet dans l'ordre les étapes de ft_lstclear :",
        options: [
          "Sauvegarder current->next dans une variable temp",
          "Appeler del(current->content)",
          "free(current)",
          "current = temp (avancer)",
          "Mettre *lst = NULL",
        ],
        answer: [
          "Sauvegarder current->next dans une variable temp",
          "Appeler del(current->content)",
          "free(current)",
          "current = temp (avancer)",
          "Mettre *lst = NULL",
        ],
        explanation: "L'ordre strict est obligatoire : si tu free avant de sauvegarder next, tu accèdes à de la mémoire libérée. Si tu oublies *lst = NULL, le pointeur devient dangling.",
      },
    ],

    traps: [
      "Ne JAMAIS accéder à node->next après avoir free(node)",
      "ft_lstclear : ne pas oublier de mettre *lst = NULL à la fin",
      "ft_lstmap : si une allocation échoue en cours de route, il faut libérer tous les nœuds déjà créés",
      "Le content est un void* — c'est à toi de caster au bon type lors de l'utilisation",
    ],

    tips: [
      "Dessine la liste sur papier avant de coder — visualiser les pointeurs évite les erreurs",
      "ft_lstmap est la plus complexe : elle crée une nouvelle liste tout en gérant les erreurs mémoire",
      "Pour déboguer : imprime les adresses des nœuds avec printf('%p', node)",
    ],
  },
];

// ============================================================
// FT_PRINTF — Rang 1
// ============================================================
const ftprintfLessons: Lesson[] = [
  {
    id: "printf-01",
    title: "Arguments variadiques",
    emoji: "📝",
    duration: "25 min",
    difficulty: "Intermédiaire",
    theory: `## Qu'est-ce que ft_printf ?

ft_printf est ton deuxième grand projet. Tu recodes **printf**, la fonction d'affichage la plus utilisée en C. L'objectif principal : comprendre les **arguments variadiques** (fonctions qui acceptent un nombre variable d'arguments).

### Pourquoi c'est difficile ?

printf accepte un nombre variable d'arguments selon le format string :
\`\`\`c
printf("%d", 42);          // 1 argument
printf("%s %s", "a", "b"); // 2 arguments
printf("salut");            // 0 arguments
\`\`\`

En C, cela s'implémente avec \`<stdarg.h>\`.

### La bibliothèque stdarg.h

\`\`\`c
#include <stdarg.h>

va_list args;           // liste des arguments variadiques
va_start(args, last);   // initialise la liste (last = dernier paramètre nommé)
va_arg(args, type);     // récupère l'argument suivant du type donné
va_copy(dst, src);      // copie une va_list
va_end(args);           // libère la liste (OBLIGATOIRE)
\`\`\`

### Prototype de ft_printf

\`\`\`c
int  ft_printf(const char *format, ...);
\`\`\`

Le \`...\` signifie "0 ou plusieurs arguments supplémentaires".

### Conversions obligatoires

| Spécificateur | Signification |
|---|---|
| %c | Caractère |
| %s | Chaîne de caractères |
| %p | Adresse en hexadécimal |
| %d / %i | Entier décimal signé |
| %u | Entier décimal non signé |
| %x | Hexadécimal minuscule |
| %X | Hexadécimal majuscule |
| %% | Afficher le caractère % |`,

    howToRead: `Le sujet ft_printf est court mais dense. Lis attentivement la liste des conversions à implémenter. Note que les flags (-, 0, ., *, width, precision) sont BONUS — ne les implémente qu'après avoir validé toutes les conversions obligatoires.`,

    examples: [
      {
        title: "Squelette de ft_printf — parser le format",
        description: "Structure principale qui parcourt le format string et dispatch vers les bonnes fonctions.",
        code: `#include "ft_printf.h"

static int  handle_conversion(char c, va_list args)
{
    if (c == 'c')
        return (ft_putchar(va_arg(args, int)));
    if (c == 's')
        return (ft_putstr(va_arg(args, char *)));
    if (c == 'd' || c == 'i')
        return (ft_putnbr(va_arg(args, int)));
    if (c == 'u')
        return (ft_putunsigned(va_arg(args, unsigned int)));
    if (c == 'x')
        return (ft_puthex(va_arg(args, unsigned int), 0));
    if (c == 'X')
        return (ft_puthex(va_arg(args, unsigned int), 1));
    if (c == 'p')
        return (ft_putptr(va_arg(args, void *)));
    if (c == '%')
        return (ft_putchar('%'));
    return (0);
}

int  ft_printf(const char *format, ...)
{
    va_list args;
    int     count;

    va_start(args, format);
    count = 0;
    while (*format)
    {
        if (*format == '%' && *(format + 1))
        {
            format++;
            count += handle_conversion(*format, args);
        }
        else
            count += ft_putchar(*format);
        format++;
    }
    va_end(args);
    return (count);
}`,
        output: `ft_printf("Hello %s, tu as %d ans!\\n", "Alice", 25);
// → Hello Alice, tu as 25 ans!
// → retourne 30 (nombre de caractères affichés)`,
        explanation: `La fonction parcourt le format char par char. Quand elle rencontre '%', elle regarde le caractère suivant et appelle la bonne fonction de conversion. IMPORTANT : ft_printf retourne le NOMBRE TOTAL de caractères affichés — comme le vrai printf. Chaque ft_put* retourne le nombre de chars qu'il a affiché.`,
      },
      {
        title: "ft_puthex — afficher en hexadécimal",
        description: "Affiche un unsigned int en base 16, en minuscule ou majuscule.",
        code: `static int  ft_puthex(unsigned int n, int upper)
{
    char    *base;
    int     count;

    base = upper ? "0123456789ABCDEF" : "0123456789abcdef";
    count = 0;
    if (n >= 16)
        count += ft_puthex(n / 16, upper);
    count += ft_putchar(base[n % 16]);
    return (count);
}

// Pour ft_putptr (pointeur = unsigned long long)
static int  ft_putptr(void *ptr)
{
    int             count;
    unsigned long   addr;

    count = write(1, "0x", 2);
    addr = (unsigned long)ptr;
    count += ft_putulhex(addr);
    return (count);
}`,
        output: `ft_printf("%x", 255)   → ff
ft_printf("%X", 255)   → FF
ft_printf("%p", &x)    → 0x7ffee4b2a3bc`,
        explanation: `La récursion divise par 16 pour obtenir les chiffres de gauche à droite. On utilise une string de base pour convertir un chiffre hexadécimal en caractère. Pour %p, on affiche le préfixe "0x" et on cast le pointeur en unsigned long pour afficher son adresse.`,
      },
    ],

    exercises: [
      {
        id: "printf-ex01",
        type: "mcq",
        question: "Que fait va_end(args) ?",
        options: [
          "Libère les ressources associées à la va_list",
          "Termine le programme",
          "Réinitialise la va_list au premier argument",
          "Rien, c'est optionnel",
        ],
        answer: "Libère les ressources associées à la va_list",
        explanation: "va_end DOIT être appelé avant de retourner de la fonction, sinon comportement indéfini. Sur certaines architectures, va_list alloue des ressources qui doivent être libérées.",
      },
      {
        id: "printf-ex02",
        type: "fill",
        question: "Quel type utilise va_arg pour récupérer un 'char' passé comme argument ?",
        context: `// En C, char est promu en int lors du passage d'arguments
// donc va_arg doit utiliser ________
char c = va_arg(args, ________);`,
        answer: "int",
        explanation: "En C, les types plus petits qu'int (char, short) sont automatiquement promus en int lors du passage en arguments variadiques. Utiliser va_arg(args, char) est un comportement indéfini — il faut toujours utiliser int.",
      },
      {
        id: "printf-ex03",
        type: "output",
        question: "Que retourne ft_printf(\"%%d\") ?",
        context: `// %% est le seul spécificateur qui n'a pas d'argument
// Il affiche simplement '%'
ft_printf("%%d");`,
        answer: "2",
        explanation: "%% affiche '%' (1 char). Le 'd' est affiché comme caractère normal (1 char). Total = 2. ft_printf retourne le nombre de caractères affichés, pas 0.",
      },
      {
        id: "printf-ex04",
        type: "mcq",
        question: "Que faire si ft_printf reçoit \"%s\" mais l'argument est NULL ?",
        options: [
          "Afficher \"(null)\" comme le vrai printf",
          "Segfault — c'est voulu",
          "Afficher une chaîne vide",
          "Retourner -1",
        ],
        answer: "Afficher \"(null)\" comme le vrai printf",
        explanation: "Le vrai printf gère le cas NULL en affichant \"(null)\". Ta ft_printf doit avoir le même comportement pour passer les tests de la moulinette. Vérifier if (!str) return (write(1, \"(null)\", 6)); dans ta ft_putstr.",
      },
    ],

    traps: [
      "Oublier va_end → comportement indéfini (parfois ça 'fonctionne' mais c'est UB)",
      "va_arg(args, char) → FAUX, utiliser int (promotion automatique)",
      "Ne pas gérer %s avec NULL → segfault lors des tests",
      "ft_printf doit retourner -1 si write() échoue",
      "Pour %p avec NULL : afficher \"(nil)\" comme le vrai printf",
      "L'archive doit s'appeler libftprintf.a (pas libft.a)",
    ],

    tips: [
      "Utilise ft_printf_tester ou 'printf_tester' pour comparer avec le vrai printf",
      "Commence par implémenter %c et %s — ce sont les plus simples",
      "Pour %p : caste en (unsigned long) et affiche en hexa précédé de '0x'",
      "Un retour de -1 si write échoue est attendu par la moulinette",
    ],
  },
];

// ============================================================
// GET_NEXT_LINE — Rang 1
// ============================================================
const gnlLessons: Lesson[] = [
  {
    id: "gnl-01",
    title: "Variables statiques et lecture fd",
    emoji: "📄",
    duration: "30 min",
    difficulty: "Intermédiaire",
    theory: `## Qu'est-ce que get_next_line ?

get_next_line (GNL) est un projet qui t'apprend à **lire un fichier ligne par ligne**. La fonction retourne une ligne à chaque appel, incluant le '\\n' final s'il existe.

### Prototype

\`\`\`c
char  *get_next_line(int fd);
\`\`\`

- **fd** : descripteur de fichier (0=stdin, ou résultat d'open())
- **Retour** : la prochaine ligne (incluant '\\n'), ou NULL si fin de fichier ou erreur

### Le problème fondamental

Quand tu lis avec read(), tu lis par blocs de BUFFER_SIZE octets. Un seul appel à read() peut lire :
- Moins d'une ligne complète
- Exactement une ligne
- Plusieurs lignes en une fois

Tu dois donc **mémoriser** entre les appels ce que tu as lu mais pas encore retourné.

### La solution : variable statique

\`\`\`c
static char  *stash;
\`\`\`

Une variable statique **persiste entre les appels** à la même fonction. C'est différent d'une variable globale (elle est locale à la fonction). Elle est initialisée à NULL au premier appel.

### BUFFER_SIZE

La taille du buffer de lecture est définie à la compilation :
\`\`\`bash
cc -D BUFFER_SIZE=42 get_next_line.c get_next_line_utils.c
\`\`\`

Ton code doit fonctionner avec n'importe quelle valeur (1, 10, 9999, même 10000000).

### Fichiers à rendre

- \`get_next_line.c\` — la fonction principale
- \`get_next_line_utils.c\` — tes fonctions utilitaires (ft_strlen, ft_strjoin, etc.)
- \`get_next_line.h\` — le header
- **Bonus** : les mêmes avec _bonus.c/_bonus.h pour gérer plusieurs fd simultanément`,

    howToRead: `Le sujet GNL est très court. L'essentiel : comprendre la variable statique et le BUFFER_SIZE. Lis les sections "Allowed functions" et "Return value" attentivement. Pour le bonus, tu dois gérer plusieurs fd simultanément (utiliser un tableau de stash).`,

    examples: [
      {
        title: "Architecture de get_next_line",
        description: "La stratégie principale : lire dans la stash jusqu'à trouver un '\\n' ou EOF.",
        code: `char  *get_next_line(int fd)
{
    static char  *stash;
    char         *line;
    char         *buf;

    if (fd < 0 || BUFFER_SIZE <= 0)
        return (NULL);

    // Lire et accumuler dans stash jusqu'à trouver '\n' ou EOF
    if (!read_and_stash(fd, &stash))
        return (NULL);

    // Extraire la première ligne de stash
    line = extract_line(stash);

    // Mettre à jour stash : garder ce qui est après '\n'
    stash = update_stash(stash);

    return (line);
}

static int  read_and_stash(int fd, char **stash)
{
    char    buf[BUFFER_SIZE + 1];
    ssize_t bytes;

    // Si stash a déjà un '\n', pas besoin de lire
    if (*stash && ft_strchr(*stash, '\\n'))
        return (1);

    while ((bytes = read(fd, buf, BUFFER_SIZE)) > 0)
    {
        buf[bytes] = '\\0';
        *stash = ft_strjoin_free(*stash, buf);
        if (!*stash)
            return (0);
        if (ft_strchr(*stash, '\\n'))
            break ;
    }
    return (bytes >= 0 && *stash && **stash);
}`,
        output: `// Fichier "test.txt" contenant :
// "Bonjour\\nMonde\\n42"

get_next_line(fd) → "Bonjour\\n"
get_next_line(fd) → "Monde\\n"
get_next_line(fd) → "42"
get_next_line(fd) → NULL  // EOF`,
        explanation: `L'idée clé : la stash est le "tampon" entre les appels. Après avoir extrait une ligne, on garde dans la stash tout ce qui vient après le '\\n'. Au prochain appel, on regarde d'abord la stash avant de lire le fd. La variable static garantit que stash persiste entre les appels.`,
      },
      {
        title: "ft_strjoin_free — join avec libération",
        description: "Version de strjoin qui libère l'ancien s1 — essentielle pour éviter les leaks.",
        code: `char  *ft_strjoin_free(char *s1, char *s2)
{
    char    *result;
    size_t  len1;
    size_t  len2;

    len1 = s1 ? ft_strlen(s1) : 0;
    len2 = ft_strlen(s2);
    result = malloc(sizeof(char) * (len1 + len2 + 1));
    if (!result)
    {
        free(s1);
        return (NULL);
    }
    if (s1)
        ft_memcpy(result, s1, len1);
    ft_memcpy(result + len1, s2, len2 + 1);
    free(s1);         // libérer l'ancien stash
    return (result);
}`,
        output: `// stash = "hel", buf = "lo\\nworld"
// ft_strjoin_free(stash, buf)
// → "hello\\nworld" (et libère "hel")`,
        explanation: `En GNL, on join souvent stash + buf pour former le nouveau stash. Si on ne libère pas l'ancien stash (s1), on a une fuite mémoire à chaque lecture. C'est pour ça qu'on crée une version "avec free" de strjoin.`,
      },
      {
        title: "Bonus — Plusieurs fd simultanément",
        description: "Utiliser un tableau de stash indexé par fd pour gérer plusieurs fichiers.",
        code: `// get_next_line_bonus.c
#define OPEN_MAX 1024

char  *get_next_line(int fd)
{
    static char  *stash[OPEN_MAX];  // un stash par fd
    char         *line;

    if (fd < 0 || fd >= OPEN_MAX || BUFFER_SIZE <= 0)
        return (NULL);

    // Chaque fd a son propre stash indépendant
    read_and_stash(fd, &stash[fd]);
    line = extract_line(stash[fd]);
    stash[fd] = update_stash(stash[fd]);
    return (line);
}`,
        output: `int fd1 = open("file1.txt", O_RDONLY);
int fd2 = open("file2.txt", O_RDONLY);

get_next_line(fd1) → ligne 1 de file1
get_next_line(fd2) → ligne 1 de file2
get_next_line(fd1) → ligne 2 de file1
// Les deux fichiers sont lus indépendamment`,
        explanation: `La version bonus remplace la variable statique unique par un tableau. stash[fd] est le tampon pour le fd numéro fd. OPEN_MAX (1024 sur Linux) est le nombre maximum de fd ouverts simultanément.`,
      },
    ],

    exercises: [
      {
        id: "gnl-ex01",
        type: "mcq",
        question: "Que vaut une variable statique locale lors du PREMIER appel à la fonction ?",
        options: ["NULL / 0 (initialisée à zéro)", "Une valeur aléatoire", "La valeur du dernier appel", "Elle n'est pas initialisée"],
        answer: "NULL / 0 (initialisée à zéro)",
        explanation: "En C, les variables statiques locales sont initialisées à 0 (ou NULL pour les pointeurs) automatiquement avant le premier appel. C'est garanti par le standard.",
      },
      {
        id: "gnl-ex02",
        type: "mcq",
        question: "Que se passe-t-il si BUFFER_SIZE est défini à 1 ?",
        options: [
          "get_next_line doit toujours fonctionner, juste plus lentement",
          "Comportement indéfini",
          "Erreur de compilation",
          "Seul le premier caractère est retourné",
        ],
        answer: "get_next_line doit toujours fonctionner, juste plus lentement",
        explanation: "Le sujet spécifie que get_next_line doit fonctionner avec n'importe quelle valeur de BUFFER_SIZE ≥ 1. Avec BUFFER_SIZE=1, on lit octet par octet — c'est très lent mais correct.",
      },
      {
        id: "gnl-ex03",
        type: "output",
        question: "Que retourne get_next_line sur un fichier contenant exactement \"hello\" (sans \\n final) ?",
        context: `// Fichier: echo -n "hello" > test.txt
// (pas de newline à la fin)
fd = open("test.txt", O_RDONLY);
char *line = get_next_line(fd);`,
        answer: "hello",
        explanation: "GNL retourne la ligne sans '\\n' s'il n'y en a pas. \"hello\" est retourné tel quel. L'appel suivant retourne NULL (EOF). La chaîne retournée est \"hello\" (5 chars), pas \"hello\\n\".",
      },
      {
        id: "gnl-ex04",
        type: "mcq",
        question: "Pourquoi get_next_line doit retourner la ligne AVEC le '\\n' (si présent) ?",
        options: [
          "Pour que l'appelant sache si la ligne était terminée ou si c'est la fin de fichier",
          "Pour respecter la convention Unix",
          "C'est plus simple à implémenter",
          "Pour économiser de la mémoire",
        ],
        answer: "Pour que l'appelant sache si la ligne était terminée ou si c'est la fin de fichier",
        explanation: "Inclure '\\n' permet de distinguer: la ligne \"hello\" avec '\\n' (pas encore EOF) vs la ligne \"hello\" sans '\\n' (c'est la dernière ligne, EOF). L'appelant peut vérifier si la ligne se termine par '\\n' pour savoir s'il y en a d'autres.",
      },
    ],

    traps: [
      "Utiliser des variables globales au lieu de static → toujours utiliser static dans la fonction",
      "Ne pas libérer la stash quand elle ne contient plus de données utiles",
      "Oublier de mettre buf[bytes] = '\\0' après read()",
      "Ne pas gérer BUFFER_SIZE <= 0 (valeur invalide)",
      "Fuites mémoire : chaque strjoin crée un nouveau buffer — libérer l'ancien",
      "read() peut retourner -1 en cas d'erreur — toujours vérifier",
    ],

    tips: [
      "Dessine sur papier l'évolution de la stash appel par appel",
      "Teste avec BUFFER_SIZE=1 (cas le plus difficile) et BUFFER_SIZE=100000",
      "Utilise valgrind pour vérifier les fuites mémoire",
      "Le bonus (plusieurs fd) est souvent plus simple qu'il n'y paraît — juste un tableau",
      "Vérifie que ta GNL gère stdin (fd=0) : cat file.txt | ./ton_programme",
    ],
  },
];

// ============================================================
// PUSH_SWAP — Rang 2
// ============================================================
const pushswapLessons: Lesson[] = [
  {
    id: "pushswap-01",
    title: "Comprendre le problème",
    emoji: "🔀",
    duration: "30 min",
    difficulty: "Avancé",
    theory: `## Qu'est-ce que push_swap ?

push_swap est un projet d'algorithmie. Tu dois **trier une pile de nombres** en utilisant uniquement des opérations précises, avec le **minimum d'opérations** possible.

### Les deux piles

Tu as deux piles : **A** et **B**
- A contient initialement les nombres dans n'importe quel ordre
- B est vide au départ
- L'objectif : avoir A triée (plus petit en bas) en le moins d'opérations possible

### Les 11 opérations autorisées

| Opération | Description |
|---|---|
| sa | swap les 2 premiers éléments de A |
| sb | swap les 2 premiers éléments de B |
| ss | sa + sb simultanément |
| pa | push le sommet de B vers A |
| pb | push le sommet de A vers B |
| ra | rotate A vers le haut (premier → dernier) |
| rb | rotate B vers le haut (premier → dernier) |
| rr | ra + rb simultanément |
| rra | reverse rotate A (dernier → premier) |
| rrb | reverse rotate B (dernier → premier) |
| rrr | rra + rrb simultanément |

### Critères de notation

| Taille | Opérations max (100 points) | Opérations max (80 points) |
|---|---|---|
| 3 nombres | ≤ 3 | — |
| 5 nombres | ≤ 12 | — |
| 100 nombres | ≤ 700 | ≤ 900 |
| 500 nombres | ≤ 5500 | ≤ 7000 |

### Algorithmes courants

1. **Algorithme naïf** (pour 2-3 éléments) — tri par sélection simple
2. **Algorithme turc** (Turkish sort / radix) — très efficace pour 100-500 éléments
3. **Radix sort** — utilise la représentation binaire
4. **Quicksort** adapté aux piles

### Programme checker (bonus)

Tu dois aussi coder un \`checker\` qui lit des opérations depuis stdin et vérifie si la pile est bien triée à la fin.`,

    howToRead: `Le sujet push_swap est dense. Lis d'abord la liste des opérations et bien les comprendre. Ensuite, lis la section sur les règles de notation pour savoir combien d'opérations tu vises. L'algorithme est libre — c'est à toi de choisir.`,

    examples: [
      {
        title: "Structure de pile et opérations de base",
        description: "Implémenter une pile avec les opérations sa, pb, ra.",
        code: `typedef struct s_stack
{
    int             value;
    struct s_stack  *next;
}   t_stack;

// Push un élément sur la pile
void  push(t_stack **stack, int val)
{
    t_stack  *node;

    node = malloc(sizeof(t_stack));
    if (!node)
        exit(1);
    node->value = val;
    node->next = *stack;
    *stack = node;
}

// Opération sa : swap les 2 premiers de A
void  sa(t_stack **a, int print)
{
    t_stack  *first;
    t_stack  *second;

    if (!*a || !(*a)->next)
        return ;
    first = *a;
    second = (*a)->next;
    first->next = second->next;
    second->next = first;
    *a = second;
    if (print)
        write(1, "sa\\n", 3);
}

// Opération pb : push le sommet de A vers B
void  pb(t_stack **a, t_stack **b, int print)
{
    t_stack  *top;

    if (!*a)
        return ;
    top = *a;
    *a = (*a)->next;
    top->next = *b;
    *b = top;
    if (print)
        write(1, "pb\\n", 3);
}`,
        output: `// A = [3, 1, 2]  B = []
pb(&a, &b);  // A = [1, 2]  B = [3]
sa(&a);      // A = [2, 1]  B = [3]
pa(&b, &a);  // A = [3, 2, 1]  B = []`,
        explanation: `Chaque opération modifie les piles et écrit son nom sur stdout. Le programme push_swap reçoit les nombres en argument et affiche les opérations une par une. Le checker lit ces opérations et vérifie le résultat final.`,
      },
      {
        title: "Algorithme Radix Sort (très efficace)",
        description: "Trier en utilisant la représentation binaire des indices normalisés.",
        code: `// Étape 1 : Normaliser les valeurs (remplacer par leur rang)
// [42, -7, 13, 0] → [3, 0, 2, 1] (rang du plus petit = 0)
void  normalize(t_stack *a, int size)
{
    int      *sorted;
    t_stack  *current;
    int      i;

    sorted = sort_array(a, size);    // copie triée
    current = a;
    while (current)
    {
        i = 0;
        while (sorted[i] != current->value)
            i++;
        current->value = i;          // remplacer par le rang
        current = current->next;
    }
    free(sorted);
}

// Étape 2 : Radix sort bit par bit
void  radix_sort(t_stack **a, t_stack **b, int size)
{
    int  bit;
    int  max_bits;
    int  i;

    max_bits = count_bits(size);
    bit = 0;
    while (bit < max_bits)
    {
        i = 0;
        while (i < size)
        {
            if (((*a)->value >> bit) & 1)
                ra(a);               // bit = 1 → reste en A
            else
                pb(a, b);            // bit = 0 → va en B
            i++;
        }
        while (*b)
            pa(a, b);               // tout remettre en A
        bit++;
    }
}`,
        output: `// Normalisation : [5, 2, 4, 1, 3] → [4, 1, 3, 0, 2]
// Radix bit 0 : 0→B, 0→B, 1→A, 0→B, 0→B
// ...
// Résultat : pile A triée en ordre croissant`,
        explanation: `Le radix sort est l'algorithme le plus populaire pour push_swap 100/500. Il trie bit par bit : pour chaque position de bit, les éléments avec bit=0 vont en B, les autres restent en A. Après max_bits passes, la pile est triée. Complexité : O(n × log n) opérations.`,
      },
    ],

    exercises: [
      {
        id: "ps-ex01",
        type: "order",
        question: "Pour trier [2, 1, 3] avec le minimum d'opérations, quel est l'ordre correct ?",
        options: ["sa (swap 2 et 1)", "Vérifier si A est triée : [1, 2, 3] ✓", "C'est déjà trié après sa"],
        answer: ["sa (swap 2 et 1)", "Vérifier si A est triée : [1, 2, 3] ✓", "C'est déjà trié après sa"],
        explanation: "Pour [2, 1, 3] : un seul 'sa' suffit pour obtenir [1, 2, 3]. 1 opération, c'est optimal.",
      },
      {
        id: "ps-ex02",
        type: "mcq",
        question: "Pourquoi normaliser les valeurs avant le radix sort ?",
        options: [
          "Pour que les valeurs soient des indices de 0 à n-1, rendant le radix prévisible",
          "Pour gérer les nombres négatifs",
          "Pour accélérer les opérations",
          "C'est une exigence du sujet",
        ],
        answer: "Pour que les valeurs soient des indices de 0 à n-1, rendant le radix prévisible",
        explanation: "Avec des valeurs arbitraires, le nombre de bits nécessaires est imprévisible. En normalisant vers [0, n-1], on sait exactement combien de bits il faut (log2(n)) et le tri est plus efficace.",
      },
      {
        id: "ps-ex03",
        type: "mcq",
        question: "Quelle opération est l'inverse de ra (rotate A) ?",
        options: ["rra (reverse rotate A)", "rb", "sa", "pa"],
        answer: "rra (reverse rotate A)",
        explanation: "ra amène le premier élément en dernier. rra amène le dernier élément en premier. Ce sont des inverses l'un de l'autre.",
      },
    ],

    traps: [
      "Ne pas gérer les doublons : le sujet dit que les entrées sont toujours sans doublons, mais vérifier quand même",
      "Ne pas gérer le cas où A est déjà triée (retourner sans rien afficher)",
      "Afficher les opérations sur stdout, les erreurs sur stderr",
      "Pour 3 éléments : il existe exactement 6 permutations, chacune avec un nombre d'ops optimal connu",
      "Le checker lit stdin : echo 'sa\\npb' | ./checker 3 1 2",
    ],

    tips: [
      "Commence par le cas 3 éléments (hardcodé avec if/else) — la moulinette en a besoin",
      "Pour 100 nombres, l'algorithme radix atteint facilement < 700 opérations",
      "Utilise le checker (bonus) dès le début pour tester ton programme",
      "Génère 100 nombres aléatoires avec : ARG=$(python3 -c 'import random; print(*random.sample(range(-500,500),100))')",
    ],
  },
];

// ============================================================
// PHILOSOPHERS — Rang 3
// ============================================================
const philoLessons: Lesson[] = [
  {
    id: "philo-01",
    title: "Threads POSIX et mutexes",
    emoji: "🍝",
    duration: "40 min",
    difficulty: "Avancé",
    theory: `## Le problème des philosophes

Le problème des philosophes dînants est un problème classique de synchronisation. Des philosophes assis autour d'une table partagent des fourchettes entre eux. Ils alternent entre **penser**, **prendre les fourchettes**, **manger**, et **dormir**.

### La règle des fourchettes

- Il y a autant de fourchettes que de philosophes
- Chaque fourchette est entre deux philosophes
- Un philosophe a besoin de **2 fourchettes** pour manger (sa gauche et sa droite)
- Si un philosophe ne mange pas depuis time_to_die ms → il meurt

### Paramètres du programme

\`\`\`bash
./philo nb_philo time_to_die time_to_eat time_to_sleep [nb_must_eat]
\`\`\`

### Les threads POSIX

Chaque philosophe est un **thread** — un fil d'exécution indépendant qui partage la mémoire du processus.

\`\`\`c
#include <pthread.h>

pthread_t  thread;
pthread_create(&thread, NULL, routine, arg);  // crée un thread
pthread_join(thread, NULL);                   // attend la fin du thread
\`\`\`

### Les mutexes

Un **mutex** (mutual exclusion) protège une ressource partagée. Un seul thread peut locker un mutex à la fois.

\`\`\`c
pthread_mutex_t  mutex;
pthread_mutex_init(&mutex, NULL);    // initialiser
pthread_mutex_lock(&mutex);          // verrouiller (bloquant)
pthread_mutex_unlock(&mutex);        // déverrouiller
pthread_mutex_destroy(&mutex);       // détruire
\`\`\`

### La condition de mort

Si un philosophe n'a pas commencé à manger depuis time_to_die millisecondes, il meurt. Tu dois détecter la mort et arrêter immédiatement la simulation.

### Interdits du projet

- **Pas de variables globales** (sauf constantes)
- **Pas de fork()** (la version bonus utilise des sémaphores avec fork)
- Pas de deadlock (situation où tous les philosophes attendent indéfiniment)`,

    howToRead: `Commence par bien comprendre les paramètres du programme. Lis le sujet 3 fois. Le défi n'est pas le code en lui-même mais la synchronisation correcte : éviter les data races et les deadlocks tout en détectant la mort rapidement.`,

    examples: [
      {
        title: "Structure et initialisation",
        description: "Définir les structures et initialiser les philosophes avec leurs fourchettes.",
        code: `typedef struct s_fork
{
    pthread_mutex_t  mutex;
}   t_fork;

typedef struct s_philo
{
    int              id;
    long long        last_meal;
    int              meals_count;
    t_fork           *left_fork;
    t_fork           *right_fork;
    struct s_data    *data;
    pthread_t        thread;
}   t_philo;

typedef struct s_data
{
    int              nb_philo;
    long long        time_to_die;
    long long        time_to_eat;
    long long        time_to_sleep;
    int              must_eat;
    int              dead;           // flag : un philo est mort
    pthread_mutex_t  dead_mutex;     // protège dead
    pthread_mutex_t  print_mutex;    // protège printf
    t_philo          *philos;
    t_fork           *forks;
}   t_data;

void  init_forks(t_data *data)
{
    int  i;

    data->forks = malloc(sizeof(t_fork) * data->nb_philo);
    i = 0;
    while (i < data->nb_philo)
    {
        pthread_mutex_init(&data->forks[i].mutex, NULL);
        i++;
    }
}

void  assign_forks(t_data *data)
{
    int  i;

    i = 0;
    while (i < data->nb_philo)
    {
        data->philos[i].left_fork  = &data->forks[i];
        data->philos[i].right_fork = &data->forks[(i + 1) % data->nb_philo];
        i++;
    }
}`,
        output: `// Philosophe 0 : fourchette gauche=0, droite=1
// Philosophe 1 : fourchette gauche=1, droite=2
// ...
// Philosophe n-1 : fourchette gauche=n-1, droite=0`,
        explanation: `L'assignation circulaire des fourchettes est la clé. Le modulo (i+1) % nb_philo permet au dernier philosophe de partager la fourchette 0 avec le premier. Deux mutexes séparés (dead_mutex et print_mutex) évitent les data races sur les variables partagées.`,
      },
      {
        title: "Routine du philosophe — manger, dormir, penser",
        description: "La boucle principale de vie d'un philosophe.",
        code: `void  print_status(t_philo *philo, char *status)
{
    pthread_mutex_lock(&philo->data->print_mutex);
    if (!philo->data->dead)
        printf("%lld %d %s\\n", get_time() - philo->data->start, philo->id, status);
    pthread_mutex_unlock(&philo->data->print_mutex);
}

int  is_dead(t_data *data)
{
    int  dead;

    pthread_mutex_lock(&data->dead_mutex);
    dead = data->dead;
    pthread_mutex_unlock(&data->dead_mutex);
    return (dead);
}

void  *philosopher_routine(void *arg)
{
    t_philo  *philo;

    philo = (t_philo *)arg;
    if (philo->id % 2 == 0)          // les pairs commencent décalés
        usleep(philo->data->time_to_eat * 500);

    while (!is_dead(philo->data))
    {
        // Prendre les fourchettes
        pthread_mutex_lock(&philo->left_fork->mutex);
        print_status(philo, "has taken a fork");
        pthread_mutex_lock(&philo->right_fork->mutex);
        print_status(philo, "has taken a fork");

        // Manger
        pthread_mutex_lock(&philo->data->dead_mutex);
        philo->last_meal = get_time();
        pthread_mutex_unlock(&philo->data->dead_mutex);
        print_status(philo, "is eating");
        philo->meals_count++;
        ft_sleep(philo->data->time_to_eat);

        // Reposer les fourchettes
        pthread_mutex_unlock(&philo->left_fork->mutex);
        pthread_mutex_unlock(&philo->right_fork->mutex);

        // Dormir
        print_status(philo, "is sleeping");
        ft_sleep(philo->data->time_to_sleep);

        // Penser
        print_status(philo, "is thinking");
    }
    return (NULL);
}`,
        output: `0 1 is thinking
1 2 is thinking
5 1 has taken a fork
5 1 has taken a fork
5 2 has taken a fork
5 1 is eating
...
410 3 died`,
        explanation: `Le décalage initial (pairs vs impairs) évite que tous les philosophes prennent leur fourchette gauche simultanément (deadlock). L'ordre lock(left) → lock(right) doit être CONSISTANT pour éviter le deadlock circulaire. Le monitoring de la mort se fait dans un thread séparé.`,
      },
    ],

    exercises: [
      {
        id: "philo-ex01",
        type: "mcq",
        question: "Qu'est-ce qu'un deadlock dans le contexte des philosophes ?",
        options: [
          "Tous les philosophes tiennent leur fourchette gauche et attendent la droite indéfiniment",
          "Un philosophe mange deux fois de suite",
          "Un thread crashe",
          "La simulation ne s'arrête jamais",
        ],
        answer: "Tous les philosophes tiennent leur fourchette gauche et attendent la droite indéfiniment",
        explanation: "Le deadlock classique : chaque philosophe prend sa fourchette gauche, puis attend la droite (tenue par son voisin). Personne ne peut avancer. Solution : décaler le démarrage ou ordonner les locks.",
      },
      {
        id: "philo-ex02",
        type: "mcq",
        question: "Pourquoi printf doit être protégé par un mutex ?",
        options: [
          "Pour éviter les data races qui mélangeraient les messages de plusieurs threads",
          "printf n'est pas thread-safe",
          "Pour les performances",
          "Le sujet l'impose",
        ],
        answer: "Pour éviter les data races qui mélangeraient les messages de plusieurs threads",
        explanation: "Sans mutex, deux threads peuvent écrire simultanément et les messages s'entremêlent : '5 1 is ea5 2 has taken a forkting'. Le mutex garantit qu'un seul thread écrit à la fois.",
      },
      {
        id: "philo-ex03",
        type: "mcq",
        question: "Un seul philosophe (./philo 1 800 200 200) — que se passe-t-il ?",
        options: [
          "Il prend une fourchette, attend la deuxième (inexistante) et meurt",
          "Il mange et la simulation finit",
          "Erreur de segmentation",
          "Deadlock immédiat",
        ],
        answer: "Il prend une fourchette, attend la deuxième (inexistante) et meurt",
        explanation: "Avec 1 philosophe, il y a 1 fourchette. Il la prend (fourchette gauche = fourchette droite), puis essaie de prendre la même fourchette de nouveau → deadlock. Il meurt après time_to_die ms. Cas spécial à gérer explicitement.",
      },
    ],

    traps: [
      "Data race sur last_meal : protéger les lectures/écritures avec un mutex",
      "Deadlock avec 1 philosophe : traiter ce cas séparément",
      "usleep n'est pas précis : pour time_to_die précis, utiliser gettimeofday en boucle",
      "Ne pas print après la mort d'un philosophe (le mutex print aide)",
      "Oublier pthread_join → threads zombies + comportement indéfini",
      "Fuite mémoire sur les mutexes : appeler pthread_mutex_destroy avant free",
    ],

    tips: [
      "Utilise gettimeofday pour avoir des timestamps en millisecondes",
      "Crée un thread moniteur séparé qui vérifie régulièrement si un philo est mort",
      "Décale le démarrage des philosophes pairs pour éviter le deadlock",
      "Teste avec : ./philo 5 800 200 200 (ne doit jamais mourir)",
      "Teste avec : ./philo 4 410 200 200 (le premier doit mourir vers 410ms)",
      "Valgrind avec --tool=helgrind détecte les data races",
    ],
  },
];

// ============================================================
// MINISHELL — Rang 3
// ============================================================
const minishellLessons: Lesson[] = [
  {
    id: "mini-01",
    title: "Architecture et parsing",
    emoji: "🐚",
    duration: "45 min",
    difficulty: "Avancé",
    theory: `## Qu'est-ce que minishell ?

minishell est l'un des projets les plus ambitieux du cursus 42. Tu recodes un **shell Bash minimal** capable d'exécuter des commandes, des pipes, des redirections, et des variables d'environnement.

### Ce que minishell doit faire

- Afficher un prompt et lire les entrées utilisateur
- Trouver et lancer des exécutables (PATH, chemin relatif/absolu)
- Gérer les redirections : > >> < <<
- Gérer les pipes : cmd1 | cmd2 | cmd3
- Gérer les variables d'environnement : $HOME, $PATH, $?
- Gérer les quotes : simple ' et double "
- Implémenter les builtins : echo, cd, pwd, export, unset, env, exit

### Architecture en 3 phases

\`\`\`
Entrée utilisateur
       ↓
   [LEXER]        → Tokenisation : "ls -la | grep foo" → [ls][-la][|][grep][foo]
       ↓
   [PARSER]       → Arbre de commandes avec redirections et pipes
       ↓
   [EXECUTOR]     → fork() + execve() pour chaque commande
\`\`\`

### Fonctions autorisées

readline, rl_*, add_history, printf, malloc, free, write, access, open, read, close, fork, wait, waitpid, wait3, wait4, signal, sigaction, sigemptyset, sigaddset, kill, exit, getcwd, chdir, stat, lstat, fstat, unlink, execve, dup, dup2, pipe, opendir, readdir, closedir, strerror, perror, isatty, ttyname, ttyslot, ioctl, getenv, tcsetattr, tcgetattr, tgetent, tgetflag, tgetnum, tgetstr, tgoto, tputs`,

    howToRead: `minishell est un projet de groupe (2 personnes). Divisez le travail : un fait le parsing, l'autre l'exécution. Lisez le sujet bash_reference pour comprendre exactement ce que bash fait dans chaque cas. Testez chaque fonctionnalité de bash et reproduisez-la.`,

    examples: [
      {
        title: "Lexer — tokenisation de la ligne",
        description: "Découper la ligne en tokens tout en gérant les quotes.",
        code: `typedef enum e_token_type
{
    TOK_WORD,      // mot ordinaire / commande
    TOK_PIPE,      // |
    TOK_REDIR_IN,  // <
    TOK_REDIR_OUT, // >
    TOK_APPEND,    // >>
    TOK_HEREDOC,   // <<
}   t_token_type;

typedef struct s_token
{
    t_token_type     type;
    char             *value;
    struct s_token   *next;
}   t_token;

t_token  *lexer(char *line)
{
    t_token  *tokens;
    int      i;

    tokens = NULL;
    i = 0;
    while (line[i])
    {
        skip_spaces(line, &i);
        if (!line[i])
            break ;
        if (line[i] == '|')
            add_token(&tokens, TOK_PIPE, "|", 1), i++;
        else if (line[i] == '>' && line[i+1] == '>')
            add_token(&tokens, TOK_APPEND, ">>", 2), i += 2;
        else if (line[i] == '>')
            add_token(&tokens, TOK_REDIR_OUT, ">", 1), i++;
        else if (line[i] == '<' && line[i+1] == '<')
            add_token(&tokens, TOK_HEREDOC, "<<", 2), i += 2;
        else if (line[i] == '<')
            add_token(&tokens, TOK_REDIR_IN, "<", 1), i++;
        else
            add_word_token(&tokens, line, &i);
    }
    return (tokens);
}`,
        output: `lexer("ls -la | grep foo > out.txt")
→ [WORD:"ls"][WORD:"-la"][PIPE][WORD:"grep"][WORD:"foo"][REDIR_OUT][WORD:"out.txt"]`,
        explanation: `Le lexer transforme la chaîne brute en liste de tokens. Il doit gérer les quotes : dans 'echo "hello world"', "hello world" est UN SEUL token de type WORD. Les quotes simples désactivent toute expansion, les doubles permettent $VAR.`,
      },
      {
        title: "Exécution avec fork et execve",
        description: "Créer un processus enfant et exécuter une commande.",
        code: `void  execute_command(t_cmd *cmd, char **envp)
{
    pid_t  pid;
    int    status;
    char   *path;

    // Vérifier si c'est un builtin
    if (is_builtin(cmd->args[0]))
    {
        execute_builtin(cmd);
        return ;
    }

    // Trouver le chemin de la commande dans PATH
    path = find_in_path(cmd->args[0], envp);
    if (!path)
    {
        ft_putstr_fd(cmd->args[0], 2);
        ft_putendl_fd(": command not found", 2);
        g_exit_status = 127;
        return ;
    }

    pid = fork();
    if (pid < 0)
    {
        perror("fork");
        return ;
    }
    if (pid == 0)
    {
        // Processus enfant
        setup_redirections(cmd);
        execve(path, cmd->args, envp);
        perror(cmd->args[0]);   // execve retourne seulement en cas d'erreur
        exit(126);
    }
    // Processus parent : attendre l'enfant
    waitpid(pid, &status, 0);
    if (WIFEXITED(status))
        g_exit_status = WEXITSTATUS(status);
    free(path);
}`,
        output: `// Commande : ls -la
// fork() → pid=1234 (enfant)
// Enfant : execve("/bin/ls", ["ls", "-la", NULL], envp)
// Parent : waitpid(1234, ...)`,
        explanation: `fork() crée une copie du processus. L'enfant exécute execve() qui remplace son code par le programme demandé. Le parent attend avec waitpid(). WEXITSTATUS(status) donne le code de retour de l'enfant, stocké dans $?.`,
      },
      {
        title: "Pipes — connecter plusieurs commandes",
        description: "Implémenter cmd1 | cmd2 avec pipe() et dup2().",
        code: `void  execute_pipe(t_cmd *cmd1, t_cmd *cmd2, char **envp)
{
    int    pipefd[2];
    pid_t  pid1, pid2;

    if (pipe(pipefd) < 0)
    {
        perror("pipe");
        return ;
    }

    // Premier processus : écrit dans le pipe
    pid1 = fork();
    if (pid1 == 0)
    {
        close(pipefd[0]);              // fermer lecture
        dup2(pipefd[1], STDOUT_FILENO); // stdout → écriture pipe
        close(pipefd[1]);
        exec_single(cmd1, envp);
        exit(1);
    }

    // Deuxième processus : lit depuis le pipe
    pid2 = fork();
    if (pid2 == 0)
    {
        close(pipefd[1]);              // fermer écriture
        dup2(pipefd[0], STDIN_FILENO); // stdin ← lecture pipe
        close(pipefd[0]);
        exec_single(cmd2, envp);
        exit(1);
    }

    // Parent : fermer les deux extrémités et attendre
    close(pipefd[0]);
    close(pipefd[1]);
    waitpid(pid1, NULL, 0);
    waitpid(pid2, NULL, 0);
}`,
        output: `// ls | grep .c
// pipe() crée [read_fd, write_fd]
// ls écrit sur write_fd (son stdout)
// grep lit depuis read_fd (son stdin)
// résultat : grep filtre la sortie de ls`,
        explanation: `pipe() crée deux fd : pipefd[0] pour lire, pipefd[1] pour écrire. dup2(pipefd[1], 1) remplace stdout par l'écriture du pipe. L'important : fermer les fd inutilisés dans chaque processus — sinon le reader ne voit jamais EOF.`,
      },
    ],

    exercises: [
      {
        id: "mini-ex01",
        type: "mcq",
        question: "Quelle est la différence entre $VAR en double et simple quote ?",
        options: [
          "Double quote : $VAR est expansé. Simple quote : $VAR est littéral",
          "Simple quote : $VAR est expansé. Double quote : $VAR est littéral",
          "Les deux expansent $VAR",
          "Aucune différence",
        ],
        answer: "Double quote : $VAR est expansé. Simple quote : $VAR est littéral",
        explanation: "echo \"$HOME\" affiche /home/user (expansion). echo '$HOME' affiche $HOME (littéral). C'est une règle fondamentale du shell que minishell doit reproduire exactement.",
      },
      {
        id: "mini-ex02",
        type: "mcq",
        question: "Après 'ls nonexistent | echo hello', quelle est la valeur de $? ?",
        options: ["0 (echo réussit)", "1 (ls échoue)", "127", "2"],
        answer: "0 (echo réussit)",
        explanation: "Dans un pipeline, le code de retour est celui de la DERNIÈRE commande. echo hello réussit toujours, donc $? = 0. La commande ls nonexistent échoue mais son code de retour est ignoré.",
      },
      {
        id: "mini-ex03",
        type: "mcq",
        question: "Pourquoi faut-il fermer les fd du pipe dans le processus parent ?",
        options: [
          "Pour que le processus lecteur reçoive EOF quand l'écrivain termine",
          "Pour libérer la mémoire",
          "C'est une règle de la norme 42",
          "Pour éviter les deadlocks",
        ],
        answer: "Pour que le processus lecteur reçoive EOF quand l'écrivain termine",
        explanation: "Si le parent garde le fd d'écriture ouvert, le lecteur attend indéfiniment (il y a encore quelqu'un qui pourrait écrire). Fermer tous les fd inutilisés permet au lecteur de voir EOF quand l'écrivain ferme sa copie.",
      },
    ],

    traps: [
      "Heredoc (<<) : lire dans un pipe temporaire, pas dans un fichier",
      "Ctrl-C, Ctrl-D, Ctrl-\\ : chaque signal a un comportement spécifique en shell",
      "Les builtins (cd, export...) doivent s'exécuter dans le processus parent (pas fork)",
      "Ne pas oublier de libérer la mémoire readline avec free(line)",
      "Les quotes imbriquées : echo \"c'est 'cool'\" — les simples dans les doubles sont littérales",
      "Une seule variable globale autorisée (pour le signal)",
    ],

    tips: [
      "Divisez clairement le travail : parsing (lexer+parser) et exécution",
      "Testez chaque fonctionnalité dans bash d'abord, puis reproduisez-la exactement",
      "Utilisez add_history() pour ajouter chaque commande à l'historique readline",
      "Commencez par les commandes simples (sans pipe ni redirection) avant les cas complexes",
      "Un Makefile propre avec -Wall -Wextra -Werror est obligatoire",
    ],
  },
];

// ============================================================
// EXPORT FINAL
// ============================================================
export const studentModules: StudentModule[] = [
  {
    id: "libft",
    title: "Libft",
    subtitle: "Ta bibliothèque personnelle en C",
    icon: "Package",
    rank: 0,
    xp: 462,
    duration: "1-2 semaines",
    difficulty: "Débutant",
    skills: ["Pointeurs", "Gestion mémoire", "Listes chaînées", "Makefile"],
    description: "Le fondement de tous tes projets 42. Tu recodes les fonctions standard de la libc (strlen, memset, split...) et les utilises dans tous les projets suivants. Maîtriser Libft = maîtriser les bases du C.",
    lessons: libftLessons,
    subjectGuide: "Lis les man pages de chaque fonction avant de la recoder. Utilise un testeur externe comme libft-unit-test pour valider. La norme (Norminette) est obligatoire.",
    color: "#4fc3f7",
  },
  {
    id: "ft_printf",
    title: "ft_printf",
    subtitle: "Recoder printf avec les variadiques",
    icon: "FileText",
    rank: 1,
    xp: 420,
    duration: "3-5 jours",
    difficulty: "Intermédiaire",
    skills: ["Arguments variadiques", "Parsing", "Conversions de types"],
    description: "Tu recodes la célèbre fonction printf. L'apprentissage clé : les fonctions à nombre variable d'arguments (va_list, va_start, va_arg). Une fois faite, ft_printf remplacera printf dans tous tes projets.",
    lessons: ftprintfLessons,
    subjectGuide: "Le sujet impose une archive libftprintf.a. Implémente les 7 conversions obligatoires avant de penser aux flags bonus. Vérifie que ta ft_printf retourne le bon nombre de caractères affichés.",
    color: "#81c784",
  },
  {
    id: "get_next_line",
    title: "get_next_line",
    subtitle: "Lire un fichier ligne par ligne",
    icon: "FileCode",
    rank: 1,
    xp: 420,
    duration: "3-5 jours",
    difficulty: "Intermédiaire",
    skills: ["Variables statiques", "Descripteurs de fichier", "Gestion mémoire"],
    description: "La fonction get_next_line retourne une ligne depuis un fd à chaque appel. Le défi : mémoriser ce qui a été lu mais pas encore retourné entre les appels, grâce aux variables statiques.",
    lessons: gnlLessons,
    subjectGuide: "BUFFER_SIZE est défini à la compilation. Ta GNL doit fonctionner avec BUFFER_SIZE=1 comme avec BUFFER_SIZE=1000000. Le bonus gère plusieurs fd simultanément.",
    color: "#ffb74d",
  },
  {
    id: "push_swap",
    title: "push_swap",
    subtitle: "Algorithme de tri avec deux piles",
    icon: "ArrowUpDown",
    rank: 2,
    xp: 420,
    duration: "1 semaine",
    difficulty: "Avancé",
    skills: ["Algorithmie", "Structures de données", "Optimisation"],
    description: "Trier une pile de nombres en utilisant 11 opérations sur deux piles (A et B). Le défi est de minimiser le nombre d'opérations. Algorithmes recommandés : radix sort, tri turc.",
    lessons: pushswapLessons,
    subjectGuide: "Le programme push_swap doit afficher les opérations sur stdout. Le checker (bonus) vérifie si le résultat est correct. Commence par coder les cas 2 et 3 nombres parfaitement.",
    color: "#f06292",
  },
  {
    id: "philosophers",
    title: "Philosophers",
    subtitle: "Threads, mutexes et synchronisation",
    icon: "Users",
    rank: 3,
    xp: 420,
    duration: "1-2 semaines",
    difficulty: "Avancé",
    skills: ["Threads POSIX", "Mutexes", "Synchronisation", "Concurrence"],
    description: "Le problème classique des philosophes dînants. Des threads partagent des fourchettes (ressources partagées). Tu dois éviter les deadlocks et les data races tout en détectant correctement la mort d'un philosophe.",
    lessons: philoLessons,
    subjectGuide: "Pas de variables globales. Chaque philosophe est un thread. Les fourchettes sont des mutexes. Teste impérativement avec helgrind pour détecter les data races.",
    color: "#ce93d8",
  },
  {
    id: "minishell",
    title: "minishell",
    subtitle: "Ton propre shell Bash",
    icon: "Terminal",
    rank: 3,
    xp: 420,
    duration: "3-5 semaines",
    difficulty: "Avancé",
    skills: ["Parsing", "Processus", "Pipes", "Signaux", "Variables env"],
    description: "Le plus grand projet solo/binôme du rang 3. Tu codes un shell Bash minimal complet : prompt, pipes, redirections, variables, builtins (echo, cd, export...). Projet idéalement fait à deux.",
    lessons: minishellLessons,
    subjectGuide: "Divisez le travail en parsing et exécution. Testez chaque feature dans bash avant de l'implémenter. La gestion des signaux (Ctrl-C, Ctrl-D) est critique et souvent mal gérée.",
    color: "#80cbc4",
  },
];
