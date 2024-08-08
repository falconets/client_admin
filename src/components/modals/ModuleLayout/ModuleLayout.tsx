import React, { FormEvent } from "react";
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
import routeModuleStore from "@store/routeModuleStore";
import useViewportDimensions from "@hooks/useWindowDimensions";
import useForm from "@hooks/useForm";
import useBusRoutes from "@hooks/useBusRoutes";

interface formElementProps {
  route: string;
  distance: string;
  duration: string;
  departure: string;
  destination: string;
  price: string;
}


const AddRouteModule: React.FC = () => {
  let layout: "fullscreen" | "center" | undefined;
  const { state, handleClose } = routeModuleStore();
  const { windowWidth } = useViewportDimensions();
  const {addBusRoute, mLoading} = useBusRoutes()

  const { formData, sterilizeData, handleInputChange } =
    useForm<formElementProps>({});

  if (windowWidth < 600) layout = "fullscreen";
  else layout = "center";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElements: formElementProps | null = sterilizeData();
    console.log(formElements);
    if (formElements) {
      addBusRoute(formElements, handleClose)
    }
  };
 

  return (
    <Modal
      open={state.open}
      onClose={handleClose}
      sx={{
        zIndex: 10000,
      }}
    >
      <ModalDialog layout={layout} variant="outlined">
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
              <FormLabel>Distance (km)</FormLabel>
              <Input
                name="distance"
                type="number"
                value={formData.distance || ""}
                onChange={handleInputChange}
                required
              />
            </FormControl>

            <FormControl>
              <FormLabel>Duration (hr)</FormLabel>
              <Input
                name="duration"
                type="number"
                value={formData.duration || ""}
                onChange={handleInputChange}
                required
              />
            </FormControl>

            <FormControl>
              <FormLabel>Start Location</FormLabel>
              <Input
                name="departure"
                value={formData.departure || ""}
                onChange={handleInputChange}
                required
              />
            </FormControl>

            <FormControl>
              <FormLabel>End Location</FormLabel>
              <Input
                name="destination"
                value={formData.destination || ""}
                onChange={handleInputChange}
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
            <Button type="submit" loading={mLoading}>Submit</Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
};

export default AddRouteModule;
