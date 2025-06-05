'use client';
import { useAuth } from "../context/AuthContext";
import { db } from "@/lib/firebase";
import { useState, useEffect } from "react";
import { collection, query, where, orderBy, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
import Button from "../components/button";
import Header from "../components/header";

export default function Dashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notes, setNotes] = useState([]);
  const [editNoteId, setEditNoteId] = useState();
  const [editTitle, setEditTitle] = useState("");
  const [editText, setEditText] = useState("");

  useEffect(() => {
    if (!user?.uid) return;

    const fetchNotes = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, "notes"),
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        const notesArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotes(notesArray);
      } catch (error) {
        console.error("Error fetching notes:", error.code, error.message);
        setError("Failed to fetch notes. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [user]);

  const handleEdit = (note) => {
    setEditNoteId(note.id);
    setEditTitle(note.title);
    setEditText(note.notes);
  };

  const handleSave = async (id) => {
    await updateDoc(doc(db, "notes", id), {
      title: editTitle,
      notes: editText,
    });
    setNotes((prevNotes) =>
      prevNotes.map((n) =>
        n.id === id ? { ...n, title: editTitle, notes: editText } : n
      )
    );
    setEditNoteId(null);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "notes", id));
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    
    <div className="min-h-screen bg-pink-50 px-4 py-6">
      <Header />
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl text-center font-extrabold text-pink-700 mb-6">🌸 Mom's Memory Keeper</h1>

        {loading && <p className="text-center text-pink-500">Loading your special notes...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        <div className="grid gap-6">
          {notes.map((note) => (
            <div key={note.id} className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-pink-300 transition hover:shadow-xl">
              {editNoteId === note.id ? (
                <>
                  <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full p-3 mb-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                    placeholder="Edit title"
                  />
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="w-full p-3 mb-3 border border-pink-200 rounded-lg resize-none h-32 focus:outline-none focus:ring-2 focus:ring-pink-400"
                    placeholder="Edit note"
                  />
                  <div className="flex gap-2 justify-end">
                    <Button variant="primary" onClick={() => handleSave(note.id)}>
                      Save
                    </Button>
                    <Button variant="cancel" onClick={() => setEditNoteId(null)}>
                      Cancel
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-pink-800 mb-1">{note.title}</h2>
                  <p className="text-gray-700 whitespace-pre-wrap">{note.notes}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Created at: {note.createdAt.toDate().toLocaleString()}
                  </p>
                  <div className="mt-4 flex justify-end gap-2">
                    <Button variant="danger" onClick={() => handleDelete(note.id)}>
                      Delete
                    </Button>
                    <Button variant="edit" onClick={() => handleEdit(note)}>
                      Edit
                    </Button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
