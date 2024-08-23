import { gql } from "@apollo/client";

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

export default toggleBusRouteActive