import React, { useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import CustomTabs from '@common/CustomTabs/CustomTabs';
import DesktopTable from '../components/DesktopTable';
import RevenueReport from '../components/RevenueReport';
import PaymentMethodInfo from '../components/PaymentMethodInfo';

const OverView: React.FC = () => {
  const [time, setTime] = useState<'day' | 'week' | 'month' | 'year'>('day');

  const handleTabChange = (activeTab: string) => {
    switch (activeTab) {
      case 'today':
        setTime('day');
        break;
      case 'this week':
        setTime('week');
        break;
      case 'this month':
        setTime('month');
        break;
      case 'this year':
        setTime('year');
        break;
      default:
        setTime('day');
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Overview
      </Typography>
      <CustomTabs
        tabs={[
          { label: 'today' },
          { label: 'this week' },
          { label: 'this month' },
          { label: 'this year' },
        ]}
        defaultActive="today"
        onTabChange={handleTabChange}
      />
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <RevenueReport time={time} />
        </Grid>
        <Grid item xs={12}>
          <DesktopTable />
        </Grid>
        <Grid item xs={12}>
          <PaymentMethodInfo time={time} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default OverView;
