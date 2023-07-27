import React, { useEffect } from 'react'
import Home from '../components/Home/Home'
import Sidebar from '../components/Sidebar/Sidebar'

const HomePage = () => {
  
  useEffect(()=>{
    const sidebarValues=JSON.stringify({
      headerItem:'Home'
    })
    localStorage.setItem('sidebarValues',sidebarValues)
  })

  return (
    <div className='flex pt-10 sm:pt-2 '>
      <Sidebar />
      <Home />
    </div>
  )
}

export default HomePage
