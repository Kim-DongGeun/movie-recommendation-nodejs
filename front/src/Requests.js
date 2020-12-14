const API_KEY = '75c152a95a851601f575861460e43155';

const requests = {
    fetchTrending: `trending/all/week?api_key=${API_KEY}&language=ko`,
    fetchTopRated: `movie/top_rated?api_key=${API_KEY}&language=ko`,
    fetchActionMoives: `/discover/movie?api_key=${API_KEY}&with_genres=28&language=ko`,
    fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35&language=ko`,
    fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27&language=ko`,
    fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749&language=ko`,
    fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99&language=ko`,
}

export default requests