import { gql } from "@apollo/client";

const company_day_revenue_report = gql`
  query Company_day_revenue_report($companyId: Int!, $date: String!) {
    company_day_revenue_report(companyId: $companyId, date: $date) {
      booking_date
      total_revenue
      total_bookings
    }
  }
`;

const company_week_revenue_report = gql`
  query Company_total_week_revenue_report($companyId: Int!, $date: String!) {
  company_total_week_revenue_report(companyId: $companyId, date: $date) {
    booking_date
    total_revenue
    total_bookings
  }
}
`;

const company_month_revenue_report = gql`
  query Company_month_revenue_report($companyId: Int!, $date: String!) {
    company_month_revenue_report(companyId: $companyId, date: $date) {
      booking_date
      total_revenue
      total_bookings
    }
  }
`;

export default {
  company_day_revenue_report,
  company_week_revenue_report,
  company_month_revenue_report,
};
