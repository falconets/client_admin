import React, { useState, useEffect, FC } from "react";
import { Box, Typography, Grid, Button } from "@mui/joy";
import useBusSeats from "@hooks/useBusSeats";
import { BusSeats } from "@types";

type ownprops = {
  busId?: string;
  handleAddSeat: ()=> void
  handleSelectedId: (id:string)=> void;
};

const SeatSelector: FC<ownprops> = ({busId, handleAddSeat, handleSelectedId}) => {
  const [seats, setSeats] = useState<BusSeats[]>([]);
  const [layout, setLayout]= useState<boolean>(false)

  const { getBusSeatsByBusId } = useBusSeats();

useEffect(() => {
  const fetchData = async () => {
    if (busId) {
      const busData = await getBusSeatsByBusId(busId);
      setSeats(busData);
    }
  };

  fetchData();
}, [busId]);



  const handleSetLayout =()=>{
    setLayout(!layout)
  }

  const handleOpenAddSeatModal = ()=>{
    handleAddSeat()
    handleSelectedId(busId as string)
  }

  const getSeatLabel = (seatNumber: string) => {
    // Return the seat number directly
    return seatNumber;
  };

  if (seats.length === 0) {
    return (
      <Box sx={{width: '100%', diplay: 'flex', gap: '2%'}}>
      <Button onClick={handleOpenAddSeatModal} sx={{width:'48%'}}>Add layout</Button>
      <Button sx={{width:'48%'}} color="danger">Delete</Button>
    </Box>
    );
  }

  return (
    <Box>
      <style>
        {`
          .seat {
            background-color: grey;
            height: 22px;
            width: 23px;
            margin: 3px;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
          }

          .seat.window {
            border: 2px solid blue;
          }

          .seat.aisle {
            border: 2px solid green;
          }

          .seat.middles {
            border: 2px solid yellow;
          }

          .seat.selected {
            background-color: rgb(21, 139, 207);
          }

          .seat.occupied {
            background-color: #f71414;
          }

          .seat:not(.occupied):hover {
            cursor: pointer;
            transform: scale(1.2);
          }

          .showcase {
            background: rgba(0, 0, 0, 0.1);
            padding: 5px 10px;
            border-radius: 5px;
            color: #777;
            list-style-type: none;
            display: flex;
            gap: 10px;
            margin-bottom: 15px;
          }

          .showcase .subject {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 0 10px;
          }

          .row {
            display: flex;
          }

          .gap {
            width: 30px; /* Width of the gap between seats */
          }
        `}
      </style>

      <Box sx={{width: '100%', diplay: 'flex', gap: '2%'}}>
        <Button onClick={handleSetLayout} sx={{width:'48%'}}>Edit</Button>
        <Button sx={{width:'48%'}} color="danger">Delete</Button>
      </Box>

      <Box className="showcase">
        <Box className="subject">
          <Button
            className="seat window"
            variant="solid"
            color="neutral"
            size="sm"
          />
          <Typography>Window</Typography>
        </Box>
      
        <Box className="subject">
          <Button
            className="seat selected"
            variant="solid"
            color="primary"
            size="sm"
          />
          <Typography>Selected</Typography>
        </Box>
        <Box className="subject">
          <Button
            className="seat occupied"
            variant="solid"
            color="neutral"
            size="sm"
            disabled
          />
          <Typography>Occupied</Typography>
        </Box>
      </Box>

      <Grid
        container
        spacing={2}
        direction={"column"}
        sx={{ justifyContent: "center", alignItems: "center" }}
        className="container"
      >
        {seats
          .reduce((acc: { row: number; cols: BusSeats[] }[], seat) => {
            const existingRow = acc.find((rowObj) => rowObj.row === seat.row);
            if (existingRow) {
              existingRow.cols.push(seat);
            } else {
              acc.push({ row: seat.row, cols: [seat] });
            }
            return acc;
          }, [])
          .map((rowData, index) => (
            <Box
              sx={{ display: "flex", flexDirection: "row" }}
              key={`row-${rowData.row}` + index}
            >
              {/* Sort seats by column to ensure correct order */}
              {rowData.cols
                .sort((a, b) => a.col - b.col)
                .map((seat, index) => {
                  const shouldShift = index == seat.aisleColumn;

                  return (
                    <Box key={seat?.seat_id}>
                      {/* Insert gap for aisle */}
                      {seat.col === seat.aisleColumn && (
                        <Box
                          key={seat.seatNumber}
                          className="gap"
                          sx={{ width: "40px" }}
                        />
                      )}
                      <Box
                        key={`col-${seat?.seat_id}` + index}
                        sx={{
                          marginLeft: shouldShift ? "40px" : 0,
                        }}
                      >
                        <Button
                          className={`seat ${seat.seatType} ${
                            seat.is_available ? "available" : "occupied"
                          }`}
                          variant="solid"
                          color={seat.is_available ? "neutral" : "primary"}
                          size="sm"
                          disabled={!seat.is_available}
                        />
                      </Box>
                    </Box>
                  );
                })}
            </Box>
          ))}
      </Grid>
    </Box>
  );
};

export default SeatSelector;
