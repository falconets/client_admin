import { useQuery } from "@apollo/client";
import { LogoutRounded } from "@mui/icons-material";
import { Avatar, Typography, IconButton, Box } from "@mui/material";
import queries from "@api/queries";
import { useAppContext } from "@credentials";
import userStore from "@store/userStore";
import { useEffect } from "react";

const CustomAvatar = () => {
  const { state, dispatch } = useAppContext();
  const { userInfos, setUserInfo } = userStore();
  const user = parseInt(state.userId as string);
  const { data, loading, error } = useQuery(queries.userById, {
    variables: { userByIdId: user },
  });

  useEffect(() => {
    if (!error && !loading && data) {
      setUserInfo(data.userById);
    }
  }, [loading, error, data, setUserInfo]);

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
      payload: undefined,
    });
  };

  return (
    <Box sx={{ display: "flex", gap: 1, alignContent: "space-between", mt: 1 }}>
      <Avatar variant="rounded" src={userInfos?.avatar} />
      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Typography
          className="title-sm"
          sx={{ display: "flex", justifyContent: "flex-start" }}
        >
          {userInfos?.first_name}
        </Typography>
        <Typography
          className="body-xs"
          sx={{ display: "flex", justifyContent: "flex-start" }}
        >
          {userInfos?.email}
        </Typography>
      </Box>
      <IconButton
        size="small"
        color="primary"
        onClick={handleLogout}
        sx={{
          cursor: "pointer",
        }}
      >
        <LogoutRounded />
      </IconButton>
    </Box>
  );
};

export default CustomAvatar;
