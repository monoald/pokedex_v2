import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Pokedex from '../pages/Pokedex';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/pokedex' element={<Pokedex />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
