import React, { useContext, useState } from "react";
import { TiHome } from "react-icons/ti";
import { RiLogoutBoxFill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import { useDispatch,useSelector } from 'react-redux';
import axios from "axios";
import { toast } from "react-toastify";
import { resetSateAdmin } from "../../redux/slices/adminSlice";
import { resetSateDoctor } from "../../redux/slices/doctorSlice";
// import { Context } from "../main";
import { useNavigate } from "react-router-dom";
import { MdAdminPanelSettings } from "react-icons/md";

const Sidebar = () => {
  let {isLoginDoctor,errOccurredDoctor,errMesDoctor,currentDoctor}=useSelector(state=>state.doctorAuthorLoginSlice)
  let {isLoginAdmin,errOccurredAdmin,errMesAdmin,currentAdmin}=useSelector(state=>state.adminAuthorLoginSlice)

  const [show, setShow] = useState(true);
  let dispatch=useDispatch()
  let navigate=useNavigate();


//   const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  function handleLogout(){
    if(isLoginAdmin){
      dispatch(resetSateAdmin())
      navigate('/')
    }
    if(isLoginDoctor){
      dispatch(resetSateDoctor())
      navigate('/')
    }
  }

  const navigateTo = useNavigate();

  const gotoHomePage = () => {
    navigateTo("/dashboard");
    setShow(!show);
  };
  const gotoDoctorsPage = () => {
    navigateTo("/doctors");
    setShow(!show);
  };
  const gotoMessagesPage = () => {
    navigateTo("/messages");
    setShow(!show);
  };
  const gotoDoctorRequest = () => {
    navigateTo("/admin/docterRequest");
    setShow(!show);
  };
  const gotoAddNewAdmin = () => {
    navigateTo("/admin/addnew");
    setShow(!show);
  };
  const gotoSettings = () => {
    navigateTo("/doctor/settings");
    setShow(!show);
  };

  return (
    <>
      <nav
        style={{ display: "flex"}}
        className={show ? "show sidebar" : "sidebar"}
      >
        <div className="">
          {
            isLoginDoctor===true && <div className="links">
              <TiHome onClick={gotoHomePage} />
              <MdAdminPanelSettings onClick={gotoSettings}/>
              <RiLogoutBoxFill onClick={handleLogout} />
            </div>
          }
          {
            isLoginAdmin===true && <div className="links">
              <TiHome onClick={gotoHomePage} />
              <FaUserDoctor onClick={gotoDoctorsPage} />
              <MdAddModerator onClick={gotoAddNewAdmin} />
              <IoPersonAddSharp onClick={gotoDoctorRequest} />
              <RiLogoutBoxFill onClick={handleLogout} />
            </div>
          }
          {/* <TiHome onClick={gotoHomePage} />
          <FaUserDoctor onClick={gotoDoctorsPage} />
          <MdAddModerator onClick={gotoAddNewAdmin} />
          <AiFillMessage onClick={gotoMessagesPage} />
          <RiLogoutBoxFill onClick={handleLogout} /> */}
        </div>
      </nav>
      <div
        className="wrapper"
        // style={!isAuthenticated ? { display: "none" } : { display: "flex" }}
      >
        <GiHamburgerMenu className="hamburger" onClick={() => setShow(!show)} />
      </div>
    </>
  );
};

export default Sidebar;
