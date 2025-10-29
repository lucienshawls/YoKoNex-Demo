import TC from '@tencentcloud/chat'
import { ChatSDK } from '@tencentcloud/chat'

let chat: ChatSDK | null = null

export async function login(userID: string, gameToken: string) {
  try {
    // 1️⃣ 请求后端获取 SDKAppID 和 userSig
    const res = await fetch('https://suo.jiushu1234.com/api.php/user/game_sign', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        uid: `game_${userID}`,
        token: gameToken,
      }),
    })
    const data = await res.json()

    const SDKAppID = data.data.appid
    const userSig = data.data.sign

    // 2️⃣ 创建腾讯 IM 实例（单例）
    if (!chat) chat = TC.create({ SDKAppID: SDKAppID })
    chat.setLogLevel(4)

    // 3️⃣ 登录
    const loginRes = await chat.login({
      userID: `game_${userID}`,
      userSig: userSig,
    })
    console.log('✅ 登录成功', loginRes)
  } catch (err) {
    console.error('❌ 登录失败', err)
  }
}

export async function send(userID: string, gameToken: string, data: number) {
    if (!chat) {
      console.error('❌ 未登录，无法发送消息')
      return
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
        console.log('✅ 发送消息成功', { res })
    } catch (err) {
      console.error('❌ 发送消息失败', err)
    }
}
