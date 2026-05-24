"use client";
import { useState, useEffect, use } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, BookOpen, Code, Target, Lightbulb,
  CheckCircle, XCircle, ChevronDown, ChevronRight,
  AlertTriangle, Zap, Clock, Menu, Star, RefreshCw,
} from "lucide-react";
import { DynIcon, LESSON_ICONS } from "@/components/DynIcon";
import { studentModules } from "@/lib/studentData";
import type { Lesson, Exercise } from "@/lib/studentData";
import AppSidebar from "@/components/AppSidebar";

// ── Highlight syntaxique CORRIGÉ ─────────────────────────────
// Utilise des guillemets simples dans les attributs style des <span>
// pour éviter que la regex "string" ne matche l'intérieur des balises
function highlight(code: string): string {
  return code
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    // Commentaires (priorité haute)
    .replace(/\/\*[\s\S]*?\*\//g, "<span style='color:#6a737d'>$&</span>")
    .replace(/\/\/[^\n]*/g, "<span style='color:#6a737d'>$&</span>")
    // Préprocesseur
    .replace(/#\s*(include|define|ifndef|ifdef|endif|pragma)[^\n]*/g, "<span style='color:#f97583'>$&</span>")
    // Chaînes de caractères (AVANT les mots-clés pour éviter le conflit)
    .replace(/"([^"]*)"/g, "<span style='color:#9ecbff'>\"$1\"</span>")
    // Mots-clés C
    .replace(/\b(void|int|char|size_t|ssize_t|long|unsigned|signed|short|static|const|typedef|struct|enum|union|return|if|else|while|for|do|break|continue|NULL|sizeof|extern)\b/g,
      "<span style='color:#79b8ff'>$&</span>")
    // Fonctions standard
    .replace(/\b(malloc|free|write|read|open|close|fork|execve|pipe|dup2|waitpid|pthread_create|pthread_join|pthread_mutex_init|pthread_mutex_lock|pthread_mutex_unlock|pthread_mutex_destroy|printf|perror|exit|usleep|memset|memcpy|strlen|strdup|strjoin|va_start|va_arg|va_end)\b/g,
      "<span style='color:#b392f0'>$&</span>")
    // Nombres
    .replace(/\b(\d+)\b/g, "<span style='color:#f97583'>$1</span>");
}

