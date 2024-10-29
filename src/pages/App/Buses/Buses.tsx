import {
  AddCircleOutlineRounded,
  LocalPrintshopRounded,
} from "@mui/icons-material";
import * as S from "./styled";
import { Box, Typography, Stack, Tooltip, Grid } from "@mui/material";
import BreadCrumb from "./BreadCrumb";
import Mobile from "./mobile";
import AddBusModal from "./AddBusModal/AddBusModal";
import { useState } from "react";

const Buses = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <S.Container>
      <Box
        sx={{
          bgcolor: "background.body",
          zIndex: 9995,
        }}
        className="layer-position"
      >
        <BreadCrumb />
      </Box>

      <Box
        className="header"
        sx={{
          display: "flex",
          mb: 1,
          gap: 1,
          px: { xs: 2, sm: 2, md: 6 },
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "start", sm: "center" },
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <Typography className="h2" component="h1">
          Buses
        </Typography>
        <Stack spacing={2} direction="row">
          <Tooltip
            title="add a new bus route"
            placement="top"
            arrow
          >
            <AddCircleOutlineRounded
              color="primary"
              sx={{ fontSize: 28 }}
              onClick={() => setModalOpen(true)}
            />
          </Tooltip>
          <Tooltip
            title="Print the table"
            placement="top"
            arrow
          >
            <LocalPrintshopRounded color="primary" sx={{ fontSize: 28 }} />
          </Tooltip>
        </Stack>
      </Box>
      <Grid container>
        <Grid xs={12} md={6}>
          <Mobile />
        </Grid>
        <Grid xs={12} md={6}></Grid>
      </Grid>
      <AddBusModal isOpen={modalOpen} setIsOpen={setModalOpen} />
    </S.Container>
  );
};

export default Buses;
