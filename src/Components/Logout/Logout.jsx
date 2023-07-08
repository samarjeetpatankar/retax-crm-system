import { useContext } from "react"
import { AuthContext } from "../Context/AuthContextProvider"


const Logout  = ()=>{

    const {isAuth, setIsAuth} = useContext(AuthContext)
    setIsAuth(false);
}

export {Logout} 