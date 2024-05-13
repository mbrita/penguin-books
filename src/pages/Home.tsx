import React, { useState, useEffect } from 'react'
import Nav from '../components/nav/Nav'

function Home() {
  const [data, setData] = useState<{ items: any[] } | null>(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://www.googleapis.com/books/v1/volumes?q=movie&key=AIzaSyBTpPuZir6oCiyUril5eBdKo0_dr91yAh0&maxResults=6'
      )

      const jsonData = await response.json()
      console.log(response, jsonData)
      setData(jsonData)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  return (
    <>
      <Nav />
      <div>
        <h1>Books:</h1>
        {data && data.items ? (
          <ul>
            {data.items.map((item, index) => (
              <li key={index}>
                <h2>{item.volumeInfo.title}</h2>
                <p>{item.volumeInfo.authors.join(', ')}</p>
                <p>{item.volumeInfo.description}</p>
                <img src={item.volumeInfo.imageLinks.thumbnail} alt="" />
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  )
}

export default Home
