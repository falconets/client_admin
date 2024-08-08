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
    id:string
    companyId:string
    routeName:string
    distanceInKm:number
    durationInHours:number
    startLocation:string
    endLocation:string
    active:boolean
    price:number
    createdAt:string
    updatedAt:string
}