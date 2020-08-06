import React  , {useEffect,useState} from 'react';
import {useDispatch , useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { saveShipping } from '../../actions/cartAction';
import CheckoutSteps from '../componentsSteps/CheckoutSteps'

  
   
      
      const useStyles = makeStyles((theme) => ({
        paper: {
          marginTop: theme.spacing(8),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        },
        avatar: {
          margin: theme.spacing(1),
          backgroundColor: theme.palette.secondary.main,
        },
        form: {
          width: '100%', // Fix IE 11 issue.
          marginTop: theme.spacing(1),
        },
        submit: {
          margin: theme.spacing(3, 0, 2),
        },
      }));
    function ShippingrScreen (props) {
        const dispatch = useDispatch();

        const [address, setAdress] = useState('');
        const [city, setCity] = useState('');
        const [postalCode, setPostalCode] = useState('');
        const [country, setCountry] = useState('');

        const classes = useStyles();
        const submitHandler = (e) => {
            e.preventDefault();
            dispatch(saveShipping({address,city, postalCode, country}));
            props.history.push('payment');
        }
        return (
          <div>
            <CheckoutSteps step1 step2 ></CheckoutSteps>
             <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Shipping
              </Typography>
              <Typography component="h1" variant="h5">
              </Typography>
              <form onSubmit={submitHandler}  className={classes.form} noValidate>
                <TextField
                  onChange={(e) => setAdress(e.target.value)}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="adress"
                  label="Address"
                  name="adress"
                  autoComplete="adress"
                  autoFocus
                />
                <TextField
                  onChange={(e) => setCity(e.target.value)}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="city"
                  label="City"
                  type="city"
                  id="city"
                  autoComplete="current-password"
                />
                <TextField
                  onChange={(e) => setPostalCode(e.target.value)}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="postal-code"
                  label="Postal Code"
                  type="postal-code"
                  id="postal-code"
                  autoComplete="postal-code"
                />
                <TextField
                  onChange={(e) => setCountry(e.target.value)}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="country"
                  label="Country"
                  type="country"
                  id="country"
                  autoComplete="country"
                />
            
            
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Continue
                </Button>
         
              </form>
            </div>
          
            </Container>
          </div>
         
        );
      }

    


export default ShippingrScreen;