import { NextRequest, NextResponse } from "next/server";
import { modules } from "@/lib/courseData";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { moduleId, lessonId, exerciseId, answer } = body;

  const mod = modules.find((m) => m.id === moduleId);
  if (!mod) return NextResponse.json({ error: "Module not found" }, { status: 404 });

  const lesson = mod.lessons.find((l) => l.id === lessonId);
  if (!lesson) return NextResponse.json({ error: "Lesson not found" }, { status: 404 });

  const exercise = lesson.exercises.find((e) => e.id === exerciseId);
  if (!exercise) return NextResponse.json({ error: "Exercise not found" }, { status: 404 });

  const correctAnswer = Array.isArray(exercise.answer)
    ? exercise.answer
    : [exercise.answer];

  const userAnswer = Array.isArray(answer) ? answer : [answer];

  const isCorrect = correctAnswer.every((a, i) =>
    a.toLowerCase().trim() === (userAnswer[i] || "").toLowerCase().trim()
  );

  return NextResponse.json({
    correct: isCorrect,
    explanation: exercise.explanation,
    answer: exercise.answer,
  });
}

export async function GET() {
  const stats = {
    modules: modules.length,
    totalLessons: modules.reduce((a, m) => a + m.lessons.length, 0),
    totalExercises: modules.reduce(
      (a, m) => a + m.lessons.reduce((a2, l) => a2 + l.exercises.length, 0),
      0
    ),
    totalExamples: modules.reduce(
      (a, m) => a + m.lessons.reduce((a2, l) => a2 + l.examples.length, 0),
      0
    ),
  };
  return NextResponse.json(stats);
}
