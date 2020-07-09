import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../assets/styles/details/details.css';
import api from '../../requests/api';

function Details() {
  let { id } = useParams();

  const [detailsCharacters, setDetailsCharacters] = useState(null);

  const public_key = '5aac5bc626f58d061575c2cb8f0e446e';

  useEffect( () => {
    api.get(`/v1/public/characters/${id}?&apikey=${public_key}`)
      .then(res => setDetailsCharacters(res.data.data.results))
  })


  return(
    <div>
      {detailsCharacters && detailsCharacters.map( item => (
        <div>
          {item.name}
        </div>
      ))}
    </div>
  )

}

export default Details;