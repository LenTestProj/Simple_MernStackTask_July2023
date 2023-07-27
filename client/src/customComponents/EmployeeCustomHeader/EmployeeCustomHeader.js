import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import classes from "./EmployeeCustomHeader.module.css";
import { useNavigate } from "react-router-dom";

const rightTopInitialValues = [
  { value: "Home", icon: faHouse },
  { value: "Employee", icon: faAngleRight },
  { value: "Create", icon: faAngleRight },
];

const EmployeeCustomHeader = ({value,employeeType}) => {
   const [rightTopvalues,setRightTopValues]=useState(rightTopInitialValues);
   const navigate=useNavigate();

   useEffect(()=>{
    setRightTopValues(prevData=>prevData.map((item,i)=>{  
      if(i===2){
        item.value=value;
      }
      return item;
    }))
   },[value])

  return (
    <div className={classes.main}>
      <div className={classes.firstHalfEmployeeText}>
        {employeeType?<><p>Employee</p>
        <p className={classes.firstHalfCreateText}>{value}</p></>:<p>{value}</p>}
      </div>
      <div className={classes.secondHalfEmployeeText}>
        <ul className="flex">
            {rightTopvalues.map((item,i)=>
                <li className={classes.listItem+` ${i===0?'cursor-pointer':''}`} onClick={()=>i===0?navigate('/Home/Index'):{}} key={i}>
                <FontAwesomeIcon icon={item.icon} className={classes.icon}/>
                <p>{item.value}</p>
              </li>
            )}
        </ul>
      </div>
    </div>
  );
};

export default EmployeeCustomHeader;
