import React, {useState, useEffect} from 'react'
import {CssBaseline, Typography, CardContent, AppBar, Button, Card, CardActions, CardMedia, Grid, Toolbar, makeStyles, Container} from '@material-ui/core';
import Star from './Star'
import axios from '../axios'
import Axios from 'axios'
import requests from '../Requests'
import {useHistory} from 'react-router-dom';


const base_url = "https://image.tmdb.org/t/p/original/";
const useStyles = makeStyles((theme) => ({
    icon: {
      marginRight: theme.spacing(2),
    },
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
      marginTop: theme.spacing(4),
    },
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      /*paddingTop: '56.25%', // 16:9*/
      paddingTop:'80%',
    },
    cardContent: {
      flexGrow: 1,
      height:250
    },
    star_position: {
      marginLeft:theme.spacing(7)
    },
  }));
  

  

function Movie() {
  const history = useHistory();
  const [Movies, setMovies] = useState([]);
  function truncate(str, n){
    return str?.length > n ? str.substr(0, n-1) + '...' : str;
}

const buttonHandler = () => {
  console.log('click');
  Axios
      .get('http://localhost:3002/movies')
      .then(res => {
        console.log(res);
        history.push('/main');
      })
      .catch(err => console.log(err));
}

  useEffect(() => {
    var temp = String(Math.floor(Math.random() * 10) + 1)
    async function fetchData(){
      const request = await axios.get(requests.fetchNowPlaying + temp);      
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  },[])
  
    const classes = useStyles();
    return (
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom >
              영화 평점
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              원하는 만큼 영화를 평가하세요<br/>
              평가가 많을수록 취향에 꼭 맞는 영화를 추천해드려요!
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={1} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary" onClick={buttonHandler}>
                    영화 추천 받기
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {Movies.map((Movie) => (
              <Grid item key={Movie} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={`${base_url}${Movie.poster_path}`}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {Movie?.title || Movie?.name || Movie?.original_name}
                    </Typography>
                    <Typography>
                    {truncate(Movie.overview, 100)}
                    </Typography>
                  </CardContent>
                  <div className={classes.star_position}>
                    <Star/>
                  </div>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    )
}

export default Movie
