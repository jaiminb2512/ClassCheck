import GradeSelect from '@/app/_components/GradeSelect'
import MonthSelection from '@/app/_components/MonthSelection'
import React from 'react'

const DefaultSelection = () => {
  return (
    <div>
      <div className='m-4 p-4 flex items-center w-[fit-content] bg-gray-100 rounded-lg shadow-md'>
        <h2 className="flex-shrink-0 text-sm font-medium text-gray-700 mr-4">Select Month:</h2>
        <MonthSelection />
      </div>

      <div className='m-4 p-4 flex items-center w-[fit-content] bg-gray-100 rounded-lg shadow-md'>
        <h2 className="flex-shrink-0 text-sm font-medium text-gray-700 mr-4">Select Grade:</h2>
        <GradeSelect />
      </div>
    </div>
  )
}

export default DefaultSelection
