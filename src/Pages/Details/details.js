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
    console.log(detailsCharacters)
    console.log(comics)
  }, [detailsCharacters, comics])
  
  useEffect( () => {
    getCharactersById(id)
    getComicsById(id);
  }, [id])

  // Minha key
  // const public_key = '5aac5bc626f58d061575c2cb8f0e446e';
  
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
      // const response = await api.get(api.get(`/v1/public/characters/${param}/comics?format=comic&formatType=comic&orderBy=onsaleDate&limit=10&apikey=${key.public_key}&ts=${key.timestamp}&hash=${key.hash}`))
      
      const response = await api.get(`characters/${param}/comics?format=comic&formatType=comic&orderBy=onsaleDate&limit=10&apikey=${key.public_key}&ts=${key.timestamp}&hash=${key.hash}`)
      console.log( "response:",response);
      const { results } = response.data.data;
      setComics(results);
    } catch (error) {
      console.log(error)
    }
  }




  // key de outra conta
  // const public_key = 'a426809c0b8fe784902b489148a23319';

  // key da mh conta hotmail
  // const key = {
  //   public_key: "86cfff8f9319d4fae2be20a7cd1b2ee1",
  //   timestamp: "1594345144761",
  //   hash: "52206ae592ca805795a9fa2340905fcf",
  // }


  // useEffect( () => {
  //   api.get(`/v1/public/characters/${id}?&apikey=${key.public_key}&ts=${key.timestamp}&hash=${key.hash}`)
  //     .then(res => setDetailsCharacters(res.data.data.results))
  // }, [id, key.public_key, key.timestamp, key.hash])
  
  // useEffect( () => {
  //   api.get(`/v1/public/characters/${id}/comics?format=comic&formatType=comic&orderBy=onsaleDate&limit=10&apikey=${key.public_key}&ts=${key.timestamp}&hash=${key.hash}`)
  //   .then( res => setComics(res.data.data.results))
  // },[id, key.public_key, key.timestamp, key.hash])

  // https://gateway.marvel.com:443/v1/public/characters/1009664/comics?format=comic&formatType=comic&orderBy=onsaleDate&limit=10&apikey=5aac5bc626f58d061575c2cb8f0e446e

  // const mock_info = [
  //   {
  //     id: 1,
  //     name: "Homem-aranha",
  //     image: "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80",
  //     description: "Bitten by a radioactive spider, Peter Parker’s arachnid abilities give him amazing powers he uses to help others, while his personal life continues to offer plenty of obstacles.",

  //   }
  // ]


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