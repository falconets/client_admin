import React, { FormEvent, useEffect, useState } from "react";
import {
  Button,
  DialogTitle,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalClose,
  ModalDialog,
  Stack,
  Typography,
} from "@mui/joy";
import useViewportDimensions from "@hooks/useWindowDimensions";
import useForm from "@hooks/useForm";
import useBusRoutes from "@hooks/useBusRoutes";
import LocationSearchBox from "@common/LocationSearchBox";
import useMapInteraction from "@hooks/useMapInteraction";
import mapStore from "@store/mapStore";
import { secondsToHoursAndMinutes } from "../../../../../../utils";

interface Location {
  value: string;
}
interface formElementProps {
  route: string;
  distance: string;
  duration: string;
  departure: string;
  destination: string;
  price: string;
}

type ownprops = {
  open: boolean;
  onClose: () => void;
};

const AddRouteModule: React.FC<ownprops> = ({ open, onClose }) => {
  const { formData, sterilizeData, handleInputChange } =
    useForm<formElementProps>({});
  let layout: "fullscreen" | "center" | undefined;
  const { windowWidth } = useViewportDimensions();
  const { mapRef } = mapStore();
  const { addBusRoute, mLoading } = useBusRoutes();
  const { getTravellingDetails, duration, distance } = useMapInteraction({
    mapRef,
  });
  const [startPoint, setStartPoint] = useState<string>("");
  const [endPoint, setEndPoint] = useState<string>("");
  const [tDistance, setDistance] = useState<number | null>(null);
  const [tDuration, setDuration] = useState<number | null>(null);

  useEffect(() => {
    if (endPoint.trim() !== "" && startPoint.trim() !== "") {
      getTravellingDetails(startPoint, endPoint);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endPoint, startPoint]);

  useEffect(() => {
    if (distance) {
      setDistance(distance);
    }
    if (duration) {
      setDuration(duration);
    }
  }, [distance, duration]);

  if (windowWidth < 600) layout = "fullscreen";
  else layout = "center";

  const handlePlaceDeparture = ({ value }: Location) => {
    setStartPoint(value as string);
  };

  const handlePlaceDestination = ({ value }: Location) => {
    setEndPoint(value as string);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElements: formElementProps | null = sterilizeData();

    if (formElements && startPoint.trim() !== "" && endPoint.trim() !== "") {
      const data = {
        routeName: formElements.route,
        startLocation: startPoint,
        endLocation: endPoint,
        distanceInKm: tDistance as number,
        durationInHours: tDuration as number,
        price: parseInt(formElements.price),
      };
      addBusRoute(data, onClose).then(() =>{
        setDuration(null);
        setDistance(0);
      });
    }
  };

  const { hours, minutes } = secondsToHoursAndMinutes(tDuration as number);
  const hoursMinute = `${hours}:${minutes}`;

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        zIndex: 10000,
      }}
    >
      <ModalDialog
        layout={layout}
        sx={{ width: { md: "50%", xs: "100%" } }}
        variant="outlined"
      >
        {layout === "fullscreen" && <ModalClose />}
        <DialogTitle>Add a new bus route</DialogTitle>
        <Typography>Fill in the information of the route.</Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <FormControl>
              <FormLabel>Route Name</FormLabel>
              <Input
                name="route"
                value={formData.route || ""}
                onChange={handleInputChange}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Start Location</FormLabel>
              <LocationSearchBox
                name="departure"
                onChange={handlePlaceDeparture}
              />

              {/* <Input
                name="departure"
                value={formData.departure || ""}
                onChange={handleInputChange}
                required
              /> */}
            </FormControl>

            <FormControl>
              <FormLabel>End Location</FormLabel>
              <LocationSearchBox
                name="destination"
                onChange={handlePlaceDestination}
              />

              {/* <Input
                name="destination"
                value={formData.destination || ""}
                onChange={handleInputChange}
                required
              /> */}
            </FormControl>

            <FormControl>
              <FormLabel>Distance (km)</FormLabel>
              <Input
                name="distance"
                type="number"
                value={(tDistance ? tDistance * 0.001 : "") || ""}
                onChange={(evt) => setDistance(parseInt(evt.target.value))}
                required
              />
            </FormControl>

            <FormControl>
              <FormLabel>Duration (hr)</FormLabel>
              <Input
                name="duration"
                type="text"
                value={hoursMinute || ""}
                onChange={(evt) => setDuration(parseInt(evt.target.value))}
                required
              />
            </FormControl>

            <FormControl>
              <FormLabel>Price</FormLabel>
              <Input
                name="price"
                type="number"
                value={formData.price || ""}
                onChange={handleInputChange}
                required
              />
            </FormControl>
            <Button type="submit" loading={mLoading}>
              Submit
            </Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
};

export default AddRouteModule;
