import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";
function PreviousAppointments() {
  let {isLogin,errOccurred,errMes,currentpatient}=useSelector(state=>state.patientAuthorLoginSlice)
  let [PrevAppointments,setPrev]=useState([])
  async function getPrev(){
    let res=await axios.get(`http://localhost:4000/patient-api/perviousAppointment/${currentpatient.FirstName+currentpatient.LastName}`)
    if(res.data.message==="Previous appointments"){
      console.log(res.data.PerviousAppointments);
        setPrev(res.data.PerviousAppointments)
    }

  }
    useEffect(()=>{
        getPrev()
    },[])
  return (
    <div style={{marginTop:"110px"}} className='PreviousApp container'>
        <div className="banner">
        {/* {
            PrevAppointments.length!==0? */}
            <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Date</th>
                <th>Doctor</th>
                <th>Department</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {PrevAppointments && PrevAppointments.length > 0
                ? PrevAppointments.map((appointment) => (
                    <tr key={appointment._id}>
                      <td>{`${appointment.FirstName} ${appointment.LastName}`}</td>
                      <td>{appointment.dateOfAppointment.substring(0, 16)}</td>
                      <td>{`${appointment.doctor}`}</td>
                      <td>{appointment.department}</td>
                      <td className={
                            appointment.status === "Pending"
                              ? "value-pending"
                              : appointment.status === "Accepted"
                              ? "value-accepted"
                              : "value-rejected"
                          }>
                        
                        {appointment.status}
                      </td>
                      
                    </tr>
                  ))
                : "No Appointments Found!"}
            </tbody>
          </table>
          {/* :
          <p class="No Appointments Found!">
            hi
          </p>
          
        } */}
        </div>
    </div>
  )
}

export default PreviousAppointments