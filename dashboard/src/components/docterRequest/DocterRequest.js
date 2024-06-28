import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
function DocterRequest() {
    const [doctors, setDoctors] = useState([]);
  let [doc,setdoc]=useState([])
  let navigate=useNavigate()
  const fetchDoctors = async () => {
    
      const { data } = await axios.get(
        "http://localhost:4000/doctor-api/doctorsRequest"
      );
      setDoctors(data.doctors);
  }
  useEffect(() => {
    
    fetchDoctors();
  },[]);

  async function handleUpdateStatus(id,status,doctor){
    console.log(doctor,id,status);
    if(status==="Accepted"){
        let res=await axios.post(`http://localhost:4000/admin-api/doctor`,doctor)
    }
    //   console.log(res);
    //   setdoc((prevAppointments) =>
    //     prevAppointments.map((appointment) =>
    //       appointment._id === id
    //         ? { ...appointment, status }
    //         : appointment
    //     )
    //   );
    navigate("/dashboard")
  }
  const showPdf = (pdf) => {
    window.open(`http://localhost:4000/uploads/${pdf}`, "_blank", "noreferrer");
    // setPdfFile(`/http://localhost:4000/uploads/${pdf}`)
};
  return (
    <div><section className=" dashboard page">
    <h1>DOCTORS REQUEST</h1>
    <div className="banner">
    <table>
            <thead>
              <tr>
                <th>Doctor</th>
                <th>Department</th>
                <th>Email</th>
                <th>Documents</th>
                <th>Status</th>
                {/* <th>Visited</th> */}
              </tr>
            </thead>
            <tbody>
              {doctors && doctors.length > 0
                ? doctors.map((doctor) => (
                    <tr key={doctor._id}>
                      <td>{`${doctor.FirstName} ${doctor.LastName}`}</td>
                      <td>{doctor.department}</td>
                      <td>{`${doctor.email}`}</td>
                      <td >
                          <button type="button"  style={{width:"5rem",padding:"3px",marginLeft:"4px"}} onClick={()=>showPdf(doctor.docs)}>Read</button>
                      </td>
                      <td>
                        <select
                          className={
                            doctor.status === "Pending"
                              ? "value-pending"
                              : doctor.status === "Accepted"
                              ? "value-accepted"
                              : "value-rejected"
                          }
                          value={doctor.status}
                          onChange={(e) =>
                            handleUpdateStatus(doctor._id, e.target.value,doctor)
                          }
                        >
                          <option value="Pending" className="value-pending">
                            Pending
                          </option>
                          <option value="Accepted" className="value-accepted">
                            Accepted
                          </option>
                          <option value="Rejected" className="value-rejected">
                            Rejected
                          </option>
                        </select>
                      </td>
                        
                        
                    </tr>
                  ))
                : "No Doctors Requests are Found!"}
            </tbody>
          </table>
      {/* {doctors && doctors.length > 0 ? (
        doctors.map((element) => {
          return (
            <div className="card">
              <img
                src={element.avthar}
                alt="doctor avatar"
              />
              <h4>{`${element.FirstName} ${element.LastName}`}</h4>
              <div className="details">
                <p>
                  Email: <span>{element.email}</span>
                </p>
                <p>
                  Phone: <span>{element.mobile}</span>
                </p>
                <p>
                  DOB: <span>{element.dateOfBirth.substring(0, 10)}</span>
                </p>
                <p>
                  Department: <span>{element.department}</span>
                </p>
                
                <p>
                  Gender: <span>{element.gender}</span>
                </p>
              </div>
            </div>
          );
        })
      ) : (
        <h1>No Registered Doctors Found!</h1>
      )} */}
    </div>
  </section></div>
  )
}

export default DocterRequest