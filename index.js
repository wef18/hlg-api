/**
 * 欢乐购项目API子系统
 */
//监听端口
const PORT = 8080

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const session = require('express-session')

const userRouter = require('./routes/user')
const indexRouter = require('./routes/index')
const classifyRouter = require('./routes/classify')

//创建HTTP应用服务器
var app = express();
app.listen(PORT, () => {
  console.log('Server Listening：' + PORT)
})


//使用第三方中间件
app.use(cors({
	'credentials':true
}))
app.use(bodyParser.json())
app.use(session({
  secret :  'secret', // 对session id 相关的cookie 进行签名
  resave : true,
  saveUninitialized: false, // 是否保存未初始化的会话
  cookie : {
      maxAge : 1000 * 60 * 3, // 设置 session 的有效时间，单位毫秒
  },
}));

app.use('/user',userRouter)
app.use('/index',indexRouter)
app.use('/classify',classifyRouter)