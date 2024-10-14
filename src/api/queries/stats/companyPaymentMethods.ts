import { gql } from "@apollo/client";

const companyPaymentMethodByDay = gql`
  query Company_revenue_payment_method_by_day(
    $companyId: Int!
    $date: String!
  ) {
    company_revenue_payment_method_by_day(companyId: $companyId, date: $date) {
      paymentMethod
      total_revenue
      number_of_tickets
    }
  }
`;

const companyPaymentMethodByWeek = gql`
  query Company_revenue_payment_method_by_week(
    $companyId: Int!
    $date: String!
  ) {
    company_revenue_payment_method_by_week(companyId: $companyId, date: $date) {
      paymentMethod
      total_revenue
      number_of_tickets
    }
  }
`;

const companyPaymentMethodByMonth = gql`
  query Company_revenue_payment_method_by_month(
    $companyId: Int!
    $date: String!
  ) {
    company_revenue_payment_method_by_month(companyId: $companyId, date: $date) {
      paymentMethod
      total_revenue
      number_of_tickets
    }
  }
`;

const companyPaymentMethodByYear = gql`
  query Company_revenue_payment_method_by_year(
    $companyId: Int!
    $date: String!
  ) {
    company_revenue_payment_method_by_year(companyId: $companyId, date: $date) {
      paymentMethod
      total_revenue
      number_of_tickets
    }
  }
`;

export default {
  companyPaymentMethodByDay,
  companyPaymentMethodByWeek,
  companyPaymentMethodByMonth,
  companyPaymentMethodByYear,
};
