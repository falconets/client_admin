import { gql } from "@apollo/client";
import buses from "./buses";
import schedules from "./schedules";
import busSeats from "./busSeats";
import stats from "./stats";
import user from "./user";

const listAllcompanies = gql`
  query AllCompanies {
    allCompanies {
      companyid
      company_name
      phone_number
      email
      physical_address
      province
      created_at
      updated_at
      bank_details
      logo
    }
  }
`;


const listOfAllBusRoutes = gql`
  query GetBusRoutes {
    getBusRoutes {
      id
      companyId
      routeName
      distanceInKm
      durationInHours
      startLocation
      endLocation
      active
      price
      createdAt
      updatedAt
    }
  }
`;

const getBusRoutesByCompanyId = gql`
  query GetBusRoutesByCompanyId($companyId: Int!) {
    getBusRoutesByCompanyId(companyId: $companyId) {
      id
      companyId
      routeName
      distanceInKm
      durationInHours
      startLocation
      endLocation
      active
      price
      createdAt
      updatedAt
    }
  }
`;

export default {
  listAllcompanies,
  listOfAllBusRoutes,
  getBusRoutesByCompanyId,
  ...buses,
  ...schedules,
  ...busSeats,
  ...stats,
  ...user
};
