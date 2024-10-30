import { gql } from "@apollo/client";

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

export default userById;