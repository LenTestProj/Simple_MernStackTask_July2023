const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const multer=require('multer');
const path=require('path');
const mongooseConnect = require("./utils/database");
const userRoutes = require("./routes/user.js");
const employeeRoutes = require("./routes/employee");
// const cors = require('cors')
// app.use(cors());
app.use(bodyParser.json());
// app.use(
//   bodyParser.urlencoded({
//     extended: false,
//   })
// );


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

//configuring multer
const fileStorage=multer.diskStorage({destination:(req,file,cb)=>{
  cb(null,'images');
},
filename:(req,file,cb)=>{
  cb(null,new Date().toISOString()+'-'+file.originalname);
}});

const fileFilter=(req,file,cb)=>{
  if(file.mimetype==='image/png' || file.mimetype==='image/jpg' || file.mimetype==='image/jpeg'){
    cb(null,true);
  }
  else{
    cb(null,false);
  }
}

app.use(multer({storage:fileStorage,fileFilter:fileFilter}).single('image'));

app.use('/images',express.static(path.join(__dirname,'images')));


//Adding the routes
app.use("/user", userRoutes);
app.use("/employee", employeeRoutes);

//error function
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

mongooseConnect(() => {
  app.listen(5000, () => {
    console.log("Server is listening on port 5000");
  });
});
