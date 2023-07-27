import React, { useState } from 'react'
import classes from './TooltipForm.module.css';

const text='You have not Clicked this button yet. Please Click me and check the tooltip '

const Tooltip=()=>{
    const [toolTipText,setTooltipText]=useState(text);

    const setNewToolTipText=(event)=>{
      setTooltipText('Thank you for being here');
    }
    
    console.log(toolTipText);

    return <div className={classes.content}>
        <button className={classes.button} onClick={setNewToolTipText} type='button'>Check the Tooltip before You Click</button>
        <span className={classes.tooltipText}>{toolTipText}</span>
    </div>
}

const TooltipForm = () => {
  return (
    <div className={classes.main}>
      <form className={classes.form}>
        <Tooltip />
      </form>
    </div>
  )
}

export default TooltipForm
