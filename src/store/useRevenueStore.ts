import { create } from 'zustand';
import queries from "@api/queries";
import client from '../auth';
import { RevenueReportByTime } from '@types';

interface RevenueState {
  revenueReport: RevenueReportByTime | null;
  loading: boolean;
  fetchRevenueReport: (
    companyId: number,
    date: string,
    time: "day" | "week" | "month" | "year"
  ) => void;
}

const useRevenueStore = create<RevenueState>((set) => ({
  revenueReport: null,
  loading: false,
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
}));

export default useRevenueStore;
