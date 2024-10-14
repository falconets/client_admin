import useBusRoutes from "@hooks/useBusRoutes";
import {
  Box,
  List,
  ListDivider,
  ListItem,
  ListItemContent,
  Switch,
  Typography,
} from "@mui/joy";
import React from "react";
import RowMenu from "./component/RowMenu";

const MobileTable: React.FC = () => {
  const { listOfBusRoutes, toggleBusRouteActive } = useBusRoutes();

  return (
    <Box sx={{ display: { xs: "block", sm: "none" } }}>
      {listOfBusRoutes &&
        listOfBusRoutes.map((route) => (
          <List key={route.id} size="sm" sx={{ "--ListItem-paddingX": 0 }}>
            <ListItem
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "start",
                px: '10px'
              }}
            >
              <ListItemContent sx={{ display: 'flex', flexDirection:'column', alignItems: 'start' }}>
                
                  <Typography fontWeight={600} gutterBottom>
                    {route.routeName}
                  </Typography>
                  <Typography level="body-xs" gutterBottom>
                    {route.startLocation} - {route.endLocation}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 0.5,
                      mb: 1,
                    }}
                  >
                    <Typography level="body-xs">
                      Distance: {route.distanceInKm} km
                    </Typography>
                    <Typography level="body-xs">&bull;</Typography>
                    <Typography level="body-xs">
                      Duration: {route.durationInHours} hrs
                    </Typography>
                    <Typography level="body-xs">&bull;</Typography>
                    <Typography level="body-xs">
                      Price: k{route.price}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <RowMenu routeId={route.id as string} />
                  </Box>
                
              </ListItemContent>
              <Box>
                <Switch
                  checked={route.active}
                  onChange={(event) =>
                    toggleBusRouteActive(route.id as string, event.target.checked)
                  }
                />

              </Box>
            </ListItem>
            <ListDivider />
          </List>
        ))}
    </Box>
  );
};

export default MobileTable;
