export type Lang = "fr" | "en";

type TS = { fr: string; en: string };

export const T = {
  nav: {
    home:       { fr: "Accueil",          en: "Home"            } as TS,
    glossary:   { fr: "Glossaire",        en: "Glossary"        } as TS,
    back:       { fr: "Retour",           en: "Back"            } as TS,
    allModules: { fr: "Tous les modules", en: "All modules"     } as TS,
    school:     { fr: "1337 École — Cours Complet", en: "1337 School — Complete Course" } as TS,
  },
  home: {
    badge:    { fr: "PISCINE C — 1337 / 42 NETWORK", en: "PISCINE C — 1337 / 42 NETWORK" } as TS,
    headline: { fr: "Cours Complet",  en: "Complete Course" } as TS,
    sub:      { fr: "Piscine C",      en: "Piscine C"       } as TS,
    desc:     { fr: "Explications approfondies, exemples multiples, exercices interactifs — pointeurs, malloc, SSH, git et tout le reste expliqué pas à pas.", en: "In-depth explanations, multiple examples, interactive exercises — pointers, malloc, SSH, git and everything else explained step by step." } as TS,
    search:   { fr: "Chercher un module...", en: "Search for a module..." } as TS,
    glossaryQuick: { fr: "Glossaire rapide", en: "Quick Glossary" } as TS,
    seeAll:   { fr: "Voir tout", en: "See all" } as TS,
    cLang:    { fr: "Langage C", en: "C Language" } as TS,
    tagDesc:  {
      Shell: { fr: "Terminal Unix, permissions, git, scripts bash", en: "Unix terminal, permissions, git, bash scripts" } as TS,
      C:     { fr: "Bases C, pointeurs, strings, mémoire, récursion, Makefile", en: "C basics, pointers, strings, memory, recursion, Makefile" } as TS,
      Rush:  { fr: "Algorithmes avancés : backtracking, puzzles", en: "Advanced algorithms: backtracking, puzzles" } as TS,
    },
  },
  stats: {
    modules:   { fr: "Modules",   en: "Modules"   } as TS,
    lessons:   { fr: "Leçons",    en: "Lessons"   } as TS,
    examples:  { fr: "Exemples",  en: "Examples"  } as TS,
    exercises: { fr: "Exercices", en: "Exercises" } as TS,
    terms:     { fr: "Termes",    en: "Terms"     } as TS,
  },
  mod: {
    allModules:   { fr: "Tous les modules",  en: "All modules"  } as TS,
    lessons:      { fr: "Leçons",            en: "Lessons"      } as TS,
    examples:     { fr: "Exemples",          en: "Examples"     } as TS,
    exercises:    { fr: "Exercices",         en: "Exercises"    } as TS,
    course:       { fr: "Cours",             en: "Course"       } as TS,
    howToRead:    { fr: "Comment lire et comprendre ce type de sujet", en: "How to read and understand this type of subject" } as TS,
    howToReadMod: { fr: "Comment lire et comprendre le sujet", en: "How to read and understand the subject" } as TS,
    traps:        { fr: "Erreurs classiques", en: "Common errors"   } as TS,
    trapsN:       { fr: "pièges à éviter",   en: "traps to avoid" } as TS,
    tips:         { fr: "Conseils pro",       en: "Pro tips"        } as TS,
    tipsN:        { fr: "astuces",            en: "tips"            } as TS,
    output:       { fr: "SORTIE",             en: "OUTPUT"          } as TS,
    explanation:  { fr: "EXPLICATION",        en: "EXPLANATION"     } as TS,
    check:        { fr: "Vérifier",           en: "Check"           } as TS,
    hide:         { fr: "Masquer",            en: "Hide"            } as TS,
    showAnswer:   { fr: "Voir réponse",       en: "Show answer"     } as TS,
    correct:      { fr: "Correct !",          en: "Correct!"        } as TS,
    incorrect:    { fr: "Incorrect",          en: "Incorrect"       } as TS,
    answer:       { fr: "Réponse :",          en: "Answer:"         } as TS,
    reorder:      { fr: "Glisse ou clique pour réordonner :", en: "Click arrows to reorder:" } as TS,
    yourAnswer:   { fr: "Ta réponse...",      en: "Your answer..."  } as TS,
    copy:         { fr: "copier",             en: "copy"            } as TS,
    copied:       { fr: "copié",              en: "copied"          } as TS,
    keyTerms:     { fr: "TERMES CLÉS DE CE MODULE", en: "KEY TERMS OF THIS MODULE" } as TS,
    seeGlossary:  { fr: "+ voir glossaire complet", en: "+ see full glossary"      } as TS,
    exNav:        { fr: "Navigue entre les exemples via les onglets. Chaque exemple montre un aspect différent.", en: "Browse examples using the tabs. Each example shows a different aspect." } as TS,
    exoNav:       { fr: "Réponds aux questions pour tester ta compréhension. Tu peux vérifier ta réponse ou voir l'explication.", en: "Answer the questions to test your understanding. You can check or reveal the answer." } as TS,
    beginner:     { fr: "Débutant",       en: "Beginner"     } as TS,
    intermediate: { fr: "Intermédiaire",  en: "Intermediate" } as TS,
    advanced:     { fr: "Avancé",         en: "Advanced"     } as TS,
    lesson:       { fr: "leçon",          en: "lesson"       } as TS,
    lessons_pl:   { fr: "leçons",         en: "lessons"      } as TS,
    notFound:     { fr: "Module introuvable.", en: "Module not found." } as TS,
  },
  glos: {
    title:    { fr: "Glossaire",   en: "Glossary"   } as TS,
    subtitle: { fr: "Tous les termes techniques expliqués simplement pour la piscine", en: "All technical terms simply explained for the piscine" } as TS,
    search:   { fr: "Chercher SSH, malloc, git...", en: "Search SSH, malloc, git..." } as TS,
    terms:    { fr: "Termes",      en: "Terms"      } as TS,
    found1:   { fr: "terme trouvé",   en: "term found"   } as TS,
    foundN:   { fr: "termes trouvés", en: "terms found"  } as TS,
    example:  { fr: "Exemple",     en: "Example"    } as TS,
  },
} as const;

export function tr(obj: TS, lang: Lang): string {
  return obj[lang];
}
