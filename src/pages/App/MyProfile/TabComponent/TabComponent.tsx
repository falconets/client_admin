import { Tab, tabClasses, TabList} from "@mui/joy";

const TabComponent = () => {
  return (
      <TabList
        tabFlex={1}
        size="sm"
        sx={{
          pl: { xs: 0, md: 4 },
          justifyContent: "left",
          [`&& .${tabClasses.root}`]: {
            fontWeight: "600",
            flex: "initial",
            color: "text.tertiary",
            [`&.${tabClasses.selected}`]: {
              bgcolor: "transparent",
              color: "text.primary",
              "&::after": {
                height: "2px",
                bgcolor: "primary.500",
              },
            },
          },
        }}
      >
        <Tab sx={{ borderRadius: "6px 6px 0 0" }} variant="plain" indicatorInset value={0}>
          My Profile
        </Tab>
        <Tab sx={{ borderRadius: "6px 6px 0 0" }} variant="plain" indicatorInset value={1}>
          Team
        </Tab>
        <Tab sx={{ borderRadius: "6px 6px 0 0" }} variant="plain" indicatorInset value={2}>
          Billing
        </Tab>
      </TabList>
  );
};

export default TabComponent;
