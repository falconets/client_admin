import { gql } from "@apollo/client"

const deleteBusRoute = gql`
  mutation Mutation($deleteBusRoutesId: String) {
  deleteBusRoutes(id: $deleteBusRoutesId)
}
`
export default deleteBusRoute