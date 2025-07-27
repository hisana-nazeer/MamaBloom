'use client';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '@/lib/firebase';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/header';
import { toast } from 'react-hot-toast';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const Router = useRouter();

  const handleSignup = async (e) => {  
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      if (userCredential.user) {
      
      alert("User signed up successfully!");
      Router.push('/login')
      }
    } catch (error) {
      console.error("Error signing up:", error);
      alert("Error signing up: " + error.message);
    }
  }

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User signed up with Google:", result.user);
      alert("User signed up with Google successfully!");
     if (userCredential.user) {
      
     toast.success("User signed up with Google successfully!");
      Router.push('/login')
      }
    
    } catch (error) {
      console.error("Error signing up with Google:", error);
      alert("Error signing up with Google: " + error.message);
    }
  }

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center px-4 py-8">
      
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 border border-pink-300">
        <h1 className="text-3xl font-extrabold text-pink-700 mb-6 text-center">Create Your Account</h1>
        <form onSubmit={handleSignup}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full text-black mb-4 px-4 py-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className="w-full text-black mb-6 px-4 py-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-lg transition"
          >
            Sign Up
          </button>
        </form>
        <h2 className="text-center text-gray-500 mt-6 mb-4 font-semibold">OR</h2>
        <button
          type="button"
          onClick={handleGoogleSignup}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
        >
          Sign Up with Google
        </button>
      </div>
    </div>
  );
}
