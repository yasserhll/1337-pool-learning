"use client";
import { useState, useEffect, use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen, Lightbulb, Target, Clock, ArrowLeft, ArrowRight,
  FileText, AlertTriangle, CheckCircle, XCircle, Copy, Check,
  ChevronDown, ChevronRight, Play,
  Terminal, GitBranch, Type, Crosshair, AlignLeft, ArrowLeftRight,
  Hash, RefreshCw, Database, Layers, Wrench, Puzzle, Package, Menu,
} from "lucide-react";
import { modules, glossary } from "@/lib/courseData";
import type { Lesson, CodeExample, Exercise } from "@/lib/courseData";
import { useLang } from "@/lib/LangContext";
import { T, tr } from "@/lib/i18n";
import AppSidebar from "@/components/AppSidebar";

const MODULE_ICONS: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  shell00: Terminal, shell01: GitBranch,
  c00: Type,    c01: Crosshair,  c02: AlignLeft, c03: ArrowLeftRight,
  c04: Hash,    c05: RefreshCw,  c06: Play,      c07: Database,
  c08: Layers,  c09: Wrench,     rush01: Puzzle,
};
function ModuleIcon({ id, size = 20, color }: { id: string; size?: number; color?: string }) {
  const Icon = MODULE_ICONS[id] ?? Package;
  return <Icon size={size} color={color} />;
}

