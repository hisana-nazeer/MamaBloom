'use client'
import React from 'react'
import {useRouter} from 'next/navigation'
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { collection, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';


import { getDocs } from 'firebase/firestore';

export default function Chathistory({ onSelectChat}) {
    const { user } =useAuth()
    const [chats, setChats] =useState([])




useEffect(() => {
    //  if (user === undefined) return; // auth still loading
    if (!user) {
        return;
    }

    // Fetch chat data
    const fetchChats = async () => {
        const q = query(collection(db,'users', user.uid, 'conversations'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const chatList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setChats(chatList);
        };
      fetchChats()
       
    }, [user]);
    
    const handleRename = async (id, newTitle) => {
        await updateDoc(doc(db, 'users', user.uid, "conversations", id),
            { title: newTitle });
        setChats(chats.map((c) => (c.id === id ?
            { ...c, title: newTitle } : c)));
    };
    
    const handleDelete = async (id) => {
        await deleteDoc(doc(db, 'users', user.uid, 'conversations', id));
        setChats(chats.filter((chat) => chat.id !== id));
    };
   

  return (
    <div>
        <h2> your chats</h2>
        {chats.map((chat) => (
        <div key={chat.id} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button onClick={() => onSelectChat(chat)}>
                {chat.title}
            </button>
            <button
                onClick={() => {
                    const newTitle = prompt("Enter new title:", chat.title);
                    if (newTitle) {
                        handleRename(chat.id, newTitle);
                    }
                }}
            >✏️</button>
            <button
                onClick={() => {
                    if (window.confirm("Are you sure you want to delete this chat?")) {
                        handleDelete(chat.id);
                    }
                }}
            >🗑️</button>
        </div>
        ))}

    </div>
  );
}
 