import mutations from "@api/mutations";
import queries from "@api/queries";
import { useMutation, useQuery } from "@apollo/client";
import usePositionedSnackbar from "@hooks/snackbar";
import userStore from "@store/userStore";
import { BusRoutesProps } from "@types";
import { useEffect, useState } from "react";


const useBusRoutes = () => {
  const { userInfos } = userStore();
  const { showSnackbar } = usePositionedSnackbar();
  const [listOfBusRoutes, setListOfBusRoutes] = useState<BusRoutesProps[]>();

  const {
    data,
    error,
    loading: queryLoading,
    refetch,
  } = useQuery(queries.getBusRoutesByCompanyId, {
    variables: {companyId: userInfos?.bus_company_id as number}
  });
  const [addBusRoutes, { loading: mLoading }] = useMutation(
    mutations.addBusRoute
  );
  const [toggleBusRoute] = useMutation(mutations.toggleBusRouteActive);
  const [deleteRoute] = useMutation(mutations.deleteBusRoute);

  useEffect(() => {
    if (!error && !queryLoading && data) {
    setListOfBusRoutes(data.getBusRoutesByCompanyId);
    }
  }, [error, queryLoading, data]);


  const addBusRoute = async (
    formElements: BusRoutesProps,
    handleClose: () => void
  ) => {
    try {
      await addBusRoutes({
        variables: {
          companyId: userInfos?.bus_company_id,
          routeName: formElements.routeName,
          distanceInKm: formElements.distanceInKm,
          durationInHours: formElements.durationInHours,
          startLocation: formElements.startLocation,
          endLocation: formElements.endLocation,
          active: false,
          price: formElements.price,
        },
      });

      handleClose();
      showSnackbar({
        title: "Notification",
        message: "The bus route has been successfully added!",
        type: "success",
      });

      refetch();
    } catch (error) {
      console.log(error);
      handleClose();
      showSnackbar({
        title: "Form Submission",
        message: "Failed to submit your form!",
        type: "danger",
      });
    }
  };

  const toggleBusRouteActive = async (toggleId: string, active: boolean) => {
    try {
      await toggleBusRoute({
        variables: {
          toggleBusRoutesActiveId: toggleId,
          active: active,
        },
      });

      setListOfBusRoutes((list) =>
        list?.map((item) => {
          if (item.id === toggleId) {
            return { ...item, active: active };
          } else {
            return item;
          }
        })
      );
    } catch (error) {
      console.log(error);
      showSnackbar({
        title: "Failed, try again!",
        message: "Opp! something went wrong!",
        type: "danger",
      });
    }
  };

  const deleteBusRoute = async (id: string) => {
    try {
      await deleteRoute({
        variables: {
          deleteBusRoutesId: id,
        },
      });

      showSnackbar({
        title: "Delete Action",
        message: "Route successfully deleted!",
        type: "success",
      });

      refetch();
    } catch (error) {
      console.log(error);
      showSnackbar({
        title: "Delete Action",
        message: "Failed to delete the root!",
        type: "danger",
      });
    }
  };

  return {
    addBusRoute,
    toggleBusRouteActive,
    deleteBusRoute,
    mLoading,
    listOfBusRoutes,
  };
};

export default useBusRoutes;
