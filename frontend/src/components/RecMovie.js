import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './styles.css';
export default function OnboardingMovie(props){
  const [movieImg, setImage] = useState("");
  const [id, setId] = useState("");
  useEffect(()=>{
    const IMDB_API_KEY_HERE = "k_yzrug75g"
    const imdb_url = "https://imdb-api.com/en/API/SearchMovie/"+IMDB_API_KEY_HERE+"/"
    axios.get(imdb_url+props.movieName)
    .then((res)=>{
      console.log(res);
      setImage(res?.data?.results[0].image);
      setId(res?.data?.results[0].id);
    })
  },[props.movieName])
  function openIMDB(){
    const url = "https://www.imdb.com/title/";
    if(id!=""){
      window.open(url+id,'_blank');
    }
  }
  return (
      <div className = {"movie-card rec"} onClick={openIMDB}>
        <div className = "movie-name">
        {props.movieName}
        </div>
        <img src = {movieImg} className="movie-img"></img>
      </div>
    )
}