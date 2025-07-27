'use client';
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { createContext, useContext } from "react";  

const AuthContext = createContext();

export default function AuthProvider({ children }) {

const [user, setUser] = useState(null);
const router = useRouter();
const [loading, setLoading] = useState(true);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
    setUser(currentUser || null); // Always set user
    setLoading(false);            // Always stop loading
    })

    
    return () =>{
      unsubscribe()
    }//When you leave the page or component disappears   
  },[router]);
  //The **[router]** in the dependency array means that this useEffect will re-run only if the router object changes.

const handleLogout = async () => {
  await signOut(auth);
  router.push('/')
}


  return (
    <div >
        
      <AuthContext.Provider value= {{user, handleLogout}}>
       {!loading? children:<div>loading....</div>}
       
    
     </AuthContext.Provider>
     
    
    </div>
     
       
      

  );
}

 export const useAuth = () => useContext(AuthContext);
 //aUTHcONTEXT.PROVIDER://I will only give out the AuthContext box to the class after I finish checking who is present.”
