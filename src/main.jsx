import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './Router/Router.jsx'
import Aos from 'aos';
import 'aos/dist/aos.css';
import AuthProvider from './contexts/AuthContext/AuthProvider.jsx'

Aos.init();
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className=''>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  </StrictMode>
)
