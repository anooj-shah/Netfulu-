import React, {useState, useEffect} from 'react';
import axios from 'axios';
import OnboardingMovie from './OnboardingMovie';
import top100 from './top100';
import './styles.css';

function Onboarding(props){

  return (
    <div className="movie-holder">
      {
        top100.map((movie) => {
          //TODO include ID's in the component
          return( <OnboardingMovie
                    movieName = {movie.name}
                    movieId = {movie.id}
                    movieImg = {movie.image}
                  />)
        })
      }
    </div>
  )
}

export default Onboarding;
