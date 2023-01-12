import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import TaskList from './pages/TaskList';
import TaskDetails from './pages/TaskDetails';


// Définition des routes
const router = createBrowserRouter([
  { path: '/', element: <TaskList /> },
  { path: '/details/:id', element: <TaskDetails /> },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
    </RouterProvider>
  </React.StrictMode>,
)
