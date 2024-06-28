import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
export default function About() {
  const [doctors, setDoctors] = useState([]);
  const [department, setDepartment] = useState('');
  let navigate=useNavigate()
  const fetchDoctors = async () => {
    
      const { data } = await axios.get(
        "http://localhost:4000/doctor-api/doctors"
      );
      setDoctors(data.doctors);
      console.log(doctors.avthar);
  }
  useEffect(() => {
    
    fetchDoctors();
  }, []);
  function set(e){
    setDepartment(e.target.value)
    console.log(e.target.value);
  }
  // let readDocument=(doctor)=>{
    
  //   navigate(`/document/${doctor.FirstName} ${doctor.LastName}`,{state:doctor})
  // }

  const showPdf = (pdf) => {
    window.open(`http://localhost:4000/uploads/${pdf}`, "_blank", "noreferrer");
    // setPdfFile(`/http://localhost:4000/uploads/${pdf}`)
};

  const appointment=(doctor)=>{
      navigate('/appointment',{state:doctor})
  }
  return (
    <div className="container"><section className="page doctors " style={{marginTop:"120px"}}>
    <h1>DOCTORS</h1>
    <div className="input-group p-3" style={{width:"30%"}}>
  <div className="form-floating "  data-mdb-input-init>
    <input type="search" id="form1" className="form-control" placeholder="Search" onChange={set}/>
    <label className="form-label" for="form1" >Search</label>
  </div>
  
</div>
    <div className="banner">
      {doctors && doctors.length > 0 ? (
        doctors
        .filter((doctor) => {return (doctor.department.toLowerCase().includes(department.toLowerCase()))})
        .map((doctor) => {
          return (
            <div className="card">
              <img
                src={doctor.avthar}
                alt="doctor avatar"
              />
              <h4>{`${doctor.FirstName} ${doctor.LastName}`}</h4>
              <div className="details">
                <p>
                  Email: <span>{doctor.email}</span>
                </p>
                <p>
                  Phone: <span>{doctor.mobile}</span>
                </p>
                <p>
                  DOB: <span>{doctor.dateOfBirth.substring(0, 10)}</span>
                </p>
                <p>
                  Department: <span>{doctor.department}</span>
                </p>
                
                <p>
                  Gender: <span>{doctor.gender}</span>
                </p>
                <div className=" container d-flex flex-row m-3">
                  <div className="">
                  <button type="button" class="btn btn-outline-primary"  onClick={()=>showPdf(doctor.docs)}>Document</button>
                  </div>
                  <div>
                  <button type="button" class="btn btn-outline-primary" onClick={()=>appointment(doctor)}>Appointment</button>
                  
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <h1>No Registered Doctors Found!</h1>
      )}
    </div>
  </section></div>
  )
}
