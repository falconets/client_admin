import CustomAvatar from "@common/CustomAvatar";
import ModeToggle from "@common/ModeToggle";
import Toggler from "@common/Toggler";
import {
  AltRouteRounded,
  BrightnessAutoRounded,
  DashboardRounded,
  GroupRounded,
  KeyboardArrowDown,
  CalendarMonthRounded,
  AccountCircleRounded,
  PersonAddAlt1Rounded,
  ManageAccountsRounded,
  DirectionsBusRounded,
  StyleRounded,
  LeaderboardRounded,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  GlobalStyles,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  listItemButtonClasses,
  ListItemContent,
  Sheet,
  Typography,
} from "@mui/joy";
import { closeSidebar } from "../../../utils";
import { useMatch, useNavigate } from "react-router-dom";
import Routes from "@route";

const Sidebar = () => {
  const navigate = useNavigate();

  const dashboardMatch = !!useMatch(Routes.dashboard);
  const manageRoutesMatch = !!useMatch(Routes.manageRoutes);
  const myProfileMatch = !!useMatch(Routes.myProfile);
  const newUserMatch = !!useMatch(Routes.newUser);
  const rolesMatch = !!useMatch(Routes.roles);
  const scheduleMatch = !!useMatch(Routes.schedule);
  const busesMatch = !!useMatch(Routes.buses);
  const overviewMatch =!!useMatch(Routes.overview);

  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: { xs: "fixed", md: "sticky" },
        transform: {
          xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
          md: "none",
        },
        transition: "transform 0.4s, width 0.4s",
        zIndex: 10000,
        height: "100dvh",
        width: "var(--Sidebar-width)",
        top: 0,
        pl: 2,
        pt: 2,
        pb: 1,
        pr: 1,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRight: "1px solid",
        borderColor: "divider",
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ":root": {
            "--Sidebar-width": "220px",
            [theme.breakpoints.up("lg")]: {
              "--Sidebar-width": "240px",
            },
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: "fixed",
          zIndex: 9998,
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          opacity: "var(--SideNavigation-slideIn)",
          backgroundColor: "var(--joy-palette-background-backdrop)",
          transition: "opacity 0.4s",
          transform: {
            xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))",
            lg: "translateX(-100%)",
          },
        }}
        onClick={() => closeSidebar()}
      />
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <IconButton variant="soft" color="primary" size="sm">
          <BrightnessAutoRounded />
        </IconButton>
        <Typography level="title-lg">Bushub</Typography>
        <ModeToggle sx={{ ml: "auto" }} />
      </Box>
      <Box
        sx={{
          minHeight: 0,
          overflow: "hidden auto",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        <List
          size="sm"
          sx={{
            gap: 1,
            position: "relative",
            "--List-nestedInsetStart": "30px",
            "--ListItem-radius": (theme) => theme.vars.radius.sm,
          }}
        >
          <ListItem>
            <ListItemButton
              selected={dashboardMatch}
              onClick={() => navigate(Routes.dashboard)}
            >
              <DashboardRounded />
              <ListItemContent>
                <Typography level="title-sm">Dashboard</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton
              selected={busesMatch}
              onClick={() => navigate(Routes.buses)}
            >
                <DirectionsBusRounded />
              <ListItemContent>
                <Typography level="title-sm">Buses</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton
              selected={manageRoutesMatch}
              onClick={() => navigate(Routes.manageRoutes)}
            >
              <AltRouteRounded />
              <ListItemContent>
                <Typography level="title-sm">Manage Routes</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton
              selected={scheduleMatch}
              onClick={() => navigate(Routes.schedule)}
            >
              <CalendarMonthRounded />
              <ListItemContent>
                <Typography level="title-sm">Schedules</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem nested>
            <Toggler
              renderToggle={({ open, setOpen }) => (
                <ListItemButton
                  onClick={() => {
                    setOpen(!open);
                  }}
                >
                  <GroupRounded />
                  <ListItemContent>
                    <Typography level="title-sm">Users</Typography>
                  </ListItemContent>
                  <KeyboardArrowDown
                    sx={{ transform: open ? "rotate(180deg)" : "none" }}
                  />
                </ListItemButton>
              )}
              defaultExpanded
            >
              <List sx={{ gap: 0.5 }}>
                <ListItem sx={{ mt: 0.5 }}>
                  <ListItemButton
                    selected={myProfileMatch}
                    onClick={() => navigate(Routes.myProfile)}
                  >
                    <AccountCircleRounded />
                    <ListItemContent>
                    <Typography level="title-sm">My profile</Typography>
                    </ListItemContent>
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton
                    selected={newUserMatch}
                    onClick={() => navigate(Routes.newUser)}
                  >
                    <PersonAddAlt1Rounded />
                    <ListItemContent>
                    <Typography level="title-sm">Create user</Typography>
                    </ListItemContent>
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton
                    selected={rolesMatch}
                    onClick={() => navigate(Routes.roles)}
                  >
                    <ManageAccountsRounded />
                    <ListItemContent>
                    <Typography level="title-sm">Roles & permissions</Typography>
                    </ListItemContent>
                  </ListItemButton>
                </ListItem>
              </List>
            </Toggler>
          </ListItem>

          <ListItem nested>
            <Toggler
              renderToggle={({ open, setOpen }) => (
                <ListItemButton
                  onClick={() => {
                    setOpen(!open);
                  }}
                >
                  <StyleRounded />
                  <ListItemContent>
                    <Typography level="title-sm">Bookings</Typography>
                  </ListItemContent>
                  <KeyboardArrowDown
                    sx={{ transform: open ? "rotate(180deg)" : "none" }}
                  />
                </ListItemButton>
              )}
              defaultExpanded
            >
              <List sx={{ gap: 0.5 }}>
                <ListItem sx={{ mt: 0.5 }}>
                  <ListItemButton
                    selected={overviewMatch}
                    onClick={() => navigate(Routes.overview)}
                  >
                    <LeaderboardRounded />
                    <ListItemContent>
                    <Typography level="title-sm">Overview</Typography>
                    </ListItemContent>
                  </ListItemButton>
                </ListItem>
                {/* <ListItem>
                  <ListItemButton
                    selected={newUserMatch}
                    onClick={() => navigate(Routes.newUser)}
                  >
                    <PersonAddAlt1Rounded />
                    <ListItemContent>
                    <Typography level="title-sm">Create user</Typography>
                    </ListItemContent>
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton
                    selected={rolesMatch}
                    onClick={() => navigate(Routes.roles)}
                  >
                    <ManageAccountsRounded />
                    <ListItemContent>
                    <Typography level="title-sm">Roles & permissions</Typography>
                    </ListItemContent>
                  </ListItemButton>
                </ListItem> */}
              </List>
            </Toggler>
          </ListItem>

          <Box sx={{ position: "absolute", bottom: 0, width: "100%" }}>
            <Divider />
            <CustomAvatar />
          </Box>
        </List>
      </Box>
    </Sheet>
  );
};

export default Sidebar;
