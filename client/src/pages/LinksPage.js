import React, { useEffect } from 'react'
import Links from '../components/More/Links/Links'
import Sidebar from '../components/Sidebar/Sidebar'

const LinksPage = () => {

  useEffect(()=>{
    const sidebarValues=JSON.stringify({
      headerItem:'More',
      subListItem:'Links'
    })
    localStorage.setItem('sidebarValues',sidebarValues)
  },[])

  return (
    <div className='flex pt-10 sm:pt-2'>
      <Sidebar />
      <Links />
    </div>
  )
}

export default LinksPage
