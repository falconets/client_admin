import queries from "@api/queries";
import { useQuery } from "@apollo/client";
import { Box, Card, Typography } from "@mui/joy";
import { CardContent } from "@mui/material";
import userStore from "@store/userStore";
import { CompanyRevenueByPaymentMethod } from "@types";
import { FC, useEffect, useState } from "react";

type ownprops = {
  time: "day" | "week" | "month" | "year";
};

const PaymentMethodInfo: FC<ownprops> = ({ time }) => {
  const { userInfos } = userStore();
  const [report, setReport] = useState<CompanyRevenueByPaymentMethod>();

  // Define the query to use based on the time prop
  let query;
  switch (time) {
    case "day":
      query = queries.companyPaymentMethodByDay;
      break;
    case "week":
      query = queries.companyPaymentMethodByWeek;
      break;
    case "month":
      query = queries.companyPaymentMethodByMonth;
      break;
    case "year":
      query = queries.companyPaymentMethodByYear;
      break;
    default:
      query = queries.companyPaymentMethodByDay;
  }

  // Fetch the data with the selected query
  const { data, loading, error } = useQuery(query, {
    variables: {
      companyId: userInfos?.bus_company_id,
      date: "2024-10-01", // Example date, you can pass this as a prop as well
    },
  });

  useEffect(() => {
    if (!loading && !error && data) {
      let res;
      switch (time) {
        case "day":
          res = data.company_revenue_payment_method_by_day;
          break;
        case "week":
          res = data.company_revenue_payment_method_by_week;
          break;
        case "month":
          res = data.company_revenue_payment_method_by_month;
          break;
        case "month":
          res = data.company_revenue_payment_method_by_year;
          break;
        default:
          res = data.companyPaymentMethodByDay;
      }
      setReport(res);
    }
  }, [loading, error, time]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Card>
      <CardContent>
        <Typography>Number of transaction</Typography>
        {report && (
          <Box>
            <Typography>{report.paymentMethod}</Typography>
            <Typography>
              {report.number_of_tickets}({report.total_revenue})
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentMethodInfo;
