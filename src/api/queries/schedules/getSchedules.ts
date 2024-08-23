import { gql } from "@apollo/client";

const getSchedules = gql`
  query GetBusSchedules {
    getBusSchedules {
      id
      companyId
      busPlateNumber
      start
      end
      routeId
      tickets
      description
      background
      borderColor
      recurrenceRule
      recurrenceExceptions
    }
  }
`;

export default getSchedules
