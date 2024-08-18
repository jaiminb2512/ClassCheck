'use client';

import React, { createContext, useContext, useState } from 'react';

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({ message: '', severity: '' });
  const [isVisible, setIsVisible] = useState(false);

  const showAlert = (message, severity) => {
    setAlert({ message, severity });
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 3000); 
  };

  return (
    <AlertContext.Provider value={{ alert, isVisible, showAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
