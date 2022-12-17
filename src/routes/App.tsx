import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AppContext from '../context/AppContext';
import useInitialState from '../hooks/useInitialState';

import Home from '../pages/Home';
import Pokedex from '../pages/Pokedex';
import Pokemon from '../pages/Pokemon';

const App = () => {
  const initialState = useInitialState();
  return (
    <AppContext.Provider value={initialState}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/pokedex' element={<Pokedex />} />
          <Route path='/pokemon/:slug' element={<Pokemon />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
};

export default App;
