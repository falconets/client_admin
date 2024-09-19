import { gql } from "@apollo/client";
import schedules from "./schedules";
import routes from "./routes";
import busSeat from "./busSeat";

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


export default {
  signin,
  signup,
  ...schedules,
  ...routes,
  ...busSeat
};
