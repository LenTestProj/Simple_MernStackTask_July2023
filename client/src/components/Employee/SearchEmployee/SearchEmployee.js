import React, { useContext, useEffect } from 'react'
import Context from '../../../context/context';
import EmployeeCustomHeader from '../../../customComponents/EmployeeCustomHeader/EmployeeCustomHeader';
import classes from './SearchEmployee.module.css';
import SearchEmployeeForm from './SearchEmployeeForm/SearchEmployeeForm';

const SearchEmployee = () => {
  const {setShowMobileSidebar}=useContext(Context);

  useEffect(()=>{
    window.innerWidth<720 && setShowMobileSidebar(false);
  },[setShowMobileSidebar]);

  return (
    <div className={classes.main}>
      <EmployeeCustomHeader value="Search" employeeType={true}/>
      <SearchEmployeeForm />
    </div>
  )
}

export default SearchEmployee
