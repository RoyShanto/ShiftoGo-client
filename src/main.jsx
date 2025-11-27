import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './Router/Router.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='max-w-7xl mx-auto bg-base-200 p-12 max-sm:p-5'>
      <RouterProvider router={router} />
    </div>
  </StrictMode>,
)
