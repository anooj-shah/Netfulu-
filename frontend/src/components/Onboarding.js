import React, {useState, useEffect} from 'react';
import axios from 'axios';
import OnboardingMovie from './OnboardingMovie';

function Onboarding(props){
  const [movies,setMovies] = useState([]);
  useEffect(()=>{
    axios.get('http://localhost:5000/getMovies')
    .then(response => {
      let names = response.data.movie_names;
      let ids = response.data.id;
      // TODO: make id state
      setMovies(names);
    })
    .catch(err => {
      console.log("Error", err);
    })
  }, []);
  return (
    <div>
      {
        movies && movies.map((movie) => {
          //TODO include ID's in the component
          return( <OnboardingMovie
                    movieName = {movie}
                  />)
        })
      }

    </div>
  )
  
}

export default Onboarding;