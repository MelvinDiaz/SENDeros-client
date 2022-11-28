import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import './Login_Button.css'
import Logo from '../../Logo/SENDeros.png';

export const Login_Button = () => {
    const { loginWithRedirect } = useAuth0();
    
    


    return <button onClick={() => loginWithRedirect()} className='Login_Button' > <img src={ Logo } className='Logo_Button' ></img> <h3 className='Registro' >Registro</h3> </button>
}