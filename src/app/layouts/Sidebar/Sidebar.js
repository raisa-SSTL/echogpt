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

    const [open, setOpen] = React.useState(true);
    // const { pathname } = useLocation();
    // const pathDirect = pathname;
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

    const SidebarContent = (
        <Box sx={{ p: 3, height: "calc(100vh - 40px)" }}>
          {/* <Link to="/"> */}
            <Box sx={{ display: "flex", alignItems: "Center", gap: "10px"}}>
              <LogoIcon style={{ width: 40, height: 40 }} />
              <div class="text-[24px] font-[900] text-black dark:text-white tracking-[10px] logo-text">EchoGPT</div>
            </Box>
          {/* </Link> */}

          {/* New Chat Button */}
            <Box sx={{ mt: 3, mb: 2, textAlign: "center" }}>
                <Button 
                    variant="contained" 
                    // color="primary" 
                    startIcon={<ChatBubbleOutlineIcon />}
                    sx={{ backgroundColor: "#713cf4", "&:hover": { backgroundColor: "#5a2dbd" } }}
                    fullWidth
                    // onClick={handleNewChat}
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
                //{/********SubHeader**********/}
    
                return (
                  <List component="li" disablePadding key={item.title}>
                    <ListItem
                    //   onClick={() => handleClick(index)}
                      button
                    //   component={NavLink}
                      to={item.href}
                    //   selected={pathDirect === item.href}
                      sx={{
                        mb: 1,
                        // ...(pathDirect === item.href && {
                        //   color: "black",
                        //   backgroundColor: (theme) =>
                        //     `${theme.palette.primary.main}!important`,
                        // }),
                      }}
                    >
                      <ListItemIcon
                        sx={{
                        //   ...(pathDirect === item.href && { color: "white" }),
                        }}
                      >
                        <item.icon width="20" height="20" />
                      </ListItemIcon>
                      <ListItemText>{item.title}</ListItemText>
                    </ListItem>
                  </List>
                );
              })}
            </List>
          </Box>
          {/* <Buynow /> */}
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
