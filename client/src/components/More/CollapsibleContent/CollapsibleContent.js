import React, { useContext, useEffect } from 'react'
import Context from '../../../context/context';
import EmployeeCustomHeader from '../../../customComponents/EmployeeCustomHeader/EmployeeCustomHeader';
import classes from './CollapsibleContent.module.css';
import CollapsibleContentForm from './CollapsibleContentForm/CollapsibleContentForm';


const CollapsibleContent = () => {
  const {setShowMobileSidebar}=useContext(Context);

  useEffect(()=>{
    window.innerWidth<720 && setShowMobileSidebar(false);
  },[setShowMobileSidebar]);
  
  return (
    <div className={classes.main}>
      <EmployeeCustomHeader value="Collapse" />
      <CollapsibleContentForm />
    </div>
  )
}

export default CollapsibleContent
