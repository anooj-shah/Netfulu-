import React, {useState} from 'react';
import './styles.css';
export default function OnboardingMovie(props){
  const [clicked, setClicked] = useState(false);
  function was_clicked(){
    setClicked(!clicked);
  }
  return (<div className = {"movie " + (clicked ? "clicked" : "")} onClick={was_clicked}>
    {props.movieName}
    </div>)
}