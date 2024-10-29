import React, { useState, useEffect, useCallback, FC } from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import { Seat, SeatType } from "@types";
import * as S from "./styled"

type OwnProps = {
  addSeat: (arg: Seat[]) => void;
};

const AddSeatComponent: FC<OwnProps> = ({ addSeat }) => {
  const [seats, setSeats] = useState<Seat[]>([]);
  const [rows, setRows] = useState<number>(0);
  const [columns, setColumns] = useState<number>(0);
  const [aisleColumn, setAisleColumn] = useState<number>(0);
  const showLabels = false;

  const createSeat = useCallback(
    (row: number, col: number, aisleColumn: number, seatLabelIndex: number): Seat => {
      let seatType: SeatType = "middle";
      if (col === 0 || col === columns - 1) seatType = "window";
      const seatNumber = getSeatLabel(row, seatLabelIndex); 
  
      return {
        row,
        col,
        aisleColumn: aisleColumn,
        status: "available",
        type: seatType,
        seatNumber,
      };
    },
    [columns]
  );
  

  useEffect(() => {
    if (rows > 0 && columns > 0) {
      const initialSeats = [];
      let seatLabelIndex = 0; // New counter for seat labels
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
          if (col === aisleColumn) continue; // Skip aisle column
          initialSeats.push(createSeat(row, col, aisleColumn, seatLabelIndex));
          seatLabelIndex++; // Increment only for actual seats
        }
      }
      setSeats(initialSeats);
      addSeat(initialSeats);
    }
  }, [rows, columns, aisleColumn, createSeat, addSeat]);
  

  const handleSeatClick = useCallback((row: number, col: number) => {
    setSeats((prevSeats) =>
      prevSeats.map((seat) =>
        seat.row === row && seat.col === col && seat.status !== "occupied"
          ? {
              ...seat,
              status: seat.status === "selected" ? "available" : "selected",
            }
          : seat
      )
    );
  }, []);

  const getSeatLabel = useCallback((row: number, seatLabelIndex: number) => {
    const rowLabel = String.fromCharCode(65 + row); // A, B, C, etc.
    const colLabel = seatLabelIndex + 1; // 1, 2, 3, etc., based on seatLabelIndex
    return `${rowLabel}${colLabel}`;
  }, []);
  

  const handleInputChange = useCallback(
    (setter: React.Dispatch<React.SetStateAction<number>>) =>
      (evt: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(1, parseInt(evt.target.value, 10) || 0);
        setter(value);
      },
    []
  );

  const renderSeat = useCallback(
    (seat: Seat, rowIndex: number, colIndex: number) => (
      <Box key={colIndex}>
        <Button
          className={`seat ${seat.type} ${seat.status}`}
          variant="solid"
          color={seat.status === "selected" ? "primary" : "neutral"}
          size="sm"
          disabled={seat.status === "occupied"}
          onClick={() => handleSeatClick(rowIndex, colIndex)}
        />
        {showLabels && seat.seatNumber}
      </Box>
    ),
    [handleSeatClick, showLabels]
  );

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
            padding: 5px 0px;
            border-radius: 5px;
            color: #777;
            list-style-type: none;
            display: flex;
            flex-wrap: wrap;
            gap: 1px;
            margin-bottom: 15px;
            width: 100%;
          }

          .showcase .subject {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 0 5px;
          }

          .row {
            display: flex;
          }

          .gap {
            height: 100%;
          }
        `}
      </style>

      {/* Input controls */}
      <Box sx={{ height: "60px", display: "flex", gap: "5px" }}>
        <S.Input
          type="number"
          placeholder="Columns"
          onChange={handleInputChange(setColumns)}
          min="1"
        />
        <S.Input
          type="number"
          placeholder="Rows"
          onChange={handleInputChange(setRows)}
          min="1"
        />
        <S.Input
          type="number"
          placeholder="Aisle"
          onChange={handleInputChange(setAisleColumn)}
          min="1"
        />
      </Box>

      {/* Seat Showcase */}
      <Box className="showcase">
        <ShowcaseItem className="seat window" label="Window" />
        <ShowcaseItem className="seat selected" label="Selected" />
        <ShowcaseItem className="seat occupied" label="Occupied" disabled />
      </Box>

      {/* Seat Layout */}
      <Grid container direction="column" sx={{ justifyContent: "center" }}>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <Box key={rowIndex} sx={{ display: "flex" }}>
            {Array.from({ length: columns }).map((_, colIndex) => {
              if (colIndex === aisleColumn)
                return <Box key={`gap-${colIndex}`} sx={{ width: "40px" }} />;

              const seat = seats.find(
                (seat) => seat.row === rowIndex && seat.col === colIndex
              );
              return seat ? renderSeat(seat, rowIndex, colIndex) : null;
            })}
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

const ShowcaseItem: FC<{
  className: string;
  label: string;
  disabled?: boolean;
}> = ({ className, label, disabled = false }) => (
  <Box className="subject">
    <Button
      className={className}
      variant="solid"
      size="sm"
      disabled={disabled}
    />
    <Typography sx={{fontSize:'10px'}}>{label}</Typography>
  </Box>
);

export default AddSeatComponent;
