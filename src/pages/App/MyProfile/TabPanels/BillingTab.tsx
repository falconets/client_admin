import { TabPanel, TabPanelProps, Typography } from '@mui/joy'
import React from 'react'

type props = TabPanelProps

export const BillingTab: React.FC<props> = ({...props}) => {
  return (
    <TabPanel value={props.value}>
      <Typography>My info!!!!</Typography>
    </TabPanel>
  )
}

