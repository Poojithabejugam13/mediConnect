import React, { useEffect, useState } from "react";
import './Appointment.css';
import { useForm } from "react-hook-form";
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch,useSelector } from 'react-redux';
import {NavLink} from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router-dom'

const Appointment = () => {
  let {state}=useLocation()
   let {isLogin,errOccurred,errMes,currentpatient}=useSelector(state=>state.patientAuthorLoginSlice)
    const [department, setDepartment] = useState("");
    let {register,handleSubmit,formState:{errors}}=useForm()
    const [doctors, setDoctors] = useState([]);
    let [currentDoctor,setDoctor]=useState(state)
    async function  getDoctors(){
            let res=await axios.get('http://localhost:4000/doctor-api/doctors')
           console.log("app",res.data);
           if(res.data.message==="doctores Fetched"){
                    setDoctors(res.data.doctors)
           }
    }
    useEffect(()=>{
            getDoctors()
    },[department])

    const departmentsArray = [
        "Pediatrics",
        "Orthopedics",
        "Cardiology",
        "Neurology",
        "Oncology",
        "Radiology",
        "Physical Therapy",
        "Dermatology",
        "ENT",
    ];

    

  

  async function AppData(Appobj){
    console.log("current",currentpatient);
    Appobj.currentpatient=currentpatient.FirstName+currentpatient.LastName
    Appobj.status='Pending'
    console.log("submit",Appobj);
    let res=await axios.post( 'http://localhost:4000/patient-api/appointment',Appobj)
    console.log(res.data);
    if(res.data.message==='appointemt successFull'){
        toast("Appointment successFull!")
    }
  }
    return (
        <div  style={{marginTop:"120px"}}>
         <>
         <div style={{margin:'auto',textAlign:"center"}}>
         <NavLink to={'/previousAppointments'}>                  <button type="button" class="btn btn-outline-primary">Previous Appointment</button>
         </NavLink>
         </div>
         <div className="container form-component appointment-form">
           <h2>New Appointment</h2>
           <form onSubmit={handleSubmit(AppData)}>
             <div>
                    <input
                        style={{ padding: "10px" }}
                        type="text"
                        placeholder="FirstName"

                        
                        {...register("FirstName")}
                    />
                    <input
                        style={{ padding: "10px", margin: "5px" }}
                        type="text"
                        placeholder="LastName"
                        
                        {...register("LastName")}
                    />
                </div>
                <div>
                    <input
                        style={{ padding: "10px" }}
                        type="email"
                        placeholder="Email"
                       
                        {...register("email")}
                    />
                    <input
                        style={{ padding: "10px", margin: "5px" }}
                        type="tel"
                        placeholder="Mobile Number"
                        
                        {...register("mobile")}
                    />
                </div>
             
                
                <div>
                    
                    <input
                        style={{ padding: "10px", margin: "5px" }}
                        type="date"
                        placeholder="Date Of Birth"
                        {...register("dob")}
                    />
                    <select   style={{ padding: "10px", margin: "5px" }}  {...register("gender")}>
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div>
                        
                    <input
                        style={{ padding: "10px", margin: "5px" }}
                        type="date"
                        placeholder="Appointment Date"
                        {...register("dateOfAppointment")}
                    />
                    <input
                        style={{ padding: "10px", margin: "5px" }}
                        type="time"
                        placeholder="Appointment Time"
                        {...register("timeOfAppointment")}
                    />

                </div>
                <div>
                    <select
                        style={{ padding: "10px", margin: "5px" }}
                        {...register("department")}
                        onChange={(e) => {
                            setDepartment(e.target.value);
                            
                          }}

                    >
                        <option value="">Select Department</option>
                        {departmentsArray.map(dept => {
                           return  <option key={dept} value={dept}>{dept}</option>
                        })}

                    </select>
                    <select
                        defaultValue={currentDoctor!==null && `${currentDoctor.FirstName} ${currentDoctor.LirstName}`}
                        style={{ padding: "10px", margin: "5px" }}
                        {...register("doctor")}
                    >
                        <option value="">Select Doctor</option>
                        {doctors
                .filter((doctor) => doctor.department=== department)
                .map((doctor, index) => (
                  <option
                    
                    key={index}
                  >
                    {doctor.FirstName} {doctor.LastName}
                  </option>
                ))}
                    </select>
                </div>
                <textarea
               rows={1}
               style={{ padding: "20px", margin: "5px" }}
               type="text"
               placeholder="Reason For Vist"
               
               {...register("ReasonForVist")}

             />
             <textarea
               rows={1}
               style={{ padding: "20px", margin: "5px" }}
               type="text"
               placeholder="Address"
               
               {...register("address")}

             />
             
             
             <button style={{ margin: "0 auto" }} type="submit">GET APPOINTMENT</button>
           </form>
         </div>
       </>
       </div>
    );
}

export default Appointment;
