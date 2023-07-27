import React from 'react'
import classes from './FormPaginationSection.module.css';

const FormPaginationSection = ({currentPage,lastPage,setCurrentPage}) => {
  
const setPages=(value)=>{
  switch(value){
   case 'first':
    setCurrentPage(1);
    break;
   case 'prev':
    setCurrentPage(currentPage-1);
    break;
   case 'next':
    setCurrentPage(currentPage+1);
    break;
   case 'last':
    setCurrentPage(lastPage);
    break;   
   default:
    setCurrentPage(1);
    break; 
  }
}

  return (
    <div className={classes.main}>
      <button className={classes.item+' '+classes.button} 
       disabled={currentPage===1}type='button' onClick={()=> setPages('first')}>
        First
      </button>
      {currentPage!==1 && <button type='button' className={classes.item+' '+classes.button} onClick={()=>setPages('prev')}>
        Previous
      </button>}
      <p className={classes.item+' w-[4rem] '+classes.textElement}>{currentPage}</p>
      <p className={classes.item+' w-[5rem] '+classes.textElement}>of {lastPage} Pages</p>
      {currentPage!==lastPage &&<button type='button' className={classes.item+' '+classes.button} onClick={()=>setPages('next')}>
        Next
      </button>}
      <button type='button' 
      disabled={currentPage===lastPage} className={classes.item+' '+classes.button} onClick={()=>setPages('last')}>
        Last
      </button>
    </div>
  )
}

export default FormPaginationSection
