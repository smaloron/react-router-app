import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { RouterProvider, createBrowserRouter, Router } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Products from './pages/Products';
import Navbar from './components/Navbar';
import NavbarWrapper from './components/NavbarWrapper';

// Définition des routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <NavbarWrapper />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/contact', element: <Contact /> },
      { path: '/produits/:id', element: <Products /> },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
    </RouterProvider>
  </React.StrictMode>,
)
