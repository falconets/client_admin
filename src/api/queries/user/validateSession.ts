import { gql } from "@apollo/client";

const validateSession = gql`
  query Query {
    validateSession
  }
`;
export default validateSession
