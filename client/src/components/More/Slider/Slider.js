import React, { useContext, useEffect } from 'react'
import Context from '../../../context/context';
import EmployeeCustomHeader from '../../../customComponents/EmployeeCustomHeader/EmployeeCustomHeader';
import classes from './Slider.module.css';
import SliderForm from './SliderForm/SliderForm';

const Slider = () => {
  const {setShowMobileSidebar}=useContext(Context);

  useEffect(()=>{
    window.innerWidth<720 && setShowMobileSidebar(false);
  },[setShowMobileSidebar]);

  return (
    <div className={classes.main}>
      <EmployeeCustomHeader value="Slider" />
      <SliderForm />
    </div>
  )
}

export default Slider
