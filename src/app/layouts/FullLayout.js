"use client"; 
import React, {useState, useEffect} from "react"
import {
    experimentalStyled,
    useMediaQuery,
    Box,
    Container
  } from "@mui/material";
  import Header from "./Header/Header";
  import Sidebar from "./Sidebar/Sidebar";
  import ChatWindow from "./ChatWindow/ChatWindow";
  import { TopbarHeight } from "../assets/global/Theme-variable";
  import ChatHistory from "../pages/ChatHistory";

const MainWrapper = experimentalStyled("div")(({ theme }) => ({
    display: "flex",
    minHeight: "100vh",
    overflow: "hidden",
    width: "100%",
  }));

const FullLayout = () => {

    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
    const [activeComponent, setActiveComponent] = useState("ChatWindow");
    const [selectedChatId, setSelectedChatId] = useState(null);
    // const [activeChatId, setActiveChatId] = useState(null);
    // const [chatHistory, setChatHistory] = useState([]);

    const handleChatSelect = (chatId) => {
      setSelectedChatId(chatId);
    };

    const handleChatUpdate = () => {
      setSelectedChatId(null); 
    };

    // useEffect(() => {
    //   const storedChats = JSON.parse(localStorage.getItem("chatHistory")) || [];
    //   setChatHistory(storedChats);
    // }, []);

    // const handleSelectChat = (chatId) => {
    //   setActiveChatId(chatId);
    // };

    // Update localStorage when chat history changes
    // useEffect(() => {
    //   localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
    // }, [chatHistory]);

    return (
        <MainWrapper>
            <Header
                sx={{
                paddingLeft: isSidebarOpen && lgUp ? "265px" : "",
                backgroundColor: "#ffffff",
                // backgroundColor: "orange",
                }}
                toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
                toggleMobileSidebar={() => setMobileSidebarOpen(true)}
            />
            <Sidebar
                isSidebarOpen={isSidebarOpen}
                isMobileSidebarOpen={isMobileSidebarOpen}
                onSidebarClose={() => setMobileSidebarOpen(false)}
                setActiveComponent={setActiveComponent}
                activeComponent={activeComponent}
            />
            {activeComponent === "ChatWindow" ? (
              <ChatWindow isSidebarOpen={isSidebarOpen} sx={{ marginTop: "64px" }} selectedChatId={selectedChatId} onChatUpdate={handleChatUpdate} 
                // activeChatId={activeChatId} 
                // setActiveChatId={setActiveChatId} 
                // chatHistory={chatHistory} 
                // setChatHistory={setChatHistory} 
              />
            ) : (
              <ChatHistory isSidebarOpen={isSidebarOpen} sx={{ marginTop: "64px" }} onSelectChat={handleChatSelect} setActiveComponent={setActiveComponent} 
                // activeChatId={activeChatId} 
                // setActiveChatId={setActiveChatId} 
                // chatHistory={chatHistory} 
              />
            )}
        </MainWrapper>
    );

};

export default FullLayout;