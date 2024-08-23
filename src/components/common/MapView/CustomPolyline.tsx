import { Polyline } from '@react-google-maps/api'
import { useState,FC, useEffect } from 'react'

type  props = {
  routeCoords?: any[]
}
type ownprops = props

const CustomPolyline: FC<ownprops> = ({routeCoords}) => {
      const [routeCoordinates, setCoordinates] = useState<any[]| undefined>(routeCoords)

      useEffect(()=>{
        setCoordinates(routeCoords)
      },[routeCoords])

  return (
      <>
      {routeCoordinates && routeCoordinates.length > 0 && (
            <Polyline
              path={routeCoordinates}
              options={{
                strokeColor: '#0000FF',
                strokeOpacity: 0.8,
                strokeWeight: 4,
              }}
            />
          )}
      
      </>
  )
}

export default CustomPolyline