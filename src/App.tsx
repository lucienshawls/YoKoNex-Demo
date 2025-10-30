import { useState, useRef } from 'react'
import { ChatSDK } from '@tencentcloud/chat'
import Login from './components/Login'
import Send from './components/Send'

function App() {
  const [userID, setUserID] = useState('')
  const [gameToken, setGameToken] = useState('')
  const chatRef = useRef<ChatSDK | null>(null)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-4">YoKoNex Demo</h1>
      <Login chatRef={chatRef} userID={userID} gameToken={gameToken} setUserID={setUserID} setGameToken={setGameToken} />
      <Send chatRef={chatRef} userID={userID} gameToken={gameToken} />
    </div>
  )
}

export default App
