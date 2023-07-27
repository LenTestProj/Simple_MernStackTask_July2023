import React, { useEffect, useState } from 'react';
import CustomTabsMenu from '../../../../customComponents/customTabsMenu/CustomTabsMenu';
import classes from './MultipleTabsForm.module.css';
import multipleTabsData from '../../../../data/multipletabsData.json';

const tabValues=[
  {
  value:'Plan To Succeed',
  isActive:true
},
{
  value:'UnLearning',
  isActive:false
},
{
  value:'Ways of Learning',
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
  },
  {
    content:null,
    isActive:false
  }
]

const Content=({data})=>{
  return <div className={classes.content}>
   {data.map((item,i)=>{
    return (<div key={i}><p>{item}</p>
    <br /></div>)
   })}
   <div>
      <input type="text" className={classes.input+' mr-5'}/>
      <input type="text" className={classes.input}/>
   </div>
  </div>
}

const MultipleTabsForm = () => {
  const PlanToSucceedData=useState(multipleTabsData.PlanToSucceed)[0];
  const UnLearningData=useState(multipleTabsData.UnLearning)[0];
  const WaysOfLEarningData=useState(multipleTabsData.WaysOfLearning)[0];
  const tabsArray=useState(tabValues)[0];
  const [tabsContentArray,setTabsContentArray]=useState(tabContent);

  useEffect(()=>{
    setTabsContentArray(prevContent=>prevContent.map((item,i)=>{
      if(i===0){
        item.content=<Content data={PlanToSucceedData} />
      }
      else if(i===1){
        item.content=<Content data={UnLearningData} />
      }
      else{
        item.content=<Content data={WaysOfLEarningData} /> 
      }
      return item;
    }));
    // setTabsContentArray(prevArray=>{
    //   const tempArray=JSON.parse(JSON.stringify(prevArray));
    //   tempArray[0].content=<><Content data={PlanToSucceedData} /></>
    //   tempArray[1].content=<><Content data={UnLearningData} /></>
    //   tempArray[2].content=<><Content data={WaysOfLEarningData} /></>
    //   return tempArray;
    // });
  },[PlanToSucceedData,UnLearningData,WaysOfLEarningData])

  return (
    <div className={classes.main}>
      <form className={classes.form}>
        <CustomTabsMenu tabValues={tabsArray} tabContent={tabsContentArray}/>
      </form>
    </div>
  )
}

export default MultipleTabsForm
