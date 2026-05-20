// ============================================================
// PISCINE 1337 — COURS COMPLET
// Données complètes avec explications profondes
// ============================================================
import { modulesSolutions } from "./solutionsData";
import { bonusExercises } from "./exercisesData";

export interface Term {
  word: string;
  short: string;
  full: string;
  example?: string;
}

export interface CodeExample {
  title: string;
  description: string;
  code: string;
  output?: string;
  highlight?: string; // ligne à expliquer
  explanation?: string; // explication approfondie
}

export interface Exercise {
  id: string;
  type: "mcq" | "fill" | "output" | "order";
  question: string;
  context?: string; // code affiché avant la question
  options?: string[];
  answer: string | string[];
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  emoji: string;
  duration: string; // "15 min"
  difficulty: "Débutant" | "Intermédiaire" | "Avancé";
  theory: string; // markdown-like explanation
  howToRead: string; // how to read the subject PDF
  examples: CodeExample[];
  exercises: Exercise[];
  traps: string[]; // common mistakes
  tips: string[];
}

export interface Module {
  id: string;
  title: string;
  subtitle: string;
  emoji: string;
  tag: "Shell" | "C" | "Rush";
  description: string;
  lessons: Lesson[];
  subjectGuide: string; // how to read this subject
}

// ============================================================
// GLOSSAIRE COMPLET
// ============================================================
export const glossary: Term[] = [
  {
    word: "SSH",
    short: "Secure Shell",
    full: "SSH (Secure Shell) est un protocole réseau cryptographique qui permet de se connecter à distance à une autre machine de façon sécurisée. C'est comme un tunnel chiffré entre toi et le serveur. Avant SSH, on utilisait Telnet où tout passait en clair (mots de passe visibles sur le réseau !). SSH utilise des clés asymétriques : une clé publique (partageable) et une clé privée (secrète). Le serveur connaît ta clé publique, toi tu gardes ta clé privée. Pour se connecter : ssh user@ip_du_serveur.",
    example: "ssh nlogin@login.42.fr -p 4242"
  },
  {
    word: "Protocole",
    short: "Ensemble de règles de communication",
    full: "Un protocole est un ensemble de règles définissant comment deux entités communiquent. Comme un langage commun. SSH est un protocole, HTTP est un protocole, TCP/IP est un protocole. Sans protocole, une machine ne saurait pas comment interpréter ce que l'autre lui envoie.",
    example: "HTTP, HTTPS, FTP, SSH, TCP, UDP sont tous des protocoles"
  },
  {
    word: "Shell",
    short: "Interface en ligne de commande",
    full: "Le shell est le programme qui lit tes commandes et les exécute. C'est l'intermédiaire entre toi et le noyau (kernel) du système d'exploitation. Bash, Zsh, Fish, Sh sont des shells. Quand tu tapes 'ls', c'est le shell qui interprète la commande, trouve le programme /bin/ls, et l'exécute.",
    example: "bash, zsh, sh, fish, csh sont des shells différents"
  },
  {
    word: "stdin / stdout / stderr",
    short: "Entrée / sortie / erreur standard",
    full: "Chaque programme a 3 flux de données : stdin (fd=0) est l'entrée — par défaut le clavier. stdout (fd=1) est la sortie — par défaut l'écran. stderr (fd=2) est la sortie d'erreur — aussi l'écran mais séparé de stdout. Tu peux rediriger ces flux : 'cmd > fichier' redirige stdout vers un fichier. 'cmd 2>/dev/null' supprime les erreurs.",
    example: "echo 'bonjour' > fichier.txt  // stdout redirigé vers fichier"
  },
  {
    word: "fd (File Descriptor)",
    short: "Descripteur de fichier — identifiant numérique d'un fichier ouvert",
    full: "Quand un programme ouvre un fichier, le système lui donne un entier appelé file descriptor. 0=stdin, 1=stdout, 2=stderr sont toujours présents. Les suivants (3, 4, 5...) sont attribués lors des open(). write() prend un fd comme premier argument — write(1, ...) écrit sur stdout.",
    example: "write(1, 'hello', 5);  // fd=1 => stdout"
  },
  {
    word: "malloc",
    short: "Memory ALLOCation — alloue de la mémoire dynamique",
    full: "malloc() est une fonction C qui réserve un bloc de mémoire de la taille demandée sur le tas (heap). Elle retourne un pointeur vers ce bloc, ou NULL si l'allocation échoue. La mémoire allouée avec malloc n'est PAS initialisée (peut contenir n'importe quoi). Tu dois TOUJOURS libérer cette mémoire avec free() quand tu n'en as plus besoin.",
    example: "char *str = malloc(10);  // réserve 10 octets\nif (!str) return NULL;  // TOUJOURS vérifier"
  },
  {
    word: "free",
    short: "Libère la mémoire allouée avec malloc",
    full: "free() libère le bloc de mémoire pointé par le pointeur passé. Après free(), le pointeur pointe vers une zone mémoire invalide (dangling pointer). Ne jamais utiliser un pointeur après free(). Ne jamais faire free() deux fois sur le même pointeur (double free = crash). Ne jamais free() un pointeur non-malloc (undefined behavior).",
    example: "free(ptr);  // libère\nptr = NULL;  // bonne pratique : mettre à NULL après"
  },
  {
    word: "Pointeur",
    short: "Variable qui stocke une adresse mémoire",
    full: "Un pointeur est une variable dont la valeur est une adresse mémoire. int *p signifie 'p est un pointeur vers un int'. &x donne l'adresse de x. *p déréférence p (donne la valeur à l'adresse stockée dans p). Les pointeurs permettent de modifier des variables dans des fonctions, de travailler avec des tableaux, et d'allouer de la mémoire dynamique.",
    example: "int x = 42;\nint *p = &x;  // p contient l'adresse de x\n*p = 100;    // modifie x via le pointeur"
  },
  {
    word: "ASCII",
    short: "American Standard Code for Information Interchange",
    full: "ASCII est un standard qui assigne un nombre entier à chaque caractère. 'A'=65, 'a'=97, '0'=48, ' '=32, '\\n'=10. En C, les char SONT des entiers. 'A' + 32 = 'a' (majuscule vers minuscule). '5' - '0' = 5 (chiffre ASCII vers entier). La table ASCII de base va de 0 à 127.",
    example: "'A'=65  'Z'=90  'a'=97  'z'=122  '0'=48  '9'=57"
  },
  {
    word: "Compilation",
    short: "Transformation du code source en programme exécutable",
    full: "La compilation transforme ton code C (texte lisible) en code machine (binaire exécutable). Avec GCC : gcc fichier.c -o programme. Les étapes sont : 1) Préprocesseur (traite les #include, #define), 2) Compilation (C → assembleur), 3) Assemblage (assembleur → code objet .o), 4) Édition de liens (combine les .o et les bibliothèques).",
    example: "gcc -Wall -Wextra -Werror mon_fichier.c -o mon_programme"
  },
  {
    word: "Makefile",
    short: "Fichier de règles pour automatiser la compilation",
    full: "Un Makefile définit des règles pour automatiser la compilation et d'autres tâches. La commande 'make' lit le Makefile et exécute les règles. Format : cible: dépendances (puis tabulation) commande. Les règles classiques : all (compile tout), clean (supprime les .o), fclean (supprime tout), re (fclean + all).",
    example: "all: gcc main.c -o prog  # make all compile"
  },
  {
    word: "Git",
    short: "Système de contrôle de version distribué",
    full: "Git est un système qui enregistre l'historique des modifications de tes fichiers. git init crée un dépôt. git add ajoute des fichiers à l'index (staging). git commit enregistre un snapshot. git push envoie vers un serveur distant. git pull récupère les modifications distantes. À la piscine, tu dois push tes exercices sur le serveur gitea de l'école.",
    example: "git add ft_putchar.c && git commit -m 'ex00' && git push"
  },
  {
    word: "Norminette",
    short: "Outil de vérification du style de code de 42",
    full: "La Norminette est l'outil de 42 qui vérifie que ton code respecte les règles de la norme 42. Règles importantes : max 25 lignes par fonction, max 80 colonnes par ligne, pas plus de 5 fonctions par fichier, tabulations obligatoires pour l'indentation, noms de variables en snake_case, etc. Un code qui ne passe pas la norminette = note 0.",
    example: "norminette ft_putchar.c  // vérifie la norme"
  },
  {
    word: "Undefined Behavior (UB)",
    short: "Comportement indéfini en C — à éviter absolument",
    full: "En C, certaines opérations ont un comportement non défini par le standard. Cela signifie que le programme peut faire n'importe quoi : crasher, donner le bon résultat, corrompre la mémoire silencieusement, ou se comporter différemment selon la machine ou le compilateur. Exemples : déréférencer NULL, débordement d'entier signé, accéder hors des bornes d'un tableau.",
    example: "int *p = NULL;\n*p = 5;  // CRASH (ou pire) — UB !"
  },
  {
    word: "Segmentation Fault",
    short: "Crash : accès mémoire interdit",
    full: "Un segfault (SIGSEGV) survient quand ton programme tente d'accéder à une zone mémoire qui ne lui appartient pas. Causes communes : déréférencer NULL, accéder hors des bornes d'un tableau, utiliser un pointeur non initialisé, utiliser de la mémoire après free(). Le système d'exploitation tue immédiatement le processus.",
    example: "int arr[5];\narr[10] = 0;  // Segfault probable"
  },
  {
    word: "Stack (pile)",
    short: "Zone mémoire pour les variables locales et les appels de fonctions",
    full: "La stack (pile) est une zone mémoire gérée automatiquement. Les variables locales y sont stockées. Quand une fonction est appelée, un 'stack frame' est créé. Quand la fonction retourne, le frame est détruit. La stack a une taille limitée (généralement 8 Mo). Récursion profonde → stack overflow.",
    example: "void f() {\n  int x = 5;  // x est sur la stack\n}  // x est détruit ici"
  },
  {
    word: "Heap (tas)",
    short: "Zone mémoire pour l'allocation dynamique (malloc)",
    full: "Le heap est une zone mémoire que tu gères toi-même via malloc/free. Contrairement à la stack, la mémoire sur le heap persiste jusqu'à ce que tu la libères. Si tu oublies de libérer → memory leak. Le heap est beaucoup plus grand que la stack.",
    example: "int *p = malloc(4);  // p pointe sur le heap\nfree(p);             // libère manuellement"
  },
  {
    word: "Permissions Unix",
    short: "Droits d'accès aux fichiers : lecture, écriture, exécution",
    full: "Chaque fichier Unix a des permissions pour 3 groupes : owner (propriétaire), group (groupe), others (autres). 3 types de droits : r (read=4), w (write=2), x (execute=1). chmod 755 signifie : owner=7(rwx), group=5(r-x), others=5(r-x). ls -l affiche les permissions sous forme rwxrwxrwx.",
    example: "chmod 755 script.sh  // rend le script exécutable"
  },
  {
    word: "Pipe ( | )",
    short: "Connecte la sortie d'une commande à l'entrée d'une autre",
    full: "Le pipe | prend le stdout d'une commande et le connecte au stdin de la commande suivante. C'est la philosophie Unix : des petits programmes qui font une chose bien, chainés ensemble. ls | grep .c | wc -l : liste les fichiers, filtre ceux qui contiennent .c, compte les lignes.",
    example: "ls -la | grep '.c' | wc -l"
  },
  {
    word: "Redirection",
    short: "Redirige les flux stdin/stdout/stderr",
    full: "> redirige stdout vers un fichier (écrase). >> ajoute à la fin. < lit depuis un fichier vers stdin. 2> redirige stderr. 2>&1 fusionne stderr avec stdout. /dev/null est un 'trou noir' — tout ce qu'on y écrit est ignoré.",
    example: "cmd > out.txt 2>&1   // stdout + stderr dans fichier"
  },
  {
    word: "Récursion",
    short: "Fonction qui s'appelle elle-même",
    full: "Une fonction récursive s'appelle elle-même pour résoudre un problème en le décomposant en sous-problèmes plus petits. Elle DOIT avoir un cas de base (condition d'arrêt) pour ne pas boucler infiniment. Chaque appel crée un nouveau stack frame. Trop d'appels → stack overflow.",
    example: "int fact(int n) {\n  if (n <= 1) return 1;  // cas de base !\n  return n * fact(n-1);  // appel récursif\n}"
  },
  {
    word: "NULL",
    short: "Pointeur nul — ne pointe nulle part",
    full: "NULL est un pointeur qui ne pointe vers rien (vaut 0). Il est utilisé pour indiquer l'absence de valeur, la fin d'une chaîne (\\0), ou une erreur (malloc retourne NULL si échec). Déréférencer NULL est un comportement indéfini qui cause généralement un segfault.",
    example: "char *p = NULL;\nif (p == NULL) { /* pas de mémoire */ }"
  },
  {
    word: "\\0 (null byte)",
    short: "Caractère de fin de chaîne en C",
    full: "En C, les chaînes de caractères (strings) sont des tableaux de char terminés par le caractère \\0 (ASCII 0). strlen() compte les chars jusqu'à \\0 (non inclus). Si tu oublies \\0, les fonctions de string liront en dehors du tableau jusqu'à trouver un 0 en mémoire → undefined behavior.",
    example: "char s[6] = \"hello\";\n// s = ['h','e','l','l','o','\\0']"
  },
  {
    word: "Flag de compilation",
    short: "Options passées au compilateur",
    full: "-Wall active tous les warnings importants. -Wextra active des warnings supplémentaires. -Werror transforme les warnings en erreurs (le code doit compiler sans warning). À la piscine, ces 3 flags sont obligatoires. -g ajoute les infos de debug. -fsanitize=address détecte les erreurs mémoire.",
    example: "gcc -Wall -Wextra -Werror mon_code.c -o prog"
  },
  {
    word: "Backtracking",
    short: "Algorithme d'exploration exhaustive avec retour arrière",
    full: "Le backtracking est une technique algorithmique qui explore toutes les solutions possibles. On avance dans une solution candidate, et si on atteint une impasse, on 'revient en arrière' (backtrack) pour essayer une autre option. Utilisé pour les puzzles, le Rush 01 (skycraper), les jeux de placement.",
    example: "Placer une reine → si conflit → retirer → essayer position suivante"
  },
  {
    word: "write()",
    short: "Appel système pour écrire sur un fd",
    full: "write(fd, buf, count) écrit count octets depuis buf vers le file descriptor fd. Retourne le nombre d'octets écrits, ou -1 en cas d'erreur. C'est la seule fonction autorisée pour écrire à la piscine dans beaucoup d'exercices. write(1, ...) = stdout. La fonction putchar de la libc utilise write() en interne.",
    example: "write(1, \"hello\\n\", 6);  // écrit sur stdout"
  },
  {
    word: "Prototype de fonction",
    short: "Déclaration de fonction sans le corps",
    full: "Un prototype déclare une fonction au compilateur avant sa définition complète. Format : type_retour nom_fonction(type param1, type param2);. Les prototypes vont dans les fichiers .h (headers). Ils permettent d'appeler une fonction définie dans un autre fichier .c.",
    example: "int\tft_strlen(char *s);  // prototype dans .h"
  },
  {
    word: "Header (.h)",
    short: "Fichier d'en-tête C avec déclarations et prototypes",
    full: "Un fichier .h contient les prototypes de fonctions, les définitions de types (typedef, struct), et les macros (#define). On l'inclut avec #include 'fichier.h'. Les garde-fous (#ifndef FOO_H / #define FOO_H / #endif) évitent les inclusions multiples.",
    example: "#ifndef FT_PRINTF_H\n#define FT_PRINTF_H\nint ft_printf(...);\n#endif"
  }
];

