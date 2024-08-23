import useBuses from "@hooks/useBuses";
import { SearchRounded } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
  Box,
  Input,
  Stack,
} from "@mui/joy";
import { BusesProps } from "@types";
import { matchSorter } from "match-sorter";
import { useState } from "react";

const Mobile = () => {
  const { buses } = useBuses();
  const [searchKey, setSearchKey] = useState<string>("");
  const [index, setIndex] = useState<number | null>(0);

  const filterBuses = buses?.filter((bus) =>
    bus.plate_number.toLowerCase().includes(searchKey.toLowerCase())
  );

  return (
    <Box sx={{ display: { md: "none" } }}>
      <Input
        placeholder="Search by plate number"
        startDecorator={<SearchRounded />}
        sx={{ width: "95%", mx: "auto" }}
        onChange={(event) => setSearchKey(event.target.value)}
      />
      <Box>
        <AccordionGroup sx={{ width: "95%", mx: "auto" }}>
          {filterBuses?.map((bus, idx) => (
            <Accordion
              key={bus.bus_id}
              expanded={idx === index}
              onChange={(event, expanded) => {
                setIndex(expanded ? idx : null);
              }}
            >
              <AccordionSummary>{bus.plate_number}</AccordionSummary>
              <AccordionDetails>
                <Stack direction="column">
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span>Model:</span> <span>{bus.bus_model}</span>
                  </Box>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span>Capacity:</span> <span>{bus.seat_capacity}</span>
                  </Box>
                </Stack>
              </AccordionDetails>
            </Accordion>
          ))}
        </AccordionGroup>
      </Box>
    </Box>
  );
};

export default Mobile;
