import { useState } from 'react'
import { send } from '@/yokonex'

interface SendProps {
    userID: string,
    gameToken: string,
}

export default function Send({ userID, gameToken }: SendProps) {
  const [dataInput, setDataInput] = useState('')

  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 space-y-4">
      <h2 className="text-xl font-semibold">发送消息</h2>
      <textarea
        value={dataInput}
        onChange={(e) => setDataInput(e.target.value)}
        placeholder='请输入指令索引，例如：0'
        className="w-full h-32 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none font-mono text-sm"
      />
      <button
        onClick={() => send(userID, gameToken, Number(dataInput))}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors"
      >
        发送消息
      </button>
      {/* {sendStatus && <p className="text-center text-gray-700 mt-1">{sendStatus}</p>} */}
    </div>
  )
}
