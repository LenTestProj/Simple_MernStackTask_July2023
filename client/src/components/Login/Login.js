import React, { useState,useContext } from 'react';
import LoginCustomForm from '../../customComponents/Login/LoginCustomForm/LoginCustomForm';
import LoginCustomHeader from '../../customComponents/Login/LoginCustomHeader/LoginCustomHeader';
import useInput from '../../hooks/useInput';
import LoginCustomFooter from '../../customComponents/Login/LoginCustomFooter/LoginCustomFooter';
import axios from 'axios';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { toast } from 'react-toastify';
import classes from './Login.module.css';
import Context from '../../context/context';
import { useNavigate } from 'react-router-dom';
import CustomeToastMessage from '../../customComponents/CustomToastMessage/CustomeToastMessage';

const Login = () => {
  const [isLoading,setIsLoading]=useState(false);
  const inputArray=useInput('training@jalaacademy.com','jobprogram');
  const navigate=useNavigate();
  const {setCurrentUser,
    autoLogout}=useContext(Context)

  const LoginHandler=(inputs)=>{
    let finalData;
    console.log(inputs);
    const config={
      headers:{
        'Content-Type':'application/json'
      }
    }
    inputs.forEach(input=>{
      finalData={...finalData,[input.name]:input.value}
      });
      
      setIsLoading(true);
      axios.post('http://localhost:5000/user/login',finalData,config).then(res=>{
        console.log(res);
        setIsLoading(false);
       const data=res.data;
       //store the user credentails
       localStorage.setItem('token',data.token);
       localStorage.setItem('user',data.name);
       const remainingMilliseconds=60*60*1000;
       const expiryDate=new Date(new Date().getTime()+remainingMilliseconds);
       localStorage.setItem('expiryDate',expiryDate.toISOString());

      setCurrentUser(data.name);
      autoLogout(remainingMilliseconds);
      navigate('/Home/Index')

      }).catch(err=>{
        console.log('the error occured while loggin in is: ');
        console.log(err);
        CustomeToastMessage(err.response?err.response.data.message:err.message,'error')
        // toast.error(err.response?err.response.data.message:err.message,{
        //   pauseOnHover: true,
        //   position: toast.POSITION.TOP_RIGHT,
        //   className:classes.toast,
        // })
        setIsLoading(false);
      })
    }
  

  return (
    <div className={classes.main}>
      {isLoading && <LoadingSpinner />}
      <LoginCustomHeader title="JALA Academy" isSignInPage={true}/>
      <LoginCustomForm title="Sign in" inputs={inputArray} isSignInPage={true} submitButtonName="Sign in" onSubmitHandler={LoginHandler}/>
      <LoginCustomFooter />
    </div>
  )
}

export default Login