// ============================================================
// MODULE SHELL 00
// ============================================================
const shell00: Module = {
  id: "shell00",
  title: "Shell 00",
  subtitle: "Unix, terminal, permissions & git",
  emoji: "🐚",
  tag: "Shell",
  description: "Découverte du terminal Unix. Naviguer dans l'arborescence, comprendre les permissions, utiliser git pour versionner son travail.",
  subjectGuide: `## Comment lire le sujet Shell 00

**Structure typique d'un exercice Shell :**
- **Numéro** (ex: ex00, ex01) → le dossier où déposer ton fichier
- **Fichier attendu** → exactement ce nom, rien d'autre
- **Contenu attendu** → ce que le fichier doit faire/contenir

**Attention aux pièges de lecture :**
1. Les exercices Shell sont souvent des fichiers à rendre (pas des programmes C)
2. Certains exercices demandent un script shell (commence par #!/bin/bash)
3. D'autres demandent juste un fichier texte avec une réponse
4. Lis bien "Allowed functions" — parfois aucune n'est autorisée (juste un fichier)

**Méthode :**
1. Lis d'abord TOUT le sujet une fois sans rien faire
2. Note sur papier : nom du fichier à rendre + ce qu'il doit contenir
3. Teste avec \`cat\` ou \`bash\` selon le type de fichier`,
  lessons: [
    {
      id: "shell00-navigation",
      title: "Navigation et commandes de base",
      emoji: "🗂️",
      duration: "20 min",
      difficulty: "Débutant",
      theory: `## Le terminal : ton nouvel outil principal

Oublie le clic-droit. Au terminal, tout se fait avec du texte. C'est plus puissant, plus rapide, et c'est ce que les vrais développeurs utilisent.

### Pourquoi le terminal ?
Le terminal (ou "shell") te donne un **contrôle total** sur le système. Avec des commandes tu peux :
- Créer/supprimer des milliers de fichiers en une ligne
- Lancer des programmes complexes
- Automatiser des tâches répétitives
- Travailler sur des serveurs distants sans interface graphique

### L'invite de commande (prompt)
Quand tu ouvres un terminal tu vois quelque chose comme :
\`\`\`
nlogin@machine:~$
\`\`\`
- \`nlogin\` = ton nom d'utilisateur
- \`machine\` = nom de l'ordinateur
- \`~\` = répertoire courant (~ = ton dossier personnel /home/nlogin)
- \`$\` = tu es un utilisateur normal (# = tu es root/admin)

### L'arborescence Unix
Unix organise tout dans une arborescence qui part de \`/\` (la "racine") :
\`\`\`
/
├── bin/      → programmes de base (ls, cp, mv...)
├── home/     → dossiers personnels des utilisateurs
│   └── nlogin/  → TON dossier (alias ~)
├── etc/      → fichiers de configuration
├── tmp/      → fichiers temporaires (effacés au reboot)
└── usr/      → programmes installés par l'utilisateur
\`\`\`

### Chemins absolus vs relatifs
- **Absolu** : commence par / → /home/nlogin/piscine/c00
- **Relatif** : part du répertoire courant → piscine/c00 (si tu es dans /home/nlogin)
- \`.\` = répertoire courant
- \`..\` = répertoire parent

### Les commandes essentielles
\`pwd\` = Print Working Directory — où suis-je ?
\`ls\` = LiSt — liste les fichiers
\`cd\` = Change Directory — changer de dossier
\`mkdir\` = MaKe DIRectory — créer un dossier
\`rm\` = ReMove — supprimer (⚠️ pas de corbeille !)
\`cp\` = CoPy — copier
\`mv\` = MoVe — déplacer ou renommer
\`cat\` = conCATenate — afficher le contenu d'un fichier
\`man\` = MANual — affiche la documentation d'une commande`,
      howToRead: `Pour cet exercice, le sujet te demande souvent de créer un fichier avec exactement un certain contenu.
Lis attentivement : "Turn in file" te dit le NOM du fichier. "Expected output" ou la description te dit le CONTENU.
Ne mets rien de plus que ce qui est demandé dans le fichier.`,
      examples: [
        {
          title: "Navigation basique",
          description: "Les commandes les plus utilisées au quotidien",
          code: `# Où suis-je ?
pwd
# /home/nlogin

# Lister les fichiers (l=détails, a=cachés, h=taille lisible)
ls -lah

# Aller dans un dossier
cd piscine/c00

# Retourner dans le dossier parent
cd ..

# Retourner directement dans ton home
cd ~
# ou simplement :
cd

# Créer des dossiers
mkdir ex00
mkdir -p piscine/c00/ex00   # -p crée les parents si besoin

# Créer un fichier vide
touch fichier.c

# Afficher le contenu d'un fichier
cat fichier.c

# Afficher avec numéros de ligne
cat -n fichier.c`,
          output: `/home/nlogin/piscine/c00`,
          explanation: "La commande pwd retourne toujours le chemin absolu. Très utile quand on est perdu dans l'arborescence."
        },
        {
          title: "Manipulation de fichiers",
          description: "Copier, déplacer, supprimer",
          code: `# Copier un fichier
cp source.c destination.c

# Copier un dossier entier (-r = récursif)
cp -r dossier1/ dossier2/

# Déplacer (ou renommer) un fichier
mv ancien_nom.c nouveau_nom.c

# Supprimer un fichier (SANS confirmation !)
rm fichier.c

# Supprimer un dossier et tout son contenu
rm -rf dossier/
# ATTENTION : rm -rf est IRREVERSIBLE
# rm -rf / detruirait tout le système !

# Afficher les dernières lignes d'un fichier
tail -5 fichier.log

# Chercher un fichier par nom
find . -name "*.c"

# Chercher du texte dans des fichiers
grep "ft_putchar" *.c`,
          output: `# Aucune sortie = succès pour cp, mv, rm`,
          explanation: "En Unix : pas de sortie = succès. Seulement les erreurs s'affichent."
        },
        {
          title: "Comprendre ls -la",
          description: "Décortiquer la sortie de ls -la",
          code: `ls -la
# total 32
# drwxr-xr-x  5 nlogin staff  160 Jan 15 10:23 .
# drwxr-xr-x 12 nlogin staff  384 Jan 15 09:00 ..
# -rw-r--r--  1 nlogin staff  142 Jan 15 10:23 ft_putchar.c
# -rwxr-xr-x  1 nlogin staff 8432 Jan 15 10:24 a.out

# Décortiquons "-rwxr-xr-x" :
# - = fichier normal (d=dossier, l=lien symbolique)
# rwx = owner peut lire(r) écrire(w) exécuter(x)
# r-x = groupe peut lire et exécuter, PAS écrire
# r-x = autres peuvent lire et exécuter, PAS écrire

# "1" = nombre de liens physiques
# "nlogin" = propriétaire
# "staff" = groupe
# "8432" = taille en octets
# "Jan 15 10:24" = date de dernière modification`,
          explanation: "Comprendre ls -la est fondamental — les permissions Unix déterminent QUI peut faire QUOI avec un fichier."
        }
      ],
      exercises: [
        {
          id: "sh00-e1",
          type: "mcq",
          question: "Quelle commande te dit dans quel dossier tu te trouves actuellement ?",
          options: ["cd", "pwd", "ls", "where"],
          answer: "pwd",
          explanation: "pwd = Print Working Directory. Elle affiche le chemin absolu du répertoire courant."
        },
        {
          id: "sh00-e2",
          type: "mcq",
          question: "Tu veux aller dans /home/nlogin/piscine depuis n'importe où. Quelle commande utilises-tu ?",
          options: ["cd piscine", "cd ~/piscine", "cd /piscine", "goto ~/piscine"],
          answer: "cd ~/piscine",
          explanation: "~ est un alias pour ton répertoire home (/home/nlogin). cd ~/piscine fonctionne depuis n'importe quel répertoire courant."
        },
        {
          id: "sh00-e3",
          type: "output",
          question: "Que fait cette commande : mkdir -p a/b/c",
          options: [
            "Crée seulement le dossier a",
            "Crée les dossiers a, b et c imbriqués même si a n'existe pas",
            "Échoue si a n'existe pas",
            "Crée 3 dossiers séparés a, b et c"
          ],
          answer: "Crée les dossiers a, b et c imbriqués même si a n'existe pas",
          explanation: "-p (parents) crée tous les dossiers intermédiaires nécessaires. Sans -p, mkdir a/b/c échouerait si a n'existe pas."
        },
        {
          id: "sh00-e4",
          type: "fill",
          question: "Complète la commande pour lister TOUS les fichiers (y compris cachés) avec les détails : ls ___ ",
          answer: "-la",
          explanation: "-l = format long (détails), -a = all (inclut les fichiers cachés qui commencent par .)"
        }
      ],
      traps: [
        "rm est PERMANENT — il n'y a pas de corbeille dans le terminal. rm -rf dossier/ supprime tout immédiatement.",
        "Les fichiers cachés commencent par un point (.) — ls ne les montre pas sans le flag -a",
        "Les espaces dans les noms de fichiers sont problématiques — utilise des guillemets : cd 'mon dossier'",
        "cd sans argument va dans ~ (home), pas dans /"
      ],
      tips: [
        "Tab = autocomplétion — commence à taper un nom et appuie sur Tab pour le compléter",
        "Flèches Haut/Bas = naviguer dans l'historique des commandes",
        "Ctrl+C = annuler une commande en cours",
        "Ctrl+L = effacer l'écran (équivalent à la commande clear)"
      ]
    },
    {
      id: "shell00-permissions",
      title: "Permissions Unix & chmod",
      emoji: "🔐",
      duration: "25 min",
      difficulty: "Débutant",
      theory: `## Permissions Unix : qui a le droit de faire quoi ?

### Pourquoi les permissions ?
Unix est un système **multi-utilisateur**. Plusieurs personnes peuvent être connectées en même temps. Les permissions définissent qui peut accéder à quoi. C'est la sécurité de base du système.

### Les 3 types de permissions
- **r** (read = 4) : lire le contenu du fichier / lister le dossier
- **w** (write = 2) : modifier le fichier / créer/supprimer des fichiers dans le dossier
- **x** (execute = 1) : exécuter le fichier si c'est un programme / entrer dans le dossier avec cd

### Les 3 groupes concernés
\`\`\`
-rwxr-xr--
 ^^^         = owner (propriétaire du fichier)
    ^^^      = group (membres du même groupe)
       ^^^   = others (tout le monde d'autre)
\`\`\`

### La notation octale (chiffres)
Chaque groupe de 3 permissions correspond à un chiffre de 0 à 7 :
\`\`\`
r = 4  (100 en binaire)
w = 2  (010 en binaire)
x = 1  (001 en binaire)
\`\`\`
On additionne : rwx = 4+2+1 = 7, r-x = 4+0+1 = 5, r-- = 4+0+0 = 4

**Exemples classiques :**
- \`755\` : rwxr-xr-x → exécutable pour tous, modifiable seulement par le propriétaire
- \`644\` : rw-r--r-- → fichier texte normal, lecture pour tous
- \`777\` : rwxrwxrwx → tout le monde peut tout faire (DANGEREUX)
- \`600\` : rw------- → fichier privé, seulement le propriétaire peut lire/écrire
- \`700\` : rwx------ → script privé

### chmod : changer les permissions
\`\`\`bash
chmod 755 script.sh    # notation octale
chmod +x script.sh     # ajouter le droit d'exécution
chmod -w fichier.txt   # enlever le droit d'écriture
chmod u+x fichier      # u=user/owner, g=group, o=others, a=all
\`\`\``,
      howToRead: `Les exercices de permissions te donnent une description comme "le propriétaire peut tout faire, le groupe peut lire et exécuter, les autres ne peuvent rien".
Traduis ça en nombres : tout faire = 7, lire+exécuter = 5, rien = 0 → chmod 750.`,
      examples: [
        {
          title: "Calculer chmod",
          description: "Comment convertir une description en nombre chmod",
          code: `# Objectif : propriétaire=rwx, groupe=r-x, autres=r--
# owner:  r+w+x = 4+2+1 = 7
# group:  r+x   = 4+0+1 = 5
# others: r     = 4+0+0 = 4
chmod 754 fichier

# Vérifier :
ls -l fichier
# -rwxr-xr-- 1 nlogin staff 0 Jan 15 10:00 fichier

# Autre exemple : script bash classique
chmod 755 script.sh
# -rwxr-xr-x

# Fichier de configuration privé
chmod 600 config.txt
# -rw------- (seulement le proprio peut lire/écrire)`,
          explanation: "La méthode : décompose chaque groupe en r/w/x, assigne 4/2/1 ou 0, additionne. Tu obtiens un chiffre de 0 à 7 pour chaque groupe."
        },
        {
          title: "Permissions et dossiers",
          description: "Les permissions sur les dossiers ont un sens différent",
          code: `# Sur un DOSSIER :
# r = peut faire "ls" (lister le contenu)
# w = peut créer/supprimer des fichiers dedans
# x = peut faire "cd" pour y entrer

# Exemple : dossier accessible en lecture mais pas en entrée
chmod 444 mon_dossier/
cd mon_dossier/   # Permission denied !
ls mon_dossier/   # Fonctionne

# Dossier qu'on peut traverser mais pas lister
chmod 311 mon_dossier/
cd mon_dossier/   # Fonctionne
ls mon_dossier/   # Permission denied !`,
          explanation: "Souvent contre-intuitif : x sur un dossier = droit d'entrer (cd). r = droit de lister (ls)."
        }
      ],
      exercises: [
        {
          id: "sh00-perm1",
          type: "fill",
          question: "Le propriétaire peut tout faire (rwx), le groupe peut lire et écrire (rw-), les autres ne peuvent rien (---). Quel est le chmod ?",
          answer: "760",
          explanation: "owner: 4+2+1=7, group: 4+2+0=6, others: 0. chmod 760"
        },
        {
          id: "sh00-perm2",
          type: "mcq",
          question: "Quelle permission représente '755' ?",
          options: [
            "rwxr-xr-x (owner=tout, group=rx, others=rx)",
            "rwxrwxr-x (owner=tout, group=tout, others=rx)",
            "rwxr--r-- (owner=tout, group=r, others=r)",
            "rwx------ (owner=tout, personne d'autre)"
          ],
          answer: "rwxr-xr-x (owner=tout, group=rx, others=rx)",
          explanation: "7=rwx(4+2+1), 5=r-x(4+0+1), 5=r-x. Résultat : rwxr-xr-x. Permission typique pour un exécutable public."
        },
        {
          id: "sh00-perm3",
          type: "output",
          question: "Que renvoie : ls -l fichier si tu as fait chmod 644 fichier ?",
          options: ["-rw-r--r--", "-rwxr-xr-x", "-rw-rw-rw-", "-r--r--r--"],
          answer: "-rw-r--r--",
          explanation: "6=rw-(4+2+0), 4=r--(4+0+0), 4=r--. Résultat : -rw-r--r--. Permission standard pour un fichier texte."
        }
      ],
      traps: [
        "chmod 777 semble pratique mais c'est une très mauvaise pratique de sécurité",
        "Sans x sur un dossier, tu ne peux pas faire cd même si tu as r",
        "Les permissions s'appliquent aussi au propriétaire — si tu enlèves r sur ton propre fichier, tu ne peux plus le lire"
      ],
      tips: [
        "Pour un script shell : 755 (exécutable pour tout le monde)",
        "Pour un fichier source C : 644 (lecture pour tout le monde, écriture seulement toi)",
        "stat fichier affiche toutes les infos y compris les permissions en octal"
      ]
    },
    {
      id: "shell00-git",
      title: "Git : versionner son code",
      emoji: "📦",
      duration: "30 min",
      difficulty: "Débutant",
      theory: `## Git : pourquoi et comment ?

### Le problème que Git résout
Imagine : tu travailles sur un exercice, ça marchait hier, mais tu as tout cassé aujourd'hui. Sans Git, tu dois tout réécrire. Avec Git, tu peux revenir à la version d'hier en une commande.

Git garde une **photo (commit)** de tous tes fichiers à chaque moment que tu choisis. Tu peux revenir en arrière, voir ce qui a changé, travailler en parallèle sur plusieurs versions.

### À la Piscine 1337
Tu dois rendre tes exercices via Git. Le processus est :
1. Coder ton exercice dans le bon dossier
2. \`git add\` pour dire à Git quels fichiers tu veux sauvegarder
3. \`git commit\` pour créer le snapshot
4. \`git push\` pour envoyer sur le serveur de l'école

**Si tu ne push pas → exercice non rendu → 0**

### Les 3 zones de Git
\`\`\`
Working Directory  →  Staging Area  →  Repository (.git/)
   (tes fichiers)    (git add)         (git commit)
                                            ↓
                                       Serveur distant
                                        (git push)
\`\`\`

### La configuration initiale (une seule fois)
\`\`\`bash
git config --global user.name "Ton Nom"
git config --global user.email "ton@email.com"
\`\`\``,
      howToRead: `Pour les exercices Git de Shell 00, le sujet te dit quoi mettre dans quels fichiers et dans quelle structure de dossiers.
La clé : respecter EXACTEMENT la structure demandée. git add ., puis git commit, puis git push.`,
      examples: [
        {
          title: "Workflow Git complet",
          description: "De zéro à un premier commit",
          code: `# 1. Initialiser un nouveau dépôt
git init
# Initialized empty Git repository in /home/nlogin/piscine/.git/

# 2. Vérifier l'état (quels fichiers sont modifiés ?)
git status
# On branch master
# Untracked files:
#   ft_putchar.c    ← pas encore suivi par git

# 3. Ajouter les fichiers à l'index (staging)
git add ft_putchar.c
# ou ajouter TOUT ce qui est dans le dossier :
git add .

# 4. Créer le commit (le snapshot)
git commit -m "ex00: ft_putchar"
# [master (root-commit) a3f7c2e] ex00: ft_putchar
# 1 file changed, 5 insertions(+)

# 5. Voir l'historique
git log --oneline
# a3f7c2e ex00: ft_putchar`,
          explanation: "Le workflow classique : add → commit → push. git status est ton meilleur ami — il te dit toujours où tu en es."
        },
        {
          title: "Connecter au serveur de l'école",
          description: "Push vers gitea.42.fr",
          code: `# Cloner le dépôt de l'école (première fois)
git clone git@gitea.42.fr:nlogin/piscine.git

# Voir les remotes configurés
git remote -v
# origin  git@gitea.42.fr:nlogin/piscine.git (fetch)
# origin  git@gitea.42.fr:nlogin/piscine.git (push)

# Envoyer tes commits sur le serveur
git push origin master
# (ou juste git push si origin/master est déjà configuré)

# Récupérer les modifications du serveur
git pull

# Voir les différences depuis le dernier commit
git diff

# Annuler les modifications non commitées d'un fichier
git checkout -- fichier.c`,
          explanation: "git clone crée une copie locale du dépôt distant. git push envoie, git pull reçoit."
        }
      ],
      exercises: [
        {
          id: "sh00-git1",
          type: "order",
          question: "Remets dans l'ordre les étapes pour rendre un exercice avec Git :",
          options: ["git push", "Coder l'exercice", "git commit -m 'ex00'", "git add ."],
          answer: ["Coder l'exercice", "git add .", "git commit -m 'ex00'", "git push"],
          explanation: "L'ordre correct : coder → add (staging) → commit (snapshot) → push (serveur). Sans push, l'exercice n'est pas rendu !"
        },
        {
          id: "sh00-git2",
          type: "mcq",
          question: "Tu veux voir quels fichiers ont été modifiés mais pas encore commités. Quelle commande ?",
          options: ["git log", "git status", "git diff", "git show"],
          answer: "git status",
          explanation: "git status montre les fichiers modifiés, en staging (ajoutés avec add) et non-trackés. C'est la commande à utiliser tout le temps."
        }
      ],
      traps: [
        "git add . ajoute TOUT — incluant des fichiers que tu ne veux peut-être pas commit (fichiers de config, exécutables)",
        "git commit sans message (-m) ouvre un éditeur de texte — si c'est vim, Échap puis :wq pour sauvegarder",
        "Si tu push au mauvais endroit ou dans le mauvais dossier, l'exercice ne sera pas noté",
        "Le .git/ contient tout l'historique — ne le supprime jamais"
      ],
      tips: [
        "git log --oneline est plus lisible que git log",
        "Crée un fichier .gitignore pour exclure les fichiers que Git ne doit pas suivre (a.out, *.o, etc.)",
        "Commit souvent avec des messages clairs"
      ]
    }
  ]
};

