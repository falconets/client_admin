import queries from "@api/queries"
import { useQuery } from "@apollo/client"
import LabelCard from "@common/LabelCard"
import { Box, Skeleton, Stack } from "@mui/material"
import userStore from "@store/userStore"
import { RevenueReportByTime } from "@types"
import { FC, useEffect, useState } from "react"


type ownprops = {
    time?: "day" | "week" | "month" | "year";
}

const RevenueReport: FC<ownprops> = ({time})=>{
    const { userInfos } = userStore();
    const [revenueReport, setRevenueReport] = useState<RevenueReportByTime>();
    const AVR = revenueReport ? revenueReport?.total_revenue / revenueReport?.total_bookings : 0


    let query 
    switch(time){
        case "day":
            query = queries.company_day_revenue_report;
            break;
        case "week":
            query = queries.company_week_revenue_report;
            break;
        case "month":
            query = queries.company_month_revenue_report;
            break;
        default:
            query = queries.company_day_revenue_report;
    }
  
    const { data, loading, error } = useQuery(
      query,
      {
        variables: {
          companyId: userInfos?.bus_company_id,
          date: "2024-08-09", //new Date('2024-08-09').toISOString().split('T')[0],
        },
      }
    );
  
    useEffect(() => {
      if (!loading && !error && data) {
        switch(time){
            case "day":
                setRevenueReport(data.company_day_revenue_report[0]);
                break;
            case "week":
                setRevenueReport(data.company_total_week_revenue_report);
                break;
            case "month":
                setRevenueReport(data.company_total_monthly_revenue_report);
                break;
            default:
                setRevenueReport(data.company_day_revenue_report[0]);
                break;  // Default to day if no time provided or invalid time provided.
        }
      }
    }, [loading, error, time, data]);

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
                value={`${revenueReport?.total_revenue|| 0} zwk`}
              />
              <LabelCard
                subject="Sales"
                value={`${revenueReport?.total_bookings||0}`}
              />
              <LabelCard
                subject="Average Sales"
                value={`${AVR.toFixed()}`}
              />
            </Stack>
        </Box>
    )
}

export default RevenueReport