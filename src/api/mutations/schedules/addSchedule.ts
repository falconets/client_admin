import { gql } from "@apollo/client";

const addSchedule = gql`
  mutation AddBusSchedule(
    $companyId: Int!
    $busPlateNumber: String!
    $start: String!
    $end: String!
    $routeId: String!
    $tickets: Int!
    $description: String
    $background: String
    $borderColor: String
    $recurrenceRule: String
    $recurrenceExceptions: String
  ) {
    addBusSchedule(
      companyId: $companyId
      busPlateNumber: $busPlateNumber
      start: $start
      end: $end
      routeId: $routeId
      tickets: $tickets
      description: $description
      background: $background
      borderColor: $borderColor
      recurrenceRule: $recurrenceRule
      recurrenceExceptions: $recurrenceExceptions
    ) {
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

export default addSchedule
