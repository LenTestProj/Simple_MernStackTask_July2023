import React, { useEffect } from 'react'
import Autocomplete from '../components/More/Autocomplete/Autocomplete'
import Sidebar from '../components/Sidebar/Sidebar'

const AutocompletePage = () => {
  
  useEffect(()=>{
    const sidebarValues=JSON.stringify({
      headerItem:'More',
      subListItem:'Autocomplete'
    })
    localStorage.setItem('sidebarValues',sidebarValues)
  },[])

  return (
    <div className='flex pt-10 sm:pt-2'>
      <Sidebar />
      <Autocomplete />
    </div>
  )
}

export default AutocompletePage
