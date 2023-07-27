import React, { useEffect, useRef, useState } from 'react';
import classes from './CreateEmployeeForm.module.css';
import FormFifthSection from './FormFifthSection/FormFifthSection';
import FormFirstSecion from './FormFirstSection/FormFirstSecion';
import FormFourthSection from './FormFourthSection/FormFourthSection';
import FormSecondSection from './FormSecondSection/FormSecondSection';
import FormThirdSection from './FormThirdSection/FormThirdSection';
import { toast } from 'react-toastify';
import axios from 'axios';
import CustomeToastMessage from '../../../../customComponents/CustomToastMessage/CustomeToastMessage';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from '../../../LoadingSpinner/LoadingSpinner';

const CreateEmployeeForm = () => {
   const firstSectionRef=useRef(null);
   const secondSectionRef=useRef(null);
   const thirdSectionRef=useRef(null);
   const fourthSectionRef=useRef(null);
   const fifthSectionRef=useRef(null);

   const {empId}=useParams();

   const [editedFirstSectionValues,setEditedFirstSectionvalues]=useState(empId ? {firstName:'',lastName:'',email:''}:{});
   const [editedSecondSectionValues,setEditedSecondSectionvalues]=useState(empId ? {mobileNumber:'',dob:'',gender:''}:{});
   const [editedThirdSectionValues,setEditedThirdSectionvalues]=useState(empId ? {address:''}:{});
   const [editedFourthSectionValues,setEditedFourthSectionvalues]=useState(empId ? {country:'',city:'',isOtherCity:null}:{});
   const [editedFifthSectionValues,setEditedFifthSectionvalues]=useState(empId ? {isAWS:null,isDevOps:null,isFullStackDeveloper:null,isMiddleware:null,isQAAutomation:null,isWebServices:null}:{});
   const [isLoading,setIsLoading]=useState(false);
   
   const navigate=useNavigate();

   useEffect(()=>{
    if(empId){
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };
      setIsLoading(true);
      axios
      .get("http://localhost:5000/employee/"+empId, config)
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        const data=res.data;
        setEditedFirstSectionvalues(prev=>({...prev,firstName:data.firstName,lastName:data.lastName,email:data.email}));
        setEditedSecondSectionvalues(prev=>({...prev,mobileNumber:data.mobileNumber,dob:data.dob??'',gender:data.gender??''}));
        setEditedThirdSectionvalues(prev=>({...prev,address:data.address??''}));
        setEditedFourthSectionvalues(prev=>({...prev,country:data.country??'',city:data.city??'',isOtherCity:data.isOtherCity}));
        setEditedFifthSectionvalues(prev=>({...prev,isAWS:data.isAWS,isDevOps:data.isDevOps,isFullStackDeveloper:data.isFullStackDeveloper,isMiddleware:data.isMiddleware,isQAAutomation:data.isQAAutomation,isWebServices:data.isWebServices}))
      })
      .catch((err) => {
        console.log("The error occured while fetching the employee details are: ");
        console.log(err);
        CustomeToastMessage(
          err.response ? err.response.data.message : err.message,
          "error"
        );
        setIsLoading(false);
      });
    }
   },[empId,setEditedFirstSectionvalues,setEditedSecondSectionvalues,setEditedThirdSectionvalues,setEditedFourthSectionvalues,setEditedFifthSectionvalues])

   const submitData=(event)=>{
    event.preventDefault();
    let finalData={};
    //obtain first section values
    const FirstSectionValues=firstSectionRef.current.getData();

    //obtain the second section values
    const SecondSectionValues=secondSectionRef.current.getData();

    if(!FirstSectionValues || !SecondSectionValues){
      CustomeToastMessage('Please fill all the required fields first','error')
      return;
    }

    //obtain the third section values
    const ThirdSectionValues=thirdSectionRef.current.getData();

    //obtain the fourth section values
    const FourthSectionValues=fourthSectionRef.current.getData();

    //obtain the fifth section values
    const FifthSectionValues=fifthSectionRef.current.getData();

    finalData={
      ...FirstSectionValues,
      ...SecondSectionValues,
      ...ThirdSectionValues,
      ...FourthSectionValues,
      ...FifthSectionValues
    }
    console.log('final data is: ');
    console.log(finalData);

    const config={
      headers:{
        'Content-Type':'application/json',
        'Authorization':'Bearer '+localStorage.getItem('token')
      }
    }
    //send data
    setIsLoading(true);
    if(empId){
      axios.put('http://localhost:5000/employee/edit/'+empId,finalData,config).then(res=>{
        setIsLoading(false);
        CustomeToastMessage('Employee Edited successfully','success');
        navigate('/Employee/Search')
      }).catch(err=>{
        console.log('the error occured while editing the employee is:  ');
        console.log(err);
        setIsLoading(false);
        CustomeToastMessage(err.response?err.response.data.message:err.message,'error')
      })
    }
    else{  
      axios.post('http://localhost:5000/employee/create',finalData,config).then(res=>{
        setIsLoading(false);
        CustomeToastMessage('Employee added successfully','success')
        navigate('/Employee/Search')
      }).catch(err=>{
        console.log('the error occured while adding a new employee is:  ');
        console.log(err);
        setIsLoading(false);
        CustomeToastMessage(err.response?err.response.data.message:err.message,'error')
      })
    }

   }


  return (
    <div className={classes.main}>
      {isLoading && <LoadingSpinner />}
      <form onSubmit={submitData} className={classes.form}>
        <p className={classes.header}>Employee Details</p>
        <hr />
        <FormFirstSecion ref={firstSectionRef} isEdit={empId?true:false} editedValues={editedFirstSectionValues}/>
        <FormSecondSection ref={secondSectionRef} isEdit={empId?true:false} editedValues={editedSecondSectionValues}/>
        <FormThirdSection ref={thirdSectionRef} isEdit={empId?true:false} editedValues={editedThirdSectionValues}/>
        <FormFourthSection ref={fourthSectionRef} isEdit={empId?true:false} editedValues={editedFourthSectionValues}/>
        <p className={classes.header}>Skills</p>
        <hr />
        <FormFifthSection ref={fifthSectionRef} isEdit={empId?true:false} editedValues={editedFifthSectionValues}/>
        <hr />
        <div className={classes.buttonSection}>
          <button className={classes.button+' bg-green-700 mr-1'}>Save</button>
          <button className={classes.button+' bg-red-600 '} onClick={()=>navigate('/Employee/Search')}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default CreateEmployeeForm
