'use client'
import { db } from "@/lib/firebase";
import Header from "../components/header";
import { useAuth } from "../context/AuthContext";
import { useState } from "react"; 
import { addDoc, collection, Timestamp } from "firebase/firestore";

export default function Notes() {
  const [notes, setNotes] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handlesubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "notes"), {
        title,
        notes,
        createdAt: Timestamp.now(),
        userId: user.uid,
      });
      setMessage("Note added successfully!");
      setTitle('');
      setNotes('');
    } catch (error) {
      console.error("Error adding note: ", error);
      setMessage("Failed to add note. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 px-4 py-8">
      <Header />
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 ">
        <h1 className="text-3xl font-extrabold text-pink-700 mb-6 text-center">🌸 Add a New Note</h1>
        <form onSubmit={handlesubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Enter your title"
            className="w-full px-4 py-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Enter your note"
            className="w-full px-4 py-3 border border-pink-300 rounded-lg resize-none h-40 focus:outline-none focus:ring-2 focus:ring-pink-400"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg font-semibold transition ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Adding Note..." : "Add Note"}
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-pink-600 font-medium">{message}</p>
        )}
      </div>
    </div>
  );
}
