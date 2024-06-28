import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashBoard/Dashboard";
// import { Context } from "./main";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./components/sidebar/Sidebar";
import "./App.css";
import AddNewAdmin from "./components/addNewAdmin/AddNewAdmin";
import AddNewDoctor from "./components/addnewDoctor/AddNewDoctor";
import Doctors from "./components/doctor/Doctor";
import LoginAdim from "./components/login/LoginAdim";
import LoginDoctor from "./components/login/LoginDoctor";
import UserType from "./components/userType/UserType";
import DocterRequest from "./components/docterRequest/DocterRequest";
import Settings from "./components/settings/Settings";
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();
const App = () => {
  // const { isAuthenticated, setIsAuthenticated, admin, setAdmin } =
  //   useContext(Context);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:4000/api/v1/user/admin/me",
  //         {
  //           withCredentials: true,
  //         }
  //       );
  //       setIsAuthenticated(true);
  //       setAdmin(response.data.user);
  //     } catch (error) {
  //       setIsAuthenticated(false);
  //       setAdmin({});
  //     }
  //   };
  //   fetchUser();
  // }, [isAuthenticated]);

  return (
    <Router>
      <Sidebar />
      <Routes>

        <Route path="/" element={<UserType />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/loginAdmin" element={<LoginAdim />} />
        <Route path="/loginDoctor" element={<LoginDoctor />} />
        <Route path="/doctor/addnew" element={<AddNewDoctor />} />
        <Route path="/doctor/settings" element={<Settings />} />
        <Route path="/admin/addnew" element={<AddNewAdmin />} />
        <Route path="/admin/docterRequest" element={<DocterRequest/>} />
        {/* <Route path="/messages" element={<Messages />} /> */}
        <Route path="/doctors" element={<Doctors />} />
      </Routes>
      <ToastContainer position="top-center" />
    </Router>
  );
};

export default App;
