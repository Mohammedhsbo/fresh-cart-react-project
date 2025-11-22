import React, { useEffect, useState, createContext } from 'react';

export const usercontext = createContext();

export default function UserContextProvider(props) {
  const [userlogin, setUserlogin] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('userToken')) {
      setUserlogin(localStorage.getItem('userToken'));
    } else {
      setUserlogin(null);
    }
  }, []); 

  return (
    <usercontext.Provider value={{ userlogin, setUserlogin }}>
      {props.children}
    </usercontext.Provider>
  );
}
