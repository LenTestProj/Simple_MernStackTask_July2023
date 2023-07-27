import React, { useCallback, useMemo, useState } from 'react'


const useInput = (email,password='') => {
    const [emailValue,setEmailValue]=useState(email);
    const [passwordValue,setPasswordValue]=useState(password);
    const [isEmailInputTouched, setIsEmailInputTouched] = useState(false);
    const [isPasswordInputTouched, setIsPasswordInputTouched] = useState(false);
  


    const EmailInputBlurHandler = useCallback((event) => {
      if (isEmailInputTouched) {
        return;
      }
      setIsEmailInputTouched(true);
    },[isEmailInputTouched]);
  
    const PasswordInputBlurHandler = useCallback((event) => {
      if (isPasswordInputTouched) {
        return;
      }
      setIsPasswordInputTouched(true);
    },[isPasswordInputTouched]);
  
    const inputArray=useMemo(()=>{
        return [
        {
          name:'email',
          type:'text',
          placeholder:'Email or mobile No',
          value:emailValue,
          onChange:setEmailValue,
          onBlur:EmailInputBlurHandler,
          inputTouched:isEmailInputTouched,
          errorMessage:'Please enter email or mobile no.',
          isValid:emailValue.includes('@') || (!isEmailInputTouched && !emailValue.includes('@'))
        },
        {
          name:'password',
          type:'password',
          placeholder:'Password',
          value:passwordValue,
          onChange:setPasswordValue,
          onBlur:PasswordInputBlurHandler,
          inputTouched:isPasswordInputTouched,
          errorMessage:'Please enter a valid password',
          isValid:passwordValue.length>2 || (!isPasswordInputTouched && !passwordValue.length>2)
        }
      ]},[emailValue,setEmailValue,passwordValue,setPasswordValue,isEmailInputTouched, isPasswordInputTouched, EmailInputBlurHandler,PasswordInputBlurHandler]);
    
    return inputArray;
}

export default useInput
