'use client';

import Link from 'next/link';
import React from 'react';


export default function Home() {
  return (
    <main className="bg-white text-gray-900 font-sans">
      {/* Header Navigation */}
      <header className="w-full px-6 py-4 flex items-center justify-between shadow-sm bg-white fixed top-0 z-50">
        <h1 className="text-2xl font-bold text-pink-600">Mamabloom</h1>
        <Link href="/login" className="text-pink-600 font-medium hover:text-pink-700 transition">
          Log In
        </Link>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-32 md:py-48 bg-gradient-to-br from-pink-100 via-white to-pink-50">
        <h2 className="text-5xl md:text-7xl font-extrabold leading-tight text-pink-700 mb-6">
         Every baby brings a new mom into the world – Empowering Mothers
         
        </h2>
        <p className="text-xl md:text-2xl max-w-2xl text-gray-700 mb-10">
          A private space for new moms to reflect, breathe, and talk with a kind AI companion.
        </p>
        <Link
          href="/login"
          className="bg-pink-600 text-white text-lg px-8 py-4 rounded-full shadow-lg hover:bg-pink-700 transition"
        >
          Begin your Journey!
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
        <div className="flex flex-col justify-center">
          <h3 className="text-4xl font-bold text-pink-700 mb-6">Your Peaceful Daily Ritual</h3>
          <ul className="space-y-5 text-lg text-gray-800">
            <li><span className="font-semibold">🖊️ Guided Journaling:</span> Write with ease using gentle prompts</li>
            <li><span className="font-semibold">🤖 AI Listener:</span> Chat with our empathetic, always-there assistant</li>
            <li><span className="font-semibold">📊 Mood Reflections:</span> See your emotional growth over time</li>
            <li><span className="font-semibold">🔐 Your Privacy First:</span> Fully secure and confidential</li>
          </ul>
        </div>
        <div className="rounded-xl overflow-hidden shadow-lg">
          <img
            src="/images/mombloom-preview.png"
            alt="Mom using Mombloom"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-pink-50 py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-4xl font-bold text-pink-700 mb-12">Real Words from Real Moms</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow text-left">
              <p className="text-lg italic mb-4">“Mombloom feels like the only place where I can be honest with myself.”</p>
              <p className="text-sm text-gray-600">– Aisha, new mom</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow text-left">
              <p className="text-lg italic mb-4">“Every night I journal and talk to the chatbot — it’s helped me so much.”</p>
              <p className="text-sm text-gray-600">– Meera, mom of two</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-20 px-6 text-center">
        <h4 className="text-3xl font-bold text-pink-700 mb-4">You Deserve Space to Bloom</h4>
        <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
          Take five minutes a day just for yourself. Mombloom helps you reconnect with your emotions, safely and beautifully.
        </p>
        <Link
          href="/login"
          className="bg-pink-600 text-white text-lg px-8 py-4 rounded-full shadow hover:bg-pink-700 transition"
        >
          Begin Your Journey
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t text-sm text-gray-500 py-6 text-center bg-pink-50">
        © 2025 Mamabloom. Created with care. Powered by OpenAI.
      </footer>
    </main>
  );
}
