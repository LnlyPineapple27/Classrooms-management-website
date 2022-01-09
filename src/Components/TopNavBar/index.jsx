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
import { AuthContext } from '../../Context/GlobalContext';
import { NavbarElContext } from '../../Context/GlobalContext';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MoreMenu from './MoreMenu';
import ImportDialog from './MoreMenu/ImportDialog'
import { MagicBellProvider } from "@magicbell/react-headless";
import SendIcon from '@mui/icons-material/Send';
import NotificationsBell from './BellButton'
import SendNotification from '../../APIs/SendNotification'
export default function TopNavBar() {
  const [navbarEl, setNavbarEl] = React.useContext(NavbarElContext)
  const [auth, setAuth] = React.useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate()
  const [moreMenuAnchorEl, setMoreMenuAnchorEl] = React.useState(null);
  const [openImport, setOpenImport] = React.useState(false)

  const sendNoti = async (event) => {
    const title = "Test API number 3";
    const content = "This is a test notification";
    const receivers = [{external_id: '2'}, ]
    const response = await SendNotification.sendNotification(title, content, receivers)
    
    //console.log("Notification APi response:", response)
    if(response.status === 201) {
      console.log("Notification sent successfully")
    }
    else {
      console.log("Notification failed", response)
    }
  }
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
        let accountInfo = JSON.parse(localStorage.getItem("account") ?? "") ?? {}
        let id = accountInfo.userID
        navigate(`/profile/${id}`, { replace: true })
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
          <Box className='nav-bar__tabs-container' sx={{ mx: "auto" }} >
            {navbarEl.classroomTabs}
          </Box>
           {/* {auth ? (<MagicBell
                apiKey="95cd7bd4a5452bd5ee1f798615475395c4d4d935"
                userExternalId={JSON.parse(localStorage.getItem("account")).userID}
                theme={theme}
              >
              {(props) => <FloatingNotificationInbox width={400} height={500} {...props} />}
           
              </MagicBell>)
              : null
          }  */}
          
          {auth ? (
              <MagicBellProvider
                apiKey={process.env.REACT_APP_X_MAGICBELL_API_KEY}
                userExternalId={JSON.parse(localStorage.getItem("account")).userID}
              >
                <NotificationsBell/>
              </MagicBellProvider>
          )
          : null}
          {auth ? (
            
              <div>
                {/* <IconButton
                  size="large"
                  aria-label="More features"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={ e => {sendNoti(e)}}
                  color="inherit"
                >
                  <SendIcon />
                </IconButton> */}
                
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
