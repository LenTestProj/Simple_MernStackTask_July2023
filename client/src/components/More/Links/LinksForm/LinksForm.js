import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classes from "./LinksForm.module.css";
import LinkItems from "../../../../data/Links.json";
import CustomTabsMenu from "../../../../customComponents/customTabsMenu/CustomTabsMenu";



const LinkSection = ({ links, isImageLink }) => {
  return (
    <div className={classes.list}>
      {isImageLink
        ? links.map((item, i) => {
            return (
              <div className={classes.listItem} key={i}>
                <Link to={item.url} target="_blank">
                  <img src={item.src} className="w-10 h-10" alt="test" />
                </Link>
              </div>
            );
          })
        : links.map((item, i) => {
            return (
              <div style={{color:item.color}}
                className={classes.listItem}
                key={i}
              >
                <Link to={item.url} target="_blank">
                  {item.title}
                </Link>
              </div>
            );
          })}
    </div>
  );
};

const tabValues = [
  {
    value: "Working Links",
    isActive: true,
  },
  {
    value: "Broken Links",
    isActive: false,
  },
  {
    value: "Image Links",
    isActive: false,
  },
  {
    value: "Status Codes",
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
  {
    content: null,
    isActive: false,
  },
  {
    content: null,
    isActive: false,
  },
];

const LinksForm = () => {
  const WorkingLinks = useState(
    JSON.parse(JSON.stringify(LinkItems.WorkingLinks))
  )[0];
  const BrokenLinks = useState(
    JSON.parse(JSON.stringify(LinkItems.BrokenLinks))
  )[0];
  const ImageLinks = useState(
    JSON.parse(JSON.stringify(LinkItems.ImageLinks))
  )[0];
  const StatusCodeLinks = useState(
    JSON.parse(JSON.stringify(LinkItems.StatusCodeLinks))
  )[0];
  const tabsArray = useState(tabValues)[0];
  const [tabsContentArray, setTabsContentArray] = useState(tabContent);

  useEffect(() => {
    setTabsContentArray((prevArray) =>
      prevArray.map((item, i) => {
        if (i === 0) {
          item.content = <LinkSection links={WorkingLinks} />;
        } else if (i === 1) {
          item.content = <LinkSection links={BrokenLinks} />;
        } else if (i === 2) {
          item.content = <LinkSection links={ImageLinks} isImageLink/>;
        } else {
          item.content = <LinkSection links={StatusCodeLinks} />;
        }
        return item;
      })
    );
  }, [WorkingLinks, BrokenLinks, ImageLinks, StatusCodeLinks]);

  return (
    <div className={classes.main}>
      <form className={classes.form}>
        <CustomTabsMenu tabValues={tabsArray} tabContent={tabsContentArray} />
      </form>
    </div>
  );
};

export default LinksForm;
