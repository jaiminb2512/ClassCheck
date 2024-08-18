'use client';

import React from 'react';
import { useAlert } from '../_context/AlertContext';
import { Alert as MuiAlert } from '@mui/material';

const AlertComponent = () => {
  const { alert, isVisible } = useAlert();

  if (!isVisible) return null;

  return (
    <MuiAlert 
      severity={alert.severity}
      className="fixed h-[3rem] w-[fit-content]  text-center z-999">
      {alert.message}
    </MuiAlert>
  );
};

export default AlertComponent;