// ============================================================
// MODULE C00
// ============================================================
const c00: Module = {
  id: "c00",
  title: "C 00",
  subtitle: "Bases du C : write(), boucles, ASCII",
  emoji: "🅲",
  tag: "C",
  description: "Première rencontre avec le langage C. Écrire des caractères avec write(), parcourir des boucles, comprendre la table ASCII.",
  subjectGuide: `## Comment lire le sujet C00

**Structure d'un exercice C :**
- **Turn in files** → exactement ces fichiers (ft_putchar.c par exemple)
- **Allowed functions** → les SEULES fonctions que tu peux utiliser
- **Description** → ce que la fonction doit faire

**Méthode de lecture :**
1. Lis le nom de la fonction à implémenter
2. Lis le prototype (en-tête de la fonction) — il te dit les types des paramètres et du retour
3. Lis la description ligne par ligne
4. Note les cas limites : que se passe-t-il avec 0, négatif, NULL ?
5. Teste mentalement avec un exemple

**Exemple de lecture de "ft_print_alphabet" :**
- Prototype : void ft_print_alphabet(void)
- "Display all lowercase letters in alphabetical order from a to z, on a single line."
- → Je dois afficher 'a', 'b', ..., 'z' avec write()
- → Boucle de 'a' (97) à 'z' (122)
- → Retour à la ligne à la fin ? Non, le sujet ne le dit pas — donc non`,
  lessons: [
    {
      id: "c00-write",
      title: "write() : le seul outil d'affichage autorisé",
      emoji: "✍️",
      duration: "30 min",
      difficulty: "Débutant",
      theory: `## write() : pourquoi cette fonction et pas printf ?

À la Piscine, \`printf\` est **interdite** dans la plupart des exercices. On utilise \`write()\` car c'est un **appel système** — une fonction directement fournie par le noyau Unix.

### Prototype de write()
\`\`\`c
#include <unistd.h>
ssize_t write(int fd, const void *buf, size_t count);
\`\`\`
- \`fd\` : file descriptor → **1** pour stdout (l'écran)
- \`buf\` : pointeur vers les données à écrire → souvent l'adresse d'un char
- \`count\` : nombre d'octets à écrire → souvent **1** pour un seul caractère
- Retourne : nombre d'octets écrits, ou -1 si erreur

### Écrire UN caractère
En C, un \`char\` est un entier. Pour écrire un caractère avec write(), on passe **son adresse** :
\`\`\`c
char c = 'A';
write(1, &c, 1);   // &c = adresse de c
\`\`\`
Le \`&\` est l'opérateur "adresse de". Il donne l'emplacement en mémoire de la variable.

### La table ASCII : les caractères sont des nombres
En C, les caractères SONT des entiers. 'A' = 65, 'a' = 97, '0' = 48.
\`\`\`c
char c = 'A';
// c vaut exactement 65 en mémoire
// On peut faire de l'arithmétique :
c + 1;    // = 'B' (66)
c + 32;   // = 'a' (97) — passage majuscule/minuscule
\`\`\`

### Écrire un nombre en ASCII
Pour afficher le chiffre 5, tu ne peux pas écrire write(1, 5, 1) — 5 n'est pas l'ASCII de '5'.
Tu dois écrire '5' (ASCII 53) :
\`\`\`c
int n = 5;
char c = n + '0';    // 5 + 48 = 53 = '5'
write(1, &c, 1);
\`\`\``,
      howToRead: `Pour ft_putchar, le sujet dit :
- "Write a function that displays the character passed as a parameter."
- Prototype : void ft_putchar(char c)
→ Paramètre c est déjà le caractère, passe son adresse à write().`,
      examples: [
        {
          title: "ft_putchar — La fonction de base",
          description: "Affiche un seul caractère",
          code: `#include <unistd.h>

void    ft_putchar(char c)
{
    write(1, &c, 1);
}

// Utilisation :
// ft_putchar('A');  → affiche A
// ft_putchar('\\n'); → retour à la ligne
// ft_putchar(65);   → affiche A (car 65 = 'A' en ASCII)`,
          output: `A`,
          explanation: "&c donne l'adresse de la variable c. write() lit 1 octet à cette adresse et l'écrit sur stdout (fd=1)."
        },
        {
          title: "ft_print_alphabet — Boucle + ASCII",
          description: "Afficher toutes les lettres de a à z",
          code: `#include <unistd.h>

void    ft_print_alphabet(void)
{
    char    c;

    c = 'a';              // 'a' = 97 en ASCII
    while (c <= 'z')      // 'z' = 122 en ASCII
    {
        write(1, &c, 1);
        c++;              // passer à la lettre suivante
    }
}

// Équivalent exact avec des entiers :
// c = 97;
// while (c <= 122) { write(1, &c, 1); c++; }`,
          output: `abcdefghijklmnopqrstuvwxyz`,
          explanation: "La boucle while incrémente c de 'a' à 'z'. Comme les char sont des entiers, c++ passe au caractère ASCII suivant."
        },
        {
          title: "ft_print_numbers — Chiffres 0 à 9",
          description: "Afficher tous les chiffres",
          code: `#include <unistd.h>

void    ft_print_numbers(void)
{
    char    c;

    c = '0';              // '0' = 48 en ASCII
    while (c <= '9')      // '9' = 57 en ASCII
    {
        write(1, &c, 1);
        c++;
    }
}`,
          output: `0123456789`,
          explanation: "'0' est 48 en ASCII. En faisant c = '0' et c++, on parcourt '0','1',...,'9' (ASCII 48 à 57)."
        },
        {
          title: "ft_putnbr simplifié — Afficher un nombre",
          description: "Comment afficher un entier avec write()",
          code: `#include <unistd.h>

// Version simplifiée (1 chiffre seulement, pour comprendre le concept)
void    afficher_chiffre(int n)
{
    char    c;

    c = n + '0';     // convertit l'entier en caractère ASCII
    // n=5 → 5 + 48 = 53 → '5'
    write(1, &c, 1);
}

// Pour afficher un nombre à plusieurs chiffres :
// 42 → on affiche '4' puis '2'
// Méthode : diviser par 10 récursivement (voir C05)
void    ft_putnbr(int n)
{
    char    c;

    if (n >= 10)
        ft_putnbr(n / 10);   // affiche les chiffres avant
    c = (n % 10) + '0';      // dernier chiffre
    write(1, &c, 1);
}`,
          output: `42`,
          explanation: "n + '0' convertit un chiffre entier (0-9) en son caractère ASCII. C'est la clé pour afficher des nombres sans printf."
        }
      ],
      exercises: [
        {
          id: "c00-w1",
          type: "mcq",
          question: "Pourquoi write(1, &c, 1) et pas write(1, c, 1) ?",
          options: [
            "C'est juste une convention",
            "write() attend un pointeur (adresse mémoire), pas une valeur",
            "c tout seul ne fonctionne pas avec write",
            "La taille 1 nécessite un pointeur"
          ],
          answer: "write() attend un pointeur (adresse mémoire), pas une valeur",
          explanation: "Le deuxième paramètre de write est 'const void *buf' — un pointeur. &c donne l'adresse de c. Sans &, on passerait la valeur de c (ex: 65) comme si c'était une adresse, ce qui planterait."
        },
        {
          id: "c00-w2",
          type: "fill",
          question: "Pour afficher le chiffre 7 avec write(), tu dois d'abord convertir 7 en ASCII. Quelle est la valeur ASCII de '7' ?",
          answer: "55",
          explanation: "'7' - '0' = 7, donc '7' = '0' + 7 = 48 + 7 = 55 en ASCII."
        },
        {
          id: "c00-w3",
          type: "output",
          question: "Que va afficher ce code ?\n\nchar c = 'z';\nwhile (c >= 'a') { write(1, &c, 1); c--; }",
          options: ["abcdefghijklmnopqrstuvwxyz", "zyxwvutsrqponmlkjihgfedcba", "z", "Rien"],
          answer: "zyxwvutsrqponmlkjihgfedcba",
          explanation: "On commence à 'z' et on décrémente jusqu'à 'a'. L'ordre est inverse : z, y, x, ..., a."
        },
        {
          id: "c00-w4",
          type: "mcq",
          question: "Quelle est la valeur ASCII de 'A' ?",
          options: ["61", "65", "97", "1"],
          answer: "65",
          explanation: "Table ASCII : 'A'=65, 'Z'=90, 'a'=97, 'z'=122. Retiens : majuscule + 32 = minuscule."
        }
      ],
      traps: [
        "write(1, &c, 1) — ne pas oublier le & ! Sans lui, on passe la valeur de c comme adresse (crash ou comportement indéfini)",
        "Ne pas écrire '\\n' à la fin si le sujet ne le demande pas",
        "char c = 'a' + 26 ne vaut pas '\\0', ça vaut '{' (ASCII 123) ! Utilise while (c <= 'z')",
        "#include <unistd.h> est obligatoire pour write()"
      ],
      tips: [
        "Mémorise les valeurs ASCII clés : 'A'=65, 'a'=97, '0'=48, '\\n'=10",
        "Pour passer de majuscule à minuscule : lettre + 32",
        "Pour afficher un chiffre n : écris le char (n + '0')"
      ]
    },
    {
      id: "c00-loops",
      title: "Boucles while et for en C",
      emoji: "🔄",
      duration: "25 min",
      difficulty: "Débutant",
      theory: `## Les boucles : répéter du code

### La boucle while
\`\`\`
while (condition)
{
    // code exécuté TANT QUE la condition est vraie
}
\`\`\`
**Attention :** si la condition ne devient jamais fausse → boucle infinie.
Toujours vérifier qu'il y a quelque chose qui fait évoluer la condition.

### La boucle for
\`\`\`
for (initialisation; condition; incrément)
{
    // code
}
\`\`\`
Équivalent à :
\`\`\`
initialisation;
while (condition)
{
    // code
    incrément;
}
\`\`\`

### Quand utiliser quoi ?
- **for** : quand tu connais le nombre d'itérations à l'avance
- **while** : quand tu répètes jusqu'à une condition inconnue à l'avance

### Structures de contrôle
- \`break\` : sort immédiatement de la boucle
- \`continue\` : passe à l'itération suivante sans finir l'itération courante
- \`return\` : sort de la fonction entière`,
      howToRead: `ft_print_comb demande d'afficher toutes les combinaisons de 3 chiffres différents par ordre croissant.
Exemple : 012, 013, ..., 789.
→ 3 boucles imbriquées : i de 0 à 7, j de i+1 à 8, k de j+1 à 9`,
      examples: [
        {
          title: "Boucle while vs for",
          description: "Les deux façons d'écrire la même boucle",
          code: `// Version WHILE — afficher 0 à 9
void    print_digits_while(void)
{
    int i;

    i = 0;
    while (i <= 9)
    {
        write(1, &(char){i + '0'}, 1);
        i++;
    }
}

// Version FOR — même résultat
void    print_digits_for(void)
{
    int i;

    for (i = 0; i <= 9; i++)
    {
        write(1, &(char){i + '0'}, 1);
    }
}`,
          output: `0123456789`,
          explanation: "for est plus compact quand on a un compteur simple. while est plus clair quand la condition est complexe."
        },
        {
          title: "Boucles imbriquées",
          description: "Une boucle dans une boucle",
          code: `// Afficher toutes les paires de chiffres : 00, 01, 02, ..., 99
void    ft_print_comb2(void)
{
    int i;
    int j;

    i = 0;
    while (i <= 9)
    {
        j = 0;
        while (j <= 9)
        {
            write(1, &(char){i + '0'}, 1);
            write(1, &(char){j + '0'}, 1);
            if (i != 9 || j != 8)    // pas de ", " après la dernière
                write(1, ", ", 2);
            j++;
        }
        i++;
    }
}`,
          output: `00, 01, 02, ..., 99`,
          explanation: "Les boucles imbriquées permettent d'explorer toutes les combinaisons. La boucle intérieure (j) s'exécute entièrement pour chaque valeur de la boucle extérieure (i)."
        }
      ],
      exercises: [
        {
          id: "c00-loop1",
          type: "output",
          question: "Combien de fois le code dans la boucle s'exécute ?\n\ni = 0;\nwhile (i < 5) { i++; }",
          options: ["4 fois", "5 fois", "6 fois", "Boucle infinie"],
          answer: "5 fois",
          explanation: "i prend les valeurs 0, 1, 2, 3, 4. Quand i=5, la condition i<5 est fausse, la boucle s'arrête. Total : 5 itérations."
        },
        {
          id: "c00-loop2",
          type: "fill",
          question: "Pour afficher 'ABCDE' avec une boucle for, complète : for (c = ___; c <= 'E'; c++)",
          answer: "'A'",
          explanation: "On commence à 'A' (65) et on incrémente jusqu'à 'E' (69). Soit for (c = 'A'; c <= 'E'; c++)"
        }
      ],
      traps: [
        "Oublier d'incrémenter dans while → boucle infinie (Ctrl+C pour arrêter)",
        "La boucle for (;;) est une boucle infinie (pas de condition = toujours vrai)",
        "Le ; après while(condition); crée une boucle vide — le code après n'est exécuté qu'une fois"
      ],
      tips: [
        "Dessine l'évolution de tes variables sur papier pour comprendre une boucle complexe",
        "Teste avec de petites valeurs d'abord (boucle de 0 à 3 au lieu de 0 à 100)"
      ]
    }
  ]
};

