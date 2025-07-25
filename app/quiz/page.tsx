'use client';

import { useEffect, useState, useRef } from 'react';
import { useAccount } from 'wagmi';
import {
  isQuizActive,
  hasUserSubmitted,
  submitScoreToContract,
  getRound,
  getMaxScorePerRound,
} from '@/lib/contracts';
import { submitScoreToSupabase } from '@/lib/submitScoreToSupabase';
import { questions } from '@/lib/questions';

export default function QuizPage() {
  const { address } = useAccount();
  const [quizActive, setQuizActive] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [currentRound, setCurrentRound] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [locked, setLocked] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answerFeedback, setAnswerFeedback] = useState<
    { option: string; isCorrect: boolean }[] | null
  >(null);
  const [timer, setTimer] = useState(15);
  const [maxScore, setMaxScore] = useState<number>(2000);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const init = async () => {
      if (!address) return;

      const [active, round, max] = await Promise.all([
        isQuizActive(),
        getRound(),
        getMaxScorePerRound(),
      ]);

      setQuizActive(active);
      setCurrentRound(round);
      setMaxScore(Number(max));

      const storedRound = localStorage.getItem('quiz-round');
      if (storedRound !== String(round)) {
        localStorage.setItem('quiz-round', String(round));
        setHasSubmitted(false);
        setSubmitted(false);
        setCurrentQuestionIndex(0);
        setScore(0);
        setShowResult(false);
        setLocked(false);
      } else {
        const alreadySubmitted = await hasUserSubmitted(address, round);
        setHasSubmitted(alreadySubmitted);
      }
    };

    init();
  }, [address]);

  useEffect(() => {
    if (!showResult && timer === 0) {
      handleAnswer(null);
    }
  }, [timer]);

  useEffect(() => {
    if (!showResult) {
      timerRef.current = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentQuestionIndex, showResult]);

  const handleAnswer = (selected: string | null) => {
    if (locked || showResult || selectedAnswer !== null) return;

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selected === currentQuestion.answer;
    const nextScore = score + (isCorrect ? 1 : 0);
    setScore(nextScore);

    setSelectedAnswer(selected);

    const feedback = currentQuestion.options.map((option) => ({
      option,
      isCorrect: option === currentQuestion.answer,
    }));
    setAnswerFeedback(feedback);

    if (timerRef.current) clearInterval(timerRef.current);

    setTimeout(() => {
      setSelectedAnswer(null);
      setAnswerFeedback(null);
      setTimer(15);

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        const passingScore = Math.ceil(questions.length * 0.7);
        if (nextScore >= passingScore) {
          setShowResult(true);
          setLocked(true);
          localStorage.setItem('last-quiz-score', String(nextScore));
        } else {
          alert(`❌ You answered less than ${passingScore} questions correctly. Try again.`);
          setScore(0);
          setCurrentQuestionIndex(0);
          setTimer(15);
        }
      }
    }, 1000);
  };

  const handleSubmitScore = async () => {
    if (!address || hasSubmitted || submitted) return;

    const passing = Math.ceil(questions.length * 0.7);
    if (score < passing) {
      alert(`❌ You need at least ${passing} correct answers to submit.`);
      return;
    }

    const finalScore = Math.round((score / questions.length) * maxScore);

    if (typeof finalScore !== 'number' || isNaN(finalScore) || finalScore <= 0) {
      alert('❌ Invalid score. Cannot submit.');
      return;
    }

    try {
      console.log('Submitting score:', finalScore);
      await submitScoreToContract(finalScore);
      await submitScoreToSupabase({ address, score: finalScore });
      setSubmitted(true);
      alert('✅ Score submitted successfully!');
    } catch (error: any) {
      alert(`❌ Failed to submit score:\n${error.message}`);
    }
  };

  if (!quizActive) {
    return (
      <div className="text-center mt-10">
        <h1 className="text-3xl font-bold">KiiQuiz</h1>
        <p className="text-lg mt-4 text-red-500">
          The quiz is not currently active. Please come back later.
        </p>
      </div>
    );
  }

  if (hasSubmitted || submitted) {
    return (
      <div className="text-center mt-10">
        <h1 className="text-3xl font-bold">KiiQuiz</h1>
        <p className="text-lg mt-4 text-green-500">
          ✅ You have already submitted your score for this round.
        </p>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  if (!currentQuestion) {
    return <p className="text-center mt-10 text-red-500">❌ No question found.</p>;
  }

  const correctAnswers = score;
  const passingScore = Math.ceil(questions.length * 0.7);
  const currentPoints = Math.round((score / questions.length) * maxScore);

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg border-4 border-blue-500 rounded-xl">
      {!showResult ? (
        <div>
          <div className="flex justify-between mb-4">
            <span className="text-red-600 font-bold text-lg">⏱ Timer: {timer}s</span>
            <span className="text-green-600 font-bold text-lg">💯 Points: {currentPoints}</span>
          </div>

          <div className="bg-blue-100 text-black p-4 rounded border-l-4 border-blue-500 mb-6 shadow">
            <h2 className="text-lg font-bold">{currentQuestion.question}</h2>
          </div>

          <div className="space-y-2">
            {currentQuestion.options.map((option, i) => {
              const feedback = answerFeedback?.find((f) => f.option === option);
              let bg = 'bg-blue-100 hover:bg-blue-200';
              if (selectedAnswer) {
                if (feedback?.isCorrect) {
                  bg = 'bg-green-600 text-white';
                } else if (option === selectedAnswer) {
                  bg = 'bg-red-500 text-white';
                } else {
                  bg = 'bg-gray-100';
                }
              }

              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(option)}
                  className={`block w-full py-2 px-4 rounded ${bg}`}
                  disabled={!!selectedAnswer}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="text-center space-y-2">
          <h2 className="text-xl font-semibold">Quiz Completed!</h2>
          <p>
            Your score: <strong>{currentPoints}</strong> / {maxScore}
          </p>
          <p>
            ✅ Correct Answers: <strong>{correctAnswers}</strong> / {questions.length}
          </p>
          {score >= passingScore ? (
            <button
              onClick={handleSubmitScore}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
              disabled={submitted}
            >
              Submit Score
            </button>
          ) : (
            <p className="text-red-500 font-semibold">
              ❌ You need at least {passingScore} correct answers to submit score.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
