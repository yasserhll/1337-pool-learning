"use client";
import { useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  X, Code2, BookMarked, Globe,
  Terminal, GitBranch, Type, Crosshair, AlignLeft, ArrowLeftRight,
  Hash, RefreshCw, Play, Database, Layers, Wrench, Puzzle, Package,
} from "lucide-react";
import { modules } from "@/lib/courseData";
import { useLang } from "@/lib/LangContext";
import { T, tr } from "@/lib/i18n";

const MODULE_ICONS: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  shell00: Terminal, shell01: GitBranch,
  c00: Type,    c01: Crosshair,  c02: AlignLeft, c03: ArrowLeftRight,
  c04: Hash,    c05: RefreshCw,  c06: Play,      c07: Database,
  c08: Layers,  c09: Wrench,     rush01: Puzzle,
};
function ModIcon({ id, size = 15, color }: { id: string; size?: number; color?: string }) {
  const Icon = MODULE_ICONS[id] ?? Package;
  return <Icon size={size} color={color} />;
}

const TAG_COLORS: Record<string, string> = { Shell: "#39d353", C: "#00d4ff", Rush: "#ff5f56" };
const TAG_RGB:    Record<string, string> = { Shell: "57,211,83", C: "0,212,255", Rush: "255,95,86" };

const DEFAULT_WIDTH = 260;
const MIN_WIDTH     = 160;
const MAX_WIDTH     = 480;

interface Props {
  open: boolean;
  onClose: () => void;
  activeId?: string;
}

export default function AppSidebar({ open, onClose, activeId }: Props) {
  const { lang, setLang } = useLang();
  const _ = (o: { fr: string; en: string }) => tr(o, lang);

  const isResizing = useRef(false);
  const widthRef   = useRef(DEFAULT_WIDTH);

  /* ── Initialise la largeur depuis localStorage ── */
  useEffect(() => {
    const stored = localStorage.getItem("sb_width");
    const w = stored
      ? Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, parseInt(stored, 10)))
      : DEFAULT_WIDTH;
    widthRef.current = w;
    document.documentElement.style.setProperty("--sb-width", `${w}px`);
  }, []);

  /* ── Démarre le redimensionnement au mousedown ── */
  const startResize = useCallback((e: React.MouseEvent) => {
    if (window.innerWidth <= 1024) return; // desktop uniquement
    e.preventDefault();
    isResizing.current = true;
    document.body.classList.add("sb-resizing");
    document.body.style.cursor = "col-resize";

    const onMove = (ev: MouseEvent) => {
      if (!isResizing.current) return;
      const newW = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, ev.clientX));
      widthRef.current = newW;
      document.documentElement.style.setProperty("--sb-width", `${newW}px`);
    };

    const onUp = () => {
      isResizing.current = false;
      document.body.classList.remove("sb-resizing");
      document.body.style.cursor = "";
      localStorage.setItem("sb_width", String(Math.round(widthRef.current)));
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }, []);

  /* ── Double-clic → reset largeur par défaut ── */
  const resetWidth = useCallback(() => {
    widthRef.current = DEFAULT_WIDTH;
    document.documentElement.style.setProperty("--sb-width", `${DEFAULT_WIDTH}px`);
    localStorage.removeItem("sb_width");
  }, []);

  return (
    <aside className={`app-sidebar${open ? " open" : ""}`}>

      {/* ── Header ── */}
      <div className="sb-header">
        <Link href="/" className="sb-logo" onClick={onClose}>
          <span className="sb-logo-icon">
            <Code2 size={15} color="#00d4ff" />
          </span>
          <span className="sb-logo-text">
            <span className="sb-logo-title">PISCINE C</span>
            <span className="sb-logo-sub">{_(T.nav.school)}</span>
          </span>
        </Link>
        <button className="sb-close" onClick={onClose} aria-label="Fermer">
          <X size={20} />
        </button>
      </div>

      {/* ── Nav ── */}
      <nav className="sb-nav">
        {(["Shell", "C", "Rush"] as const).map(tag => (
          <div key={tag} className="sb-group">
            <div className="sb-group-label" style={{ color: TAG_COLORS[tag] }}>{tag}</div>
            {modules.filter(m => m.tag === tag).map(m => {
              const active = activeId === m.id;
              const color  = TAG_COLORS[tag];
              const rgb    = TAG_RGB[tag];
              return (
                <Link key={m.id} href={`/module/${m.id}`} className="sb-link" onClick={onClose}
                  style={{
                    color:           active ? color : undefined,
                    background:      active ? `rgba(${rgb},0.1)` : undefined,
                    borderLeftColor: active ? color : undefined,
                  }}>
                  <ModIcon id={m.id} size={14} color={active ? color : "#6c7a96"} />
                  <span>{m.title}</span>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* ── Footer ── */}
      <div className="sb-footer">
        <Link href="/glossaire" className="sb-glossary-link" onClick={onClose}>
          <BookMarked size={14} />
          <span>{_(T.nav.glossary)}</span>
        </Link>

        <div className="sb-lang">
          <Globe size={12} color="#6c7a96" />
          {(["fr", "en"] as const).map(l => (
            <button key={l} className={`sb-lang-btn${lang === l ? " active" : ""}`}
              onClick={() => setLang(l)}>
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* ── Handle de redimensionnement (desktop uniquement) ── */}
      <div
        className="sb-resize-handle"
        onMouseDown={startResize}
        onDoubleClick={resetWidth}
        title="Glisser pour redimensionner · Double-clic pour réinitialiser"
      />
    </aside>
  );
}
