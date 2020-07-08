import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../requests/api';

function Home() {

  const [characters, setCharacters] = useState(null);

  const token = '5aac5bc626f58d061575c2cb8f0e446e'
  var config = {
    headers: { Authorization: 'bearer' + token }
  }

  useEffect( () => {
    api.get('/public/characters', config).then(res => setCharacters(res.data))
  }, [config])

  return (
    <div>
      { characters && characters.map(item => (
        <Link key={item.id} >
          <li>
            {item.name}
          </li>
        </Link>
      ))}
    </div>
  )
}

export default Home;