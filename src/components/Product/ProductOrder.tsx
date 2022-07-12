import React, {FormEvent, useContext, useEffect, useState} from "react";
import {AddOrderResponse, Product } from "types";
import {Link} from "react-router-dom";
import {Header} from "../Header/Header";
import {NameContext} from "../../contexts/name.context";
import {Form, FormControl} from "react-bootstrap";
import {apiUrl} from "../../config/api";
export const ProductOrder=()=>{

    interface ProductAdd{
        quantity:string;
        idProduct:string;
    }
    const {name,setName}=useContext(NameContext);
    const [data, setData] = useState<Product[]>([]);
    const [formFields, setFormFields] = useState([
        { quantity: '',idProduct:'' },
    ]);
    const [resultInfo, setResultInfo] = useState<string | null>(null);
    const product= async()=>{
        const res=await fetch(`${apiUrl}/product/all-product`);
        setData(await res.json());
    }

    useEffect(()=>{
        product();
    },[]);

    const handleFormChange = (e: any, index:number) => {
        let data = [...formFields];
        data[index][e.target.name as keyof ProductAdd] = e.target.value;
        setFormFields(data);
    }

    const submit = async (e: FormEvent) => {
        e.preventDefault();
         const res = await fetch(`${apiUrl}/order/add`, {
             method: "POST",
             headers: {
                 'Content-Type': 'application/json',
             },
             body: JSON.stringify(formFields),
             credentials: "include",
         })
         const data: AddOrderResponse = await res.json();

         setResultInfo(`${data.id} zamówienie zostało dodane`);
    }
        if (resultInfo !== null) {
            return <div>
                <p><strong>{resultInfo}</strong></p>
                <button onClick={() => setResultInfo(null) }className="btn btn-primary btn-block">Dodaj kolejne zamówienie</button><p></p>
                <Link to={'/profile'}><button  className="btn btn-primary btn-block">Strona Główna</button></Link>
            </div>;
        }





    const addFields = () => {
        let object = {
            quantity: '',
            idProduct:'',
        }

        setFormFields([...formFields, object])
    }

    const removeFields = (index:number) => {
        let data = [...formFields];
        data.splice(index, 1)
        setFormFields(data)
    }

    return (
        <>
        <Header name={name}/>
    <br/>
        <div className="container">
            <Form onSubmit={submit}>
                {formFields.map((form:ProductAdd, index:number) => {
                    return (
                        <div key={index}>
                            <Form.Select name='idProduct' value={form.idProduct} onChange={event => handleFormChange(event, index)}>
                                <option>Wybierz produkt</option>
                                {data.map(data => (
                                    <option key={data.id}  value={data.id}>{data.itemName} Cena:{data.price}zł Ilość na magazynie {data.quantity}</option>
                                ))}
                            </Form.Select>
                            <FormControl
                                name='quantity'
                                placeholder='Ilość'
                                onChange={event => handleFormChange(event, index)}
                                value={form.quantity}
                            />

                            <button className="btn btn-danger" onClick={() => removeFields(index)}>Usuń produkt</button>
                        </div>
                    )
                })}
            </Form>
            <button className="btn btn-primary btn-block" onClick={addFields}>Dodaj kolejny produkt..</button>
            <br />
            <button className="btn btn-primary btn-block" onClick={submit}>Zapisz</button>
        </div>
        </>
    );
}