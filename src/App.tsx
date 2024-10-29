import "./App.css";
import { Outlet } from "react-router-dom";
import Toast from "@common/Toast";
import { useEffect } from "react";
import NavBar from "@common/NavBar";
import Header from "@common/Header";
import { Box, Container, CssBaseline, ThemeProvider } from "@mui/material";
import theme from "@themes";


const App = () => {
  //const theme = useTheme();
  //const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    window.document.title = "BusHub";
  }, []);




  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100dvh", width: "100%" }}>
        <NavBar />
        <Header />
        <Toast />
        <Container
          component="main"
          className="MainContent"
          sx={{
            pt: { xs: "calc(12px + var(--Header-height))", md: 3 },
            pb: { xs: 2, sm: 2, md: 3 },
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minWidth: 300,
            width: "100%",
            height: "100dvh",
            gap: 1,
            overflow: "auto",
          }}
        >
          <Outlet />
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default App;
