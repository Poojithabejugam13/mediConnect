import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from 'react-hook-form'


// import { Context } from "../main";
import axios from "axios";
import img from "./image.png"
const AddNewDoctor = () => {
const [isAuthenticated, setIsAuthenticated] = useState(true);
let {register,handleSubmit,formState:{errors}}=useForm()
const [isSubmitting, setIsSubmitting] = useState(false);
  const [docAvatar, setDocAvatar] = useState("");
  const [doc, setDoc] = useState("");
  const [docAvatarPreview, setDocAvatarPreview] = useState("");
  let [err,setErr]=useState('')
  let navigate=useNavigate()


  const navigateTo = useNavigate();

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

  const handleAvatar = (e) => {
    const avthar = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(avthar);
    reader.onload = () => {
      setDocAvatarPreview(reader.result);
      setDocAvatar(avthar);
    };
    console.log(avthar);
  };
 
  const handleDoc = (e) => {
    const Doc = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(Doc);
    reader.onload = () => {
      // setDocAvatarPreview(reader.result);
      setDoc(Doc);
    };
    console.log(Doc);
  };

 

  // if (!isAuthenticated) {
  //   return <Navigate to={"/login"} />;
  // }
// submitForm
async function DocRegister(obj){
  console.log(docAvatar,doc);
  setIsSubmitting(true);
  obj.avthar=docAvatar
  obj.doctorDoc=doc
  obj.status="Pending"
  console.log(obj);
  let res=await axios.post('http://localhost:4000/doctor-api/doctor',obj,{
    withCredentials: true,
    headers: { "Content-Type": "multipart/form-data" },
  })
  console.log(res);
  if (res.data.message==='docter register successfull'){
    toast("Registration successFull!")

    navigate('/')
}else{
  setErr(res.data.message)
}

}

  return (
    <section className="page">
      <section className="container add-doctor-form">
        <img src={img} alt="logo" className="logo" style={{height:"5rem"}}/>
        <h1 className="form-title">REGISTER A NEW DOCTOR</h1>
        <div className='text-center '>
        {err.length!==0 && <h6 className='text-danger lead'>{err}</h6>}
      </div>
        <form onSubmit={handleSubmit(DocRegister)}>
          <div className="first-wrapper">
            <div>
              <img
                src={
                  docAvatarPreview ? `${docAvatarPreview}` : "/docHolder.jpg"
                }
                alt="Doctor Avatar"
              />
              <input type="file"  onChange={handleAvatar}/>
            </div>
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
              
              <input
                type={"date"}
                placeholder="Date of Birth"
                {...register("dateOfBirth",{required:true})}
              />
              {errors.dateOfBirth?.type === "required" && (
                      <p className="text-danger p-1">Date of Birth is required</p>
                )}
              <select
                {...register("gender",{required:true})}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {errors.gender?.type === "required" && (
                      <p className="text-danger p-1">Gender is required</p>
                )}
              {/* <input
                type="password"
                placeholder="Password"
                {...register("password",{required:true,minLength:5})}
              />
              {errors.password?.type === "required" && (
                  <p className="text-danger p-1">Password is required</p>
                )}
                {errors.password?.type === "minLength" && (
                      <p className="text-danger p-1">minLength of pass word 5</p>
                )} */}
              <select
               {...register("department",{required:true})}
              >
                <option value="">Select Department</option>
                {departmentsArray.map((depart, index) => {
                  return (
                    <option value={depart} key={index}>
                      {depart}
                    </option>
                  );
                })}
              </select>
              {errors.departments?.type === "required" && (
                  <p className="text-danger p-1">departments is required</p>
                )}
                <div>
              <input type="file"  onChange={handleDoc}/>
            </div>
              <button type="submit" disabled={isSubmitting} >
              {isSubmitting ? 'Registering...' : 'Register New Doctor'}
                </button>
            </div>
          </div>
        </form>
      </section>
    </section>
  );
};

export default AddNewDoctor;
