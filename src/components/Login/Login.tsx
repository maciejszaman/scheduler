import {
  Box,
  Button,
  Collapse,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../../providers/FireBaseProvider";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import * as Types from "./Login.types";
import toast, { Toaster } from "react-hot-toast";
import GoogleIcon from "@mui/icons-material/Google";
import { useForm } from "react-hook-form";
import { useLoginHook } from "./Login.hooks";

export const Login = (props: Types.LoginProps) => {
  const {
    onSubmit,
    handleGoogleSignIn,
    setDisplayPasswordInput,
    register,
    errors,
    displayPasswordInput,
  } = useLoginHook(props);

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
              <Typography variant="h6">Rejestracja</Typography>
              <TextField
                placeholder="E-mail"
                type="email"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <TextField
                placeholder="Password"
                type="password"
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
              <Button type="submit" variant="contained">
                Sign up or log in
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
