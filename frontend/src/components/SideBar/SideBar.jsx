import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Products from '../Products/Products';
import Product from '../Products/Product';
import CartScreen from '../Products/CartScreen';
import {BrowserRouter, Route, Link} from 'react-router-dom'
import Styles from './SideBar.module.css';
import SignInScreen from '../Products/SignInScreen';
import Box from '@material-ui/core/Box';
import {useSelector} from 'react-redux'
import RegisterScreen from '../Products/RegisterScreen';
import ProductCreateScreen from '../Products/ProductCreateScreen';
import ShippingrScreen from '../Products/ShippingScreen';
import PaymentScreen from '../Products/PaymentScrenn';
import PlaceOrderScreen from '../Products/PlaceOrderScreen';

//import Products from '.components/Products/Products'
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function SideBar() {
  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin;
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <BrowserRouter>
    <div className={classes.root}>
      
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
        <Box display='flex' flexGrow={2}>
        <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
           <Link to="/" className={Styles.link}>
            Creative Studio
            </Link>
          </Typography>
        </Box>
        <Typography variant="h6" className={classes.title}>
          {
            userInfo ? <Link className={Styles.link} to="/profile">{userInfo.name}</Link> : 
            <Link to="/signIn" className={Styles.link} >
            Sign In
            </Link>
          }
           
          </Typography>
      
         
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
            
          ))}
          <ListItem>
            <ListItemIcon><InboxIcon /></ListItemIcon> 
            <Link  to="/products"><ListItemText primary="Products" /> </Link>
          </ListItem>
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main 
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div
        style={{display: 'flex', marginTop:70, flexWrap:'wrap', paddingLeft:0,   flexDirection: 'row', justifyContent:'center', alignItems:'center'}}
        >
          <Route path="/" exact={true} component={Products} />
        </div>
        <Route path="/payment" component={PaymentScreen} />
        <Route path="/placeorder" component={PlaceOrderScreen} />
        <Route path="/products" component={ProductCreateScreen} />
        <Route path="/shipping" component={ShippingrScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="/signin" component={SignInScreen} />
        <Route path="/product/:id"  component={Product} />
        <Route path="/cart/:id?" component={CartScreen} />
        
        
       
      </main>
      
      
    </div>
   
    </BrowserRouter>
  );
}