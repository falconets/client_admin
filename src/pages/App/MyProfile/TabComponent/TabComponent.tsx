import { Tabs, Tab, useTheme } from "@mui/material";

const TabComponent = () => {
  const theme = useTheme();

  return (
    <Tabs
      value={0}
      variant="scrollable"
      scrollButtons="auto"
      sx={{
        pl: { xs: 0, md: 4 },
        justifyContent: "left",
        [`& .MuiTab-root`]: {
          fontWeight: 600,
          flex: "initial",
          color: theme.palette.text.secondary,
          "&.Mui-selected": {
            backgroundColor: "transparent",
            color: theme.palette.text.primary,
            "&::after": {
              content: '""',
              display: "block",
              height: "2px",
              backgroundColor: theme.palette.primary.main,
            },
          },
        },
      }}
    >
      <Tab label="My Profile" sx={{ borderRadius: "6px 6px 0 0" }} />
      <Tab label="Team" sx={{ borderRadius: "6px 6px 0 0" }} />
      <Tab label="Billing" sx={{ borderRadius: "6px 6px 0 0" }} />
    </Tabs>
  );
};

export default TabComponent;
