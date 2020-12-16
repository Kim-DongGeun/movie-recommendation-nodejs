import React, { useState } from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {makeStyles, Link, Avatar, Button, CssBaseline, TextField, Grid, Typography, Container} from '@material-ui/core';
import axios from 'axios'
import {useHistory} from 'react-router-dom';

const header = {withCredentials: true}
const UseStyles = makeStyles((theme) => ({
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
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

function SignUp() {
    const classes = UseStyles();
    const [email, setEamil] = useState();
    const [password, setPassword] = useState();
    const [re_password, setRePassword] = useState();
    const history = useHistory();

    const sendParams = {
      header,
      Email: email,
      Password: password
    }

    const SignUpHandler = () => {
      if(email === '' || email === undefined){
        alert("이메일을 입력해 주세요");
      }
      else if(password === '' || password === undefined){
        alert("비밀번호를 입력해 주세요");
      }
      else if(re_password === '' || re_password === undefined){
        alert("비밀번호를 한번더 입력해 주세요");
      }
      else if(password !== re_password){
        alert("비밀번호가 일치하지 않습니다.");
      }
      else{
        axios
          .post('http://localhost:3002/users/signup', sendParams)
          .then(res => {
            if(res.data.message){
              alert(res.data.message);
              if(res.data.duplicate === '1'){ // 이메일 중복
                history.push('/signup');
              }
              else{ // 회원가입 성공
                history.push('/');
              }
            }
            else{
              alert("회원 가입 실패");
            }
          })
          .catch(err => {
            console.log(err);
          })
        }
      }

    // useEffect(() => {
    //   async function fetchData(){
    //     const request =  await axios.get('http://localhost:3002/api')
    //     console.log(request);
    //     return request;
    //   }
    //   fetchData();
    // })

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={3}>            
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={res => setEamil(res.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={res => setPassword(res.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={res => setRePassword(res.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={SignUpHandler}  
            href='#'       
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/" variant="body2">
                {"Go to SignIn"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default SignUp



