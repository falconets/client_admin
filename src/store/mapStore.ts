import { GoogleMap } from '@react-google-maps/api';
import { create } from 'zustand';
 
type ownprop = {
      isLoaded: boolean
      setIsLoaded: (state:boolean) => void
      mapRef: React.RefObject<GoogleMap> | null,
       
      setMapRef: (ref:React.RefObject<GoogleMap>) => void
}

const mapStore = create<ownprop>((set) => {
  const storedMapRef = sessionStorage.getItem('mapRef')
  const initialMapRef = storedMapRef ? JSON.parse(storedMapRef) : null;
  return{
    isLoaded: false,  
    mapRef: initialMapRef,
    setMapRef: (ref) => set({mapRef: ref}),
    setIsLoaded: (state) => set({isLoaded: state}),
  }
});

export default mapStore;
