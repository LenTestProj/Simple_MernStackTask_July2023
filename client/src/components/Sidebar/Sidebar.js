import React, { useContext } from 'react'
import Context from '../../context/context';
import classes from './Sidebar.module.css';
import SidebarHeader from './SidebarHeader';
import SidebarList from './SidebarList';


const Sidebar = () => {
  const {showMobileSidebar}=useContext(Context);

  return (
    <div className={classes.main+' '+(showMobileSidebar && classes.showMobSidebar)}>
      <SidebarHeader />
      <SidebarList />
    </div>
  )
}

export default Sidebar
