import queries from "@api/queries";
import { useQuery } from "@apollo/client";
import userStore from "@store/userStore";
import { CompanyRevenueByPaymentMethod } from "@types";
import { useEffect, useState } from "react";

const useStats = () => {
  const { userInfos } = userStore();
  const [revenueByPaymentMethodData, setRevenueByPaymentMethodData] =
    useState<CompanyRevenueByPaymentMethod[]>();

  const { data: revenueByPaymentMethod, loading, error } = useQuery(
    queries.company_revenue_by_payment_method,
    {
      variables: {
        companyId: userInfos?.bus_company_id,
      },
    }
  );



  useEffect(() => {
    if (!error && !loading && revenueByPaymentMethod){
        setRevenueByPaymentMethodData(revenueByPaymentMethod.company_revenue_by_payment_method)
    }
  }, [userInfos?.bus_company_id, revenueByPaymentMethod]);

  return { revenueByPaymentMethodData };
};

export default useStats;
