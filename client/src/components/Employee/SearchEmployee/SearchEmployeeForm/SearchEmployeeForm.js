import React, { useState } from 'react'
import FormHeaderSection from './FormHeaderSection/FormHeaderSection';
import FormInputSection from './FormInputSection/FormInputSection';
import FormListSection from './FormListSection/FormListSection';
import FormPaginationSection from './FormPaginationSection/FormPaginationSection';
import classes from './SearchEmployeeForm.module.css';

const SearchEmployeeForm = () => {
  const [currentPage,setCurrentPage]=useState(1);
  const [lastPage,setLastPage]=useState(null);
  const [searchValue,setSearchValue]=useState(null);

  return (
    <div className={classes.main}>
      <form onSubmit={()=>{}} className={classes.form}>
           <FormHeaderSection /> 
           <FormInputSection setSearchValue={setSearchValue} searchValue={searchValue} setCurrentPage={setCurrentPage}/>
           <FormListSection currentPage={currentPage} 
           lastPage={lastPage} setLastPage={setLastPage} setCurrentPage={setCurrentPage} searchValue={searchValue}/>
           <FormPaginationSection currentPage={currentPage} lastPage={lastPage} setCurrentPage={setCurrentPage} />
      </form>
    </div>
  )
}

export default SearchEmployeeForm
