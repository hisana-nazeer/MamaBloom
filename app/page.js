'use client';
import Header from './components/header';
import Login from './login/page';
<link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;600&display=swap" rel="stylesheet"></link>

export default function Home() {
    console.log("Welcome to Notes");
  return (
    <div>
      <Header />
   
      <Login/>
      
      
     
    </div>
  );
}
