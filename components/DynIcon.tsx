"use client";
import {
  Package, FileText, FileCode, ArrowUpDown, Users, Terminal,
  BookOpen, Code, Target, Lightbulb, Wrench, GitBranch,
} from "lucide-react";

export const MODULE_ICON_MAP: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  Package, FileText, FileCode, ArrowUpDown, Users, Terminal,
  BookOpen, Code, Target, Lightbulb, Wrench, GitBranch,
};

export const LESSON_ICONS = [
  BookOpen, Code, Target, Lightbulb, Wrench, GitBranch, Terminal, FileText,
];

export function DynIcon({ name, size = 18, color }: { name: string; size?: number; color?: string }) {
  const Icon = MODULE_ICON_MAP[name] ?? Package;
  return <Icon size={size} color={color} />;
}
