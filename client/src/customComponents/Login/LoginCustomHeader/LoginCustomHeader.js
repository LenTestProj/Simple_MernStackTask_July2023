import React from 'react';
import classes from "./LoginCustomHeader.module.css";

const LoginCustomHeader = ({title,isSignInPage}) => {
  return (
    <div className={classes.main}>
    <p className={classes.header}>{title}</p>
    {isSignInPage && <><p className={classes.loginCred}>Login Credentials</p>
    <div className={classes.emailPassword+' pt-2'}>
      <p>Email</p>:<p className="pl-1"> training@jalaacademy.com</p>
    </div>
    <div className={classes.emailPassword}>
      <p>Password</p>:<p className="pl-1">jobprogram</p>
    </div>
    <p className={classes.yellowText}>Learn Everything on Real-Time Scenarios </p></>}
  </div>
  )
}

export default LoginCustomHeader
