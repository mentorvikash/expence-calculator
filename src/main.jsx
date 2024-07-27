import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { appRoutes } from './Route/index.jsx'
import { RouterProvider } from "react-router-dom";
import ErrorBoundery from './util/ErrorBoundery.jsx'

const FallbackComponent = () => (
  <div>
    <h2>Something went wrong.</h2>
  </div>
);

const ProblematicComponent = () => {
  throw new Error('I crashed!');
  return <div>This won't render.</div>;
};


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <ErrorBoundery fallback={FallbackComponent}> */}
      <RouterProvider router={appRoutes} >
        <App />
      </RouterProvider>
    {/* </ErrorBoundery> */}
  </React.StrictMode>,
)
