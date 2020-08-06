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
import { savePayment } from '../../actions/cartAction';
import CheckoutSteps from '../componentsSteps/CheckoutSteps'
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';


      
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
    function PaymentScreen (props) {
        const dispatch = useDispatch();

        const [paymentMethod, setPaymentMethod] = useState('');
        

        const classes = useStyles();
        const submitHandler = (e) => {
            e.preventDefault();
            dispatch(savePayment( paymentMethod));
            props.history.push('placeorder');
        }
        return (
          <div>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
             <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Payment
              </Typography>
              <Typography component="h1" variant="h5">
              </Typography>
              <form onSubmit={submitHandler}  className={classes.form} noValidate>
                
              <div>
                <input
                  type="radio"
                  name="paymentMethod"
                  id="paymentMethod"
                  value="paypal"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></input>
                <label for="paymentMethod">Paypal</label>
              </div>
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

    


export default PaymentScreen;