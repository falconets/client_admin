import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormLabel,
  formLabelClasses,
  GlobalStyles,
  IconButton,
  Input,
  Link,
  Stack,
  Typography,
} from "@mui/joy";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import { FormEvent, useEffect } from "react";
import { useMutation } from "@apollo/client";
import mutations from "@api/mutations";
import { useAppContext } from "@credentials";
import ModeToggle from "@common/ModeToggle";
import { Key, EmailRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Routes from "../../../route";

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
  persistent?: HTMLInputElement;
}
interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

const Signin = () => {
  const [signIn, { error, loading }] = useMutation(mutations.signin);
  const { dispatch } = useAppContext();
  const navigate = useNavigate()

  useEffect(()=>{
    window.document.title = "BusHub"
  }, [])

  const handleSubmit = (event: FormEvent<SignInFormElement>) => {
    event.preventDefault();
    const formElements = event.currentTarget.elements;
    const data = {
      email: formElements.email.value,
      password: formElements.password.value,
    };

    if (data.email.trim() !== "" && data.password.trim() !== "") {
      signIn({
        variables: {
          email: data.email,
          password: data.password,
        },
      }).then((res) => {
        const [token, userId] = res.data.signIn.split(" ");
        console.log("Logged in successfully");
        dispatch({ type: "LOGIN", payload: { token, userId } });
        navigate('/')
      }).catch(error => console.error('error catched',error));
    } else {
      console.log("failed to sign in");
    }
  };

  if (error) {
    console.log(error);
  }
  return (
    <>
      <GlobalStyles
        styles={{
          ":root": {
            "--Collapsed-breakpoint": "769px", // form will stretch when viewport is below `769px`
            "--Cover-width": "50vw", // must be `vw` only
            "--Form-maxWidth": "800px",
            "--Transition-duration": "0.4s", // set to `none` to disable transition
          },
        }}
      />
      <Box
        sx={(theme) => ({
          width:
            "clamp(100vw - var(--Cover-width), (var(--Collapsed-breakpoint) - 100vw) * 999, 100vw)",
          transition: "width var(--Transition-duration)",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "flex-end",
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(255 255 255 / 0.2)",
          [theme.getColorSchemeSelector("dark")]: {
            backgroundColor: "rgba(19 19 24 / 0.4)",
          },
        })}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100dvh",
            width:
              "clamp(var(--Form-maxWidth), (var(--Collapsed-breakpoint) - 100vw) * 999, 100%)",
            maxWidth: "100%",
            px: 2,
          }}
        >
          {" "}
          <Box
            id="header-signin"
            component="header"
            sx={{
              py: 3,
              display: "flex",
              alignItems: "left",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ gap: 2, display: "flex", alignItems: "center" }}>
              <IconButton variant="soft" color="primary" size="sm">
                <BadgeRoundedIcon />
              </IconButton>
              <Typography level="title-lg">BusHub</Typography>
            </Box>
            <ModeToggle />
          </Box>
          <Box
            id="main-signin"
            component="main"
            sx={{
              my: "auto",
              py: 2,
              pb: 5,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: 400,
              maxWidth: "100%",
              mx: "auto",
              borderRadius: "sm",
              "& form": {
                display: "flex",
                flexDirection: "column",
                gap: 2,
              },
              [`& .${formLabelClasses.asterisk}`]: {
                visibility: "hidden",
              },
            }}
          >
            {" "}
            <Stack gap={4} sx={{ mb: 2 }}>
              <Stack gap={1}>
                <Typography level="h3">Sign in</Typography>
                <Typography level="body-sm">
                  New to company?{" "}
                  <Link onClick={() => navigate(Routes.signup)} level="title-sm">
                    Sign up!
                  </Link>
                </Typography>
              </Stack>
              <Button
                variant="soft"
                color="neutral"
                fullWidth
                // startDecorator={<GoogleIcon />}
              >
                Continue with Google
              </Button>
            </Stack>
            <Divider
              sx={(theme) => ({
                [theme.getColorSchemeSelector("light")]: {
                  color: { xs: "#FFF", md: "text.tertiary" },
                  "--Divider-lineColor": {
                    xs: "#FFF",
                    md: "var(--joy-palette-divider)",
                  },
                },
              })}
            >
              or
            </Divider>
            <Stack gap={4} sx={{ mt: 2 }}>
              <form onSubmit={handleSubmit} method="post">
                <FormControl required>
                  <FormLabel>Email</FormLabel>
                  <Input
                    startDecorator={<EmailRounded />}
                    type="email"
                    name="email"
                  />
                </FormControl>
                <FormControl required>
                  <FormLabel>Password</FormLabel>
                  <Input
                    startDecorator={<Key />}
                    type="password"
                    name="password"
                  />
                </FormControl>
                <Stack gap={4} sx={{ mt: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Checkbox size="sm" label="Remember me" name="persistent" />
                    <Link level="title-sm" href="#replace-with-a-link">
                      Forgot your password?
                    </Link>
                  </Box>
                  <Button type="submit" loading={loading} fullWidth>
                    Sign in
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Box>
          <Box component="footer" sx={{ py: 3 }}>
            <Typography level="body-xs" textAlign="center">
              © Zamhubticketbus {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={(theme) => ({
          height: "100%",
          position: "fixed",
          right: 0,
          top: 0,
          bottom: 0,
          left: "clamp(0px, (100vw - var(--Collapsed-breakpoint)) * 999, 100vw - var(--Cover-width))",
          transition:
            "background-image var(--Transition-duration), left var(--Transition-duration) !important",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          backgroundColor: "background.level1",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundImage:
           "url(https://res.cloudinary.com/dqtrhmkxd/image/upload/v1704442027/Designer_3_fxkagh.png)", 
          [theme.getColorSchemeSelector("dark")]: {
            backgroundImage:
              "url(https://res.cloudinary.com/dqtrhmkxd/image/upload/v1704442554/Designer_5_eew3nq.png)",
          },
        })}
      />
    </>
  );
};

export default Signin;
