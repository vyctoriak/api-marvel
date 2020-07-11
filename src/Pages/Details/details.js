import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../../assets/styles/details/details.css';
import api from '../../requests/api';

const key = {
  public_key: "5aac5bc626f58d061575c2cb8f0e446e",
  timestamp: "1594395237695",
  hash: "d065183a15d9685ba03ca919ec79c54e"
}

function Details() {
  let { id } = useParams();

  const [detailsCharacters, setDetailsCharacters] = useState([]);
  const [comics, setComics] = useState([]);
  
  useEffect( () => {
  }, [detailsCharacters, comics])
  
  useEffect( () => {
    getCharactersById(id)
    getComicsById(id);
  }, [id])

  async function getCharactersById (param) {
    try {
      const response = await api.get(`characters/${param}?&apikey=${key.public_key}&ts=${key.timestamp}&hash=${key.hash}`)
      const { results } = response.data.data;
      setDetailsCharacters(results);
    } catch (error) {
      console.log(error)
    }
  }

  async function getComicsById (param) {
    try {
      
      const response = await api.get(`characters/${param}/comics?format=comic&formatType=comic&orderBy=onsaleDate&limit=10&apikey=${key.public_key}&ts=${key.timestamp}&hash=${key.hash}`)
      const { results } = response.data.data;
      setComics(results);
    } catch (error) {
      console.log(error)
    }
  }

  return(
    <div className="container-details">

      {detailsCharacters && detailsCharacters.map( item => (
        <div key={item.id}>
          <div  className="info-characters">

            <div className="photo">
                <img src={`${item.thumbnail.path}.${item.thumbnail.extension}`} alt={item.name}/>
            </div>

            <div className="informations">

            <Link to="/" className="page-back">
                <i className="fas fa-times"></i>
            </Link>
              
              <h1>
                {item.name}
              </h1>
              <p>
                {item.description}
              </p>
            </div>

          </div>

        <div className="divisor">
          <h1>As últimas comics onde você encontra o(a) personagem <strong> {item.name} </strong></h1>
        </div>

        <div className="comics-container">
          {comics && comics.map( item => (
            <div key={item.id} className="comics-item">

              <div className="comic-poster">
                <img src={`${item.thumbnail.path}.${item.thumbnail.extension}`} alt={item.title}/>
              </div>

              <div className="comic-informations">
                <h2>
                  {item.title}
                </h2>
                <p>
                  {item.description}
                </p>

              </div>
            </div>
          )) }
        </div>

        </div>
      ))}

    </div>
  )

}

export default Details;