const express=require('express');
const router=express.Router();
const userController=require('../controllers/user');
router.post('/login');
const {body}=require('express-validator');
const User=require('../models/user');
const isAuth=require('../middleware/isAuthenticated');

router.post('/signup',[body('email').isEmail().withMessage('Please enter a valid email').custom((value,{req})=>{
    return User.findOne({email:value}).then(user=>{
        if(user){
            return Promise.reject('User already exists');
        }
    })
}).normalizeEmail(),body('name').trim().isLength({min:2})],userController.signup);

router.post('/login',[body('email').isEmail().withMessage('Please enter a valid email').custom((value,{req})=>{
    return User.findOne({email:value}).then(user=>{
        if(!user){
            return Promise.reject('User does not exist!! Kindly Signup to create a new user');
        }
    })
}).normalizeEmail(),body('password').trim().isLength({min:3})],userController.login)

router.post('/uploadImage',isAuth,body('fileName').trim().isLength({min:1}),userController.uploadImage);
module.exports=router;

router.get('/getImages',isAuth,userController.getImages);

router.delete('/deleteImage/:imageId',isAuth,userController.deleteImage);