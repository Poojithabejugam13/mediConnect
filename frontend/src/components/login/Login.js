import React, { useContext } from 'react'
// import { RiUser6Fill } from "react-icons/ri";
// import { MdPassword } from "react-icons/md";
// import { CiLogin } from "react-icons/ci";
import { useForm } from "react-hook-form"
import { UserContext } from '../../context/user';
function Login() {
  let {register,handleSubmit,formState:{errors}}=useForm()
  let [user,setUser]=useContext(UserContext)
  function setAut(){
    setUser(true)
  }
  return (
    <div>
       <div className="container m-auto">
        <div className="row justify-content-center align-items-center  ">
          <div className="col-lg-4 col-md-6 col-sm-6">
            <div className="card shadow">
      <form onSubmit={handleSubmit(setAut)} className="m-1">
                <div className="card-body">
                  <div className='form-floating mb-3'>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="username"
                      {...register("username")}
                    />
                    <label htmlFor="username" className="form-check-label">
                      Username
                      {/* <RiUser6Fill style={{margin:"0px 0px 3px 3px"}}/> */}
                    </label>
                  </div>
                  <div className='form-floating'>
                    <input
                      className="form-control"
                      type="password"
                      placeholder="password"
                      {...register("password")}
                    />
                    <label htmlFor="password" className="form-check-label">
                      Password
                      {/* <MdPassword style={{marginLeft:"3px"}}/> */}
                    </label>
                  </div>
                </div>
                <div className="text-center card-footer ">
                  <button
                    type="submit"
                    className="border-success border-4 rounded"
                  >
                    Login
                    {/* <CiLogin /> */}
                  </button>
                </div>
              </form>
              </div>
          </div>
        </div>
        </div>
    </div>
  )
}

export default Login
