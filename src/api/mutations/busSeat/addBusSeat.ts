import { gql } from "@apollo/client";

export const addBusSeat = gql`
  mutation AddBusSeats(
    $busId: Int!
    $seatNumber: String!
    $seatType: String!
    $isAvailable: Boolean!
    $row: Int!
    $col: Int!
    $aisleColumn: Int!
  ) {
    addBusSeats(
      busId: $busId
      seatNumber: $seatNumber
      seatType: $seatType
      is_available: $isAvailable
      row: $row
      col: $col
      aisleColumn: $aisleColumn
    ) {
      seat_id
      bus_id
      seatNumber
      seatType
      is_available
      row
      col
      aisleColumn
      createdAt
      updatedAt
    }
  }
`;
