import React, { useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { AppContext } from './contexts/app.context'
import CartLayout from './layouts/CartLayout'
import MainLayout from './layouts/MainLayout'
import RegisterLayout from './layouts/RegisterLayout'
import Cart from './pages/Cart'
import Login from './pages/Login'
import ProductDetail from './pages/ProductDetail'
import ProductList from './pages/ProductList'

import Register from './pages/Register'
import UserLayout from './pages/User/layouts/UserLayout'
import ChangePassword from './pages/User/pages/ChangePassword'
import HistoryPurchase from './pages/User/pages/HistoryPurchase'
import Profile from './pages/User/pages/Profile'
import NotFound from './pages/NotFound'
function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}
function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

const useRouteElements = () => {
  const routeElements = useRoutes([
    {
      path: '/',
      index: true,
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: 'cart',
          element: (
            <CartLayout>
              <Cart />
            </CartLayout>
          )
        },
        {
          path: 'user',
          element: (
            <MainLayout>
              <UserLayout />
            </MainLayout>
          ),
          children: [
            {
              path: '/user/profile',
              element: <Profile />
            },
            {
              path: '/user/password',
              element: <ChangePassword />
            },
            {
              path: '/user/purchase',
              element: <HistoryPurchase />
            }
          ]
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: '/login',
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        },
        {
          path: '/register',
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        }
      ]
    },
    {
      path: '/:nameId',
      element: (
        <MainLayout>
          <ProductDetail />
        </MainLayout>
      )
    },
    {
      path: '*',
      element: (
        <MainLayout>
          <NotFound />
        </MainLayout>
      )
    }
  ])
  return routeElements
}

export default useRouteElements
