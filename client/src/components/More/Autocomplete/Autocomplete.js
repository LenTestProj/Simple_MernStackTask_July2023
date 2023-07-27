import React, { useContext, useEffect } from 'react'
import Context from '../../../context/context';
import EmployeeCustomHeader from '../../../customComponents/EmployeeCustomHeader/EmployeeCustomHeader';
import classes from './Autocomplete.module.css';
import AutocompleteForm from './AutoCompleteForm/AutocompleteForm';

const Autocomplete = () => {
  const {setShowMobileSidebar}=useContext(Context);

  useEffect(()=>{
    window.innerWidth<720 && setShowMobileSidebar(false);
  },[setShowMobileSidebar]);

  return (
    <div className={classes.main}>
      <EmployeeCustomHeader value="AutoComplete" />
      <AutocompleteForm />
    </div>
  )
}

export default Autocomplete
