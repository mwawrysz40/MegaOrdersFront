import React, {useContext, useEffect, useState} from "react";
import {Header} from "../Header/Header";
import {Button, Stack} from "react-bootstrap";
import {Link} from "react-router-dom";
import {NameContext} from "../../contexts/name.context";
import { apiUrl } from "src/config/api";


export const Profile=()=>{
    const [rola,setRola]=useState<string>();
    const {name,setName}=useContext(NameContext);


useEffect(()=>{
    (async ()=>{
    const res=await fetch(`${apiUrl}/user/user-rola`,{
        credentials: "include",
    });
    const data=await res.json();
        setRola(data.role);
        setName(data.name);
})()},[]);

    return (
        <>
    <Header name={name}/>
        <br/>

<Stack gap={4} className="col-md-8 mx-auto">
    {(rola==='admin' && <Button  variant="outline-secondary"> <Link to={"/add-product"} className="nav-link text-black">Dodaj produkt</Link></Button>)}
    {(rola==='admin' && <Button variant="outline-secondary"><Link to={"/order-admin"} className="nav-link text-black">Lista zamówień</Link></Button>)}
    {(rola==='user' &&<Button variant="outline-secondary"><Link to={"/add-order"} className="nav-link text-black">Dodaj zamówienie</Link></Button>)}
    {(rola==='user' &&<Button variant="outline-secondary"><Link to={"/order-user"} className="nav-link text-black">Moje zamówienia</Link></Button>)}
</Stack>

    </>
)
}