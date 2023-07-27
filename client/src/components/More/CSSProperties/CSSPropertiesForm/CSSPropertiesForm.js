import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classes from "./CSSPropertiesForm.module.css";
import CSSPropertyItems from "../../../../data/CSSProperties.json";
import CustomTabsMenu from "../../../../customComponents/customTabsMenu/CustomTabsMenu";

const CSSPropertiesSection = ({
  values,
  isLink,
  isLabel,
  isButton,
  isAlert,
  isProgressBar,
}) => {
  const [isContentSet, setIsContentSet] = useState(false);
  const [items,setItems]=useState(values);

  useEffect(()=>{
    setItems(prev=>{
        if(isLink){
            prev=prev.map((item,i)=>{
              item.content=<Link to={item.url} target="_blank" style={{color:item.color}}>{item.title}</Link>
              return item;
            })
        }
        if(isLabel || isAlert){
          prev=prev.map((item,i)=>{
            item.content=<label style={{backgroundColor:item.color}} className={`${isAlert?'p-[0.4rem] w-full':'p-1'}  ${(i===0 && isLabel)?'text-black':'text-white'}`}>{item.title}</label>
            return item;
          })
        }
        if(isButton){
          prev=prev.map((item,i)=>{
            item.content=<button type='button' style={{backgroundColor:item.color}} className={`p-1  ${i===0?'text-black':'text-white'}`}>
              {item.title}
            </button>
            return item;
          })
        }
        if(isProgressBar){
          prev=prev.map((item,i)=>{
            item.content=<div className="bg-gray-300 w-full">
               <div className={`h-5`} style={{backgroundColor:item.color,width:`${item.progressValue}%`}}></div>
            </div>
            return item;
          })
        }
        return prev;
    });
    setIsContentSet(true);
  },[isLink,isLabel,isButton,isAlert,isProgressBar])

  return isContentSet ? (
    <div className={classes.list+''+((isAlert||isProgressBar)?' flex-col py-5 px-3':' h-[10rem]')}>
      {items.map((item, i) => {
        return (
          <div className={classes.listItem+''+((isAlert||isProgressBar)?' flex w-full':'')} key={i}>
            {item.content}
          </div>
        );
      })}
    </div>
  ) : null;
};

const tabValues = [
  {
    value: "Links",
    isActive: true,
  },
  {
    value: "Labels",
    isActive: false,
  },
  {
    value: "Buttons",
    isActive: false,
  },
  {
    value: "Alerts",
    isActive: false,
  },
  {
    value: "Progress Bars",
    isActive: false,
  }
];

const tabContent = [
  {
    content: null,
    isActive: true,
  },
  {
    content: null,
    isActive: false,
  },
  {
    content: null,
    isActive: false,
  },
  {
    content: null,
    isActive: false,
  },
  {
    content: null,
    isActive: false,
  }
];


const CSSPropertiesForm = () => {
  const Links = useState(JSON.parse(JSON.stringify(CSSPropertyItems.Links)))[0];
  const Labels = useState(
    JSON.parse(JSON.stringify(CSSPropertyItems.Labels))
  )[0];
  const Buttons = useState(
    JSON.parse(JSON.stringify(CSSPropertyItems.Buttons))
  )[0];
  const Alerts = useState(
    JSON.parse(JSON.stringify(CSSPropertyItems.Alerts))
  )[0];
  const ProgressBars = useState(
    JSON.parse(JSON.stringify(CSSPropertyItems.ProgressBars))
  )[0];
  const tabsArray = useState(tabValues)[0];
  const [tabsContentArray, setTabsContentArray] = useState(tabContent);

  useEffect(() => {
    setTabsContentArray((prevArray) =>
      prevArray.map((item, i) => {
        if (i === 0) {
          item.content = <CSSPropertiesSection isLink values={Links} />;
        } else if (i === 1) {
          item.content = <CSSPropertiesSection isLabel values={Labels} />;
        } else if (i === 2) {
          item.content = <CSSPropertiesSection isButton values={Buttons} />;
        } else if(i===3){
          item.content = <CSSPropertiesSection isAlert values={Alerts} />;
        }
        else{
          item.content = <CSSPropertiesSection isProgressBar values={ProgressBars} />;
        }
        return item;
      })
    );
  }, [Alerts,Buttons,Labels,ProgressBars,Links]);


  return (
    <div className={classes.main}>
      <form className={classes.form}>
        {<CustomTabsMenu tabValues={tabsArray} tabContent={tabsContentArray} />}
      </form>
    </div>
  );
};

export default CSSPropertiesForm;
