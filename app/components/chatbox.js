"use client";

import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import TypingIndicator from "./typingIndicator";
import CryptoJS from "crypto-js";

export default function Chatbox({ selectedChat }) {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi there mama! 💖 How can I support you today?" },
  ]);
  const { user } = useAuth();
  const router = useRouter();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const [authChecked, setAuthChecked] = useState(false);

  const secretKey = process.env.NEXT_PUBLIC_CHAT_SECRET;

  const encryptMessage= (text) =>{
    return CryptoJS.AES.encrypt(text, secretKey).toString();
  }
 

  useEffect(() => {
    if (user === undefined) {
      return;
    }
    if (!user) {
      router.push("/login");
      return;
    } else {
      setAuthChecked(true);
    }
  }, [user]);

  //authloading is false when firebase finish the checkimng

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

 useEffect(() => {
  if (selectedChat) {
    setMessages(selectedChat.messages || []);
  }
}, [selectedChat]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    

    const typingPlaceholder = { sender: "bot", text: "Typing..." };
    const tempMessages = [...messages, userMessage, typingPlaceholder];
    setMessages(tempMessages);
    setInput("");
    setLoading(true);

    try {
      // Save user message separately if needed

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      const botReply = data.reply || "Hmm, can you say that differently? 😊";
     
      const chatTitle = data.title || input.trim().split(" ").slice(0, 4).join(" ");
     
      const finalMessages = [
        ...tempMessages.slice(0, -1),
        { sender: "bot", text: botReply },
      ];

      // Replace 'Typing...' with real bot reply
      setMessages(finalMessages);

      // Store full chat as a conversation
      await addDoc(collection(db, "users", user.uid, "conversations"), {
        title: chatTitle,
        messages: finalMessages,
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      console.error("Error fetching reply:", err);
      setMessages((prev) => [...prev.slice(0, -1)]);
    } finally {
      setLoading(false);
    }
  }
  if (!authChecked) {
    return (
      <div className="p-8 text-center text-lg">Checking login status...</div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-100 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-3xl flex flex-col overflow-hidden border border-rose-200">
        {/* Header */}
        <div className="bg-rose-100 text-rose-800 px-6 py-4 text-center text-2xl font-extrabold tracking-wide rounded-t-3xl shadow">
          🌸 MamaBloom
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 max-h-[70vh]">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`whitespace-pre-line text-base leading-relaxed px-5 py-4 rounded-2xl shadow-md ${
                  msg.sender === "user"
                    ? "bg-blue-100 text-blue-900 self-end"
                    : "bg-rose-100 text-rose-900 self-start"
                } max-w-[85%] md:max-w-[75%] lg:max-w-[65%]`}
              >
                {msg.text === "Typing..." ? (
                  <TypingIndicator />
                ) : (
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                )}
              </div>
            </div>
          ))}

          <div ref={bottomRef} />
        </div>

        {/* Input Area */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center border-t border-gray-200 bg-white px-4 py-3 gap-3"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question, mama 💬"
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-rose-300"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2 rounded-full text-base font-medium transition disabled:opacity-50"
          >
            {loading ? "..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}
