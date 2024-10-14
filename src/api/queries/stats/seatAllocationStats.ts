import { gql } from "@apollo/client";
/**
 * this query fetches seats allocation stats
 * @param busId as number
 * @param journeyInstanceId as string
 * @returns total number of seats, booked and available slots
 * of type SeatAllocationStats
 */
const seat_allocation_stats = gql`
  query Seat_allocation_stats($busId: Int!, $journeyInstanceId: String!) {
    seat_allocation_stats(
      busId: $busId
      journeyInstanceId: $journeyInstanceId
    ) {
      total_seats
      total_booked_seats
      total_available_seats
    }
  }
`;

export default seat_allocation_stats;
