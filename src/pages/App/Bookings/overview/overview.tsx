import CustomTabs from "@common/CustomTabs/CustomTabs";
import { Box, Grid, Typography } from "@mui/joy";
import userStore from "@store/userStore";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, useState } from "react";
import DesktopTable from "../components/DesktopTable";
import RevenueReport from "../components/RevenueReport";
import PaymentMethodInfo from "../components/PaymentMethodInfo";

const overView = () => {
  //const [value, setValue] = useState<Dayjs | null>(dayjs());
  const [time, setTime] = useState<'day'|'week'|'month'|'year'>('day')

  const handleTabChange = (activeTab: string) => {
    if(activeTab === 'today') setTime('day')
    else if(activeTab === 'this week') setTime('week')
    else if(activeTab === 'this month') setTime('month')
    else if(activeTab === 'this year') setTime('year')
  
  };


  return (
    <Box sx={{}}>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <Typography>Overview</Typography>
        </Grid>
        <Grid>
          <Box>
            <CustomTabs
              tabs={[
                { label: "today" },
                //{ label: "y" },
                { label: "this week" },
                { label: "this month" },
                { label: "this year" },
              ]}
              defaultActive="today" // optional: set a default active tab
              onTabChange={handleTabChange} // optional: returns the active tab
            />
          </Box>
          {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateTimePicker", "DateTimePicker"]}>
                <DateTimePicker
                  label="Controlled picker"
                  value={value}
                  onChange={(newValue) => setValue(newValue)}
                />
                <DateTimePicker
                  label="Controlled picker"
                  value={value}
                  onChange={(newValue) => setValue(newValue)}
                />
              </DemoContainer>
            </LocalizationProvider> */}
        </Grid>

        <Grid>
          <RevenueReport time={time} />
        </Grid>

        <Grid>
          <DesktopTable />
        </Grid>

        <Grid>
          <PaymentMethodInfo time={time} />
        </Grid>
        {/* Add your overview components here */}
      </Grid>
    </Box>
  );
};

export default overView;
