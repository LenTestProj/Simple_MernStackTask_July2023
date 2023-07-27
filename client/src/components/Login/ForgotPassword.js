import React, { useEffect, useState } from 'react'
import LoginCustomForm from '../../customComponents/Login/LoginCustomForm/LoginCustomForm';
import LoginCustomHeader from '../../customComponents/Login/LoginCustomHeader/LoginCustomHeader';
import useInput from '../../hooks/useInput';
import CustomeToastMessage from '../../customComponents/CustomToastMessage/CustomeToastMessage';

const ForgotPassword = () => {
  const inputArray=useInput('');
 
  const submitHandler=(inputs)=>{ 
    if(inputs[0].value==='training@jalaacademy.com'){
      CustomeToastMessage("Your password sent successfully to your registered email.");
    }
    else{
      CustomeToastMessage('Please enter a valid email','error');
    }
  }

  return (
    <div className="text-center bg-slate-400/75 pb-2 h-[100vh]">
      <LoginCustomHeader title="Magnus" isSignInPage={false}/>
      <LoginCustomForm title="Forgot Password" inputs={inputArray.slice(0,1)} isSignInPage={false} submitButtonName="Get Password" onSubmitHandler={submitHandler}/>
    </div>
  )
}

export default ForgotPassword