// ============================================================
// MODULE C01
// ============================================================
const c01: Module = {
  id: "c01",
  title: "C 01",
  subtitle: "Pointeurs : comprendre la mémoire",
  emoji: "📍",
  tag: "C",
  description: "Les pointeurs sont le concept fondamental du C. Comprendre les adresses mémoire, le déréférencement, et les pointeurs sur pointeurs.",
  subjectGuide: `## Comment lire le sujet C01

Les exercices C01 portent tous sur les pointeurs. Quand tu lis le sujet :
1. **Vois le prototype** — un * dans le type de paramètre = c'est un pointeur
2. **Lis "this function must..."** — quelle valeur dois-tu modifier ?
3. **Si le prototype a int \\*\\*a** — c'est un pointeur sur pointeur (double indirection)

**Exemple : ft_swap(int \\*a, int \\*b)**
- a et b sont des pointeurs vers des int
- Tu dois échanger les VALEURS pointées
- Tu dois utiliser \\*a et \\*b pour accéder aux valeurs`,
  lessons: [
    {
      id: "c01-pointers",
      title: "Pointeurs : adresses et mémoire",
      emoji: "🧠",
      duration: "45 min",
      difficulty: "Intermédiaire",
      theory: `## Les pointeurs : comprendre la mémoire

### La mémoire RAM
Imagine la RAM comme un immense tableau de cases, chacune numérotée. Chaque case contient 1 octet. Le numéro d'une case = son **adresse mémoire**.

\`\`\`
Adresse :  0x1000  0x1001  0x1002  0x1003  0x1004
Valeur  :    42      0       17     'A'      0
\`\`\`

Quand tu déclares \`int x = 42;\`, le compilateur :
1. Réserve 4 octets quelque part en mémoire (ex: adresse 0x1000)
2. Y écrit la valeur 42
3. Retient que la variable \`x\` correspond à l'adresse 0x1000

### Qu'est-ce qu'un pointeur ?
Un pointeur est une **variable qui contient une adresse mémoire**.
\`\`\`c
int  x = 42;        // x est un int stocké quelque part
int *p = &x;        // p EST l'adresse de x
\`\`\`
- \`&x\` : opérateur "adresse de" → donne l'adresse où x est stocké
- \`*p\` : opérateur de déréférencement → lit/écrit la valeur à l'adresse stored dans p
- \`int *p\` : déclare p comme "pointeur vers un int"

### Visualisation mémoire
\`\`\`
       x            p
  ┌─────────┐   ┌─────────┐
  │   42    │   │ 0x1000  │ ← p contient l'adresse de x
  └─────────┘   └─────────┘
   0x1000         0x2000
      ↑
      p pointe ici
\`\`\`

### Pourquoi les pointeurs ?
Sans pointeur, une fonction ne peut pas modifier une variable de la fonction appelante :
\`\`\`c
// SANS pointeur — ne modifie PAS x dans main
void wrong_increment(int a) {
    a = a + 1;  // modifie seulement la copie locale
}

// AVEC pointeur — modifie VRAIMENT x dans main
void correct_increment(int *a) {
    *a = *a + 1;  // modifie la valeur À L'ADRESSE stockée dans a
}
\`\`\`

### Pointeur sur pointeur (\`int **\`)
Un double pointeur contient l'adresse d'un pointeur :
\`\`\`c
int   x = 42;
int  *p = &x;    // p contient l'adresse de x
int **pp = &p;   // pp contient l'adresse de p

**pp = 100;      // modifie x (déréférence deux fois)
\`\`\``,
      howToRead: `Pour ft_ft(int **nbr) :
- nbr est un pointeur vers un pointeur vers un int
- Le sujet dit "assign the value 42 to the int pointed to by the pointer pointed to by nbr"
- Traduction : **nbr = 42
  - *nbr = le premier int* (le pointeur intermédiaire)
  - **nbr = la valeur de l'int final`,
      examples: [
        {
          title: "Opérateurs & et * expliqués",
          description: "Comprendre adresse-de et déréférencement",
          code: `#include <stdio.h>

int main(void)
{
    int  x = 42;
    int *p = &x;   // p = adresse de x

    printf("x = %d\\n", x);          // 42
    printf("&x = %p\\n", &x);        // ex: 0x7ffee1c (adresse de x)
    printf("p = %p\\n", p);          // même adresse que &x
    printf("*p = %d\\n", *p);        // 42 (valeur pointée par p)

    *p = 100;        // modifie x via le pointeur
    printf("x = %d\\n", x);          // maintenant 100 !

    return (0);
}`,
          output: `x = 42
&x = 0x7ffee1c
p = 0x7ffee1c
*p = 42
x = 100`,
          explanation: "*p = 100 modifie x car p contient l'adresse de x. On déréférence p pour accéder à x."
        },
        {
          title: "ft_swap — Échanger deux valeurs",
          description: "Utiliser des pointeurs pour modifier deux variables",
          code: `void    ft_swap(int *a, int *b)
{
    int temp;

    temp = *a;    // sauvegarder la valeur pointée par a
    *a = *b;      // mettre la valeur de *b dans *a
    *b = temp;    // mettre temp (ancienne valeur de *a) dans *b
}

// Utilisation dans main :
// int x = 10, y = 20;
// ft_swap(&x, &y);
// → x = 20, y = 10

// POURQUOI on doit passer &x et pas x ?
// Si on passait ft_swap(x, y) :
// - a et b seraient des COPIES de x et y
// - On échangerait les copies, pas les originaux
// - x et y resteraient inchangés dans main`,
          output: `x = 20, y = 10`,
          explanation: "Le swap classique utilise une variable temporaire. Les pointeurs permettent de modifier les variables originales depuis une autre fonction."
        },
        {
          title: "ft_div_mod — Deux résultats d'une fonction",
          description: "Retourner deux valeurs via des pointeurs",
          code: `void    ft_div_mod(int a, int b, int *div, int *mod)
{
    *div = a / b;   // quotient entier
    *mod = a % b;   // reste de la division
}

// En C, une fonction ne peut retourner qu'UNE valeur.
// Pour "retourner" deux valeurs, on passe des pointeurs
// et on écrit directement dans les cases mémoire.

// Utilisation :
// int d, m;
// ft_div_mod(17, 5, &d, &m);
// d = 17/5 = 3
// m = 17%5 = 2`,
          output: `div = 3, mod = 2`,
          explanation: "En passant des pointeurs, une fonction peut modifier plusieurs variables de l'appelant. C'est le seul moyen de 'retourner' plusieurs valeurs en C."
        }
      ],
      exercises: [
        {
          id: "c01-p1",
          type: "mcq",
          question: "Qu'est-ce que *p quand p est un pointeur vers x ?",
          options: [
            "L'adresse de p",
            "L'adresse de x",
            "La valeur stockée à l'adresse contenue dans p",
            "L'adresse contenue dans p"
          ],
          answer: "La valeur stockée à l'adresse contenue dans p",
          explanation: "*p déréférence p — ça lit (ou écrit) la valeur à l'adresse que p contient. Si p contient l'adresse de x, *p est la valeur de x."
        },
        {
          id: "c01-p2",
          type: "fill",
          question: "Pour obtenir l'adresse de la variable 'score', tu écris : ___score",
          answer: "&",
          explanation: "& est l'opérateur 'adresse de'. &score retourne l'adresse mémoire où score est stocké."
        },
        {
          id: "c01-p3",
          type: "output",
          question: "Que vaut x après ce code ?\n\nint x = 5;\nint *p = &x;\n*p = 20;\n*p += 3;",
          options: ["5", "20", "23", "8"],
          answer: "23",
          explanation: "*p = 20 met x à 20. *p += 3 ajoute 3 à *p (donc à x). x vaut 23."
        },
        {
          id: "c01-p4",
          type: "mcq",
          question: "Pourquoi ft_swap prend int *a et non int a ?",
          options: [
            "Pour économiser de la mémoire",
            "Pour pouvoir modifier les variables originales dans la fonction appelante",
            "Parce que les entiers ne peuvent pas être passés directement",
            "Pour être plus rapide"
          ],
          answer: "Pour pouvoir modifier les variables originales dans la fonction appelante",
          explanation: "En C, les arguments sont copiés. Avec int a, on ne peut modifier que la copie locale. Avec int *a, on a l'adresse de l'original et on peut le modifier."
        }
      ],
      traps: [
        "int *p; sans initialisation — p contient une adresse aléatoire. Déréférencer → segfault ou corruption mémoire",
        "Confondre p (l'adresse) et *p (la valeur pointée)",
        "ft_swap(x, y) ne fonctionne pas — il faut ft_swap(&x, &y)",
        "NULL est un pointeur nul. Déréférencer NULL (*p quand p=NULL) = segfault"
      ],
      tips: [
        "Dessine toujours les cases mémoire et les flèches quand tu travailles avec des pointeurs",
        "int *p se lit de droite à gauche : 'p est un pointeur vers int'",
        "Avant d'utiliser un pointeur, vérifie toujours qu'il n'est pas NULL"
      ]
    }
  ]
};

