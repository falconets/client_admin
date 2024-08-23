import { gql } from "@apollo/client";

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

export default addBusRoute;