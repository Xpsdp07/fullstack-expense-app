import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

function StickyNavbar({ menuItems = [], currentPage, onNavigate, useRouterLinks = false }) {
  // Always call useLocation at top-level
  const location = useLocation();

  return (
    <AppBar position="sticky" color="primary" elevation={4}>
      <Toolbar sx={{ justifyContent: 'center', gap: 4, flexWrap: 'wrap' }}>
        {menuItems.map(({ label, path, key }) => {
          // Determine active state depending on the mode
          const active = useRouterLinks ? location.pathname === path : currentPage === key;

          // Conditionally render react-router Link or <a> anchor
          return useRouterLinks ? (
            <Button
              key={key || label}
              color={active ? 'secondary' : 'inherit'}
              component={Link}
              to={path}
              sx={{ fontWeight: 700 }}
              onClick={() => onNavigate?.(key)}
            >
              {label}
            </Button>
          ) : (
            <Button
              key={key || label}
              color={active ? 'secondary' : 'inherit'}
              component="a"
              href={path}
              sx={{ fontWeight: 700 }}
              onClick={() => onNavigate?.(key)}
            >
              {label}
            </Button>
          );
        })}
      </Toolbar>
    </AppBar>
  );
}

export default StickyNavbar;
