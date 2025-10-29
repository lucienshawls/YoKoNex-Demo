import { login } from '@/yokonex'

interface LoginProps {
    userID: string,
    gameToken: string,
    setUserID: (id: string) => void,
    setGameToken: (token: string) => void,
}

export default function Login({ userID, gameToken, setUserID, setGameToken }: LoginProps) {
  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 space-y-4">
      <h2 className="text-xl font-semibold">登录</h2>
      <div className="flex flex-col space-y-3">
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">User ID</label>
          <input
            type="text"
            placeholder="请输入UID"
            value={userID}
            onChange={(e) => setUserID(e.target.value)}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="text-xs text-gray-500 mt-1">App 中显示的 uid</span>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Game Token</label>
          <input
            type="text"
            placeholder="请输入Token"
            value={gameToken}
            onChange={(e) => setGameToken(e.target.value)}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="text-xs text-gray-500 mt-1">App 中显示的游戏 token</span>
        </div>

        <button
          onClick={() => login(userID, gameToken)}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
        >
          登录
        </button>

        {/* {loginStatus && <p className="text-center text-gray-700 mt-1">{loginStatus}</p>} */}
      </div>
    </div>
  )
}
