import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import routes from "../src/data/routes";

import './css/style.css';

// rotas de paginas

function App(){
    const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>

        {/* 404 */}
        <Route exact path="*" element={<Return404 />} />

      </Routes>
    </>
  );
}

export default App;
