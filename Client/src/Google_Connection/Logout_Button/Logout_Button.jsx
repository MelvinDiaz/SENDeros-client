import React from "react";
import { useAuth0 } from '@auth0/auth0-react';
import './Logout_Button.css'

export const Logout_Button = () => {
    const { logout } = useAuth0();

    return <button onClick={()=> logout({returnTo: window.location.reload()})} className='Logout_Button' > Logout </button>
}