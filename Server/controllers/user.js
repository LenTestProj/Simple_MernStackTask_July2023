const User=require('../models/user');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const {validationResult}=require('express-validator');
const errorFunction=require('../utils/errorFunction');
const clearImage=require('../utils/clearImage');

exports.signup=(req,res,next)=>{
  const errors=validationResult(req);
  if(!errors.isEmpty()){
   errorFunction('Validation Failed',422,errors.array());
  }
  const email=req.body.email;
  const name=req.body.name;
  const password=req.body.password;
  bcrypt.hash(password,12).then(hashedPassword=>{
    const user=new User({
        email:email,
        password:hashedPassword,
        name:name
    });
    return user.save();
  }).then(user=>{
    res.status(201).json({message:'User created',userId:user._id})
  }).catch(error=>{
    console.log(error);
    if(!error.statusCode){
        error.statusCode=500;
    }
    next(error);
  });
}

exports.login=(req,res,next)=>{
  const errors=validationResult(req);
  if(!errors.isEmpty()){
    errorFunction('Validation Failed',422,errors.array());
  }
  const email=req.body.email;
  const password=req.body.password;
  let currentUser;
  User.findOne({email:email}).then(user=>{
    currentUser=user;
    return bcrypt.compare(password,user.password);
  }).then(isEqual=>{
    if(!isEqual){
      errorFunction('Wrong Password',401,errors.array());
    }
    const token=jwt.sign({
      email:currentUser.email,
      userId:currentUser._id.toString()
    },'mysupersecretsecret',{
      expiresIn:'1h'
    });
    res.status(200).json({
      token:token,
      userId:currentUser._id,
      name:currentUser.name
    })
  }).catch(error=>{
    if(!error.statusCode){
      error.statusCode=500;
    }
    next(error);
  })
}

exports.uploadImage=(req,res,next)=>{
  const errors=validationResult(req);
  const fileName=req.body.fileName;
  const filePath=req.file.path; 
  if(!errors.isEmpty()){
      errorFunction('Validation Failed',422,errors.array());
  }
  User.findById(req.userId).then(user=>{
    user.images.push({imageUrl:filePath,fileName:fileName});
    return user.save();
  }).then(user=>{
    res.redirect('/user/getImages');
  }).catch(error=>{
    if(!error.statusCode){
      error.statusCode=500;
    }
    next(error);
  })
}

exports.getImages=(req,res,next)=>{
  User.findById(req.userId).then(user=>{
    res.status(200).json(user.images);
  }).catch(error=>{
    if(!error.statusCode){
      error.statusCode=500;
    }
    next(error);
  })
}

exports.deleteImage=(req,res,next)=>{
  const imageId=req.params.imageId;
  let chosenImage;
  User.findById(req.userId).then(user=>{
    chosenImage=user.images.find(img=>img._id.toString()===imageId.toString());
    if(!chosenImage){
      errorFunction('Could not find Image',404);
    }
    user.images.pull(chosenImage);
    return user.save();
  }).then(user=>{
    clearImage(chosenImage.imageUrl)
    res.set('Location','/user/getImages');
    res.status(303).send()
  }).catch(error=>{
     if(!error.statusCode){
      error.statusCode=500;
    }
    next(error);
  })
}