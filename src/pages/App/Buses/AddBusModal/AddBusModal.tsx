import useForm from "@hooks/useForm";
import {
  Modal,
  Button,
  DialogTitle,
  Typography,
  DialogActions,
  FormControl,
  FormLabel,
  Input,
  Box,
} from "@mui/material";
import { DialogContent } from "@mui/material";
import { BusesProps } from "@types";
import { FC } from "react";
import theme from "@themes";
import useBuses from "@hooks/useBuses";

type ownprops = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddBusModal: FC<ownprops> = ({ isOpen, setIsOpen }) => {
  const { formData, sterilizeData, handleInputChange } = useForm<BusesProps>(
    {}
  );
  const { handleAddBus } = useBuses();

  const handleSubmit = (event: React.ChangeEvent<EventTarget>) => {
    event.preventDefault();
    const formElements: BusesProps | null = sterilizeData();

    if (!formElements) return;

    handleAddBus(
      {
        bus_model: formData.bus_model,
        plate_number: formData.plate_number,
        seat_capacity: parseInt(formData.seat_capacity.toString()),
      } as BusesProps,
      () => {
        setIsOpen(false);
      }
    );
  };
  return (
    <Modal
      open={isOpen}
      onClose={() => setIsOpen(!isOpen)}
      sx={{ zIndex: 10000 }}
    >
      <Box
        sx={{ width: { md: "50%", sm: "95%", xs: "95%" }, mx: { md: "auto" } }}
      >
        <DialogTitle>Add a new Bus</DialogTitle>
        <Typography>Add the information of the bus.</Typography>
        <DialogContent>
          <FormControl>
            <FormLabel>Bus modal</FormLabel>
            <Input
              name="bus_model"
              value={formData.bus_model || ""}
              onChange={handleInputChange}
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Plate number</FormLabel>
            <Input
              name="plate_number"
              value={formData.plate_number || ""}
              onChange={handleInputChange}
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Seat capacity</FormLabel>
            <Input
              name="seat_capacity"
              value={formData.seat_capacity || ""}
              onChange={handleInputChange}
              required
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              backgroundColor: theme.palette.error.main,
            }}
            onClick={() => setIsOpen(!isOpen)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={
              !formData.bus_model ||
              !formData.plate_number ||
              !formData.seat_capacity
            }
            sx={{backgroundColor: theme.palette.success.main}}
            onClick={handleSubmit}
          >
            Save
          </Button>
        </DialogActions>
      </Box>
    </Modal>
  );
};

export default AddBusModal;
