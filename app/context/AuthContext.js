// 'use client';
import { useEffect, useState, createContext, useContext } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
      setLoading(false);

      // 🚀 Redirect user to /menu if already logged in and on login page
      if (currentUser && window.location.pathname === '/login') {
        router.push('/menu');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, handleLogout }}>
      {!loading ? children : <div>Loading...</div>}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
