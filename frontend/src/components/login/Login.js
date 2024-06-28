import React, { useContext, useEffect } from 'react'
// import { RiUser6Fill } from "react-icons/ri";
// import { MdPassword } from "react-icons/md";
// import { CiLogin } from "react-icons/ci";
import { useForm } from "react-hook-form"
import { UserContext } from '../../context/user';
import { Link } from 'react-router-dom';
import { patientAuthorThunk } from '../../Redux/slices/patientAuthSlice';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Login() {
  let {register,handleSubmit,formState:{errors}}=useForm()
  let {isLogin,errOccurred,errMes,currentpatient}=useSelector(state=>state.patientAuthorLoginSlice)
  let [user,setUser]=useContext(UserContext)
  let navigate=useNavigate();
  let dispatch=useDispatch()
  function setAut(credObj){
    dispatch(patientAuthorThunk(credObj))
    console.log(credObj);
    
  }
  useEffect(()=>{
    if(isLogin==true){
      
        navigate('/')
      
    }
    
  },[isLogin])
  return (
    <div>
        <>
      <div className="container form-component login-form">
        <h2>Sign In</h2>
        <p>Please Login To Continue</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat culpa
          voluptas expedita itaque ex, totam ad quod error?
        </p>
        <p>{errOccurred === true && (
                <div className="text-center text-danger">
                  <h6>{errMes}</h6>
                </div>
              )}
        </p>
        <form onSubmit={handleSubmit(setAut)}>
          <input
            type="text"
            placeholder="Email"
            // value={email}
            {...register("email")}
          />
          <input
            type="password"
            placeholder="Password"
            // value={password}
            {...register("password")}
          />
          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <p style={{ marginBottom: 0 }}>Not Registered?</p>
            <Link
              to={"/register"}
              style={{ textDecoration: "none", color: "#271776ca" }}
            >
              Register Now
            </Link>
          </div>
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </>
    </div>
  )
}

export default Login
