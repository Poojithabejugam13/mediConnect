import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
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
  const showPdf = (pdf) => {
    window.open(`http://localhost:4000/uploads/${pdf}`, "_blank", "noreferrer");
    // setPdfFile(`/http://localhost:4000/uploads/${pdf}`)
};

//   if (!isAuthenticated) {
//     return <Navigate to={"/login"} />;
//   }
  return (
    <section className="page doctors">
      <h1>DOCTORS</h1>
      <div className="banner">
        {doctors && doctors.length > 0 ? (
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
                  

                  <button onClick={()=>showPdf(element.docs)}>Doucment</button>
                  
              </div>
            );
          })
        ) : (
          <h1>No Registered Doctors Found!</h1>
        )}
      </div>
    </section>
  );
};

export default Doctors;
