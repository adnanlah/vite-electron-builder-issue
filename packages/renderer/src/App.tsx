import { useEffect, useState } from 'react'

function App() {
  const [random, setRandom] = useState('')

  const fetchApi = () => {
    fetch('http://localhost:3000/random')
      .then(res => {
        console.log(res)
        return res.text()
      })
      .then(setRandom)
  }

  useEffect(() => {
    fetchApi()
  }, [])

  return (
    <div>
      <h4>Random string is: {random}</h4>
      <button onClick={fetchApi}>Fetch random string</button>
    </div>
  )
}

export default App
