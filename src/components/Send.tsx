import { useState } from 'react'
import { ChatSDK } from '@tencentcloud/chat'
import { send } from '@/yokonex'

import { StatusIndicator } from './StatusIndicator'
import type { Status, StatusIndicatorProps } from './StatusIndicator'

interface SendProps {
  chatRef: React.RefObject<ChatSDK | null>,
  userID: string,
  gameToken: string,
}

export default function Send({ chatRef, userID, gameToken }: SendProps) {
  const [dataInput, setDataInput] = useState('')

  const [sendState, setSendState] = useState<StatusIndicatorProps>({
    status: 'idle',
    label: '未发送',
    message: '',
  })

  const handleSend = async () => {
    setSendState({ status: 'loading', label: '发送中...', message: '正在发送消息，请稍候...' })
    const sendRes = await send(chatRef.current, userID, gameToken, Number(dataInput))
    const status: Status = sendRes.success ? 'success' : 'error'
    const label = sendRes.success ? '发送成功' : '发送失败'
    setSendState({
      status,
      label,
      message: sendRes.message,
    })
  }

  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 space-y-4">
      <h2 className="text-xl font-semibold">发送消息</h2>
      <div className="flex flex-col space-y-3">
        <textarea
          value={dataInput}
          onChange={(e) => setDataInput(e.target.value)}
          placeholder='请输入指令索引，例如：0'
          className="w-full h-32 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none font-mono text-sm"
        />
        <button
          onClick={handleSend}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors"
        >
          发送消息
        </button>

        <StatusIndicator {...sendState} />
        {/* {sendStatus && <p className="text-center text-gray-700 mt-1">{sendStatus}</p>} */}
      </div>
    </div>
  )
}
