import { FC, useState } from 'react';
import Box from '@mui/joy/Box';
import CustomButton from '../CustomButton';

interface tab {
    label: string
}

type ownprops = {
    tabs: tab[],
    defaultActive: string,
    onTabChange: (label: string) => void,
}

const CustomTabs: FC<ownprops> = ({ tabs, defaultActive, onTabChange }) => {
  const [activeTab, setActiveTab] = useState(defaultActive);

  const handleTabClick = (label:string) => {
    setActiveTab(label);
    if (onTabChange) {
      onTabChange(label);
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      {tabs.map((tab) => (
        <CustomButton
          key={tab.label}
          label={tab.label}
          onClick={() => handleTabClick(tab.label)}
          sx={{
            backgroundColor: activeTab === tab.label ? 'primary.main' : 'grey',
            color: activeTab === tab.label ? '#fff' : '#000',
            height: '40px',
            width: '150px',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: activeTab === tab.label ? 'primary.dark' : 'grey.400',
            },
          }}
          labelSx={{
            fontWeight: activeTab === tab.label ? 'bold' : 'normal',
          }}
        />
      ))}
    </Box>
  );
};


export default CustomTabs;
