import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FirebaseContext } from "../../providers/FireBaseProvider";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import * as Types from "./Login.types";
import { z } from "zod";
import { loginSchema } from "./Login.schema";
import ParseErrorMessage from "../../shared/ParseErrorMessage";

export const useLoginHook = ({ setUserData }: Types.LoginProps) => {
  const [displayPasswordInput, setDisplayPasswordInput] = useState(false);

  const { auth } = useContext(FirebaseContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof loginSchema>>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(loginSchema),
  });

  const signup = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          const user = userCredential.user;
          setUserData(user);
        }
      );
    } catch (error: any) {
      toast.error(ParseErrorMessage(error.code));
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
      toast.error(ParseErrorMessage(error.code));
    }
  };

  const onSubmit = handleSubmit(async (values) => {
    const methods = await fetchSignInMethodsForEmail(auth, values.email);
    if (methods.length === 0) {
      try {
        signup(values.email, values.password);
      } catch (error: any) {
        toast.error(ParseErrorMessage(error.code));
      }
    } else {
      try {
        login(values.email, values.password);
      } catch (error: any) {
        toast.error(ParseErrorMessage(error.code));
      }
    }
  });

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider).then((userCredential) => {
        const user = userCredential.user;
        setUserData(user);
        console.log(user);
      });
    } catch (error: any) {
      toast.error(ParseErrorMessage(error.code));
    }
  };

  return {
    handleGoogleSignIn,
    onSubmit,
    setDisplayPasswordInput,
    displayPasswordInput,
    register,
    errors,
  };
};
