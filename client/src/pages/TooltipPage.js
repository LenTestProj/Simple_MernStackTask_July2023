import React, { useEffect } from 'react'
import Tooltip from '../components/More/Tooltip/Tooltip'
import Sidebar from '../components/Sidebar/Sidebar'

const TooltipPage = () => {
  
  useEffect(()=>{
    const sidebarValues=JSON.stringify({
      headerItem:'More',
      subListItem:'Tooltips'
    })
    localStorage.setItem('sidebarValues',sidebarValues)
  },[])

  return (
    <div className='flex pt-10 sm:pt-2'>
      <Sidebar />
      <Tooltip />
    </div>
  )
}

export default TooltipPage
