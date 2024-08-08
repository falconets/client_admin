import { gql } from "@apollo/client";

const signin = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password)
  }
`;

const signup = gql`
  mutation RegisterUser(
    $firstName: String!
    $lastName: String!
    $type: String!
    $gender: String!
    $email: String!
    $password: String!
    $isEmailVerified: Boolean!
    $phoneNumber: String
    $busCompanyId: String
    $avatar: String
  ) {
    registerUser(
      first_name: $firstName
      last_name: $lastName
      type: $type
      gender: $gender
      email: $email
      password: $password
      is_email_verified: $isEmailVerified
      phone_number: $phoneNumber
      bus_company_id: $busCompanyId
      avatar: $avatar
    )
  }
`;

const addBusRoute = gql`
  mutation AddBusRoutes(
    $companyId: Int!
    $routeName: String
    $distanceInKm: Int
    $durationInHours: Int
    $startLocation: String
    $endLocation: String
    $active: Boolean
    $price: Int
  ) {
    addBusRoutes(
      companyId: $companyId
      routeName: $routeName
      distanceInKm: $distanceInKm
      durationInHours: $durationInHours
      startLocation: $startLocation
      endLocation: $endLocation
      active: $active
      price: $price
    ) {
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

const toggleBusRouteActive = gql`
  mutation ToggleBusRoutesActive(
    $toggleBusRoutesActiveId: String!
    $active: Boolean!
  ) {
    toggleBusRoutesActive(id: $toggleBusRoutesActiveId, active: $active) {
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

const deleteBusRoute = gql`
  mutation Mutation($deleteBusRoutesId: String) {
  deleteBusRoutes(id: $deleteBusRoutesId)
}
`

export default {
  signin,
  signup,
  addBusRoute,
  toggleBusRouteActive,
  deleteBusRoute
};
