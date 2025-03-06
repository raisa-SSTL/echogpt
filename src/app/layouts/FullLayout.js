"use client"; 
import React, {useState} from "react"
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

    return (
        <MainWrapper>
            <Header
                sx={{
                paddingLeft: isSidebarOpen && lgUp ? "265px" : "",
                // backgroundColor: "#ffffff",
                backgroundColor: "orange",
                }}
                toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
                toggleMobileSidebar={() => setMobileSidebarOpen(true)}
            />
            <Sidebar
                isSidebarOpen={isSidebarOpen}
                isMobileSidebarOpen={isMobileSidebarOpen}
                onSidebarClose={() => setMobileSidebarOpen(false)}
                setActiveComponent={setActiveComponent}
            />
            {activeComponent === "ChatWindow" ? (
              <ChatWindow isSidebarOpen={isSidebarOpen} sx={{ marginTop: "64px" }}  />
            ) : (
              <ChatHistory isSidebarOpen={isSidebarOpen} sx={{ marginTop: "64px" }}  />
            )}
        </MainWrapper>
    );

};

export default FullLayout;