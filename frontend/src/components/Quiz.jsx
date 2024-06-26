import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

export const Quiz = () => {
  return (
    <Box className="flex justify-center items-center">
      <Outlet />
    </Box>
  );
};
