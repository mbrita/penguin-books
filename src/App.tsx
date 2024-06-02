import React, { createContext, useContext, useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Home from './pages/home/Home'
import BookPage from './pages/bookPage/BookPage'
import FavoriteBooks from './pages/favoriteBooks/FavoriteBooks'

export const FavoriteBookContext = createContext<any>([])

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
])

function App() {
  const [favoriteBook, setFavoriteBook] = useState<any[]>([])
  return (
    <FavoriteBookContext.Provider value={{ favoriteBook, setFavoriteBook }}>
      <RouterProvider router={router} />
    </FavoriteBookContext.Provider>
  )
}
export default App
