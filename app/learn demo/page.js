const { createContext, useContext, Children } = require("react");

const AuthContext = createContext()
//createContext creates a container to store and share values (like user info or functions) across your React app without passing props manually through every component

//stores the login state of the user


return(
    <>
    <AuthContext.Provider value={{handlelogout, user}}>
        {Children}
        //children are all pages  and componentsthat need to shre the 'login' information

    </AuthContext.Provider>
    </>
)





export default useAuth =()=> useContext(AuthContext)
//useAuth is a custom hook that allows you to access the AuthContext easily in any component
//useContext is a React hook that lets you access the value of a context directly in your component