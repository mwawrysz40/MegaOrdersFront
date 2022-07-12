import React, {useContext, useEffect, useState} from "react";
import { useParams} from "react-router-dom";
import { OrderProduct } from "types";
import {Table} from "react-bootstrap";
import {NameContext} from "../../contexts/name.context";
import {Header} from "../Header/Header";
import { apiUrl } from "src/config/api";

export const OrderInfo=()=>{
const { id }= useParams();

    const [data, setData] = useState<OrderProduct[]>([]);
    const {name,setName}=useContext(NameContext);

    const orderProducts= async()=>{
        const res=await fetch(`${apiUrl}/order/all-info/${id}`,{
            credentials: "include",
        });
        setData(await res.json());
    }

    useEffect(()=>{
        orderProducts();
    },[]);

    return (
        <>
            <Header name={name}/>
            <br/>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Indeks produktu</th>
                    <th>Nazwa produktu</th>
                    <th>Opis produktu</th>
                    <th>Cena produktu</th>
                    <th>Ilość</th>
                    <th>Rabat</th>
                    <th>Wartość</th>
                </tr>
                </thead>
                <tbody >
                {data.map(row=>{
                    return (
                        <>
                            <tr key={row.itemCode} >
                                <td >{row.itemCode}</td>
                                <td >{row.itemName}</td>
                                <td >{row.description}</td>
                                <td >{row.price}</td>
                                <td>{row.quantity}</td>
                                <td>{row.discount}%</td>
                                <td>{row.totalPrice}</td>
                            </tr>
                        </>
                    )
                })}
                </tbody>
            </Table>
        </>
    )

}


