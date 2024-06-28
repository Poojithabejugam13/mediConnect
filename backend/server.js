const exp=require('express')
const app=exp()
require('dotenv').config()

app.use(exp.json())

//cors
const cors=require('cors')
// files acsess
app.use('/uploads',exp.static('uploads'))
//connecting
app.use(
    cors({
      origin: [process.env.FRONTEND_URL_ONE, process.env.FRONTEND_URL_TWO],
      method: ["GET", "POST", "DELETE", "PUT"],
      credentials: true,
    })
  );

//const Patient Api
const patientApp=require("./Api/patient")

//const Doctor Api
const doctorApp=require('./Api/doctors')

// Admin Api
const adminApp=require('./Api/admin')

const mongoClient=require('mongodb').MongoClient

mongoClient.connect(process.env.DB_PORT)
.then((client)=>{
    let dbobj=client.db("Mediconnect")
    let patientCollection=dbobj.collection('patientCollection')
    let appointmentCollection=dbobj.collection('appointmentCollection')
    let doctorCollection=dbobj.collection('doctorCollection')
    let adminCollection=dbobj.collection('adminCollection')
    app.set("patientCollection",patientCollection)
    app.set("appointmentCollection",appointmentCollection)
    app.set("doctorCollection",doctorCollection)
    app.set("adminCollection",adminCollection)
    console.log("db connected");
})


//when patient patientApp
app.use('/patient-api',patientApp)

//when doctor data doctorApp
app.use('/doctor-api',doctorApp)

//when admin
app.use('/admin-api',adminApp)

// app.use((req,res,next)=>{
//     res.sendFile(path.join(__dirname,'../client/build/index.html'))
// })

app.use((err,req,res,next)=>{
    res.send({message:"err",payload:err.message})
})

let port=process.env.PORT
app.listen(port,()=>{
    console.log("port",port);
})