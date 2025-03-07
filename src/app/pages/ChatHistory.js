import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Paper, useMediaQuery, CircularProgress, List, ListItem, ListItemText, ListItemIcon, IconButton } from "@mui/material";
import { SidebarWidth } from "../assets/global/Theme-variable";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoIcon from "../layouts/Logo/LogoIcon";

const ChatHistory = ({ isSidebarOpen, sx, onSelectChat, setActiveComponent }) => {

  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const headerHeight = 64;
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    // Load chat history from localStorage
    const storedChats = JSON.parse(localStorage.getItem("chatHistory")) || [];
    setChatHistory(storedChats);
  }, []);

  const handleDeleteChat = (chatId) => {
    const updatedChats = chatHistory.filter(chat => chat.id !== chatId);
    setChatHistory(updatedChats);
    localStorage.setItem("chatHistory", JSON.stringify(updatedChats));
  };

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
                  className="border border-gray-300 rounded-lg p-3 mb-2 shadow-sm transition duration-200 flex items-center justify-between"
                  // onClick={() => onSelectChat(chat.id)} 
                  onClick={() => {
                    onSelectChat(chat.id);  
                    setActiveComponent("ChatWindow"); 
                  }} 
                  sx={{ cursor: "pointer", 
                          "&:hover": {
                          backgroundColor: "#d4c3f7", 
                          }, 
                  }}
                >
                   {/* Logo Icon */}
                  <ListItemIcon>
                    <LogoIcon style={{ width: 30, height: 30 }} />
                  </ListItemIcon>
                  {/* Chat Title */}
                  <ListItemText 
                    primary={chat.title} 
                    className="flex-grow"
                    primaryTypographyProps={{ style: { fontSize: "18px" } }} 
                   />
                  {/* Delete Icon */}
                  <IconButton onClick={(e) => { 
                    e.stopPropagation(); // Prevent triggering chat selection
                    handleDeleteChat(chat.id);
                  }}>
                    <DeleteIcon className="text-red-500 hover:text-red-700" />
                  </IconButton>
                </ListItem>
              ))
            )}
          </List>
        </Paper>

      </Box>
    );
};

export default ChatHistory;