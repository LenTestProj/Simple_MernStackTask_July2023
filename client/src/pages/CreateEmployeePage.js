import React, { useEffect } from 'react'
import CreateEmployee from '../components/Employee/CreateEmployee/CreateEmployee'
import Sidebar from '../components/Sidebar/Sidebar'

const CreateEmployeePage = () => {

  useEffect(()=>{
    const sidebarValues=JSON.stringify({
      headerItem:'Employee',
      subListItem:'Create'
    })
    localStorage.setItem('sidebarValues',sidebarValues)
  },[])

  return (
    <div className='flex pt-10 sm:pt-2'>
      <Sidebar />
      <CreateEmployee/>
    </div>
  )
}

export default CreateEmployeePage
