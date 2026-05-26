import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthRoot from './pages/AuthRoot/AuthRoot'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import DashboardRoot from './pages/DashboardRoot/DashboardRoot'
import ReadProducts from './pages/ReadProducts/ReadProducts'
import ShowProduct from './pages/ShowProduct/ShowProduct'
import AddProduct from './pages/AddProduct/AddProduct'
import EditProduct from './pages/EditProduct/EditProduct'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <AuthRoot/>,
    children: [
      { 
        path: '',
        element: <SignIn/> 
      },
      { 
        path: 'signup', 
        element: <SignUp/> 
      }
    ]
  },
  {
    path: '/dashboard',
    element: <DashboardRoot/>,
    children: [
      {
        path: '',                    
        element: <ReadProducts/> 
      },
      { 
        path: 'add',        
        element: <AddProduct/> 
      },
      {
        path: 'products/:id',        
        element: <ShowProduct/> 
      },
      {
        path: 'edit/:id',        
        element: <EditProduct/> 
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>,
)
