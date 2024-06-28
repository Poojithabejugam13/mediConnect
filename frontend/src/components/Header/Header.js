import React, { useContext, useState } from 'react'
import { UserContext } from '../../context/user'
import { Link, NavLink } from 'react-router-dom'
import logo from '../Header/m-c.png'
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch,useSelector } from 'react-redux';
import { resetSate } from '../../Redux/slices/patientAuthSlice';
function Header() {
  let [user,setUser]=useContext(UserContext)
  let {isLogin,errOccurred,errMes,currentpatient}=useSelector(state=>state.patientAuthorLoginSlice)
  let dispatch=useDispatch()
  function signOut(){
    // localStorage.removeItem('token')
    dispatch(resetSate())
  }
 
  const [show, setShow] = useState(false);
  return (
    <>
      <nav className={"container"}>
        <div className="logo">
          <Link to={'/'}>
          <img src={logo} alt="logo" className="logo-img" />
          </Link>
        </div>
        <div className={show ? "navLinks showmenu" : "navLinks"}>
          <div className="links">
            {/* <Link to={"/"} >
              Home
            </Link> */}
            <Link to={"/appointment"} >
              Appointment
            </Link>
            <Link to={"/consultants"} >
              Consultants
            </Link>
          </div>
          {isLogin===false? (
            <button className="logoutBtn btn" >
              <Link to="/login" >
              Login
            </Link>
            </button>
          ) : (
            <button className="loginBtn btn" >
             <NavLink
              className="nav-link a" to="" onClick={signOut}>SignOut</NavLink>
            </button>
            
          )}
        </div>
        <div className="hamburger" onClick={() => setShow(!show)}>
          <GiHamburgerMenu />
        </div>
      </nav>
      
    </>
  )
}

export default Header