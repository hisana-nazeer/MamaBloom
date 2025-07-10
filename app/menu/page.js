'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

function page() {

    const router = useRouter()

    const handleNotes= () =>{
        router.push('/notes')
    }

    const handleQnA = () => {
        router.push('/chat')
    }


  return (
    <div>
        <h1 onClick={handleNotes}
         className="cursor-pointer text-blue-600 hover:underline"
      >
        Write notes</h1>
        <h1 onClick={handleQnA}
         className="cursor-pointer text-blue-600 hover:underline"
      >
        Q&A chatbot</h1>
            </div>
  )
}

export default page