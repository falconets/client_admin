import { useAppContext } from "@credentials"
import { FC } from "react"
import { Navigate} from "react-router-dom"
import Routes from "../../route"

type props={
    children: React.ReactNode
}

const ProtectedRoute: FC<props> = ({children}):React.ReactNode=>{
    const {state} = useAppContext()
    if(state.isAuthenticated) return children
    else return <Navigate to={Routes.signin} />
}

export default ProtectedRoute