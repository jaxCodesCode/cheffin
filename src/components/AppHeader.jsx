import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { NavLink, Outlet } from 'react-router-dom';
import componentStyles from '@/styles/AppHeader.module.scss';
import PropTypes from 'prop-types'

const pages = [{title: 'My Recipes', route: 'recipes'}, {title: 'New Recipe', route: '/new-recipe'}];

function AppHeader({ handleLogout }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  
  return (
    <>
      <AppBar position="fixed" sx={{ height: { xs: '56px', sm: '65px' }}}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* App icon and title - medium or bigger */}
            <AdbIcon sx={{ display: { xs: 'none', sm: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="p"
              sx={{
                mr: 2,
                display: { xs: 'none', sm: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              cheffin
            </Typography>

            {/* Menu trigger and menu - xtra small and smaller */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', sm: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                    {/* <Typography textAlign="center">{page.title}</Typography> */}
                    <NavLink key={page.title}
                      to={page.route} 
                      className={({isActive}) => [
                        componentStyles.menuNavLink,
                        isActive ? componentStyles.activeMenuNavLink : ''
                      ].join(' ')}>
                  {page.title}
                </NavLink>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* App icon and title - xtra small or smaller */}
            <AdbIcon sx={{ display: { xs: 'flex', sm: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: 'flex', sm: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              cheffin
            </Typography>

            {/* App links - medium and bigger */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }}>
              {pages.map((page) => (
                <NavLink key={page.title}
                      to={page.route} 
                      className={({isActive}) => [
                        componentStyles.navLink,
                        isActive ? componentStyles.active : ''
                      ].join(' ')}>
                  {page.title}
                </NavLink>
              ))}
            </Box>

            {/* Logout Button */}
            <Box sx={{ flexGrow: 0 }}>
              <Button onClick={() => handleLogout()}
                    color='secondary' 
                    sx={{ display: 'flex', color: 'white' }}>
                Logout
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      
      <div className={componentStyles.outletContainer}>
        <Outlet />
      </div>
    </>
  );
}

AppHeader.propTypes = {
  handleLogout: PropTypes.func
}

export default AppHeader;