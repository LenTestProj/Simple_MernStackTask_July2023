import React, { useEffect, useImperativeHandle, useState } from 'react';
import classes from './FormThirdSection.module.css';

const FormThirdSection = React.forwardRef(({isEdit,editedValues},ref) => {
  const [address,setAddress]=useState(isEdit?editedValues.address:'');

  const fetchData=()=>{
    let finalData={};
    if(address.length>0) finalData.address=address;
    return finalData;
  }

  useImperativeHandle(ref,()=>({
    getData:fetchData
  }))

  useEffect(()=>{
    if(isEdit){
      editedValues.address.length>0 && setAddress(editedValues.address);
      
    }
  },[editedValues.address,isEdit])

  return (
    <div className={classes.main}>
      <label className={classes.label}>Address</label>
      <textarea className={classes.input} placeholder="Address" value={address} onChange={(event)=>setAddress(event.target.value)}></textarea>
    </div>
  )
})

export default FormThirdSection
