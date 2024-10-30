import LabelCard from "@common/LabelCard";
import { Box, Skeleton, Stack } from "@mui/material";
import useRevenueStore from "@store/useRevenueStore";
import userStore from "@store/userStore";
import { FC, useEffect } from "react";

type ownprops = {
  time?: "day" | "week" | "month" | "year";
};

const RevenueReport: FC<ownprops> = ({ time }) => {
  const { userInfos } = userStore();
  const { revenueReport, loading, fetchRevenueReport } = useRevenueStore();
  const date = "2024-08-09";

  useEffect(() => {
    if (userInfos?.bus_company_id && time != undefined) {
      fetchRevenueReport(userInfos.bus_company_id, date, time);
    }
  }, [userInfos, time]);

  const AVR = revenueReport
    ? revenueReport?.total_revenue / revenueReport?.total_bookings
    : 0;

  if (loading) {
    return (
      <Box>
        <Stack direction="row" spacing={2}>
          <Skeleton variant="rectangular" width={210} height={60} />
          <Skeleton variant="rectangular" width={210} height={60} />
          <Skeleton variant="rectangular" width={210} height={60} />
        </Stack>
      </Box>
    );
  }

  return (
    <Box>
      <Stack direction="row" spacing={2}>
        <LabelCard
          subject="Total Sale"
          value={`${revenueReport?.total_revenue || 0} zwk`}
        />
        <LabelCard
          subject="Sales"
          value={`${revenueReport?.total_bookings || 0}`}
        />
        <LabelCard subject="Average Sales" value={`${AVR.toFixed()}`} />
      </Stack>
    </Box>
  );
};

export default RevenueReport;
