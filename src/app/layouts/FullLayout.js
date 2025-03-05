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

const MainWrapper = experimentalStyled("div")(({ theme }) => ({
    display: "flex",
    minHeight: "100vh",
    overflow: "hidden",
    width: "100%",
  }));

  const PageWrapper = experimentalStyled("div")(({ theme }) => ({
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
  
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.up("lg")]: {
      paddingTop: TopbarHeight,
    },
    [theme.breakpoints.down("lg")]: {
      paddingTop: "64px",
    },
  }));

const FullLayout = () => {

    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

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
            />
            <ChatWindow isSidebarOpen={isSidebarOpen} sx={{ marginTop: "64px" }}/>
        </MainWrapper>
    );

};

export default FullLayout;