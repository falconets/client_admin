import React, { FormEvent } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import routeModuleStore from "@store/routeModuleStore";
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
  const { state, handleClose } = routeModuleStore();
  const { addBusRoute, mLoading } = useBusRoutes();
  const { formData, sterilizeData, handleInputChange } =
    useForm<formElementProps>({});
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElements: formElementProps | null = sterilizeData();
    if (formElements) {
      addBusRoute(formElements, handleClose);
    }
  };

  return (
    <Dialog
      open={state.open}
      onClose={handleClose}
      fullScreen={fullScreen}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Add a new bus route</DialogTitle>
      <DialogContent>
        <Typography>Fill in the information of the route.</Typography>
        <form onSubmit={handleSubmit} noValidate>
          <Stack spacing={2} mt={2}>
            <TextField
              label="Route Name"
              name="route"
              value={formData.route || ""}
              onChange={handleInputChange}
              required
              fullWidth
            />
            <TextField
              label="Distance (km)"
              name="distance"
              type="number"
              value={formData.distance || ""}
              onChange={handleInputChange}
              required
              fullWidth
            />
            <TextField
              label="Duration (hr)"
              name="duration"
              type="number"
              value={formData.duration || ""}
              onChange={handleInputChange}
              required
              fullWidth
            />
            <TextField
              label="Start Location"
              name="departure"
              value={formData.departure || ""}
              onChange={handleInputChange}
              required
              fullWidth
            />
            <TextField
              label="End Location"
              name="destination"
              value={formData.destination || ""}
              onChange={handleInputChange}
              required
              fullWidth
            />
            <TextField
              label="Price"
              name="price"
              type="number"
              value={formData.price || ""}
              onChange={handleInputChange}
              required
              fullWidth
            />
          </Stack>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          disabled={mLoading}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddRouteModule;
