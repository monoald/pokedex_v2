import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../containers/Layout';
import Home from '../pages/Home';

const App = () => {
  return (
    <BrowserRouter>
      {/* <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </Layout> */}
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;