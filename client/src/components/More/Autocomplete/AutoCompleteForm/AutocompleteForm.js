import React, { useState,useRef, useEffect } from "react";
import CustomTabsMenu from "../../../../customComponents/customTabsMenu/CustomTabsMenu";
import classes from "./AutocompleteForm.module.css";

const autoCompleteList = [
  "ActionScript",
  "Applescript",
  "Asp",
  "BASIC",
  "C",
  "C++",
  "Closure",
  "COBOL",
  "ColdFusion",
  "Erlang",
  "Fortran",
  "Groovy",
  "Haskell",
  "Java",
  "Javascript",
  "Perl",
  "Php",
  "Python",
  "Ruby",
  "Scala",
  "Scheme",
];

const AutoCompleteContent = ({multiselect}) => {
  const [inputValue, setInputValue] = useState("");
  const [autoCompleteListItems,setAutoCompleteListItems]=useState([])
  const [isMultiItemselected,setIsMultiItemSelected]=useState(false);


  const FilterMultipleInput=(event)=>{
     setInputValue((prevValue) => event.target.value);
      if(event.target.value.length===0)
      {
        setAutoCompleteListItems([]);
        return;
      }
      if(isMultiItemselected && !event.target.value.includes(',')){
        setIsMultiItemSelected(false);
        return;
      }

      if(isMultiItemselected){
        const tempArray=event.target.value.split(',');
        const selectedValue=tempArray[tempArray.length-1];
        setAutoCompleteListItems(autoCompleteList.filter(item=>item.toLowerCase().includes(selectedValue.trim().toLowerCase())));
        return;
        
      }
      setAutoCompleteListItems(autoCompleteList.filter(item=>item.toLowerCase().includes(event.target.value.trim().toLowerCase()))); 
  }

  const FilterInput=(event)=>{
    setInputValue((prevValue) => event.target.value);
      if(event.target.value.length===0)
      {
        setAutoCompleteListItems([]);
        return;
      }
      setAutoCompleteListItems(autoCompleteList.filter(item=>item.toLowerCase().includes(event.target.value.trim().toLowerCase()))); 
  }

  const selectListItem=(event)=>{
    if(multiselect){
        let tempArray=[];
        let chosenValue='';
        if(inputValue.includes(','))
        {
          tempArray=inputValue.split(', ');
          tempArray.pop();
          tempArray.push(event.target.innerText.trim());
          console.log('the temp array is: ');
          console.log(tempArray);
          tempArray.forEach(item=>{
            console.log('the chosen item before is: '+chosenValue);
            console.log('The item is: '+item);
              chosenValue=chosenValue+item+', '
              console.log('the chosen item is: '+chosenValue);
          })
        }
        else{
          chosenValue=event.target.innerText+', ';
        }
        setInputValue(chosenValue);
      !isMultiItemselected && setIsMultiItemSelected(true);
    }
    else{
      setInputValue(event.target.innerText);    
    }
    setAutoCompleteListItems([]);
  }

  return (
    <div className={classes.content}>
      <p>Tags:</p>
      <div className={classes.inputSection}>
        <input
          type="text"
          className={classes.input}
          value={inputValue}
          onChange={multiselect?FilterMultipleInput:FilterInput}
          />
        <ul className={classes.list} onClick={selectListItem} tabIndex="0" >
          {autoCompleteListItems.map((item,i)=>{
           return <li key={i} className={classes.listItem} tabIndex="-1">{item}</li>
          })}
        </ul>
      </div>
    </div>
  );
};

const tabValues=[
  {
  value:'Single Value',
  isActive:true
  },
  {
    value:'Multiple Values',
    isActive:false
  }
];

const tabContent=[
  {
    content:null,
    isActive:true
  },
  {
    content:null,
    isActive:false
  }
]

const AutocompleteForm = () => {
  const tabsArray=useState(tabValues)[0];
  const [tabsContentArray,setTabsContentArray]=useState(tabContent);

  useEffect(()=>{
    setTabsContentArray(prevArray=>prevArray.map((item,i)=>{
      if(i===0){
        item.content=<AutoCompleteContent />
      }
      else{
        item.content=<AutoCompleteContent multiselect={true} /> 
      }
      return item;
    }))
  },[])

  return (
    <div className={classes.main}>
      <form className={classes.form}>
      <CustomTabsMenu tabValues={tabsArray} tabContent={tabsContentArray}/>
      </form>
    </div>
  );
};

export default AutocompleteForm;
