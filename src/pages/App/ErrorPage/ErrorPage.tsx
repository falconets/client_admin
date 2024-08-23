import { Box } from "@mui/material"
import { useRouteError } from "react-router-dom"


const ErrorPage = () => {
      const error:any = useRouteError()
      console.error(error)
  return (
    <Box id="error-page">
      <h1>Oop!</h1>
      <Box>Sorry, an unexpected error has occurred.</Box>
      <Box>
            <p>{error?.status || error?.message}</p>
      </Box>
    </Box>
  )
}

export default ErrorPage