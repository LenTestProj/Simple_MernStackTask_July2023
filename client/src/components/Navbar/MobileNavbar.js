import React, { useCallback, useContext, useEffect } from 'react'
import classes from './Mobilenavbar.module.css';
import Context from '../../context/context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const MobileNavbar = () => {
   const {showMobileSidebar,setShowMobileSidebar,logout}=useContext(Context);
   const navigate=useNavigate();
    const windowResizeListener=useCallback(()=>{
    if(showMobileSidebar && window.innerWidth<720){
        setShowMobileSidebar(false);
    }
   },[showMobileSidebar,setShowMobileSidebar]);
   
    useEffect(()=>{
        window.addEventListener("resize",windowResizeListener);
     return ()=>{
        console.log('navbar cleanup function');
     }
   }
   ,[windowResizeListener])
  
  
    return (
    <div className={classes.main}>
      <div className={classes.item} onClick={()=>setShowMobileSidebar(prev=>!prev)}>
       <div className={classes.bars}></div>
       <div className={classes.bars}></div>
       <div className={classes.bars}></div>
      </div>
      <div className={classes.item}>
        <FontAwesomeIcon icon={faRightToBracket} className={classes.logoutIcon}/>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  )
}

export default MobileNavbar
