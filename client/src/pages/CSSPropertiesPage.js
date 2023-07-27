import React, { useEffect } from 'react'
import CSSProperties from '../components/More/CSSProperties/CSSProperties'
import Sidebar from '../components/Sidebar/Sidebar'

const CSSPropertiesPage = () => {

  useEffect(()=>{
    const sidebarValues=JSON.stringify({
      headerItem:'More',
      subListItem:'CSS Properties'
    })
    localStorage.setItem('sidebarValues',sidebarValues)
  },[])

  return (
    <div className='flex pt-10 sm:pt-2'>
      <Sidebar />
      <CSSProperties />
    </div>
  )
}

export default CSSPropertiesPage
