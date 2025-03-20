import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastContainer, toast } from 'react-toastify';
import { RouterProvider } from "react-router";
import AppRouter from './routes';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <>
    <RouterProvider router={AppRouter} />
    {/* <App /> */}
    <ToastContainer />
  </>
   
  // </StrictMode>,
)
