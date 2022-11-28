import React from "react";
import { useAuth0 } from '@auth0/auth0-react';
import './Porfile_user.css';

export const Porfile_user =  ({setUserInfo2} ) => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <div>Loading...</div>
    }
    else {
        console.log(user);
        const mandarRegistro = {
            "username": user.given_name,
            "name": user.given_name,
            "email": user.email,
            "password": "facilitoPerro5"
        }
        const mandarInicio = {
            "identifier" : user.email,
	        "password" : "facilitoPerro5"
        }

        const fetchUser = async () => {
            const response = await fetch("https://senderos.herokuapp.com/api/auth/signin",{
            method: 'POST',
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(mandarInicio)
        });
        console.log(response);
        if(!response.ok){
            const response = await fetch("https://senderos.herokuapp.com/api/auth/signup",{
            method: 'POST',
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(mandarRegistro)
        });

            
        } else {
            const inicio = await response.json();
            console.log(inicio);
            const token = inicio.token;
            setUserInfo2(token);
        }
    }

        fetchUser();
    }

    return (
        isAuthenticated && (
            <div className="User" >
                <h2 className="Name_user" >{ user.given_name }</h2>
            </div>
        )
    )
}