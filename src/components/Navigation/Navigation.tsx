import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
} from "@mui/material";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import * as Types from "./Navigation.types";
import TodayIcon from "@mui/icons-material/Today";
import EventNoteIcon from "@mui/icons-material/EventNote";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { ViewModes } from "../../shared/enums/enum";
import MenuIcon from "@mui/icons-material/Menu";
import { EventMenu } from "../EventMenu/EventMenu";

export const Navigation = ({
  setDarkMode,
  setViewMode,
  viewMode,
  darkMode,
  userData,
}: Types.NavigationProps) => {
  const [open, setOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (newState: boolean) => {
    setDrawerOpen(newState);
  };

  const handleDarkModeChange = () => {
    setDarkMode(!darkMode);
  };

  const handleViewChange = (
    viewMode: ViewModes | ((prevState: ViewModes) => ViewModes)
  ) => {
    setViewMode(viewMode);
  };

  const handleAddButton = () => {
    setOpen(true);
  };

  return (
    <>
      <Box p={2} display="flex" justifyContent="space-between">
        <Box gap={2} className="hidden md:flex">
          <IconButton
            disabled={userData ? false : true}
            aria-label="dodaj wydarzenie"
            onClick={handleAddButton}
          >
            <AddIcon />
          </IconButton>
        </Box>
        <Box className="hidden md:flex" gap={2}>
          <IconButton
            aria-label="widok dzienny"
            disabled={userData ? false : true}
            color={viewMode === ViewModes.DailyView ? "primary" : "default"}
            onClick={() => handleViewChange(ViewModes.DailyView)}
          >
            <TodayIcon />
          </IconButton>
          <IconButton
            aria-label="widok tygodniowy"
            disabled={userData ? false : true}
            color={viewMode === ViewModes.WeeklyView ? "primary" : "default"}
            onClick={() => handleViewChange(ViewModes.WeeklyView)}
          >
            <EventNoteIcon />
          </IconButton>
          <IconButton
            aria-label="widok miesięczny"
            disabled={userData ? false : true}
            color={viewMode === ViewModes.MonthlyView ? "primary" : "default"}
            onClick={() => handleViewChange(ViewModes.MonthlyView)}
          >
            <CalendarMonthIcon />
          </IconButton>
        </Box>
        <Box display="flex" gap={2}>
          {userData && userData.photoURL ? (
            <Avatar alt="Avatar użytkownika" src={userData.photoURL} />
          ) : (
            <Avatar alt="Avatar użytkownika">
              {userData?.displayName?.slice(0, 1)}
            </Avatar>
          )}
          <IconButton aria-label="dark-mode" onClick={handleDarkModeChange}>
            {darkMode ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </Box>
        <Box className="md:hidden">
          <IconButton disabled={!userData} onClick={() => toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
        </Box>
      </Box>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => toggleDrawer(false)}
      >
        <List>
          <ListItem>
            <IconButton
              aria-label="widok dzienny"
              disabled={!userData}
              color={viewMode === ViewModes.DailyView ? "primary" : "default"}
              onClick={() => handleViewChange(ViewModes.DailyView)}
            >
              <TodayIcon />
            </IconButton>
          </ListItem>
          <ListItem>
            <IconButton
              aria-label="widok tygodniowy"
              disabled={!userData}
              color={viewMode === ViewModes.WeeklyView ? "primary" : "default"}
              onClick={() => handleViewChange(ViewModes.WeeklyView)}
            >
              <EventNoteIcon />
            </IconButton>
          </ListItem>
          <ListItem>
            <IconButton
              aria-label="widok miesięczny"
              disabled={!userData}
              color={viewMode === ViewModes.MonthlyView ? "primary" : "default"}
              onClick={() => handleViewChange(ViewModes.MonthlyView)}
            >
              <CalendarMonthIcon />
            </IconButton>
          </ListItem>
          <Divider />
          <ListItem>
            <IconButton
              disabled={!userData}
              aria-label="Dodaj wydarzenie"
              onClick={handleAddButton}
            >
              <AddIcon />
            </IconButton>
          </ListItem>
        </List>
      </Drawer>
      {open && (
        <EventMenu
          eventId={undefined}
          userData={userData}
          open={open}
          setOpen={setOpen}
        />
      )}
    </>
  );
};
