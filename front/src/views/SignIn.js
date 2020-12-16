import React, {useState} from "react";
import {makeStyles, Link, Avatar, Button, CssBaseline, TextField, Grid, Typography, Container} from '@material-ui/core';
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import $ from "jquery";
import {} from "jquery.cookie";


const UseStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignIn() {
  const classes = UseStyles();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const header = {withCredentials: true}
  const history = useHistory();
  const send_params = {
    header,
    Email: email,
    Password: password
  }

  const signInHandler = () => {
    axios
      .post('http://localhost:3002/users/login', send_params)
      .then(res => {
        alert(res.data.message);
        if(res.data.login === '1'){
          console.log(res.data.login);
          $.cookie('loginId', email);
          history.push('/rating');
        }
      })
      .catch(err => console.log(err));
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
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={data => setEmail(data.target.value)}
          />
          <TextField
            variant="outlined"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={data => setPassword(data.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={signInHandler}
            href='#'
          >Sign In</Button>
          <Grid container>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default SignIn;
