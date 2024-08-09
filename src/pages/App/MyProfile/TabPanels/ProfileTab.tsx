import {
  AspectRatio,
  Box,
  Button,
  Card,
  CardActions,
  CardOverflow,
  Divider,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Stack,
  TabPanel,
  TabPanelProps,
  Typography,
} from "@mui/joy";
import React, { useState } from "react";
import userStore from "@store/userStore";
import {
  DriveFileRenameOutlineRounded,
  EditRounded,
  EmailRounded,
} from "@mui/icons-material";

type props = TabPanelProps;

export const ProfileTab: React.FC<props> = ({ ...props }) => {
  const { userInfos } = userStore();
  const [editable, setEditable] = useState(false);

  const handleEditable = () => {
    setEditable(!editable);
  };
  return (
    <TabPanel value={props.value}>
      <Stack
        spacing={4}
        sx={{
          display: "flex",
          maxWidth: "800px",
          mx: "auto",
          px: { xs: 2, md: 6 },
          py: { xs: 2, md: 3 },
        }}
      >
        <Card>
          <Box sx={{ mb: 1, display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ mb: 1, alignSelf: "flex-start" }}>
              <Typography level="title-md" sx={{ textAlign: "start" }}>
                Personal info
              </Typography>
              <Typography level="body-sm" sx={{ textAlign: "start" }}>
                You can customize your information
              </Typography>
            </Box>
            <DriveFileRenameOutlineRounded
              onClick={handleEditable}
              color="primary"
            />
          </Box>
          <Divider />
          <Stack
            className="desktop-view"
            spacing={3}
            sx={{ display: { xs: "none", md: "flex" }, my: 1 }}
            direction="row"
          >
            <Stack direction="column" spacing={1}>
              <AspectRatio
                ratio="1"
                maxHeight={200}
                sx={{ flex: 1, minWidth: 120, borderRadius: "100%" }}
              >
                <img
                  src={userInfos?.avatar}
                  srcSet={userInfos?.avatar}
                  loading="lazy"
                  alt="user profile picture"
                />
              </AspectRatio>
              {editable && (
                <IconButton
                  aria-label="upload new picture"
                  size="sm"
                  variant="outlined"
                  color="neutral"
                  sx={{
                    bgcolor: "background.body",
                    position: "absolute",
                    zIndex: 2,
                    borderRadius: "50%",
                    left: 100,
                    top: 170,
                    boxShadow: "sm",
                  }}
                >
                  <EditRounded />
                </IconButton>
              )}
            </Stack>
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
              <Stack spacing={2} direction="row">
                <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    size="md"
                    placeholder="First name"
                    disabled={!editable}
                  />
                </FormControl>
                <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    size="md"
                    placeholder="Last name"
                    disabled={!editable}
                  />
                </FormControl>
              </Stack>
              <Stack direction="row" spacing={2}>
                <FormControl>
                  <FormLabel>Gender</FormLabel>
                  <Input size="md" defaultValue="M" disabled />
                </FormControl>
                <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    size="md"
                    type="email"
                    startDecorator={<EmailRounded />}
                    placeholder="email"
                    defaultValue="rich@test.com"
                    sx={{ flexGrow: 1 }}
                    disabled={!editable}
                  />
                </FormControl>
              </Stack>
              <Stack direction="row" spacing={2}>
                <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel>Phone Number</FormLabel>
                  <Input
                    type="text"
                    size="md"
                    defaultValue="0730009994"
                    disabled={!editable}
                  />
                </FormControl>
                <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel>Role</FormLabel>
                  <Input size="md" defaultValue="staff" disabled={!editable} />
                </FormControl>
              </Stack>
            </Stack>
          </Stack>
          <Stack
            className="mobile-view"
            direction="column"
            spacing={2}
            sx={{ display: { xs: "flex", md: "none" }, my: 1 }}
          >
            <Stack direction="column" spacing={2}>
              <Stack direction="row" spacing={1}>
                <AspectRatio
                  ratio="1"
                  maxHeight={108}
                  sx={{ flex: 1, maxWidth: 108, borderRadius: "100%" }}
                >
                  <img
                    src={userInfos?.avatar}
                    srcSet={userInfos?.avatar}
                    loading="lazy"
                    alt="user profile"
                  />
                </AspectRatio>
                {
                  editable && (
                  <IconButton
                        aria-label="upload new picture"
                        size="sm"
                        variant="outlined"
                        color="neutral"
                        sx={{
                        bgcolor: "background.body",
                        position: "absolute",
                        zIndex: 2,
                        borderRadius: "50%",
                        left: 85,
                        top: 180,
                        boxShadow: "sm",
                        }}
                  >
                        <EditRounded />
                  </IconButton>
                  )
                }
              </Stack>
              <Stack spacing={2} direction="column">
                <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    size="md"
                    placeholder="First name"
                    disabled={!editable}
                  />
                </FormControl>
                <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    size="md"
                    placeholder="Last name"
                    disabled={!editable}
                  />
                </FormControl>
              </Stack>
              <Stack direction="column" spacing={2}>
                <FormControl>
                  <FormLabel>Gender</FormLabel>
                  <Input size="sm" defaultValue="M" disabled />
                </FormControl>
                <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    size="sm"
                    type="email"
                    startDecorator={<EmailRounded />}
                    placeholder="email"
                    defaultValue="rich@test.com"
                    sx={{ flexGrow: 1 }}
                    disabled={!editable}
                  />
                </FormControl>
              </Stack>
              <Stack direction="column" spacing={2}>
                <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel>Phone Number</FormLabel>
                  <Input
                    type="text"
                    size="sm"
                    defaultValue="0730009994"
                    disabled={!editable}
                  />
                </FormControl>
                <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel>Role</FormLabel>
                  <Input size="sm" defaultValue="staff" disabled={!editable} />
                </FormControl>
              </Stack>
            </Stack>
          </Stack>

          {
            editable && (
            <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                  <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                  <Button size="sm" variant="outlined" color="neutral" onClick={()=> setEditable(false)}>
                  Cancel
                  </Button>
                  <Button size="sm" variant="solid">
                  Save
                  </Button>
                  </CardActions>
            </CardOverflow>
            )
          }
         
        </Card>
      </Stack>
    </TabPanel>
  );
};
