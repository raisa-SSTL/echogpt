"use client"; 
import React, {useState} from "react"
import {
    experimentalStyled,
    useMediaQuery,
    // Container,
    // Box,
  } from "@mui/material";
  import Header from "./Header/Header";
  import Sidebar from "./Sidebar/Sidebar";

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
        </MainWrapper>
    );

};

export default FullLayout;