// ============================================================
// MODULE C02
// ============================================================
const c02: Module = {
  id: "c02",
  title: "C 02",
  subtitle: "Chaînes de caractères (strings)",
  emoji: "🔤",
  tag: "C",
  description: "Les strings en C sont des tableaux de char terminés par \\0. Copier, manipuler, analyser des chaînes sans la bibliothèque standard.",
  subjectGuide: `## Comment lire le sujet C02

Les exercices C02 réimplémentent des fonctions standard de string.h.
Avant de coder, cherche la man page de la fonction originale :
\`man strcpy\` (ou Google "man 3 strcpy")

**Questions à te poser pour chaque exercice :**
1. Quels sont les paramètres et leurs types ?
2. La fonction modifie-t-elle le premier paramètre (destination) ?
3. Que retourne-t-elle ? (souvent un char* ou un int)
4. Comment gère-t-elle le \\0 final ?
5. Y a-t-il une taille limite (n) ?`,
  lessons: [
    {
      id: "c02-strings",
      title: "Strings en C : tableaux de char",
      emoji: "📝",
      duration: "40 min",
      difficulty: "Intermédiaire",
      theory: `## Les strings en C

### Ce qu'est vraiment une string
En C, il n'y a pas de type "string". Une string EST un tableau de \`char\` qui se termine par le caractère nul \`\\0\` (ASCII 0).

\`\`\`c
char s[] = "hello";
// En mémoire : ['h', 'e', 'l', 'l', 'o', '\\0']
//              s[0]  s[1]  s[2]  s[3]  s[4]  s[5]
\`\`\`

**Conséquences importantes :**
- sizeof("hello") = 6 (inclut le \\0)
- strlen("hello") = 5 (ne compte pas le \\0)
- Tu dois TOUJOURS réserver de la place pour le \\0 final

### Parcourir une string
La méthode standard : boucler jusqu'à \\0 :
\`\`\`c
int i = 0;
while (s[i] != '\\0')
{
    // traiter s[i]
    i++;
}
\`\`\`
Ou plus court :
\`\`\`c
while (s[i])  // '\\0' vaut 0 = faux → la boucle s'arrête
    i++;
\`\`\`

### ft_strlen : compter les caractères
\`\`\`c
int ft_strlen(char *s)
{
    int i = 0;
    while (s[i])
        i++;
    return i;
}
\`\`\`

### ft_strcpy : copier une string
Copie src dans dst (y compris le \\0) :
\`\`\`c
char *ft_strcpy(char *dst, char *src)
{
    int i = 0;
    while (src[i])
    {
        dst[i] = src[i];
        i++;
    }
    dst[i] = '\\0';  // ne pas oublier !
    return dst;
}
\`\`\`

### ft_strncpy : copier au plus n caractères
Attention : si strlen(src) < n, complète avec des \\0 jusqu'à n.
Si strlen(src) >= n, ne met PAS de \\0 final !`,
      howToRead: `Pour ft_str_is_alpha(char *str) :
- Le sujet dit "return 1 if every character is alphabetical, 0 otherwise"
- Attention : la string vide → retourne 1 (aucun caractère non-alphabétique)
- Parcours la string, si un char n'est ni 'a'-'z' ni 'A'-'Z', retourne 0`,
      examples: [
        {
          title: "ft_strlen et parcours de string",
          description: "Compter la longueur, parcourir caractère par caractère",
          code: `#include <unistd.h>

// Compter la longueur d'une string
int     ft_strlen(char *s)
{
    int i;

    i = 0;
    while (s[i] != '\\0')  // s'arrête au null byte
        i++;
    return (i);
}

// Afficher une string
void    ft_putstr(char *s)
{
    int i;

    i = 0;
    while (s[i])
    {
        write(1, &s[i], 1);  // affiche s[i]
        i++;
    }
}

// ft_strlen("hello") = 5
// ft_strlen("")       = 0  (pointe directement sur \\0)
// ft_strlen("a\\0b")  = 1  (s'arrête au premier \\0)`,
          output: `hello`,
          explanation: "La condition while (s[i]) est vraie pour tous les char non-nuls. Elle devient fausse quand s[i] = '\\0' (valeur 0 = faux en C)."
        },
        {
          title: "ft_strcpy et ft_strncpy",
          description: "Copier des strings",
          code: `// ft_strcpy : copie src dans dst
char    *ft_strcpy(char *dst, char *src)
{
    int i;

    i = 0;
    while (src[i])          // tant que pas \\0
    {
        dst[i] = src[i];    // copie caractère par caractère
        i++;
    }
    dst[i] = '\\0';          // CRUCIAL : ajouter le \\0 final
    return (dst);
}

// ft_strncpy : copie au plus n caractères
char    *ft_strncpy(char *dst, char *src, unsigned int n)
{
    unsigned int i;

    i = 0;
    while (i < n && src[i])  // s'arrête à n OU au \\0
    {
        dst[i] = src[i];
        i++;
    }
    while (i < n)            // complète avec \\0 si src plus court
    {
        dst[i] = '\\0';
        i++;
    }
    return (dst);
}`,
          explanation: "Le cas piège de strncpy : si src est plus court que n, on remplit le reste de dst avec des \\0. Si src est plus long que n, il n'y a PAS de \\0 final dans dst."
        },
        {
          title: "ft_str_is_alpha et fonctions de classification",
          description: "Vérifier la nature des caractères",
          code: `// Vérifie si c est une lettre minuscule
int     is_lower(char c)
{
    return (c >= 'a' && c <= 'z');
}

// Vérifie si c est une lettre majuscule
int     is_upper(char c)
{
    return (c >= 'A' && c <= 'Z');
}

// Vérifie si toute la string est alphabétique
int     ft_str_is_alpha(char *str)
{
    int i;

    i = 0;
    while (str[i])
    {
        if (!(is_lower(str[i]) || is_upper(str[i])))
            return (0);  // un seul non-alpha → retourne 0
        i++;
    }
    return (1);  // string vide ou tout alpha → 1
}`,
          output: `ft_str_is_alpha("Hello") = 1
ft_str_is_alpha("Hello42") = 0
ft_str_is_alpha("") = 1`,
          explanation: "Le principe : on cherche UNE exception. Dès qu'on trouve un caractère non-conforme, on retourne 0. Si on parcourt toute la string sans exception, on retourne 1."
        }
      ],
      exercises: [
        {
          id: "c02-s1",
          type: "mcq",
          question: "Pourquoi doit-on écrire dst[i] = '\\0' à la fin de ft_strcpy ?",
          options: [
            "Pour des raisons de performance",
            "Parce que les strings C doivent se terminer par \\0 pour que les fonctions sachent où elles finissent",
            "C'est optionnel",
            "Pour libérer la mémoire"
          ],
          answer: "Parce que les strings C doivent se terminer par \\0 pour que les fonctions sachent où elles finissent",
          explanation: "En C, une string est valide seulement si elle se termine par \\0. Sans ça, strlen, printf, et toutes les fonctions de string liront au-delà de la string."
        },
        {
          id: "c02-s2",
          type: "output",
          question: "Que retourne ft_strlen(\"42 Network\") ?",
          options: ["10", "11", "9", "12"],
          answer: "10",
          explanation: "'4','2',' ','N','e','t','w','o','r','k' = 10 caractères. Le \\0 final ne compte pas."
        },
        {
          id: "c02-s3",
          type: "fill",
          question: "Pour convertir une lettre minuscule en majuscule : c = c ___ 32",
          answer: "-",
          explanation: "'a'=97, 'A'=65. 97-32=65. Donc minuscule - 32 = majuscule. Et majuscule + 32 = minuscule."
        }
      ],
      traps: [
        "Oublier le \\0 final dans strcpy → comportement indéfini, bugs silencieux",
        "Passer NULL à ft_strlen sans vérification → segfault",
        "char *s = \"hello\" crée une string littérale en mémoire en lecture seule — ne pas essayer de la modifier",
        "strcmp retourne 0 si les strings sont ÉGALES (contre-intuitif)"
      ],
      tips: [
        "Toujours vérifier que la destination est assez grande avant de copier",
        "La manipulation ASCII : 'a' + ('A' - 'a') = 'A'. Ou simplement lettre - 32 pour majuscule."
      ]
    }
  ]
};

// ============================================================
// MODULE C05
// ============================================================
const c05: Module = {
  id: "c05",
  title: "C 05",
  subtitle: "Récursion : fonctions qui s'appellent elles-mêmes",
  emoji: "🔁",
  tag: "C",
  description: "La récursion est une technique puissante. Factorielle, Fibonacci, puissance, sqrt, nombres premiers — tous se résolvent élégamment par récursion.",
  subjectGuide: `## Comment lire le sujet C05

Chaque exercice de C05 présente une fonction mathématique à implémenter récursivement.
**Méthode :**
1. Identifie le(s) cas de base (quand récursion s'arrête)
2. Identifie la relation récursive (comment le problème se réduit)
3. Traduis en code

**Exemple : ft_fibonacci(int index)**
- cas de base : index=0 retourne 0, index=1 retourne 1
- récursion : fibonacci(n) = fibonacci(n-1) + fibonacci(n-2)`,
  lessons: [
    {
      id: "c05-recursion",
      title: "Récursion : principe et application",
      emoji: "♾️",
      duration: "50 min",
      difficulty: "Intermédiaire",
      theory: `## La récursion : une fonction qui s'appelle elle-même

### Comment ça fonctionne ?
Une fonction récursive résout un grand problème en :
1. **Décomposant** en un problème plus petit
2. **S'appelant elle-même** avec le problème plus petit
3. **S'arrêtant** quand le problème est trivial (cas de base)

**Règle d'or : sans cas de base, récursion infinie = stack overflow**

### La pile d'appels (call stack)
Chaque appel récursif crée un nouveau "cadre" (frame) sur la stack :
\`\`\`
fact(4)
  → fact(3)
      → fact(2)
          → fact(1) → retourne 1
        retourne 2*1 = 2
    retourne 3*2 = 6
  retourne 4*6 = 24
\`\`\`

### Anatomie d'une fonction récursive
\`\`\`c
int fact(int n)
{
    if (n <= 1)          // CAS DE BASE — TOUJOURS EN PREMIER
        return (1);
    return (n * fact(n - 1));  // APPEL RÉCURSIF avec n-1
}
\`\`\`

### Récursion vs Itération
- La **récursion** est souvent plus élégante et proche de la définition mathématique
- L'**itération** (boucle) est souvent plus efficace en mémoire
- À la Piscine C05, la récursion est obligatoire`,
      howToRead: `Pour ft_sqrt(int nb) :
- Retourne la racine carrée de nb si elle est entière, sinon 0
- Le sujet ne précise pas qu'il faut être récursif, mais C05 = récursion
- Approche : chercher un entier i tel que i*i == nb (récursivement)`,
      examples: [
        {
          title: "Factorielle récursive",
          description: "n! = n × (n-1) × ... × 1",
          code: `int     ft_factorial(int nb)
{
    // Cas de base : 0! = 1, 1! = 1
    if (nb <= 1)
        return (1);

    // Récursion : n! = n × (n-1)!
    return (nb * ft_factorial(nb - 1));
}

// Trace d'exécution pour ft_factorial(4) :
// ft_factorial(4)
//   = 4 * ft_factorial(3)
//   = 4 * (3 * ft_factorial(2))
//   = 4 * (3 * (2 * ft_factorial(1)))
//   = 4 * (3 * (2 * 1))
//   = 4 * (3 * 2)
//   = 4 * 6
//   = 24`,
          output: `ft_factorial(0) = 1
ft_factorial(5) = 120
ft_factorial(10) = 3628800`,
          explanation: "Le cas de base nb<=1 retourne 1 (sans appel récursif). Chaque appel réduit nb de 1 jusqu'à atteindre le cas de base."
        },
        {
          title: "Fibonacci récursif",
          description: "fib(n) = fib(n-1) + fib(n-2)",
          code: `int     ft_fibonacci(int index)
{
    // Cas de base
    if (index < 0)
        return (-1);
    if (index == 0)
        return (0);
    if (index == 1)
        return (1);

    // Récursion : fib(n) = fib(n-1) + fib(n-2)
    return (ft_fibonacci(index - 1) + ft_fibonacci(index - 2));
}

// Suite : 0, 1, 1, 2, 3, 5, 8, 13, 21, 34...
// ft_fibonacci(0) = 0
// ft_fibonacci(1) = 1
// ft_fibonacci(7) = 13`,
          output: `0, 1, 1, 2, 3, 5, 8, 13, 21, 34`,
          explanation: "Fibonacci a DEUX appels récursifs par appel. Pour fib(30), il y a environ 10^9 appels — très inefficace mais correct. Pour la Piscine, c'est acceptable."
        },
        {
          title: "ft_sqrt — Racine carrée entière",
          description: "Trouver i tel que i*i == nb",
          code: `// Fonction auxiliaire récursive
static int  find_sqrt(int nb, int i)
{
    if (i * i > nb)      // i trop grand, pas de racine entière
        return (0);
    if (i * i == nb)     // trouvé !
        return (i);
    return (find_sqrt(nb, i + 1));  // essayer suivant
}

int     ft_sqrt(int nb)
{
    if (nb < 0)
        return (0);
    if (nb == 0)
        return (0);
    return (find_sqrt(nb, 1));
}

// ft_sqrt(25) = 5  (5*5 = 25)
// ft_sqrt(26) = 0  (pas de racine entière)
// ft_sqrt(0)  = 0`,
          output: `ft_sqrt(4) = 2
ft_sqrt(9) = 3
ft_sqrt(10) = 0`,
          explanation: "On cherche i en partant de 1. Si i*i > nb, on n'a pas trouvé de racine entière. Si i*i == nb, i est la racine. Sinon on essaie i+1."
        },
        {
          title: "ft_is_prime — Nombre premier",
          description: "Un nombre premier n'est divisible que par 1 et lui-même",
          code: `// Fonction auxiliaire : vérifie si nb est divisible par un entier entre div et nb-1
static int  is_divisible(int nb, int div)
{
    if (div >= nb)       // on a tout vérifié, aucun diviseur trouvé
        return (0);
    if (nb % div == 0)   // divisible → pas premier
        return (1);
    return (is_divisible(nb, div + 1));  // essayer diviseur suivant
}

int     ft_is_prime(int nb)
{
    if (nb < 2)
        return (0);  // 0 et 1 ne sont pas premiers par définition
    return (!is_divisible(nb, 2));
}

// ft_is_prime(2)  = 1  (premier)
// ft_is_prime(7)  = 1  (premier)
// ft_is_prime(9)  = 0  (9 = 3×3)
// ft_is_prime(1)  = 0  (par définition)`,
          output: `ft_is_prime(2) = 1
ft_is_prime(17) = 1
ft_is_prime(15) = 0`,
          explanation: "On teste la divisibilité par chaque entier de 2 à nb-1. En pratique, on pourrait s'arrêter à sqrt(nb) pour optimiser, mais la version complète est correcte."
        }
      ],
      exercises: [
        {
          id: "c05-r1",
          type: "mcq",
          question: "Que se passe-t-il si une fonction récursive n'a pas de cas de base ?",
          options: [
            "Elle retourne 0",
            "Elle cause un stack overflow (débordement de pile)",
            "Elle compile mais retourne une erreur à l'exécution",
            "Le compilateur refuse de compiler"
          ],
          answer: "Elle cause un stack overflow (débordement de pile)",
          explanation: "Chaque appel récursif crée un frame sur la stack. Sans cas de base, les frames s'accumulent jusqu'à épuiser la stack (généralement 8 Mo). Le programme se termine avec un segfault ou 'stack overflow'."
        },
        {
          id: "c05-r2",
          type: "output",
          question: "Que retourne ft_factorial(-1) avec le code vu ?",
          options: ["-1", "0", "1", "Comportement indéfini"],
          answer: "1",
          explanation: "if (nb <= 1) return 1; — La condition nb <= 1 inclut les négatifs. -1 <= 1 est vrai, donc retourne 1. (Certaines implémentations retournent 0 pour les négatifs — lis bien le sujet.)"
        },
        {
          id: "c05-r3",
          type: "fill",
          question: "Dans ft_fibonacci, quels sont les DEUX cas de base ? (écrire: n==0, n==1)",
          answer: "n==0, n==1",
          explanation: "fib(0)=0 et fib(1)=1 sont les deux cas de base. Sans eux, la récursion n'aurait pas de fin."
        }
      ],
      traps: [
        "Oublier les cas négatifs — ft_factorial(-5) doit retourner 0 (ou ce que le sujet demande)",
        "La récursion de Fibonacci est TRÈS lente pour de grandes valeurs (croissance exponentielle des appels)",
        "ft_fibonacci avec index=0 doit retourner 0, pas 1 — attention au cas de base",
        "Trop de récursion → segfault (stack overflow) pour de grandes entrées"
      ],
      tips: [
        "Toujours écrire le cas de base EN PREMIER dans le code",
        "Trace l'exécution sur papier pour des petites valeurs pour vérifier",
        "Si le sujet dit 'return 0 for negative' — vérifie bien ce cas avant de tout faire"
      ]
    }
  ]
};

