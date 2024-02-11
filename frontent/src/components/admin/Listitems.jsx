import React from 'react'
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ArticleIcon from '@mui/icons-material/Article';
import '../../css/admin/Dashboard.css'
import { Link, matchPath, useLocation } from 'react-router-dom';
import { Divider } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import CategoryIcon from '@mui/icons-material/Category';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';


const Listitems = () => {
  const location = useLocation();
  const path = location.pathname;


  // Split the path based on "/"
  const pathParts = path.split("/");

  // Get the starting path (index 1)
  const startingPath = pathParts[1];
  //console.log("match : "+startingPath)

  return (
    <React.Fragment>

      <Link to={'/adminHome'} sx={{ textDecoration: 'none' }}>
        <ListItemButton
          className={path === '/adminHome' ? 'activatedLink' : ''}
        >
          <ListItemIcon>
            <LibraryBooksIcon />
          </ListItemIcon>
          <ListItemText primary="Books" />
        </ListItemButton>
      </Link>

      {/* <Link to={'/adminHome'} sx={{ textDecoration: 'none' }}>
        <ListItemButton
          className={path === '/adminHome' ? 'activatedLink' : ''}
        >
          <ListItemIcon>
            <CategoryIcon />
          </ListItemIcon>
          <ListItemText primary="Book Genre" />
        </ListItemButton>
      </Link> */}

      <Link to={'/rentlist'} sx={{ textDecoration: 'none' }}>
        <ListItemButton
          className={path === '/rentlist' ? 'activatedLink' : ''}
        >
          <ListItemIcon>
            <CollectionsBookmarkIcon />
          </ListItemIcon>
          <ListItemText primary="Book Rent Requests" />
        </ListItemButton>
      </Link>

      <Link to={'/users'} sx={{ textDecoration: 'none' }}>
        <ListItemButton
          className={path === '/users' ? 'activatedLink' : ''}
        >
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItemButton>
      </Link>

      <Link to={'/adlogout'} sx={{ textDecoration: 'none' }}>
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

