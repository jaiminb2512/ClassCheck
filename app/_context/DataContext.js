"use client"

import React, { createContext, useState, useContext } from 'react';
import dayjs from 'dayjs';

// Create the context
const DataContext = createContext();

// Create a provider component
export const DataProvider = ({ children }) => {
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(dayjs());

  const value = {
    selectedGrade,
    setSelectedGrade,
    selectedMonth,
    setSelectedMonth,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

// Custom hook to use the DataContext
export const useDataContext = () => useContext(DataContext);
