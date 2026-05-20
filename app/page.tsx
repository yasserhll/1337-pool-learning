"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Package, BookOpen, Lightbulb, Target, BookMarked, Search, Menu,
  Terminal, GitBranch, Type, Crosshair, AlignLeft, ArrowLeftRight,
  Hash, RefreshCw, Play, Database, Layers, Wrench, Puzzle,
  ArrowRight, Code2, Globe,
} from "lucide-react";
import { modules, glossary } from "@/lib/courseData";
import { useLang } from "@/lib/LangContext";
import { T, tr } from "@/lib/i18n";
import ParticlesCanvas from "@/components/ParticlesCanvas";
import AppSidebar from "@/components/AppSidebar";

const MODULE_ICONS: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  shell00: Terminal, shell01: GitBranch,
  c00: Type,    c01: Crosshair,  c02: AlignLeft, c03: ArrowLeftRight,
  c04: Hash,    c05: RefreshCw,  c06: Play,      c07: Database,
  c08: Layers,  c09: Wrench,     rush01: Puzzle,
};
const TAG_ICONS: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  Shell: Terminal, C: Code2, Rush: Puzzle,
};
function ModuleIcon({ id, size = 20, color }: { id: string; size?: number; color?: string }) {
  const Icon = MODULE_ICONS[id] ?? Package;
  return <Icon size={size} color={color} />;
}

const tagColors: Record<string, string> = { Shell: "#39d353", C: "#00d4ff", Rush: "#ff5f56" };
const tagRgb:    Record<string, string> = { Shell: "57,211,83", C: "0,212,255", Rush: "255,95,86" };

