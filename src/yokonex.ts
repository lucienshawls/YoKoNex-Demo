import TC from '@tencentcloud/chat'
import { ChatSDK } from '@tencentcloud/chat'

interface LoginRes {
    success: boolean,
    message: string,
    chat: ChatSDK | null,
}

interface SendRes {
    success: boolean,
    message: string,
}

export async function login(userID: string, gameToken: string): Promise<LoginRes> {
  const loginRes: LoginRes = {
    success: false,
    message: '',
    chat: null,
  }
  if (!userID || !gameToken) {
    loginRes.success = false
    loginRes.message = '请填写完整的 UserID 和 Game Token'
    return loginRes
  }
  try {
    // 1️⃣ 请求后端获取 SDKAppID 和 userSig
    const fetchRes = await fetch('https://suo.jiushu1234.com/api.php/user/game_sign', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        uid: `game_${userID}`,
        token: gameToken,
      }),
    })
    const data = await fetchRes.json()

    const SDKAppID = data.data.appid
    const userSig = data.data.sign

    // 2️⃣ 创建腾讯 IM 实例（单例）
    const chat = TC.create({ SDKAppID: SDKAppID })
    if (!chat) throw new Error('UserID 或 Game Token 无效')
    chat.setLogLevel(4)

    // 3️⃣ 登录
    const res = await chat.login({
      userID: `game_${userID}`,
      userSig: userSig,
    })
    loginRes.success = true
    loginRes.message = res.data?.errorInfo || '登录成功'
    loginRes.chat = chat
    return loginRes
  } catch (err) {
    loginRes.success = false
    loginRes.message = err instanceof Error ? err.message : '登录失败，未知错误'
    return loginRes
  }
}

export async function send(chat: ChatSDK | null, userID: string, gameToken: string, data: number): Promise<SendRes> {
  const sendRes: SendRes = {
    success: false,
    message: '',
  }
  if (!chat) {
    sendRes.success = false
    sendRes.message = '未登录，无法发送消息'
    return sendRes
  }
  try {
    const msg = chat.createTextMessage({
      to: String(userID),
      conversationType: TC.TYPES.CONV_C2C,
      payload: {
          text: JSON.stringify({
            code: 'game_info',
            data: Number(data),
            token: String(gameToken)
          })
      }
    })
    const res = await chat.sendMessage(msg)
    sendRes.success = res.code === 0
    sendRes.message = res.code === 0 ? '发送成功' : '发送失败，未知错误'
    return sendRes
  } catch (err) {
    sendRes.success = false
    sendRes.message = err instanceof Error ? err.message : '发送失败，未知错误'
    return sendRes
  }
}
