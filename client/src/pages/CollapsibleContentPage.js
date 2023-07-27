import React, { useEffect } from 'react'
import CollapsibleContent from '../components/More/CollapsibleContent/CollapsibleContent'
import Sidebar from '../components/Sidebar/Sidebar'

const CollapsibleContentPage = () => {

  useEffect(()=>{
    const sidebarValues=JSON.stringify({
      headerItem:'More',
      subListItem:'Collapsible Content'
    })
    localStorage.setItem('sidebarValues',sidebarValues)
  },[])

  return (
    <div className='flex pt-10 sm:pt-2'>
      <Sidebar />
      <CollapsibleContent />
    </div>
  )
}

export default CollapsibleContentPage
