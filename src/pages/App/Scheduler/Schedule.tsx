import "jqwidgets-scripts/jqwidgets/styles/jqx.base.css";
import "jqwidgets-scripts/jqwidgets/styles/jqx.dark.css";
import { Box, useTheme } from "@mui/joy";
import JqxScheduler, {
  ISchedulerEditDialogCreate,
  jqx,
} from "jqwidgets-scripts/jqwidgets-react-tsx/jqxscheduler";
import { useEffect, useRef, useState } from "react";
import { rgbToHex, useMediaQuery } from "@mui/material";
import useBuses from "@hooks/useBuses";
import { RRule } from "rrule";
import useBusRoutes from "@hooks/useBusRoutes";
import useBusSchedule from "@hooks/useBusSchedule";
import { BuseScheduleData, BusScheduleProps } from "@types";

const CURRENTDATE = new Date();

const Schedulers = () => {
  const myScheduler = useRef<JqxScheduler>();
  const theme = useTheme();
  const { buses } = useBuses();
  const { listOfBusRoutes } = useBusRoutes();
  const { schedules, addSchedule, deleteSchedule } = useBusSchedule();
  const isLessThanMd = useMediaQuery(theme.breakpoints.down("md"));
  const [appointments, setAppointments] = useState<BuseScheduleData[]>([
    {
      background: "#307dd7cc",
      borderColor: "#307DD7",
      calendar: "BBC20",
      description: "test test",
      end: new Date(2018, 8, 18, 14,0,0),
      id: "46fef757-a3f8-477b-ab21-3f393576a1a9",
      recurrenceException: "",
      recurrenceRule: null,
      route: "fcc7dd60-c0a3-4873-aa52-6cd33e299230",
      start: new Date(2018, 8, 18, 8, 0,0),
      tickets: 76,
    },
  ]);

  useEffect(() => {
    if (buses) {
      const listBus: Object[] = [];
      buses.forEach((bus) =>{
        listBus.push({
          id: bus.bus_id,
          calendar: bus.plate_number,
          end: new Date(2018, 8, 8, 16, 0, 0),
          start: new Date(2018, 18, 8, 8, 0, 0),
          ticket: 1,
          route: "encoded",
          recurrenceException: "",
          recurrenceRule: null,
          description: "test test",
          background: "#307dd7cc",
          borderColor: "#307DD7"
      })
    });
      setAppointments([...appointments, ...listBus] as any);
      console.log('list buses', listBus)
    }
  }, [buses]);

  useEffect(() => {
    let data = schedules.map((schedule: BusScheduleProps) => {
      return {
        calendar: schedule.busPlateNumber,
        description: schedule.description,
        recurrenceException: schedule.recurrenceExceptions,
        recurrenceRule: schedule.recurrenceRule,
        end: new Date(schedule.end),
        id: schedule.id as string,
        tickets: schedule.tickets,
        start: new Date(schedule.start),
        route: schedule.routeId,
        background: schedule.background,
        borderColor: schedule.borderColor,
      };
    });
    setAppointments([...appointments, ...data]);
  }, [schedules]);
  
  const source: any = {
    dataFields: [
      { name: "id", type: "string" },
      { name: "description", type: "string" },
      { name: "tickets", type: "number" },
      { name: "route", type: "string" },
      { name: "calendar", type: "string" },
      { name: "start", type: "date" },
      { name: "end", type: "date" },
      { name: "recurrenceException", type: "string" },
      { name: "recurrenceRule", type: "string" },
      { name: "background", type: "string" },
      { name: "borderColor", type: "string" },
    ],
    dataType: "array",
    id: "id",
    localData: appointments,
  };
  
  const dataAdapter: any = new jqx.dataAdapter(source);
  
  const state = {
    appointmentDataFields: {
      description: "description",
      from: "start",
      id: "id",
      location: "tickets",
      recurrenceException: "recurrenceException",
      recurrencePattern: "recurrenceRule",
      resourceId: "calendar",
      subject: "route",
      to: "end",
      background: "background",
      borderColor: "borderColor",
    },
    date: new jqx.date(
      CURRENTDATE.getFullYear(),
      CURRENTDATE.getMonth() + 1,
      CURRENTDATE.getDate()
    ),
    editDialogCreate: (
      _dialog: ISchedulerEditDialogCreate["dialog"],
      fields: ISchedulerEditDialogCreate["fields"],
      _editAppointment: ISchedulerEditDialogCreate["editAppointment"]
    ) => {
      // Hide other unnecessary fields
      fields.timeZoneContainer.hide();
      fields.statusContainer.hide();
      fields.allDayContainer.hide();
      fields.resourceLabel.html("Bus");
      fields.locationLabel.html("Ticket");
      fields.subjectLabel.html("Route");

      const subjectField = fields.subject;

      // Create a new select element
      const selectElement = $(`<select></select>`);
      listOfBusRoutes?.forEach((route, index) => {
        if (route.active) {
          selectElement.append(
            `<option id=${route.id} selected=${index == 0} value=${
              route.id
            } >${route.startLocation.split(",")[0].trim()}-${route.endLocation
              .split(",")[0]
              .trim()}</option>`
          );
        }
      });

      // Replace the input with the select
      subjectField.replaceWith(selectElement);

      selectElement.on("change", function () {
        fields.subject.val(selectElement.val());
      });
    },
    height: 600,
    ready: () => {
      setTimeout(() => {
        myScheduler.current!.ensureAppointmentVisible("46fef757-a3f8-477b-ab21-3f393576a1a9");
      });
    },
    resources: {
      colorScheme: "scheme05",
      dataField: "calendar",
      source: new jqx.dataAdapter(source),
    },
    source: dataAdapter,
    views: [
      "dayView",
      "weekView",
      { type: "monthView", monthRowAutoHeight: true },
    ],
  };

  const CorrectRRule = (str: string) => {
    if (str === "daily") return RRule.DAILY;
    else if (str === "weekly") return RRule.WEEKLY;
    else if (str === "monthly") return RRule.MONTHLY;
    else if (str === "yearly") return RRule.YEARLY;
    else throw new Error("declared frequency is not found");
  };

  const handleAddSchedule = (appointment: any) => {
    console.log("add schedule", appointment.args);
    const schedule = appointment.args.appointment;
    const recurrence = schedule.recurrencePattern;

    const rule =
      recurrence != null
        ? new RRule({
            freq: CorrectRRule(recurrence.freq),
            interval: recurrence.interval,
            byweekday: recurrence.byweekday,
            count: recurrence.count,
            bymonth: recurrence.bymonth,
            byyearday: recurrence.byyearday,
            byweekno: recurrence.byweekno,
            bymonthday: recurrence.bymonthday,
            bynweekday: recurrence.bynweekday,
            bynmonthday: recurrence.bynmonthday,
          })
            .toString()
            .split(":")[1]
        : null;

    const data: BuseScheduleData = {
      calendar: schedule.resourceId,
      description: schedule.description,
      recurrenceException: schedule.recurrenceException,
      recurrenceRule: rule,
      end: new Date(schedule.originalData.end),
      start: new Date(schedule.originalData.start),
      tickets: schedule.location,
      route: schedule.subject,
      background: schedule.background
        ? rgbToHex(schedule.background)
        : undefined,
      borderColor: schedule.borderColor,
    };
    addSchedule(data);
    console.log("filtered data", data);
  };

  const handleDeleteAppointment = (data: any) => {
    const appointmentId = data.args.appointment.id;
    deleteSchedule(appointmentId);
  }

  const handleRenderAppointment = (data: any) => {
    const item = listOfBusRoutes?.find(
      (route) => route.id === data.appointment.subject
    );
    data.html = `<p>${item?.startLocation
      .split(",")[0]
      .trim()} to ${item?.endLocation.split(",")[0].trim()}</p>`;
    data.textColor = "#ffffff";
    return data;
  };

  return (
    <Box>
      <JqxScheduler
        width={"100%"}
        height={state.height}
        date={state.date}
        source={state.source}
        showLegend={true}
        view={"weekView"}
        timeZone="Europe/Stockholm"
        dayNameFormat={isLessThanMd ? "abbr" : undefined}
        appointmentDataFields={state.appointmentDataFields}
        renderAppointment={handleRenderAppointment}
        editDialogCreate={state.editDialogCreate}
        resources={state.resources}
        views={state.views}
        ready={state.ready}
        theme={theme.palette.mode}
        onAppointmentDelete={handleDeleteAppointment}
        onAppointmentAdd={(evt) => handleAddSchedule(evt)}
        onAppointmentDoubleClick={(evt) => console.log(evt)}
        onAppointmentChange={(evt) => console.log(evt)}
        onCellClick={(evt) => console.log(evt)}
      />
    </Box>
  );
};

export default Schedulers;
