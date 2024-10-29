import { ChevronRightRounded, HomeRounded } from "@mui/icons-material";
import { Box, Breadcrumbs, Link, Typography } from "@mui/material";
import appPageStore from "@store/appPageStore";

const BreadCrumb = () => {
  const { goTo } = appPageStore();

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
          onClick={() => goTo("dashboard")}
        >
          <HomeRounded />
        </Link>
        <Link
          underline="none"
          color="neutral"
          aria-label="user"
          onClick={() => goTo("my_profile")}
        >
          User
        </Link>
        <Typography color="primary" fontWeight={500} fontSize={12}>
          My profile
        </Typography>
      </Breadcrumbs>
    </Box>
  );
};

export default BreadCrumb;
