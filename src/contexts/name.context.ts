import {createContext} from "react";

export const NameContext=createContext({
    name:'',
    setName:(s:string)=>{},
})