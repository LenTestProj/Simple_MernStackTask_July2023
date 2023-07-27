import React, { useContext, useEffect } from 'react'
import Context from '../../context/context';
import classes from './Home.module.css';

const Home = () => {
  const {setShowMobileSidebar}=useContext(Context);

  useEffect(()=>{
    window.innerWidth<720 && setShowMobileSidebar(false);
  },[setShowMobileSidebar]);

  return (
    <div className={classes.main}>
      <div className={classes.header}>
        Welcome to JALA Academy
      </div>
      <div className={classes.text}>
      Do you want to Learn Selenium Automation completely with Practical Scenarios in 7 Days?
      </div>
      <ul className={classes.list}>
        <li className={classes.listItem}>
        You Learn Everything by doing projects if you are very serious to gat a software job in 60 days contact us : http://jalatechnologies.com/contact-us.html 
        </li>
        <li className={classes.listItem}>
            <p className='bg-yellow-300'>For working people can double the salery in 60 Days</p> 
        </li>
      </ul>
    </div>
  )
}

export default Home
