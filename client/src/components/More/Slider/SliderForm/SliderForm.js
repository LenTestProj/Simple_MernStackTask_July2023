import React, { useEffect, useState } from "react";
import CustomTabsMenu from "../../../../customComponents/customTabsMenu/CustomTabsMenu";
import classes from "./SliderForm.module.css";

const Slider = () => {
  const [sliderValue, setSliderValue] = useState("8");

  const selectSliderValue = (event) => {
    setSliderValue((prev) => event.target.value);
  };

  return (
    <div className={classes.content}>
      <input
        type="range"
        value={sliderValue}
        className={classes.inputItem}
        onChange={selectSliderValue}
      />
      <p className={classes.textItem}>Current Slider Value: {sliderValue}</p>
    </div>
  );
};

const tabValues = [
  {
    value: "Slider",
    isActive: true,
  },
];

const tabContent = [
  {
    content: null,
    isActive: true,
  },
];

const SliderForm = () => {
  const tabsArray = useState(tabValues)[0];
  const [tabsContentArray, setTabsContentArray] = useState(tabContent);

  useEffect(()=>{
    setTabsContentArray(prevArray=>prevArray.map(item=>{
        item.content=<Slider />
        return item;
    }))
  },[]);

  console.log('the tabs and content array are: ');
  console.log(tabsArray);
  console.log(tabsContentArray);
 
  return (
    <div className={classes.main}>
      <form className={classes.form}>
      <CustomTabsMenu tabValues={tabsArray} tabContent={tabsContentArray}/>
      </form>
    </div>
  );
};

export default SliderForm;
