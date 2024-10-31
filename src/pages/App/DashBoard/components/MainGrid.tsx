import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Copyright from "../internals/components/Copyright";
import ChartUserByCountry from "./ChartUserByCountry";
import CustomizedTreeView from "./CustomizedTreeView";
import CustomizedDataGrid from "./CustomizedDataGrid";
import HighlightedCard from "./HighlightedCard";
import PageViewsBarChart from "./PageViewsBarChart";
import SessionsChart from "./SessionsChart";
import StatCard, { StatCardProps } from "./StatCard";
import useRevenueStore from "@store/useRevenueStore";
import { useEffect } from "react";
import userStore from "@store/userStore";
import { LinearProgress, Skeleton } from "@mui/material";

export default function MainGrid() {
  const { userInfos } = userStore();
  const {
    revenueReport,
    hourlyTicketSales,
    hourlyTotalSales,
    loading,
    fetchRevenueReport,
    fetchHourlyTicketSales,
  } = useRevenueStore();
  const date = "2024-08-09";
  const store: StatCardProps[] = [];

  useEffect(() => {
    if (userInfos?.bus_company_id) {
      console.log(userInfos.bus_company_id);
      fetchRevenueReport(userInfos.bus_company_id, date, "day");
      fetchHourlyTicketSales(userInfos.bus_company_id, "2024-08-10");
    }
  }, [userInfos, fetchRevenueReport]);

  const AVR = revenueReport
    ? revenueReport?.total_revenue / revenueReport?.total_bookings
    : 0;

  if (!loading && revenueReport && hourlyTicketSales && hourlyTotalSales) {
    store.push({
      title: "Total Revenue",
      value: `${revenueReport.total_revenue} zmk`,
      interval: "day",
      trend: "neutral",
      data: hourlyTotalSales as number[],
    });
    store.push({
      title: "Total Sales",
      value: `${revenueReport.total_bookings} `,
      interval: "day",
      trend: "up",
      data: hourlyTicketSales as number[],
    });
    store.push({
      title: "Total Average",
      value: `${AVR.toFixed(2)} zmk`,
      interval: "day",
      trend: "up",
      data: [20],
    });
  }

  if (!revenueReport && !hourlyTicketSales && !hourlyTotalSales && loading) {
    return (
      <Box
        sx={{
          width: { xs: "95%", md: "70&" },
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <LinearProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      {/* cards */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Overview
      </Typography>

      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        {loading && (
          <Box>
            <Stack direction="row" spacing={2}>
              <Skeleton variant="rectangular" width={210} height={100} />
              <Skeleton variant="rectangular" width={210} height={100} />
              <Skeleton variant="rectangular" width={210} height={100} />
            </Stack>
          </Box>
        )}
        {store.map((card, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard {...card} />
          </Grid>
        ))}
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <HighlightedCard />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <SessionsChart />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <PageViewsBarChart />
        </Grid>
      </Grid>

      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Details
      </Typography>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, lg: 9 }}>
          <CustomizedDataGrid />
        </Grid>
        <Grid size={{ xs: 12, lg: 3 }}>
          <Stack gap={2} direction={{ xs: "column", sm: "row", lg: "column" }}>
            <CustomizedTreeView />
            <ChartUserByCountry />
          </Stack>
        </Grid>
      </Grid>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}
