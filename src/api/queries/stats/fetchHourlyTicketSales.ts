import { gql } from "@apollo/client";

const company_hourly_ticket_sales= gql`
    query FetchHourlyTicketSales($companyId: Int!, $date: String!) {
  fetchHourlyTicketSales(companyId: $companyId, date: $date) {
    purchase_hour
    ticket_count
    total_amount
  }
}
`

export default company_hourly_ticket_sales;