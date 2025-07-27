"use client";


import Link from "next/link";
import Image from "next/image";
import Header from "../components/header";
// import Header from "../components/header";

export default function MenuPage() {
  return (
    <>
      
      <main className="min-h-screen pt-24 bg-pink-50 flex flex-col items-center justify-start px-4">
       <Header/>
        <h1 className="text-4xl font-bold text-pink-600 mb-4 text-center">
          Welcome to MamaBloom
        </h1>

        {/* Affirmation Section */}
        <div className="text-center max-w-xl mb-8">
          <p className="text-lg text-pink-700 italic">
            "You are doing amazing, mama. Every step you take matters."
          </p>
        </div>

        {/* Image Section */}
        <div className="w-full max-w-2xl flex justify-center mb-8">
          <Image
            src="/images/new_mom_with_flourish.jpg"
            alt="Mom and Baby"
            width={300}
            height={300}
            className="rounded-2xl shadow-md"
          />
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
          <Link
            href="/chat"
            className="block bg-white p-6 rounded-2xl shadow-md hover:shadow-lg border border-pink-200 transition-all hover:bg-pink-100"
          >
            <h2 className="text-xl font-semibold text-pink-600 mb-2">Chat Support</h2>
            <p className="text-gray-600">
              Get emotional support by chatting with our AI mom buddy.
            </p>
          </Link>

          <Link
            href="/notes"
            className="block bg-white p-6 rounded-2xl shadow-md hover:shadow-lg border border-pink-200 transition-all hover:bg-pink-100"
          >
            <h2 className="text-xl font-semibold text-pink-600 mb-2">Daily Journal</h2>
            <p className="text-gray-600">
              Reflect and write about your day-to-day pregnancy journey.
            </p>
          </Link>
        </div>

        {/* Additional Affirmation */}
        <div className="text-center mt-12 max-w-xl">
          <p className="text-pink-700 text-lg font-medium">
            "You are strong, beautiful, and loved. Keep blooming. 🌸"
          </p>
        </div>
      </main>
    </>
  );
}
