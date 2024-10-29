import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import {
  AltRouteRounded,
  DashboardRounded,
  CalendarMonthRounded,
  DirectionsBusRounded,
  KeyboardArrowDown,
  LeaderboardOutlined,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import Routes from "@route";

const mainListItems = [
  { text: "Dashboard", icon: <DashboardRounded />, path: Routes.dashboard },
  { text: "Buses", icon: <DirectionsBusRounded />, path: Routes.buses },
  {
    text: "Manage Routes",
    icon: <AltRouteRounded />,
    path: Routes.manageRoutes,
  },
  { text: "Schedules", icon: <CalendarMonthRounded />, path: Routes.schedule },
  {
    text: "Users",
    icon: <AssignmentRoundedIcon />,
    path: "/users",
    subItems: [
      { text: "My profile", path: Routes.myProfile },
      { text: "Create user", path: Routes.newUser },
      { text: "Roles & permissions", path: "/task" },
    ],
  },{
    text: "Overview", icon: <LeaderboardOutlined /> , path: Routes.overview  }
];

export default function MenuContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const isSelected = (path: string) => location.pathname.startsWith(path);

  const handleToggle = (path: string) => {
    setOpenItems((prevOpenItems) => ({
      ...prevOpenItems,
      [path]: !prevOpenItems[path],
    }));
  };

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <React.Fragment key={index}>
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                selected={isSelected(item.path)}
                onClick={() =>
                  item.subItems
                    ? handleToggle(item.path)
                    : handleNavigation(item.path)
                }
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
                {item.subItems && (
                  <KeyboardArrowDown
                    sx={{
                      transform: openItems[item.path]
                        ? "rotate(180deg)"
                        : "none",
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
            {item.subItems && openItems[item.path] && (
              <List dense sx={{ pl: 4 }}>
                {item.subItems.map((subItem, subIndex) => (
                  <ListItem
                    key={subIndex}
                    disablePadding
                    sx={{ display: "block" }}
                  >
                    <ListItemButton
                      selected={isSelected(subItem.path)}
                      onClick={() => handleNavigation(subItem.path)}
                    >
                      <ListItemText primary={subItem.text} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            )}
          </React.Fragment>
        ))}
      </List>
    </Stack>
  );
}
