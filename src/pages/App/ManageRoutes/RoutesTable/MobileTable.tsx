import useBusRoutes from "@hooks/useBusRoutes";
import {
  Box,
  List,
  ListItem,
  Divider,
  Switch,
  Typography,
} from "@mui/material";
import React from "react";
import RowMenu from "./component/RowMenu";

const MobileTable: React.FC = () => {
  const { listOfBusRoutes, toggleBusRouteActive } = useBusRoutes();

  return (
    <Box sx={{ display: { xs: "block", sm: "none" } }}>
      {listOfBusRoutes &&
        listOfBusRoutes.map((route) => (
          <List key={route.id} sx={{ padding: 0 }}>
            <ListItem
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                paddingX: 1,
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <Typography fontWeight={600} gutterBottom>
                  {route.routeName}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {route.startLocation} - {route.endLocation}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 0.5,
                    marginBottom: 1,
                  }}
                >
                  <Typography variant="body2">
                    Distance: {route.distanceInKm} km
                  </Typography>
                  <Typography variant="body2">&bull;</Typography>
                  <Typography variant="body2">
                    Duration: {route.durationInHours} hrs
                  </Typography>
                  <Typography variant="body2">&bull;</Typography>
                  <Typography variant="body2">
                    Price: k{route.price}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    marginBottom: 1,
                  }}
                >
                  <RowMenu routeId={route.id as string} />
                </Box>
              </Box>
              <Box>
                <Switch
                  checked={route.active}
                  onChange={(event) =>
                    toggleBusRouteActive(route.id as string, event.target.checked)
                  }
                />
              </Box>
            </ListItem>
            <Divider />
          </List>
        ))}
    </Box>
  );
};

export default MobileTable;
