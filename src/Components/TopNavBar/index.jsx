import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AddIcon from '@mui/icons-material/Add';
import FormModal from '../Classroom/FormModal';
import useModal from '../../Hook/useModal';
import { Link, useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import './index.scss'

export default function TopNavBar({handleReload, handleLogin, isLogin}) {
  const [auth, setAuth] = React.useState(!!localStorage.getItem('token'));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {isShowing, toggle} = useModal();
  const navigate = useNavigate()

  React.useEffect(() => {
    setAuth(!!localStorage.getItem('token'))
  }, [isLogin])

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = event => {
    setAnchorEl(null);
    switch(event.target.dataset.action) {
      case 'logout':
        let loginLocalInfoKeys = ['token', 'account']
        for(let key of loginLocalInfoKeys) localStorage.removeItem(key)
        navigate('/login', { replace: true })
        handleLogin()
        break
      case 'profile':
        navigate('/profile', { replace: true })
        break
      default: break
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <FormModal 
        header="Add Class"
        openStatus={isShowing}
        handleClose={toggle}
        handleReload={handleReload}
      />
      
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
          <Box sx={{ flexGrow: 1 }} />
          {auth ? (
              <div>
                <IconButton
                  size="large"
                  aria-label="add classroom"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={toggle}
                >
                  <AddIcon />
                </IconButton>
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
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose} data-action='profile'><AccountCircleOutlinedIcon /> Profile</MenuItem>
                  <MenuItem onClick={handleClose} data-action='logout'><LogoutIcon />Logout</MenuItem>
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
