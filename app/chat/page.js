'use client'

import React from 'react'
import Header from '../components/header'
import Chatbox from '../components/chatbox'
import Chathistory from '../components/chathistory'
import { useState } from 'react'

export default function Chat() {

const [selectedChat, setSelectedChat] = useState(null);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex flex-1">
        {/* Chat History Sidebar */}
        <div className="w-full md:w-1/4 bg-rose-50 border-r border-gray-200 overflow-y-auto p-4">
          <Chathistory onSelectChat={setSelectedChat} />
        </div>

        {/* Main Chatbox */}
        <div className="w-full md:w-3/4 p-4">
          <Chatbox selectedChat={selectedChat} />
        </div>
      </div>
    </div>
  )
}
