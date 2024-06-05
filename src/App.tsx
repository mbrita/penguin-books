import React, { createContext, useContext, useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Home from './pages/home/Home'
import BookPage from './pages/bookPage/BookPage'
import FavoriteBooks from './pages/favoriteBooks/FavoriteBooks'
import Cart from './pages/cart/Cart'

export const FavoriteBookContext = createContext<any>([])
export const MyCart = createContext<any>([])

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/book/:id',
    element: <BookPage />,
  },
  {
    path: '/favbooks',
    element: <FavoriteBooks />,
  },
  {
    path: '/cart',
    element: <Cart />,
  },
])

function App() {
  const [favoriteBook, setFavoriteBook] = useState<any[]>([])
  const [cart, setCart] = useState<any[]>([])
  return (
    <FavoriteBookContext.Provider value={{ favoriteBook, setFavoriteBook }}>
      <MyCart.Provider value={{ cart, setCart }}>
        <RouterProvider router={router} />
      </MyCart.Provider>
    </FavoriteBookContext.Provider>
  )
}
export default App
