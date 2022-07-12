import React, {useContext, useEffect, useState} from "react";
import { OrdersUser } from "types";
import { format } from 'date-fns'
import {Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import {Header} from "../Header/Header";
import {NameContext} from "../../contexts/name.context";
import { apiUrl } from "src/config/api";

export const OrderUser=()=>{

    const [data, setData] = useState<OrdersUser[]>([]);
    const {name,setName}=useContext(NameContext);
    const order= async()=>{
        const res=await fetch(`${apiUrl}/order/all-user`,{
            credentials: "include",
        });
        //console.log(await res.json())
        setData(await res.json());
    }

    useEffect(()=>{
        order();
    },[]);



    return (
        <>
            <Header name={name}/>
            <br/>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Status</th>
                    <th>Data zamówienia</th>
                    <th></th>
                </tr>
                </thead>
                <tbody >
                {data.map(row=>{
                    return (
                        <>
                        <tr key={row.id} >
                            <td >{row.id}</td>
                            <td >{row.status}</td>
                            <td >{format(new Date(row.createAt),'yyyy-MM-dd')}</td>
                            <td ><Link to={`/order-info/${row.id}`}><button  className="btn btn-primary btn-block">Szczegóły</button></Link></td>
                        </tr>
                        </>
                    )
                })}
                </tbody>
            </Table>
        </>
    )
}