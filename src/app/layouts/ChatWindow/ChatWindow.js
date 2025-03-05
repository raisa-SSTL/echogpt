import React, { useState } from "react";
import { Box, TextField, Button, Paper, useMediaQuery } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { SidebarWidth } from "../../assets/global/Theme-variable"; // Sidebar width variable

const ChatWindow = ({ isSidebarOpen, sx }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const headerHeight = 64; // Adjust according to your Header's height

  const handleSend = () => {
    if (input.trim() !== "") {
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput("");
    }
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
      {/* Chat Messages */}
      <Paper
        sx={{
          flex: 1,
          overflowY: "auto",
          padding: 2,
          backgroundColor: "#f4f4f4",
          borderRadius: 2,
        }}
      >
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
              marginBottom: 1,
            }}
          >
            <Box
              sx={{
                backgroundColor: msg.sender === "user" ? "#713cf4" : "#e0e0e0",
                color: msg.sender === "user" ? "#fff" : "#000",
                padding: "8px 12px",
                borderRadius: "12px",
                maxWidth: "70%",
              }}
            >
              {msg.text}
            </Box>
          </Box>
        ))}
      </Paper>

      {/* Chat Input */}
      <Box
        sx={{
          display: "flex",
          gap: 1,
          marginTop: 2,
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
        />
        <Button variant="contained" color="primary" onClick={handleSend}>
          <SendIcon />
        </Button>
      </Box>
    </Box>
  );
};

export default ChatWindow;