// ── Exercice interactif ──────────────────────────────────────
function ExerciseCard({ ex, moduleColor }: { ex: Exercise; moduleColor: string }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [input, setInput] = useState("");
  const [orderItems, setOrderItems] = useState<string[]>(ex.options ?? []);

  const isCorrect = (): boolean => {
    if (ex.type === "mcq")    return selected === ex.answer;
    if (ex.type === "fill")   return input.trim().toLowerCase() === (ex.answer as string).toLowerCase();
    if (ex.type === "output") return input.trim() === ex.answer;
    if (ex.type === "order")  return JSON.stringify(orderItems) === JSON.stringify(ex.answer);
    return false;
  };

  const reset = () => { setSelected(null); setSubmitted(false); setInput(""); setOrderItems(ex.options ?? []); };

  const moveItem = (from: number, to: number) => {
    const arr = [...orderItems];
    const [item] = arr.splice(from, 1);
    arr.splice(to, 0, item);
    setOrderItems(arr);
  };

  const rgb = hexToRgb(moduleColor);

  return (
    <div style={{ background: "#0d1117", border: "1px solid #1e2535", borderRadius: 12, padding: 24 }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 14, alignItems: "center" }}>
        <span style={{ background: `rgba(${rgb},0.15)`, color: moduleColor, borderRadius: 6, padding: "3px 10px", fontSize: 11, fontFamily: "monospace", fontWeight: 700 }}>
          {ex.type === "mcq" ? "QCM" : ex.type === "fill" ? "Compléter" : ex.type === "output" ? "Sortie attendue" : "Remettre en ordre"}
        </span>
      </div>

      <p style={{ fontSize: 15, color: "#c8d0e0", marginBottom: 16, lineHeight: 1.6 }}>{ex.question}</p>

      {ex.context && (
        <pre style={{ background: "#070a0f", border: "1px solid #1e2535", borderRadius: 8, padding: 16, fontSize: 12, overflowX: "auto", marginBottom: 16, fontFamily: "monospace", lineHeight: 1.7, color: "#e8eaf0" }}
          dangerouslySetInnerHTML={{ __html: highlight(ex.context) }} />
      )}

      {ex.type === "mcq" && ex.options && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {ex.options.map(opt => {
            const isSel  = selected === opt;
            const isRight = submitted && opt === ex.answer;
            const isWrong = submitted && isSel && opt !== ex.answer;
            return (
              <button key={opt} onClick={() => !submitted && setSelected(opt)}
                style={{
                  background: isRight ? "rgba(57,211,83,0.1)" : isWrong ? "rgba(255,95,86,0.1)" : isSel ? `rgba(${rgb},0.12)` : "#111827",
                  border: `1px solid ${isRight ? "#39d353" : isWrong ? "#ff5f56" : isSel ? moduleColor : "#1e2535"}`,
                  borderRadius: 8, padding: "10px 14px", cursor: submitted ? "default" : "pointer",
                  color: isRight ? "#39d353" : isWrong ? "#ff5f56" : isSel ? moduleColor : "#8899b0",
                  textAlign: "left", fontSize: 13, fontFamily: "monospace", transition: "all 0.15s",
                  display: "flex", alignItems: "center", gap: 8,
                }}>
                {submitted && isRight && <CheckCircle size={14} />}
                {submitted && isWrong && <XCircle size={14} />}
                {opt}
              </button>
            );
          })}
        </div>
      )}

      {(ex.type === "fill" || ex.type === "output") && (
        <input value={input} onChange={e => !submitted && setInput(e.target.value)}
          placeholder={ex.type === "fill" ? "Tape ta réponse…" : "Tape la sortie exacte…"}
          style={{
            width: "100%", background: "#070a0f",
            border: `1px solid ${submitted ? (isCorrect() ? "#39d353" : "#ff5f56") : "#1e2535"}`,
            borderRadius: 8, padding: "10px 14px", color: "#e8eaf0",
            fontSize: 13, fontFamily: "monospace", outline: "none", boxSizing: "border-box",
          }} />
      )}

      {ex.type === "order" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {orderItems.map((item, idx) => (
            <div key={item} style={{ display: "flex", alignItems: "center", gap: 8, background: "#111827", border: "1px solid #1e2535", borderRadius: 8, padding: "8px 12px" }}>
              <span style={{ color: moduleColor, fontFamily: "monospace", fontSize: 12, width: 20 }}>{idx + 1}.</span>
              <span style={{ flex: 1, fontSize: 13, color: "#c8d0e0" }}>{item}</span>
              {!submitted && (
                <div style={{ display: "flex", gap: 4 }}>
                  {idx > 0 && <button onClick={() => moveItem(idx, idx - 1)} style={{ background: "none", border: "none", cursor: "pointer", color: "#6c7a96", fontSize: 16 }}>↑</button>}
                  {idx < orderItems.length - 1 && <button onClick={() => moveItem(idx, idx + 1)} style={{ background: "none", border: "none", cursor: "pointer", color: "#6c7a96", fontSize: 16 }}>↓</button>}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: 14, display: "flex", gap: 10 }}>
        {!submitted ? (
          <button onClick={() => setSubmitted(true)}
            style={{ background: moduleColor, color: "#0a0d12", border: "none", borderRadius: 8, padding: "8px 20px", cursor: "pointer", fontSize: 13, fontWeight: 700, fontFamily: "monospace" }}>
            Vérifier
          </button>
        ) : (
          <button onClick={reset}
            style={{ background: "transparent", color: "#6c7a96", border: "1px solid #1e2535", borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontSize: 12, fontFamily: "monospace", display: "flex", alignItems: "center", gap: 6 }}>
            <RefreshCw size={12} />
            Réessayer
          </button>
        )}
      </div>

      {submitted && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
          style={{
            marginTop: 14, padding: 14,
            background: isCorrect() ? "rgba(57,211,83,0.07)" : "rgba(255,95,86,0.07)",
            border: `1px solid ${isCorrect() ? "rgba(57,211,83,0.3)" : "rgba(255,95,86,0.3)"}`,
            borderRadius: 8, fontSize: 13,
            color: isCorrect() ? "#39d353" : "#ff8a80", lineHeight: 1.6,
          }}>
          {isCorrect() ? "✅ " : "❌ "}{ex.explanation}
        </motion.div>
      )}
    </div>
  );
}

// ── Vue d'une leçon ──────────────────────────────────────────
function LessonView({ lesson, moduleColor }: { lesson: Lesson; moduleColor: string }) {
  const [tab, setTab] = useState<"theory" | "examples" | "exercises">("theory");

  const tabs = [
    { key: "theory" as const,    label: "Théorie",   icon: BookOpen, count: null },
    { key: "examples" as const,  label: "Exemples",  icon: Code,     count: lesson.examples.length },
    { key: "exercises" as const, label: "Exercices", icon: Target,   count: lesson.exercises.length },
  ];

  return (
    <div>
      <div style={{ display: "flex", gap: 4, marginBottom: 24, borderBottom: "1px solid #1e2535" }}>
        {tabs.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              padding: "10px 20px", fontSize: 13, fontFamily: "monospace",
              color: tab === t.key ? moduleColor : "#6c7a96",
              borderBottom: `2px solid ${tab === t.key ? moduleColor : "transparent"}`,
              transition: "all 0.2s", display: "flex", alignItems: "center", gap: 6, marginBottom: -1,
            }}>
            <t.icon size={14} />
            {t.label}
            {t.count !== null && (
              <span style={{ background: tab === t.key ? `rgba(${hexToRgb(moduleColor)},0.15)` : "#1a2030", color: tab === t.key ? moduleColor : "#6c7a96", borderRadius: 4, padding: "1px 6px", fontSize: 10 }}>
                {t.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {tab === "theory" && (
        <div>
          <div style={{ fontSize: 14, color: "#a0aec0", lineHeight: 1.9, marginBottom: 28 }}>
            {renderMarkdown(lesson.theory, moduleColor)}
          </div>
          {lesson.traps.length > 0 && (
            <div style={{ background: "rgba(255,95,86,0.05)", border: "1px solid rgba(255,95,86,0.2)", borderRadius: 10, padding: 20, marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, color: "#ff5f56", fontFamily: "monospace", fontSize: 13, fontWeight: 700 }}>
                <AlertTriangle size={15} />
                Pièges classiques
              </div>
              {lesson.traps.map((t, i) => (
                <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, fontSize: 13, color: "#ff8a80", lineHeight: 1.5 }}>
                  <span style={{ color: "#ff5f56", marginTop: 1, flexShrink: 0 }}>⚠</span>
                  <span>{t}</span>
                </div>
              ))}
            </div>
          )}
          {lesson.tips.length > 0 && (
            <div style={{ background: "rgba(57,211,83,0.05)", border: "1px solid rgba(57,211,83,0.2)", borderRadius: 10, padding: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, color: "#39d353", fontFamily: "monospace", fontSize: 13, fontWeight: 700 }}>
                <Lightbulb size={15} />
                Conseils
              </div>
              {lesson.tips.map((t, i) => (
                <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, fontSize: 13, color: "#6ee67a", lineHeight: 1.5 }}>
                  <span style={{ color: "#39d353", marginTop: 1, flexShrink: 0 }}>💡</span>
                  <span>{t}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === "examples" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {lesson.examples.map((ex, i) => (
            <div key={i} style={{ background: "#0d1117", border: "1px solid #1e2535", borderRadius: 12, overflow: "hidden" }}>
              <div style={{ padding: "16px 20px", borderBottom: "1px solid #1e2535", background: "#080c14" }}>
                <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#e8eaf0", fontFamily: "monospace" }}>{ex.title}</h3>
                <p style={{ margin: "6px 0 0", fontSize: 13, color: "#6c7a96" }}>{ex.description}</p>
              </div>
              <pre style={{ background: "#050810", margin: 0, padding: "20px", fontSize: 13, overflowX: "auto", fontFamily: "monospace", lineHeight: 1.7, color: "#e8eaf0" }}
                dangerouslySetInnerHTML={{ __html: highlight(ex.code) }} />
              {ex.output && (
                <div style={{ padding: "14px 20px", background: "#070a0f", borderTop: "1px solid #1e2535" }}>
                  <div style={{ fontSize: 11, color: "#39d353", fontFamily: "monospace", marginBottom: 8, letterSpacing: 1 }}>OUTPUT / USAGE</div>
                  <pre style={{ margin: 0, fontSize: 12, color: "#a0aec0", fontFamily: "monospace", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{ex.output}</pre>
                </div>
              )}
              {ex.explanation && (
                <div style={{ padding: "14px 20px", background: `rgba(${hexToRgb(moduleColor)},0.04)`, borderTop: "1px solid #1e2535" }}>
                  <div style={{ fontSize: 11, color: moduleColor, fontFamily: "monospace", marginBottom: 8, letterSpacing: 1 }}>EXPLICATION</div>
                  <p style={{ margin: 0, fontSize: 13, color: "#8899b0", lineHeight: 1.7 }}>{ex.explanation}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {tab === "exercises" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {lesson.exercises.map(ex => (
            <ExerciseCard key={ex.id} ex={ex} moduleColor={moduleColor} />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Page principale ──────────────────────────────────────────
export default function CursusDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const mod = studentModules.find(m => m.id === id);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openLesson, setOpenLesson] = useState<string | null>(mod?.lessons[0]?.id ?? null);
  useEffect(() => { if (window.innerWidth >= 768) setSidebarOpen(true); }, []);

  if (!mod) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "#0a0d12", color: "#6c7a96", fontFamily: "monospace" }}>
        Projet introuvable.{" "}
        <Link href="/cursus" style={{ color: "#4fc3f7", marginLeft: 8 }}>← Retour</Link>
      </div>
    );
  }

  const totalExercises = mod.lessons.reduce((a, l) => a + l.exercises.length, 0);
  const totalExamples  = mod.lessons.reduce((a, l) => a + l.examples.length, 0);

  const RANK_COLORS: Record<number, string> = {
    0: "#4fc3f7", 1: "#81c784", 2: "#ffb74d",
    3: "#f06292", 4: "#ce93d8", 5: "#ff7043",
  };
  const RANK_LABELS: Record<number, string> = {
    0: "Rang 0", 1: "Rang 1", 2: "Rang 2",
    3: "Rang 3", 4: "Rang 4", 5: "Rang 5",
  };

  const rgb = hexToRgb(mod.color);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0a0d12" }}>
      {!sidebarOpen && (
        <button className="hamburger-btn" onClick={() => setSidebarOpen(true)} aria-label="Menu">
          <Menu size={20} />
        </button>
      )}
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}
      <AppSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="main-sidebar" style={{ marginLeft: sidebarOpen ? 260 : 0, flex: 1 }}>

        {/* ── Header ── */}
        <div style={{ background: "linear-gradient(135deg, #0d1117, #080e1a)", borderBottom: "1px solid #1e2535", padding: "40px 60px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, right: 0, width: 300, height: 300, background: `radial-gradient(circle, rgba(${rgb},0.06) 0%, transparent 70%)`, pointerEvents: "none" }} />

          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24, fontSize: 13, fontFamily: "monospace" }}>
            <Link href="/" style={{ color: "#3d4f6b", textDecoration: "none" }}>Piscine</Link>
            <ChevronRight size={12} color="#3d4f6b" />
            <Link href="/cursus" style={{ color: "#6c7a96", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
              <ArrowLeft size={12} />Cursus Étudiant
            </Link>
            <ChevronRight size={12} color="#3d4f6b" />
            <span style={{ color: mod.color }}>{mod.title}</span>
          </div>

          <div style={{ display: "flex", alignItems: "flex-start", gap: 20, position: "relative", zIndex: 1 }}>
            <div style={{ width: 56, height: 56, borderRadius: 14, background: `rgba(${rgb},0.12)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <DynIcon name={mod.icon} size={28} color={mod.color} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
                <span style={{ background: `rgba(${hexToRgb(RANK_COLORS[mod.rank])},0.15)`, color: RANK_COLORS[mod.rank], border: `1px solid rgba(${hexToRgb(RANK_COLORS[mod.rank])},0.3)`, borderRadius: 6, padding: "3px 10px", fontSize: 11, fontFamily: "monospace", fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
                  <Star size={10} />{RANK_LABELS[mod.rank]}
                </span>
                <span style={{ background: "rgba(206,147,216,0.12)", color: "#ce93d8", borderRadius: 6, padding: "3px 10px", fontSize: 11, fontFamily: "monospace", fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
                  <Zap size={10} />{mod.xp} XP
                </span>
                <span style={{ background: "rgba(108,122,150,0.1)", color: "#6c7a96", borderRadius: 6, padding: "3px 10px", fontSize: 11, fontFamily: "monospace", display: "flex", alignItems: "center", gap: 4 }}>
                  <Clock size={10} />{mod.duration}
                </span>
              </div>
              <h1 style={{ fontSize: 34, fontWeight: 800, color: "#e8eaf0", margin: "0 0 6px", fontFamily: "monospace" }}>{mod.title}</h1>
              <p style={{ color: mod.color, fontSize: 15, margin: "0 0 14px", fontFamily: "monospace" }}>{mod.subtitle}</p>
              <p style={{ color: "#8899b0", fontSize: 14, lineHeight: 1.7, maxWidth: 700, margin: 0 }}>{mod.description}</p>
            </div>
          </div>

          <div style={{ display: "flex", gap: 16, marginTop: 28, flexWrap: "wrap" }}>
            {[
              { icon: BookOpen, label: `${mod.lessons.length} leçons`, color: mod.color },
              { icon: Code,     label: `${totalExamples} exemples`,   color: "#ffb74d" },
              { icon: Target,   label: `${totalExercises} exercices`,  color: "#f06292" },
            ].map(({ icon: Icon, label, color }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(30,37,53,0.5)", border: "1px solid #1e2535", borderRadius: 8, padding: "8px 14px", fontSize: 13, fontFamily: "monospace", color }}>
                <Icon size={14} />{label}
              </div>
            ))}
          </div>
        </div>

        {/* ── Contenu ── */}
        <div style={{ padding: "40px 60px 60px", maxWidth: 1000 }}>

          <div style={{ background: `rgba(${rgb},0.05)`, border: `1px solid rgba(${rgb},0.2)`, borderRadius: 10, padding: 18, marginBottom: 32, display: "flex", gap: 12, alignItems: "flex-start" }}>
            <BookOpen size={16} color={mod.color} style={{ marginTop: 1, flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: 12, color: mod.color, fontFamily: "monospace", fontWeight: 700, marginBottom: 6, letterSpacing: 0.5 }}>GUIDE DU SUJET</div>
              <p style={{ margin: 0, fontSize: 13, color: "#8899b0", lineHeight: 1.7 }}>{mod.subjectGuide}</p>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {mod.lessons.map((lesson, idx) => {
              const isOpen = openLesson === lesson.id;
              const LessonIcon = LESSON_ICONS[idx % LESSON_ICONS.length];
              return (
                <div key={lesson.id} style={{ background: "#0d1117", border: `1px solid ${isOpen ? mod.color : "#1e2535"}`, borderRadius: 12, overflow: "hidden", transition: "border-color 0.2s", boxShadow: isOpen ? `0 0 20px rgba(${rgb},0.08)` : "none" }}>
                  <button onClick={() => setOpenLesson(isOpen ? null : lesson.id)}
                    style={{ width: "100%", background: "none", border: "none", cursor: "pointer", padding: "18px 24px", display: "flex", alignItems: "center", gap: 14, textAlign: "left" }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: `rgba(${rgb},0.1)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <LessonIcon size={18} color={isOpen ? mod.color : "#6c7a96"} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontSize: 11, color: "#3d4f6b", fontFamily: "monospace" }}>{String(idx + 1).padStart(2, "0")}</span>
                        <span style={{ fontSize: 16, fontWeight: 700, color: isOpen ? mod.color : "#c8d0e0", fontFamily: "monospace", transition: "color 0.2s" }}>{lesson.title}</span>
                      </div>
                      <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
                        <span style={{ fontSize: 12, color: "#6c7a96" }}>⏱ {lesson.duration}</span>
                        <span style={{ fontSize: 12, color: "#6c7a96" }}>{lesson.examples.length} exemples</span>
                        <span style={{ fontSize: 12, color: "#6c7a96" }}>{lesson.exercises.length} exercices</span>
                        <span style={{ fontSize: 11, color: lesson.difficulty === "Débutant" ? "#39d353" : lesson.difficulty === "Intermédiaire" ? "#ffb74d" : "#ff5f56" }}>
                          {lesson.difficulty}
                        </span>
                      </div>
                    </div>
                    {isOpen ? <ChevronDown size={18} color={mod.color} /> : <ChevronRight size={18} color="#3d4f6b" />}
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }} style={{ overflow: "hidden" }}>
                        <div style={{ padding: "0 24px 28px", borderTop: `1px solid rgba(${rgb},0.15)` }}>
                          <div style={{ height: 20 }} />
                          <LessonView lesson={lesson} moduleColor={mod.color} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Helpers ──────────────────────────────────────────────────
function hexToRgb(hex: string): string {
  if (!hex || hex.length < 7) return "100,100,100";
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

function renderMarkdown(text: string, color: string): React.ReactNode {
  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      elements.push(<h2 key={key++} style={{ fontSize: 20, fontWeight: 800, color: "#e8eaf0", margin: "24px 0 12px", fontFamily: "monospace" }}>{line.slice(3)}</h2>);
    } else if (line.startsWith("### ")) {
      elements.push(<h3 key={key++} style={{ fontSize: 16, fontWeight: 700, color, margin: "18px 0 8px", fontFamily: "monospace" }}>{line.slice(4)}</h3>);
    } else if (line.startsWith("```")) {
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) { codeLines.push(lines[i]); i++; }
      elements.push(
        <pre key={key++} style={{ background: "#050810", border: "1px solid #1e2535", borderRadius: 8, padding: 16, fontSize: 12, overflowX: "auto", margin: "12px 0", fontFamily: "monospace", lineHeight: 1.7, color: "#e8eaf0" }}
          dangerouslySetInnerHTML={{ __html: highlight(codeLines.join("\n")) }} />
      );
    } else if (line.startsWith("| ")) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        if (!lines[i].includes("---")) rows.push(lines[i].split("|").filter(c => c.trim()).map(c => c.trim()));
        i++;
      }
      elements.push(
        <div key={key++} style={{ overflowX: "auto", margin: "12px 0" }}>
          <table style={{ borderCollapse: "collapse", fontSize: 13, fontFamily: "monospace", width: "100%" }}>
            <thead><tr>{rows[0]?.map((cell, ci) => <th key={ci} style={{ padding: "8px 14px", background: "#111827", color, borderBottom: `1px solid ${color}`, textAlign: "left" }}>{cell}</th>)}</tr></thead>
            <tbody>{rows.slice(1).map((row, ri) => <tr key={ri} style={{ borderBottom: "1px solid #1e2535" }}>{row.map((cell, ci) => <td key={ci} style={{ padding: "8px 14px", color: "#8899b0" }}>{cell}</td>)}</tr>)}</tbody>
          </table>
        </div>
      );
      continue;
    } else if (line.startsWith("- ")) {
      elements.push(
        <div key={key++} style={{ display: "flex", gap: 10, marginBottom: 6, fontSize: 13, color: "#8899b0", lineHeight: 1.6 }}>
          <span style={{ color, marginTop: 2, flexShrink: 0 }}>▸</span>
          <span dangerouslySetInnerHTML={{ __html: inlineFormat(line.slice(2), color) }} />
        </div>
      );
    } else if (line.trim()) {
      elements.push(<p key={key++} style={{ fontSize: 14, color: "#8899b0", lineHeight: 1.8, margin: "6px 0" }} dangerouslySetInnerHTML={{ __html: inlineFormat(line, color) }} />);
    }
    i++;
  }
  return <>{elements}</>;
}

function inlineFormat(text: string, color: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, `<strong style="color:#c8d0e0">$1</strong>`)
    .replace(/`([^`]+)`/g, `<code style="background:#111827;color:${color};padding:1px 6px;border-radius:4px;font-size:12px;font-family:monospace">$1</code>`);
}
