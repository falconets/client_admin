import { gql } from "@apollo/client";

const deleteSchedule = gql`
    mutation DeleteBusSchedule($deleteBusScheduleId: String!) {
  deleteBusSchedule(id: $deleteBusScheduleId)
}
`
export default deleteSchedule