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
import { signin } from '../../actions/userActions';


  
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
    function SignInScreen (props) {
        const dispatch = useDispatch();
        const userSignin = useSelector(state => state.userSignin);
        const { loading, userInfo, error } = userSignin;
        const redirect = props.location.search? props.location.search.split("=")[1]: '/';
        useEffect(() => {
                if(userInfo) {
                    props.history.push(redirect);
                }
            return () => {
                //
            }
        }, [userInfo]);
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const classes = useStyles();
        const submitHandler = (e) => {
            e.preventDefault();
            dispatch(signin(email, password));
        }
        return (
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Typography component="h1" variant="h5">
                {loading && <div>Loading</div>}
                {error && <div>{error}</div>}
              </Typography>
              <form onSubmit={submitHandler}  className={classes.form} noValidate>
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
                  onChange={(e) => setPassword(e.target.value)}
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
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link  href="#" color="inherit" variant="body2" to={redirect == "/" ? "register" : "register?redirect=" +redirect}>
                      {"Don't have an account? Sign Up"}
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

    


export default SignInScreen;