// ============================================================
// MODULE C07
// ============================================================
const c07: Module = {
  id: "c07",
  title: "C 07",
  subtitle: "Allocation mémoire dynamique : malloc & free",
  emoji: "💾",
  tag: "C",
  description: "Allouer et libérer de la mémoire à l'exécution. ft_strdup, ft_range, ft_split — comprendre le heap.",
  subjectGuide: `## Comment lire le sujet C07

Les fonctions de C07 retournent des pointeurs vers de la mémoire allouée dynamiquement.
**Questions essentielles :**
1. La fonction doit-elle retourner NULL en cas d'erreur ?
2. Qui est responsable de libérer la mémoire retournée ?
3. Quelle taille allouer ?

**Pour ft_split :**
- Compte d'abord le nombre de sous-strings pour savoir combien de pointeurs allouer
- Alloue le tableau de pointeurs (n+1 entrées, la dernière = NULL)
- Puis pour chaque sous-string, alloue et copie`,
  lessons: [
    {
      id: "c07-malloc",
      title: "malloc, free et allocation dynamique",
      emoji: "🧱",
      duration: "50 min",
      difficulty: "Avancé",
      theory: `## malloc et free : gérer la mémoire manuellement

### Pourquoi allouer dynamiquement ?
La stack a une taille limitée et les variables locales disparaissent quand la fonction retourne.
Pour créer des données qui survivent à une fonction, ou dont la taille n'est connue qu'à l'exécution, on utilise le **heap** via \`malloc\`.

### malloc() : allouer de la mémoire
\`\`\`c
#include <stdlib.h>
void *malloc(size_t size);
\`\`\`
- Réserve \`size\` octets sur le heap
- Retourne un pointeur vers le début du bloc, ou **NULL si échec**
- La mémoire n'est PAS initialisée (contient n'importe quoi)

\`\`\`c
char *str = malloc(6);          // 6 octets pour "hello\\0"
int  *arr = malloc(10 * sizeof(int));  // tableau de 10 int
\`\`\`

### free() : libérer la mémoire
\`\`\`c
free(str);    // libère le bloc
str = NULL;   // bonne pratique
\`\`\`
**Règles absolues :**
- Ne jamais oublier de free() (sinon : memory leak)
- Ne jamais free() deux fois le même pointeur (double free = crash)
- Ne jamais utiliser un pointeur après free() (dangling pointer)
- Ne jamais free() un pointeur non-malloc (stack, string littérale, etc.)

### TOUJOURS vérifier le retour de malloc
\`\`\`c
char *str = malloc(100);
if (str == NULL)     // malloc peut échouer si plus de mémoire
    return (NULL);   // propager l'erreur
\`\`\`

### sizeof : obtenir la taille d'un type
\`\`\`c
sizeof(char)  = 1 octet
sizeof(int)   = 4 octets (souvent)
sizeof(long)  = 8 octets (souvent)
sizeof(void*) = 8 octets sur 64 bits
\`\`\``,
      howToRead: `Pour ft_strdup(char *src) :
- Alloue une nouvelle string de taille strlen(src) + 1 (pour le \\0)
- Copie src dans la nouvelle string
- Retourne le pointeur vers la copie

Pour ft_split(char *str, char c) :
- c est le délimiteur (séparateur)
- Retourne un tableau de strings terminé par NULL
- Chaque string est allouée séparément`,
      examples: [
        {
          title: "ft_strdup — Dupliquer une string",
          description: "Allouer et copier une string",
          code: `#include <stdlib.h>
#include <unistd.h>

// Retourne une copie allouée de s
char    *ft_strdup(char *s)
{
    int     len;
    char    *copy;
    int     i;

    // 1. Calculer la longueur
    len = 0;
    while (s[len])
        len++;

    // 2. Allouer len+1 octets (pour le \\0)
    copy = malloc(len + 1);
    if (!copy)           // vérification OBLIGATOIRE
        return (NULL);

    // 3. Copier caractère par caractère
    i = 0;
    while (s[i])
    {
        copy[i] = s[i];
        i++;
    }
    copy[i] = '\\0';     // terminer la string

    return (copy);
    // L'appelant est responsable de free(copy)
}`,
          output: `ft_strdup("hello") retourne "hello" (nouvelle adresse)`,
          explanation: "La clé : allouer strlen+1 (pour le \\0), copier, retourner. L'appelant doit faire free() sur la valeur retournée."
        },
        {
          title: "ft_range — Tableau d'entiers",
          description: "Allouer un tableau d'entiers",
          code: `#include <stdlib.h>

// Retourne un tableau de min à max-1
int     *ft_range(int min, int max)
{
    int *arr;
    int  size;
    int  i;

    if (min >= max)      // cas invalide
        return (NULL);

    size = max - min;
    arr = malloc(size * sizeof(int));  // taille en octets !
    if (!arr)
        return (NULL);

    i = 0;
    while (i < size)
    {
        arr[i] = min + i;
        i++;
    }
    return (arr);  // l'appelant doit free()
}

// ft_range(1, 5) retourne [1, 2, 3, 4] (4 éléments)
// ft_range(3, 3) retourne NULL (min == max)`,
          output: `[1, 2, 3, 4]`,
          explanation: "sizeof(int) permet d'allouer le bon nombre d'octets quelle que soit la taille d'un int sur la machine."
        },
        {
          title: "ft_split — Découper une string",
          description: "La fonction la plus complexe de C07",
          code: `#include <stdlib.h>

// Compter le nombre de mots
static int  count_words(char *str, char c)
{
    int count = 0;
    int in_word = 0;
    int i = 0;

    while (str[i])
    {
        if (str[i] != c && !in_word)
        {
            in_word = 1;
            count++;
        }
        else if (str[i] == c)
            in_word = 0;
        i++;
    }
    return (count);
}

// Longueur d'un mot à partir de start
static int  word_len(char *str, char c, int start)
{
    int len = 0;
    while (str[start + len] && str[start + len] != c)
        len++;
    return (len);
}

char    **ft_split(char *str, char c)
{
    char **result;
    int   nb_words = count_words(str, c);
    int   i = 0;
    int   j = 0;
    int   len;

    // Allouer tableau de pointeurs (nb_words + NULL final)
    result = malloc((nb_words + 1) * sizeof(char *));
    if (!result)
        return (NULL);

    while (str[i] && j < nb_words)
    {
        while (str[i] == c)  // sauter les délimiteurs
            i++;
        len = word_len(str, c, i);
        result[j] = malloc(len + 1);
        if (!result[j])
        {
            // En cas d'erreur, libérer ce qui est déjà alloué
            while (j > 0) free(result[--j]);
            free(result);
            return (NULL);
        }
        // Copier le mot
        int k = 0;
        while (k < len)
            result[j][k++] = str[i++];
        result[j][k] = '\\0';
        j++;
    }
    result[j] = NULL;  // NULL final obligatoire
    return (result);
}`,
          output: `ft_split("hello world foo", ' ') = ["hello", "world", "foo", NULL]`,
          explanation: "ft_split est complexe car elle alloue un tableau de pointeurs ET chaque string séparément. En cas d'erreur partielle, il faut tout libérer."
        }
      ],
      exercises: [
        {
          id: "c07-m1",
          type: "fill",
          question: "Pour allouer de la mémoire pour 10 entiers, tu écris : malloc(10 * ___)",
          answer: "sizeof(int)",
          explanation: "sizeof(int) donne la taille d'un int en octets (généralement 4). 10 * sizeof(int) = 40 octets pour 10 int."
        },
        {
          id: "c07-m2",
          type: "mcq",
          question: "Que faut-il TOUJOURS faire après malloc() ?",
          options: [
            "Appeler free() immédiatement",
            "Vérifier si le retour est NULL",
            "Initialiser la mémoire à 0",
            "Appeler sizeof()"
          ],
          answer: "Vérifier si le retour est NULL",
          explanation: "malloc() peut retourner NULL si plus de mémoire disponible. Utiliser un pointeur NULL sans vérification → segfault ou comportement indéfini."
        },
        {
          id: "c07-m3",
          type: "output",
          question: "Pour dupliquer la string \"bonjour\" (7 chars), combien d'octets faut-il allouer ?",
          options: ["7", "8", "14", "6"],
          answer: "8",
          explanation: "strlen(\"bonjour\") = 7, mais il faut 7+1 = 8 octets pour inclure le \\0 final."
        }
      ],
      traps: [
        "Oublier +1 pour le \\0 dans malloc(strlen(s) + 1) — buffer overflow !",
        "Ne pas vérifier si malloc retourne NULL — segfault garanti si le système est à court de mémoire",
        "Oublier free() → memory leak (détecté par le moulinette à 42)",
        "free() deux fois → double free = crash (comportement indéfini)",
        "Dans ft_split, si un malloc intermédiaire échoue, libérer tous les mallocs précédents"
      ],
      tips: [
        "Règle : chaque malloc doit avoir son free() correspondant",
        "Après free(), toujours mettre le pointeur à NULL pour éviter les dangling pointers",
        "valgrind est l'outil pour détecter les memory leaks — utilise-le !"
      ]
    }
  ]
};

// ============================================================
// MODULE C09
// ============================================================
const c09: Module = {
  id: "c09",
  title: "C 09",
  subtitle: "Makefiles et organisation de projet",
  emoji: "⚙️",
  tag: "C",
  description: "Automatiser la compilation avec des Makefiles. Créer une bibliothèque statique (libft). Comprendre les règles all, clean, fclean, re.",
  subjectGuide: `## Comment lire le sujet C09

Le sujet demande de créer un Makefile. Points clés :
1. **Le nom de la bibliothèque** : libft.a
2. **Les règles obligatoires** : all, clean, fclean, re
3. **Les flags requis** : -Wall -Wextra -Werror
4. **Aucune recompilation superflue** : make ne doit pas recompiler si rien n'a changé`,
  lessons: [
    {
      id: "c09-makefile",
      title: "Makefile : automatiser la compilation",
      emoji: "🔧",
      duration: "45 min",
      difficulty: "Intermédiaire",
      theory: `## Makefile : le fichier de construction

### Pourquoi un Makefile ?
Pour compiler un projet de plusieurs fichiers, on devrait taper :
\`\`\`bash
gcc -Wall -Wextra -Werror ft_putchar.c ft_putstr.c ft_strlen.c -o programme
\`\`\`
C'est fastidieux et on recompile tout même si un seul fichier a changé.
Le Makefile automatise ça et compile **seulement ce qui a changé**.

### Syntaxe d'une règle Makefile
\`\`\`
cible: dépendances
[TAB]commande
\`\`\`
**⚠️ OBLIGATOIRE : l'indentation se fait avec une TABULATION, jamais des espaces !**

### Variables Makefile
\`\`\`makefile
NAME    = mon_programme
CC      = cc               # compilateur
CFLAGS  = -Wall -Wextra -Werror  # flags
SRCS    = main.c ft_putchar.c    # sources
OBJS    = $(SRCS:.c=.o)          # remplace .c par .o
\`\`\`

### Les règles standard de 42
- **all** : compiler tout (première règle = appelée par défaut)
- **clean** : supprimer les fichiers .o
- **fclean** : supprimer les .o ET le binaire/la bibliothèque
- **re** : fclean + all (recompilation complète)
- **.PHONY** : déclare des règles qui ne produisent pas de fichier

### Créer une bibliothèque statique (.a)
\`\`\`bash
ar rcs libft.a objet1.o objet2.o ...
\`\`\`
- **ar** : archiver — crée une archive (.a)
- **r** : remplacer les fichiers existants dans l'archive
- **c** : créer l'archive si elle n'existe pas
- **s** : créer un index pour l'édition de liens`,
      howToRead: `Pour le sujet C09, tu dois créer un Makefile qui :
1. Compile tous les .c en .o avec les flags
2. Crée libft.a avec ar rcs
3. Implémente all, clean, fclean, re
4. Ne recompile pas si les sources n'ont pas changé (géré automatiquement par make)`,
      examples: [
        {
          title: "Makefile complet pour libft",
          description: "Makefile typique demandé à 42",
          code: `# ============================================================
# Variables
# ============================================================
NAME    = libft.a
CC      = cc
CFLAGS  = -Wall -Wextra -Werror
AR      = ar rcs
RM      = rm -f

# Liste des fichiers source
SRCS    = ft_putchar.c \\
          ft_putstr.c  \\
          ft_strlen.c  \\
          ft_strcmp.c  \\
          ft_strcpy.c

# Convertit les .c en .o automatiquement
OBJS    = $(SRCS:.c=.o)

# ============================================================
# Règles
# ============================================================

# Règle par défaut (appellée par simple "make")
all: $(NAME)

# Créer la bibliothèque
$(NAME): $(OBJS)
	$(AR) $(NAME) $(OBJS)
	@echo "✓ $(NAME) créé"

# Compiler chaque .c en .o
%.o: %.c
	$(CC) $(CFLAGS) -c $< -o $@

# Supprimer les .o
clean:
	$(RM) $(OBJS)
	@echo "✓ Objets supprimés"

# Supprimer .o ET la bibliothèque
fclean: clean
	$(RM) $(NAME)
	@echo "✓ $(NAME) supprimé"

# Tout recompiler
re: fclean all

# Ces règles ne créent pas de fichiers (évite les conflits)
.PHONY: all clean fclean re`,
          explanation: "%.o: %.c est une règle de pattern : pour chaque .c, crée le .o correspondant. $< est le premier prérequis (le .c), $@ est la cible (le .o)."
        },
        {
          title: "Variables automatiques Makefile",
          description: "Les variables spéciales $@, $<, $^",
          code: `# Dans une règle Makefile :
# $@ = la cible (ce qu'on construit)
# $< = le premier prérequis
# $^ = tous les prérequis

# Exemple concret :
programme: main.o ft_put.o
	cc -o $@ $^
#           ↑ programme   ↑ main.o ft_put.o

%.o: %.c
	cc $(CFLAGS) -c $< -o $@
#                    ↑ le .c   ↑ le .o

# Équivaut à écrire explicitement :
main.o: main.c
	cc -Wall -Wextra -Werror -c main.c -o main.o`,
          explanation: "Les variables automatiques évitent la répétition. $@ et $< sont les plus utiles."
        }
      ],
      exercises: [
        {
          id: "c09-mk1",
          type: "mcq",
          question: "Quel type de caractère DOIT précéder les commandes dans un Makefile ?",
          options: ["2 espaces", "4 espaces", "Une tabulation (\\t)", "Un tiret (-)"],
          answer: "Une tabulation (\\t)",
          explanation: "Make est très strict : les commandes DOIVENT être précédées d'une tabulation (\\t), jamais d'espaces. C'est une des erreurs les plus courantes."
        },
        {
          id: "c09-mk2",
          type: "mcq",
          question: "Quelle règle supprime les .o ET la bibliothèque ?",
          options: ["clean", "fclean", "re", "purge"],
          answer: "fclean",
          explanation: "clean supprime seulement les .o. fclean (full clean) supprime les .o ET le binaire/bibliothèque. re = fclean + all."
        },
        {
          id: "c09-mk3",
          type: "fill",
          question: "La commande pour créer une archive statique libft.a depuis des .o est : ___ rcs libft.a *.o",
          answer: "ar",
          explanation: "ar (archiver) crée et gère des bibliothèques statiques. rcs : r=replace, c=create, s=index."
        }
      ],
      traps: [
        "Tabulation vs espaces : make refuse les espaces avant les commandes",
        "Ne pas déclarer .PHONY pour all/clean/fclean/re : si un fichier 'all' existe, make ne l'exécute pas",
        "Ne pas mettre $(NAME) comme dépendance de all : make ne sait pas quand recréer",
        "Oublier le \\0 dans les noms de fichiers avec des espaces"
      ],
      tips: [
        "make -n simule l'exécution sans rien faire — utile pour déboguer",
        "@echo supprime le @ avant la commande pour éviter l'affichage de la commande elle-même",
        "make re force la recompilation totale — pratique pour s'assurer que tout est clean"
      ]
    }
  ]
};

