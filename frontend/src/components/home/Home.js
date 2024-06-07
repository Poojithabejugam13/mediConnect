import React from 'react'
import img from '../home/image.png'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
function Home() {
  const departmentsArray = [
    {
      name: "Pediatrics",
      imageUrl: "https://github.com/Zeeshu911/MERN-Stack-Hospital-Management-System-Web-Application/blob/main/frontend/public/departments/pedia.jpg?raw=true",
    },
    {
      name: "Orthopedics",
      imageUrl: "https://github.com/Zeeshu911/MERN-Stack-Hospital-Management-System-Web-Application/blob/main/frontend/public/departments/ortho.jpg?raw=true",
    },
    {
      name: "Cardiology",
      imageUrl: "https://github.com/Zeeshu911/MERN-Stack-Hospital-Management-System-Web-Application/blob/main/frontend/public/departments/cardio.jpg?raw=true",
    },
    {
      name: "Neurology",
      imageUrl: "https://github.com/Zeeshu911/MERN-Stack-Hospital-Management-System-Web-Application/blob/main/frontend/public/departments/neuro.jpg?raw=true",
    },
    {
      name: "Oncology",
      imageUrl: "https://github.com/Zeeshu911/MERN-Stack-Hospital-Management-System-Web-Application/blob/main/frontend/public/departments/onco.jpg?raw=true",
    },
    {
      name: "Radiology",
      imageUrl: "https://github.com/Zeeshu911/MERN-Stack-Hospital-Management-System-Web-Application/blob/main/frontend/public/departments/radio.jpg?raw=true",
    },
    {
      name: "Physical Therapy",
      imageUrl: "https://github.com/Zeeshu911/MERN-Stack-Hospital-Management-System-Web-Application/blob/main/frontend/public/departments/therapy.jpg?raw=true",
    },
    {
      name: "Dermatology",
      imageUrl: "https://github.com/Zeeshu911/MERN-Stack-Hospital-Management-System-Web-Application/blob/main/frontend/public/departments/derma.jpg?raw=true",
    },
    {
      name: "ENT",
      imageUrl: "https://github.com/Zeeshu911/MERN-Stack-Hospital-Management-System-Web-Application/blob/main/frontend/public/departments/ent.jpg?raw=true",
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
          <h2>welcom to</h2>
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