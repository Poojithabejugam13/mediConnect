import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";
import { useDispatch,useSelector } from 'react-redux';
import PopUp from '../popUp/PopUp';
import img from './image.png'
import TimeForm from '../timeForm/TimeForm';
function Dashboard() {
  let {isLoginDoctor,errOccurredDoctor,errMesDoctor,currentDoctor}=useSelector(state=>state.doctorAuthorLoginSlice)
  let {isLoginAdmin,errOccurredAdmin,errMesAdmin,currentAdmin}=useSelector(state=>state.adminAuthorLoginSlice)
  let [appointments,setAppointments]=useState([])
  const [doctors, setDoctors] = useState([]);
  const [openPopUp,setPopUp]=useState(false)
   async function get(){
    
      const { data } = await axios.get(
        "http://localhost:4000/doctor-api/doctors"
      );
      setDoctors(data.doctors);
      // console.log(doctors.avthar);
    if(isLoginAdmin){
      let res=await axios.get(`http://localhost:4000/patient-api/Appointment`)
      if(res.data.message==="Previous appointments"){
          setAppointments(res.data.Appointments)
      }
    }
    if(isLoginDoctor){
      let res=await axios.get(`http://localhost:4000/patient-api/Appointments/${currentDoctor.FirstName+""+currentDoctor.LastName}`)
      if(res.data.message==="Current Doctor appoientments"){
          setAppointments(res.data.CurrentDoctorAppointments)
      }
    }
   }
  useEffect(()=>{
    get()
},[])
async function handleUpdateStatus(id,status){
  console.log(id,status);
    let res=await axios.put(`http://localhost:4000/patient-api/update/${id}`,{ status })
    // console.log(res);
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment._id === id
          ? { ...appointment, status }
          : appointment
      )
    );
    if (status==="Accepted"){
      setPopUp(true)
    }

}
  return (
    <div>
        <>
      <section className="dashboard page">
        <div className="banner">
        {
              isLoginDoctor===true &&<div className="firstBox ">
           
              <img src={currentDoctor.avthar} alt="docImg" className='p-5' style={{padding:"5px 10px 10px 0px", borderRadius:"30%"}} />
              <div className="content">
                <div>
                  <p>Hello,</p>
                  <h5>Dr.
                      {currentDoctor.FirstName} {currentDoctor.LastName}
                  </h5>
                </div>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Facilis, nam molestias.
                </p>
              </div>
            </div>
        }
        {
              isLoginAdmin===true &&<div className="firstBox ">
           
              <img src="https://static.vecteezy.com/system/resources/thumbnails/009/636/683/small_2x/admin-3d-illustration-icon-png.png" alt="docImg" className='p-5' style={{padding:"5px 10px 10px 0px", borderRadius:"30%"}} />
              <div className="content">
                <div >
                  <p>Hello,</p>
                  <h5>
                      {currentAdmin.FirstName} {currentAdmin.LastName}
                  </h5>
                </div>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Facilis, nam molestias.
                 
                </p>
              </div>
            </div>
        }
          
          <div className="secondBox">
            <p>Total Appointments</p>
            <h3>{appointments.length}</h3>
          </div>

          <div className="thirdBox">
            <p>Registered Doctors</p>
            <h3>{doctors.length}</h3>
          </div>
        </div>
        <div className="banner">
          <h5>Appointments</h5>
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Date</th>
                <th>Doctor</th>
                <th>Department</th>
                <th>Status</th>
                {/* <th>Visited</th> */}
              </tr>
            </thead>
            <tbody>
              {appointments && appointments.length > 0
                ? appointments.map((appointment) => (
                    <tr key={appointment._id}>
                      <td>{`${appointment.FirstName} ${appointment.LastName}`}</td>
                      <td>{appointment.dateOfAppointment.substring(0, 16)}</td>
                      <td>{`${appointment.doctor}`}</td>
                      <td>{appointment.department}</td>
                        {
                          isLoginDoctor==true &&
                      <td>
                        <select
                          className={
                            appointment.status === "Pending"
                              ? "value-pending"
                              : appointment.status === "Accepted"
                              ? "value-accepted"
                              : "value-rejected"
                          }
                          value={appointment.status}
                          onChange={(e) =>
                            handleUpdateStatus(appointment._id, e.target.value)
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
                        }
                        {
                          isLoginAdmin==true &&
                          <td className={
                            appointment.status === "Pending"
                              ? "value-pending"
                              : appointment.status === "Accepted"
                              ? "value-accepted"
                              : "value-rejected"
                          }>
                        
                        {appointment.status}
                      </td>
                        }
                      <td>{appointment.hasVisited === true ? <GoCheckCircleFill className="green"/> : <AiFillCloseCircle className="red"/>}</td>
                    </tr>
                  ))
                : "No Appointments Found!"}
            </tbody>
          </table>
        </div>
      </section>
    </>
    {/* <PopUp
    openPopUp={openPopUp}
    setPopUp={setPopUp}
    >
      {
        isLoginDoctor===true&&<TimeForm ></TimeForm>
      }
      
    </PopUp> */}
    </div>
  )
}

export default Dashboard