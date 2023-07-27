import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserLarge, faSackDollar} from '@fortawesome/free-solid-svg-icons'
import classes from './SidebarHeader.module.css'

import React from 'react'

const SidebarHeader = () => {
  return (
    <div className={classes.main}>
      <div className={classes.guestUserImage}>
      <FontAwesomeIcon icon={faUserLarge} className={classes.guestUserIcon}/>
      </div>
      <div className={classes.guestUserMiniUserSection}>
        <div className={classes.guestUserText}>Guest User</div>
        <div className={classes.miniUser}>
        <FontAwesomeIcon icon={faSackDollar} className={classes.miniUserIcon}/>
            <p className={classes.miniUserText}>User</p>
        </div>
      </div>
    </div>
  )
}

export default SidebarHeader
