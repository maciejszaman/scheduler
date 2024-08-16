import { Box, Button, Divider, TextField, Typography } from "@mui/material";

import * as Types from "./Login.types";
import { Toaster } from "react-hot-toast";
import GoogleIcon from "@mui/icons-material/Google";
import { useLoginHook } from "./Login.hooks";

export const Login = (props: Types.LoginProps) => {
  const { onSubmit, handleGoogleSignIn, register, errors } =
    useLoginHook(props);

  return (
    <>
      <Toaster />
      <Box padding={4}>
        <Typography variant="h4">Kalendarz</Typography>
        <Divider />
        <Box paddingTop={4} display="flex" justifyContent="center">
          <form onSubmit={onSubmit}>
            <Box
              display="flex"
              flexDirection="column"
              gap={3}
              maxWidth={250}
              justifyContent="space-evenly"
            >
              <Typography variant="h6">Zaloguj się</Typography>
              <TextField
                aria-label="Pole adresu e-mail"
                placeholder="Adres e-mail"
                type="email"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <TextField
                aria-label="Pole hasła"
                placeholder="Hasło"
                type="password"
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
              <Button aria-label="Logowanie" type="submit" variant="contained">
                Zaloguj się
              </Button>
              <Button
                startIcon={<GoogleIcon />}
                variant="contained"
                onClick={handleGoogleSignIn}
              >
                Zaloguj się z Google
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </>
  );
};
