import {
  Modal,
  Button,
  ModalDialog,
  DialogTitle,
  Typography,
  DialogActions,
} from "@mui/joy";
import { DialogContent } from "@mui/material";
import { Seat } from "@types";
import { FC, useState } from "react";
import theme from "@themes";
import useBusSeats from "@hooks/useBusSeats";
import AddSeatComponent from "../Seats/AddSeatComponent";

type ownprops = {
  isOpen: boolean;
  setIsOpen: () => void;
  busId: string;
};

const LayoutModal: FC<ownprops> = ({ isOpen, setIsOpen, busId }) => {
  const { addSeat } = useBusSeats();
  const [seatLayout, setSeatLayout] = useState<Seat[] | null>(null);

  const handleSubmit = (event: React.ChangeEvent<EventTarget>) => {
    event.preventDefault();

    try {
      if (seatLayout) {
        seatLayout.forEach((value) => {
          console.log("bus id and value", {
            busId: parseInt(busId.toString()),
            value: value,
          });
          addSeat({
            busId: parseInt(busId.toString()),
            row: value.row,
            col: value.col,
            is_available: true,
            seatType: value.type,
            seatNumber: value.seatNumber.toString(),
            aisleColumn: value.aisleColumn,
          }).then(() => {
            setIsOpen();
          });
        });
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Modal open={isOpen} onClose={setIsOpen} sx={{ zIndex: 10000 }}>
      <ModalDialog
        sx={{ width: { md: "50%", sm: "95%", xs: "95%" }, mx: { md: "auto" } }}
      >
        <DialogTitle>Describe the bus layout</DialogTitle>
        <Typography>specify the number of colums, rows and ailse</Typography>
        <DialogContent>
          <AddSeatComponent addSeat={setSeatLayout} />
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              backgroundColor: theme.colors.danger,
            }}
            onClick={setIsOpen}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            sx={{ backgroundColor: theme.colors.success }}
            onClick={handleSubmit}
          >
            Save
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
};

export default LayoutModal;
