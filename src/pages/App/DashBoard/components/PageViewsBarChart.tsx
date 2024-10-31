import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { BarChart } from "@mui/x-charts/BarChart";
import { useTheme } from "@mui/material/styles";

/**
 * To populate this data, you can use the following SQL query
 * to get monthly bookings for each route over the last six months
 * @returns 
 */
// SELECT 
//     "routeId",
//     TO_CHAR("createdAt", 'Mon') AS booking_month,
//     COUNT("ticketId") AS monthly_bookings
// FROM 
//     tickets
// WHERE 
//     "createdAt" >= NOW() - INTERVAL '6 months' AND
// 	"companyId"=2
// GROUP BY 
//     "routeId", booking_month
// ORDER BY 
//     "routeId", booking_month;

export default function PageViewsBarChart() {
  const theme = useTheme();
  const colorPalette = [
    theme.palette.primary.dark,
    theme.palette.primary.main,
    theme.palette.primary.light,
  ];
  return (
    <Card variant="outlined" sx={{ width: "100%" }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Route Bookings Overview
        </Typography>
        <Stack sx={{ justifyContent: "space-between" }}>
          <Stack
            direction="row"
            sx={{
              alignContent: { xs: "center", sm: "flex-start" },
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography variant="h4" component="p">
              1.3M
            </Typography>
            <Chip size="small" color="error" label="-8%" />
          </Stack>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Total bookings for all routes in the last 6 months
          </Typography>
        </Stack>
        {/*eslint-disable*/}
        <BarChart
          borderRadius={8}
          colors={colorPalette}
          xAxis={
            [
              {
                scaleType: "band",
                categoryGapRatio: 0.5,
                data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
              },
            ] as any
          }
          series={[
            {
              id: "route 1",
              label: "route 1",
              data: [2234, 3872, 2998, 4125, 3357, 2789, 2998],
              stack: "A",
            },
            {
              id: "route 2",
              label: "route 2",
              data: [3098, 4215, 2384, 2101, 4752, 3593, 2384],
              stack: "A",
            },
            {
              id: "route 3",
              label: "route 3",
              data: [4051, 2275, 3129, 4693, 3904, 2038, 2275],
              stack: "A",
            },
          ]}
          height={250}
          margin={{ left: 50, right: 0, top: 20, bottom: 20 }}
          grid={{ horizontal: true }}
          slotProps={{
            legend: {
              hidden: true,
            },
          }}
        />
        {/*eslint-disable*/}
      </CardContent>
    </Card>
  );
}
