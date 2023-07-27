import React, { useEffect, useImperativeHandle, useState } from 'react';
import countriesData from '../../../../../data/countries';
import citiesData from '../../../../../data/cities.json';
import classes from './FormFourthSection.module.css';
import CustomCheckBox from '../../../../../customComponents/customCheckBox/CustomCheckBox';

const FormFourthSection = React.forwardRef(({isEdit,editedValues},ref) => {
  const countries=useState(countriesData)[0];
  const [cities,setCities]=useState(['--Select City--']);
  const [countryValue,setCountryValue]=useState(isEdit?editedValues.country:'--Select a Country--');
  const [cityValue,setCityValue]=useState(isEdit?editedValues.city:'--Select City--');
  const [isCityChecked,setIsCityChecked]=useState(isEdit?editedValues.isOtherCity:false);
 
//   console.log('the country, city and isCityChecked values are: '+countryValue,', '+cityValue+' and '+isCityChecked);

useEffect(()=>{
  if(isEdit){
    editedValues.country.length>0 && setCountryValue(editedValues.country);
    editedValues.city.length>0 && setCityValue(editedValues.city);
    editedValues.isOtherCity && setIsCityChecked(editedValues.isOtherCity);
    selectCity(editedValues.country,editedValues.city);
  }
},[editedValues.country,editedValues.city,editedValues.gender,editedValues.isOtherCity,isEdit])

   const selectCity=(value,cityValue)=>{
    let selectedCities;
    citiesData.forEach((mainCity,i)=>{
        if(mainCity.name===value){
            selectedCities=mainCity.values;
        }
        if(selectedCities && selectedCities.length>0)
        {
            return;
        }
    })
    if(selectedCities && selectedCities.length>0)
    {
        setCities(selectedCities);
        cityValue?setCityValue(cityValue):setCityValue(selectedCities[0]);
    }
    else{
        setCities(['--Select City--']);
        setCityValue('--Select City--');
    }
   }

   const fetchData=()=>{
     let finalData={};
     if (countryValue!=='--Select a Country--') finalData.country=countryValue;
     if (cityValue!=='--Select City--') finalData.city=cityValue;
     if (isCityChecked) finalData.isOtherCity=true;
     return finalData;
   }

   useImperativeHandle(ref,()=>({
    getData:fetchData
   }))


    return (
    <div className={classes.main}>
      <div className={classes.SectionItem}>
            <label className={classes.label}>Country</label>
            <select className={classes.input} onClick={(event)=>selectCity(event.target.value,null)} onChange={(event)=>setCountryValue(event.target.value)} value={countryValue}>
                {countries.map((country,i)=>{
                    return <option value={country} key={i}>{country}</option>
                })}
            </select> 
      </div>
      <div className={classes.SectionItem} style={{marginLeft:'0.9rem'}}>
            <label className={classes.label}>City</label>
            <select className={classes.input} onChange={(event)=>setCityValue(event.target.value)} value={cityValue}>
                {cities.map((city,i)=>{
                    return <option value={city} key={i}>{city}</option>
                })}
            </select> 
      </div>
      <div className={classes.extraItem}>
        <CustomCheckBox text="Other City" classname="w-3 h-3 mb-3 ml-1" textclassname='pt-[0.1rem]' setValue={setIsCityChecked} isChecked={isCityChecked}/>
      </div>
    </div>
  )
})

export default FormFourthSection