// ============================================================
// MODULE C03
// ============================================================
const c03: Module = {
  id: "c03",
  title: "C 03",
  subtitle: "Comparaison et concaténation de strings",
  emoji: "🔗",
  tag: "C",
  description: "Comparer des strings (strcmp, strncmp) et les concaténer (strcat, strncat, strlcat).",
  subjectGuide: `## Comment lire C03
Les fonctions de C03 manipulent deux strings : une source et une destination.
Pour strcmp/strncmp : lis la man page — la valeur de retour n'est pas 0/1 mais une différence de caractères.
Pour strcat/strncat : la destination doit déjà être une string valide (terminée par \\0).`,
  lessons: [
    {
      id: "c03-strcomp",
      title: "Comparer et concaténer des strings",
      emoji: "⚖️",
      duration: "35 min",
      difficulty: "Intermédiaire",
      theory: `## ft_strcmp et ft_strcat

### ft_strcmp : comparer deux strings
\`\`\`c
int ft_strcmp(char *s1, char *s2)
\`\`\`
Compare caractère par caractère :
- Retourne **0** si s1 == s2
- Retourne **< 0** si s1 < s2 (lexicographiquement)
- Retourne **> 0** si s1 > s2

La valeur exacte : **s1[i] - s2[i]** à l'endroit de la première différence.
Note : strcmp("abc", "abc") = 0, strcmp("abc", "abd") = -1 ('c'-'d'=-1).

### ft_strcat : concaténer
Ajoute src à la fin de dst. dst doit avoir assez de place !
\`\`\`c
char buf[20] = "hello";
ft_strcat(buf, " world");
// buf = "hello world"
\`\`\`

### ft_strlcat : concaténation sécurisée
Concatène au plus dstsize-strlen(dst)-1 caractères. Retourne strlen(src)+strlen(dst_initial).`,
      howToRead: "",
      examples: [
        {
          title: "ft_strcmp",
          description: "Comparer deux strings caractère par caractère",
          code: `int     ft_strcmp(char *s1, char *s2)
{
    int i;

    i = 0;
    while (s1[i] && s2[i] && s1[i] == s2[i])
        i++;
    return ((unsigned char)s1[i] - (unsigned char)s2[i]);
}

// strcmp("abc", "abc") = 0
// strcmp("abc", "abd") = -1  ('c'=99, 'd'=100, 99-100=-1)
// strcmp("b", "a")    = 1   ('b'=98, 'a'=97, 98-97=1)`,
          explanation: "La boucle avance tant que les caractères sont égaux ET non-nuls. On retourne la différence du premier caractère différent."
        },
        {
          title: "ft_strcat",
          description: "Concaténer une string à la fin d'une autre",
          code: `char    *ft_strcat(char *dest, char *src)
{
    int i = 0;
    int j = 0;

    // 1. Aller à la fin de dest (trouver le \\0)
    while (dest[i])
        i++;

    // 2. Copier src après le \\0 de dest
    while (src[j])
    {
        dest[i] = src[j];
        i++;
        j++;
    }
    dest[i] = '\\0';  // terminer
    return (dest);
}`,
          explanation: "On va d'abord à la fin de dest (son \\0), puis on y copie src. Le \\0 de dest est écrasé et un nouveau \\0 est ajouté à la fin."
        }
      ],
      exercises: [
        {
          id: "c03-e1",
          type: "output",
          question: "Que retourne ft_strcmp(\"abc\", \"abc\") ?",
          options: ["1", "0", "-1", "3"],
          answer: "0",
          explanation: "Les deux strings sont identiques. La boucle avance jusqu'au \\0. On retourne '\\0' - '\\0' = 0."
        },
        {
          id: "c03-e2",
          type: "mcq",
          question: "Avant d'utiliser ft_strcat(dest, src), quelle condition doit être vraie ?",
          options: [
            "dest doit être NULL",
            "dest doit avoir assez d'espace pour dest+src+\\0",
            "src doit être plus courte que dest",
            "Les deux doivent avoir la même longueur"
          ],
          answer: "dest doit avoir assez d'espace pour dest+src+\\0",
          explanation: "strcat écrit après la fin de dest. Si dest n'est pas assez grand, on écrit en dehors du tableau = buffer overflow = undefined behavior."
        }
      ],
      traps: [
        "strcmp retourne 0 pour égalité — beaucoup de débutants font if (strcmp(s1,s2)) pour tester l'égalité, mais 0 = faux en C !",
        "strcat sans vérification de taille → buffer overflow (vulnérabilité de sécurité classique)",
        "strlcat a une signature différente de strcat — lis la man page"
      ],
      tips: [
        "Pour tester l'égalité : if (ft_strcmp(s1, s2) == 0)",
        "Préfère strlcat à strcat en production — plus sûre"
      ]
    }
  ]
};

// ============================================================
// MODULE C04
// ============================================================
const c04: Module = {
  id: "c04",
  title: "C 04",
  subtitle: "strlen, putnbr, atoi — nombres et strings",
  emoji: "🔢",
  tag: "C",
  description: "Convertir entre nombres et strings. ft_strlen, ft_putnbr, ft_atoi : les bases de la conversion numérique.",
  subjectGuide: `## Comment lire C04
ft_putnbr doit gérer les cas : 0, négatifs, INT_MIN (-2147483648).
ft_atoi doit gérer : espaces en début, signe +/-, overflow (comportement non-défini selon le sujet).`,
  lessons: [
    {
      id: "c04-numbers",
      title: "Conversion nombres/strings",
      emoji: "🔄",
      duration: "40 min",
      difficulty: "Intermédiaire",
      theory: `## Afficher et lire des nombres

### ft_putnbr : afficher un entier
L'idée : extraire les chiffres un par un.
42 → afficher '4' puis '2'.
Méthode : division récursive. 42/10=4 (reste 2), 4/10=0 (reste 4).
On affiche les chiffres dans l'ordre en utilisant la récursion.

### Cas spécial : INT_MIN
INT_MIN = -2147483648. Son opposé (2147483648) ne rentre pas dans un int !
Solution : utiliser un long, ou traiter INT_MIN en premier.

### ft_atoi : lire un entier depuis une string
Parcourir la string :
1. Sauter les espaces blancs (space, \\t, \\n, \\r, \\f, \\v)
2. Lire le signe optionnel (+ ou -)
3. Lire les chiffres : result = result * 10 + (c - '0')`,
      howToRead: "",
      examples: [
        {
          title: "ft_putnbr",
          description: "Afficher un entier avec write()",
          code: `#include <unistd.h>

void    ft_putnbr(int nb)
{
    char c;

    // Cas négatif
    if (nb < 0)
    {
        write(1, "-", 1);
        if (nb == -2147483648)   // INT_MIN : cas spécial
        {
            write(1, "2147483648", 10);
            return ;
        }
        nb = -nb;
    }
    // Récursion pour les chiffres
    if (nb >= 10)
        ft_putnbr(nb / 10);    // afficher les chiffres avant
    c = (nb % 10) + '0';       // dernier chiffre
    write(1, &c, 1);
}`,
          explanation: "La récursion affiche les chiffres de gauche à droite. Pour 42 : appel avec 4 (affiche '4'), puis affiche '2'."
        },
        {
          title: "ft_atoi",
          description: "Convertir une string en entier",
          code: `int     ft_atoi(const char *str)
{
    int result = 0;
    int sign   = 1;
    int i      = 0;

    // 1. Sauter les espaces
    while (str[i] == ' '  || str[i] == '\\t' ||
           str[i] == '\\n' || str[i] == '\\r' ||
           str[i] == '\\f' || str[i] == '\\v')
        i++;

    // 2. Signe
    if (str[i] == '+' || str[i] == '-')
    {
        if (str[i] == '-')
            sign = -1;
        i++;
    }

    // 3. Chiffres
    while (str[i] >= '0' && str[i] <= '9')
    {
        result = result * 10 + (str[i] - '0');
        i++;
    }

    return (result * sign);
}`,
          explanation: "str[i] - '0' convertit le char ASCII en chiffre. result * 10 décale les chiffres existants vers la gauche."
        }
      ],
      exercises: [
        {
          id: "c04-e1",
          type: "fill",
          question: "Pour convertir le char '7' en entier 7 : '7' ___ '0'",
          answer: "-",
          explanation: "'7'=55, '0'=48. 55-48=7. Le trick ASCII pour convertir un chiffre char en int."
        },
        {
          id: "c04-e2",
          type: "output",
          question: "ft_atoi(\"   -42abc\") retourne :",
          options: ["42", "-42", "0", "Erreur"],
          answer: "-42",
          explanation: "atoi saute les espaces, lit le signe -, lit 42, s'arrête à 'a' (non-chiffre). Résultat : -42."
        }
      ],
      traps: [
        "ft_putnbr(-2147483648) : -INT_MIN n'existe pas en int — overflow ! Traiter en cas spécial",
        "ft_atoi(\"99999999999\") : overflow silencieux — comportement non-défini (acceptable à la Piscine)",
        "Oublier les espaces blancs dans atoi (\\t, \\n, etc.)"
      ],
      tips: [
        "Teste ft_putnbr(0), ft_putnbr(-1), ft_putnbr(-2147483648) — les cas limites",
        "atoi s'arrête au premier caractère non-numérique après les chiffres — c'est normal"
      ]
    }
  ]
};

// ============================================================
// MODULE C06
// ============================================================
const c06: Module = {
  id: "c06",
  title: "C 06",
  subtitle: "argc, argv — arguments de programme",
  emoji: "⌨️",
  tag: "C",
  description: "Utiliser les arguments passés au programme. Comprendre argc (nombre d'arguments) et argv (tableau de strings).",
  subjectGuide: `## Comment lire C06
Le main avec arguments : int main(int argc, char **argv).
argc = nombre d'arguments (incluant le nom du programme).
argv[0] = nom du programme, argv[1] = premier argument, etc.
Exercice typique : afficher chaque argument sur une ligne.`,
  lessons: [
    {
      id: "c06-args",
      title: "argc et argv : arguments du programme",
      emoji: "📋",
      duration: "30 min",
      difficulty: "Débutant",
      theory: `## Arguments de ligne de commande

Quand tu lances \`./programme arg1 arg2\`, le système passe ces arguments au main :
\`\`\`c
int main(int argc, char **argv)
\`\`\`
- \`argc\` (argument count) : nombre d'arguments **y compris le nom du programme**
- \`argv\` (argument vector) : tableau de strings, argv[argc] = NULL

\`\`\`
./mon_prog hello 42
argc = 3
argv[0] = "./mon_prog"
argv[1] = "hello"
argv[2] = "42"
argv[3] = NULL
\`\`\`

### Parcourir les arguments
\`\`\`c
int i = 1;  // commence à 1 (pas 0 = nom du programme)
while (i < argc)
{
    ft_putstr(argv[i]);
    ft_putchar('\\n');
    i++;
}
\`\`\``,
      howToRead: "",
      examples: [
        {
          title: "ft_print_program_name et ft_print_params",
          description: "Afficher les arguments du programme",
          code: `#include <unistd.h>

// Afficher une string
void    ft_putstr(char *s)
{
    int i = 0;
    while (s[i])
        write(1, &s[i++], 1);
}

// Afficher le nom du programme (argv[0])
void    ft_print_program_name(int argc, char **argv)
{
    (void)argc;   // évite le warning "unused parameter"
    ft_putstr(argv[0]);
    write(1, "\\n", 1);
}

// Afficher tous les paramètres (sauf le nom)
void    ft_print_params(int argc, char **argv)
{
    int i = 1;

    while (i < argc)
    {
        ft_putstr(argv[i]);
        write(1, "\\n", 1);
        i++;
    }
}

// ./prog hello world → affiche:
// hello
// world`,
          explanation: "argv[0] est toujours le nom du programme. Les vrais arguments commencent à argv[1]."
        }
      ],
      exercises: [
        {
          id: "c06-e1",
          type: "fill",
          question: "Si tu lances ./prog a b c, quelle est la valeur de argc ?",
          answer: "4",
          explanation: "argc compte le programme lui-même + les arguments : ./prog, a, b, c = 4."
        },
        {
          id: "c06-e2",
          type: "mcq",
          question: "Si argc=1, que signifie-t-il ?",
          options: [
            "Le programme a 1 argument",
            "Le programme a été lancé sans arguments (seulement son nom)",
            "Il y a une erreur",
            "argv[0] est NULL"
          ],
          answer: "Le programme a été lancé sans arguments (seulement son nom)",
          explanation: "argc est toujours >= 1 car argv[0] est le nom du programme. argc=1 → aucun argument supplémentaire."
        }
      ],
      traps: [
        "Oublier que argv[0] est le nom du programme — commencer l'affichage à i=1",
        "argc=0 n'arrive pratiquement jamais en pratique (mais peut arriver via execve)"
      ],
      tips: [
        "(void)argc quand argc n'est pas utilisé évite le warning 'unused parameter'",
        "argv[argc] == NULL — on peut aussi boucler while (argv[i]) au lieu de while (i < argc)"
      ]
    }
  ]
};

// ============================================================
// MODULE C08
// ============================================================
const c08: Module = {
  id: "c08",
  title: "C 08",
  subtitle: "Headers, #define, structures",
  emoji: "📄",
  tag: "C",
  description: "Créer des fichiers .h, utiliser #define pour les constantes, déclarer des structures (struct).",
  subjectGuide: `## Comment lire C08
C08 demande de créer des fichiers .h (headers).
Points clés :
1. Toujours utiliser des garde-fous : #ifndef NOM_H / #define NOM_H / #endif
2. Les prototypes dans les .h se terminent par ;
3. #define pour les constantes (pas de type, juste une substitution textuelle)`,
  lessons: [
    {
      id: "c08-headers",
      title: "Headers et structures",
      emoji: "📋",
      duration: "35 min",
      difficulty: "Intermédiaire",
      theory: `## Fichiers .h : organiser son code

### Pourquoi des headers ?
Quand tu as plusieurs fichiers .c qui utilisent les mêmes fonctions, tu as besoin que chaque fichier connaisse les prototypes. On centralise ça dans un fichier .h.

### Structure d'un .h
\`\`\`c
#ifndef MON_HEADER_H   // garde-fou : évite l'inclusion multiple
#define MON_HEADER_H

#include <unistd.h>    // inclure les headers système nécessaires

#define TAILLE_MAX  100    // constante
#define PI          3.14159

// Prototypes de fonctions
void    ft_putchar(char c);
int     ft_strlen(char *s);

// Déclaration d'un type struct
typedef struct s_point
{
    int x;
    int y;
}   t_point;

#endif
\`\`\`

### #define
Substitution textuelle effectuée par le préprocesseur avant compilation.
\`\`\`c
#define TAILLE 10
int arr[TAILLE];  // devient : int arr[10];
\`\`\`

### struct
Regrouper plusieurs variables sous un même nom :
\`\`\`c
typedef struct s_personne
{
    char    nom[50];
    int     age;
}   t_personne;

t_personne p;
p.age = 25;
\`\`\``,
      howToRead: "",
      examples: [
        {
          title: "Créer un fichier .h complet",
          description: "Header bien formé avec garde-fous",
          code: `/* ft_print.h */
#ifndef FT_PRINT_H
# define FT_PRINT_H

# include <unistd.h>

/* Constantes */
# define BUFFER_SIZE  4096
# define MAX_INT      2147483647

/* Prototypes */
void    ft_putchar(char c);
void    ft_putstr(char *s);
void    ft_putnbr(int n);
int     ft_strlen(char *s);

/* Structure point 2D */
typedef struct s_point
{
    int x;
    int y;
}   t_point;

#endif`,
          explanation: "Les garde-fous #ifndef/#define/#endif évitent que le header soit inclus deux fois dans la même unité de compilation (ce qui causerait des erreurs de redéfinition)."
        }
      ],
      exercises: [
        {
          id: "c08-e1",
          type: "mcq",
          question: "Pourquoi utilise-t-on #ifndef / #define / #endif dans un header ?",
          options: [
            "Pour des raisons de performance",
            "Pour éviter l'inclusion multiple qui causerait des erreurs de redéfinition",
            "C'est une obligation syntaxique du C",
            "Pour cacher le code"
          ],
          answer: "Pour éviter l'inclusion multiple qui causerait des erreurs de redéfinition",
          explanation: "Si A.c inclut B.h et C.h, et que C.h inclut B.h aussi, sans garde-fous, B.h serait inclus deux fois → redéfinition des prototypes → erreur de compilation."
        }
      ],
      traps: [
        "Oublier les garde-fous → 'redefinition' errors",
        "#define sans valeur → substitution par rien (souvent utilisé pour les garde-fous)",
        "Les struct ne peuvent pas avoir de méthodes en C (c'est C++)"
      ],
      tips: [
        "Convention : NOM_DU_FICHIER_H en majuscules pour le garde-fou",
        "typedef struct s_nom { ... } t_nom; — s_ pour struct, t_ pour typedef"
      ]
    }
  ]
};

