import React, { useState } from "react";

import logo from "../../assets/signup.jpg";
import image from "../../assets/logo.png";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function Home({onHandleClick}) {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <AppBar position="static" color="inherit">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleClick}>
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>Dashboard</MenuItem>
                        <MenuItem>
                            <Button aria-controls="doubleDropdown" aria-haspopup="true" onClick={handleClick}>
                                Dropdown
                            </Button>
                            <Menu
                                id="doubleDropdown"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem>Overview</MenuItem>
                                <MenuItem>My downloads</MenuItem>
                                <MenuItem>Billing</MenuItem>
                                <MenuItem>Rewards</MenuItem>
                            </Menu>
                        </MenuItem>
                        <MenuItem>Earnings</MenuItem>
                        <MenuItem>Sign out</MenuItem>
                    </Menu>
                    <Typography variant="h6" component="div">
                        Flowbite
                    </Typography>
                    <Button color="primary" onClick={()=>{onHandleClick('Login')}}>Ver perfil</Button>
                </Toolbar>
            </AppBar>

            {/* Rest of your content */}
        </div>
    );
}

export default Home;
