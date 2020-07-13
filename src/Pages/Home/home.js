import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../requests/api';
import '../../assets/styles/home/home.css';
import debounce from 'lodash/debounce';
import Logo from '../../assets/imgs/logo.png';
import Lupa from '../../assets/imgs/Shape.png';

function Home() {

  const [characters, setCharacters] = useState([]);
  const [arrayOfLike, setArrayOfLike] = useState([]);
  const [totalOfCharacters, setTotalOfCharacters] = useState();
  const [limitOfCharacters, setLimitOfCharacters] = useState(20);
  const [searchString, setSearchString] = useState();
  const [loading, setLoading] = useState(false);
  const [offsetOfCharacters, setOffsetOfCharacters] = useState(0);

  const key = {
    public_key: "5aac5bc626f58d061575c2cb8f0e446e",
    timestamp: "1594395237695",
    hash: "d065183a15d9685ba03ca919ec79c54e"
  };

  useEffect( () => {
    getCharacters('');
    setArrayOfLike(JSON.parse(localStorage.getItem('like')) || {});
  }, [])

  async function getCharacters (param, limit, offset, isLoadMore) {
    setLoading(true);

    let route = ''
    if(param) {
      route = `characters?nameStartsWith=${param}&orderBy=name&offset=${offset ? offset : offsetOfCharacters}&limit=${limit || limitOfCharacters}&apikey=${key.public_key}&ts=${key.timestamp}&hash=${key.hash}`
      console.log(route)
    } else {
      route = `characters?orderBy=name&offset=${offset ? offset : offsetOfCharacters}&limit=${limit|| limitOfCharacters}&apikey=${key.public_key}&ts=${key.timestamp}&hash=${key.hash}`
    }

    try {
      const response = await api.get(route)
      const { data } = response.data; 
      setTotalOfCharacters(data.total)
      if (isLoadMore) {
        setCharacters([].concat(characters, data.results));
      } else {
        setCharacters(data.results);
      }
      setLoading(false);
    } catch (error) {
      console.log(error)
      setLoading(false);
    }
  }

  const loadMore = () => {
    if (loading) return;

    let tempLimit = limitOfCharacters;
    let tempOffset = offsetOfCharacters;

    if (tempLimit === 20) {
      tempOffset = tempLimit;
    } else {
      tempOffset = tempOffset+100;
    }

    getCharacters(searchString, 100, tempOffset, true);
    setOffsetOfCharacters(tempOffset)
    setLimitOfCharacters(100);

    if (tempLimit + 20 < totalOfCharacters) {
      getCharacters(searchString, 100, tempOffset, true);
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

    setSearchString(event.target.value);

    let debouncedFn;
    if (!debouncedFn) {
      debouncedFn = debounce(() => {
         let searchString = event.target.value;
         if (searchString.length >= 3) {
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
      <img src={Logo} alt="Logo Marvel"/>
    </h1>
    <h2>
      EXPLORE O UNIVERSO
    </h2>
    <p>Mergulhe no domínio deslumbrante de todos os personagens clássicos que você ama
      - e aquele que você descobrirá em breve!
    </p>
    <nav>
      <label htmlFor="search">
        <img src={Lupa} alt="Logo Marvel"/>
      </label>
      <input type="search" name="search" id="search" 
      onChange={search} placeholder="Procure por heróis"
      />
    </nav>
    
    
    <div className="container-characters">

      {characters && characters.map( item => (
        <div 
        key={item.id} 
        className="card">
          <Link to={`/characters/${item.id}`}>
            <div className="card-poster">
              <img 
              src={`${item.thumbnail.path}.${item.thumbnail.extension}`} 
              alt={item.name}/>
            </div>
          </Link>
          <div className="card-info">
            <h3>{item.name}</h3>
              <i className={`fa fa-heart ${arrayOfLike && arrayOfLike[item.id] === true ? 'active' : ''}`} aria-hidden="true" onClick={() => like(item.id)}></i>
          </div>
        </div>
      ))}


    </div>

      <div className="btn-primary">
        <button disabled={totalOfCharacters <= limitOfCharacters && characters.length === totalOfCharacters} onClick={loadMore}>Carregar mais {loading ? <i className="fas fa-spinner fa-spin"></i> : ""}</button>
      </div>
    </>
  )
}

export default Home;