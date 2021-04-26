import React, {useState, useEffect} from 'react';
import axios from 'axios';
import OnboardingMovie from './OnboardingMovie';
import top100 from './top100';
import './styles.css';

function Onboarding(props){
  const [liked,setLiked] = useState([])
  function addId(id){
    setLiked(liked.concat(+id))
  }
  function removeId(id){
    console.log(+id);
    console.log(Array.from(liked.filter((j)=> {
      console.log({j});
      return +id !==+j
    })));
    setLiked(Array.from(liked.filter((j)=> +id !==+j)));
  }

  function submit(){
    //post the liked id's
  }

  return (
    <>
    <div className="movie-holder">
      <h1 className="onboarding-header">Select the movies you have seen and liked. The more you pick the better the recomendations will be.</h1>
      {
        top100.map((movie) => {
          //TODO include ID's in the component
          return( <OnboardingMovie
                    movieName = {movie.name}
                    movieId = {movie.id}
                    movieImg = {movie.image}
                    addId = {addId}
                    removeId = {removeId}
                  />)
        })
      }
      <button class="bg-green-700 text-white font-bold py-2 px-4 mt-4 text-5xl focus:outline-none rounded rounded-lg flex-none submit-button" onClick={submit}>
                Submit
      </button>
    </div>
    
    </>
  )
}

export default Onboarding;
