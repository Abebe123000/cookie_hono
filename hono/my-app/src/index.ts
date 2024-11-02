import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/api/login', async (c) => {
  // ログイン処理
  // const sessionId = generateSessionId();
  // セッションデータを保存
  // await saveSessionData(sessionId, { userId: 1 });
  c.header('Set-Cookie', 'sessionId=hoge; HttpOnly; Seure; Path=/')
  c.status(200);
  return c.body('login!');
});

app.get('/protected', async (c) => {
  const cookie = c.req.header('Cookie');
  if (!cookie) {
    return c.json({message: 'Unauthorized'}, 401);
  }
  console.log(cookie);
  const sessionId = cookie.match(/sessionId=([^;]+)/)?.[1];
  if (sessionId !== 'hoge') {
    return c.json({message: 'Unauthorized'}, 401);
  }
  // if (!sessionId) {
  //   return c.json({ message: 'Unauthorized' }, 401);
  // }
  // // セッションデータの取得
  // const sessionData = await getSessionData(sessionId);
  return c.json({ message: 'protected!'});
});


const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
