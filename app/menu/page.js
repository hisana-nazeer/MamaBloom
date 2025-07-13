'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext'; // Adjust this path if needed

import Header from '../components/header';
const quotes = [
  "You're doing better than you think, mama 💖",
  "Your baby doesn’t need a perfect mom — just a present one 🌸",
  "It’s okay to rest. Healing is progress too 🕊️",
  "You were made for this. You're strong and amazing 💪",
  "One breath, one moment, one step at a time 🌷",
  "Your love is enough. You are enough 💗",
  "Even on the hardest days, you’re the best mama your baby could have 🌼",
  "You are not alone. You are deeply loved 💞",
  "Every tear, every smile — it all matters. And so do you 🤱",
];

export default function MenuPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [quote, setQuote] = useState('');

  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  }, []);

  const handleNotes = () => {
    router.push('/notes');
  };

  const handleQnA = () => {
    router.push('/chat');
  };

  return (
    <div className="min-h-screen bg-pink-50 px-4 py-8">
      <Header />

      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-6 text-center mt-6">
        {/* Show user's name if available */}
        {user?.displayName && (
          <h2 className="text-xl font-bold text-pink-600 mb-1">
            Hi, {user.displayName.split(' ')[0]}! 💕
          </h2>
        )}
        {!user?.displayName && (
          <h2 className="text-xl font-bold text-pink-600 mb-1">
            Welcome back, mama! 💕
          </h2>
        )}

        {/* Encouraging Quote */}
        <p className="text-rose-400 text-sm font-medium mb-6 italic">"{quote}"</p>

        {/* Menu Options */}
        <div className="space-y-6 text-left">
          <div
            onClick={handleNotes}
            className="cursor-pointer w-full bg-pink-500 hover:bg-pink-600 text-white py-4 px-6 rounded-lg font-semibold transition"
          >
            <div className="text-lg">📝 Write Notes</div>
            <div className="text-sm text-pink-100 font-normal mt-1">
              Jot down your thoughts, reminders, or baby milestones.
            </div>
          </div>

          <div
            onClick={handleQnA}
            className="cursor-pointer w-full bg-rose-400 hover:bg-rose-500 text-white py-4 px-6 rounded-lg font-semibold transition"
          >
            <div className="text-lg">🤖 Ask MamaBloom</div>
            <div className="text-sm text-rose-100 font-normal mt-1">
              Get kind, expert answers to your postpartum & baby care questions.
            </div>
          </div>
        </div>

        <p className="mt-8 text-sm text-gray-500">
          You’re never alone on this journey. We’re here for you 🌼
        </p>
      </div>
    </div>
  );
}
