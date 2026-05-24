"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookMarked, Search, ArrowLeft, Globe, Menu } from "lucide-react";
import { glossary } from "@/lib/courseData";
import { useLang } from "@/lib/LangContext";
import { T, tr } from "@/lib/i18n";
import AppSidebar from "@/components/AppSidebar";

function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "5px 8px", borderRadius: 6, border: "1px solid #1e2535", background: "#0a0d12" }}>
      <Globe size={11} color="#6c7a96" />
      {(["fr", "en"] as const).map(l => (
        <button key={l} onClick={() => setLang(l)}
          style={{ background: "none", border: "none", padding: "1px 5px", fontSize: 11, fontWeight: 700, fontFamily: "monospace", cursor: "pointer", color: lang === l ? "#bf7fff" : "#3d4f6b", letterSpacing: 0.5 }}>
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export default function GlossairePage() {
  const { lang }  = useLang();
  const _ = (o: { fr: string; en: string }) => tr(o, lang);
  const [search, setSearch]           = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  useEffect(() => { if (window.innerWidth >= 768) setSidebarOpen(true); }, []);

  const filtered = glossary.filter(
    g =>
      g.word.toLowerCase().includes(search.toLowerCase()) ||
      g.full.toLowerCase().includes(search.toLowerCase())
  );

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
      <div className="main-sidebar" style={{ marginLeft: sidebarOpen ? 260 : 0, flex: 1 }}>

        {/* Lang toggle desktop */}
        <div style={{ position: "fixed", top: 14, right: 20, zIndex: 95 }}>
          <LangToggle />
        </div>

        {/* Header */}
        <div className="header-pad" style={{ background: "linear-gradient(135deg, #0d1117, #0f1729)", borderBottom: "1px solid #1e2535", padding: "48px 60px 40px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -80, right: -80, width: 400, height: 400, background: "radial-gradient(circle, rgba(191,127,255,0.05) 0%, transparent 68%)", pointerEvents: "none" }} />

          <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.38 }}>
            <Link href="/" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "#6c7a96", marginBottom: 20, transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#bf7fff"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#6c7a96"}>
              <ArrowLeft size={13} /> {_(T.nav.back)}
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, duration: 0.45 }}
            style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <BookMarked size={26} color="#bf7fff" />
            <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#fff" }}>
              <span style={{ color: "#bf7fff" }}>{_(T.glos.title)}</span>
            </h1>
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14, duration: 0.4 }}
            style={{ color: "#6c7a96", fontSize: 14, marginBottom: 24 }}>
            {_(T.glos.subtitle)}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.38 }}
            style={{ position: "relative", maxWidth: 420 }}>
            <Search size={14} color="#6c7a96" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder={_(T.glos.search)}
              style={{ width: "100%", padding: "10px 16px 10px 36px", background: "#111520", border: "1px solid #1e2535", borderRadius: 8, color: "#cdd6f4", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
          </motion.div>
        </div>

        {/* Content */}
        <div className="content-pad" style={{ padding: "40px 60px 80px" }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.24, duration: 0.35 }}
            style={{ marginBottom: 16, fontSize: 13, color: "#6c7a96" }}>
            {filtered.length} {filtered.length > 1 ? _(T.glos.foundN) : _(T.glos.found1)}
          </motion.div>

          <div className="glossary-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 14 }}>
            {filtered.map((term, i) => (
              <motion.div key={term.word} id={term.word}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.035, 0.5), duration: 0.38 }}
                whileHover={{ y: -3, transition: { duration: 0.18 } }}
                style={{ background: "#111520", border: "1px solid #1e2535", borderRadius: 12, padding: "20px", transition: "border-color 0.2s, box-shadow 0.2s", scrollMarginTop: 24 }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "#bf7fff"; el.style.boxShadow = "0 8px 28px rgba(191,127,255,0.1)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "#1e2535"; el.style.boxShadow = "none"; }}>
                <div className="term-word" style={{ fontFamily: "monospace", fontSize: 15, fontWeight: 800, color: "#bf7fff", marginBottom: 8 }}>
                  {term.word}
                </div>
                <p className="term-def" style={{ fontSize: 13, color: "#9baab8", lineHeight: 1.75 }}>{term.full}</p>
                {term.example && (
                  <div style={{ marginTop: 12, background: "#0d1117", borderRadius: 8, padding: "10px 14px", fontFamily: "monospace", fontSize: 12, color: "#50fa7b", borderLeft: "2px solid rgba(80,250,123,0.3)" }}>
                    <div style={{ fontSize: 10, color: "#6c7a96", marginBottom: 4, textTransform: "uppercase", letterSpacing: 1 }}>{_(T.glos.example)}</div>
                    {term.example}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
