import React, {useState} from 'react';
import './styles.css';
export default function OnboardingMovie(props){
  const [clicked, setClicked] = useState(false);
  function was_clicked(){
    if(clicked){
      props.removeId(props.movieId)
    }else{
      props.addId(props.movieId)
    }
    setClicked(!clicked);
    
  }
  return (
      <div className = {"movie-card " + (clicked ? "clicked" : "")} onClick={was_clicked}>
        <div className = "movie-name" onClick={was_clicked}>
        {props.movieName}
        </div>
        <img src = {props.movieImg} className="movie-img"></img>
      </div>
    )
}