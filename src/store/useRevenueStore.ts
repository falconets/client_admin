import { create } from 'zustand';
import queries from "@api/queries";
import client from '../auth';
import { RevenueReportByTime } from '@types';
interface FetchTicketSales{
    purchase_hour: string;
    ticket_count: number;
    total_amount: number;
  }

interface RevenueState {
  revenueReport: RevenueReportByTime | null;
  hourlyTicketSales: number[] | null;
  hourlyTotalSales: number[] | null;
  loading: boolean;
  fetchRevenueReport: (
    companyId: number,
    date: string,
    time: "day" | "week" | "month" | "year"
  ) => void;
  fetchHourlyTicketSales: (companyId: number, date: string) => void;
}

const useRevenueStore = create<RevenueState>((set) => ({
  revenueReport: null,
  loading: false,
  hourlyTicketSales: null,
  hourlyTotalSales: null,
  fetchRevenueReport: async (
    companyId: number,
    date: string,
    time: "day" | "week" | "month" | "year"
  ) => {
    set({ loading: true });
    let query;

    switch (time) {
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

    try {
      const { data } = await client.query( {
        query: query,
        variables: { companyId, date },
      });

      let reportData;
      switch (time) {
        case "day":
          reportData = data.company_day_revenue_report[0];
          break;
        case "week":
          reportData = data.company_total_week_revenue_report;
          break;
        case "month":
          reportData = data.company_total_monthly_revenue_report;
          break;
        default:
          reportData = data.company_day_revenue_report[0];
      }

      set({ revenueReport: reportData, loading: false });
    } catch (error) {
      set({ revenueReport: null, loading: false });
      console.error("Failed to fetch revenue report", error);
    }
  },
  fetchHourlyTicketSales: async (companyId: number, date: string) => {
    set({ loading: true });

    try {
      const { data } = await client.query({
        query: queries.company_hourly_ticket_sales,
        variables: { companyId, date },
      });

      const mapResult = mapTicketCountsTo24Hours(data.fetchHourlyTicketSales)
      const mapTotalResult = mapTotalAmountTo24Hours(data.fetchHourlyTicketSales)

      set({ hourlyTicketSales: mapResult , loading: false });
      set({ hourlyTotalSales: mapTotalResult , loading: false });
    } catch (error) {
      console.error("Failed to fetch hourly ticket sales", error);
    }
  },
}));


function mapTicketCountsTo24Hours(data: FetchTicketSales[]) {
    // Initialize an array with 24 zeros to represent each hour of the day
    const hourlyCounts = Array(24).fill(0);
  
    // Loop through the data and populate the hourlyCounts array
    data.forEach(item => {
      // Extract the hour from the purchase_hour string (assumed format: "YYYY-MM-DD HH:mm")
      const hour = parseInt(item.purchase_hour.slice(11, 13), 10); // Get "HH" and convert to integer
      
      // Place the ticket_count in the corresponding index (hour) of the hourlyCounts array
      hourlyCounts[hour] = item.ticket_count;
    });
  
    return hourlyCounts;
  }
function mapTotalAmountTo24Hours(data: FetchTicketSales[]) {
    // Initialize an array with 24 zeros to represent each hour of the day
    const hourlyCounts = Array(24).fill(0);
  
    // Loop through the data and populate the hourlyCounts array
    data.forEach(item => {
      // Extract the hour from the purchase_hour string (assumed format: "YYYY-MM-DD HH:mm")
      const hour = parseInt(item.purchase_hour.slice(11, 13), 10); // Get "HH" and convert to integer
      
      // Place the ticket_count in the corresponding index (hour) of the hourlyCounts array
      hourlyCounts[hour] = item.ticket_count;
    });
  
    return hourlyCounts;
  }

export default useRevenueStore;
