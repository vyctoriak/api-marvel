import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

// pages
import Home from './Pages/Home/home';

const Routes = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home} />
    </BrowserRouter>
  )
}

export default Routes;