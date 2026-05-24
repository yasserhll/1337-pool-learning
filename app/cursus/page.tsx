"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Menu, ChevronRight, Star, Clock, Zap, Code2, Package, BookOpen, Lightbulb, Target } from "lucide-react";
import { DynIcon } from "@/components/DynIcon";
import { studentModules } from "@/lib/studentData";
import AppSidebar from "@/components/AppSidebar";
import ParticlesCanvas from "@/components/ParticlesCanvas";

const RANK_LABELS: Record<number, string> = {
  0: "Rang 0", 1: "Rang 1", 2: "Rang 2",
  3: "Rang 3", 4: "Rang 4", 5: "Rang 5",
};

const RANK_COLORS: Record<number, string> = {
  0: "#4fc3f7", 1: "#81c784", 2: "#ffb74d",
  3: "#f06292", 4: "#ce93d8", 5: "#ff7043",
};

const DIFF_COLORS: Record<string, string> = {
  "Débutant": "#39d353",
  "Intermédiaire": "#ffb74d",
  "Avancé": "#ff5f56",
};

export default function CursusPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedRank, setSelectedRank] = useState<number | null>(null);

  const filtered = selectedRank === null
    ? studentModules
    : studentModules.filter(m => m.rank === selectedRank);

  const totalLessons   = studentModules.reduce((a, m) => a + m.lessons.length, 0);
  const totalExercises = studentModules.reduce((a, m) => a + m.lessons.reduce((b, l) => b + l.exercises.length, 0), 0);
  const totalExamples  = studentModules.reduce((a, m) => a + m.lessons.reduce((b, l) => b + l.examples.length, 0), 0);
  const totalXP        = studentModules.reduce((a, m) => a + m.xp, 0);

  const ranks = [0, 1, 2, 3, 4, 5] as const;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0a0d12" }}>

      {!sidebarOpen && (
        <button className="hamburger-btn" onClick={() => setSidebarOpen(true)} aria-label="Menu">
          <Menu size={20} />
        </button>
      )}
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}
      <AppSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="main-sidebar" style={{ marginLeft: 260, flex: 1 }}>

        {/* ── Hero ── */}
        <div style={{
          background: "linear-gradient(135deg, #0d1117 0%, #080e1a 60%, #0d1117 100%)",
          borderBottom: "1px solid #1e2535",
          padding: "64px 60px 52px",
          position: "relative",
          overflow: "hidden",
        }}>
          <ParticlesCanvas />

          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 60% at 80% 50%, rgba(79,195,247,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 60, background: "linear-gradient(to top, #0a0d12, transparent)", pointerEvents: "none" }} />

          <div style={{ position: "relative", zIndex: 1, maxWidth: 900 }}>

            {/* Logo + Breadcrumb */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
              <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, color: "#6c7a96", fontSize: 13, fontFamily: "monospace", textDecoration: "none", transition: "color 0.2s" }}>
                <Code2 size={14} />
                <span>Piscine</span>
              </Link>
              <ChevronRight size={14} color="#3d4f6b" />
              <span style={{ color: "#4fc3f7", fontSize: 13, fontFamily: "monospace", fontWeight: 700 }}>42 Cursus</span>
            </div>

            {/* Logo 1337 */}
            <div style={{ display: "flex", alignItems: "center", gap: 28, marginBottom: 36 }}>
              <div style={{
                width: 80, height: 80, borderRadius: 16,
                background: "#ffffff",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 0 40px rgba(79,195,247,0.25)",
                flexShrink: 0,
              }}>
                <Image
                  src="/1337-logo.png"
                  alt="1337 Coding School"
                  width={64}
                  height={64}
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div>
                <div style={{ fontSize: 11, fontFamily: "monospace", color: "#4fc3f7", letterSpacing: 3, textTransform: "uppercase", marginBottom: 8 }}>
                  42 Network · 1337 Coding School
                </div>
                <h1 style={{ fontSize: 40, fontWeight: 800, color: "#e8eaf0", margin: 0, lineHeight: 1.1, fontFamily: "monospace" }}>
                  Cursus Étudiant
                </h1>
                <p style={{ color: "#6c7a96", fontSize: 16, marginTop: 12, lineHeight: 1.6 }}>
                  Tous les projets du cursus 42 — cours détaillés, exemples commentés, exercices pratiques.
                  Du rang 0 (Libft) jusqu&apos;aux projets avancés (minishell, philosophers).
                </p>
              </div>
            </div>

            {/* Stats */}
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              {[
                { icon: Package, label: "Projets", value: studentModules.length, color: "#4fc3f7" },
                { icon: BookOpen, label: "Leçons", value: totalLessons, color: "#81c784" },
                { icon: Lightbulb, label: "Exemples", value: totalExamples, color: "#ffb74d" },
                { icon: Target, label: "Exercices", value: totalExercises, color: "#f06292" },
                { icon: Zap, label: "XP total", value: `${totalXP}`, color: "#ce93d8" },
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} style={{
                  background: "rgba(30,37,53,0.7)",
                  border: "1px solid #1e2535",
                  borderRadius: 10,
                  padding: "12px 20px",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}>
                  <Icon size={16} color={color} />
                  <span style={{ fontSize: 20, fontWeight: 800, color: "#e8eaf0", fontFamily: "monospace" }}>{value}</span>
                  <span style={{ fontSize: 12, color: "#6c7a96" }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Filtres par rang ── */}
        <div style={{ padding: "24px 60px 0", display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button
            onClick={() => setSelectedRank(null)}
            style={{
              background: selectedRank === null ? "rgba(79,195,247,0.15)" : "rgba(30,37,53,0.5)",
              border: `1px solid ${selectedRank === null ? "#4fc3f7" : "#1e2535"}`,
              borderRadius: 8, padding: "8px 16px", cursor: "pointer",
              color: selectedRank === null ? "#4fc3f7" : "#6c7a96",
              fontSize: 13, fontFamily: "monospace", fontWeight: 700,
              transition: "all 0.2s",
            }}>
            Tous les rangs
          </button>
          {ranks.map(rank => {
            const count = studentModules.filter(m => m.rank === rank).length;
            if (count === 0) return null;
            const active = selectedRank === rank;
            const color = RANK_COLORS[rank];
            return (
              <button key={rank} onClick={() => setSelectedRank(rank)}
                style={{
                  background: active ? `rgba(${hexToRgb(color)},0.15)` : "rgba(30,37,53,0.5)",
                  border: `1px solid ${active ? color : "#1e2535"}`,
                  borderRadius: 8, padding: "8px 16px", cursor: "pointer",
                  color: active ? color : "#6c7a96",
                  fontSize: 13, fontFamily: "monospace", fontWeight: 700,
                  transition: "all 0.2s",
                  display: "flex", alignItems: "center", gap: 6,
                }}>
                <Star size={12} />
                {RANK_LABELS[rank]}
                <span style={{ background: active ? color : "#1e2535", color: active ? "#0a0d12" : "#6c7a96", borderRadius: 4, padding: "1px 6px", fontSize: 11 }}>{count}</span>
              </button>
            );
          })}
        </div>

        {/* ── Grille des projets ── */}
        <div style={{ padding: "32px 60px 60px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 24 }}>
          {filtered.map((mod, i) => (
            <motion.div
              key={mod.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Link href={`/cursus/${mod.id}`} style={{ textDecoration: "none" }}>
                <div style={{
                  background: "linear-gradient(145deg, #0d1117, #111827)",
                  border: `1px solid #1e2535`,
                  borderRadius: 16,
                  padding: "28px",
                  cursor: "pointer",
                  transition: "all 0.25s",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  position: "relative",
                  overflow: "hidden",
                }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = mod.color;
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 30px rgba(${hexToRgb(mod.color)},0.12)`;
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "#1e2535";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  }}
                >
                  {/* Gradient de fond subtil */}
                  <div style={{ position: "absolute", top: 0, right: 0, width: 120, height: 120, background: `radial-gradient(circle, rgba(${hexToRgb(mod.color)},0.06) 0%, transparent 70%)`, pointerEvents: "none" }} />

                  {/* Header */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ width: 52, height: 52, borderRadius: 14, background: `rgba(${hexToRgb(mod.color)},0.1)`, border: `1px solid rgba(${hexToRgb(mod.color)},0.2)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <DynIcon name={mod.icon} size={24} color={mod.color} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                      <span style={{
                        background: `rgba(${hexToRgb(RANK_COLORS[mod.rank])},0.15)`,
                        color: RANK_COLORS[mod.rank],
                        border: `1px solid rgba(${hexToRgb(RANK_COLORS[mod.rank])},0.3)`,
                        borderRadius: 6, padding: "3px 10px", fontSize: 11,
                        fontFamily: "monospace", fontWeight: 700, letterSpacing: 0.5,
                      }}>
                        {RANK_LABELS[mod.rank]}
                      </span>
                      <span style={{
                        background: `rgba(${hexToRgb(DIFF_COLORS[mod.difficulty])},0.1)`,
                        color: DIFF_COLORS[mod.difficulty],
                        borderRadius: 5, padding: "2px 8px", fontSize: 10,
                        fontFamily: "monospace",
                      }}>
                        {mod.difficulty}
                      </span>
                    </div>
                  </div>

                  {/* Titre */}
                  <div>
                    <h2 style={{ fontSize: 22, fontWeight: 800, color: "#e8eaf0", margin: "0 0 6px", fontFamily: "monospace" }}>
                      {mod.title}
                    </h2>
                    <p style={{ fontSize: 13, color: mod.color, margin: 0, fontFamily: "monospace" }}>
                      {mod.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p style={{ fontSize: 13, color: "#8899b0", lineHeight: 1.6, margin: 0, flex: 1 }}>
                    {mod.description.slice(0, 140)}…
                  </p>

                  {/* Skills */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {mod.skills.slice(0, 3).map(s => (
                      <span key={s} style={{
                        background: "#0d1117",
                        border: "1px solid #1e2535",
                        borderRadius: 5, padding: "3px 8px",
                        fontSize: 11, color: "#6c7a96", fontFamily: "monospace",
                      }}>{s}</span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 12, borderTop: "1px solid #1a2030" }}>
                    <div style={{ display: "flex", gap: 16 }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#6c7a96" }}>
                        <BookOpen size={12} />
                        {mod.lessons.length} leçons
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#6c7a96" }}>
                        <Clock size={12} />
                        {mod.duration}
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, color: "#ce93d8", fontSize: 12, fontFamily: "monospace", fontWeight: 700 }}>
                      <Zap size={12} />
                      {mod.xp} XP
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}
