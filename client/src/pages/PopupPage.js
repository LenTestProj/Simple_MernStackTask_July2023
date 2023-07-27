import React, { useEffect } from 'react'
import Popups from '../components/More/Popups/Popups'
import Sidebar from '../components/Sidebar/Sidebar'

const PopupPage = () => {

  useEffect(()=>{
    const sidebarValues=JSON.stringify({
      headerItem:'More',
      subListItem:'Popups'
    })
    localStorage.setItem('sidebarValues',sidebarValues)
  },[])

  return (
    <div className='flex pt-10 sm:pt-2'>
      <Sidebar />
      <Popups />
    </div>
  )
}

export default PopupPage
