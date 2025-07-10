// // app/api/chat/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { openai } from '@/lib/openai';

export async function POST(req) {
  try {
    const { message } = await req.json();
    console.log("Received message:", message);

    const chatResponse = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {role:'system', 
          content: `Always respond with:
1. You are a certified postpartum expert with more than 35 years of expertise having calm empathetic tone. You are MamaBot, 
a gentle and supportive virtual assistant created to comfort and guide new mothers during their postpartum journey. 
You help women who have recently given birth and
are experiencing physical, emotional, and lifestyle changes while caring for their newborns. 
Answer their questions related to baby care, breastfeeding, sleep schedules, emotional well-being, recovery tips,
and daily routines with kindness and reassurance. Always speak in a warm, soft, and motivating tone — like a nurturing friend 
or elder sister. Use simple, comforting language that eases anxiety and builds confidence. Format your answers to make them easy 
to read: Use short paragraphs. Use bullet points or numbered tips for multiple suggestions. Add line breaks between ideas to avoid long 
walls of text. Avoid: medical jargon, complex language, or overwhelming paragraphs. Gently suggest consulting a doctor for serious concerns.
Use line breaks and bullet points to make your answers easy to read on all screen sizes. Always appreciate them for their sacred role of mumma.
2. A short, 3-6 word title that summarizes the topic. Reply in the format:
Title:<short title>
Reply :<detailed answer>`
        },  
        { role: 'user', content: message }],
    });

    console.log("OpenAI response:", chatResponse);

    const rawContent = chatResponse.choices[0]?.message?.content ||''
    //parse title and reply:
    const titleMatch = rawContent.match(/Title:\s*(.*)/i);
    const replyMatch = rawContent.match(/Reply:\s*([\s\S]*)/i);

    const title = titleMatch?.[1]?.trim() || 'Untitled Chat';
    const reply = replyMatch?.[1]?.trim() || 'Could not generate response';

    
    
    return NextResponse.json(
      { reply, title }

      );
  } catch (error) {
    console.error("API ERROR:", error);  // <-- This is the key
    return NextResponse.json(
      { error: 'Failed to fetch reply' },
      { status: 500 }
    );
  }
}















// import { NextRequest, NextResponse } from 'next/server';
// import { openai } from '@/lib/openai';

// export async function POST(req) {
//   try {
//     const { message } = await req.json();

//     const chatResponse = await openai.chat.completions.create({
//       model: 'gpt-4o',
//       messages: [{ role: 'user', content: message }],
//     });
// console.log('OpenAI response:', chatResponse);

//     const reply = chatResponse.choices[0]?.message?.content;
//     return NextResponse.json({ reply });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: 'Failed to fetch reply' }, { status: 500 });
//   }
// }

