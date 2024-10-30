import React, { useState } from 'react';
import { MenuItem, Select, Box, SelectChangeEvent } from '@mui/material';
import TodayIcon from '@mui/icons-material/Today';
import DateRangeIcon from '@mui/icons-material/DateRange';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventIcon from '@mui/icons-material/Event';
import { format } from 'date-fns';

// Define types for the timeframes
type Timeframe = 'today' | 'week' | 'month' | 'year';

const TimeframeSelector: React.FC = () => {
  const [timeframe, setTimeframe] = useState<Timeframe>('today');

  const handleChange = (event: SelectChangeEvent<Timeframe>) => {
    setTimeframe(event.target.value as Timeframe);
  };

  const formattedDate = (type: Timeframe): string => {
    const now = new Date();
    switch (type) {
      case 'today': {
        return `Today, ${format(now, 'dd-MM-yyyy')}`;
      }
      case 'week': {
        const weekStart = format(now, 'dd-MM-yyyy');
        const weekEnd = format(new Date(now.setDate(now.getDate() + 6)), 'dd-MM-yyyy');
        return `Week, ${weekStart} - ${weekEnd}`;
      }
      case 'month': {
        return `Month, ${format(now, 'MMMM yyyy')}`;
      }
      case 'year': {
        return `Year, ${format(now, 'yyyy')}`;
      }
      default: {
        return '';
      }
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 1 }}>
      <Select
        value={timeframe}
        onChange={handleChange}
        displayEmpty
        variant="outlined"
        sx={{
          minWidth: 200,
          fontSize: 12,
          '.MuiSelect-icon': { color: 'primary.main' },
        }}
      >
        <MenuItem value="today">
          <Box display="flex" alignItems="center" gap={1}>
            <TodayIcon color="primary" />
            {formattedDate('today')}
          </Box>
        </MenuItem>
        <MenuItem value="week">
          <Box display="flex" alignItems="center" gap={1}>
            <DateRangeIcon color="primary" />
            {formattedDate('week')}
          </Box>
        </MenuItem>
        <MenuItem value="month">
          <Box display="flex" alignItems="center" gap={1}>
            <CalendarMonthIcon color="primary" />
            {formattedDate('month')}
          </Box>
        </MenuItem>
        <MenuItem value="year">
          <Box display="flex" alignItems="center" gap={1}>
            <EventIcon color="primary" />
            {formattedDate('year')}
          </Box>
        </MenuItem>
      </Select>
    </Box>
  );
};

export default TimeframeSelector;
