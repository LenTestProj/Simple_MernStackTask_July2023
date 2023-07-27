import React, { useContext, useEffect } from 'react'
import Context from '../../../context/context';
import EmployeeCustomHeader from '../../../customComponents/EmployeeCustomHeader/EmployeeCustomHeader';
import classes from './CSSProperties.module.css';
import CSSPropertiesForm from './CSSPropertiesForm/CSSPropertiesForm';

const CSSProperties = () => {
  const {setShowMobileSidebar}=useContext(Context);

  useEffect(()=>{
    window.innerWidth<720 && setShowMobileSidebar(false);
  },[setShowMobileSidebar]);

  return (
    <div className={classes.main}>
      <EmployeeCustomHeader value="CSS Properties" />
      <CSSPropertiesForm />
    </div>
  )
}

export default CSSProperties
