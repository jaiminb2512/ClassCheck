import SelectTheme from '@/app/_components/SelectTheme';
import React from 'react';
import DefaultSelection from './_components/DefaultSelection';

const Settings = () => {
  return (
    <div>
        <SelectTheme />
        <div>
          <DefaultSelection />
        </div>
    </div>


  );
};

export default Settings;
