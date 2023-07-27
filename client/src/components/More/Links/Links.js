import React, { useContext, useEffect } from 'react'
import Context from '../../../context/context';
import EmployeeCustomHeader from '../../../customComponents/EmployeeCustomHeader/EmployeeCustomHeader';
import classes from './Links.module.css';
import LinksForm from './LinksForm/LinksForm';

const Links = () => {
  const {setShowMobileSidebar}=useContext(Context);

  useEffect(()=>{
    window.innerWidth<720 && setShowMobileSidebar(false);
  },[setShowMobileSidebar]);

  return (
    <div className={classes.main}>
     <EmployeeCustomHeader value="Links" />
     <LinksForm /> 
    </div>
  )
}

export default Links
