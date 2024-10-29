import { TabPanel, TabPanelProps, Typography } from '@mui/material'
import React from 'react'

type props = TabPanelProps

export const TeamTab: React.FC<props> = ({...props}) => {
  return (
    <TabPanel value={props.value}>
      <Typography>Create new user!!!!</Typography>
    </TabPanel>
  )
}
