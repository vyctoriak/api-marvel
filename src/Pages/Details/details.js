import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../../assets/styles/details/details.css';
import api from '../../requests/api';

function Details() {
  let { id } = useParams();

  const [detailsCharacters, setDetailsCharacters] = useState(null);

  // Minha key
  // const public_key = '5aac5bc626f58d061575c2cb8f0e446e';

  // key de outra conta
  // const public_key = 'a426809c0b8fe784902b489148a23319';

  // useEffect( () => {
  //   api.get(`/v1/public/characters/${id}?&apikey=${public_key}`)
  //     .then(res => setDetailsCharacters(res.data.data.results))
  // })

  const mock_info = [
    {
      id: 1,
      name: "Homem-aranha",
      image: "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80",
      description: "Bitten by a radioactive spider, Peter Parker’s arachnid abilities give him amazing powers he uses to help others, while his personal life continues to offer plenty of obstacles.",

    }
  ]


  return(
    <div className="container-details">
      {/* {detailsCharacters && detailsCharacters.map( item => (
        <>
        <div key={item.id} className="info-characters" 
        // style={{backgroundImage: `url(${item.thumbnail.path}.${item.thumbnail.extension})`}}
        >
          <h1>{item.name}</h1>
          <p>{item.description}</p>
        </div>

        <div>
          teste 
        </div>
        </>
      ))} */}

      {mock_info && mock_info.map( item => (
        <>
        <div key={item.id} className="info-characters" 
        // style={ {backgroundImage: `url(${item.image})`} }
        // style={{backgroundImage: `url(${item.thumbnail.path}.${item.thumbnail.extension})`}}
        >

        

          <div className="photo">
              <img src={item.image} alt={item.image}/>
          </div>

          <div className="informations">

          <Link to="/" className="page-back">
              <i class="fas fa-chevron-left"></i>
          </Link>
            
            <h1>
              {item.name}
            </h1>
            <p>
              {item.description}
            </p>
          </div>

        </div>

        <div>
          teste 
        </div>

        
        </>
      ))}


    </div>
  )

}

export default Details;