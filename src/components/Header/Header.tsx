import React from "react";
import {Link} from "react-router-dom";
import { apiUrl } from "src/config/api";

interface Props{
    name:string;
}

export const Header=(props:Props)=> {

    const logout = async () => {
        const res = await fetch(`${apiUrl}/auth/logout`, {
            credentials: "include",
        });
    }
return(
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <div className="navbar-collapse collapse w-100 order-0 order-md-0 dual-collapse2">
            <ul className="navbar-nav mr-auto">
                <p className="navbar-brand">Witaj {props.name}</p>
            </ul>
        </div>
        <div className="w-100 order-5">
            <p className="navbar-brand"><strong>MEGA ORDERS</strong></p>
        </div>
        <div className="mx-auto order-5">
            <Link to={'/'} onClick={logout} className="navbar-brand mx-auto">Wyloguj</Link>
        </div>
    </nav>
)
}