import React, { useState } from "react";
import { Box, TextField, Button, Paper, useMediaQuery, CircularProgress } from "@mui/material";
import { SidebarWidth } from "../assets/global/Theme-variable";

const ChatHistory = ({ isSidebarOpen, sx }) => {

  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const headerHeight = 64;

    return (
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          height: `calc(100vh - ${headerHeight}px)`, // Prevent overlap with header
          marginLeft: lgUp && isSidebarOpen ? `${SidebarWidth}px` : "0px", // Adjust based on sidebar
          padding: 2,
          overflow: "hidden",
          ...sx
        }}
      >
        {/* Chat History List */}
        <Paper
          sx={{
            flex: 1,
            overflowY: "auto",
            padding: 2,
            backgroundColor: "#f4f4f4",
            borderRadius: 2,
          }}
        >
        
        </Paper>

      </Box>
    );
};

export default ChatHistory;