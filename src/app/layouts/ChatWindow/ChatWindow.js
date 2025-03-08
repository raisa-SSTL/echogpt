import React, { useState, useEffect, useRef} from "react";
import { Box, TextField, Button, useMediaQuery, CircularProgress, IconButton, InputAdornment, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { SidebarWidth } from "../../assets/global/Theme-variable"; // Sidebar width variable
import LogoIcon from "../Logo/LogoIcon";
import AddIcon from "@mui/icons-material/Add";
import LoopIcon from "@mui/icons-material/Loop";
import MicIcon from "@mui/icons-material/Mic";

const ChatWindow = ({ isSidebarOpen, sx, selectedChatId, onChatUpdate }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const headerHeight = 64; // Adjust according to your Header's height
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Load chat messages from localStorage when chat is selected
    if (selectedChatId) {
      const storedChats = JSON.parse(localStorage.getItem("chatHistory")) || [];
      const selectedChat = storedChats.find(chat => chat.id === selectedChatId);
      setMessages(selectedChat ? selectedChat.messages : []);
    }
  }, [selectedChatId]);

  useEffect(() => {
    // Scroll to bottom when messages update
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

    const handleSend = async () => { //enables chat updates through chat list
      if (input.trim() === "") return;
    
      // Add user's message to the chat
      const newMessages = [...messages, { text: input, sender: "user" }];
      setMessages(newMessages);
      setInput("");
      setLoading(true); // shows loading indicator
    
      try {
        const response = await fetch("https://api.echogpt.live/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "echogpt-3NR5iOFDib-xjA5yXdZot-kh3mCDi0Zp-UJTWFmG3YS-tYesdozpW4nVvXvZN1-XGdou", // Replace with your actual API key
          },
          body: JSON.stringify({
            messages: [{ role: "system", content: input }], // sends user input to API
            model: "EchoGPT",
          }),
        });
    
        const data = await response.json();
        const createdTime = data?.created || new Date().toISOString();
        const botResponse = data?.choices?.[0]?.message?.content || "I'm sorry, I didn't understand that.";
    
        // Add chatbot's response to the chat
        const updatedMessages = [...newMessages, { text: botResponse, sender: "bot", created: createdTime }];
        setMessages(updatedMessages);
    
        // Save the updated conversation to localStorage
        saveChatToHistory(updatedMessages);
    
      } catch (error) {
        console.error("Error:", error);
        setMessages([...newMessages, { text: "Error fetching response", sender: "bot" }]);
        saveChatToHistory([...newMessages, { text: "Error fetching response", sender: "bot", created: new Date().toISOString() }]);
      } finally {
        setLoading(false);
      }
    };

    const saveChatToHistory = (updatedMessages) => {
      let chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
  
      if (selectedChatId) {
        chatHistory = chatHistory.map(chat => 
          chat.id === selectedChatId ? { ...chat, messages: updatedMessages } : chat
        );
      } 
      else {
        const newChat = {
          id: Date.now().toString(),
          title: updatedMessages[0]?.text.slice(0, 20) || "New Chat",
          messages: updatedMessages,
        };
        chatHistory.push(newChat);
      }
  
      localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
      onChatUpdate(); // Notify ChatHistory component to update list
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
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          padding: 2,
        }}
      >
         {/* for no messages */}
        {messages.length === 0 ? (
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              height: "100%", 
            }}
          >
            <Box sx={{ width: 80, height: 80, marginBottom: 2 }}>
              <LogoIcon sx={{ width: "100%", height:"100%" }} /> {/* Logo */}
            </Box>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              EchoGPT
            </Typography>
            <Typography variant="body1" color="text.secondary" maxWidth="80%">
              Interact with EchoGPT, an AI that reflects your input for quick ideas, summaries, or feedback.
            </Typography>
          </Box>
        ) : (
        messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
              marginBottom: 1,
              alignItems: "flex-end",
              position: "relative",
              marginLeft: msg.sender === "bot" ? "40px" : "0px",
            }}
          >
            {msg.sender === "bot" && (
              <Box
                sx={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  position: "absolute",
                  left: -45, // Adjusted to appear outside the chat bubble
                  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
                  backgroundColor: "#fff", // Optional: background color
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                 <LogoIcon style={{ width: 30, height: 30 }} />
              </Box>
            )}
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
        ))
      )}
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
            <CircularProgress size={24} />
          </Box>
        )}
        {/* Invisible div for auto-scrolling */}
        <div ref={messagesEndRef} />
      </Box>

      {/* Chat Input */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#f4f4f8",
          borderRadius: "24px",
          padding: "10px 15px",
          boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
          width: "100%",
        }}
      >
        {/* Plus Button (New Chat) */}
        <IconButton sx={{ color: "#713cf4", margin: "10px 10px", }}>
          <AddIcon />
        </IconButton>

        {/* Text Input Field */}
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Ask a question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "24px",
              backgroundColor: "#fff",
              paddingLeft: "12px",
              paddingRight: "12px",
              "& fieldset": { border: "none" },
            },
            "& .MuiInputBase-input": {
              padding: "10px 14px",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {loading ? (
                  <LoopIcon sx={{ animation: "spin 1s linear infinite" }} />
                ) : (
                  <MicIcon sx={{ color: "#555" }} />
                )}
              </InputAdornment>
            ),
          }}
        />

        {/* Send Button */}
        <IconButton
          onClick={handleSend}
          disabled={loading}
          sx={{
            backgroundColor: "#713cf4",
            color: "#fff",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            margin: "10px 10px",
            "&:hover": { backgroundColor: "#5a2ec2" },
          }}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatWindow;
