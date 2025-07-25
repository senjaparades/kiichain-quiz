'use client';

import { useEffect, useState } from 'react';
import { questions as rawQuestions } from '@/lib/questions';
import {
  submitScoreToContract,
  hasSubmittedScore,
  getMaxScorePerRound,
} from '@/lib/contracts';
import { submitScoreToSupabase } from '@/lib/submitScoreToSupabase';
import { useAccount } from 'wagmi';
import { shuffleArray } from '@/lib/utils';
import { toast } from 'react-toastify';

type Question = {
  question: string;
  options: string[];
  answer: string;
};

export default function Quiz() {
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [maxScorePerRound, setMaxScorePerRound] = useState(2000);

  const { address, isConnected } = useAccount();

  // 👉 Tambahan: bantu debug jika soal kosong
  useEffect(() => {
    console.log('[DEBUG] rawQuestions:', rawQuestions);
  }, []);

  // 👉 Ambil soal & skor maksimum
  useEffect(() => {
    if (rawQuestions.length === 0) return;

    setShuffledQuestions(shuffleArray(rawQuestions));

    getMaxScorePerRound().then((score) => {
      if (!isNaN(Number(score))) {
        setMaxScorePerRound(Number(score));
      }
    });
  }, []);

  // 👉 Cek apakah user sudah submit skor
  useEffect(() => {
    if (!address || !isConnected) return;

    hasSubmittedScore(address).then((res) => {
      if (res) setAlreadySubmitted(true);
    });
  }, [address, isConnected]);

  // 👉 Timer untuk tiap soal
  useEffect(() => {
    if (showResult || alreadySubmitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (!selectedOption) setSelectedOption('');
          handleNext(false);
          return 20;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestion, showResult, selectedOption, alreadySubmitted]);

  const current = shuffledQuestions[currentQuestion];

  // ✅ Tambahan validasi penting agar tidak error
  if (!current) {
    return (
      <div className="text-center text-red-500 mt-10">
        ❌ No question found. Please check your question list or try again later.
      </div>
    );
  }

  const totalScore = shuffledQuestions.length * 10;

  const handleOptionClick = (option: string) => {
    if (selectedOption) return;
    setSelectedOption(option);
    setTimeout(() => handleNext(option === current.answer), 1000);
  };

  const handleNext = async (isCorrect: boolean) => {
    const addedScore = isCorrect ? 10 : 0;

    if (currentQuestion + 1 < shuffledQuestions.length) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedOption(null);
      setTimeLeft(20);
      setScore((prev) => prev + addedScore);
    } else {
      const finalRawScore = score + addedScore;
      const finalScore = Math.min(finalRawScore, maxScorePerRound);
      const percent = (finalRawScore / totalScore) * 100;
      setScore(finalScore);
      setShowResult(true);

      if (percent >= 70 && address && isConnected && !alreadySubmitted) {
        setIsSubmitting(true);
        try {
          toast.info('Submitting your score...');
          await submitScoreToContract(finalScore);
          await submitScoreToSupabase({ address, score: finalScore });
          toast.success('🎉 Score submitted successfully!');
          setAlreadySubmitted(true);
        } catch (err) {
          toast.error('❌ Failed to submit score!');
          console.error('❌ Submission failed:', err);
        } finally {
          setIsSubmitting(false);
        }
      }
    }
  };

  const handleRestart = () => {
    setShuffledQuestions(shuffleArray(rawQuestions));
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setShowResult(false);
    setTimeLeft(20);
  };

  if (!isConnected) {
    return (
      <div className="mt-6 text-center text-white font-semibold text-lg">
        Please connect your wallet to start the quiz.
      </div>
    );
  }

  if (alreadySubmitted) {
    return (
      <div className="mt-6 text-center text-xl font-bold text-white">
        🚫 You have already submitted your score for this session.
      </div>
    );
  }

  if (shuffledQuestions.length === 0) {
    return (
      <div className="mt-6 text-center text-red-500 font-semibold">
        ❌ No questions available. Please contact admin.
      </div>
    );
  }

  if (showResult) {
    const rawScore = Math.min(score, maxScorePerRound);
    const percent = (rawScore / totalScore) * 100;
    return (
      <div className="mt-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">
          Quiz Finished! Your Score: {rawScore} / {Math.min(totalScore, maxScorePerRound)} ({percent.toFixed(1)}%)
        </h2>
        {isSubmitting && <p className="text-yellow-400">Submitting score...</p>}
        {percent >= 70 ? (
          <p className="text-green-400 font-semibold">🎉 Congratulations! You passed!</p>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <p className="text-red-400 font-semibold">❌ You didn&apos;t reach 70%. Try again!</p>
            <button
              onClick={handleRestart}
              className="bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2 rounded font-bold"
            >
              Retry Quiz
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="mt-6 w-full max-w-xl text-white animate-slide-down">
      <h2 className="text-2xl font-bold mb-2">
        Question {currentQuestion + 1} of {shuffledQuestions.length}
      </h2>
      <p className="mb-4">{current.question}</p>
      <div className="grid grid-cols-1 gap-3">
        {current.options.map((option, index) => {
          const isCorrect = option === current.answer;
          const isSelected = selectedOption === option;

          let optionStyle =
            'border border-yellow-400 px-4 py-2 rounded cursor-pointer transition duration-200';

          if (selectedOption) {
            if (isSelected && isCorrect) optionStyle += ' bg-black text-white';
            else if (isSelected && !isCorrect) optionStyle += ' bg-red-600 text-white';
            else if (isCorrect) optionStyle += ' bg-black text-white';
            else optionStyle += ' opacity-50';
          } else {
            optionStyle += ' hover:bg-yellow-400 hover:text-black';
          }

          return (
            <div
              key={index}
              onClick={() => handleOptionClick(option)}
              className={optionStyle}
            >
              <span className="font-bold mr-2">{String.fromCharCode(65 + index)}.</span>
              {option}
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-sm text-yellow-300">⏱️ Time left: {timeLeft}s</p>
      {selectedOption === '' && (
        <p className="text-sm text-red-400 mt-2">⏱️ Time&apos;s up! No answer selected.</p>
      )}
    </div>
  );
}
