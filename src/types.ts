export interface signInProps {
  email: string;
  password: string;
}

export interface PayloadProps {
  userId: string;
}

export interface StateProps {
  isAuthenticated: boolean | null;
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
  bus_id?: string
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

export interface BusSeats{
  seat_id?: string;
  busId?: number;
  seatNumber: string;
  seatType: string;
  is_available?: boolean;
  createdAt?: string;
  updatedAt?: string;
  row: number;
  col: number;
  aisleColumn: number;
}
export type SeatStatus = "available" | "selected" | "occupied";
export type SeatType = "window" | "aisle" | "middle";

export interface Seat {
  row: number;
  col: number;
  aisleColumn: number;
  status: SeatStatus;
  type: SeatType;
  seatNumber: string | number;
}

export interface CompanyRevenueByPaymentMethod {
  paymentMethod: number;
  total_revenue: number;
  number_of_tickets: number;
}

export interface SeatAllocationStats {
  bus_plate_number?: string
  routeId?: string
  total_seats: number;
  total_booked_seats: number;
  total_available_seats: number;
}

export interface RevenueReportByTime {
  booking_date: string;
  total_revenue: number;
  total_bookings: number;
}