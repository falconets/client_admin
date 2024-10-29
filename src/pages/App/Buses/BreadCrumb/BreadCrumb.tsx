import { ChevronRightRounded, HomeRounded } from "@mui/icons-material";
import { Box, Breadcrumbs, Link, Typography } from "@mui/material";
import Routes from "@route";
import { useNavigate } from "react-router-dom";

const BreadCrumb = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ px: { xs: 2, md: 6 } }}>
      <Breadcrumbs
        aria-label="breadcrumbs"
        separator={<ChevronRightRounded fontSize="small" />}
        sx={{ pl: 0 }}
      >
        <Link
          underline="none"
          color="neutral"
          aria-label="Home"
          onClick={() => navigate(Routes.dashboard)}
        >
          <HomeRounded />
        </Link>
        <Link
          underline="none"
          color="neutral"
          aria-label="user"
        >
          Manage Buses
        </Link>
        <Typography color="primary" fontWeight={500} fontSize={12}>
         Buses
        </Typography>
      </Breadcrumbs>
    </Box>
  );
};

export default BreadCrumb;
