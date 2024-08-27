// 'use client';

// import React from 'react';
// import Button from '@mui/material/Button';
// import Popover from '@mui/material/Popover';
// import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
// import { CiCalendar } from 'react-icons/ci';
// import { LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
// import { useDataContext } from '../_context/DataContext';
// import dayjs from 'dayjs';

// function MonthSelection() {
//   const { selectedMonth, setSelectedMonth } = useDataContext();
  
//   // Display the selected month in 'MMMM yyyy' format if selectedMonth is not null
//   const monthName = selectedMonth ? dayjs(selectedMonth, 'MM/YYYY').format('MMMM yyyy') : 'Select Month';

//   const handleMonthChange = (newMonth) => {
//     if (newMonth && newMonth.isValid()) {
//       const formattedMonth = newMonth.format('MM/YYYY');
//       console.log('Selected Month:', formattedMonth);
//       setSelectedMonth(formattedMonth); // Save the formatted month (MM/YYYY) in state
//     }
//   };

//   return (
//     <div>
//       <PopupState variant="popover" popupId="demo-popup-popover">
//         {(popupState) => (
//           <div>
//             <Button
//               variant="ghost"
//               {...bindTrigger(popupState)}
//               className="flex gap-2 items-center text-slate-500 border-solid border-2 border-slate-200 rounded-lg"
//             >
//               <CiCalendar className='size-5' />
//               {monthName}
//             </Button>

//             <Popover
//               {...bindPopover(popupState)}
//               anchorOrigin={{
//                 vertical: 'bottom',
//                 horizontal: 'end',
//               }}
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'end',
//               }}
//             >
//               <LocalizationProvider dateAdapter={AdapterDayjs}>
//                 <DateCalendar
//                   view="month"
//                   // Convert the stored MM/YYYY string back to a dayjs object
//                   value={selectedMonth ? dayjs(selectedMonth, 'MM/YYYY') : null}
//                   onChange={handleMonthChange}
//                   views={['year', 'month']}
//                 />
//               </LocalizationProvider>
//             </Popover>
//           </div>
//         )}
//       </PopupState>
//     </div>
//   );
// }

// export default MonthSelection;



'use client';

import React from 'react';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { CiCalendar } from 'react-icons/ci';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useDataContext } from '../_context/DataContext';
import dayjs from 'dayjs'; // Import Day.js if not already imported

function MonthSelection() {
  const { selectedMonth, setSelectedMonth } = useDataContext();
  
  const monthName = selectedMonth 
    ? dayjs(selectedMonth, 'MM/YYYY').format('MMMM YYYY')
    : 'Select Month';

  const handleMonthChange = (newMonth) => {
    if (newMonth && newMonth.isValid()) {
      const formattedMonth = newMonth.format('MM/YYYY');
      // console.log('Selected Month:', formattedMonth);
      setSelectedMonth(formattedMonth); 
    }
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
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                  view="month"
                  value={selectedMonth ? dayjs(selectedMonth, 'MM/YYYY') : null} // Parse selectedMonth as Day.js object
                  onChange={handleMonthChange}
                  views={['year', 'month']}
                />
              </LocalizationProvider>
            </Popover>
          </div>
        )}
      </PopupState>
    </div>
  );
}

export default MonthSelection;
