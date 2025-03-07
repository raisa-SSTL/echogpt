import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Paper, useMediaQuery, List, ListItem, ListItemText, ListItemIcon, IconButton, InputAdornment } from "@mui/material";
import { SidebarWidth } from "../assets/global/Theme-variable";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoIcon from "../layouts/Logo/LogoIcon";
import SearchIcon from "@mui/icons-material/Search";

const ChatHistory = ({ isSidebarOpen, sx, onSelectChat, setActiveComponent }) => {

  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const headerHeight = 64;
  const [chatHistory, setChatHistory] = useState([]);
  // const isSmallScreen = useMediaQuery("(max-width: 640px)");
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

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
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            // pl: 10,
            // pr: 10,
            // pt:3,
            px: 4,
            pt: 3,
            // backgroundColor: "#f4f4f4",
            borderRadius: 2,
          }}
        >
          {/* Title and Search Bar */}
          <Box className="relative flex items-center justify-between mb-10"
            sx={{
              display: "flex",
              flexDirection: isSmallScreen ? "column" : "row", // Stack on small screens
              alignItems: "center",
              justifyContent: "space-between",
              gap: isSmallScreen ? 2 : 0,
              mb: 3, // Spacing below the box
            }}
          >
            {/* Centered Title */}
            {/* <h3 className="absolute left-1/2 transform -translate-x-1/2 text-4xl font-semibold">Chat History</h3> */}
            <h3 
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                textAlign: "left",
                width: "100%",
              }}
            >
              Chat History
            </h3>

            {/* Search Bar */}
            <TextField
              variant="outlined"
              placeholder="Search chats..."
              size="small"
              className="w-1/4"
              sx={{ 
                minWidth: "200px", 
                width: isSmallScreen ? "100%" : "auto",
                borderRadius: "50px", // Round shape 
                "& .MuiOutlinedInput-root": { 
                  borderRadius: "50px" 
                } 
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="disabled" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

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
        </Box>

      </Box>
    );
};

export default ChatHistory;