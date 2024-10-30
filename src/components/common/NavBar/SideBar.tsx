import ModeToggle from "@common/ModeToggle";
import { BrightnessAutoRounded } from "@mui/icons-material";
import {
  Box,
  GlobalStyles,
  IconButton,
  Typography,
  listItemButtonClasses,
} from "@mui/material";
import { closeSidebar } from "../../../utils";
import MenuContent from "@common/MenuContent";
import CustomAvatar from "@common/CustomAvatar";

const Sidebar = () => {
  return (
    <Box
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
          opacity: 0,
          backgroundColor: "white",
          transition: "opacity 0.4s",
          transform: {
            xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))",
            lg: "translateX(-100%)",
          },
        }}
        onClick={closeSidebar}
      />
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <IconButton color="primary" size="small">
          <BrightnessAutoRounded />
        </IconButton>
        <Typography className="title-lg">Bushub</Typography>
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
          backgroundColor: 'white'
        }}
      >
        <MenuContent />
        <CustomAvatar />
      </Box>
    </Box>
  );
};

export default Sidebar;
