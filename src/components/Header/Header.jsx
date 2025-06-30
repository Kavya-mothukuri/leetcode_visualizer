import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Person from '@mui/icons-material/Person';
import People from '@mui/icons-material/People';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <AppBar
        sx={{
            // background: 'rgba(44, 44, 44, 0.9)',
            background: "#9c27b0",
            // background:'rgba(210, 105, 30, 0.9)',
            width: '100%',
            top: 0,
            left: 0,
            boxShadow: 10,
            zIndex: 1200,
          }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }} >
          Leetcode Visualizer
        </Typography>

        <Link to="/" style={{ textDecoration: 'none' }}>
          <Button sx={{ color: 'white', marginRight: 2 }}>
            <Person />
            Single User
          </Button>
        </Link>

        <Link to="/compare" style={{ textDecoration: 'none' }}>
          <Button sx={{ color: 'white' }}>
            <People />
            Compare
          </Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
