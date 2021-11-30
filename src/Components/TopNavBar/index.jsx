import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import './index.scss'
import { AuthContext } from '../../Context/GlobalContext';
import { NavbarElContext } from '../../Context/GlobalContext';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MoreMenu from './MoreMenu';
import ImportDialog from './MoreMenu/ImportDialog'


export default function TopNavBar() {
  const [navbarEl, setNavbarEl] = React.useContext(NavbarElContext)
  const [auth, setAuth] = React.useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate()
  const [moreMenuAnchorEl, setMoreMenuAnchorEl] = React.useState(null);
  const [openImport, setOpenImport] = React.useState(false)



  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = event => {
    setAnchorEl(null);
    switch(event.target.dataset.action) {
      case 'logout':
        let loginLocalInfoKeys = ['token', 'account']
        for(let key of loginLocalInfoKeys) localStorage.removeItem(key)
        setNavbarEl({})
        navigate('/login', { replace: true })
        setAuth(false)
        break
      case 'profile':
        navigate('/profile', { replace: true })
        break
      default: break
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>      
      <AppBar className='nav-bar' position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Link to='/'>
            <img className='brand-logo' src='/brand_logo.png' alt="logo" style={{maxWidth:60}}/>
          </Link>
          <Box className='nav-bar__tabs-container' sx={{ flexGrow: 1 }} >
            {navbarEl.classroomTabs}
          </Box>
          {auth ? (
              <div>
                <IconButton
                  size="large"
                  aria-label="More features"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={ e => setMoreMenuAnchorEl(e.currentTarget)}
                  color="inherit"
                >
                  <MoreHorizIcon />
                </IconButton>
                <ImportDialog open={openImport} handleClose={() => setOpenImport(false)} />   
                <MoreMenu handleOpenImport={() => {setOpenImport(true)}} handleClose={() => setMoreMenuAnchorEl(null)} anchorEl={moreMenuAnchorEl} />
                {navbarEl.addButton}
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
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
                  onClose={handleCloseMenu}
                >
                  <MenuItem onClick={handleCloseMenu} data-action='profile'><AccountCircleOutlinedIcon />&nbsp;Profile</MenuItem>
                  <MenuItem onClick={handleCloseMenu} data-action='logout'><LogoutIcon />&nbsp;Logout</MenuItem>
                </Menu>
              </div>
            ) :
            (
            <Button component={Link} to='/login' className='bg-primary' variant="contained" endIcon={<LoginIcon />}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
