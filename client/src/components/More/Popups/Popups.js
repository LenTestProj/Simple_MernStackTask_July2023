import React, { useContext, useEffect } from 'react'
import Context from '../../../context/context';
import EmployeeCustomHeader from '../../../customComponents/EmployeeCustomHeader/EmployeeCustomHeader';
import classes from './Popups.module.css';
import PopupsForm from './PopupsForm/PopupsForm';

const Popups = () => {
  const {setShowMobileSidebar}=useContext(Context);

  useEffect(()=>{
    window.innerWidth<720 && setShowMobileSidebar(false);
  },[setShowMobileSidebar]);

  return (
    <div className={classes.main}>
      <EmployeeCustomHeader value="Popup" />
      <PopupsForm />
    </div>
  )
}

export default Popups
