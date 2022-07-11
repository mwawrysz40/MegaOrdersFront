import {ErrorMessage, Field, Form, Formik} from "formik";
import React, {useContext, useState} from "react";
import {ProductAdd,AddProductResponse} from 'types';
import * as Yup from "yup";
import {Alert} from "react-bootstrap";
import {Header} from "../Header/Header";
import {NameContext} from "../../contexts/name.context";

export const AddProduct=()=>{

    const [resultInfo, setResultInfo] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const {name,setName}=useContext(NameContext);

    const initialValues:ProductAdd={
        itemCode:'',
        itemName:'',
        description:'',
        quantity:0,
        price:0,
    };

    const validationSchema=Yup.object().shape({
        itemCode:Yup.string().required('Pole wymagane'),
        itemName:Yup.string().required('Pole wymagane'),
        description:Yup.string().required('Pole wymagane'),
        quantity:Yup.number().required('Pole wymagane'),
        price:Yup.number().required('Pole wymagane'),
    });

    const handleProduct=async(formValue:ProductAdd)=>{
        const res=await fetch('http://localhost:3001/product/add', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formValue),
            credentials: "include",
        })
        const data: AddProductResponse = await res.json();
        setResultInfo(`${data.itemCode} produkt został dodany`);
    }

    if (resultInfo !== null) {
        return <div>
            <p><strong>{resultInfo}</strong></p>
            <button onClick={() => setResultInfo(null)}>Dodaj kolejny produkt</button>
        </div>;
    }


    return(
        <>
            <Header name={name}/>
            <br/>
            <div className="container">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleProduct}
                >
                    <Form>
                        <div className="form-group">
                            <label htmlFor="itemCode">Indeks produktu</label>
                            <Field name="itemCode" type="text" className="form-control" />
                            <ErrorMessage
                                name="itemCode"
                                component="div"
                                className="alert alert-danger"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="itemName">Nazwa produktu</label>
                            <Field name="itemName" type="text" className="form-control" />
                            <ErrorMessage
                                name="itemName"
                                component="div"
                                className="alert alert-danger"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Opis produktu</label>
                            <Field name="description" type="text" className="form-control" />
                            <ErrorMessage
                                name="description"
                                component="div"
                                className="alert alert-danger"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="quantity">Ilość na magazynie</label>
                            <Field name="quantity" type="number" className="form-control" />
                            <ErrorMessage
                                name="quantity"
                                component="div"
                                className="alert alert-danger"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="price">Cena produktu</label>
                            <Field name="price" type="number" className="form-control" />
                            <ErrorMessage
                                name="price"
                                component="div"
                                className="alert alert-danger"
                            />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                                {loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <span>Zapisz</span>
                            </button>
                        </div>
                        {loading && (<Alert variant="danger">{message}</Alert>  )}

                    </Form>
                </Formik>
            </div>
        </>
    )
}