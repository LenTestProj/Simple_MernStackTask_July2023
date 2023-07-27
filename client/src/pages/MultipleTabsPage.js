import React, { useEffect } from 'react'
import MultipleTabs from '../components/More/MultipleTabs/MultipleTabs'
import Sidebar from '../components/Sidebar/Sidebar'

const MultipleTabsPage = () => {

  useEffect(()=>{
    const sidebarValues=JSON.stringify({
      headerItem:'More',
      subListItem:'Multiple Tabs'
    })
    localStorage.setItem('sidebarValues',sidebarValues)
  },[])

  return (
    <div className='flex pt-10 sm:pt-2'>
      <Sidebar />
      <MultipleTabs />
    </div>
  )
}

export default MultipleTabsPage
