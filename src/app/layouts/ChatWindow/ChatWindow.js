import React, { useState, useEffect, useRef} from "react";
import { Box, TextField, Button, useMediaQuery, CircularProgress } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { SidebarWidth } from "../../assets/global/Theme-variable"; // Sidebar width variable
import LogoIcon from "../Logo/LogoIcon";

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

    // const handleSend = async () => {
    //     if (input.trim() === "") return;

    //     // Add user's message to the chat
    //     const newMessages = [...messages, { text: input, sender: "user" }];
    //     setMessages(newMessages);
    //     setInput("");
    //     setLoading(true); // Show loading indicator

    //     try {
    //     const response = await fetch("https://api.echogpt.live/v1/chat/completions", {
    //         method: "POST",
    //         headers: {
    //         "Content-Type": "application/json",
    //         "x-api-key": "echogpt-3NR5iOFDib-xjA5yXdZot-kh3mCDi0Zp-UJTWFmG3YS-tYesdozpW4nVvXvZN1-XGdou", // Replace with your actual API key
    //         },
    //         body: JSON.stringify({
    //         messages: [{ role: "system", content: input }], // Send user input to API
    //         model: "EchoGPT",
    //         }),
    //     });

    //     const data = await response.json();
    //     const botResponse = data?.choices?.[0]?.message?.content || "I'm sorry, I didn't understand that.";

    //     // Add chatbot's response to the chat
    //     const updatedMessages = [...newMessages, { text: botResponse, sender: "bot" }];
    //     setMessages(updatedMessages);

    //     // Save conversation to localStorage
    //     saveChatToHistory(updatedMessages);

    //     } catch (error) {
    //     console.error("Error:", error);
    //     setMessages([...newMessages, { text: "Error fetching response", sender: "bot" }]);
    //     } finally {
    //     setLoading(false);
    //     }
    // };

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
        const botResponse = data?.choices?.[0]?.message?.content || "I'm sorry, I didn't understand that.";
    
        // Add chatbot's response to the chat
        const updatedMessages = [...newMessages, { text: botResponse, sender: "bot" }];
        setMessages(updatedMessages);
    
        // Save the updated conversation to localStorage
        saveChatToHistory(updatedMessages);
    
      } catch (error) {
        console.error("Error:", error);
        setMessages([...newMessages, { text: "Error fetching response", sender: "bot" }]);
        saveChatToHistory([...newMessages, { text: "Error fetching response", sender: "bot" }]);
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
      } else {
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
          // backgroundColor: "#f4f4f4",
          // borderRadius: 2,
        }}
      >
        {messages.map((msg, index) => (
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
                // component="img"
                // src={}
                // alt="Bot"
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
        ))}
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
        <Button variant="contained" color="primary" onClick={handleSend} disabled={loading}>
          <SendIcon />
        </Button>
      </Box>
    </Box>
  );
};

export default ChatWindow;
