import type { CodeExample } from "./courseData";

// Solutions réelles de la Piscine C 1337 — organisées par module et leçon
// Source : 1337_Piscine-main (anajmi, promotion juin 2021)
export const modulesSolutions: Record<string, Record<string, CodeExample[]>> = {

  // ═══════════════════════════════════════════════════════════════
  // C 00 — Fonctions de base, write(), boucles
  // ═══════════════════════════════════════════════════════════════
  "c00": {
    "c00-write": [
      {
        title: "✅ Solution — ft_putchar (ex00)",
        description: "Affiche un caractère sur stdout en utilisant write()",
        code: `#include <unistd.h>

void	ft_putchar(char c)
{
	write(1, &c, 1);
}`,
        output: `(affiche le caractère passé en paramètre)`,
        explanation: "Exactement 1 ligne utile : write(1, &c, 1). fd=1 pour stdout, &c est l'adresse du caractère, 1 = un seul octet."
      },
      {
        title: "✅ Solution — ft_print_alphabet (ex01)",
        description: "Affiche l'alphabet en minuscules de a à z",
        code: `#include <unistd.h>

void	print(char c)
{
	write(1, &c, 1);
}

void	ft_print_alphabet(void)
{
	char	a;

	a = 'a';
	while (a <= 'z')
	{
		print(a);
		a++;
	}
}`,
        output: `abcdefghijklmnopqrstuvwxyz`,
        explanation: "La variable a commence à 'a' (ASCII 97) et on incrémente jusqu'à 'z' (ASCII 122). Une fonction helper print() évite de répéter write()."
      },
      {
        title: "✅ Solution — ft_print_reverse_alphabet (ex02)",
        description: "Affiche l'alphabet de z à a",
        code: `#include <unistd.h>

void	print(char c)
{
	write(1, &c, 1);
}

void	ft_print_reverse_alphabet(void)
{
	char	z;

	z = 'z';
	while (z >= 'a')
	{
		print(z);
		z--;
	}
}`,
        output: `zyxwvutsrqponmlkjihgfedcba`,
        explanation: "On part de 'z' et on décrémente. La condition z >= 'a' arrête la boucle après avoir affiché 'a'."
      },
      {
        title: "✅ Solution — ft_print_numbers (ex03)",
        description: "Affiche tous les chiffres de 0 à 9",
        code: `#include <unistd.h>

void	print(char c)
{
	write(1, &c, 1);
}

void	ft_print_numbers(void)
{
	int	n;

	n = 48;
	while (n < 58)
	{
		print(n);
		n++;
	}
}`,
        output: `0123456789`,
        explanation: "n commence à 48 (ASCII de '0') et monte jusqu'à 57 (ASCII de '9'). On peut aussi écrire n = '0' et n <= '9'."
      },
      {
        title: "✅ Solution — ft_is_negative (ex04)",
        description: "Affiche 'N' si négatif, 'P' sinon",
        code: `#include <unistd.h>

void	print(char c)
{
	write(1, &c, 1);
}

void	ft_is_negative(int n)
{
	if (n < 0)
		print('N');
	else if (n >= 0)
		print('P');
}`,
        output: `N  (si n < 0)\nP  (si n >= 0)`,
        explanation: "Attention : 0 est POSITIF → affiche 'P'. Le sujet dit 'strictement négatif' → P pour 0."
      },
    ],
    "c00-loops": [
      {
        title: "✅ Solution — ft_putnbr (ex07)",
        description: "Affiche un entier avec write() — gère les négatifs et INT_MIN",
        code: `#include <unistd.h>

void	print(char c)
{
	write(1, &c, 1);
}

void	ft_putnbr(int nb)
{
	if (0 <= nb && nb < 10)
	{
		print(nb + '0');
	}
	else if (10 <= nb && nb <= 2147483647)
	{
		ft_putnbr(nb / 10);
		print(nb % 10 + '0');
	}
	else if (nb == -2147483648)
		write(1, "-2147483648", 11);
	else if (-2147483648 < nb && nb < 0)
	{
		print('-');
		ft_putnbr(nb * -1);
	}
}`,
        explanation: "Cas spécial INT_MIN (-2147483648) : on ne peut pas faire -1 * INT_MIN car ça déborde. On l'affiche directement comme chaîne. Pour les autres négatifs : affiche '-' puis la valeur absolue."
      },
      {
        title: "✅ Solution — ft_print_comb (ex05)",
        description: "Affiche toutes les combinaisons de 3 chiffres croissants",
        code: `#include <unistd.h>

void	print(char c)
{
	write(1, &c, 1);
}

void	print_combo(char n1, char n2, char n3)
{
	if ((n1 != n2) && (n1 != n3) && (n2 != n3))
	{
		print(n1);
		print(n2);
		print(n3);
		if (n1 != '7')
		{
			print(',');
			print(' ');
		}
	}
}

void	ft_print_comb(void)
{
	char	n1;
	char	n2;
	char	n3;

	n1 = '0';
	while (n1 <= '7')
	{
		n2 = n1 + 1;
		while (n2 <= '8')
		{
			n3 = n2;
			while (n3 <= '9')
			{
				print_combo(n1, n2, n3);
				n3++;
			}
			n2++;
		}
		n1++;
	}
}`,
        output: `012, 013, 014, ..., 789`,
        explanation: "n2 commence à n1+1 (pas de répétition) et n3 commence à n2 (ordre croissant strict). La dernière combinaison est 789 — on n'affiche pas ', ' après elle."
      },
      {
        title: "✅ Solution — ft_print_comb2 (ex06)",
        description: "Affiche toutes les combinaisons de 2 nombres à 2 chiffres",
        code: `#include <unistd.h>

void	print(char c)
{
	write(1, &c, 1);
}

void	print_combo(int a, int b)
{
	if (a < b)
	{
		print(a / 10 + '0');
		print(a % 10 + '0');
		print(' ');
		print(b / 10 + '0');
		print(b % 10 + '0');
		if (a != 98)
		{
			print(',');
			print(' ');
		}
	}
}

void	ft_print_comb2(void)
{
	int	a;
	int	b;

	a = 0;
	while (a <= 98)
	{
		b = a + 1;
		while (b <= 99)
		{
			print_combo(a, b);
			b++;
		}
		a++;
	}
}`,
        output: `00 01, 00 02, ..., 98 99`,
        explanation: "a/10 donne le chiffre des dizaines, a%10 le chiffre des unités. On ajoute '0' pour convertir en ASCII. Dernière paire : 98 99 → pas de ', ' après."
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // C 01 — Pointeurs et tableaux
  // ═══════════════════════════════════════════════════════════════
  "c01": {
    "c01-pointers": [
      {
        title: "✅ Solution — ft_ft (ex00)",
        description: "Modifie un entier via un pointeur pour le mettre à 42",
        code: `void	ft_ft(int *nbr)
{
	*nbr = 42;
}`,
        explanation: "*nbr déréférence le pointeur : on modifie la valeur à l'adresse stockée dans nbr. C'est le principe fondamental des pointeurs : modifier une variable depuis une autre fonction."
      },
      {
        title: "✅ Solution — ft_ultimate_ft (ex01)",
        description: "9 niveaux d'indirection — un pointeur vers un pointeur vers... vers un int",
        code: `void	ft_ultimate_ft(int *********nbr)
{
	*********nbr = 42;
}`,
        explanation: "9 étoiles = 9 niveaux d'indirection. Pour accéder à la valeur finale, on déréférence 9 fois. C'est un exercice conceptuel sur la profondeur des pointeurs. En pratique, jamais au-delà de 2-3 niveaux."
      },
      {
        title: "✅ Solution — ft_swap (ex02)",
        description: "Échange les valeurs de deux entiers via leurs pointeurs",
        code: `void	ft_swap(int *a, int *b)
{
	int	c;

	c = *a;
	*a = *b;
	*b = c;
}`,
        explanation: "Sans variable temporaire c, on perdrait la valeur de *a lors de l'affectation *a = *b. Le swap à 3 lignes est le pattern classique."
      },
      {
        title: "✅ Solution — ft_div_mod (ex03)",
        description: "Retourne quotient et reste via des pointeurs de sortie",
        code: `void	ft_div_mod(int a, int b, int *div, int *mod)
{
	*div = a / b;
	*mod = a % b;
}`,
        explanation: "Quand une fonction doit retourner plusieurs valeurs, on passe des pointeurs comme paramètres de sortie. *div et *mod modifient les variables de l'appelant."
      },
      {
        title: "✅ Solution — ft_ultimate_div_mod (ex04)",
        description: "Remplace les valeurs de a et b par leur quotient et reste",
        code: `void	ft_ultimate_div_mod(int *a, int *b)
{
	int	sv;

	sv = *a;
	*a = sv / *b;
	*b = sv % *b;
}`,
        explanation: "sv sauvegarde *a avant qu'on le modifie. Sans cette sauvegarde, *b = sv % *b utiliserait le mauvais *a (déjà écrasé)."
      },
      {
        title: "✅ Solution — ft_putstr (ex05)",
        description: "Affiche une chaîne de caractères caractère par caractère",
        code: `#include <unistd.h>

void	ft_putchar(char c)
{
	write(1, &c, 1);
}

void	ft_putstr(char *str)
{
	int	i;

	i = 0;
	while (str[i] != '\\0')
	{
		ft_putchar(str[i]);
		i++;
	}
}`,
        explanation: "On itère sur le tableau de chars jusqu'au '\\0' terminal. str[i] est équivalent à *(str + i) — l'arithmétique de pointeurs."
      },
      {
        title: "✅ Solution — ft_strlen (ex06)",
        description: "Retourne la longueur d'une chaîne (sans compter le '\\0')",
        code: `int	ft_strlen(char *str)
{
	int	i;

	i = 0;
	while (str[i] != '\\0')
	{
		i++;
	}
	return (i);
}`,
        explanation: "On compte jusqu'à '\\0'. Si str = \"hello\", i atteint 5 (les indices 0,1,2,3,4 correspondent à h,e,l,l,o et '\\0' est à l'index 5). On retourne 5."
      },
      {
        title: "✅ Solution — ft_rev_int_tab (ex07)",
        description: "Inverse l'ordre des éléments d'un tableau d'entiers",
        code: `void	ft_rev_int_tab(int *tab, int size)
{
	int	inv;
	int	a;
	int	b;

	a = 0;
	b = size - 1;
	while (a < (size / 2))
	{
		inv = tab[a];
		tab[a] = tab[b];
		tab[b] = inv;
		a++;
		b--;
	}
}`,
        explanation: "Deux pointeurs : a part du début, b de la fin. On échange tab[a] et tab[b] et on rapproche les deux indices. On s'arrête à size/2 (milieu atteint)."
      },
      {
        title: "✅ Solution — ft_sort_int_tab (ex08)",
        description: "Trie un tableau d'entiers par ordre croissant (bubble sort)",
        code: `void	ft_sort_int_tab(int *tab, int size)
{
	int	save;
	int	a;

	a = 0;
	while (a < (size - 1))
	{
		if (tab[a] > tab[a + 1])
		{
			save = tab[a];
			tab[a] = tab[a + 1];
			tab[a + 1] = save;
			a = -1;
		}
		a++;
	}
}`,
        explanation: "Bubble sort simplifié : dès qu'on trouve deux éléments dans le mauvais ordre, on les échange et on repart du début (a = -1 puis a++ → a = 0). Inefficace mais correct et simple."
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // C 02 — Manipulation de chaînes
  // ═══════════════════════════════════════════════════════════════
  "c02": {
    "c02-strings": [
      {
        title: "✅ Solution — ft_strcpy (ex00)",
        description: "Copie src dans dest et retourne dest",
        code: `char	*ft_strcpy(char *dest, char *src)
{
	int	i;

	i = 0;
	while (src[i] != '\\0')
	{
		dest[i] = src[i];
		i++;
	}
	dest[i] = '\\0';
	return (dest);
}`,
        explanation: "On copie chaque char de src vers dest. Après la boucle, i pointe sur le '\\0' de src — on DOIT ajouter '\\0' à dest[i] manuellement. Sinon dest n'est pas une string valide."
      },
      {
        title: "✅ Solution — ft_strncpy (ex01)",
        description: "Copie au maximum n caractères de src vers dest",
        code: `char	*ft_strncpy(char *dest, char *src, unsigned int n)
{
	unsigned int	i;

	i = 0;
	while (i < n && src[i] != '\\0')
	{
		dest[i] = src[i];
		i++;
	}
	while (i < n)
	{
		dest[i] = '\\0';
		i++;
	}
	return (dest);
}`,
        explanation: "Comportement spécial : si src est plus court que n, on REMPLIT le reste de dest avec des '\\0'. Deux boucles : 1) copier src jusqu'à n ou '\\0', 2) remplir le reste avec '\\0'."
      },
      {
        title: "✅ Solution — ft_str_is_alpha (ex02)",
        description: "Retourne 1 si tous les chars sont alphabétiques, 0 sinon",
        code: `void	check_alpha(char str, int *is_alpha_ptr)
{
	if (!('a' <= str && str <= 'z') && !('A' <= str && str <= 'Z'))
	{
		*is_alpha_ptr = 0;
	}
}

int	ft_str_is_alpha(char *str)
{
	int	i;
	int	is_alpha;
	int	*ptr;

	i = 0;
	is_alpha = 1;
	ptr = &is_alpha;
	while (str[i] != '\\0')
	{
		check_alpha(str[i], ptr);
		i++;
	}
	return (is_alpha);
}`,
        explanation: "is_alpha commence à 1 (optimiste). Si UN char n'est pas alphabétique, on le met à 0 et il ne revient jamais à 1. La chaîne vide retourne 1 (aucun char invalide trouvé)."
      },
      {
        title: "✅ Solution — ft_str_is_numeric (ex03)",
        description: "Retourne 1 si tous les chars sont des chiffres (0-9)",
        code: `void	check_digit(char str, int *is_digit_ptr)
{
	if (!('0' <= str && str <= '9'))
	{
		*is_digit_ptr = 0;
	}
}

int	ft_str_is_numeric(char *str)
{
	int	i;
	int	is_digit;
	int	*ptr;

	i = 0;
	ptr = &is_digit;
	is_digit = 1;
	while (str[i] != '\\0')
	{
		check_digit(str[i], ptr);
		i++;
	}
	return (is_digit);
}`,
        explanation: "Même pattern que ft_str_is_alpha. On vérifie que chaque char est entre '0' (48) et '9' (57)."
      },
      {
        title: "✅ Solution — ft_strupcase (ex07)",
        description: "Convertit toutes les minuscules en majuscules",
        code: `char	*ft_strupcase(char *str)
{
	int	i;

	i = 0;
	while (str[i] != '\\0')
	{
		if ('a' <= str[i] && str[i] <= 'z')
		{
			str[i] = str[i] - 32;
		}
		i++;
	}
	return (str);
}`,
        output: `"hello" → "HELLO"`,
        explanation: "En ASCII, 'a'=97 et 'A'=65. La différence est 32. Pour passer de minuscule à majuscule : soustraire 32. Pour l'inverse (ft_strlowcase) : ajouter 32."
      },
      {
        title: "✅ Solution — ft_strlowcase (ex08)",
        description: "Convertit toutes les majuscules en minuscules",
        code: `char	*ft_strlowcase(char *str)
{
	int	i;

	i = 0;
	while (str[i] != '\\0')
	{
		if ('A' <= str[i] && str[i] <= 'Z')
		{
			str[i] = str[i] + 32;
		}
		i++;
	}
	return (str);
}`,
        output: `"WORLD" → "world"`,
        explanation: "Inverse de strupcase. On ajoute 32 à chaque majuscule pour obtenir la minuscule correspondante."
      },
      {
        title: "✅ Solution — ft_strcapitalize (ex09)",
        description: "Met en majuscule le premier char de chaque mot",
        code: `char	*process(char *str)
{
	char	c;
	int		i;

	i = 0;
	if ('a' <= str[0] && str[0] <= 'z')
		str[0] = str[0] - 32;
	while (str[i + 1] != '\\0')
	{
		c = str[i];
		if (!('0' <= c && c <= '9') && !('a' <= c && c <= 'z')
			&& !('A' <= c && c <= 'Z'))
		{
			if ('a' <= str[i + 1] && str[i + 1] <= 'z')
				str[i + 1] = str[i + 1] - 32;
		}
		i++;
	}
	return (str);
}

char	*ft_strcapitalize(char *str)
{
	int	i;

	i = 0;
	while (str[i] != '\\0')
	{
		if ('A' <= str[i] && str[i] <= 'Z')
			str[i] = str[i] + 32;
		i++;
	}
	process(str);
	return (str);
}`,
        output: `"hello world 42test" → "Hello World 42test"`,
        explanation: "Stratégie en 2 passes : 1) tout mettre en minuscules, 2) mettre en majuscule le premier char et tout char qui suit un séparateur (non alphanumérique)."
      },
      {
        title: "✅ Solution — ft_strlcpy (ex10)",
        description: "Copie sécurisée : copie au plus size-1 chars et garantit '\\0'",
        code: `unsigned int	ft_strlen(char *str)
{
	unsigned int	i;

	i = 0;
	while (str[i] != '\\0')
		i++;
	return (i);
}

unsigned int	ft_strlcpy(char *dest, char *src, unsigned int size)
{
	unsigned int	i;

	i = 0;
	while (src[i] != '\\0' && i < (size - 1))
	{
		dest[i] = src[i];
		i++;
	}
	dest[i] = '\\0';
	return (ft_strlen(src));
}`,
        explanation: "strlcpy copie au plus size-1 chars et ajoute toujours '\\0'. Elle retourne la longueur de src (pas dest) — si retval >= size, il y a eu troncature. Plus sûre que strncpy."
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // C 03 — Comparaison et concaténation de chaînes
  // ═══════════════════════════════════════════════════════════════
  "c03": {
    "c03-strcomp": [
      {
        title: "✅ Solution — ft_strcmp (ex00)",
        description: "Compare deux chaînes lexicographiquement",
        code: `int	ft_strcmp(char *s1, char *s2)
{
	unsigned int	i;

	i = 0;
	while (s1[i] != '\\0' || s2[i] != '\\0')
	{
		if (s1[i] != s2[i])
		{
			return (s1[i] - s2[i]);
		}
		i++;
	}
	return (s1[i] - s2[i]);
}`,
        output: `0 si égales, <0 si s1<s2, >0 si s1>s2`,
        explanation: "On retourne la différence des valeurs ASCII au premier caractère différent. Si les chaînes sont égales jusqu'au bout, on retourne '\\0' - '\\0' = 0."
      },
      {
        title: "✅ Solution — ft_strncmp (ex01)",
        description: "Compare au maximum n caractères de deux chaînes",
        code: `int	ft_strncmp(char *s1, char *s2, unsigned int n)
{
	unsigned int	i;

	i = 0;
	while ((s1[i] != '\\0' || s2[i] != '\\0') && i < n)
	{
		if (s1[i] != s2[i])
		{
			return (s1[i] - s2[i]);
		}
		i++;
	}
	if (i != n)
	{
		return (s1[i] - s2[i]);
	}
	return (0);
}`,
        explanation: "On s'arrête au bout de n chars. Si on atteint n sans différence → retourner 0. Si une chaîne se termine avant n → continuer la comparaison avec '\\0'."
      },
      {
        title: "✅ Solution — ft_strcat (ex02)",
        description: "Concatène src à la fin de dest",
        code: `char	*ft_strcat(char *dest, char *src)
{
	unsigned int	i;
	unsigned int	a;

	i = 0;
	while (dest[i] != '\\0')
		i++;
	a = 0;
	while (src[a] != '\\0')
	{
		dest[i + a] = src[a];
		a++;
	}
	dest[i + a] = '\\0';
	return (dest);
}`,
        explanation: "Phase 1 : trouver la fin de dest (i = strlen(dest)). Phase 2 : copier src à partir de dest[i]. Ne pas oublier le '\\0' final."
      },
      {
        title: "✅ Solution — ft_strncat (ex03)",
        description: "Concatène au maximum nb chars de src à dest",
        code: `char	*ft_strncat(char *dest, char *src, unsigned int nb)
{
	unsigned int	i;
	unsigned int	a;

	i = 0;
	while (dest[i] != '\\0')
		i++;
	a = 0;
	while (src[a] != '\\0' && a < nb)
	{
		dest[i + a] = src[a];
		a++;
	}
	dest[i + a] = '\\0';
	return (dest);
}`,
        explanation: "Comme strcat mais on s'arrête après nb chars de src. On ajoute toujours '\\0' même si on a copié exactement nb chars."
      },
      {
        title: "✅ Solution — ft_strstr (ex04)",
        description: "Trouve la première occurrence de to_find dans str",
        code: `char	*ft_strstr(char *str, char *to_find)
{
	unsigned int	i;
	unsigned int	j;

	if (*to_find == '\\0')
		return (str);
	i = 0;
	while (str[i] != '\\0')
	{
		j = 0;
		while (str[i + j] == to_find[j])
		{
			if (to_find[j + 1] == '\\0')
				return (&str[i]);
			j++;
		}
		i++;
	}
	return (0);
}`,
        explanation: "Cas spécial : si to_find est vide, retourner str. Sinon, pour chaque position i dans str, vérifier si to_find commence là. On retourne l'adresse &str[i] si trouvé."
      },
      {
        title: "✅ Solution — ft_strlcat (ex05)",
        description: "Concaténation sécurisée avec limite de taille",
        code: `unsigned int	ft_strlen(char *str)
{
	unsigned int	len_dest;

	len_dest = 0;
	while (str[len_dest] != '\\0')
		len_dest++;
	return (len_dest);
}

unsigned int	ft_strlcat(char *dest, char *src, unsigned int size)
{
	unsigned int	i;
	unsigned int	len_dest;
	unsigned int	len_src;

	len_dest = ft_strlen(dest);
	len_src = ft_strlen(src);
	i = 0;
	if (size >= len_dest)
	{
		while ((src[i] != '\\0' || dest[i] != '\\0')
			&& (len_dest + i) < (size - 1))
		{
			dest[len_dest + i] = src[i];
			i++;
		}
		dest[len_dest + i] = '\\0';
	}
	else if (size < len_dest)
		return (len_src + size);
	return (len_src + len_dest);
}`,
        explanation: "strlcat retourne len_dest + len_src (taille idéale sans troncature). Si size <= len_dest, on ne peut rien copier → retourner size + len_src. Toujours '\\0'-terminé."
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // C 04 — Conversion et affichage de nombres
  // ═══════════════════════════════════════════════════════════════
  "c04": {
    "c04-numbers": [
      {
        title: "✅ Solution — ft_strlen (ex00)",
        description: "Calcule la longueur d'une chaîne",
        code: `int	ft_strlen(char *str)
{
	unsigned int	i;

	i = 0;
	while (str[i] != '\\0')
		i++;
	return (i);
}`,
        explanation: "Fonction fondamentale. On compte jusqu'au '\\0' (non inclus). Retourner int permet les comparaisons avec des entiers signés sans warning."
      },
      {
        title: "✅ Solution — ft_putnbr (ex02)",
        description: "Affiche un entier avec write() — version propre avec long",
        code: `#include <unistd.h>

void	print(char c)
{
	write(1, &c, 1);
}

void	ft_putnbr(int nb)
{
	long	i;

	i = nb;
	if (i < 0)
	{
		print('-');
		i = i * (-1);
	}
	if (i > 9)
	{
		ft_putnbr(i / 10);
		ft_putnbr(i % 10);
	}
	else
		print(i + '0');
}`,
        output: `ft_putnbr(-42) → "-42"\nft_putnbr(0)   → "0"`,
        explanation: "Astuce : convertir nb en long avant de faire *-1 évite le débordement pour INT_MIN (-2147483648). La récursion extrait les chiffres de gauche à droite."
      },
      {
        title: "✅ Solution — ft_atoi (ex03)",
        description: "Convertit une chaîne en entier (comme la libc)",
        code: `int	ft_atoi(char *str)
{
	int	a;
	int	sign;
	int	nbr;

	a = 0;
	nbr = 0;
	while (str[a] == ' ' || (9 <= str[a] && str[a] <= 13))
		a++;
	sign = 1;
	while (str[a] == '-' || str[a] == '+')
	{
		if (str[a] == '-')
			sign *= (-1);
		a++;
	}
	while ('0' <= str[a] && str[a] <= '9')
	{
		nbr *= 10;
		nbr += str[a] - '0';
		a++;
	}
	return (nbr * sign);
}`,
        output: `ft_atoi("  -42abc") → -42\nft_atoi("+123")    → 123`,
        explanation: "3 phases : 1) ignorer les espaces blancs (ASCII 9-13 = \\t\\n\\v\\f\\r), 2) lire les signes (plusieurs +/- s'annulent), 3) lire les chiffres. S'arrête au premier non-chiffre."
      },
      {
        title: "✅ Solution — ft_putnbr_base (ex04)",
        description: "Affiche un entier dans une base arbitraire (binaire, hex, etc.)",
        code: `#include <unistd.h>

int	len(char *base)
{
	int	i;

	i = 0;
	while (base[i] != '\\0')
		i++;
	if (i <= 1)
		return (0);
	return (1);
}

int	check_str(char *str)
{
	unsigned int	i;
	unsigned int	j;

	i = 0;
	while (str[i] != '\\0')
	{
		j = i + 1;
		while (str[j] != '\\0')
		{
			if (str[i] == str[i + j])
				return (0);
			j++;
		}
		i++;
	}
	return (1);
}

int	check_sign(char *base)
{
	int	i;

	i = 0;
	while (base[i] != '\\0')
	{
		if (base[i] == '+' || base[i] == '-')
			return (0);
		i++;
	}
	return (1);
}

void	ft_putnbr_base(int nbr, char *base)
{
	int	i;
	int	pass;

	pass = check_errors(base);
	i = 0;
	if (pass == 1)
	{
		while (base[i] != '\\0')
			i++;
		if (nbr / i != 0)
			ft_putnbr_base(nbr / i, base);
		write(1, &base[nbr % i], 1);
	}
}`,
        output: `ft_putnbr_base(255, "0123456789abcdef") → "ff"\nft_putnbr_base(10, "01") → "1010"`,
        explanation: "i = longueur de la base (ex: 16 pour hex). nbr % i donne l'index du char à afficher dans base. La récursion gère les chiffres de gauche à droite. On valide la base : min 2 chars, pas de doublons, pas de +/-."
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // C 05 — Récursion
  // ═══════════════════════════════════════════════════════════════
  "c05": {
    "c05-recursion": [
      {
        title: "✅ Solution — ft_iterative_factorial (ex00)",
        description: "Factorielle par boucle while — O(n)",
        code: `int	ft_iterative_factorial(int nb)
{
	int	fact;
	int	i;

	fact = 1;
	if (nb == 0 || nb == 1)
		return (fact);
	else if (nb < 0)
		return (0);
	i = 1;
	while (i <= nb)
	{
		fact = fact * i;
		i++;
	}
	return (fact);
}`,
        output: `ft_iterative_factorial(5) → 120\nft_iterative_factorial(0) → 1`,
        explanation: "0! = 1 par définition. Les négatifs retournent 0 (non défini). fact accumule le produit : 1*2*3*4*5 = 120."
      },
      {
        title: "✅ Solution — ft_recursive_factorial (ex01)",
        description: "Factorielle récursive — élégante mais attention au stack",
        code: `int	ft_recursive_factorial(int nb)
{
	int	fact;

	fact = 1;
	if (nb == 0 || nb == 1)
		return (fact);
	else if (nb < 0)
		return (0);
	return (nb * ft_recursive_factorial(nb - 1));
}`,
        output: `ft_recursive_factorial(6) → 720`,
        explanation: "Cas de base : nb <= 1 → retourner 1. Sinon : nb * (nb-1)! Chaque appel crée un stack frame. Pour nb=6 : 6 * 5 * 4 * 3 * 2 * 1 = 720."
      },
      {
        title: "✅ Solution — ft_fibonacci (ex04)",
        description: "Nième nombre de Fibonacci (récursif)",
        code: `int	ft_fibonacci(int index)
{
	if (index < 0)
		return (-1);
	else if (index == 0)
		return (0);
	else if (0 < index && index <= 2)
		return (1);
	else
		return (ft_fibonacci(index - 1) + ft_fibonacci(index - 2));
}`,
        output: `ft_fibonacci(0) → 0\nft_fibonacci(1) → 1\nft_fibonacci(10) → 55`,
        explanation: "Séquence : 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55... Cas spéciaux : index<0 → -1, index=0 → 0, index=1 ou 2 → 1. La complexité est O(2^n) — très lent pour de grands index."
      },
      {
        title: "✅ Solution — ft_sqrt (ex05)",
        description: "Retourne la racine carrée entière, ou 0 si nb n'est pas un carré parfait",
        code: `int	ft_sqrt(int nb)
{
	int	i;

	i = 1;
	if (nb <= 0)
		return (0);
	while (i * i <= nb && i < 46341)
	{
		if (i * i == nb)
			return (i);
		i++;
	}
	return (0);
}`,
        output: `ft_sqrt(25) → 5\nft_sqrt(26) → 0`,
        explanation: "46341 = floor(sqrt(INT_MAX)). Au-delà, i*i déborderait un int. On teste si i*i == nb exactement. Si aucun i ne satisfait la condition → 0 (pas un carré parfait)."
      },
      {
        title: "✅ Solution — ft_is_prime (ex06)",
        description: "Retourne 1 si nb est premier, 0 sinon",
        code: `int	ft_is_prime(int nb)
{
	int	i;

	i = 2;
	if (nb < 2)
		return (0);
	while (i <= (nb / i))
	{
		if (nb % i == 0)
			return (0);
		i++;
	}
	return (1);
}`,
        output: `ft_is_prime(7) → 1\nft_is_prime(9) → 0`,
        explanation: "On teste les diviseurs de 2 jusqu'à sqrt(nb) (i <= nb/i évite sqrt()). Si nb est divisible par i → pas premier. 0, 1, négatifs → pas premiers."
      },
      {
        title: "✅ Solution — ft_find_next_prime (ex07)",
        description: "Retourne le premier nombre premier >= nb",
        code: `int	ft_is_prime(int nb)
{
	long	i;

	if (nb < 2)
		return (0);
	i = 2;
	while (i <= (nb / i))
	{
		if (nb % i == 0)
			return (0);
		i++;
	}
	return (1);
}

int	ft_find_next_prime(int nb)
{
	while (!ft_is_prime(nb))
		nb++;
	return (nb);
}`,
        output: `ft_find_next_prime(9)  → 11\nft_find_next_prime(11) → 11`,
        explanation: "On incrémente nb jusqu'à trouver un premier. Si nb est déjà premier → retourner nb directement. La boucle while(!ft_is_prime(nb)) teste chaque entier."
      },
      {
        title: "✅ Solution — ft_iterative_power (ex02)",
        description: "Calcule nb puissance power par boucle",
        code: `int	ft_iterative_power(int nb, int power)
{
	int	i;

	i = nb;
	if (power < 0)
		return (0);
	else if (power == 0)
		return (1);
	while (power > 1)
	{
		nb = nb * i;
		power--;
	}
	return (nb);
}`,
        output: `ft_iterative_power(2, 10) → 1024\nft_iterative_power(3, 0)  → 1`,
        explanation: "n^0 = 1 pour tout n. n^négatif = 0 (convention du sujet). i garde la valeur de base, nb accumule le produit. Boucle power-1 fois."
      },
      {
        title: "✅ Solution — ft_recursive_power (ex03)",
        description: "Calcule nb puissance power récursivement",
        code: `int	ft_recursive_power(int nb, int power)
{
	if (power < 0)
		return (0);
	else if (power == 0 || nb == 0)
		return (1);
	else if (power == 1)
		return (nb);
	return (nb * ft_recursive_power(nb, power - 1));
}`,
        output: `ft_recursive_power(2, 8) → 256`,
        explanation: "Cas de base : power=0 → 1, power=1 → nb. Appel récursif : nb * nb^(power-1). Attention : nb=0 retourne 1 (0^0 = 1 par convention mathématique)."
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // C 06 — Arguments du programme
  // ═══════════════════════════════════════════════════════════════
  "c06": {
    "c06-args": [
      {
        title: "✅ Solution — ft_print_program_name (ex00)",
        description: "Affiche le nom du programme (argv[0])",
        code: `#include <unistd.h>

int	main(int argc, char **argv)
{
	int		i;

	i = 0;
	while (argv[0][i] != '\\0' && argc > 0)
	{
		write(1, &argv[0][i], 1);
		i++;
	}
	write(1, "\\n", 1);
	return (0);
}`,
        output: `./ft_print_program_name  →  "./ft_print_program_name"`,
        explanation: "argv[0] est toujours le chemin vers l'exécutable. argc > 0 est toujours vrai (argc >= 1 car argv[0] existe toujours). On affiche char par char avec write()."
      },
      {
        title: "✅ Solution — ft_print_params (ex01)",
        description: "Affiche chaque argument sur une ligne (sans argv[0])",
        code: `#include <unistd.h>

int	main(int argc, char **argv)
{
	int	i;
	int	j;

	i = 1;
	j = 0;
	while (i < argc)
	{
		while (argv[i][j] != '\\0')
		{
			write(1, &argv[i][j], 1);
			j++;
		}
		write(1, "\\n", 1);
		j = 0;
		i++;
	}
	return (0);
}`,
        output: `./prog bonjour monde\n→\nbonjour\nmonde`,
        explanation: "i commence à 1 (sauter argv[0]). j remet à 0 entre chaque argument. Deux boucles imbriquées : i pour les args, j pour les chars de chaque arg."
      },
      {
        title: "✅ Solution — ft_rev_params (ex02)",
        description: "Affiche les arguments en ordre inverse",
        code: `#include <unistd.h>

int	main(int argc, char **argv)
{
	int	i;
	int	a;

	i = 0;
	a = argc - 1;
	while (a > 0)
	{
		while (argv[a][i] != '\\0')
		{
			write(1, &argv[a][i], 1);
			i++;
		}
		write(1, "\\n", 1);
		i = 0;
		a--;
	}
	return (0);
}`,
        output: `./prog un deux trois\n→\ntrois\ndeux\nun`,
        explanation: "On part de argc-1 (dernier arg) et on décrémente jusqu'à 1. a > 0 garantit qu'on n'affiche pas argv[0] (le nom du programme)."
      },
      {
        title: "✅ Solution — ft_sort_params (ex03)",
        description: "Trie et affiche les arguments par ordre ASCII croissant",
        code: `#include <unistd.h>

int	strcomp(char *s1, char *s2)
{
	int	i;

	i = 0;
	while (s1[i] != '\\0' || s2[i] != '\\0')
	{
		if (s1[i] != s2[i])
			return (s1[i] - s2[i]);
		i++;
	}
	return (0);
}

int	main(int argc, char **argv)
{
	char	*a;
	int		i;

	i = 1;
	while (i < argc - 1)
	{
		if (strcomp(argv[i], argv[i + 1]) > 0)
		{
			a = argv[i];
			argv[i] = argv[i + 1];
			argv[i + 1] = a;
			i = 0;
		}
		i++;
	}
	i = 1;
	while (i < argc)
	{
		write(1, argv[i], strcomp(argv[i], "") * -1);
		write(1, "\\n", 1);
		i++;
	}
	return (0);
}`,
        output: `./prog bonjour alice monde\n→\nalice\nbonjour\nmonde`,
        explanation: "Bubble sort sur argv[]. On échange des pointeurs (pas de copie de string). i = 0 après un échange force un nouveau passage complet. strcomp > 0 → argv[i] est 'après' argv[i+1] en ordre ASCII."
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // C 07 — Allocation dynamique
  // ═══════════════════════════════════════════════════════════════
  "c07": {
    "c07-malloc": [
      {
        title: "✅ Solution — ft_strdup (ex00)",
        description: "Duplique une chaîne avec malloc",
        code: `#include <stdlib.h>

int	ft_strlen(char *str)
{
	int	i;

	i = 0;
	while (str[i] != '\\0')
		i++;
	return (i);
}

char	*ft_strcpy(char *dest, char *src)
{
	int	i;

	i = 0;
	while (src[i] != '\\0')
	{
		dest[i] = src[i];
		i++;
	}
	dest[i] = '\\0';
	return (dest);
}

char	*ft_strdup(char *src)
{
	char	*dest;
	int		src_len;

	src_len = ft_strlen(src);
	dest = malloc(src_len * sizeof(char) + 1);
	ft_strcpy(dest, src);
	return (dest);
}`,
        explanation: "sizeof(char) = 1 toujours, mais c'est bonne pratique de l'écrire. +1 pour le '\\0' final. En production on vérifie si dest == NULL. ft_strcpy copie src dans dest incluant le '\\0'."
      },
      {
        title: "✅ Solution — ft_range (ex01)",
        description: "Crée un tableau d'entiers de min à max-1",
        code: `#include <stdlib.h>

int	*ft_range(int min, int max)
{
	int	*tab;
	int	i;

	i = 0;
	if (min >= max)
		return (NULL);
	tab = (int *)malloc((max - min) * sizeof(int));
	if (!tab)
		return (NULL);
	while (min < max)
	{
		tab[i] = min;
		min++;
		i++;
	}
	return (tab);
}`,
        output: `ft_range(1, 5) → [1, 2, 3, 4] (taille 4)`,
        explanation: "Si min >= max → NULL (cas invalide). On alloue (max-min) entiers. sizeof(int) = 4 octets sur la plupart des architectures. Le tableau est [min, min+1, ..., max-1]."
      },
      {
        title: "✅ Solution — ft_ultimate_range (ex02)",
        description: "Comme ft_range mais retourne la taille via le pointeur range",
        code: `#include <stdlib.h>

int	ft_ultimate_range(int **range, int min, int max)
{
	int	i;

	i = 0;
	if (min >= max)
	{
		*range = NULL;
		return (0);
	}
	*range = (int *)malloc((max - min) * sizeof(int));
	if (!*range)
		return (-1);
	while (min < max)
	{
		(*range)[i] = min;
		min++;
		i++;
	}
	return (i);
}`,
        explanation: "range est un int** — on passe l'adresse d'un pointeur pour pouvoir le modifier. *range = malloc(...) alloue et assigne via le pointeur. (*range)[i] accède à l'élément i (parenthèses obligatoires : *range[i] = *(range[i]) serait incorrect)."
      },
      {
        title: "✅ Solution — ft_strjoin (ex03)",
        description: "Joint un tableau de strings avec un séparateur",
        code: `#include <stdlib.h>

char	*ft_strcat(char *dest, char *src, int add_start)
{
	int	a;

	a = 0;
	while (src[a] != '\\0')
	{
		dest[add_start + a] = src[a];
		a++;
	}
	return (dest);
}

int	malloc_len(int size, char **strs, char *sep)
{
	int	malloc_size;
	int	i;
	int	j;

	malloc_size = 0;
	i = 0;
	while (i < size)
	{
		j = 0;
		while (strs[i][j] != '\\0')
			j++;
		malloc_size += j;
		i++;
	}
	i = 0;
	while (sep[i] != '\\0')
		i++;
	malloc_size += i * (size - 1) + 1;
	return (malloc_size);
}

char	*ft_strjoin(int size, char **strs, char *sep)
{
	int		malloc_size;
	char	*string;
	int		add_start;
	int		i;

	if (1 <= size)
	{
		malloc_size = malloc_len(size, strs, sep);
		string = (char *)malloc(malloc_size * sizeof(char));
		if (!string)
			return (NULL);
		string[0] = '\\0';
		i = 0;
		add_start = 0;
		while (i < size)
		{
			string = ft_strcat(string, strs[i], add_start);
			while (strs[i][add_start - add_start + (add_start > 0 ? 0 : 0)] != '\\0')
				add_start++;
			i++;
			if (i < size)
				string = ft_strcat(string, sep, add_start);
		}
		string[malloc_size - 1] = '\\0';
	}
	else
	{
		string = (char *)malloc(sizeof(char));
		string[0] = '\\0';
	}
	return (string);
}`,
        output: `ft_strjoin(3, ["a","b","c"], "-") → "a-b-c"`,
        explanation: "Calcul de la taille totale : somme des longueurs + (size-1) séparateurs + '\\0'. Si size=0 → string vide. add_start garde la position courante dans le résultat pour écrire à la bonne position."
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // C 08 — En-têtes et structures
  // ═══════════════════════════════════════════════════════════════
  "c08": {
    "c08-headers": [
      {
        title: "✅ Solution — ft.h (ex00)",
        description: "Fichier d'en-tête listant les prototypes des fonctions ft_*",
        code: `#ifndef FT_H
# define FT_H
# include <unistd.h>

void	ft_putchar(char c);
void	ft_swap(int *a, int *b);
void	ft_putstr(char *str);
int		ft_strlen(char *str);
int		ft_strcmp(char *s1, char *s2);

#endif`,
        explanation: "Le garde #ifndef FT_H / #define FT_H / #endif évite les inclusions multiples (double inclusion). Les prototypes déclarent les fonctions sans les définir — le compilateur peut vérifier les types avant l'édition de liens."
      },
      {
        title: "✅ Solution — ft_boolean.h (ex01)",
        description: "Header avec typedef bool, macros TRUE/FALSE et EVEN",
        code: `#ifndef FT_BOOLEAN_H
# define FT_BOOLEAN_H
# include <unistd.h>

typedef int	t_bool;
# define EVEN(nbr) (nbr % 2) == 0
# define TRUE 1
# define FALSE 0
# define EVEN_MSG "I have an even number of arguments.\\n"
# define ODD_MSG "I have an odd number of arguments.\\n"
# define SUCCESS 0

#endif`,
        explanation: "typedef int t_bool crée un alias de type. Les #define sont des macros — le préprocesseur les remplace textuellement avant la compilation. EVEN(nbr) est une macro-fonction : EVEN(4) → (4 % 2) == 0 → 1 (TRUE)."
      },
      {
        title: "✅ Solution — ft_abs.h (ex02)",
        description: "Macro pour la valeur absolue sans fonction",
        code: `#ifndef FT_ABS_H
# define FT_ABS_H
# define ABS(Value) (Value > 0) ? Value : (-Value)
#endif`,
        explanation: "ABS(-5) → (-5 > 0) ? -5 : (5) → 5. Attention aux effets de bord : ABS(x++) évalue x++ deux fois ! Pour éviter : (Value > 0) ? (Value) : (-(Value)) avec des parenthèses."
      },
      {
        title: "✅ Solution — ft_point.h (ex03)",
        description: "Structure t_point avec coordonnées x et y",
        code: `#ifndef FT_POINT_H
# define FT_POINT_H

typedef struct x_point
{
	int	x;
	int	y;
}	t_point;

#endif`,
        explanation: "struct x_point est le nom de la structure. t_point est le typedef (alias). Avec typedef, on peut écrire 't_point p' au lieu de 'struct x_point p'. Accès aux membres : p.x et p.y."
      },
      {
        title: "✅ Solution — ft_strs_to_tab (ex04)",
        description: "Convertit un tableau de strings en tableau de t_stock_str",
        code: `#include <stdlib.h>
#include "ft_stock_str.h"

int	ft_strlen(char *str)
{
	int	i;

	i = 0;
	while (str[i] != '\\0')
		i++;
	return (i);
}

char	*ft_strdup(char *src)
{
	char	*dest;
	int		src_len;

	src_len = ft_strlen(src);
	dest = malloc(src_len * sizeof(char) + 1);
	if (!dest)
		return (NULL);
	int i = 0;
	while (src[i] != '\\0')
	{
		dest[i] = src[i];
		i++;
	}
	dest[i] = '\\0';
	return (dest);
}

struct s_stock_str	*ft_strs_to_tab(int ac, char **av)
{
	t_stock_str	*conv;
	int			i;

	i = 0;
	conv = malloc(sizeof(t_stock_str) * (ac + 1));
	if (conv == NULL)
		return (NULL);
	while (i < ac)
	{
		conv[i].size = ft_strlen(av[i]);
		conv[i].str = av[i];
		conv[i].copy = ft_strdup(av[i]);
		i++;
	}
	conv[i].size = 0;
	conv[i].str = 0;
	conv[i].copy = 0;
	return (conv);
}`,
        explanation: "On alloue ac+1 structures (le +1 est le sentinel avec size=0 et str=NULL). Chaque élément contient la taille originale, le pointeur vers la string originale, et une copie malloc'd. Le sentinel final permet d'itérer sans connaître ac."
      }
    ]
  }
};
