import React, { useContext, useEffect, useState} from "react";
import { OrdersAdmin, OrderStatus } from "types";
import {Table} from "react-bootstrap";
import {format} from "date-fns";
import {NameContext} from "../../contexts/name.context";
import {Header} from "../Header/Header";
import { apiUrl } from "src/config/api";

export const OrderAdmin=()=>{

    const [data, setData] = useState<OrdersAdmin[]>([]);
    const {name,setName}=useContext(NameContext);
    const order= async()=>{
        const res=await fetch(`${apiUrl}/order/all`,{
            credentials: "include",
        });
        setData(await res.json());
    }

    const handleFormChange = async (e:any) => {
        const id=e.target.id;
        const stat=e.target.value;
        const change={"id":id,"status":stat};
        const res = await fetch(`${apiUrl}/order/change-status`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(change),
            credentials: "include",
        })
    }

    useEffect(()=>{
        order();
    },[]);

    return(
        <>
            <Header name={name}/>
            <br/>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Kontrahent</th>
                    <th>Status</th>
                    <th>Data zamówienia</th>
                </tr>
                </thead>
                <tbody >
                {data.map(row=>{
                    return (
                        <>
                            <tr key={row.id} >
                                <td >{row.id}</td>
                                <td>{row.name}</td>
                                <td>
                                    <select  defaultValue={row.status} id={row.id} onChange={event => handleFormChange(event)}>
                                        {Object.values(OrderStatus).map(key => (
                                            <option key={key} value={key} >{key}</option>
                                        ))}
                                    </select>


                                </td>
                               <td>{format(new Date(row.createAt),'yyyy-MM-dd')}</td>
                            </tr>
                        </>
                    )
                })}
                </tbody>
            </Table>
        </>
    )

}