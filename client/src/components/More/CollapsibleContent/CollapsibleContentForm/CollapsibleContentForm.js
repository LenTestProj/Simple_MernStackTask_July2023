import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import classes from "./CollapsibleContentForm.module.css";
import SingleCollapsibleListItems from "../../../../data/SingleCollapsibleContent.json";
import MultipleCollapsibleListItems from "../../../../data/MultipleCollapsibleContent.json";
import { CSSTransition } from "react-transition-group";
import "./CollapsibleAnimation.css";
import CustomTabsMenu from "../../../../customComponents/customTabsMenu/CustomTabsMenu";

const Collapse = ({ isMultipleCollapse }) => {
  const [collapsibleList, setCollapsibleList] = useState(
    isMultipleCollapse
      ? MultipleCollapsibleListItems
      : SingleCollapsibleListItems
  );

  const showContent = (itemNum) => {
    if (isMultipleCollapse) {
      setCollapsibleList(
        collapsibleList.map((item, i) => {
          if (i === itemNum) {
            item.isActive = !item.isActive;
          }
          return item;
        })
      );
    } else {
      setCollapsibleList(
        collapsibleList.map((item, i) => {
          if (i === itemNum) {
            item.isActive = !item.isActive;
          } else {
            item.isActive = false;
          }
          return item;
        })
      );
    }
  };

  return (
    <div className={classes.collapseMain}>
      <ul>
        {collapsibleList.map((item, i) => {
          return (
            <li>
              <div
                className={
                  classes.listItemHeader +
                  (i !== collapsibleList.length - 1 ? " mb-1" : "")
                }
                onClick={showContent.bind(null, i)}
              >
                <p>{item.title}</p>
                <FontAwesomeIcon icon={faPlus} className={classes.plus} />
              </div>
              <CSSTransition
                in={item.isActive}
                unmountOnExit
                timeout={700}
                classNames="CollapsibleList"
              >
                <div>
                  <div style={{ minHeight: 0 }}>
                    <div className={classes.listItemContent}>
                      {item.content.map((subItem, j) => {
                        return (
                          <p
                            className={
                              j !== item.content.length - 1 ? "pb-2" : ""
                            }
                          >
                            {subItem}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </CSSTransition>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const tabValues = [
  {
    value: "Single Collapse",
    isActive: true,
  },
  {
    value: "Multiple Collapse",
    isActive: false,
  },
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
];

const CollapsibleContentForm = () => {
  const tabsArray = useState(tabValues)[0];
  const [tabsContentArray, setTabsContentArray] = useState(tabContent);

  useEffect(()=>{
    setTabsContentArray(prevArray=>prevArray.map((item,i)=>{
      if(i===0){
        item.content=<Collapse /> 
      }
      else{
        item.content=<Collapse isMultipleCollapse={true} />
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
  );
};

export default CollapsibleContentForm;
