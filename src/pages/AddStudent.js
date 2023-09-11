import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


import Header from "../components/Header";



const AddStudent = () => {
   const [inputName,setInputName]=useState("")
   const [inputLastName,setInputLastName]=useState("")
   const [inputNumber,setInputNumber]=useState("")
   const [inputClass,setInputClass]=useState("")
   const [inputSchool,setInputSchool]=useState("")
   const [student,setStudent]=useState(null)

   const  navigate =useNavigate()

   const formHandle =(event)=>{
    event.preventDefault()

    // validationn

    if(inputName===""|| 
    inputLastName===""|| 
    inputNumber===""|| 
    inputClass==="" || 
    inputSchool===""){
        alert("ALANLARIN HEPSİ ZORUNLUDUR")
        return
    }

    const hasStudent=student.find(item=>item.studentNumber === inputNumber)
        if(hasStudent !== undefined){
            alert(`${inputNumber} Numaralı Bir Öğrenci Sistemde Mevcut`)
        }

    const newStudent={
        id: String(new Date().getTime()),
        firstName: inputName,
        lastName: inputLastName,
        studentNumber: inputNumber,
        studentClass: inputClass,
        schoolName: inputSchool
    }

    axios
    .post("http://localhost:3004/students",newStudent)
    .then((res)=>{
        navigate("/")
    })
    .catch((err)=>{

    })

   }
   useEffect(()=>{
    axios.get(" http://localhost:3004/students")
    .then((res)=>{
        setStudent(res.data)
    })
    .catch((err)=>{

    })
   },[])

   if(student===null){return null}

    return (
        <div>
            <Header />
            <div className="container my-5">
                <form onSubmit={formHandle} >
                    <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">Öğrencinin Adı</label>
                        <input 
                        type="text" 
                        className="form-control" 
                        id="firstName" 
                        placeholder="ör: Ahmet"
                        value={inputName}
                        onChange={(event)=>{setInputName(event.target.value)}}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">Öğrencinin Soyadı</label>
                        <input 
                        type="text" 
                        className="form-control" 
                        id="lastName" 
                        placeholder="ör: YILMAZ"
                        value={inputLastName}
                        onChange={(event)=>{setInputLastName(event.target.value)}}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="studentNumber" className="form-label">Öğrencinin Numarası</label>
                        <input 
                        type="text" 
                        className="form-control" 
                        id="studentNumber" 
                        placeholder="ör: 1110" 
                        value={inputNumber}
                        onChange={(event)=>{setInputNumber(event.target.value)}}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="studentClass" className="form-label">Öğrencinin Sınıfı</label>
                        <input 
                        type="text" 
                        className="form-control" 
                        id="studentClass" 
                        placeholder="ör: 4/A" 
                        value={inputClass}
                        onChange={(event)=>{setInputClass(event.target.value)}}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="schoolName" className="form-label">Öğrencinin Okulu</label>
                        <input 
                        type="text" 
                        className="form-control" 
                        id="schoolName" 
                        placeholder="ör: Cumhuriyet İÖO" 
                        value={inputSchool}
                        onChange={(event)=>{setInputSchool(event.target.value)}}
                        />
                    </div>
                    <div className="d-flex justify-content-center" >
                        <button type="submit" className="btn btn-primary w-50">KAYDET</button>
                    </div>
                </form>
            </div>


        </div>
    )
}

export default AddStudent