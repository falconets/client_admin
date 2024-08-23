import queries from "@api/queries";
import { useMutation, useQuery } from "@apollo/client";
import usePositionedSnackbar from "@hooks/snackbar";
import userStore from "@store/userStore";
import { BusesProps } from "@types";
import { useEffect, useState } from "react";

interface AddBusProps extends BusesProps {
  plate_number: string;
  bus_model: string;
  seat_capacity: number;
}

const useBuses = () => {
  const { userInfos } = userStore();
  const { showSnackbar } = usePositionedSnackbar();
  const [buses, setBuses] = useState<BusesProps[] | null>(null);

  const {
    data,
    loading: bLoading,
    error,
  } = useQuery(queries.busesByCompanyId, {
    variables: { busCompany: userInfos?.bus_company_id },
  });
  const [addBus] = useMutation(queries.addBus);

  useEffect(() => {
    if (!error && !bLoading && data) {
      setBuses(data.busesByCompany);
    }
  }, [bLoading, error, data]);

  /**
   * The function to add a new bus to the company
   * @param inputs of type AddBusProps
   * @param onClose a function to close the module
   */
  const handleAddBus = async (inputs: AddBusProps, onClose?: () => void) => {
    try {
      await addBus({
        variables: {
          busCompany: userInfos?.bus_company_id,
          busModel: inputs.bus_model,
          plateNumber: inputs.plate_number,
          seatCapacity: inputs.seat_capacity,
        },
      }).then((result) => {
        if (buses) setBuses([...buses, result.data.createBus]);
        else setBuses([result.data.createBus]);
        showSnackbar({
          title: "Success!",
          message: "Bus has been added successfully!",
          type: "success",
        });
        onClose && onClose();
      });
    } catch (error) {
      showSnackbar({
        title: "Failed, try again!",
        message: "Opp! something went wrong!",
        type: "danger",
      });
      onClose && onClose();
    }
  };

  return {
    buses,
    bLoading,
    handleAddBus,
  };
};

export default useBuses;
