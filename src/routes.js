import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

// pages
import Home from './Pages/Home/home';
import Details from './Pages/Details/details';

const Routes = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home} />
      <Route path="/characters/:id" component={Details} />
    </BrowserRouter>
  )
}

export default Routes;