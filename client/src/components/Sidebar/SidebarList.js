import React, { useContext, useEffect, useState } from "react";
import SidebarOriginalItems from "../../data/sidebarlistItems.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSTransition } from "react-transition-group";
import {
  faHouse,
  faUsers,
  faList,
  faGear,
  faAngleRight,
  faPenToSquare,
  faHandPointRight,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import classes from "./SidebarList.module.css";
import "./Sublist.css";
import { NavLink, useNavigate } from "react-router-dom";
import Context from "../../context/context";

const SidebarList = () => {
  const [sidebarListItems, setSidebarListItems] =
    useState(SidebarOriginalItems);
  const navigate = useNavigate();
  const { setShowMobileSidebar } = useContext(Context);

  useEffect(() => {
    setSidebarListItems((prevList) => {
      const tempList = JSON.parse(JSON.stringify(prevList));
      tempList[0].image = faHouse;
      tempList[1].image = faUsers;
      tempList[2].image = faList;
      tempList[3].image = faGear;
      return tempList;
    });
  }, []);

  useEffect(() => {
    const sidebarValues = JSON.parse(localStorage.getItem("sidebarValues"));
    const sidebarHeaderItem = sidebarValues.headerItem;
    const sidebarSubListItem = sidebarValues.subListItem;
    if (sidebarHeaderItem === "Home") {
      setSidebarListItems((prev) =>
        prev.map((item, i) => {
          item.title === "Home" ? (item.isActive = true) : (item.isActive = false);
          item.subList = item.subList.length>0 ?item.subList.map((subItem) => {
            subItem.isActive = false;
            return subItem;
          }):item.subList;
          return item;
        })
      );
      return;
    } else if (!sidebarHeaderItem || !sidebarSubListItem) {
      return;
    } else {
      setSidebarListItems((prev) =>
        prev.map((item, i) => {
          if (item.title === sidebarHeaderItem) {
            item.isActive=true;
            item.subList.map((subItem) => {
              if (subItem.title === sidebarSubListItem) {
                subItem.isActive = true;
              } else {
                subItem.isActive = false;
              }
              return subItem;
            });
          } else {
            item.isActive=false;
            item.subList = item.subList.length>0 ?item.subList.map((subItem) => {
              subItem.isActive = false;
              return subItem;
            }):item.subList;
          }
          return item;
        })
      );
    }
  }, []);

  const listItemOpen = (itemNum) => {
    if (itemNum === 0) {
      navigate("/Home/Index");
      // window.innerWidth<720 && setShowMobileSidebar(false);
    } else {
      setSidebarListItems(
        sidebarListItems.map((item, i) => {
          if (i === itemNum) {
            item.isOpen = !item.isOpen;
          } else {
            item.isOpen = false;
          }
          return item;
        })
      );
    }
  };

  return (
    <div className={classes.main}>
      <ul>
        {sidebarListItems.map((item, i) => (
          <li key={i}>
            <div className={classes.mainListItem}>
              <div
                className={
                  classes.mainListItemSection +
                  " " +
                  (item.isActive ? classes.activeItem : "")
                }
                onClick={listItemOpen.bind(null, i)}
              >
                <div className="flex">
                  <FontAwesomeIcon
                    icon={item.image}
                    className={classes.mainListIconImage}
                  />
                  <p className={classes.mainListItemText}>{item.title}</p>
                </div>
                <div>
                  {i !== 0 && (
                    <FontAwesomeIcon
                      icon={faAngleRight}
                      className={
                        classes.sideArrowIconImage +
                        ` ${item.isOpen ? classes.mainListOpen : " "}`
                      }
                    />
                  )}
                </div>
              </div>

              {item.subList.length > 0 && (
                <CSSTransition
                  in={item.isOpen}
                  unmountOnExit
                  timeout={1000}
                  classNames="sublist-display"
                >
                  <div className={classes.sublist}>
                    <ul>
                      {item.subList.map((subItem, subIndex) => {
                        return (
                          <li key={subIndex}>
                            <div
                              className={
                                classes.subListItemSection +
                                " " +
                                (subItem.isActive ? classes.activeSubitem : "")
                              }
                              onClick={() => navigate(subItem.path)}
                            >
                              <FontAwesomeIcon
                                icon={
                                  i === 1 && subIndex === 0
                                    ? faPenToSquare
                                    : i === 1 && subIndex === 1
                                    ? faSearch
                                    : faHandPointRight
                                }
                                className={classes.mainListIconImage}
                              />
                              <p className={classes.subListItemText}>
                                {subItem.title}
                              </p>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </CSSTransition>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarList;
