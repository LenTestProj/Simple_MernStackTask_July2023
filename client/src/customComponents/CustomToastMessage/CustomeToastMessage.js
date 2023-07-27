import React from 'react'
import {toast} from 'react-toastify';
import classes from './CustomToastMessage.module.css';

const CustomeToastMessage = (message,type) => {
    if(type==='error')
    {
        toast.error(message,{
            pauseOnHover: true,
            position: toast.POSITION.TOP_RIGHT,
            className:classes.toast+' '+classes.error
          })
    }
    else{
        toast.success(message,{
            pauseOnHover: true,
            position: toast.POSITION.TOP_RIGHT,
            className:classes.toast+' '+classes.success
          })
    }
    
}

export default CustomeToastMessage
