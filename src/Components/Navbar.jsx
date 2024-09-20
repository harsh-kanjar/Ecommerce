import { AppBar, Toolbar, IconButton, Typography, Button, Menu, MenuItem, Container, Box, Badge } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import DialogueBox from './DialogueBox';
import Search from './Search';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Home, ShoppingCart, AccountCircle } from '@mui/icons-material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  boxShadow: theme.shadows[4],
}));

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery('(max-width: 600px)'); // More mobile-friendly query

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/login");
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledAppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          {/* Brand Name */}
          <Typography
            variant={isMobile ? 'h6' : 'h5'} // Adjust text size for mobile
            component={Link}
            to="/"
            sx={{
              textDecoration: 'none',
              color: 'white',
              fontWeight: 'bold',
              '&:hover': {
                color: '#FFD700', // Hover effect
              }
            }}
          >
            Ecommerce
          </Typography>

          {/* Search Component - Only visible on larger screens */}
          {!isMobile && (
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
              <Search />
            </Box>
          )}

          {/* Navigation Icons */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {isMobile ? (
              <>
                {/* Mobile Menu */}
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleMenu}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose} component={Link} to="/" selected={location.pathname === "/"}>
                    <Home /> Home
                  </MenuItem>
                  {localStorage.getItem('token') ? (
                    <>
                      <MenuItem onClick={handleClose} component={Link} to="/cart" selected={location.pathname === "/cart"}>
                        <ShoppingCart /> Cart
                      </MenuItem>
                      <MenuItem onClick={handleClose} component={Link} to="/myorders" selected={location.pathname === "/myorders"}>
                        <LocalShippingIcon /> My Orders
                      </MenuItem>
                    </>
                  ) : (
                    <>
                      <MenuItem onClick={handleClose} component={Link} to="/login">
                        <ShoppingCart /> Cart
                      </MenuItem>
                      <MenuItem onClick={handleClose} component={Link} to="/login">
                        <LocalShippingIcon /> My Orders
                      </MenuItem>
                    </>
                  )}
                </Menu>
              </>
            ) : (
              <>
                {/* Desktop Navigation */}
                <Button color="inherit" component={Link} to="/" startIcon={<Home />} sx={{ margin: '0 10px' }}>
                  Home
                </Button>
                {localStorage.getItem('token') ? (
                  <>
                    <Button color="inherit" component={Link} to="/cart" startIcon={<ShoppingCart />} sx={{ margin: '0 10px' }}>
                      Cart
                    </Button>
                    <Button color="inherit" component={Link} to="/myorders" startIcon={<LocalShippingIcon />} sx={{ margin: '0 10px' }}>
                      My Orders
                    </Button>
                  </>
                ) : (
                  <>
                    <Button color="inherit" component={Link} to="/login" sx={{ margin: '0 10px' }}>
                      <ShoppingCart /> Cart
                    </Button>
                    <Button color="inherit" component={Link} to="/login" sx={{ margin: '0 10px' }}>
                      <LocalShippingIcon /> My Orders
                    </Button>
                  </>
                )}
              </>
            )}

            {/* Right-side Buttons */}
            {!localStorage.getItem('token') ? (
              <Box sx={{ display: 'flex', ml: 2 }}>
                <Button variant="outlined" color="inherit" component={Link} to="/login" sx={{ ml: 1, color: 'white', borderColor: 'white', '&:hover': { borderColor: '#FFD700', color: '#FFD700' } }}>
                  Login
                </Button>
                <Button variant="outlined" color="inherit" sx={{ ml: 2, color: 'white', borderColor: 'white', '&:hover': { borderColor: '#FFD700', color: '#FFD700' } }} component={Link} to="/signup">
                  Signup
                </Button>
              </Box>
            ) : (
              <DialogueBox
                text="Logout"
                alert="Are you sure?"
                message="Press agree to Logout from Ecommerce"
                onClickAgree={handleLogout}
              />
            )}

             
          </Box>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
};

export default Navbar;
