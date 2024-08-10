'use client'

import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { CiCalendar } from 'react-icons/ci';
import { format } from 'date-fns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

function MonthSelection({ selectedMonth }) {
    const today = new Date();
    const [selectedMonthState, setSelectedMonthState] = useState(today);
    const monthName = format(selectedMonthState, 'MMMM yyyy');

    const handleMonthChange = (newMonth) => {
        const newDate = newMonth.toDate();
        setSelectedMonthState(newDate);
        selectedMonth(newDate);
    };

    return (
        <div>
            <PopupState variant="popover" popupId="demo-popup-popover">
                {(popupState) => (
                    <div>
                        <Button
                            variant="ghost"
                            {...bindTrigger(popupState)}
                            className="flex gap-2 items-center text-slate-500 border-solid border-2 border-slate-200 rounded-lg"
                        >
                            <CiCalendar className='size-5' />
                            {monthName}
                        </Button>

                        <Popover
                            {...bindPopover(popupState)}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'end',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'end',
                            }}
                        >
                            <Typography>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateCalendar
                                        onMonthChange={handleMonthChange}
                                    />
                                </LocalizationProvider>
                            </Typography>
                        </Popover>
                    </div>
                )}
            </PopupState>
        </div>
    );
}

export default MonthSelection;
