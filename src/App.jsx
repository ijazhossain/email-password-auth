import { useState } from 'react'
import Header from './components/Header/Header'
import { Outlet } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Header/>
      <Outlet/>
    </div>
  )
}

export default App
