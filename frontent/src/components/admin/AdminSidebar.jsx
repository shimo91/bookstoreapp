import React from 'react'
import { Container, Drawer, Grid, IconButton, List, Toolbar } from '@mui/material'
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ArticleIcon from '@mui/icons-material/Article';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ForumIcon from '@mui/icons-material/Forum';
import GradeIcon from '@mui/icons-material/Grade';
import { Link, matchPath, useLocation } from 'react-router-dom';
import { Divider } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const AdminSidebar = () => {
    const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  return (
    <>
    <Drawer variant="permanent" open={open}>
              {/* <Toolbar
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  px: [1],
                }}
              >
                <IconButton onClick={toggleDrawer}>
                  <ChevronLeftIcon />
                </IconButton>
              </Toolbar>
              <Divider /> */}
              <List component="nav">
                {/* {mainListItems}
                  <Divider sx={{ my: 1 }} />
                  {secondaryListItems} */}
                <Link to={'/dashboard'} sx={{ textDecoration: 'none' }}>
                  <ListItemButton
                    className="activatedLink"
                  >
                    <ListItemIcon>
                      <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Overview" />
                  </ListItemButton>
                </Link>
                <Link to={'/reference'} sx={{ textDecoration: 'none' }}>
                  <ListItemButton
                    className="activatedLink"
                  >
                    <ListItemIcon>
                      <ArticleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Reference Materials" />
                  </ListItemButton>
                </Link>

                <Divider sx={{ my: 1 }} />


                <Link to={'/week'} sx={{ textDecoration: 'none' }}>
                  <ListItemButton
                    className="activatedLink"
                  >
                    <ListItemIcon>
                      <AssignmentIcon />
                    </ListItemIcon>
                    <ListItemText primary="Weekly Reports" />
                  </ListItemButton>
                </Link>
                <Link to={'/report'} sx={{ textDecoration: 'none' }}>
                  <ListItemButton
                    className="activatedLink"
                  >
                    <ListItemIcon>
                      <AssessmentIcon />
                    </ListItemIcon>
                    <ListItemText primary="Final Report" />
                  </ListItemButton>
                </Link>
                <Link to={'/vivavoce'} sx={{ textDecoration: 'none' }}>
                  <ListItemButton
                    className="activatedLink"
                  >
                    <ListItemIcon>
                      <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Viva Voce" />
                  </ListItemButton>
                </Link>

                
              </List>
            </Drawer>
    </>
  )
}

export default AdminSidebar