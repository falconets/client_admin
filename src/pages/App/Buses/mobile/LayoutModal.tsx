import {
  Modal,
  Button,
  DialogTitle,
  Typography,
  DialogActions,
  Box,
  DialogContent,
} from "@mui/material";
import { Seat } from "@types";
import { FC, useState } from "react";
import theme from "@themes";
import useBusSeats from "@hooks/useBusSeats";
import AddSeatComponent from "../Seats/AddSeatComponent";

type OwnProps = {
  isOpen: boolean;
  setIsOpen: () => void;
  busId: string;
};

const LayoutModal: FC<OwnProps> = ({ isOpen, setIsOpen, busId }) => {
  const { addSeat } = useBusSeats();
  const [seatLayout, setSeatLayout] = useState<Seat[] | null>(null);

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (seatLayout) {
      seatLayout.forEach((value) => {
        addSeat({
          busId: parseInt(busId, 10),
          row: value.row,
          col: value.col,
          is_available: true,
          seatType: value.type,
          seatNumber: value.seatNumber.toString(),
          aisleColumn: value.aisleColumn,
        })
          .then(() => {
            setIsOpen();
          })
          .catch((err) => {
            console.error(err);
          });
      });
    }
  };

  return (
    <Modal open={isOpen} onClose={setIsOpen} sx={{ zIndex: 10000 }}>
      <Box
        sx={{
          width: { md: "50%", sm: "95%", xs: "95%" },
          mx: "auto",
          mt: 4,
          p: 2,
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 1,
        }}
      >
        <DialogTitle>Describe the bus layout</DialogTitle>
        <Typography>Specify the number of columns, rows, and aisle</Typography>
        <DialogContent>
          <AddSeatComponent addSeat={setSeatLayout} />
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              backgroundColor: theme.palette.error.main,
              color: theme.palette.error.contrastText,
            }}
            onClick={setIsOpen}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            sx={{
              backgroundColor: theme.palette.success.main,
              color: theme.palette.success.contrastText,
            }}
            onClick={handleSubmit}
          >
            Save
          </Button>
        </DialogActions>
      </Box>
    </Modal>
  );
};

export default LayoutModal;
