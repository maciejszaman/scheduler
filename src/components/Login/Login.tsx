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

export const Login = ({ setUserData }: Types.LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayPasswordInput, setDisplayPasswordInput] = useState(false);

  const { auth, app } = useContext(FirebaseContext);

  const signup = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          const user = userCredential.user;
          setUserData(user);
        }
      );
    } catch (error: any) {
      toast.error("huj");
      console.log(error);
    }
  };

  const handleSubmitButton = async () => {
    const methods = await fetchSignInMethodsForEmail(auth, email);
    console.log(methods.length);
    if (methods.length === 0) {
      try {
        signup(email, password);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        login(email, password);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          const user = userCredential.user;
          setUserData(user);
          console.log(user);
        }
      );
    } catch (error: any) {
      toast.error("login huj");
      console.log(error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider).then((userCredential) => {
        const user = userCredential.user;
        setUserData(user);
        console.log(user);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (email.length > 3) {
      setDisplayPasswordInput(true);
    } else {
      setDisplayPasswordInput(false);
    }
  }, [email]);

  return (
    <>
      <Toaster />
      <Box padding={4}>
        <Typography variant="h4">Scheduler</Typography>
        <Divider />
        <Box paddingTop={4} display="flex" justifyContent="center">
          <form>
            <Box
              display="flex"
              flexDirection="column"
              gap={3}
              maxWidth={250}
              justifyContent="space-evenly"
            >
              <Typography variant="h6">Sign up</Typography>
              <TextField
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail"
                type="email"
              />
              <Collapse in={displayPasswordInput}>
                <TextField
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  type="password"
                />
              </Collapse>
              <Button variant="contained" onClick={handleSubmitButton}>
                Sign up or log in
              </Button>
              <Button variant="contained" onClick={handleGoogleSignIn}>
                Sign in with google
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </>
  );
};
