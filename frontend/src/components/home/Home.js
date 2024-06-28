import React from 'react'
import img from '../home/image.png'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import cardios from './departments/cardio.jpg'
import derma from './departments/derma.jpg'
import ent from './departments/ent.jpg'
import neuro from './departments/neuro.jpg'
import onco from './departments/onco.jpg'
import ortho from './departments/ortho.jpg'
import pedia from './departments/pedia.jpg'
import radio from './departments/radio.jpg'
import therapy from './departments/therapy.jpg'
import { useDispatch,useSelector } from 'react-redux';

function Home() {
  let {isLogin,errOccurred,errMes,currentpatient}=useSelector(state=>state.patientAuthorLoginSlice)
  const departmentsArray = [
    {
      name: "Pediatrics",
      imageUrl:pedia,
    },
    {
      name: "Orthopedics",
      imageUrl: ortho,
    },
    {
      name: "Cardiology",
      imageUrl: cardios,
    },
    {
      name: "Neurology",
      imageUrl: neuro,
    },
    {
      name: "Oncology",
      imageUrl: onco,
    },
    {
      name: "Radiology",
      imageUrl:radio,
    },
    {
      name: "Physical Therapy",
      imageUrl: therapy,
    },
    {
      name: "Dermatology",
      imageUrl: derma,
    },
    {
      name: "ENT",
      imageUrl: ent,
    },
  ];

  const responsive = {
    extraLarge: {
      breakpoint: { max: 3000, min: 1324 },
      items: 4,
      slidesToSlide: 1, // optional, default to 1.
    },
    large: {
      breakpoint: { max: 1324, min: 1005 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    medium: {
      breakpoint: { max: 1005, min: 700 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    small: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  return (
    <div>
      <div className="hero container">
        <div className="banner">
          <div>
          <h2>Welcome to MediConnect</h2>
          <p className='' style={{marginLeft:"20vh",fontFamily:"cursive",color:"#90d6af"}}>Streamlining   Healthcare Access and Management</p>
          </div>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit doloremque, pariatur praesentium earum delectus eos
            vitae excepturi. Nesciunt doloremque impedit omnis deleniti
            laudantium? Ullam, dolores odit. Fugiat modi perspiciatis natus.
          </p>
        </div>
        <div className="banner">
          <img src={img} alt="" className="animated-image" />
        </div>
      </div>
      <div className='container departments'>
      <h2>Departments</h2>
      <Carousel responsive={responsive} removeArrowOnDeviceType={["medium","small"]}>
      {departmentsArray.map((depart, index) => {
            return (
              <div key={index} className="card1">
                <div className="depart-name">{depart.name}</div>
                <img src={depart.imageUrl} alt="Department" />
              </div>
            );
          })}
      </Carousel>
      </div>
    </div>
  );
}

export default Home