// ============================================================
// MODULE RUSH 01
// ============================================================
const rush01: Module = {
  id: "rush01",
  title: "Rush 01",
  subtitle: "Skyscraper puzzle — backtracking",
  emoji: "🏙️",
  tag: "Rush",
  description: "Un puzzle de grille : placer des gratte-ciels de 1 à N dans une grille NxN. Utiliser le backtracking pour trouver la solution.",
  subjectGuide: `## Comment lire le sujet Rush 01

Le sujet présente une grille NxN où tu dois placer des chiffres de 1 à N.
**Contraintes :**
1. Chaque ligne contient exactement les chiffres 1 à N (une seule fois chacun)
2. Chaque colonne contient exactement les chiffres 1 à N (une seule fois chacun)
3. Les indices sur les bords indiquent combien de gratte-ciels sont "visibles"

**"Visible"** : un gratte-ciel de hauteur h est visible depuis le bord si tous les gratte-ciels avant lui (depuis le bord) sont plus petits que h.

**Stratégie :**
1. Comprendre les contraintes (lire plusieurs fois)
2. Implémenter le vérificateur de contraintes
3. Implémenter le backtracking (placer, vérifier, continuer ou revenir)`,
  lessons: [
    {
      id: "rush01-backtracking",
      title: "Backtracking : résoudre des puzzles",
      emoji: "🧩",
      duration: "60 min",
      difficulty: "Avancé",
      theory: `## Backtracking : l'exploration exhaustive intelligente

### Le principe
Le backtracking explore toutes les solutions possibles, mais **abandonne tôt** les chemins qui ne peuvent pas mener à une solution valide.

**Algorithme général :**
\`\`\`
function solve(état):
    si état est complet et valide:
        retourner SUCCÈS
    pour chaque choix possible:
        appliquer le choix
        si solve(état) = SUCCÈS:
            retourner SUCCÈS
        défaire le choix (backtrack)
    retourner ÉCHEC
\`\`\`

### Le puzzle Skyscraper
Grille NxN où chaque case contient un nombre de 1 à N.
Les indices sur les bords = nombre de gratte-ciels visibles depuis ce bord.

\`\`\`
     [3][2][1][2]
  [2] 1  2  3  4  [2]
  [3] 2  1  4  3  [1]
  [1] 4  3  1  2  [3]
  [2] 3  4  2  1  [2]
     [2][3][1][3]
\`\`\`

### Visibilité : l'algorithme
Depuis le bord gauche de la ligne [1, 2, 3, 4] avec indice 3 :
- Voit 1 (1er = toujours visible)
- Voit 2 (2 > 1, plus grand que tout ce qui précède)
- Voit 3 (3 > 2, plus grand que tout ce qui précède)
- Ne voit pas 4 (FAUX ! 4 > 3, visible aussi)
En fait : 4 gratte-ciels visibles depuis la gauche de [1,2,3,4].

### Structure du code
\`\`\`
solve(grille, ligne, colonne)
    → trouver la prochaine case vide
    → pour chaque valeur de 1 à N:
        → si la valeur est valide à cette position:
            → placer la valeur
            → appeler solve(grille, ...)
            → si succès → retourner 1
            → sinon → retirer la valeur (backtrack)
    → retourner 0 (aucune valeur ne fonctionne ici)
\`\`\``,
      howToRead: `Le sujet du Rush 01 donne :
- Le format d'entrée (les indices sur les bords)
- Le format de sortie (la grille ou "Error")
- Ton programme doit lire les indices depuis argv et afficher la grille solution.`,
      examples: [
        {
          title: "Vérification de visibilité",
          description: "Compter les gratte-ciels visibles depuis un bord",
          code: `// Compte les gratte-ciels visibles dans un tableau
// depuis l'index start en allant vers end
int     count_visible(int *line, int n, int start, int dir)
{
    int visible = 0;
    int max = 0;
    int i = start;

    while (i >= 0 && i < n)
    {
        if (line[i] > max)  // plus grand que tout ce qui précède
        {
            max = line[i];
            visible++;
        }
        i += dir;  // dir=1 pour gauche→droite, dir=-1 pour droite→gauche
    }
    return (visible);
}

// line=[3,1,2,4], n=4 :
// i=0: 3>0, max=3, visible=1
// i=1: 1<3, rien
// i=2: 2<3, rien
// i=3: 4>3, max=4, visible=2
// retourne 2`,
          explanation: "Un gratte-ciel est visible si sa hauteur dépasse le maximum de tous ceux qu'on a déjà vus en venant du bord."
        },
        {
          title: "Backtracking pour la grille",
          description: "Structure de la résolution récursive",
          code: `#define N 4  // taille de la grille

int     is_valid_placement(int grid[N][N], int row, int col, int val)
{
    // Vérifier la ligne : pas de doublon
    for (int c = 0; c < N; c++)
        if (grid[row][c] == val)
            return (0);

    // Vérifier la colonne : pas de doublon
    for (int r = 0; r < N; r++)
        if (grid[r][col] == val)
            return (0);

    return (1);
}

int     solve(int grid[N][N], int clues[4*N], int row, int col)
{
    int next_row, next_col;

    // Grille remplie : vérifier toutes les contraintes de visibilité
    if (row == N)
        return (check_all_clues(grid, clues));

    // Calculer la case suivante
    next_col = (col + 1) % N;
    next_row = row + (col == N - 1 ? 1 : 0);

    // Essayer chaque valeur de 1 à N
    for (int val = 1; val <= N; val++)
    {
        if (is_valid_placement(grid, row, col, val))
        {
            grid[row][col] = val;     // PLACER
            if (solve(grid, clues, next_row, next_col))
                return (1);           // SUCCÈS → propager
            grid[row][col] = 0;       // BACKTRACK → effacer
        }
    }
    return (0);  // aucune valeur ne fonctionne
}`,
          explanation: "Le backtracking : placer une valeur, continuer récursivement, si échec → effacer et essayer la valeur suivante."
        }
      ],
      exercises: [
        {
          id: "rush01-e1",
          type: "mcq",
          question: "Dans le backtracking, que signifie 'backtracker' ?",
          options: [
            "Aller au début du programme",
            "Défaire le dernier choix et essayer une autre option",
            "Vérifier toutes les contraintes",
            "Allouer plus de mémoire"
          ],
          answer: "Défaire le dernier choix et essayer une autre option",
          explanation: "Backtracker = annuler le choix qui mène à une impasse, pour essayer la prochaine option. C'est le 'retour en arrière'."
        },
        {
          id: "rush01-e2",
          type: "output",
          question: "Combien de gratte-ciels sont visibles depuis la gauche de [2, 4, 1, 3] ?",
          options: ["1", "2", "3", "4"],
          answer: "2",
          explanation: "2 (visible, max=2), 4 (>2 visible, max=4), 1 (<4 non visible), 3 (<4 non visible). Total = 2 visibles."
        }
      ],
      traps: [
        "Oublier de remettre grid[row][col] = 0 lors du backtrack",
        "Vérifier la visibilité seulement quand la grille est complète (sinon on vérifie des lignes incomplètes)",
        "Les indices dans le sujet peuvent être dans un ordre précis — lis bien (top, right, bottom, left ou autre)"
      ],
      tips: [
        "Commence par une grille 4x4 fixe pour tester",
        "Affiche la grille à chaque étape du backtracking pour visualiser l'algorithme",
        "L'ordre de placement (ligne par ligne, colonne par colonne) est le plus simple"
      ]
    }
  ]
};

// ============================================================
// MODULE SHELL 01
// ============================================================
const shell01: Module = {
  id: "shell01",
  title: "Shell 01",
  subtitle: "Scripts shell, variables, commandes avancées",
  emoji: "🐚",
  tag: "Shell",
  description: "Écrire des scripts shell avec des variables, des boucles, et des commandes comme find, grep, awk, sed.",
  subjectGuide: `## Comment lire le sujet Shell 01
Les exercices Shell 01 demandent des scripts bash.
La première ligne DOIT être #!/bin/bash (shebang).
Lis bien ce que le script doit recevoir en entrée et ce qu'il doit afficher.`,
  lessons: [
    {
      id: "shell01-scripts",
      title: "Scripts shell : variables et structures de contrôle",
      emoji: "📜",
      duration: "40 min",
      difficulty: "Intermédiaire",
      theory: `## Scripts shell avancés

### Variables shell
\`\`\`bash
NOM="Alice"         # assigner (pas d'espaces autour de =)
echo $NOM           # utiliser une variable
echo $\{NOM}         # forme explicite (recommandée)
echo "Bonjour $NOM" # dans les guillemets doubles : interpolation
echo 'Bonjour $NOM' # dans les guillemets simples : PAS d'interpolation
\`\`\`

### Variables spéciales
\`\`\`bash
$0  = nom du script
$1, $2, ... = arguments
$# = nombre d'arguments
$? = code de retour de la dernière commande (0=succès, autre=erreur)
$$ = PID du processus courant
\`\`\`

### Structures de contrôle
\`\`\`bash
# if
if [ condition ]; then
    commandes
elif [ autre_condition ]; then
    commandes
else
    commandes
fi

# for
for var in liste; do
    commandes
done

# while
while [ condition ]; do
    commandes
done
\`\`\`

### Commandes avancées
- \`grep\` : chercher des patterns dans du texte
- \`sed\` : stream editor — modifier du texte
- \`awk\` : traitement de colonnes
- \`find\` : chercher des fichiers
- \`wc\` : word count (lignes, mots, octets)`,
      howToRead: "",
      examples: [
        {
          title: "Script avec arguments",
          description: "Utiliser $1, $2, $# dans un script",
          code: `#!/bin/bash

# Vérifier qu'on a bien 2 arguments
if [ $# -ne 2 ]; then
    echo "Usage: $0 <nom> <age>"
    exit 1
fi

NOM=$1
AGE=$2

echo "Bonjour $NOM, tu as $AGE ans."

# Comparaisons numériques : -eq, -ne, -lt, -le, -gt, -ge
if [ $AGE -ge 18 ]; then
    echo "Tu es majeur."
else
    echo "Tu es mineur."
fi`,
          explanation: "$# est le nombre d'arguments. [ $# -ne 2 ] vérifie que ce n'est pas égal à 2. -ne = not equal (pour les nombres)."
        },
        {
          title: "find et grep : chercher",
          description: "Trouver des fichiers et filtrer du texte",
          code: `#!/bin/bash

# Trouver tous les fichiers .c dans le répertoire courant
find . -name "*.c"

# Trouver les fichiers modifiés il y a moins de 5 minutes
find . -mmin -5

# Chercher "ft_putchar" dans tous les .c
grep "ft_putchar" *.c

# Compter les occurrences
grep -c "ft_putchar" *.c

# Chercher récursivement dans tous les sous-dossiers
grep -r "malloc" .

# Compter les lignes d'un fichier
wc -l fichier.c

# Afficher seulement la 3ème colonne (séparateur espace)
echo "1 2 3 4" | awk '{print $3}'  # affiche: 3`,
          explanation: "find et grep sont les outils de recherche Unix les plus puissants. Maîtrise-les !"
        }
      ],
      exercises: [
        {
          id: "sh01-e1",
          type: "fill",
          question: "Dans un script bash, comment récupérer le premier argument passé au script ?",
          answer: "$1",
          explanation: "$1 est le premier argument. $0 est le nom du script. $# est le nombre d'arguments."
        },
        {
          id: "sh01-e2",
          type: "mcq",
          question: "Quelle est la première ligne obligatoire d'un script bash ?",
          options: ["#!/bin/bash", "#bash", "start bash", "#!/usr/bin/bash"],
          answer: "#!/bin/bash",
          explanation: "Le shebang (#!) indique quel interpréteur utiliser. #!/bin/bash dit au système d'utiliser bash pour exécuter ce script."
        }
      ],
      traps: [
        "Pas d'espaces autour de = dans une assignation : NOM='Alice' et pas NOM = 'Alice'",
        "Guillemets simples = pas d'interpolation. Guillemets doubles = interpolation des variables.",
        "chmod +x script.sh avant de l'exécuter avec ./script.sh"
      ],
      tips: [
        "bash -x script.sh exécute le script en mode debug (affiche chaque commande avant exécution)",
        "ShellCheck est un linter pour détecter les erreurs dans les scripts bash"
      ]
    }
  ]
};

// ============================================================
// ASSEMBLAGE DE TOUS LES MODULES
// ============================================================
const rawModules: Module[] = [
  shell00,
  shell01,
  c00,
  c01,
  c02,
  c03,
  c04,
  c05,
  c06,
  c07,
  c08,
  c09,
  rush01,
];

// Fusionne les solutions réelles et les exercices bonus dans chaque module
export const modules: Module[] = rawModules.map((mod) => {
  const modSolutions = modulesSolutions[mod.id];
  const modBonus = bonusExercises[mod.id];
  if (!modSolutions && !modBonus) return mod;
  return {
    ...mod,
    lessons: mod.lessons.map((lesson) => {
      const lessonSolutions = modSolutions?.[lesson.id];
      const lessonBonus = modBonus?.[lesson.id];
      return {
        ...lesson,
        examples: lessonSolutions ? [...lesson.examples, ...lessonSolutions] : lesson.examples,
        exercises: lessonBonus ? [...lesson.exercises, ...lessonBonus] : lesson.exercises,
      };
    }),
  };
});