// ─── Syntax Highlighter ──────────────────────────────────────
function highlight(code: string): string {
  // Étape 1 : échapper les caractères HTML du code source
  let h = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Étape 2 : littéraux chaîne et char — EN PREMIER pour éviter de corrompre les étapes suivantes
  h = h.replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)')/g, "\x00STR\x00$1\x00ENDSTR\x00");

  // Étape 3 : directives préprocesseur (#include, #define…) — début de ligne uniquement
  h = h.replace(/^(#[a-zA-Z_]\w*)/gm, "\x00PRE\x00$1\x00ENDPRE\x00");

  // Étape 4 : commentaires bloc /* … */
  h = h.replace(/(\/\*[\s\S]*?\*\/)/g, "\x00CMT\x00$1\x00ENDCMT\x00");

  // Étape 5 : commentaires ligne // …
  h = h.replace(/(\/\/[^\n]*)/g, "\x00CMT\x00$1\x00ENDCMT\x00");

  // Étape 6 : mots-clés C
  h = h.replace(/\b(int|char|void|return|if|else|while|for|static|const|unsigned|long|short|double|float|struct|typedef|sizeof|NULL|break|continue)\b/g,
    "\x00KW\x00$1\x00ENDKW\x00");

  // Étape 7 : nombres (word boundary pour éviter les hex dans les couleurs)
  h = h.replace(/\b(\d+)\b/g, "\x00NUM\x00$1\x00ENDNUM\x00");

  // Étape 8 : fonctions connues
  h = h.replace(/\b(malloc|free|write|printf|strlen|strcpy|strcmp|strcat|ft_\w+)\b/g,
    "\x00FN\x00$1\x00ENDFN\x00");

  // Étape 9 : convertir les marqueurs en spans HTML (guillemets simples pour éviter toute collision)
  h = h
    .replace(/\x00STR\x00([\s\S]*?)\x00ENDSTR\x00/g, "<span style='color:#a5d6ff'>$1</span>")
    .replace(/\x00PRE\x00([\s\S]*?)\x00ENDPRE\x00/g, "<span style='color:#ff7b72'>$1</span>")
    .replace(/\x00CMT\x00([\s\S]*?)\x00ENDCMT\x00/g, "<span style='color:#3d4f6b;font-style:italic'>$1</span>")
    .replace(/\x00KW\x00([\s\S]*?)\x00ENDKW\x00/g, "<span style='color:#ff7b72'>$1</span>")
    .replace(/\x00NUM\x00([\s\S]*?)\x00ENDNUM\x00/g, "<span style='color:#79c0ff'>$1</span>")
    .replace(/\x00FN\x00([\s\S]*?)\x00ENDFN\x00/g, "<span style='color:#ffa657'>$1</span>");

  return h;
}

// ─── Code Block ──────────────────────────────────────────────
function CodeBlock({ code, lang = "c" }: { code: string; lang?: string }) {
  const { lang: uiLang } = useLang();
  const _ = (o: { fr: string; en: string }) => tr(o, uiLang);
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div style={{ background: "#010409", border: "1px solid #1e2535", borderRadius: 12, overflow: "hidden", marginBottom: 16 }}>
      <div className="code-hd" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 16px", background: "#0d1117", borderBottom: "1px solid #1e2535" }}>
        <div style={{ display: "flex", gap: 6 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f56" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ffbd2e" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#27c93f" }} />
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <span style={{ fontSize: 11, color: "#3d4f6b", fontFamily: "monospace" }}>{lang}</span>
          <button onClick={copy} style={{ background: "none", border: "1px solid #1e2535", borderRadius: 4, padding: "2px 8px", color: copied ? "#39d353" : "#6c7a96", fontSize: 11, cursor: "pointer", fontFamily: "monospace", display: "flex", alignItems: "center", gap: 4 }}>
            {copied ? <><Check size={10} /> {_(T.mod.copied)}</> : <><Copy size={10} /> {_(T.mod.copy)}</>}
          </button>
        </div>
      </div>
      <pre className="code-pre" style={{ margin: 0, padding: "20px", overflowX: "auto", fontSize: 13, lineHeight: 1.7, fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}>
        <code dangerouslySetInnerHTML={{ __html: highlight(code) }} />
      </pre>
    </div>
  );
}


function ExOutputLabel() {
  const { lang } = useLang();
  return <div style={{ fontSize: 10, color: "#3d4f6b", fontFamily: "monospace", marginBottom: 6, display: "flex", alignItems: "center", gap: 4 }}><Play size={9} color="#3d4f6b" /> {tr(T.mod.output, lang)}</div>;
}
function ExExpLabel() {
  const { lang } = useLang();
  return <div style={{ fontSize: 10, color: "#00d4ff", fontFamily: "monospace", marginBottom: 6, display: "flex", alignItems: "center", gap: 4 }}><Lightbulb size={10} color="#00d4ff" /> {tr(T.mod.explanation, lang)}</div>;
}

// ─── Theory Renderer ─────────────────────────────────────────
function TheoryBlock({ text }: { text: string }) {
  const parts = text.split(/(```[\s\S]*?```)/g);
  return (
    <div>
      {parts.map((part, i) => {
        if (part.startsWith("```")) {
          const lines = part.slice(3).split("\n");
          const lang = lines[0] || "c";
          const code = lines.slice(1, -1).join("\n");
          return <CodeBlock key={i} code={code} lang={lang} />;
        }
        // Render markdown-like
        const rendered = part
          .split("\n")
          .map((line, j) => {
            if (line.startsWith("### ")) return <h3 key={j} style={{ color: "#e6edf3", fontSize: 15, marginTop: 24, marginBottom: 8 }}>{line.slice(4)}</h3>;
            if (line.startsWith("## ")) return <h2 key={j} style={{ color: "#e6edf3", fontSize: 18, marginTop: 32, marginBottom: 12, paddingBottom: 8, borderBottom: "1px solid #1e2535" }}>{line.slice(3)}</h2>;
            if (line.trim() === "") return <br key={j} />;
            // inline code
            const withCode = line.replace(/`([^`]+)`/g, '<code style="background:#1c2333;padding:1px 6px;border-radius:4px;font-size:12px;color:#a5d6ff;font-family:monospace">$1</code>');
            // bold
            const withBold = withCode.replace(/\*\*([^*]+)\*\*/g, '<strong style="color:#e6edf3">$1</strong>');
            return <p key={j} style={{ color: "#8b949e", lineHeight: 1.8, marginBottom: 6 }} dangerouslySetInnerHTML={{ __html: withBold }} />;
          });
        return <div key={i}>{rendered}</div>;
      })}
    </div>
  );
}

// ─── Exercise Block ───────────────────────────────────────────
function ExerciseBlock({ ex }: { ex: Exercise }) {
  const { lang } = useLang();
  const _ = (o: { fr: string; en: string }) => tr(o, lang);
  const [userAnswer, setUserAnswer] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [revealed, setRevealed] = useState(false);
  const [checked, setChecked] = useState<boolean | null>(null);
  const [orderItems, setOrderItems] = useState(ex.options ? [...ex.options] : []);

  const normalizeAnswer = (a: string | string[]) => Array.isArray(a) ? a.join("|||") : a.trim().toLowerCase();
  const getUserAnswer = () => {
    if (ex.type === "mcq" || ex.type === "output") return selected[0] || "";
    if (ex.type === "order") return orderItems.join("|||");
    return userAnswer.trim().toLowerCase();
  };

  const check = () => {
    const ua = getUserAnswer();
    const ca = normalizeAnswer(ex.answer);
    setChecked(ua === ca || ua.toLowerCase() === ca.toLowerCase());
  };

  const statusColor = checked === null ? "#3d4f6b" : checked ? "#39d353" : "#ff5f56";
  const statusBg = checked === null ? "transparent" : checked ? "rgba(57,211,83,0.05)" : "rgba(255,95,86,0.05)";

  return (
    <div style={{ background: statusBg || "#0d1117", border: `1px solid ${statusColor}`, borderRadius: 12, padding: "20px", marginBottom: 16, transition: "all 0.3s" } as React.CSSProperties}>
      {/* Question */}
      {ex.context && <CodeBlock code={ex.context} />}
      <div style={{ fontSize: 15, color: "#e6edf3", marginBottom: 16, lineHeight: 1.7 }}>
        {ex.question.split("\n").map((line, i) => {
          if (line.startsWith("```")) return null;
          const code = line.startsWith("  ") || line.match(/^\w+\(/) || line.match(/^[A-Za-z*]+\s+\w+\s*=/) ;
          return code
            ? <code key={i} style={{ display: "block", background: "#0a0d12", padding: "2px 8px", borderRadius: 4, fontFamily: "monospace", fontSize: 12, color: "#a5d6ff", marginBottom: 4 }}>{line}</code>
            : <span key={i} style={{ display: "block" }}>{line}</span>;
        })}
      </div>

      {/* MCQ / Output */}
      {(ex.type === "mcq" || ex.type === "output") && ex.options && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
          {ex.options.map((opt) => {
            const isSelected = selected.includes(opt);
            return (
              <button key={opt} onClick={() => setSelected([opt])} style={{ background: isSelected ? "rgba(0,212,255,0.1)" : "#0a0d12", border: `1px solid ${isSelected ? "#00d4ff" : "#1e2535"}`, borderRadius: 8, padding: "12px 16px", textAlign: "left", cursor: "pointer", color: isSelected ? "#00d4ff" : "#6c7a96", fontSize: 14, fontFamily: "monospace", transition: "all 0.15s", minHeight: 48 }}>
                <span style={{ marginRight: 8 }}>{isSelected ? "◉" : "○"}</span>
                {opt}
              </button>
            );
          })}
        </div>
      )}

      {/* Fill */}
      {ex.type === "fill" && (
        <input
          type="text"
          placeholder={_(T.mod.yourAnswer)}
          value={userAnswer}
          onChange={e => setUserAnswer(e.target.value)}
          onKeyDown={e => e.key === "Enter" && check()}
          style={{ width: "100%", background: "#0a0d12", border: "1px solid #1e2535", borderRadius: 8, padding: "10px 16px", color: "#a5d6ff", fontSize: 13, fontFamily: "monospace", outline: "none", boxSizing: "border-box", marginBottom: 16 }}
        />
      )}

      {/* Order */}
      {ex.type === "order" && (
        <div style={{ marginBottom: 16 }}>
          <p style={{ fontSize: 11, color: "#3d4f6b", marginBottom: 8 }}>{_(T.mod.reorder)}</p>
          {orderItems.map((item, idx) => (
            <div key={item} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <div style={{ background: "#0a0d12", border: "1px solid #1e2535", borderRadius: 6, padding: "8px 12px", fontSize: 12, color: "#6c7a96", flex: 1, fontFamily: "monospace" }}>
                <span style={{ color: "#3d4f6b", marginRight: 8 }}>{idx + 1}.</span>{item}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {idx > 0 && <button onClick={() => { const a = [...orderItems]; [a[idx-1], a[idx]] = [a[idx], a[idx-1]]; setOrderItems(a); }} style={{ background: "#1e2535", border: "none", borderRadius: 3, padding: "2px 6px", color: "#6c7a96", cursor: "pointer", fontSize: 10 }}>↑</button>}
                {idx < orderItems.length-1 && <button onClick={() => { const a = [...orderItems]; [a[idx], a[idx+1]] = [a[idx+1], a[idx]]; setOrderItems(a); }} style={{ background: "#1e2535", border: "none", borderRadius: 3, padding: "2px 6px", color: "#6c7a96", cursor: "pointer", fontSize: 10 }}>↓</button>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Actions */}
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <button onClick={check} style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.3)", borderRadius: 6, padding: "6px 16px", color: "#00d4ff", fontSize: 12, cursor: "pointer", fontFamily: "monospace" }}>
          {_(T.mod.check)} →
        </button>
        <button onClick={() => setRevealed(!revealed)} style={{ background: "transparent", border: "1px solid #1e2535", borderRadius: 6, padding: "6px 16px", color: "#3d4f6b", fontSize: 12, cursor: "pointer" }}>
          {revealed ? _(T.mod.hide) : _(T.mod.showAnswer)}
        </button>
        {checked !== null && (
          <span style={{ fontSize: 13, color: statusColor, fontFamily: "monospace", display: "flex", alignItems: "center", gap: 4 }}>
            {checked ? <><CheckCircle size={14} /> {_(T.mod.correct)}</> : <><XCircle size={14} /> {_(T.mod.incorrect)}</>}
          </span>
        )}
      </div>

      {/* Explanation */}
      {(revealed || checked !== null) && (
        <div style={{ marginTop: 12, padding: "12px 16px", background: "#0a0d12", borderRadius: 8, borderLeft: `3px solid ${checked === false ? "#ff5f56" : "#39d353"}` }}>
          <div style={{ fontSize: 11, color: "#3d4f6b", marginBottom: 4 }}>{_(T.mod.explanation)}</div>
          {revealed && !checked && (
            <div style={{ fontSize: 12, color: "#00d4ff", fontFamily: "monospace", marginBottom: 6 }}>
              {_(T.mod.answer)} {Array.isArray(ex.answer) ? ex.answer.join(" → ") : ex.answer}
            </div>
          )}
          <p style={{ fontSize: 13, color: "#8b949e", lineHeight: 1.6 }}>{ex.explanation}</p>
        </div>
      )}
    </div>
  );
}

// ─── Example Tabs ─────────────────────────────────────────────
function ExamplesBlock({ examples }: { examples: CodeExample[] }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const ex = examples[activeIdx];
  return (
    <div>
      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 16 }}>
        {examples.map((e, i) => (
          <button key={i} onClick={() => setActiveIdx(i)} style={{ background: activeIdx === i ? "#00d4ff" : "#0d1117", border: `1px solid ${activeIdx === i ? "#00d4ff" : "#1e2535"}`, borderRadius: 6, padding: "6px 12px", color: activeIdx === i ? "#000" : "#6c7a96", fontSize: 11, cursor: "pointer", fontFamily: "monospace", fontWeight: activeIdx === i ? 700 : 400, whiteSpace: "nowrap" }}>
            {i + 1}. {e.title}
          </button>
        ))}
      </div>
      {/* Active example */}
      <div style={{ background: "#0d1117", border: "1px solid #1e2535", borderRadius: 12, overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #1e2535" }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#e6edf3", marginBottom: 4 }}>{ex.title}</div>
          <div style={{ fontSize: 12, color: "#6c7a96" }}>{ex.description}</div>
        </div>
        <div style={{ padding: "0 20px 4px" }}>
          <CodeBlock code={ex.code} />
        </div>
        {ex.output && (
          <div style={{ margin: "0 20px 16px", background: "#010409", border: "1px solid #1e2535", borderRadius: 8, padding: "12px 16px" }}>
            <ExOutputLabel />
            <pre style={{ margin: 0, fontSize: 12, color: "#39d353", fontFamily: "monospace", lineHeight: 1.6 }}>{ex.output}</pre>
          </div>
        )}
        {ex.explanation && (
          <div style={{ margin: "0 20px 16px", background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.15)", borderRadius: 8, padding: "12px 16px" }}>
            <ExExpLabel />
            <p style={{ margin: 0, fontSize: 13, color: "#8b949e", lineHeight: 1.7 }}>{ex.explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Lesson Block ─────────────────────────────────────────────
function LessonBlock({ lesson, color }: { lesson: Lesson; color: string }) {
  const { lang } = useLang();
  const _ = (o: { fr: string; en: string }) => tr(o, lang);
  const [showHow, setShowHow] = useState(false);
  const [showTraps, setShowTraps] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const [activeSection, setActiveSection] = useState<"theory" | "examples" | "exercises">("theory");

  const diffMap: Record<string, string> = { "Débutant": _(T.mod.beginner), "Intermédiaire": _(T.mod.intermediate), "Avancé": _(T.mod.advanced) };
  const diffColors: Record<string, string> = { "Débutant": "#39d353", "Intermédiaire": "#ffa657", "Avancé": "#ff5f56" };

  return (
    <div style={{ background: "#0d1117", border: "1px solid #1e2535", borderRadius: 16, overflow: "hidden", marginBottom: 24, transition: "box-shadow 0.2s" }}
      onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(0,0,0,0.35)"}
      onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = "none"}>
      {/* Header */}
      <div className="lesson-hd" style={{ padding: "24px 28px", borderBottom: "1px solid #1e2535" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: "#e6edf3", marginBottom: 6 }}>{lesson.title}</h3>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <span style={{ fontSize: 11, color: diffColors[lesson.difficulty], background: `${diffColors[lesson.difficulty]}20`, padding: "2px 8px", borderRadius: 4, fontFamily: "monospace" }}>{diffMap[lesson.difficulty] ?? lesson.difficulty}</span>
                <span style={{ fontSize: 11, color: "#3d4f6b", display: "flex", alignItems: "center", gap: 4 }}><Clock size={11} /> {lesson.duration}</span>
                <span style={{ fontSize: 11, color: "#3d4f6b", display: "flex", alignItems: "center", gap: 4 }}><Lightbulb size={11} /> {lesson.examples.length} exemples</span>
                <span style={{ fontSize: 11, color: "#3d4f6b", display: "flex", alignItems: "center", gap: 4 }}><Target size={11} /> {lesson.exercises.length} exercices</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section tabs */}
        <div style={{ display: "flex", gap: 4 }}>
          {(["theory", "examples", "exercises"] as const).map(s => {
            const tabDef: Record<string, { icon: React.ReactNode; label: string }> = {
              theory:    { icon: <BookOpen size={12} />,   label: _(T.mod.course) },
              examples:  { icon: <Lightbulb size={12} />, label: `${_(T.mod.examples)} (${lesson.examples.length})` },
              exercises: { icon: <Target size={12} />,    label: `${_(T.mod.exercises)} (${lesson.exercises.length})` },
            };
            const { icon, label } = tabDef[s];
            const active = activeSection === s;
            return (
              <button key={s} onClick={() => setActiveSection(s)} style={{ background: active ? color : "transparent", border: `1px solid ${active ? color : "#1e2535"}`, borderRadius: 6, padding: "6px 14px", color: active ? "#000" : "#6c7a96", fontSize: 12, cursor: "pointer", fontWeight: active ? 700 : 400, display: "flex", alignItems: "center", gap: 6 }}>
                {icon}{label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div key={activeSection} className="tab-content lesson-bd" style={{ padding: "28px" }}>
        {/* Theory */}
        {activeSection === "theory" && (
          <div>
            <TheoryBlock text={lesson.theory} />

            {/* How to read subject */}
            {lesson.howToRead && (
              <div style={{ marginTop: 24 }}>
                <button onClick={() => setShowHow(!showHow)} style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,189,46,0.08)", border: "1px solid rgba(255,189,46,0.2)", borderRadius: 8, padding: "10px 16px", cursor: "pointer", color: "#ffbd2e", fontSize: 13, width: "100%" }}>
                  <FileText size={14} /> {showHow ? <ChevronDown size={14} /> : <ChevronRight size={14} />} {_(T.mod.howToRead)}
                </button>
                {showHow && (
                  <div style={{ padding: "16px 20px", background: "rgba(255,189,46,0.04)", border: "1px solid rgba(255,189,46,0.1)", borderRadius: "0 0 8px 8px", borderTop: "none" }}>
                    <TheoryBlock text={lesson.howToRead} />
                  </div>
                )}
              </div>
            )}

            {/* Traps */}
            {lesson.traps.length > 0 && (
              <div style={{ marginTop: 16 }}>
                <button onClick={() => setShowTraps(!showTraps)} style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,95,86,0.08)", border: "1px solid rgba(255,95,86,0.2)", borderRadius: 8, padding: "10px 16px", cursor: "pointer", color: "#ff5f56", fontSize: 13, width: "100%" }}>
                  <AlertTriangle size={14} /> {showTraps ? <ChevronDown size={14} /> : <ChevronRight size={14} />} {_(T.mod.traps)} ({lesson.traps.length} {_(T.mod.trapsN)})
                </button>
                {showTraps && (
                  <div style={{ padding: "16px 20px", background: "rgba(255,95,86,0.04)", border: "1px solid rgba(255,95,86,0.1)", borderRadius: "0 0 8px 8px", borderTop: "none" }}>
                    {lesson.traps.map((t, i) => (
                      <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                        <AlertTriangle size={14} color="#ff5f56" style={{ minWidth: 14, marginTop: 2 }} />
                        <p style={{ fontSize: 13, color: "#8b949e", lineHeight: 1.6, margin: 0 }}>{t}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tips */}
            {lesson.tips.length > 0 && (
              <div style={{ marginTop: 16 }}>
                <button onClick={() => setShowTips(!showTips)} style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(57,211,83,0.08)", border: "1px solid rgba(57,211,83,0.2)", borderRadius: 8, padding: "10px 16px", cursor: "pointer", color: "#39d353", fontSize: 13, width: "100%" }}>
                  <Lightbulb size={14} /> {showTips ? <ChevronDown size={14} /> : <ChevronRight size={14} />} {_(T.mod.tips)} ({lesson.tips.length} {_(T.mod.tipsN)})
                </button>
                {showTips && (
                  <div style={{ padding: "16px 20px", background: "rgba(57,211,83,0.04)", border: "1px solid rgba(57,211,83,0.1)", borderRadius: "0 0 8px 8px", borderTop: "none" }}>
                    {lesson.tips.map((t, i) => (
                      <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                        <CheckCircle size={14} color="#39d353" style={{ minWidth: 14, marginTop: 2 }} />
                        <p style={{ fontSize: 13, color: "#8b949e", lineHeight: 1.6, margin: 0 }}>{t}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Examples */}
        {activeSection === "examples" && (
          <div>
            <p style={{ fontSize: 13, color: "#3d4f6b", marginBottom: 20 }}>{_(T.mod.exNav)}</p>
            <ExamplesBlock examples={lesson.examples} />
          </div>
        )}

        {/* Exercises */}
        {activeSection === "exercises" && (
          <div>
            <p style={{ fontSize: 13, color: "#3d4f6b", marginBottom: 20 }}>{_(T.mod.exoNav)}</p>
            {lesson.exercises.map((ex) => <ExerciseBlock key={ex.id} ex={ex} />)}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Page principale ──────────────────────────────────────────
export default function ModulePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { lang } = useLang();
  const _ = (o: { fr: string; en: string }) => tr(o, lang);
  const [showGuide, setShowGuide] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  useEffect(() => { if (window.innerWidth >= 768) setSidebarOpen(true); }, []);
  const mod = modules.find(m => m.id === id);
  if (!mod) return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", color: "#6c7a96" }}>
      Module introuvable. <Link href="/" style={{ color: "#00d4ff", marginLeft: 8 }}>Retour</Link>
    </div>
  );

  const tagColors: Record<string, string> = { Shell: "#39d353", C: "#00d4ff", Rush: "#ff5f56" };
  const tagRgb: Record<string, string> = { Shell: "57,211,83", C: "0,212,255", Rush: "255,95,86" };
  const color = tagColors[mod.tag] || "#00d4ff";
  const rgb = tagRgb[mod.tag] || "0,212,255";

  // Related terms from glossary
  const relatedTerms = glossary.filter(t =>
    mod.description.toLowerCase().includes(t.word.toLowerCase()) ||
    mod.title.toLowerCase().includes(t.word.toLowerCase())
  ).slice(0, 4);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0a0d12" }}>

      {!sidebarOpen && (
        <button className="hamburger-btn" onClick={() => setSidebarOpen(true)} aria-label="Menu">
          <Menu size={20} />
        </button>
      )}

      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

      <AppSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} activeId={id} />

      <div className="main-sidebar" style={{ marginLeft: sidebarOpen ? 260 : 0, flex: 1 }}>
        {/* Header */}
        <div className="header-pad" style={{ background: "linear-gradient(135deg, #0d1117 0%, #0a1628 100%)", borderBottom: "1px solid #1e2535", padding: "48px 60px 40px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -80, right: -80, width: 400, height: 400, background: `radial-gradient(circle, rgba(${rgb}, 0.07) 0%, transparent 70%)`, pointerEvents: "none" }} />
          <Link href="/" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: "#3d4f6b", marginBottom: 20, transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#6c7a96"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#3d4f6b"}>
            <ArrowLeft size={12} /> {_(T.mod.allModules)}
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
            <div style={{ width: 56, height: 56, background: `rgba(${rgb}, 0.15)`, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid rgba(${rgb}, 0.3)` }}>
              <ModuleIcon id={id} size={26} color={color} />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <h1 style={{ fontSize: 28, fontWeight: 800, color: "#e6edf3" }}>{mod.title}</h1>
                <span style={{ fontSize: 11, color, background: `rgba(${rgb},0.1)`, border: `1px solid rgba(${rgb},0.2)`, borderRadius: 4, padding: "2px 8px", fontFamily: "monospace" }}>{mod.tag}</span>
              </div>
              <p style={{ fontSize: 14, color: "#6c7a96" }}>{mod.subtitle}</p>
            </div>
          </div>
          <p style={{ fontSize: 14, color: "#6c7a96", maxWidth: 700, lineHeight: 1.7, marginBottom: 20 }}>{mod.description}</p>

          {/* Stats */}
          <div style={{ display: "flex", gap: 24, marginBottom: 20 }}>
            {[
              { Icon: BookOpen, val: mod.lessons.length, lbl: _(T.mod.lessons) },
              { Icon: Lightbulb, val: mod.lessons.reduce((a, l) => a + l.examples.length, 0), lbl: _(T.mod.examples) },
              { Icon: Target, val: mod.lessons.reduce((a, l) => a + l.exercises.length, 0), lbl: _(T.mod.exercises) },
            ].map(s => (
              <div key={s.lbl} style={{ textAlign: "center" }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 4 }}><s.Icon size={18} color={color} /></div>
                <div style={{ fontFamily: "monospace", fontSize: "1.1rem", color, fontWeight: 700 }}>{s.val}</div>
                <div style={{ fontSize: "0.7rem", color: "#3d4f6b", textTransform: "uppercase" }}>{s.lbl}</div>
              </div>
            ))}
          </div>

          {/* Subject Guide toggle */}
          <button onClick={() => setShowGuide(!showGuide)} style={{ background: `rgba(${rgb},0.1)`, border: `1px solid rgba(${rgb},0.3)`, borderRadius: 8, padding: "8px 16px", cursor: "pointer", color, fontSize: 12, display: "flex", alignItems: "center", gap: 8 }}>
            <FileText size={14} /> {showGuide ? <ChevronDown size={14} /> : <ChevronRight size={14} />} {_(T.mod.howToReadMod)} {mod.title}
          </button>
          {showGuide && (
            <div style={{ marginTop: 12, padding: "20px", background: `rgba(${rgb},0.04)`, border: `1px solid rgba(${rgb},0.1)`, borderRadius: 8 }}>
              <TheoryBlock text={mod.subjectGuide} />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="content-pad" style={{ padding: "40px 60px 80px" }}>
          {/* Related terms */}
          {relatedTerms.length > 0 && (
            <div style={{ marginBottom: 32, padding: "20px", background: "#0d1117", borderRadius: 12, border: "1px solid #1e2535" }}>
              <div style={{ fontSize: 12, color: "#3d4f6b", marginBottom: 12, fontFamily: "monospace" }}>{_(T.mod.keyTerms)}</div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {relatedTerms.map(t => (
                  <Link key={t.word} href={`/glossaire#${t.word}`} style={{ textDecoration: "none" }}>
                    <div style={{ background: "#0a0d12", border: "1px solid #1e2535", borderRadius: 8, padding: "8px 14px" }}>
                      <div style={{ fontSize: 12, color: "#00d4ff", fontFamily: "monospace" }}>{t.word}</div>
                      <div style={{ fontSize: 11, color: "#3d4f6b" }}>{t.short}</div>
                    </div>
                  </Link>
                ))}
                <Link href="/glossaire" style={{ textDecoration: "none" }}>
                  <div style={{ background: "#0a0d12", border: "1px dashed #1e2535", borderRadius: 8, padding: "8px 14px", fontSize: 12, color: "#3d4f6b" }}>{_(T.mod.seeGlossary)}</div>
                </Link>
              </div>
            </div>
          )}

          {/* Lessons */}
          {mod.lessons.map((lesson, i) => (
            <motion.div key={lesson.id}
              initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12, duration: 0.48 }}>
              <LessonBlock lesson={lesson} color={color} />
            </motion.div>
          ))}

          {/* Navigation */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 40, paddingTop: 32, borderTop: "1px solid #1e2535" }}>
            {(() => {
              const idx = modules.findIndex(m => m.id === id);
              const prev = modules[idx - 1];
              const next = modules[idx + 1];
              return (
                <>
                  {prev ? (
                    <Link href={`/module/${prev.id}`} style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8, color: "#6c7a96", fontSize: 13 }}>
                      <ArrowLeft size={14} />
                      <ModuleIcon id={prev.id} size={13} color="#6c7a96" />
                      {prev.title}
                    </Link>
                  ) : <div />}
                  {next ? (
                    <Link href={`/module/${next.id}`} style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8, color: "#6c7a96", fontSize: 13 }}>
                      <ModuleIcon id={next.id} size={13} color="#6c7a96" />
                      {next.title}
                      <ArrowRight size={14} />
                    </Link>
                  ) : <div />}
                </>
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}
