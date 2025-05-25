'use client';
import Image from "next/image";
import { auth } from "@/lib/firebase";
import { db } from "@/lib/firebase";

export default function Home() {

console.log("Firebase Auth:", auth);
console.log("Firebase DB:", db);

  return (
    <div >
      <h1>NOTES-TAKING-APP</h1>
      
    </div>
     
       
      

  );
}
