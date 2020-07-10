import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../requests/api';
import '../../assets/styles/home/home.css';
import debounce from 'lodash/debounce';

function Home() {

  const [characters, setCharacters] = useState([]);

  // MINHAS KEYS
  // const public_key = '5aac5bc626f58d061575c2cb8f0e446e';
  // const timestamp = '1594251731556';
  // const hash = 'bf688566c0f2c1f5e84773e0dd3141f6'
  // const limit = 8;

  const key = {
    public_key: "5aac5bc626f58d061575c2cb8f0e446e",
    timestamp: "1594395237695",
    hash: "d065183a15d9685ba03ca919ec79c54e",
    limit: "20"
  }

  // key de outra conta
  // const key = {
  //   public_key: "a426809c0b8fe784902b489148a23319",
  //   timestamp: "1594247367214",
  //   hash: "84e25fe88a9ef7c89ea1f9ccd0680ac1",
  //   limit: "4"
  // }

  // key da mh conta hotmail
  // const key = {
  //   public_key: "86cfff8f9319d4fae2be20a7cd1b2ee1",
  //   timestamp: "1594345144761",
  //   hash: "52206ae592ca805795a9fa2340905fcf",
  //   limit: 2
  // }

  // https://gateway.marvel.com:443/v1/public/characters/1011334?apikey=a426809c0b8fe784902b489148a23319&ts=1594247367214&hash=84e25fe88a9ef7c89ea1f9ccd0680ac1

  // https://gateway.marvel.com/v1/public/characters?offset=0&limit=1&apikey=5aac5bc626f58d061575c2cb8f0e446e&ts=1594251731556&hash=bf688566c0f2c1f5e84773e0dd3141f6

  // const mock_info = [
  //   {
  //     id: 1,
  //     name: "Homem-aranha",
  //     image: "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80",
  //     description: "Bitten by a radioactive spider, Peter Parker’s arachnid abilities give him amazing powers he uses to help others, while his personal life continues to offer plenty of obstacles.",

  //   }
  // ]

  useEffect( () => {
    console.log(characters)
  }, [characters])

  
  useEffect( () => {
    getCharacters()
  }, [])

  async function getCharacters (param) {
    console.log("event:", param)
    let route = ''
    if(param) {
      route = `characters?name=${param}&orderBy=name&offset=0&limit=${key.limit}&apikey=${key.public_key}&ts=${key.timestamp}&hash=${key.hash}`
    } else {
      route = `characters?orderBy=name&offset=0&limit=${key.limit}&apikey=${key.public_key}&ts=${key.timestamp}&hash=${key.hash}`
    }

    try {
      // const response = await api.get(`/v1/public/characters?orderBy=name&offset=0&limit=${key.limit}&apikey=${key.public_key}&ts=${key.timestamp}&hash=${key.hash}`);
      console.log(route)
      const response = await api.get(route)
      console.log('response:', response)
      const { data } = response.data;
      setCharacters(data.results);
    } catch (error) {
      console.log(error)
    }
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
      }, 300);
    }
    
    debouncedFn();
  }


  // function search(e) {
  //   debounce(getCharacters(e.target.value), 500, { 'maxWait': 1000 })
  // }


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
      // onChange={(event) => debounce(getCharacters(event), 500)} 
      onChange={search}
      />
    </nav>
    
    <div className="container-characters">

      {characters && characters.map( item => (
        <Link key={item.id} to={`/characters/${item.id}`}>
          <div className="card">
            <div className="card-poster">
              <img 
              src={`${item.thumbnail.path}.${item.thumbnail.extension}`} 
              alt={item.name}/>
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