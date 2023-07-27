import React, { useContext, useEffect } from 'react'
import Context from '../../../context/context';
import EmployeeCustomHeader from '../../../customComponents/EmployeeCustomHeader/EmployeeCustomHeader';
import classes from './CreateEmployee.module.css';
import CreateEmployeeForm from './CreateEmployeeForm/CreateEmployeeForm';

const CreateEmployee = () => {
  const {setShowMobileSidebar}=useContext(Context);

  useEffect(()=>{
    window.innerWidth<720 && setShowMobileSidebar(false);
  },[setShowMobileSidebar]);

  return (
    <div className={classes.main}>
      <EmployeeCustomHeader value="Create" employeeType={true}/>
      <CreateEmployeeForm />
    </div>
  )
}

export default CreateEmployee
