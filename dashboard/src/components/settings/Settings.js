import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Settings() {
  let {register,handleSubmit,formState:{errors}}=useForm()

  let {isLoginDoctor,errOccurredDoctor,errMesDoctor,currentDoctor}=useSelector(state=>state.doctorAuthorLoginSlice)
  let navigate=useNavigate()
    async function setAut(passobj){
        console.log(passobj);
        console.log(passobj.password,passobj.ConfirmPassword);
        if(passobj.password===passobj.ConfirmPassword){
            console.log(currentDoctor);
            let id=currentDoctor._id
            console.log(currentDoctor);
            let password=passobj.password
            let res=await axios.put(`http://localhost:4000/doctor-api/change/${id}`,{password})
            if(res.data.message==="password changed successfully"){
                toast("password changed successfully")
                navigate('/dashboard')
            }

        }
    }
  return (
    <div className="page">
      <>
        <section className="container form-component add-admin-form">
          <h1 className="form-title">Change Your Password</h1>
          <p>
            {errOccurredDoctor === true && (
              <div className="text-center text-danger">
                <h6>{errMesDoctor}</h6>
              </div>
            )}
          </p>
          <form onSubmit={handleSubmit(setAut)}>
            <div class="form-floating mb-3">
              <input
                type="password"
                placeholder="Password"
                // value={email}
                {...register("password")}
              />
            </div>
            <div class="form-floating">
              <input
                type="password"
                placeholder="Confirm Password"
                // value={password}
                {...register("ConfirmPassword")}
              />
            </div>
            <div
              style={{
                gap: "10px",
                justifyContent: "flex-end",
                flexDirection: "row",
              }}
            >
            </div>
            <div style={{ justifyContent: "center", alignItems: "center" }}>
              <button type="submit">Change password</button>
            </div>
          </form>
        </section>
      </>
    </div>
  );
}

export default Settings;
