import { gql } from "@apollo/client";

const getScheduleByCompanyId = gql`
  query GetBusScheduleByCompanyId($companyId: Int!) {
    getBusScheduleByCompanyId(companyId: $companyId) {
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

export default getScheduleByCompanyId;
