import React, { useEffect } from 'react';
import SearchEmployee from '../components/Employee/SearchEmployee/SearchEmployee';
import Sidebar from '../components/Sidebar/Sidebar';

const SearchEmployeePage = () => {

  useEffect(()=>{
    const sidebarValues=JSON.stringify({
      headerItem:'Employee',
      subListItem:'Search'
    })
    localStorage.setItem('sidebarValues',sidebarValues)
  },[])

  return (
    <div className='flex pt-10 sm:pt-2'>
      <Sidebar />
      <SearchEmployee />
    </div>
  )
}

export default SearchEmployeePage
