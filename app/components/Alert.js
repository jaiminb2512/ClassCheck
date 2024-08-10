'use client';

import React from 'react';
import { useAlert } from '../context/AlertContext';
import { Alert as MuiAlert } from '@mui/material';

const AlertComponent = () => {
  const { alert, isVisible } = useAlert();

  if (!isVisible) return null;

  return (
    <MuiAlert 
      severity={alert.severity}
      className="fixed h-[3rem] w-[20rem] bottom-2 mr-2 z-999">
      {alert.message}
    </MuiAlert>
  );
};

export default AlertComponent;
