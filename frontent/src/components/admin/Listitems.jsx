import React from 'react'
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
import '../../css/admin/Dashboard.css'
import { Link, matchPath, useLocation } from 'react-router-dom';
import { Divider } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';


const Listitems = () => {
  const location=useLocation();
  const path=location.pathname;
 

  // Split the path based on "/"
  const pathParts = path.split("/");

  // Get the starting path (index 1)
  const startingPath = pathParts[1];
  //console.log("match : "+startingPath)

  return (
    <React.Fragment>
    <Link to={'/'}  sx={{textDecoration:'none'}}>
    <ListItemButton 
    className={path === '/' ? 'activatedLink' : ''}
    >
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Rent Requests" />
    </ListItemButton>
    </Link>
    <Link to={'/'}  sx={{textDecoration:'none'}}>
    <ListItemButton 
    className={path === '/' ? 'activatedLink' : ''}
    >
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Users" />
    </ListItemButton>
    </Link>
    <Link to={'/'}  sx={{textDecoration:'none'}}>
    <ListItemButton 
    className={path === '/' ? 'activatedLink' : ''}
    >
      <ListItemIcon>
        <ArticleIcon />
      </ListItemIcon>
      <ListItemText primary="Book Genre" />
    </ListItemButton>
    </Link>
    <Link to={'/'}  sx={{textDecoration:'none'}}>
    <ListItemButton 
    className={path === '/' ? 'activatedLink' : ''}
    >
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Books" />
    </ListItemButton>
    </Link>
    
    <Link to={'/adlogout'}  sx={{textDecoration:'none'}}>
    <ListItemButton>
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItemButton>
    </Link>
  </React.Fragment>

  )
}

export default Listitems

