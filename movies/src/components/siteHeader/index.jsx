import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router";
import { styled } from '@mui/material/styles';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const SiteHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const navigate = useNavigate();

  const menuOptions = [
    { label: "Home", path: "/" },
    { label: "Favorites", path: "/movies/favorites" },
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "Trending today", path: "/movies/trending/today" },
    { label: "Top rated", path: "/movies/top_rated" },
    { label: "Popular people", path: "/people/popular" },
  ];

  const handleOpenMenu = (e) => setAnchorEl(e.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);
  const handleSelect = (path) => {
    setAnchorEl(null);
    navigate(path);
  };
  /*const handleMenuSelect = (pageURL) => {
    setAnchorEl(null);
    navigate(pageURL);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };*/

  return (
    <>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <Typography variant="h5" sx={{ fontWeight: 800 }}>
            TMDB Client
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.85, ml: 3, flexGrow: 1 }}>
            All you ever wanted to know about Movies!
          </Typography>

          <Button
            color="inherit"
            startIcon={<MenuIcon />}
            onClick={handleOpenMenu}
            aria-controls={open ? "main-nav-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            Menu
          </Button>

          <Menu
            id="main-nav-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseMenu}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            {menuOptions.map((opt) => (
              <MenuItem key={opt.label} onClick={() => handleSelect(opt.path)}>
                {opt.label}
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;
