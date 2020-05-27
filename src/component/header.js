import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SchoolIcon from '@material-ui/icons/School';
import './header.css' 
const useHeaderStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header() {
  const headerClasses = useHeaderStyles();

  return (
    <div className={headerClasses.root}>
      <AppBar style={{ background: '#2E3B55' }}
       position="static">
        <Toolbar >
          <IconButton edge="start" className={headerClasses.menuButton} color="inherit" aria-label="menu">
            <SchoolIcon style={{ fontSize: 30 }} />
          </IconButton>
          <Typography variant="h4" className={headerClasses.title}>
          गुरुकुल
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
