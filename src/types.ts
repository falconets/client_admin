export interface signInProps {
  email: string;
  password: string;
}

export interface PayloadProps {
  token: string;
  userId: string;
}

export interface StateProps {
  isAuthenticated: boolean | null;
  token: string | null;
  userId: string | null;
}

export interface ActionProps {
  type: string;
  payload: PayloadProps | undefined;
}

export interface BusRoutesProps{
    id?:string
    companyId?:string
    routeName:string
    distanceInKm:number
    durationInHours:number
    startLocation:string
    endLocation:string
    active?:boolean
    price:number
    createdAt?:string
    updatedAt?:string
}

export interface BusesProps{
  bus_id?: number
  bus_model: string
  plate_number: string
  seat_capacity: number
  bus_company: number
}

export type BusScheduleProps = {
  id?: string;
  companyId: number;
  busPlateNumber: string;
  start: string|Date; 
  end:string|Date; 
  routeId: string;
  tickets: number;
  description: string;
  background?: string;
  borderColor?: string;
  recurrenceRule: string|null;
  recurrenceExceptions: string;
};

export type BuseScheduleData = {
  calendar: string,
  description?: string,
  recurrenceException?: string,
  recurrenceRule: string | null,
  end: string | Date,
  id?: string,
  tickets: number,
  start: string | Date,
  route: string,
  background?: string,
  borderColor?: string,
}

