import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SchoolIcon from '@material-ui/icons/School';
import './header.css'
import { useHistory } from "react-router-dom";

// import history from './history'
const useHeaderStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    flexDirection: "row"
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    marginRight: 80
  },
}));

export default function Header() {
  let history = useHistory();
  const headerClasses = useHeaderStyles();

  return (
    <div>
      <div className={headerClasses.root}>
        <AppBar style={{ background: '#2E3B55' }}
          position="static">
          <Toolbar >
            <IconButton edge="start" className={headerClasses.menuButton} color="inherit" aria-label="menu"
              onClick={() => history.push('/')}
            >
              <SchoolIcon style={{ fontSize: 30 }} />
            </IconButton>
            <Typography variant="h4" className={headerClasses.title}>
              गुरुकुल
          </Typography>
            {/* <Link className='linkStyle' to="/listing">ENGINEERING</Link>
          <Link className='linkStyle' to="/listing">MEDICAL</Link>
          <Link className='linkStyle' to="/listing">COMMERCE</Link>
          <Link className='linkStyle' to="/listing">MBA</Link> */}
            <Button style={{ marginRight: 20 }} onClick={() => history.push('/listing', { data: "Engineering" })} color="inherit">Engineering</Button>
            <Button style={{ marginRight: 20 }} onClick={() => history.push('/listing', { data: "Medical" })} color="inherit">Medical</Button>
            <Button style={{ marginRight: 20 }} onClick={() => history.push('/listing', { data: "Commerce" })} color="inherit">Commerce</Button>
            <Button style={{ marginRight: 20 }} onClick={() => history.push('/listing', { data: "Management" })} color="inherit">Management</Button>
          </Toolbar>
        </AppBar>
      </div>
      {/* <Switch>
    <Route path="/listing">
            <Listing />
          </Route>
    
    </Switch> */}
    </div>
  );
}
