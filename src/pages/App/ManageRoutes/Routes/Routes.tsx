import {
  AddCircleOutlineRounded,
  LocalPrintshopRounded,
} from "@mui/icons-material";
import { Box, Stack, Tooltip, Typography } from "@mui/joy";
import routeModuleStore from "@store/routeModuleStore";
import BreadCrumb from "../BreadCrumb";
import RoutesTable from "../RoutesTable";

const Routes = () => {
  const {handleOpen} = routeModuleStore()
  

  return (
    <Box
      className="routes"
      sx={{
        flex: 1,
        flexDirection: "column",
        minWidth: 0,
        gap: 1,
      }}
    >
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
        <Typography level="h2" component="h1">
          Routes
        </Typography>
        <Stack spacing={2} direction="row">
          <Tooltip
            title="add a new bus route"
            placement="top"
            size="sm"
            variant="soft"
            arrow
          >
            <AddCircleOutlineRounded color="primary" sx={{ fontSize: 28 }} onClick={handleOpen} />
          </Tooltip>
          <Tooltip
            title="Print the table"
            placement="top"
            size="sm"
            variant="soft"
            arrow
          >
            <LocalPrintshopRounded color="primary" sx={{ fontSize: 28 }} />
          </Tooltip>
        </Stack>
      </Box>

      <Box sx={{px: { sm: 2, md: 6 }}}>
        <RoutesTable />
      </Box>


    </Box>
  );
};

export default Routes;
