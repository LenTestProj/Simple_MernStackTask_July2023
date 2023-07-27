import React, { useEffect, useState } from "react";
import classes from "./PopupModal.module.css";
import ReactDOM  from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { CSSTransition } from "react-transition-group";
import './PopupModal.css';

const Modal=({onClose,header,body,buttons})=>{
    return <div className={classes.main}>
        <div className={classes.row}>
            <p>{header}</p>
            <FontAwesomeIcon icon={faClose} className={classes.closeButton} onClick={onClose}/>
        </div>
        <div className={classes.row}>
            <p>{body}</p>
        </div>
        <div className={classes.row}>
          {buttons.map((button,i)=>{
            return <button className={classes.button} onClick={button.Click} key={i} style={{...button.styles}}>
            {button.name}
        </button> 
          })}
        </div>
        
    </div>
}

const PopupModal = ({onClose,header,body,btns}) => {
  const [openModal,setOpenModal]=useState(false);
  const [buttons,setButtons]=useState(btns);
  const timer=setTimeout(()=>{
    setOpenModal(true);
    clearTimeout(timer);
  },700)

  const closeModal=()=>{
    setOpenModal(false);
    const timer=setTimeout(()=>{
      onClose();
      clearTimeout(timer);
    },700)
  }

  useEffect(()=>{
    setButtons(prev=>prev.map(button=>{
      button.Click=()=>{
        setOpenModal(false);
        const timer=setTimeout(()=>{
           button.onClick();
           clearTimeout(timer); 
        },700);
      }
      return button;
    }))
  },[])

  return ReactDOM.createPortal(
    <>
      <div className={classes.overlay} onClick={closeModal}></div>
      <CSSTransition in={openModal} timeout={700} classNames='modal' unmountOnExit>
      <Modal onClose={closeModal} header={header} body={body} buttons={buttons}/>
      </CSSTransition>
     
    </>,document.getElementById('portal')
  );
};

export default PopupModal;
