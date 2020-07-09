import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../requests/api';
import '../../assets/styles/home/home.css';

function Home() {

  const [characters, setCharacters] = useState(null);

  // MINHAS KEYS
  // const public_key = '5aac5bc626f58d061575c2cb8f0e446e';
  // const timestamp = '1594251731556';
  // const hash = 'bf688566c0f2c1f5e84773e0dd3141f6'
  // const limit = 8;

  // key de outra conta
  const key = {
    public_key: "a426809c0b8fe784902b489148a23319",
    timestamp: "1594247367214",
    hash: "84e25fe88a9ef7c89ea1f9ccd0680ac1",
    limit: "4"
  }

  // https://gateway.marvel.com:443/v1/public/characters/1011334?apikey=a426809c0b8fe784902b489148a23319&ts=1594247367214&hash=84e25fe88a9ef7c89ea1f9ccd0680ac1

  // https://gateway.marvel.com/v1/public/characters?offset=0&limit=1&apikey=5aac5bc626f58d061575c2cb8f0e446e&ts=1594251731556&hash=bf688566c0f2c1f5e84773e0dd3141f6

  useEffect(() => {
    // get personagens
    api.get(`/v1/public/characters?offset=0&limit=${key.limit}&apikey=${key.public_key}&ts=${key.timestamp}&hash=${key.hash}`)
      .then(res => setCharacters(res.data.data.results))
  }, [key.hash, key.limit, key.public_key, key.timestamp])

  return (
    <>
    <h1>
      Digite o nome de um personagem
    </h1>
    <nav>
      <label htmlFor="search">
        <img src="https://cdn.ome.lt/Lk57ZJ11LTeHJbYUrkOKLE3LNFA=/570x0/smart/uploads/conteudo/fotos/marvel-2_QIq20gY.jpg" alt="Logo Marvel"/>
      </label>
      <input type="search" name="search" id="search"/>
    </nav>
    
    <div className="container-characters">
      {characters && characters.map( item => (
        <Link key={item.id} to={`/characters/${item.id}`}>
          <div className="card">
            <div className="card-poster">
              <img src={`${item.thumbnail.path}.${item.thumbnail.extension}`} alt={item.name}/>
            </div>
            <div className="card-info">
              <h3>{item.name}</h3>
              <i className="fa fa-heart" aria-hidden="true"></i>
            </div>
          </div>
        </Link>
      ))}
    </div>
    </>
  )
}

export default Home;