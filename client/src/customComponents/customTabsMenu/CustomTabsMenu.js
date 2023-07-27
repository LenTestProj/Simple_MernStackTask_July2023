import React, { useState } from "react";
import classes from "./CustomTabsMenu.module.css";

const CustomTabsMenu = ({tabValues, tabContent}) => {
  const [tabsArray,setTabsArray]=useState(tabValues);
  const [tabsContentArray,setTabsContentArray]=useState(tabContent);

  const setActiveTab=(event)=>{
    const id=parseInt(event.target.id)
    setTabsArray(tabsArray.map((tab,i)=>{
      if (i===id){
        tab.isActive=true;
      }
      else{
        tab.isActive=false;
      }
      return tab;
    }))
    setTabsContentArray(tabsContentArray.map((content,i)=>{
      if (i===id){
        content.isActive=true;
      }
      else{
        content.isActive=false;
      }
      return content;
    }))
  }

  return (
    <div className={classes.main}>
      <div className="flex">
        <ul className={classes.tabs} onClick={setActiveTab}>
          {tabsArray.map((tab,i)=>{
            return <li key={i} id={i} className={classes.tabItem+` ${tab.isActive? classes.selectedTabItem:''}`}>{tab.value}</li>
          })}
        </ul>
      </div>
      {tabsContentArray.map((item,i)=>{
        return item.isActive ? <div className={classes.content} key={i}>{item.content}
        </div>:null
      })}
    </div>
  );
};

export default CustomTabsMenu;
