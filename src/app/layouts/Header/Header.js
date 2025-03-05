import React from "react";
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import AddToPhotosOutlinedIcon from '@mui/icons-material/AddToPhotosOutlined';

import {
    AppBar,
    Box,
    IconButton,
    Toolbar,
    Menu,
    MenuItem,
    Button,
    Avatar,
    Divider,
    ListItemIcon,
  } from "@mui/material";

  const Header = (props) => {

    // const [anchorEl5, setAnchorEl5] = React.useState(null);

    // const handleClick5 = (event) => {
    //     setAnchorEl5(event.currentTarget);
    // };
    // const handleClose5 = () => {
    //     setAnchorEl5(null);
    // };

    return (
        <AppBar sx={props.sx} elevation={0} className={props.customClass}>
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
                {/* <IconButton
                    aria-label="menu"
                    color="inherit"
                    aria-controls="dd-menu"
                    aria-haspopup="true"
                    onClick={handleClick5}
                    >
                    <AddToPhotosOutlinedIcon />
                </IconButton> */}
                {/* <Menu
                    id="dd-menu"
                    anchorEl={anchorEl5}
                    keepMounted
                    open={Boolean(anchorEl5)}
                    onClose={handleClose5}
                    anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
                    transformOrigin={{ horizontal: "left", vertical: "top" }}
                    sx={{
                        "& .MuiMenu-paper": {
                        width: "250px",
                        right: 0,
                        top: "70px !important",
                        },
                    }}
                >
                    <MenuItem onClick={handleClose5}>
                        <Avatar
                        sx={{
                            width: "35px",
                            height: "35px",
                        }}
                        />
                        <Box
                        sx={{
                            ml: 2,
                        }}
                        >
                        New account
                        </Box>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleClose5}>
                        <Avatar
                        sx={{
                            width: "35px",
                            height: "35px",
                        }}
                        />
                        <Box
                        sx={{
                            ml: 2,
                        }}
                        >
                        New Page
                        </Box>
                    </MenuItem>
                    <MenuItem onClick={handleClose5}>
                        <Avatar
                        sx={{
                            width: "35px",
                            height: "35px",
                        }}
                        />
                        <Box
                        sx={{
                            ml: 2,
                        }}
                        >
                        New Component
                        </Box>
                    </MenuItem>
                </Menu> */}
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
                // onClick={handleClick4}
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
                            width: "30px",
                            height: "30px",
                        }}
                        />
                    </Box>
                </Button>
            </Toolbar>
        </AppBar>
    );
  };

  export default Header;