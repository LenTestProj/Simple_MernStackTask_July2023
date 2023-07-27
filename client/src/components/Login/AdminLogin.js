import React from 'react'
import LoginCustomFooter from '../../customComponents/Login/LoginCustomFooter/LoginCustomFooter';
import LoginCustomForm from '../../customComponents/Login/LoginCustomForm/LoginCustomForm';
import LoginCustomHeader from '../../customComponents/Login/LoginCustomHeader/LoginCustomHeader';
import useInput from '../../hooks/useInput';


const AdminLogin = () => {
  
  const inputArray=useInput('training@jalaacademy.com','jobprogram');

  return (
    <div className="text-center bg-slate-400/75 pb-2 h-[100vh]">
      <LoginCustomHeader title="Magnus" isSignInPage={false}/>
      <LoginCustomForm title="Admin - Sign in" inputs={inputArray} isSignInPage={false} submitButtonName="Sign in" onSubmitHandler={()=>alert('hello Magnus')}/>
      <LoginCustomFooter />
    </div>
  )
}

export default AdminLogin
