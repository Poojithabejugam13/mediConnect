import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import img from "./image.png"
import { ToastContainer, toast } from 'react-toastify';

const AddNewAdmin = () => {
  let {register,handleSubmit,formState:{errors}}=useForm()
  let [err,setErr]=useState('')
  let navigate=useNavigate()
  async function Register(obj){
    console.log(obj);
    let res=await axios.post('http://localhost:4000/admin-api/admin',obj)
    console.log(res);
    if (res.data.message==='new admin register'){
      toast("Registration successFull!")
      navigate('/')
  }else{
    setErr(res.data.message)
  }

  }

  return (
    <section className="page">
      <section className="container form-component add-admin-form">
      <img src={img} alt="logo" className="logo" style={{height:"5rem"}}/>
        <h1 className="form-title">ADD NEW ADMIN</h1>
        <form onSubmit={handleSubmit(Register)}>
          <div>
            <input
              type="text"
              placeholder="First Name"
              {...register("FirstName",{required:true})}
            />
            {errors.FirstName?.type === "required" && (
                      <p className="text-danger p-1">First Name is required</p>
                )}
            <input
              type="text"
              placeholder="Last Name"
              {...register("LastName",{required:true})}

            />
            {errors.LastName?.type === "required" && (
                      <p className="text-danger p-1">Last Name  is required</p>
                )}
          </div>
          <div>
            <input
              type="text"
              placeholder="Email"
              {...register("email",{required:true})}

            />
            {errors.email?.type === "required" && (
                      <p className="text-danger p-1">Email  is required</p>
                )}
            <input
              type="number"
              placeholder="Mobile Number"
              {...register("mobile",{required:true})}

            />
            {errors.mobile?.type === "required" && (
                      <p className="text-danger p-1">Mobile Number of Birth is required</p>
                )}
            
          </div>
          <div>
            <input
              type={"date"}
              placeholder="Date of Birth"
              {...register("dateOfBirth",{required:true})}

            />
            {errors.dateOfBirth?.type === "required" && (
                      <p className="text-danger p-1">Date of Birth is required</p>
                )}
          </div>
          <div>
            <select {...register("gender",{required:true})}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            {errors.gender?.type === "required" && (
                      <p className="text-danger p-1">Gender is required</p>
                )}
            <input
              type="password"
              placeholder="Password"
              
              {...register("password",{required:true,minLength:5})}
              
            />
            {errors.password?.type === "required" && (
                  <p className="text-danger p-1">Password is required</p>
                )}
                {errors.password?.type === "minLength" && (
                      <p className="text-danger p-1">minLength of pass word 5</p>
                )}
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
            <button type="submit">Register</button>
          </div>
        </form>
      </section>
    </section>
  );
};

export default AddNewAdmin;
