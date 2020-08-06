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
import { register } from '../../actions/userActions';


  
    function Copyright() {
        return (
          <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" to="/">
              Creative Studio
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        );
      }
      
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
    function RegisterScreen (props) {
        const dispatch = useDispatch();
        const userRegister = useSelector(state => state.userRegister);
        const { loading, userInfo, error } = userRegister;
        const redirect = props.location.search? props.location.search.split("=")[1]: '/';
        useEffect(() => {
                if(userInfo) {
                    props.history.push(redirect);
                }
            return () => {
                //
            }
        }, [userInfo]);
        const [name, setName] = useState('');
        const [email, setEmail] = useState('');
        const [password, setRePassword] = useState('');
        
        const classes = useStyles();
        const submitHandler = (e) => {
            e.preventDefault();
            dispatch(register(name,email, password));
        }
        return (
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Create Account
              </Typography>
              <Typography component="h1" variant="h5">
                {loading && <div>Loading</div>}
                {error && <div>{error}</div>}
              </Typography>
              <form onSubmit={submitHandler}  className={classes.form} noValidate>
              <TextField
                  onChange={(e) => setName(e.target.value)}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                />
                <TextField
                  onChange={(e) => setEmail(e.target.value)}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  onChange={(e) => setRePassword(e.target.value)}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <TextField
                  onChange={(e) => setRePassword(e.target.value)}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="rePassword"
                  label="rePassword"
                  type="rePassword"
                  id="rePassword"
                  autoComplete="rePassword"
                />
            
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Register
                </Button>
                <Grid container>
                  <Grid item xs>
                  Already have an account ? 
                  <Link  href="#" color="inherit" variant="body2" to={redirect == "/" ? "signin" : "signin?redirect=" + redirect}>
                      SignIn
                    </Link>
                  </Grid>
              
                </Grid>
              </form>
            </div>
            <Box mt={8}>
              <Copyright />
            </Box>
          </Container>
        );
      }

    


export default RegisterScreen;