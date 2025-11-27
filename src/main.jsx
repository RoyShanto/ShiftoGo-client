import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router'
import { router } from './Router/Router.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='max-w-7xl mx-auto bg-base-200 p-12'>
      <RouterProvider router={router} />
    </div>
  </StrictMode>,
)
