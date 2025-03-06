"use client";
import React from "react";
import {
    Box,
    Drawer,
    useMediaQuery,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Button
  } from "@mui/material";
  import {SidebarWidth} from "../../assets/global/Theme-variable";
  import LogoIcon from "../Logo/LogoIcon";
  import Menuitems from "./data";
  import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

  const Sidebar = (props) => {

    const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

    const SidebarContent = (
        <Box sx={{ p: 3, height: "calc(100vh - 40px)" }}>
            <Box sx={{ display: "flex", alignItems: "Center", gap: "10px"}}>
              <LogoIcon style={{ width: 40, height: 40 }} />
              {/* <div className="text-[24px] font-[900] text-black dark:text-white tracking-[10px] logo-text">EchoGPT</div> */}
              <div className="relative"> 
                <div className="text-[24px] font-[900] text-[#713cf4]  tracking-[10px] logo-text">
                  EchoGPT
                </div>
                <div className="text-[24px] font-[900] text-[#713cf4] tracking-[10px] logo-text absolute bottom-[-20px] left-0 transform scale-y-[-1] opacity-40 bg-gradient-to-t from-[#713cf4] to-white bg-clip-text text-transparent">
                  EchoGPT
                </div>
              </div>
            </Box>

          {/* New Chat Button */}
            <Box sx={{ mt: 5, mb: 2, textAlign: "center" }}>
                <Button 
                    variant="contained" 
                    // color="primary" 
                    startIcon={<ChatBubbleOutlineIcon />}
                    sx={{ backgroundColor: "#713cf4", "&:hover": { backgroundColor: "#5a2dbd" } }}
                    fullWidth
                    // onClick={() => props.setActiveComponent("ChatWindow")}
                    onClick={() => {
                      props.setActiveComponent("ChatWindow"); // Set active component
                      window.location.reload(); 
                    }}           
                    cursor="pointer"
                >
                    New Chat
                </Button>
            </Box>
    
            {/* Sidebar Menu */}
          <Box>
            <List
              sx={{
                mt: 4,
              }}
            >
              {Menuitems.map((item, index) => {
                return (
                  <ListItem
                      button="true"
                      key={item.title}
                      onClick={() => props.setActiveComponent("ChatHistory")}
                      // to={item.href}
                      sx={{
                        mb: 1,
                        cursor: "pointer"
                      }}
                    >
                      <ListItemIcon>
                        <item.icon width="20" height="20" />
                      </ListItemIcon>
                      <ListItemText>{item.title}</ListItemText>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Box>
      );
      if (lgUp) {
        return (
          <Drawer
            anchor="left"
            open={props.isSidebarOpen}
            variant="persistent"
            PaperProps={{
              sx: {
                width: SidebarWidth,
              },
            }}
          >
            <Box sx={{ height: "100%", backgroundColor: "#ded2f9" }}>
                {SidebarContent}
            </Box>
          </Drawer>
        );
      }

    return (
        <Drawer
          anchor="left"
          open={props.isMobileSidebarOpen}
          onClose={props.onSidebarClose}
          PaperProps={{
            sx: {
              width: SidebarWidth,
            },
          }}
          variant="temporary"
        >
            <Box sx={{ height: "100%", backgroundColor: "#ded2f9" }}>
                {SidebarContent}
            </Box>
        </Drawer>
    );
  };

  export default Sidebar;
