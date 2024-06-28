const exp = require("express");
const doctorApp = exp.Router();
const expressAsyncHandler = require("express-async-handler");
const bcryptjs = require("bcryptjs");
const jsonWebToken = require("jsonwebtoken");

const ObjectId =require('mongodb').ObjectId


doctorApp.use(exp.json());
doctorApp.use('/uploads',exp.static('uploads'))


//file
const fs = require("fs");
//upload
const upload = require("../middlewares/multer");

//upload to cloud
const cloudinary = require("../cloud/cloudinary");

//doctor collection
let doctorCollecObj;

doctorApp.use((req, res, next) => {
  doctorCollecObj = req.app.get("doctorCollection");
  next();
});

//multiple files
const cpUpload = upload.fields([
  { name: "avthar" },
  { name: "doctorDoc", maxCount: 8 },
]);

// upload.single('myfile')

//password generate
function generatePass() {
  let pass = '';
  let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
      'abcdefghijklmnopqrstuvwxyz0123456789@#$';

  for (let i = 1; i <= 8; i++) {
      let char = Math.floor(Math.random()
          * str.length + 1);

      pass += str.charAt(char)
  }
  console.log(pass);

  return pass;
}
// post doctor registrartion
doctorApp.post("/doctor", cpUpload, expressAsyncHandler(async function (req, res, next) {
    docData = req.body;
    // console.log("doc reg",docData);
    // console.log("doc reg",req.files);
    //   console.log("file uploaded");
    //   console.log(
    //     "avthar",
    //     req.files.avthar[0].path,
    //     "pdf",
    //     req.files.doctorDoc[0].path
    //   );
    let dbDocData=await doctorCollecObj.findOne({$or:[{$and:[{ FirstName:docData. FirstName},{ LastName:docData. LastName}]},{email:docData.email}]})
    if(dbDocData!==null){
        res.send({message:"doctor exist"})
        fs.unlink(req.files.avthar[0].path, function (err) {
            if (err) console.log(err);
            else {
                console.log(`\nDeleted file: ${req.files.avthar[0].path}`);

            // Get the files in current directory
            // after deletion
            }
        });
        fs.unlink(req.files.doctorDoc[0].path, function (err) {
            if (err) console.log(err);
            else {
            console.log(`\nDeleted file: ${req.files.doctorDoc[0].path}`);
        
            // Get the files in current directory
            // after deletion
            }
        });
    }
    else{
    av = await cloudinary(req.files.avthar[0].path);
      console.log("url",av,av.secure_url);
    docData.avthar = av.secure_url;
    console.log("doc file ",req.files.doctorDoc[0]);
    docData.docs = req.files.doctorDoc[0].filename;
    if(docData.status==="Pending"){
      pass=generatePass()
      // let hashpass = await bcryptjs.hash(pass, 5);
      docData.password=pass
      await doctorCollecObj.insertOne(docData);
      res.send({ message: "docter register successfull", data: docData });
    }
    if(docData.status==="Accepted"){
      pass=docData.password
      let hashpass = await bcryptjs.hash(pass, 5);
      docData.password=hashpass
      await doctorCollecObj.insertOne(docData);
      res.send({ message: "docter register successfull", data: docData });
    }

    fs.unlink(req.files.avthar[0].path, function (err) {
        if (err) console.log(err);
        else {
        console.log("\nDeleted file: example_file.txt");

        // Get the files in current directory
        // after deletion
        }
    });
    }
    }));

// post doctor login
doctorApp.post(
      "/login",
      expressAsyncHandler(async (req, res) => {
        const doctor = req.body;
        let dbdoctor = await doctorCollecObj.findOne({ email: doctor.email });
        if (dbdoctor === null) {
          res.send({ message: "Invaild email" });
        } else {
          let pass = await bcryptjs.compare(doctor.password, dbdoctor.password);
          if (pass) {
            const token = jsonWebToken.sign(
              { username: doctor.username },
              process.env.SECRET_KEY,
              { expiresIn: "1d" }
            );
            res.send({ message: "Login success", token: token, doctor:dbdoctor });
          } else {
            res.send({ message: "Invaild password" });
          }
        }
      })
    );


// doctor by department 
//#*NOT USED*#
doctorApp.get(
  "/doctors/:department",
  expressAsyncHandler(async (req, res) => {
    let department=req.params.department
    let doctors=await doctorCollecObj.find({department:department}).toArray()
    res.send({ message: "hey",doctors:doctors });
  })
);

//doctors
doctorApp.get(
  "/doctors",
  expressAsyncHandler(async (req, res) => {
    
    let doctors=await doctorCollecObj.find({status:"Accepted"}).toArray()
    res.send({ message: "doctores Fetched",doctors:doctors });
  })
);

//doctors request
doctorApp.get(
  "/doctorsRequest",
  expressAsyncHandler(async (req, res) => {
    let doctors=await doctorCollecObj.find({status:"Pending"}).toArray()
    res.send({ message: "doctores Fetched",doctors:doctors });
  })
);

//password Change

doctorApp.put('/change/:id',expressAsyncHandler( async (req,res)=>{
  let pass=req.body.password
  let id=req.params.id
  // console.log(pass,id);
  let hashpass = await bcryptjs.hash(pass, 5);
  let mod = await doctorCollecObj.findOneAndUpdate({_id:new ObjectId(id)},{$set:{password:hashpass}},{returnDocument:'after'})
  // console.log(mod)
  res.send({message:"password changed successfully",doctor:mod})
}
))

module.exports = doctorApp;
