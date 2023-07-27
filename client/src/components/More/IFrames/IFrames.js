import React, { useContext, useEffect } from 'react';
import Context from '../../../context/context';
import EmployeeCustomHeader from '../../../customComponents/EmployeeCustomHeader/EmployeeCustomHeader';
import classes from './iFrames.module.css';
import IFramesForm from './IFramesForm/IFramesForm';

const IFrames = () => {
  const {setShowMobileSidebar}=useContext(Context);

  useEffect(()=>{
    window.innerWidth<720 && setShowMobileSidebar(false);
  },[setShowMobileSidebar]);
  
  return (
    <div className={classes.main}>
     <EmployeeCustomHeader value="IFrames" />
     <IFramesForm /> 
    </div>
  )
}

export default IFrames
