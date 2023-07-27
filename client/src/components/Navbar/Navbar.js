import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import React, { useContext } from 'react';
import classes from './Navbar.module.css'
import Context from '../../context/context';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const {logout,user} = useContext(Context)
  const navigate=useNavigate();

  return (
    <div className={classes.main}>
      <div className={classes.item}>
        <p>{user}</p>
      </div>
      <div className={classes.item}>
        <FontAwesomeIcon icon={faRightToBracket} className={classes.logoutIcon}/>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  )
}

export default Navbar
