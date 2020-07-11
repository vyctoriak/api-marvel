import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../requests/api';
import '../../assets/styles/home/home.css';
import debounce from 'lodash/debounce';

function Home() {

  const [characters, setCharacters] = useState([]);
  const [arrayOfLike, setArrayOfLike] = useState([]);

  const key = {
    public_key: "5aac5bc626f58d061575c2cb8f0e446e",
    timestamp: "1594395237695",
    hash: "d065183a15d9685ba03ca919ec79c54e",
    limit: "20"
  };

  useEffect( () => {
    getCharacters();
    setArrayOfLike(JSON.parse(localStorage.getItem('like')) || {});
  }, [])

  async function getCharacters (param) {
    let route = ''
    if(param) {
      route = `characters?name=${param}&orderBy=name&offset=0&limit=${key.limit}&apikey=${key.public_key}&ts=${key.timestamp}&hash=${key.hash}`
    } else {
      route = `characters?orderBy=name&offset=0&limit=${key.limit}&apikey=${key.public_key}&ts=${key.timestamp}&hash=${key.hash}`
    }

    try {
      const response = await api.get(route)
      const { data } = response.data;
      setCharacters(data.results);
    } catch (error) {
      console.log(error)
    }
  }

  const like = (id) => {
    let obj = JSON.parse(localStorage.getItem("like")) || {};

    if (obj[id]) {
      delete obj[id];
    } else {
      if (Object.keys(obj).length <= 4) {
        obj[id] = true;
      }
    }

    localStorage.setItem("like", JSON.stringify(obj));
    setArrayOfLike(obj);
  }
  
  const search = (event) => {
    event.persist();
    let debouncedFn;
    if (!debouncedFn) {
      debouncedFn = debounce(() => {
         let searchString = event.target.value;
         if (searchString.length > 3) {
           getCharacters(searchString);
         } 
         if (searchString.length === 0) {
           getCharacters();
         }
      }, 1000);
    }
    
    debouncedFn();
  }

  return (
    <>
    <h1>
      Digite o nome de um personagem
    </h1>
    <nav>
      <label htmlFor="search">
        <img src="https://cdn.ome.lt/Lk57ZJ11LTeHJbYUrkOKLE3LNFA=/570x0/smart/uploads/conteudo/fotos/marvel-2_QIq20gY.jpg" alt="Logo Marvel"/>
      </label>
      <input type="search" name="search" id="search" 
      onChange={search}
      />
    </nav>
    
    
    <div className="container-characters">

      {characters && characters.map( item => (
        <>
            <div className="card">
              <Link key={item.id} to={`/characters/${item.id}`}>
                <div className="card-poster">
                  <img 
                  src={`${item.thumbnail.path}.${item.thumbnail.extension}`} 
                  alt={item.name}/>
                </div>
              </Link>
            <div className="card-info">
              <h3>{item.name}</h3>
                <i className={`fa fa-heart ${JSON.parse(localStorage.getItem("like")) && JSON.parse(localStorage.getItem("like"))[item.id] === true ? 'active' : ''}`} aria-hidden="true" onClick={() => like(item.id)}></i>
            </div>
          </div>
        </>
      ))}


    </div>
    </>
  )
}

export default Home;