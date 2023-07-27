import React from 'react';
import classes from './IFramesForm.module.css';
import FrameItems from '../../../../data/IFrameItems.json';


const IFrame=()=>{
    return <div className={classes.Frame}>
        {FrameItems.map((item,i)=>{
            return <div className={classes.FrameItem}>
            <p>{item.title}</p>
            <iframe width="100%" height="165" title={item.title} src={item.src}></iframe>
        </div>
        })}
        
    </div>
}


const IFramesForm = () => {
  return (
    <div className={classes.main}>
      <form className={classes.form}>
        <IFrame />
      </form>
    </div>
  )
}

export default IFramesForm
