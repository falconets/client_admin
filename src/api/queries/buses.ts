import { gql } from "@apollo/client";

const busesByCompanyId = gql`
  query BusesByCompany($busCompany: Int!) {
    busesByCompany(bus_company: $busCompany) {
      bus_id
      bus_model
      plate_number
      seat_capacity
      bus_company
    }
  }
`;

const addBus = gql`
  mutation CreateBus(
    $busModel: String!
    $plateNumber: String!
    $seatCapacity: Int!
    $busCompany: Int!
  ) {
    createBus(
      bus_model: $busModel
      plate_number: $plateNumber
      seat_capacity: $seatCapacity
      bus_company: $busCompany
    ) {
      bus_id
      bus_model
      plate_number
      seat_capacity
      bus_company
    }
  }
`;

export default {
  busesByCompanyId,
  addBus,
};
