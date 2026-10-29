'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { QUIZ_QUESTIONS, QuizQuestionItem } from '@/data/mockData';
import {
  Gamepad2,
  Award,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  HelpCircle,
  Flame,
  Share2
} from 'lucide-react';

export const QuizView: React.FC = () => {
  const { user, addPoints, speakText } = useApp();
  const [selectedDifficulty, setSelectedDifficulty] = useState<'All' | 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'>('All');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const activeQuestions = selectedDifficulty === 'All'
    ? QUIZ_QUESTIONS
    : QUIZ_QUESTIONS.filter(q => q.difficulty === selectedDifficulty);

  const currentQ: QuizQuestionItem | undefined = activeQuestions[currentQuestionIndex] || activeQuestions[0];

  const handleSelectOption = (opt: string) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(opt);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOption || isAnswerSubmitted || !currentQ) return;
    setIsAnswerSubmitted(true);
    setTotalAnswered(prev => prev + 1);

    const isCorrect = selectedOption === currentQ.correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + currentQ.points);
      addPoints(currentQ.points);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < activeQuestions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setTotalAnswered(0);
    setQuizFinished(false);
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-3xl font-serif font-bold text-amber-200">
            Learn & Play — Global Heritage Quizzes
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            4 mastery levels with verified answers, historical context, and no penalty for unlearned topics.
          </p>
        </div>

        {/* Difficulty Switcher */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-2xl">
          {(['All', 'Beginner', 'Intermediate', 'Advanced', 'Expert'] as const).map((diff) => (
            <button
              key={diff}
              type="button"
              onClick={() => {
                setSelectedDifficulty(diff);
                handleRestartQuiz();
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedDifficulty === diff
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {!quizFinished && currentQ ? (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
          {/* Progress & Category */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
              {currentQ.category} • Level: {currentQ.difficulty}
            </span>
            <div className="flex items-center gap-3 text-slate-400">
              <span>Question {currentQuestionIndex + 1} of {activeQuestions.length}</span>
              <span className="text-amber-400 font-bold">+{currentQ.points} Pts</span>
            </div>
          </div>

          {/* Question Text */}
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-100 leading-snug">
            {currentQ.question}
          </h2>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOption === option;
              let btnStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700';

              if (isAnswerSubmitted) {
                if (option === currentQ.correctAnswer) {
                  btnStyle = 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-semibold';
                } else if (isSelected && option !== currentQ.correctAnswer) {
                  btnStyle = 'bg-rose-500/20 border-rose-400 text-rose-300';
                }
              } else if (isSelected) {
                btnStyle = 'bg-amber-500/20 border-amber-400 text-amber-300 font-semibold';
              }

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectOption(option)}
                  disabled={isAnswerSubmitted}
                  className={`p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between ${btnStyle}`}
                >
                  <span>{option}</span>
                  {isAnswerSubmitted && option === currentQ.correctAnswer && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                  )}
                  {isAnswerSubmitted && isSelected && option !== currentQ.correctAnswer && (
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box After Answering */}
          {isAnswerSubmitted && (
            <div className={`p-4 rounded-2xl border text-xs space-y-1.5 ${
              selectedOption === currentQ.correctAnswer
                ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200'
                : 'bg-amber-950/30 border-amber-500/30 text-amber-200'
            }`}>
              <div className="font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Cultural Context & Verification
              </div>
              <p className="leading-relaxed font-light">{currentQ.explanation}</p>
              <div className="text-[10px] text-slate-400 pt-1">
                Verified Source: {currentQ.source}
              </div>
            </div>
          )}

          {/* Action Row */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Total Score: <strong className="text-amber-400">{score} Points</strong>
            </span>

            {!isAnswerSubmitted ? (
              <button
                type="button"
                onClick={handleSubmitAnswer}
                disabled={!selectedOption}
                className="py-2.5 px-6 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-bold text-xs transition-all shadow-md"
              >
                Submit Answer
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNextQuestion}
                className="py-2.5 px-6 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-md"
              >
                {currentQuestionIndex + 1 < activeQuestions.length ? 'Next Question' : 'View Final Results'}
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Quiz Finished Summary */
        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 mx-auto rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-400">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Quiz Completed!
            </span>
            <h2 className="text-3xl font-serif font-bold text-slate-100 mt-1">
              Honorary Cultural Guardian
            </h2>
            <p className="text-xs text-slate-400 mt-2 max-w-md mx-auto">
              You scored <strong className="text-amber-400">{score} points</strong> across {activeQuestions.length} questions. Points have been synced to your explorer profile.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleRestartQuiz}
              className="py-2.5 px-5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Take Another Quiz
            </button>
            <button
              type="button"
              onClick={() => alert('Certificate of Cultural Knowledge downloaded!')}
              className="py-2.5 px-5 rounded-xl bg-slate-950 border border-slate-800 text-amber-300 text-xs font-medium"
            >
              Export Learning Badge
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

