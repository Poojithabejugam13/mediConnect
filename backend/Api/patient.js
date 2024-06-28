const exp = require("express");
const patientApp = exp.Router();
const expressAsyncHandler = require("express-async-handler");
const bcryptjs = require("bcryptjs");
const jsonWebToken = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const ObjectId =require('mongodb').ObjectId
patientApp.use(exp.json());
//
let patientCollecObj;
let appointmentCollecObj;
//doctor collection
let doctorCollecObj;
patientApp.use((req, res, next) => {
  patientCollecObj = req.app.get("patientCollection");
  appointmentCollecObj = req.app.get("appointmentCollection");
  doctorCollecObj = req.app.get("doctorCollection");
  next();
});

patientApp.get(
  "/patients",
  expressAsyncHandler((req, res) => {
    res.send({ message: "working" });
  })
);

//Post details of Patient Register component
patientApp.post(
  "/patient",
  expressAsyncHandler(async (req, res, next) => {
    let patient = req.body;
    console.log(patient);
    let dbpatient = await patientCollecObj.findOne(
      {$or:[{$and:[{FirstName:patient.FirstName},{LastName:patient.LastName}]},{email:patient.email}]}
    );
    if (dbpatient!== null) {
      res.send({ message: "patient exits" });
    } else {
      let pass = patient.password;
      let hashpass = await bcryptjs.hash(pass, 5);
      patient.password = hashpass;
      await patientCollecObj.insertOne(patient);
      res.send({message: "new patient register", patient: patient });
    }
  })
);

//Post login component
patientApp.post(
  "/login",
  expressAsyncHandler(async (req, res) => {
    const patient = req.body;
    let dbpatient = await patientCollecObj.findOne({ email: patient.email });
    if (dbpatient == null) {
      res.send({ message: "Invaild email" });
    } else {
      let pass = await bcryptjs.compare(patient.password, dbpatient.password);
      if (pass) {
        const token = jsonWebToken.sign(
          { username: patient.username },
          process.env.SECRET_KEY,
          { expiresIn: "1d" }
        );
        res.send({ message: "Login success", token: token, patient:dbpatient });
      } else {
        res.send({ message: "Invaild password" });
      }
    }
  })
);

//traspoart message to patient
const transporter1 = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "abhilashbanda7@gmail.com",
    pass: "dbsw azmz uzhk vdzw",
  },
});

//traspoart message to doc
const transporter2 = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "abhilashbanda7@gmail.com",
    pass: "dbsw azmz uzhk vdzw",
  },
});

//Post appointment details
patientApp.post(
  "/appointment",
  expressAsyncHandler(async (req, res) => {
    let appointemt = req.body;
    docFull=appointemt.doctor.split(" ");
    docFirstName=docFull[0]
    docLastName=docFull[1]
    console.log(docFirstName,docLastName);
    console.log(appointemt);
    let dbDocData=await doctorCollecObj.findOne({$and:[{ FirstName:docFirstName},{ LastName:docLastName}]})
    const mailoptions = {
        from: "mediconnect711@gmail.com",
        to: appointemt.email,
        subject: `Confirm your appointment Reminder: Upcoming appointment with Dr. ${appointemt.doctor}`,
        text: `Dear ${appointemt.FirstName} ${appointemt.LastName},
  This is a friendly reminder of your next appointment with Dr. ${appointemt.doctor} on  ${appointemt.dateOfAppointment} at ${appointemt.address} in our clinic. Please arrive at least 10-15 minutes before your appointment to fill out any necessary forms.
  
  Please let us know at least 24 hours in advance if you need to reschedule the appointment.
  
  We look forward to seeing you soon.
  
  Best regards,
  
  Team MediConnect` 
      };
    const mailoptions2 = {
        from: "mediconnect711@gmail.com",
        to: dbDocData.email,
        subject: ` New Appointment Booking -${appointemt.FirstName} ${appointemt.LastName} on ${appointemt.dateOfAppointment}`,
        text: `Dear Dr. ${appointemt.doctor},

We are pleased to inform you that a new appointment has been scheduled through Mediconnect. Below are the details:

Patient's Name: ${appointemt.FirstName} ${appointemt.LastName}
Appointment Date: ${appointemt.dateOfAppointment}
Appointment Time: ${appointemt.timeOfAppointment}
Reason for Visit:  ${appointemt.ReasonForVist}
Please log in to your Mediconnect account to view more details and confirm the appointment.

Thank you for using Mediconnect.

Best regards,
The Mediconnect Team` 
      };
      transporter1.sendMail(mailoptions,function(error,info){
        if(error){
            console.log("error has been occurred while sending email");
        }else{
            console.log("sent successfully");
        }
    });
      transporter2.sendMail(mailoptions2,function(error,info){
        if(error){
            console.log("error has been occurred while sending email");
        }else{
            console.log("sent successfully");
        }
    });
    await appointmentCollecObj.insertOne(appointemt);
    res.send({ message: "appointemt successFull" });
    
    
  })
);

patientApp.get('/perviousAppointment/:currentpatient',expressAsyncHandler(async (req,res)=>{
    let currentpatient=req.params.currentpatient
    let dbAppointments=await appointmentCollecObj.find({currentpatient:currentpatient}).toArray()
    console.log(dbAppointments);
    res.send({message:"Previous appointments",PerviousAppointments:dbAppointments})
}))
patientApp.get('/Appointment',expressAsyncHandler(async (req,res)=>{
    let dbAppointments=await appointmentCollecObj.find().toArray()
    res.send({message:"Previous appointments",Appointments:dbAppointments})
}))

patientApp.put('/update/:id',expressAsyncHandler(async (req,res)=>{
  let id=req.params.id
  let status=req.body.status
  // console.log(id,status);
  let mod = await appointmentCollecObj.findOneAndUpdate({_id: new ObjectId(id)},{$set:{status:status}},{returnDocument:'after'})
  // console.log(mod);
  res.send({message:"status updated",payload:mod})
}))


// currentDoctor appointment
patientApp.get('/Appointments/:currentDoctor',expressAsyncHandler(async (req,res)=>{
  let currentDoctor=req.params.currentDoctor
  console.log(currentDoctor);
  let dbAppointments=await appointmentCollecObj.find({doctor:currentDoctor}).toArray()
  console.log(dbAppointments);
  res.send({message:"Current Doctor appoientments",CurrentDoctorAppointments:dbAppointments})
}))
module.exports = patientApp;
