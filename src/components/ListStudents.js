import axios from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";


const ListStudents = ({ students,didUpdate,setDidUpdate }) => {
  
    const deletedStudent=(id)=>{
        if(window.confirm("Silmek istediğinize emin misiniz?")===true){
            axios.delete(`http://localhost:3004/students/${id}`)
            .then((res)=>{
                setDidUpdate(!didUpdate)
            })
            .catch((err)=>{

            })
        }
    }

    

    return (
        <div className="container my-5" >
        <div>
            
        </div>
        <div className="d-flex justify-content-end" >
            <Link className="btn btn-primary" to={"/add-student"} >ÖĞRENCİ EKLE</Link>
        </div>

            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Sıra No</th>
                        <th scope="col">Adı</th>
                        <th scope="col">Soyadı</th>
                        <th scope="col">Ögr No</th>
                        <th scope="col">Sınıfı</th>
                        <th scope="col">Okulu</th>
                        <th scope="col">İşlemler</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        students.length === 0 ? (
                            <tr>
                                <td className="text-center" colSpan={6}>Kayıtlı öğrenci bulunamadı</td>
                            </tr>
                        ) : (
                            <>
                                {
                                    students.map((student,index) => (
                                        <tr key={student.id} >
                                            <th scope="row">{index+1}</th>
                                            <td>{student.firstName}</td>
                                            <td>{student.lastName}</td>
                                            <td>{student.studentNumber}</td>
                                            <td>{student.studentClass}</td>
                                            <td>{student.schoolName}</td>
                                            <td>
                                                <div className="d-flex justify-content-space-between align-items-center gap-2 ">
                                                <button className="btn btn-danger" onClick={()=>{deletedStudent(student.id)}}  >SİL</button>
                                                <Link className="btn btn-secondary" to={`/edit-student/${student.id}`} >GÜNCELLE</Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </>
                        )
                    }

                </tbody>
            </table>
        </div>
    )

}


export default ListStudents