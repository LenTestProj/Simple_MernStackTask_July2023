import React from 'react'
import { useNavigate } from 'react-router-dom';
import classes from './FormHeaderSection.module.css';

const FormHeaderSection = () => {
  const navigate=useNavigate();
  return (
    <div className={classes.main}>
      <p>Search Employee</p>
      <button className={classes.button} type='button' onClick={()=>navigate('/Employee/Create')}>Add Employee</button>
    </div>
  )
}

export default FormHeaderSection
