import { useQuery } from "@apollo/client"
import { Box, Skeleton, Table } from "@mui/material"
import queries from "@api/queries"
import { BusRoutesProps, SeatAllocationStats } from "@types"
import useBusRoutes from "@hooks/useBusRoutes"
import userStore from "@store/userStore"

const DesktopTable = ()=>{
    const {listOfBusRoutes} = useBusRoutes()
    const {userInfos} = userStore()
    const {data, loading} = useQuery(queries.bus_accopancy_report,{
        variables: {
            companyId: userInfos?.bus_company_id as number,
            date: "2024-10-02", 
        }
    })


    const findRoute = (routeId:string)=>{
        console.log(listOfBusRoutes)
        if(!listOfBusRoutes) return "No route found"
        const route = listOfBusRoutes?.find((route: BusRoutesProps)=> route.id === routeId)
        console.log(routeId,route)
        const temp = route?.startLocation.split(',')[0] + " - " + route?.endLocation.split(',')[0]
        return routeId? temp : "No route found"
    }

    if(loading){
        return <Box>
            <Table>
                <thead>
                    <tr>
                        <th>Bus PlatNumber</th>
                        <th>Route</th>
                        <th>total Seats</th>
                        <th>Booked seats</th>
                        <th>Available seats</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><Skeleton variant="rectangular" width={50} height={20}/></td>
                        <td><Skeleton variant="rectangular" width={100} height={20}/></td>
                        <td><Skeleton variant="rectangular" width={50} height={20}/></td>
                        <td><Skeleton variant="rectangular" width={50} height={20}/></td>
                        <td><Skeleton variant="rectangular" width={50} height={20}/></td>
                    </tr>
                </tbody>
            </Table>
        </Box>
    }

    return(
        <Box>
            <Table>
                <thead>
                    <tr>
                        <th>Bus PlatNumber</th>
                        <th>Route</th>
                        <th>total Seats</th>
                        <th>Booked seats</th>
                        <th>Available seats</th>
                    </tr>
                </thead>
                <tbody>
                    {data.bus_seat_occupancy_report.map((report:SeatAllocationStats, index: number)=>{
                        return(
                            <tr key={index}>
                                <td>{report.bus_plate_number}</td>
                                <td>{findRoute(report.routeId as string)}</td>
                                <td>{report.total_seats}</td>
                                <td>{report.total_booked_seats}</td>
                                <td>{report.total_available_seats}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </Box>
    )
}

export default DesktopTable