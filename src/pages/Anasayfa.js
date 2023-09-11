import React, { useEffect, useState } from "react";

import axios from "axios";

import Header from "../components/Header";
import ListStudents from "../components/ListStudents";


const Anasayfa= ()=>{
    const [students,setStudents]=useState(null)
    const [didUpdate,setDidUpdate]=useState(false)
    useEffect(()=>{
        axios
        .get("http://localhost:3004/students")
        .then((res)=>{
            setStudents(res.data)})
            
        .catch((err)=>{
            alert("hataaa")
        })
    },[didUpdate])

    if(students===null)return null;

return(
    <div>
        <Header/>
        <ListStudents
        students={students}
        didUpdate={didUpdate}
        setDidUpdate={setDidUpdate}
        />

    </div>
)
}
export default Anasayfa