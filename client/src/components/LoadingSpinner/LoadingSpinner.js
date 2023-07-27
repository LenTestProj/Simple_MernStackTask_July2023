import React, { useEffect, useRef, useState } from 'react'
import classes from './LoadingSpinner.module.css';

const LoadingSpinner = () => {
  const [text,setText]=useState('Loading');  
  const [count,setCount]=useState(0);

  useEffect(()=>{
    const timer=setInterval(()=>{
      setCount(prev=>{
        if(prev<3){
            setText(val=>val+'.');
            return prev+1;
        }
        else{
            setText(prev=>{
                const newValue=prev.substring(0,prev.length-3);
                return newValue
            });
            return 0;
        }
      });
    },700);
    return ()=>{
        clearInterval(timer);
        console.log('timer cleared');
    }
  },[])

  return (
    <div className={classes.main}>
      <p className={classes.text}>{text}</p>
    </div>
  )
}

export default LoadingSpinner