function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "6px 8px", borderRadius: 6, border: "1px solid #1e2535", background: "#0a0d12" }}>
      <Globe size={11} color="#6c7a96" />
      {(["fr", "en"] as const).map((l, i) => (
        <button key={l} onClick={() => setLang(l)}
          style={{ background: "none", border: "none", padding: "1px 5px", fontSize: 11, fontWeight: 700, fontFamily: "monospace", cursor: "pointer", color: lang === l ? "#00d4ff" : "#3d4f6b", borderRadius: 3, transition: "color 0.2s", letterSpacing: 0.5 }}>
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export default function Home() {
  const { lang } = useLang();
  const _  = (o: { fr: string; en: string }) => tr(o, lang);
  const [searchTerm, setSearchTerm]   = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const totalLessons   = modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const totalExercises = modules.reduce((acc, m) => acc + m.lessons.reduce((a, l) => a + l.exercises.length, 0), 0);
  const totalExamples  = modules.reduce((acc, m) => acc + m.lessons.reduce((a, l) => a + l.examples.length, 0), 0);

  const STATS = [
    { key: "modules",   label: _(T.stats.modules),   Icon: Package    },
    { key: "lessons",   label: _(T.stats.lessons),   Icon: BookOpen   },
    { key: "examples",  label: _(T.stats.examples),  Icon: Lightbulb  },
    { key: "exercises", label: _(T.stats.exercises), Icon: Target     },
    { key: "terms",     label: _(T.stats.terms),     Icon: BookMarked },
  ];
  const statValues: Record<string, number> = {
    modules: modules.length, lessons: totalLessons,
    examples: totalExamples, exercises: totalExercises, terms: glossary.length,
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0a0d12" }}>

      {!sidebarOpen && (
        <button className="hamburger-btn" onClick={() => setSidebarOpen(true)} aria-label="Menu">
          <Menu size={20} />
        </button>
      )}

      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

      <AppSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main */}
      <div className="main-sidebar" style={{ marginLeft: 260, flex: 1 }}>

        {/* Lang toggle desktop (top-right of hero) */}
        <div style={{ position: "fixed", top: 14, right: 20, zIndex: 95 }}>
          <LangToggle />
        </div>

        {/* ── Hero ─────────────────────────────── */}
        <div className="hero-section" style={{ background: "linear-gradient(135deg, #0d1117 0%, #080e1a 60%, #0d1117 100%)", borderBottom: "1px solid #1e2535", padding: "64px 60px 52px", position: "relative", overflow: "hidden" }}>

          {/* Particles */}
          <ParticlesCanvas />

          {/* Gradient overlays */}
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 60% at 80% 50%, rgba(0,212,255,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 60, background: "linear-gradient(to top, #0a0d12, transparent)", pointerEvents: "none" }} />

          <div style={{ position: "relative", zIndex: 2 }}>
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.32)", borderRadius: 6, padding: "4px 14px", marginBottom: 22, fontSize: 11, fontFamily: "monospace", color: "#00d4ff" }}>
              <span className="live-dot" />
              {_(T.home.badge)}
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.09, duration: 0.5 }}
              className="hero-h1" style={{ fontSize: "3rem", fontWeight: 800, lineHeight: 1.1, marginBottom: 16, color: "#fff" }}>
              {_(T.home.headline)}<br /><span style={{ color: "#00d4ff" }}>{_(T.home.sub)}</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.17, duration: 0.5 }}
              style={{ color: "#6c7a96", fontSize: "1rem", maxWidth: 620, lineHeight: 1.85, marginBottom: 38 }}>
              {_(T.home.desc)}
            </motion.p>

            {/* Stats */}
            <div className="stats-row" style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
              {STATS.map(({ key, label, Icon }, i) => (
                <motion.div key={key}
                  initial={{ opacity: 0, scale: 0.65 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.24 + i * 0.07, duration: 0.42, type: "spring", stiffness: 230, damping: 18 }}
                  style={{ textAlign: "center" }}>
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: 6 }}><Icon size={20} color="#00d4ff" /></div>
                  <div style={{ fontFamily: "monospace", fontSize: "1.7rem", fontWeight: 700, color: "#00d4ff" }}>{statValues[key]}</div>
                  <div style={{ fontSize: "0.7rem", color: "#6c7a96", textTransform: "uppercase", letterSpacing: 1 }}>{label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="search-pad" style={{ padding: "24px 60px 0" }}>
          <div style={{ position: "relative", maxWidth: 500 }}>
            <Search size={14} color="#6c7a96" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
            <input type="text" placeholder={_(T.home.search)} value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
              style={{ width: "100%", background: "#0d1117", border: "1px solid #1e2535", borderRadius: 8, padding: "10px 16px 10px 38px", color: "#e6edf3", fontSize: 14, fontFamily: "monospace", outline: "none", boxSizing: "border-box" }} />
          </div>
        </div>

        {/* Modules */}
        <div className="content-pad" style={{ padding: "32px 60px 80px" }}>
          {(["Shell", "C", "Rush"] as const).map((tag, ti) => {
            const tagModules = modules.filter(m => m.tag === tag && (!searchTerm || m.title.toLowerCase().includes(searchTerm.toLowerCase()) || m.description.toLowerCase().includes(searchTerm.toLowerCase())));
            if (!tagModules.length) return null;
            const color = tagColors[tag], rgb = tagRgb[tag];
            const TagIcon = TAG_ICONS[tag];
            const desc = _(T.home.tagDesc[tag]);
            return (
              <motion.div key={tag} initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: ti * 0.13, duration: 0.5 }} style={{ marginBottom: 52 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <span style={{ width: 3, height: 20, background: color, borderRadius: 2, display: "block" }} />
                  <TagIcon size={14} color={color} />
                  <h2 style={{ fontSize: 13, fontWeight: 700, color, textTransform: "uppercase", letterSpacing: 3 }}>
                    {tag === "C" ? _(T.home.cLang) : tag}
                  </h2>
                </div>
                <p style={{ fontSize: 12, color: "#3d4f6b", marginBottom: 20, paddingLeft: 15, fontFamily: "monospace" }}>{desc}</p>
                <div className="module-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 14 }}>
                  {tagModules.map((m, i) => {
                    const exCount = m.lessons.reduce((a, l) => a + l.exercises.length, 0);
                    const exCount2 = m.lessons.reduce((a, l) => a + l.examples.length, 0);
                    return (
                      <motion.div key={m.id} initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: ti * 0.13 + i * 0.07, duration: 0.45 }}
                        whileHover={{ y: -5, transition: { duration: 0.2 } }} whileTap={{ scale: 0.98 }}>
                        <Link href={`/module/${m.id}`} style={{ textDecoration: "none", display: "block" }}>
                          <div className="module-card" style={{ background: "#0d1117", border: "1px solid #1e2535", borderRadius: 12, padding: "22px", cursor: "pointer", position: "relative", overflow: "hidden", transition: "border-color 0.22s, box-shadow 0.22s" }}
                            onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = color; el.style.boxShadow = `0 10px 36px rgba(${rgb},0.14)`; }}
                            onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = "#1e2535"; el.style.boxShadow = "none"; }}>
                            <div style={{ position: "absolute", top: -40, right: -40, width: 140, height: 140, background: `radial-gradient(circle, rgba(${rgb},0.07) 0%, transparent 70%)`, pointerEvents: "none" }} />
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
                              <div style={{ width: 42, height: 42, background: `rgba(${rgb},0.12)`, borderRadius: 10, border: `1px solid rgba(${rgb},0.25)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <ModuleIcon id={m.id} size={19} color={color} />
                              </div>
                              <div style={{ fontSize: 10, color, background: `rgba(${rgb},0.1)`, border: `1px solid rgba(${rgb},0.2)`, borderRadius: 4, padding: "2px 8px", fontFamily: "monospace", alignSelf: "flex-start" }}>{m.tag}</div>
                            </div>
                            <div className="card-title" style={{ fontSize: 17, fontWeight: 700, color: "#e6edf3", marginBottom: 4 }}>{m.title}</div>
                            <div style={{ fontSize: 12, color: "#6c7a96", marginBottom: 10 }}>{m.subtitle}</div>
                            <p className="card-desc" style={{ fontSize: 12, color: "#3d4f6b", lineHeight: 1.6, marginBottom: 14 }}>{m.description}</p>
                            <div className="card-stats" style={{ display: "flex", gap: 14, fontSize: 11, color: "#3d4f6b" }}>
                              <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                <BookOpen size={10} /> {m.lessons.length} {m.lessons.length > 1 ? _(T.mod.lessons_pl) : _(T.mod.lesson)}
                              </span>
                              <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                <Lightbulb size={10} /> {exCount2} {_(T.stats.examples).toLowerCase()}
                              </span>
                              <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                <Target size={10} /> {exCount} {_(T.stats.exercises).toLowerCase()}
                              </span>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}

          {/* Quick Glossary */}
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.5 }}
            style={{ marginTop: 40, padding: "28px", background: "#0d1117", borderRadius: 16, border: "1px solid #1e2535" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <BookMarked size={16} color="#bf7fff" />
                <h2 style={{ fontSize: 15, color: "#e6edf3", fontWeight: 600 }}>{_(T.home.glossaryQuick)}</h2>
              </div>
              <Link href="/glossaire" style={{ textDecoration: "none", fontSize: 12, color: "#00d4ff", display: "flex", alignItems: "center", gap: 4 }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = "0.7"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = "1"}>
                {_(T.home.seeAll)} <ArrowRight size={12} />
              </Link>
            </div>
            <div className="glossary-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: 10 }}>
              {glossary.slice(0, 8).map((t, i) => (
                <motion.div key={t.word}
                  initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.55 + i * 0.04, duration: 0.35 }}
                  whileHover={{ scale: 1.03 }}
                  style={{ background: "#0a0d12", border: "1px solid #1e2535", borderRadius: 8, padding: "11px 14px", transition: "border-color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "#2a3347"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "#1e2535"}>
                  <div style={{ fontFamily: "monospace", fontSize: 12, color: "#00d4ff", marginBottom: 4 }}>{t.word}</div>
                  <div style={{ fontSize: 11, color: "#6c7a96", lineHeight: 1.5 }}>{t.short}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
