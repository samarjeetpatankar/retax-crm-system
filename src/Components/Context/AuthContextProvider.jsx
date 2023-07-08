import {createContext,useState} from 'react';

export const AuthContext = createContext();


export const  AuthContextProvider = ({children})=>{

    const [isAuth, setIsAuth] = useState(false)
    return <AuthContext.Provider value={{isAuth, setIsAuth}}>{children}</AuthContext.Provider>

}