import React, { useContext, useEffect } from 'react'
import ImagesForm from './ImagesForm/ImagesForm';
import classes from './Images.module.css';
import EmployeeCustomHeader from '../../../customComponents/EmployeeCustomHeader/EmployeeCustomHeader';
import Context from '../../../context/context';

const Images = () => {
  const {setShowMobileSidebar}=useContext(Context);

  useEffect(()=>{
    window.innerWidth<720 && setShowMobileSidebar(false);
  },[setShowMobileSidebar]);

  return (
    <div className={classes.main}>
      <EmployeeCustomHeader value="Uploading/Downloading Image"/>
      <ImagesForm />
    </div>
  )
}

export default Images
