import { Box, Tabs } from "@mui/joy";
import BreadCrumb from "./BreadCrumb";
import TabComponent from "./TabComponent";
import Panel from "./TabPanels"

const MyProfile = () => {
  return (
    <Box className="my-profile" sx={{ flex: 1, width: "100%" }}>
      <Box
        sx={{
          position: "sticky",
          top: { sm: -100, md: -110 },
          bgcolor: "background.body",
          zIndex: 9995,
        }}
        className="layer-position"
      >
        <BreadCrumb />
        <Tabs
          defaultValue={0}
          sx={{
            bgcolor: "transparent",
          }}
        >
          <TabComponent />
          <Panel.ProfileTab value={0} />
          <Panel.TeamTab value={1} />
          <Panel.BillingTab value={2} />
        </Tabs>
      </Box>
    </Box>
  );
};

export default MyProfile;
