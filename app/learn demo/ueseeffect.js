const { useEffect } = require("react");

const [user, setUser]= useState(null)

// useEffect(()=>{ what to do? ,[when to do]

// firebase has to listen to the changes in the authentication state
//ie, if the logged in user logged out
useEffect(()=>{ 
    const unsubscribe = onAuthStateChanged(auth, (user)=>{
        if(user){
            setUser(user)
        }
        else{
            Router.push('/login')
        }
    return ()=>{
        unsubscribe() //cleanup function to stop listening to auth changes
    }
    })


})
// Let’s say your school has a Security Guard 🚓 at the main gate.

// This guard keeps a big attendance book 📒.

// Whenever a student logs in or out (enters or leaves), the guard writes it down.

// The teacher can ask the guard:

// “Hey, is anyone logged in? Who’s that?”

// That guard is auth. 🔐
// return () => { unsubscribe(); }
// At the end of the day, when the teacher leaves, they stop watching the door.
// This cleanup is like saying:

// “Okay, I don’t need to keep checking anymore — I’m done for the day!”

// This keeps things neat and prevents memory leaks.

