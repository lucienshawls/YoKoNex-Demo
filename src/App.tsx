import { useState } from 'react'
import Login from './components/Login'
import Send from './components/Send'

function App() {
  const [userID, setUserID] = useState('')
  const [gameToken, setGameToken] = useState('')

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Demo 首页</h1>
      <Login userID={userID} gameToken={gameToken} setUserID={setUserID} setGameToken={setGameToken} />
      <Send userID={userID} gameToken={gameToken} />
    </div>
  )
}

export default App
