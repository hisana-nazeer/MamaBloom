'use client'

import React, { useState } from 'react'
import Header from '../components/header'
import Chatbox from '../components/chatbox'
import Chathistory from '../components/chathistory'

export default function Chat() {
  const [selectedChat, setSelectedChat] = useState(null)

  return (
    <div className="min-h-screen bg-rose-50 flex flex-col">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50">
        <Header />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Sidebar - Chat History */}
        <aside className={`${showHistory ? 'block' : 'hidden'} md:block w-full md:w-1/3 lg:w-1/4 bg-white border-b md:border-b-0 md:border-r border-rose-200 shadow-inner overflow-y-auto p-4 h-60 md:h-auto`}>
  <h2 className="text-lg font-semibold text-rose-600 mb-4">Chat History</h2>
  <Chathistory onSelectChat={setSelectedChat} />
</aside>

        {/* Main Chatbox */}
        <main className="w-full md:w-2/3 lg:w-3/4 p-4 overflow-y-auto flex flex-col flex-1">
          <div className="bg-white shadow-md rounded-2xl p-4 sm:p-6 border border-rose-100 flex flex-col flex-1">
            <Chatbox selectedChat={selectedChat} />
          </div>
        </main>
      </div>
    </div>
  )
}
