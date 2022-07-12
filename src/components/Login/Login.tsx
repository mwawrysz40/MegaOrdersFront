import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {Link, useNavigate} from 'react-router-dom';
import {Alert} from "react-bootstrap";
import { LoginUser } from "types";
import { apiUrl } from "src/config/api";


export const Login = () => {
        const [loading, setLoading] = useState<boolean>(false);
        const [message, setMessage] = useState<string>("");
        const navigate = useNavigate();
        const initialValues:LoginUser= {
                login: "",
                pass: "",
        };

        const validationSchema = Yup.object().shape({
                login: Yup.string().required("Pole jest wymagane!"),
                pass: Yup.string().required("Pole jest wymagane!"),
        });

        const handleLogin = async (formValue: LoginUser) => {


                        const res = await fetch(`${apiUrl}/auth/login`, {
                                method: "POST",
                                headers: {
                                        'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(formValue),
                                credentials: "include",
                        });
                        const data = await res.json();
                        if (data.ok) {
                                navigate('/profile')
                        }
                if (data.error) {
                        setMessage(data.error);
                       setLoading(true);
                }};

        return (
            <>
                    <h1 className="text-center">MEGA ORDERS</h1>
                    <div className="container">
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleLogin}
                            >
                                    <Form>
                                            <div className="form-group">
                                                    <label htmlFor="login">Username</label>
                                                    <Field name="login" type="text" className="form-control" />
                                                    <ErrorMessage
                                                        name="login"
                                                        component="div"
                                                        className="alert alert-danger"
                                                    />
                                            </div>

                                            <div className="form-group">
                                                    <label htmlFor="pass">Password</label>
                                                    <Field name="pass" type="password" className="form-control" />
                                                    <ErrorMessage
                                                        name="pass"
                                                        component="div"
                                                        className="alert alert-danger"
                                                    />
                                            </div>

                                            <div className="form-group">
                                                    <button type="submit" className="btn btn-primary btn-block" >
                                                            <span>Login</span>
                                                    </button>
                                            </div>
                                            {loading && (<Alert variant="danger">{message}</Alert>  )}

                                    </Form>
                            </Formik>
                            <Link to={"/user"} className="nav-link text-center text-black display-6 ">Zarejestruj się </Link>
                    </div>

            </>
        );
};

