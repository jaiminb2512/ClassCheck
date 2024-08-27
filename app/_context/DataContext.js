"use client"

import React, { createContext, useState, useContext } from 'react';
import dayjs from 'dayjs';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [selectedGrade, setSelectedGrade] = useState('1st');
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

export const useDataContext = () => useContext(DataContext);
