// /api/history/route.ts ← 
// for fetching + decrypting chat history (you want to implement this now)
import { db} from '@/lib/firebase';
import CryptoJS from 'crypto-js';
import { orderBy } from 'firebase/firestore';
import { NextResponse } from 'next/server';

const secretKey = process.env.CHAT_SECRET;


function decryptMessage(encryptedText) {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8) || 'Untitled Chat';
  } catch {
    return 'Untitled Chat';
  }
}

export async function POST(req){
    try{
        const body =await req.json()
        const uid = body.uid

        if(!uid){
            return NextResponse.json({error:'UID is required'})
        }
        const q = query(
            collection(db,'users',uid, 'conversations'),
            orderBy('createdAt','desc')
        )
        const snapshot= await getDocs(q)

    const conversations = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
            id: doc.id,
            title,
            messages: data.messages, // Still encrypted
            createdAt: data.createdAt,
        };
    });

    return NextResponse.json({ conversations });
  } catch (err) {
    console.error('Error fetching chat history:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}