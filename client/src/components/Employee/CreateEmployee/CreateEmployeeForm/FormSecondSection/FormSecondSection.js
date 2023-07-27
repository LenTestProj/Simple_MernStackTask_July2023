import React, { useEffect, useImperativeHandle, useMemo, useState } from "react";
import classes from "./FormSecondSection.module.css";

const SecondSectionValues = [
  {
    value: "Mobile Number",
    placeholder: "Mobile No",
    error: "Please enter mobile number",
    type: "number",
  },
  {
    value: "Date of Birth",
    placeholder: "dd/mm/yyyy",
    error: "",
    type: "date",
  },
];

const FormSecondSection = React.forwardRef(({isEdit,editedValues},ref) => {
  const [mobileNumber,setMobileNumber]=useState(isEdit?editedValues.mobileNumber:'');
  const [dob,setDOB]=useState(isEdit?editedValues.dob:'');
  const [gender,setGender]=useState(isEdit?editedValues.gender:'male');
  
  const [mobileNumberError,setMobileNumberError]=useState({
    hasError:false,
    message:'Please enter mobile number'
  })

  useEffect(()=>{
    if(isEdit){
      editedValues.mobileNumber.toString().length>0 && setMobileNumber(editedValues.mobileNumber);
      editedValues.dob.length>0 && setDOB(editedValues.dob);
      editedValues.gender.length>0 && setGender(editedValues.gender);
    }
  },[editedValues.mobileNumber,editedValues.dob,editedValues.gender,isEdit])


  const fetchData=()=>{
    let finalData={};
    if(mobileNumber.length<8){
      setMobileNumberError(prev=>({...prev,hasError:true}));
      return null;
    }
    if(mobileNumber.length>0 && mobileNumberError.hasError===true){
      setMobileNumberError(prev=>({...prev,hasError:false}));
    }
    finalData.mobileNumber=parseInt(mobileNumber);
    if(dob.length>0) finalData.dob=dob;
    if(gender.length>0) finalData.gender=gender;
    return finalData;
  }
  
  useImperativeHandle(ref,()=>({
    getData:fetchData
  }))

   const inputValues=useMemo(()=>[
    {
      value:mobileNumber,
      setValue:setMobileNumber
    },
    {
      value:dob,
      setValue:setDOB
    }
   ],[mobileNumber,dob])

  return (
    <div className={classes.main}>
      {SecondSectionValues.map((item, i) => {
        return (
          <div className={classes.SectionItem} key={i}>
            <label className={classes.label}>{item.value}</label>
            <input
              type={item.type}
              placeholder={item.placeholder}
              className={classes.input + ` ${i === 1 ? classes.date : ""}`}
              value={inputValues[i].value}
              onChange={(event)=>inputValues[i].setValue(prev=>event.target.value)}
            />
            {i===0 && mobileNumberError.hasError && <p className={classes.error}>
                 {mobileNumberError.message}
           </p>}
          </div>
        );
      })}
      <div className={classes.extraItem}>
        <p className={classes.genderText}>Gender</p>
        <div className={classes.genderItem}>
          <input type="radio"  name="gender" value="male" className={classes.radio} onChange={(event)=>setGender(event.target.value)} checked={gender==='male'}/><p className={classes.genderItemText}>Male</p>
        </div>
        <div className={classes.genderItem}>
          <input type="radio" name="gender" value="female" className={classes.radio} onChange={(event)=>setGender(event.target.value)} checked={gender==='female'}/><p className={classes.genderItemText}>Female</p>
        </div>
      </div>
    </div>
  );
});

export default FormSecondSection;
