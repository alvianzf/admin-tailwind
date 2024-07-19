import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import routes from './views/routes';
import AppProviders from './contexts/AppProviders';import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AppProviders>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {
              routes.map((route, idx) => (
                <Route key={idx} exact path={route.path} element={route.element} />
              ))
            }
          </Routes>
        </Suspense>
      </Router>
      <ToastContainer />
    </AppProviders>
  );
}

export default App;
