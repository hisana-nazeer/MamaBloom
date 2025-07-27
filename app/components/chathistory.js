'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { collection, query, orderBy, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function Chathistory({ onSelectChat }) {
  const { user } = useAuth();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchChats = async () => {
      const q = query(collection(db, 'users', user.uid, 'conversations'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const chatList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setChats(chatList);
    };
    // const fetchChats=async () =>{
    //   const res = await fetch("/api/history",{
    //     method:"POST",
    //     headers:{'Content-Type':'application/json'},
    //     body:JSON.stringify({uid:user.uid})
    //   })
    //   const data=await res.json()
    //   console.log("Fetched chats:", data);
    //   if(data.conversations){
    //     setChats(data.conversations)
    //   }
    // }

    fetchChats();
  }, [user]);

  const handleRename = async (id, newTitle) => {
    await updateDoc(doc(db, 'users', user.uid, 'conversations', id), { title: newTitle });
    setChats(chats.map((c) => (c.id === id ? { ...c, title: newTitle } : c)));
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this chat?")) {
      await deleteDoc(doc(db, 'users', user.uid, 'conversations', id));
      setChats(chats.filter((chat) => chat.id !== id));
    }
  };

  return (
    <div className="bg-pink-50 p-4 h-full overflow-y-auto">
      <h2 className="text-lg font-semibold text-rose-700 mb-4">🌸 Your Chats</h2>

      {chats.length === 0 ? (
        <p className="text-sm text-rose-400 italic">No chats yet, mama. Start one now 💬</p>
      ) : (
        <div className="space-y-2">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className="bg-white border border-rose-200 rounded-xl px-4 py-3 flex justify-between items-center shadow-sm hover:shadow-md transition"
            >
              <button
                onClick={() => onSelectChat(chat)}
                className="text-left text-rose-800 font-medium truncate hover:underline"
                title={chat.title}
              >
                {chat.title}
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const newTitle = prompt("Enter new title:", chat.title);
                    if (newTitle) handleRename(chat.id, newTitle);
                  }}
                  title="Rename"
                  className="text-pink-500 hover:text-pink-700 transition"
                >
                  ✏️
                </button>

                <button
                  onClick={() => handleDelete(chat.id)}
                  title="Delete"
                  className="text-red-400 hover:text-red-600 transition"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}