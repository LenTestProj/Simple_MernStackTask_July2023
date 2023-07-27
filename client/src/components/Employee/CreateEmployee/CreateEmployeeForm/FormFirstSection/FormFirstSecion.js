import React, { useEffect, useImperativeHandle, useMemo, useState } from "react";
import classes from "./FormFirstSection.module.css";

const FirstSectionValues = [
  {
    value: "First Name",
    placeholder: "First Name",
    error: "Please enter first name",
    type: "text",
  },
  {
    value: "Last Name",
    placeholder: "Last Name",
    error: "Please enter last name",
    type: "text",
  },
  {
    value: "Email",
    placeholder: "Email Id",
    error: "Please enter email",
    type: "text",
  },
];


const initialInputErrors=[
  {hasError:false,message:'Please enter first name.'},
  {hasError:false,message:'Please enter last name.'},
  {hasError:false,message:'Please enter email.'}
]

const FormFirstSecion =React.forwardRef(({isEdit,editedValues},ref) => {
  const [firstName,setFirstName]=useState(isEdit?editedValues.firstName:""); 
  const [lastName,setLastName]=useState(isEdit?editedValues.lastName:"");
  const [email,setEmail]=useState(isEdit?editedValues.email:"");
  const [inputErrors,setInputErrors]=useState(JSON.parse(JSON.stringify(initialInputErrors)));

  useEffect(()=>{
      if(isEdit){
        editedValues.firstName.length>0 && setFirstName(editedValues.firstName);
        editedValues.lastName.length>0 && setLastName(editedValues.lastName);
        editedValues.email.length>0 && setEmail(editedValues.email);
      }
  },[editedValues.firstName,editedValues.lastName,editedValues.email,isEdit])

  const fetchData=()=>{
    if(firstName.length===0){
      setInputErrors(prev=>prev.map((item,i)=>i===0?({...item,hasError:true}):item));
    }
    if(firstName.length>0 && inputErrors[0].hasError){
        setInputErrors(JSON.parse(JSON.stringify(initialInputErrors)));
      }
      if(lastName.length===0){
        setInputErrors(prev=>prev.map((item,i)=>i===1?({...item,hasError:true}):item));
      }
      if(lastName.length>0 && inputErrors[1].hasError){
          setInputErrors(JSON.parse(JSON.stringify(initialInputErrors)));
        } 
        if(!email.includes('@')){
          setInputErrors(prev=>prev.map((item,i)=>i===2?({...item,hasError:true}):item));
        }
        if(email.includes('@') && inputErrors[2].hasError){
            setInputErrors(JSON.parse(JSON.stringify(initialInputErrors)));
          } 
          
          
        //if all values are set then send the data
        if(firstName.length>0 && lastName.length>0 && email.includes('@')){
          
          return {
            firstName,
            lastName,
            email
          }
        } 
        else{
          return null;
        } 
  }
 
  useImperativeHandle(ref,()=>{
    return {
      getData:fetchData
    }
  })

  const inputValues =  useMemo(()=>[
    {
      value:firstName,
      setValue:setFirstName
    },
    {
      value:lastName,
      setValue:setLastName
    },
    {
      value:email,
      setValue:setEmail
    }
  ],[email,firstName,lastName])

  return (
    <div className={classes.main}>
      {FirstSectionValues.map((item, i) => {
        return (
          <div className={classes.SectionItem} key={i}>
            <label className={classes.label}>{item.value}</label>
            <input type={item.type} placeholder={item.placeholder} className={classes.input} value={inputValues[i].value} onChange={(event)=>{
              inputValues[i].setValue(prev=>event.target.value)
           }}/>
           {inputErrors[i].hasError && <p className={classes.error}>
                 {inputErrors[i].message}
           </p>}
          </div>
        );
      })}
    </div>
  );
});

export default FormFirstSecion;
