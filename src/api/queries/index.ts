import { gql } from "@apollo/client";
import buses from "./buses";
import schedules from "./schedules";
import busSeats from "./busSeats";

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

const userById = gql`
  query UserById($userByIdId: Int) {
    userById(id: $userByIdId) {
      id
      first_name
      last_name
      email
      phone_number
      type
      gender
      created_at
      updated_at
      bus_company_id
      is_email_verified
      avatar
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
  userById,
  listOfAllBusRoutes,
  getBusRoutesByCompanyId,
  ...buses,
  ...schedules,
  ...busSeats,
};
