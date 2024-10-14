import { gql } from "@apollo/client";

const bus_accopancy_report = gql`
  query Bus_seat_occupancy_report($date: String!, $companyId: Int!) {
    bus_seat_occupancy_report(date: $date, companyId: $companyId) {
      bus_plate_number
      total_seats
      total_booked_seats
      total_available_seats
      routeId
    }
  }
`;

export default bus_accopancy_report
