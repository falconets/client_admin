import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState, useCallback } from "react";
import queries from "@api/queries";
import { BusSeats } from "@types";
import mutations from "@api/mutations";
import usePositionedSnackbar from "@hooks/snackbar";

const useBusSeats = () => {
    const [seats, setBusSeats] = useState<{ [busId: string]: BusSeats[] }>({});
    const { showSnackbar } = usePositionedSnackbar();
    
    const { data, error, loading, refetch } = useQuery(queries.getSeatsByBusId);
    
    const [addBusSeat] = useMutation(mutations.addBusSeat);
    
    useEffect(() => {
      if (data && !error && !loading) {
        const busId = data.getSeatsByBusId.busId; // Assuming data includes busId
        setBusSeats((prev) => ({
          ...prev,
          [busId]: data.getSeatsByBusId,
        }));
      }
    }, [data, error, loading]);
    
    const getBusSeatsByBusId = useCallback(
      async (busId: string):Promise<BusSeats[]> => {
        const result = await refetch({ busId });
        
        if (result?.data) {
          const fetchedSeats = result.data.getSeatsByBusId;
          setBusSeats((prev) => ({
            ...prev,
            [busId]: fetchedSeats,
          }));
          return fetchedSeats;
        } else {
          return seats[busId] || []; // Return previously fetched seats if available
        }
      },
      [refetch, seats]
    );
    

  const addSeat = async (seat: BusSeats) => {
    try {
      await addBusSeat({
        variables: {
          busId: seat.busId as number,
          seatNumber: seat.seatNumber,
          seatType: seat.seatType,
          isAvailable: seat.is_available,
          row: seat.row,
          col: seat.col,
          aisleColumn: seat.aisleColumn,
        },
      });
      refetch()
      showSnackbar({
        title:"Seat layout added",
        message: "Bus seat added successfully",
        type: "success",
    });
    } catch (error) {
      console.error("Error adding seat: ", error);
    }
  }

  return { seats, getBusSeatsByBusId, addSeat };
};

export default useBusSeats;


