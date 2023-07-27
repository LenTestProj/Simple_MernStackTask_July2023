import React, { useEffect } from 'react'
import IFrames from '../components/More/IFrames/IFrames'
import Sidebar from '../components/Sidebar/Sidebar'

const IFramesPage = () => {

  useEffect(()=>{
    const sidebarValues=JSON.stringify({
      headerItem:'More',
      subListItem:'IFrames'
    })
    localStorage.setItem('sidebarValues',sidebarValues)
  },[])

  return (
    <div className='flex pt-10 sm:pt-2'>
     <Sidebar />
     <IFrames /> 
    </div>
  )
}

export default IFramesPage
