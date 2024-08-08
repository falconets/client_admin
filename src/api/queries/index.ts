import { gql } from "@apollo/client";

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
`

export default {
  listAllcompanies,
  userById,
  listOfAllBusRoutes,
};
