import React, { useContext, useState } from 'react'
import { UserContext } from '../../context/user'
import { Link, NavLink } from 'react-router-dom'
function Header() {
  let [user,setUser]=useContext(UserContext)
  function setAut(){
    setUser(true)
  }
  function handleLogout(){
    setUser(false)
  }
  const [show, setShow] = useState(false);
  return (
    <>
      <nav className={"container"}>
        <div className="logo">
          <img src="/logo.png" alt="logo" className="logo-img" />
        </div>
        <div className={show ? "navLinks showmenu" : "navLinks"}>
          <div className="links">
            <Link to={"/"} >
              Home
            </Link>
            <Link to={"/appointment"} >
              Appointment
            </Link>
            <Link to={"/aboutus"} >
              About Us
            </Link>
          </div>
          {user? (
            <button className="logoutBtn btn" >
              <Link to="/" className='nav-link'>
              Logout
            </Link>
            </button>
          ) : (
            <button className="loginBtn btn" onClick={setAut}>
             <Link to="/login" className='nav-link'>
              Login
            </Link>
            </button>
            
          )}
        </div>
      </nav>
      
    </>
  )
}

export default Header