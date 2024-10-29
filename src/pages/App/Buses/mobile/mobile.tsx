import useBuses from "@hooks/useBuses";
import { SearchRounded } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  InputAdornment,
  TextField,
  Stack,
} from "@mui/material";
import { useState } from "react";
import SeatSelector from "../Seats/SeatSelector";
import LayoutModal from "./LayoutModal";

const Mobile = () => {
  const { buses } = useBuses();
  const [searchKey, setSearchKey] = useState<string>("");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [layoutOpen, setLayoutOpen] = useState<boolean>(false);
  const [selectedBusId, setSelectedBusId] = useState<string | null>(null);

  const filterBuses = buses?.filter((bus) =>
    bus.plate_number.toLowerCase().includes(searchKey.toLowerCase())
  );

  const handleSetLayout = () => {
    setLayoutOpen(!layoutOpen);
  };

  const handleSelectedId = (id: string) => {
    setSelectedBusId(id);
  };

  return (
    <Box sx={{ display: { md: "none" } }}>
      <TextField
        placeholder="Search by plate number"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchRounded />
            </InputAdornment>
          ),
        }}
        sx={{ width: "95%", mx: "auto", mb: 2 }}
        onChange={(event) => setSearchKey(event.target.value)}
      />
      <Box sx={{ width: "95%", mx: "auto" }}>
        {filterBuses?.map((bus, idx) => (
          <Accordion
            key={bus.bus_id}
            expanded={idx === expandedIndex}
            onChange={(_, isExpanded) => {
              setExpandedIndex(isExpanded ? idx : null);
            }}
          >
            <AccordionSummary>{bus.plate_number}</AccordionSummary>
            <AccordionDetails>
              <Stack direction="column" spacing={2}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Model:</span> <span>{bus.bus_model}</span>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Capacity:</span> <span>{bus.seat_capacity}</span>
                </Box>
                <Box>
                  <SeatSelector
                    busId={bus.bus_id?.toString()}
                    handleAddSeat={handleSetLayout}
                    handleSelectedId={handleSelectedId}
                  />
                </Box>
              </Stack>
            </AccordionDetails>
            <LayoutModal
              isOpen={layoutOpen}
              setIsOpen={handleSetLayout}
              busId={selectedBusId as string}
            />
          </Accordion>
        ))}
      </Box>
    </Box>
  );
};

export default Mobile;
