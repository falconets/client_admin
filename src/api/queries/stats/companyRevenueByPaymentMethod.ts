import { gql } from "@apollo/client";

/**
 * the query returns the company revenue based on 
 * the available payment method
 * @companyId as a number
 * @return paymentMethod, total_revenue, number_of_tickets
 * as type CompanyRevenueByPaymentMethod
 */
const company_revenue_by_payment_method = gql`
  query Company_revenue_by_payment_method($companyId: Int!) {
    company_revenue_by_payment_method(companyId: $companyId) {
      paymentMethod
      total_revenue
      number_of_tickets
    }
  }
`;

export default company_revenue_by_payment_method;
