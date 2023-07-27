import React, { useEffect, useState } from 'react'
import CustomTabsMenu from '../../../../customComponents/customTabsMenu/CustomTabsMenu';
import classes from './MenuForm.module.css';

const MenuItems=[
  {
    value:"Testing",
    subMenuItems:['Selenium','Manuel Testing','DB Testing','Unit Testing']
  },
  {
    value:"JAVA",
    subMenuItems:["Adv JAVA","Core JAVA","Spring","Hibernate"]
  },
  {
    value:".Net",
    subMenuItems:['C#',"ASP .Net","ADO .Net","MVC"]
  },
  {
    value:"Database",
    subMenuItems:["SQL","My SQL","Oracle","H2"]
  }
]

const RenderListItems=({activateSubMenu})=>{
   const [textValue,setTextValue]=useState(''); 

   const selectTextValue=(event)=>{
    setTextValue('You have selected '+event.target.firstChild.data+' Menu Option');
   }

   return <div className={classes.listSection}>
          <ul className={classes.list} onClick={selectTextValue}>
            {MenuItems.map((item,i)=>{
              return <li key={i} className={classes.listItem}>
              {item.value}
              {activateSubMenu && <ul className={classes.subList}>
                {item.subMenuItems.map((subItem,j)=>{
                   return <li key={j} className={classes.subListItem}>{subItem}</li> 
                })}
              </ul>}
          </li>
            })}
          </ul>
        <p className={classes.extraText}>{textValue}</p>
    </div>
}


const tabValues=[
  {
  value:'Single Menus',
  isActive:true
  },
  {
    value:'SubMenus',
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

const MenuForm = () => {
  const tabsArray=useState(tabValues)[0];
  const [tabsContentArray,setTabsContentArray]=useState(tabContent);

  useEffect(()=>{
    setTabsContentArray(prevArray=>prevArray.map((item,i)=>{
      if(i===0){
        item.content=<RenderListItems />
      }
      else{
        item.content=<RenderListItems activateSubMenu={true} />
      }
      return item;
    }))
  },[]);

  return (
    <div className={classes.main}>
      <form className={classes.form}>
      <CustomTabsMenu tabValues={tabsArray} tabContent={tabsContentArray}/>
    </form>
    </div>
  )
}

export default MenuForm
