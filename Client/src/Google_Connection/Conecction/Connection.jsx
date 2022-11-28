import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Login_Button } from "../Login_Button/Login_Button";
import { Logout_Button } from "../Logout_Button/Logout_Button";
import { Porfile_user } from "../Porfile_user/Porfile_user";

function mostrar({setUserInfo}) {

    const { user, isAuthenticated } = useAuth0();
    const [userInfo2, setUserInfo2] = useState({});
    setUserInfo(userInfo2);
    return (
        <div className="Buttons_Info" >
            {isAuthenticated ? (<>
                <Porfile_user setUserInfo2 = {setUserInfo2}/>
                <div className="Div_Button" >
                    <Logout_Button />
                </div>

            </>
            ) : (
                    <>
                        <Login_Button />
                    </>
            )}
        </div>
    )
}

export default mostrar;