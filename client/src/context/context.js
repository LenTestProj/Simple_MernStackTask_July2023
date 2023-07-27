import React, { createContext, useCallback, useEffect, useState } from "react";

const initialState = {
  user: localStorage.getItem("user") || null,
  showMobileSidebar: false,
};

export const Context = createContext(initialState);
let timer;

export const ContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(initialState.user);
  const [showMobileSidebar, setShowMobileSidebar] = useState(
    initialState.showMobileSidebar
  );

  const autoLogout=useCallback((duration)=>{
    if(timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(()=>{
      logout();
      clearTimeout(timer);
    },duration);
  },[]);

  useEffect(()=>{
   if(!currentUser) return;
   const storedExpiryDate=localStorage.getItem('expiryDate');
   const expiryDate=new Date(storedExpiryDate);
   const now=new Date();
   const remainingDuration=expiryDate.getTime()-now.getTime();
   autoLogout(remainingDuration);
  },[autoLogout,currentUser])

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("expiryDate");
    setCurrentUser(null);
  };

  

  return (
    <Context.Provider
      value={{
        user: currentUser,
        showMobileSidebar,
        setCurrentUser,
        setShowMobileSidebar,
        logout,autoLogout
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
