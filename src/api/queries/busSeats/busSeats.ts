import { gql } from "@apollo/client";

export const getSeatsByBusId = gql`
  query GetSeatsByBusId($busId: String!) {
    getSeatsByBusId(busId: $busId) {
      seat_id
      bus_id
      seatNumber
      seatType
      is_available
      row
      col
      aisleColumn
    }
  }
`;
