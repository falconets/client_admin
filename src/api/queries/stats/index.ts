import bus_accopancy_report from "./busOccupancyReport";
import company_revenue_report from "./companyRevenueReport";
import companyPaymentMethods from "./companyPaymentMethods";
import company_revenue_by_payment_method from "./companyRevenueByPaymentMethod";
import seat_allocation_stats from "./seatAllocationStats";

export default {
    company_revenue_by_payment_method,
    seat_allocation_stats,
    ...company_revenue_report,
    bus_accopancy_report,
    ...companyPaymentMethods,
}