import React from "react";
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

import {
    AppBar,
    Box,
    IconButton,
    Toolbar,
    Menu,
    MenuItem,
    Button,
    Avatar,
  } from "@mui/material";

  const Header = (props) => {

    return (
        <AppBar sx={props.sx} elevation={0} className={props.customClass}>
        {/* <AppBar sx={{ position: "fixed", top: 0, width: "100%", zIndex: 1201 }} elevation={0} className={props.customClass}> */}
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="menu"
                    onClick={props.toggleMobileSidebar}
                    sx={{
                        display: {
                        lg: "none",
                        xs: "inline",
                        },
                    }}
                    >
                    <MenuOutlinedIcon width="20" height="20" />
                </IconButton>
                <Box flexGrow={1} />
                <Box
                    sx={{
                        // width: "1px",
                        // // backgroundColor: "rgba(0,0,0,0.1)",
                        // height: "25px",
                        ml: 1,
                    }}
                ></Box>
                <Button
                aria-label="menu"
                color="inherit"
                aria-controls="profile-menu"
                aria-haspopup="true"
                >
                    <Box
                        sx={{
                        display: "flex",
                        alignItems: "center",
                        }}
                    >
                        <Avatar
                        src="/assets/images/user.jpg"
                        alt="/assets/images/user.jpg"
                        sx={{
                            width: "35px",
                            height: "35px",
                        }}
                        />
                    </Box>
                </Button>
            </Toolbar>
        </AppBar>
    );
  };

  export default Header;