import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../requests/api';
import './home.css';

function Home() {

  const [characters, setCharacters] = useState(null);

  const public_key = '5aac5bc626f58d061575c2cb8f0e446e';
  const timestamp = '1594251731556';
  const hash = 'bf688566c0f2c1f5e84773e0dd3141f6'
  const limit = 5;

  // https://gateway.marvel.com/v1/public/characters?offset=0&limit=1&apikey=5aac5bc626f58d061575c2cb8f0e446e&ts=1594251731556&hash=bf688566c0f2c1f5e84773e0dd3141f6

  useEffect(() => {
    // get personagens
    api.get(`/v1/public/characters?offset=0&limit=${limit}&apikey=${public_key}&ts=${timestamp}&hash=${hash}`)
    .then(res => setCharacters(res.data.data.results))
  }, [])

  return (
    <div className="container">
      <h1>Produtos Marvel</h1>
      <div className="list_products">
          {characters && characters.map(item => (
            <Link key={item.id} to={`/v1/public/characters/${item.id}?apikey=${public_key}`}>
              <div>
                <p>
                  {item.name}
                </p>
                <img src={`${item.thumbnail.path}.${item.thumbnail.extension}`} alt="foto"/>
              </div>
            </Link>
          ))}
      </div>
    </div>
  )
}

export default Home;