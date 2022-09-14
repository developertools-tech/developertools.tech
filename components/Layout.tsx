import GitHub from '@mui/icons-material/GitHub';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Head from 'next/head';
import Image from 'next/image';
import React, { useState } from 'react';

import navItems from '../data/nav';
import useWindowSize from '../hooks/useWindowSize';
import logo from '../public/logo.svg';
import dlfordLogo from '../public/logo-full.svg';
import Link from './Link';

const drawerWidth = 240;

function Logo() {
  return (
    <Button
      href='/'
      component={Link}
      height={44}
      sx={{ mr: 'auto', ml: 0 }}
    >
      <Image
        src={logo}
        width={36}
        height={36}
        alt=''
        aria-hidden='true'
      />
      <Typography
        ml={1}
        color='#fff'
        textTransform='none'
      >
        Dev Tools
      </Typography>
    </Button>
  );
}

export default function Layout({
  title = 'Developer Utilities',
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const { width } = useWindowSize();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <List>
      {[...navItems]
        .sort((a, b) => {
          if (a.title === 'Home') {
            return -1;
          }
          if (b.title === 'Home') {
            return 1;
          }
          return a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1;
        })
        .map(({ title: itemTitle, href, Icon }) => (
          <ListItem
            key={href}
            disablePadding
          >
            <ListItemButton
              href={href}
              component={Link}
            >
              <ListItemIcon>{!!Icon && <Icon />}</ListItemIcon>
              <ListItemText primary={itemTitle} />
            </ListItemButton>
          </ListItem>
        ))}
    </List>
  );

  return (
    <Box height='100%'>
      <Head>
        <title>{title}</title>
        <meta
          name='description'
          content='Developer utilities by DL Ford'
        />
        <meta
          name='viewport'
          content='initial-scale=1, width=device-width'
        />
      </Head>

      <CssBaseline />
      <AppBar
        position={(width || 0) > 600 ? 'relative' : 'fixed'}
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mr: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <Logo />
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ ml: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component='nav'
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label='Tools'
      >
        <Drawer
          variant={(width || 0) < 600 ? 'temporary' : 'permanent'}
          anchor='right'
          open={(width || 0) < 600 ? mobileOpen : true}
          onClose={(width || 0) < 600 ? handleDrawerToggle : undefined}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            '& .MuiDrawer-paper': {
              sm: {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component='main'
        display='flex'
        flexDirection='column'
        alignItems='center'
        sx={{
          p: 3,
          pt: {
            xs: 12,
            sm: 3,
          },
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          minHeight: (theme) => ({
            xs: `calc(100% - ${theme.mixins.toolbar.minHeight}px)`,
            sm: `calc(100% - (${theme.mixins.toolbar.minHeight}px * 2) - 16px)`,
          }),
        }}
      >
        {children}
      </Box>
      <Box
        position='relative'
        component='footer'
        width={{ sm: `calc(100% - ${drawerWidth}px)` }}
        display='flex'
        justifyContent='center'
        alignItems='center'
        bgcolor='grey.900'
      >
        <Toolbar>
          <Typography
            display='flex'
            justifyContent='center'
            alignItems='center'
            gap='0.125rem'
            fontSize='0.75rem'
            lineHeight={1}
          >
            CopyLeft
            <a
              href='https://www.dlford.io'
              rel='noopener noreferrer'
              target='_blank'
            >
              <Button sx={{ px: 0, mb: 0.5 }}>
                <Image
                  src={dlfordLogo}
                  width={90}
                  height={34}
                />
              </Button>
            </a>
            2022
            <IconButton
              href='https://github.com/developertools-tech/developertools.tech'
              target='_blank'
              rel='noopener noreferrer'
            >
              <GitHub />
            </IconButton>
          </Typography>
        </Toolbar>
      </Box>
    </Box>
  );
}
