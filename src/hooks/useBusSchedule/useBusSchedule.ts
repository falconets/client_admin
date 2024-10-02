import mutations from "@api/mutations";
import queries from "@api/queries";
import { useMutation, useQuery } from "@apollo/client";
import usePositionedSnackbar from "@hooks/snackbar";
import userStore from "@store/userStore";
import { BuseScheduleData, BusScheduleProps } from "@types";
import { useEffect, useState } from "react";

const useBusSchedule = () =>{
    const { userInfos } = userStore();
    const { showSnackbar } = usePositionedSnackbar();
    const [schedules, setSchedules] = useState<BusScheduleProps[]>([]);
    const {
        data: scheduleData,
        error: scheduleError,
        loading: scheduleLoading,
        refetch
    } = useQuery(queries.getScheduleByCompanyId, {
        variables: { companyId: userInfos?.bus_company_id as number },
    });

    const [addBusSchedule] = useMutation(mutations.addSchedule)
    const [deleteBusSchedule] = useMutation(mutations.deleteSchedule)

    useEffect(() => {
        if (!scheduleLoading && !scheduleError && scheduleData) {
            console.log('schedule data',scheduleData)
                      setSchedules(scheduleData.getBusScheduleByCompanyId);
        }
        if(scheduleError){
            showSnackbar({
                title:"Opps something went wrong!",
                message: "Error Fetching Bus Schedules!",
                type: "danger",
            });
        }
    }, [scheduleData]);


    const addSchedule = async (prop: BuseScheduleData)=>{
        try{
            await addBusSchedule({
                variables:{
                    companyId: userInfos?.bus_company_id,
                    busPlateNumber: prop.calendar,
                    start: prop.start,
                    end: prop.end,
                    routeId: prop.route,
                    tickets: parseInt(prop.tickets.toString()),
                    description: prop.description,
                    background: prop.background,
                    borderColor: prop.borderColor,
                    recurrenceRule: prop.recurrenceRule,
                    recurrenceExceptions: prop.recurrenceException?.toString(),
                }
            }).then(data => {
                showSnackbar({
                    title:"Schedule Added Successfully!",
                    message: "New Bus Schedule Created Successfully!",
                    type: "success",
                });
                console.log('success', data)
                refetch();
            })
        }catch(error){
            showSnackbar({
                title:"Failed to Add Schedule!",
                message: "Error Adding Bus Schedule!",
                type: "danger",
            });
        }
    }

    const deleteSchedule = async (id: string)=>{
        try{
            await deleteBusSchedule({
                variables:{
                    deleteBusScheduleId: id
                }
            }).then(data => {
                showSnackbar({
                    title:"Schedule Deleted Successfully!",
                    message: "Bus Schedule Deleted Successfully!",
                    type: "success",
                });
                console.log(data)
                refetch();
            })
        }catch(error){
            showSnackbar({
                title:"Failed to Delete Schedule!",
                message: "Error Deleting Bus Schedule!",
                type: "danger",
            });
        }
    }

    return {schedules, addSchedule, deleteSchedule}

}

export default useBusSchedule;
        