import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomCheckBox from "../../customCheckBox/CustomCheckBox";
import classes from "./LoginCustomForm.module.css";

//main function
const LoginCustomForm = ({ title, inputs, isSignInPage,submitButtonName,onSubmitHandler }) => {
  const navigate=useNavigate();  
  // let totalErrors=useMemo(()=>[],[]);
  const currentInputs=useMemo(()=>inputs,[inputs])
  

  const submit=(event)=>{
    event.preventDefault();
    const invalidItemExists=currentInputs.find(item=>!item.isValid);
    if(invalidItemExists) return;
    onSubmitHandler(currentInputs.map(item=>({name:item.name,value:item.value})));
  }

  return (
    <div className={classes.main}>
      <form

        onSubmit={submit}
        className={classes.form}
      >
        <p className={classes.signin}>{title}</p>
        {currentInputs.map((input,i) => {
          return (
            <div className="mb-3 flex flex-col items-center " key={i}>
              <input
                name={input.name}
                type={input.type}
                placeholder={input.placeholder}
                value={input.value}
                className={classes.inputFields}
                onChange={(event)=>input.onChange(prevValue=>event.target.value)}
                onBlur={input.onBlur}
              />
              {!input.isValid && input.inputTouched && (
                <p className={classes.error}>
                  {input.errorMessage}
                </p>
              )}
            </div>
          );
        })}

        <div className={classes.rememberSignIn}>
          {isSignInPage ?<CustomCheckBox classname="w-4 h-4" text="Remember Me"/>:<Link to="/" className="pl-2 ">Back</Link>}
          <button type="submit" className={classes.signinButton} disabled={currentInputs.find(item=>!item.isValid)}>
            {submitButtonName}
          </button>
        </div>
        {isSignInPage && (<><p className={classes.orText}>-OR-</p>
        <button
          type="button"
          className={classes.forgotPasswordButton}
          onClick={() => navigate("/Account/ForgotPassword")}
        >
          Forgot Password
        </button>
        <button type="button" className={classes.adminLoginButton} onClick={() => navigate("/Account/AdminLogin")}>
          Admin Login
        </button></>)}
      </form>
    </div>
  );
};

export default LoginCustomForm;
