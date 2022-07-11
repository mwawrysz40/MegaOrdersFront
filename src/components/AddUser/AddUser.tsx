import {ErrorMessage, useFormik} from "formik";
import React, {useState} from "react";
import {RegisterUser,RegisterUserResponse,UserRoleType} from 'types'
import {Button, Form, FormGroup} from "react-bootstrap";
import {Link} from "react-router-dom";
import * as Yup from "yup";

export const AddUser = () => {

   const [loading, setLoading] = useState<boolean>(false);
    const [resultInfo, setResultInfo] = useState<string | null>(null);

    const validationSchema=Yup.object().shape({
        login:Yup.string().required('Pole wymagane').min(3,'Minimum 3 znaki').max(20,'Maksymalnie 20 znaków'),
        pass:Yup.string().required('Pole wymagane'),
        name:Yup.string().required('Pole wymagane'),
        email:Yup.string().required('Pole wymagane').email('Niepoprawny adres e-mail'),
    });

    const formik=useFormik({
        initialValues:{
            login:"",
            pass:"",
            role:UserRoleType.USER,
            name:"",
            email:"",
            isVIP:"NIE",
            discount: 0
        },
        validationSchema,
        onSubmit:async (values:RegisterUser)=>{
            setLoading(true);
                const res=await fetch('http://localhost:3001/user/register', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                    credentials: "include",
                })
                const data: RegisterUserResponse = await res.json();
                setResultInfo(`${data.login} użytkownik został dodany`);
        },
    });

    if (resultInfo !== null) {
        return <div>
            <p><strong>{resultInfo}</strong></p>
            <button onClick={() => setResultInfo(null)} className="btn btn-primary btn-block">Dodaj kolejnego użytkownika</button><p></p>
            <Link to={'/'}><button  className="btn btn-primary btn-block">Zaloguj</button></Link>
        </div>;
    }

    const loginError=formik.errors.login?(<p className="alert-danger">{formik.errors.login}</p>):null;
    const passError=formik.errors.pass?(<p className="alert-danger">{formik.errors.pass}</p>):null;
    const nameError=formik.errors.name?(<p className="alert-danger">{formik.errors.name}</p>):null;
    const emailError=formik.errors.email?(<p className="alert-danger">{formik.errors.email}</p>):null;

    return (
        <div className="container">
            <h2>Dodaj nowego kontrahenta </h2>
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group>
                    <Form.Label>Login</Form.Label>
                    <Form.Control
                        className="w-25"
                        name="login"
                        onChange={formik.handleChange}
                        type="text" value={formik.values.login} />
                </Form.Group>
                {loginError}
                <Form.Group>
                    <Form.Label>Hasło
                        <Form.Control
                            name="pass"
                            onChange={formik.handleChange}
                            type="text" value={formik.values.pass} />
                    </Form.Label>
                    </Form.Group>
                {passError}
                    <Form.Group>
                    <Form.Label>Rola
                        <Form.Select
                            name="role"
                            onChange={formik.handleChange}
                            value={formik.values.role} >
                            {Object.values(UserRoleType).map(key => (
                                <option key={key} value={key}>{key}</option>
                            ))}
                                </Form.Select>
                    </Form.Label>
                    </Form.Group>
                    <Form.Group>
                    <Form.Label>Nazwa
                        <Form.Control
                            name="name"
                            onChange={formik.handleChange}
                            type="text" value={formik.values.name} />
                    </Form.Label>
                    </Form.Group>
                {nameError}
                    <Form.Group className="w-25" controlId="formBasicEmail">
                    <Form.Label>E-mail</Form.Label>
                        <Form.Control
                            className="mb-3"
                            name="email"
                            onChange={formik.handleChange}
                            type="email" value={formik.values.email} />
                    </Form.Group>
                {emailError}
                    <Form.Label>Kontrahent VIP
                        <Form.Select
                            name="isVIP"
                            onChange={formik.handleChange}
                             value={formik.values.isVIP} >
                            <option value="NIE">NIE</option>
                            <option value="TAK">TAK</option>
                        </Form.Select>
                    </Form.Label>
                    <Form.Group>
                    <Form.Label>Rabat
                        <Form.Control
                            name="discount"
                            onChange={formik.handleChange}
                            type="number" value={formik.values.discount} />
                    </Form.Label>
                    </Form.Group>
                    <Form.Group>
                    <Button variant="primary" size="lg" type="submit">Wyślij</Button>
                    </Form.Group>
                </Form>

        </div>
    );
};