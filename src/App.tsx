import React, {useState} from 'react';
import './App.css';
import {Route, Router, Routes} from 'react-router-dom';
import { AddUser } from './components/AddUser/AddUser';
import {Login} from "./components/Login/Login";
import { Profile } from './components/Profile/Profile';
import {AddProduct} from "./components/AddProduct/AddProduct";
import {ProductOrder} from "./components/Product/ProductOrder";
import {OrderUser} from "./components/OrderUser/OrderUser";
import {OrderInfo} from "./components/OrderInfo/OrderInfo";
import {OrderAdmin} from "./components/OrderAdmin/OrderAdmin";
import { NameContext } from './contexts/name.context';


export const App = () => {

    const [name,setName]=useState('');

  return (
      <>
          <NameContext.Provider value={{name ,setName}}>
        <Routes>
          <Route  path="/user" element={<AddUser/>}/>
            <Route  path="/" element={<Login/>}/>
            <Route  path="/profile" element={<Profile/>}/>
            <Route  path="/add-product" element={<AddProduct/>}/>
            <Route  path="/add-order" element={<ProductOrder/>}/>
            <Route path="/order-user" element={<OrderUser/>}/>
            <Route path="/order-info/:id" element={<OrderInfo/>}/>
            <Route path="/order-admin" element={<OrderAdmin/>}/>
        </Routes>
          </NameContext.Provider>
      </>
  );
}

export default App;
