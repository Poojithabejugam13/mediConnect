const exp = require("express");
const adminApp = exp.Router();
const expressAsyncHandler = require("express-async-handler");
const bcryptjs = require("bcryptjs");
const jsonWebToken = require("jsonwebtoken");
adminApp.use(exp.json());
const nodemailer = require("nodemailer");

let adminCollObj;
let doctorCollecObj;


adminApp.use((req,res,next)=>{
    adminCollObj=req.app.get('adminCollection')
    doctorCollecObj = req.app.get("doctorCollection");

    next()
})

// post admin registration
adminApp.post(
    "/admin",
    expressAsyncHandler(async (req, res, next) => {
      let admin = req.body;
      console.log(admin);
      let dbadmin = await adminCollObj.findOne(
        {$or:[{$and:[{FirstName:admin.FirstName},{LastName:admin.LastName}]},{email:admin.email}]}
      );
      if (dbadmin!== null) {
        res.send({ message: "admin exits" });
      } else {
        let pass = admin.password;
        let hashpass = await bcryptjs.hash(pass, 5);
        admin.password = hashpass;
        await adminCollObj.insertOne(admin);
        res.send({message: "new Admin register", admin: admin });
      }
    })
  );


// post admin login
  adminApp.post(
    "/login",
    expressAsyncHandler(async (req, res) => {
      const admin = req.body;
      let dbadmin = await adminCollObj.findOne({ email: admin.email });
      if (dbadmin === null) {
        res.send({ message: "Invaild email" });
      } else {
        let pass = await bcryptjs.compare(admin.password, dbadmin.password);
        if (pass) {
          const token = jsonWebToken.sign(
            { username: admin.username },
            process.env.SECRET_KEY,
            { expiresIn: "1d" }
          );
          res.send({ message: "Login success", token: token, admin:dbadmin });
        } else {
          res.send({ message: "Invaild password" });
        }
      }
    })
  );


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "abhilashbanda7@gmail.com",
      pass: "dbsw azmz uzhk vdzw",
      // pass:"bgzf idcs uoge wnru"
    },
  });
  // post doctor password
  adminApp.post('/doctor',expressAsyncHandler(async (req,res)=>{
    doctor=req.body
    let pass=doctor.password
    let hashpass = await bcryptjs.hash(pass, 5);
  let mod = await doctorCollecObj.findOneAndUpdate({email: doctor.email},{$set:{status:"Accepted",password:hashpass}},{returnDocument:'after'})
  const mailoptions = {
    from: "MediConnect",
    to: doctor.email,
    subject: `Registration Confirmation and Account Details`,
    text: `Dear Dr. ${doctor.FirstName} ${doctor.LastName},

Welcome to MEDICONNECT! Your registration is complete.

Account Details:

Username: ${doctor.email}
Password: ${pass}
Please log in at MediConnect.com and change your password promptly.

For assistance, contact us at mediconnect711@gmail.com or 7396939296.

We are excited to have you on our team!

Best regards,

Team MEDICONNECT` 
  };
  transporter.sendMail(mailoptions,function(error,info){
    if(error){
        console.log("error has been occurred",error);
    }else{
        console.log("sent successfully");
    }
});

    res.send({ message: "docter register successfull", data: mod });
    console.log(mod.password);

  }))

module.exports=adminApp