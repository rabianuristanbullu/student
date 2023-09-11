import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditStudent = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [willEditStudent, setWillEditStudent] = useState(null);
  const [inputName, setInputName] = useState("");
  const [inputLastName, setInputLastName] = useState("");
  const [inputNumber, setInputNumber] = useState("");
  const [inputClass, setInputClass] = useState("");
  const [inputSchool, setInputSchool] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3004/students/${params.studentId}`)
      .then((res) => {
        setWillEditStudent(res.data);
        setInputName(res.data.firstName);
        setInputLastName(res.data.lastName);
        setInputNumber(res.data.studentNumber);
        setInputSchool(res.data.schoolName);
        setInputClass(res.data.studentClass);
      });
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();

    // validation
    if (
      inputName === "" ||
      inputLastName === "" ||
      inputNumber === "" ||
      inputClass === "" ||
      inputSchool === ""
    ) {
      alert("TÜM ALANLAR ZORUNLUDUR");
      return;
    }
    const updatedStudent = {
      id: params.studentId,
      firstName: inputName,
      lastName: inputLastName,
      studentNumber: inputNumber,
      studentClass: inputClass,
      studentSchool: inputSchool,
    };
    axios
      .put(`http://localhost:3004/students/${params.studentId}`, updatedStudent)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        alert("GÜNCELLEME SIRASINDA HATAYLA KARŞILAŞILDI");
      });
  };
  if (willEditStudent === null) {
    return null;
  }
  return (
    <>
      <Header />
      <div className="container my-5">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              Öğrencinin Adı
            </label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              placeholder="ör: Ahmet"
              value={inputName}
              onChange={(event) => {
                setInputName(event.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">
              Öğrencinin Soyadı
            </label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              placeholder="ör: YILMAZ"
              value={inputLastName}
              onChange={(event) => {
                setInputLastName(event.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="studentNumber" className="form-label">
              Öğrencinin Numarası
            </label>
            <input
              type="text"
              className="form-control"
              id="studentNumber"
              placeholder="ör: 256"
              value={inputNumber}
              onChange={(event) => {
                setInputNumber(event.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="studentClass" className="form-label">
              Öğrencinin Sınıfı
            </label>
            <input
              type="text"
              className="form-control"
              id="studentClass"
              placeholder="ör: 4/A"
              value={inputClass}
              onChange={(event) => {
                setInputClass(event.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="studentSchool" className="form-label">
              Öğrencinin Okulu
            </label>
            <input
              type="text"
              className="form-control"
              id="studentSchool"
              placeholder="ör: Cumhuriyet İÖO"
              value={inputSchool}
              onChange={(event) => {
                setInputSchool(event.target.value);
              }}
            />
          </div>
          <div className="d-flex justify-content-center my-5">
            <button className="btn btn-primary w-50" type="submit">
              GÜNCELLE
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditStudent;
