import  'bootstrap/dist/css/bootstrap.css';
import './App.css'
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import Root from './Root';
import Home from './components/home/Home';
import Appointment from './components/appointment/Appointment'
import About from './components/about/About'
import Login from './components/login/Login'
import Register from './components/register/Register'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import PreviousAppointments from './components/appointment/PreviousAppointments';
import Documents from './components/documents/Documents';

import { pdfjs } from 'react-pdf';
import ChatBot from './components/chat/ChatBot';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();
function App() {
  
  let router=createBrowserRouter([
    {
      path:'',
      element:<Root></Root>,
      children:[
        {
          path:'',
          element:<Home></Home>
        },
        {
          path:"appointment",
          element:<Appointment></Appointment>,
          
        },
        {
          path:"previousAppointments",
          element:<PreviousAppointments></PreviousAppointments>
        },
        {
          path:"consultants",
          element:<About></About>
        },
        {
          path:"login",
          element:<Login></Login>
        },
        {
          path:"register",
          element:<Register></Register>
        },
        {
          path:"document/:doctorName",
          element:<Documents></Documents>
        }
      ]
    }
  ])
  
  return (
    <div className="App">
      <RouterProvider router={router}/>
      <ChatBot></ChatBot>
      <ToastContainer position='top-center'/>
    </div>
  );
}

export default App;
