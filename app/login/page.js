'use client';
import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, signInWithRedirect } from 'firebase/auth';
import { auth, provider } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);


  const router = useRouter();
  useEffect(() => {
  getRedirectResult(auth)
    .then((result) => {
      if (result?.user) {
        console.log("User logged in with redirect:", result.user);
        router.push('/menu');
      }
    })
    .catch((error) => {
      console.error("Redirect login failed:", error);
    });
}, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in:", userCredential.user);
      router.push('/notes');
    } catch (error) {
      console.error("Error logging in:", error);
      if (
        error.code === 'auth/user-not-found' ||
        error.code === 'auth/wrong-password'
      ) {
        toast.error("User ID or password is incorrect.");
      } else {
        toast.error("Login failed. Please try again.");
      }
    }
  };
      // alert("Login failed: " + error.message);
  
  const setGoogleLogin = async () => {
    if (loading) return

    setLoading(true)

    try {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (isMobile) {
        // Use redirect on mobile
      // Use redirect on mobile
      await signInWithRedirect(auth, provider);

    }
      else{
        const result = await signInWithPopup(auth, provider);
      const user = result.user;
      router.push('/menu');
      // console.log("User logged in with Google:", user);
    }} catch (error) {
      console.error("Error logging in with Google:", error);
      // setErrorMsg("User ID or Password is incorrect.");
      toast.error("Login with Google failed. Please try again.");
    }finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50 px-4 py-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-extrabold text-pink-700 mb-8 text-center">🌸 Welcome Back!</h1>

        <form onSubmit={handleLogin} className="space-y-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full text-black px-4 py-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className="w-full text-black px-4 py-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
           
          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg font-semibold transition"
          >
            Login
          </button>
        </form>

        <div className="my-6 flex items-center justify-center space-x-4">
          <hr className="w-1/3 border-pink-200" />
          <span className="text-pink-400 font-semibold">OR</span>
          <hr className="w-1/3 border-pink-200" />
        </div>

        <button
          type="button"
          onClick={setGoogleLogin}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.35 11.1h-9.18v2.82h5.3c-.22 1.36-1.6 3.99-5.3 3.99-3.2 0-5.8-2.65-5.8-5.9s2.6-5.9 5.8-5.9c1.82 0 3.04.77 3.75 1.44l2.57-2.5C16.17 6.4 14.36 5.5 12 5.5 7.57 5.5 4 8.93 4 13.4s3.57 7.9 8 7.9c4.6 0 7.64-3.23 7.64-7.8 0-.52-.05-.9-.29-1.4z"
              fill="white"
            />
          </svg>
          Sign In with Google
        </button>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="/signup" className="text-pink-600 hover:underline font-semibold">
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
}
