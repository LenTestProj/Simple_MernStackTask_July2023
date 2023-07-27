import React, { useEffect, useState } from "react";
import classes from "./PopupsForm.module.css";
import PopupModal from "../../../../customComponents/PopupModal/PopupModal";
import CustomTabsMenu from "../../../../customComponents/customTabsMenu/CustomTabsMenu";

const FirstRowItems = [
  {
    title: "Popup One",
    isClicked: false,
    url: "https://www.google.com",
  },
  {
    title: "Popup Two",
    isClicked: false,
    url: "https://www.tutorialspoint.com/",
  },
  {
    title: "Popup Three",
    isClicked: false,
    url: "https://www.tutorialsteacher.com/",
  },
];
const SecondRowItems = [
  {
    title: "Popup Duplicate",
    isClicked: false,
    url: "https://www.javatpoint.com/",
  },
  {
    title: "Duplicate Tab",
    isClicked: false,
    url: "https://www.tutorialspoint.com/",
  },
  {
    title: "In Window Popup",
    isClicked: false,
    url: "https://www.tutorialspoint.com/",
  },
];
const ThirdRowItems = [
  {
    title: "Alert Box",
    isClicked: false,
    url: "https://www.tutorialspoint.com/",
  },
  {
    title: "Confirm Box",
    isClicked: false,
    url: "https://www.tutorialspoint.com/",
  },
  {
    title: "Prompt Box",
    isClicked: false,
    url: "https://www.tutorialspoint.com/",
  },
];

const rows = {
  FirstRow: JSON.parse(JSON.stringify(FirstRowItems)),
  SecondRow: JSON.parse(JSON.stringify(SecondRowItems)),
  ThirdRow: JSON.parse(JSON.stringify(ThirdRowItems)),
};

const PopupHeader='Popup One';
const PopupBody='Popup One body.. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.';

const Popup = () => {
  const [rowItems, setRowItems] = useState(structuredClone(rows));

  const [showPopupModal, setShowPopupModal] = useState(false);
  const [displayPromptMessage, setDisplayPromptMessage] = useState(null);
  const [isReset, setIsReset] = useState(false);

  const resetAllItems = () => {
    if (!isReset) {
      setRowItems({
        FirstRow: JSON.parse(JSON.stringify(FirstRowItems)),
        SecondRow: JSON.parse(JSON.stringify(SecondRowItems)),
        ThirdRow: JSON.parse(JSON.stringify(ThirdRowItems)),
      });
      setIsReset(true);
    }
  };

  const setSecondRowItem = (buttonId) => {
    setRowItems({
      FirstRow: JSON.parse(JSON.stringify(FirstRowItems)),
      SecondRow: rows.SecondRow.map((item, i) => {
        if (i === buttonId) {
          item.isClicked = true;
        } else {
          item.isClicked = false;
        }
        return item;
      }),
      ThirdRow: JSON.parse(JSON.stringify(ThirdRowItems)),
    });
    setIsReset(false);
  };

  const openWindow = (event, rowNum, buttonId, url) => {
    let win;
    event.stopPropagation();
    if (rowNum === 1) {
      win = window.open(
        url,
        null,
        "popup,width=400px,height=400px,left=20px,top=20px"
      );
      const timer = setInterval(() => {
        if (win.closed) {
          clearInterval(timer);
          setRowItems({
            FirstRow: rows.FirstRow.map((item, i) => {
              if (i === buttonId) {
                item.isClicked = true;
              } else {
                item.isClicked = false;
              }
              return item;
            }),
            //reset the default color of other buttons
            SecondRow: JSON.parse(JSON.stringify(SecondRowItems)),
            ThirdRow: JSON.parse(JSON.stringify(ThirdRowItems)),
          });
          setIsReset(false);
        }
      }, 1000);
    } else if (rowNum === 2) {
      if (buttonId === 0) {
        win = window.open(
          url,
          null,
          "popup,width=400px,height=400px,left=20px,top=20px"
        );
      } else if (buttonId === 1) {
        win = window.open(url, null);
      } else {
        setShowPopupModal(true);
        setSecondRowItem(buttonId);
        return;
      }
      const timer = setInterval(() => {
        if (win.closed) {
          clearInterval(timer);
          setSecondRowItem(buttonId);
        }
      }, 1000);
    } else {
      if (buttonId === 0) {
        alert("This is an alert box");
      } else if (buttonId === 1) {
        // eslint-disable-next-line no-restricted-globals
        confirm("Confirm message box");
      } else {
        const promptMessage = prompt(
          "Enter your name",
          "JALA Academy- A Place to find your Dream Job"
        );
        if (promptMessage) {
          setDisplayPromptMessage(promptMessage);
        } else {
          setDisplayPromptMessage("User Cancelled the prompt");
        }
        setTimeout(() => {
          setDisplayPromptMessage(null);
        }, 1000);
      }
      setRowItems({
        FirstRow: JSON.parse(JSON.stringify(FirstRowItems)),
        SecondRow: JSON.parse(JSON.stringify(SecondRowItems)),
        ThirdRow: rows.ThirdRow.map((item, i) => {
          if (i === buttonId) {
            item.isClicked = true;
          } else {
            item.isClicked = false;
          }
          return item;
        }),
      });
      setIsReset(false);
    }
  };

  const closeModal=()=>{
    setShowPopupModal(false);
  }

  return (
    <>
      {showPopupModal && <PopupModal onClose={closeModal} header={PopupHeader} body={PopupBody} btns={[{name:'Close',onClick:closeModal}]}/>}
      <div className={classes.content} onClick={resetAllItems}>
        <div className={classes.row}>
          {rowItems.FirstRow.map((item, i) => {
            return (
              <div className={classes.item} key={i}>
                <button
                  type="button"
                  className={
                    classes.button +
                    " " +
                    (item.isClicked ? classes.buttonClicked : "")
                  }
                  onClick={(event) => openWindow(event, 1, i, item.url)}
                >
                  {item.title}
                </button>
              </div>
            );
          })}
        </div>
        <div className={classes.row}>
          {rowItems.SecondRow.map((item, i) => {
            return (
              <div className={classes.item} key={i}>
                <button
                  type="button"
                  className={
                    classes.button +
                    " " +
                    (item.isClicked ? classes.buttonClicked : "")
                  }
                  onClick={(event) => openWindow(event, 2, i, item.url)}
                >
                  {item.title}
                </button>
              </div>
            );
          })}
        </div>
        <div className={classes.row}>
          {rowItems.ThirdRow.map((item, i) => {
            return (
              <div className={classes.item} key={i}>
                <button
                  type="button"
                  className={
                    classes.button +
                    " " +
                    (item.isClicked ? classes.buttonClicked : "")
                  }
                  onClick={(event) => openWindow(event, 3, i, item.url)}
                >
                  {item.title}
                </button>
              </div>
            );
          })}
        </div>
        {displayPromptMessage && (
          <div className={classes.promptRow}>
            <p>{displayPromptMessage}</p>
          </div>
        )}
      </div>
    </>
  );
};

const tabValues = [
  {
    value: "Popups",
    isActive: true,
  },
];

const tabContent = [
  {
    content: null,
    isActive: true,
  },
];

const PopupsForm = () => {
  const tabsArray = useState(tabValues)[0];
  const [tabsContentArray, setTabsContentArray] = useState(tabContent);

  useEffect(()=>{
    setTabsContentArray(prevArray=>prevArray.map(item=>{
      item.content=<Popup /> 
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

export default PopupsForm;
