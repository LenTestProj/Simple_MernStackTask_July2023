import React, { useEffect, useState } from "react";
import classes from "./FormInputSection.module.css";

const inputData = [
  {
    title: "Name",
    placeholder: "Employee Name",
    type: "text",
  },
  {
    title: "Mobile No",
    placeholder: "Mobile No",
    type: "number",
  },
];

const FormInputSection = ({setSearchValue,searchValue,setCurrentPage}) => {

  const [name,setName]=useState('');
  const [mobileNumber,setMobileNumber]=useState('');
  const [nameIsTouched,setNameIsTouched]=useState(false);
  const [mobileNumberIsTouched,setMobileNumberIsTouched]=useState(false);

  const inputValues=[
    {
      value:name,
      onChange:setName,
      isInputTouched:nameIsTouched,
      setInputTouched:setNameIsTouched
    },
    {
      value:mobileNumber,
      onChange:setMobileNumber,
      isInputTouched:mobileNumberIsTouched,
      setInputTouched:setMobileNumberIsTouched
    }
  ];
  
  const submitData=()=>{
    if(name.length>0 && mobileNumber.length>0){
      setSearchValue(name);
    }
    else{
      alert('Please enter all the desired credentials');
    }
  }

  const clearData=()=>{
    setName('');
    setMobileNumber('');
    setNameIsTouched(false);
    setMobileNumberIsTouched(false);
    searchValue && setSearchValue(null);
    setCurrentPage(1);
  }

  return (
    <div className={classes.main}>
      {inputData.map((item, i) => {
        return (
          <div className={classes.SectionItem} key={i}>
            <label className={classes.label}>{item.title}</label>
            <input
              type={item.type}
              placeholder={item.placeholder}
              className={classes.input}
              value={inputValues[i].value}
              onChange={(event)=>inputValues[i].onChange(prev=>event.target.value)}
              onBlur={()=>{
                inputValues[i].setInputTouched(true)
              }}
            />
            {inputValues[i].value.length===0 && inputValues[i].isInputTouched &&<p className={classes.error}>Please enter a valid {item.title}</p>}
          </div>
        );
      })}
      <div className={classes.buttonSection}>
        <button className={classes.button + " bg-green-700 sm:mr-1"} type='button' onClick={submitData}>Search</button>
        <button className={classes.button + " bg-red-600 "} type='button' onClick={clearData}>Clear</button>
      </div>
    </div>
  );
};

export default FormInputSection;
