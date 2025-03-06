import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Paper, useMediaQuery, CircularProgress, List, ListItem, ListItemText } from "@mui/material";
import { SidebarWidth } from "../assets/global/Theme-variable";

const ChatHistory = ({ isSidebarOpen, sx, onSelectChat, setActiveComponent }) => {

  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const headerHeight = 64;
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    // Load chat history from localStorage
    const storedChats = JSON.parse(localStorage.getItem("chatHistory")) || [];
    setChatHistory(storedChats);
  }, []);

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
          <List>
            {chatHistory.length === 0 ? (
              <ListItem>
                <ListItemText primary="No chat history available" />
              </ListItem>
            ) : (
              chatHistory.map((chat) => (
                <ListItem 
                  key={chat.id} button="true" 
                  // onClick={() => onSelectChat(chat.id)} 
                  onClick={() => {
                    onSelectChat(chat.id);  
                    setActiveComponent("ChatWindow"); 
                  }} 
                  sx={{ cursor: "pointer" }}
                >
                  <ListItemText primary={chat.title} />
                </ListItem>
              ))
            )}
          </List>
        </Paper>

      </Box>
    );
};

export default ChatHistory;