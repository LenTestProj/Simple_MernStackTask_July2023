import React, { useEffect } from 'react'
import Slider from '../components/More/Slider/Slider'
import Sidebar from '../components/Sidebar/Sidebar'

const SliderPage = () => {

  useEffect(()=>{
    const sidebarValues=JSON.stringify({
      headerItem:'More',
      subListItem:'Slider'
    })
    localStorage.setItem('sidebarValues',sidebarValues)
  },[])

  return (
    <div className='flex pt-10 sm:pt-2'>
      <Sidebar />
      <Slider />
    </div>
  )
}

export default SliderPage
