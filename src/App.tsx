import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Scheduler } from "@devexpress/dx-react-scheduler-material-ui";
import { Calendar } from "./components/Calendar/Calendar";
import { Navigation } from "./components/Navigation/Navigation";
import { createTheme, Divider, Paper, ThemeProvider } from "@mui/material";
import { ViewModes } from "./shared/enums/enum";
import FirebaseProvider from "./providers/FireBaseProvider";
import { Login } from "./components/Login/Login";
import { User, UserCredential } from "firebase/auth";
import { Toaster } from "react-hot-toast";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [viewMode, setViewMode] = useState(ViewModes.DailyView);
  const [userData, setUserData] = useState<User | null>(null);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Toaster
        toastOptions={
          darkMode
            ? {
                className: "",
                style: {
                  background: "#333",
                  color: "#fff",
                },
              }
            : {
                className: "",
                style: {
                  background: "#fff",
                  color: "#000",
                },
              }
        }
      />
      <FirebaseProvider>
        <Paper className="h-screen">
          <Navigation
            setViewMode={setViewMode}
            setDarkMode={setDarkMode}
            viewMode={viewMode}
            darkMode={darkMode}
            userData={userData}
          />
          {userData ? (
            <>
              <Divider />
              <Calendar userData={userData} viewMode={viewMode} />
            </>
          ) : (
            <Login setUserData={setUserData} />
          )}
        </Paper>
      </FirebaseProvider>
    </ThemeProvider>
  );
}

export default App;
