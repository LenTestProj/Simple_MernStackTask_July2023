import React, { useContext, useEffect } from 'react'
import Context from '../../../context/context';
import EmployeeCustomHeader from '../../../customComponents/EmployeeCustomHeader/EmployeeCustomHeader';
import classes from './MultipleTabs.module.css';
import MultipleTabsForm from './MultipleTabsForm/MultipleTabsForm';

const MultipleTabs = () => {
  const {setShowMobileSidebar}=useContext(Context);

  useEffect(()=>{
    window.innerWidth<720 && setShowMobileSidebar(false);
  },[setShowMobileSidebar]);

  return (
    <div className={classes.main}>
      <EmployeeCustomHeader value="Tabs" />
      <MultipleTabsForm />
    </div>
  )
}

export default MultipleTabs
