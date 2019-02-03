/**
 * 用户信息相关路由
 */
const express = require('express')
const pool = require('../pool')
var router = express.Router()

/**用户登录
 * POST /user/login
 */
router.post('/login',(req,res) => {
  var uname = req.body.uname
  var upwd = req.body.upwd
  if(!uname) {
    res.send({code: 401, msg: "uname required"})
    //阻止后续执行
    return
  }
  if(!upwd) {
    res.send({code: 402, msg: "upwd required"})
    return;
  }
  var sql = 'SELECT uid FROM hlg_user WHERE uname=? AND upwd=PASSWORD(?) LIMIT 1'
  pool.query(sql, [uname, upwd], (err,result) => {
    if(err) throw err;
    if(result.length > 0) {
      req.session.loginUname = uname
      req.session.loginUid = result[0].uid
      res.send({code: 200, msg: 'login succ',uid:req.session.loginUid})
      console.log(req.session)
      console.log(req.session.loginUid)
    }else {
      res.send({code: 400, msg: 'uname or upwd err'})
    }
  })
})
/**用户注册
 * POST /user/register
 */
router.post('/register',(req,res) => {
  var uname = req.body.uname
  var upwd = req.body.upwd
  var phone = req.body.phone
  var ctime = req.body.ctime
  if(!uname) {
    res.send({code: 401, msg: "uname required"})
    //阻止后续执行
    return
  }
  if(!upwd) {
    res.send({code: 402, msg: "upwd required"})
    return;
  }
  if(!phone) {
    res.send({code: 403, msg: "phone required"})
    return
  }
  var sql = 'INSERT INTO hlg_user (uname, upwd, phone, ctime) VALUES(?,PASSWORD(?),?,?)'
  pool.query(sql, [uname, upwd, phone, ctime], (err,result) => {
    if(err) throw err;
    if(result.affectedRows > 0) {
      res.send({code: 200, msg: 'register succ'})
    }else {
      res.send({code: 400, msg: 'register err'})
    }
  })
})
/**
 * 用户退出
 * GET /user/logout
 */
router.get('/logout',(req,res) => {
  req.session.destroy();
  res.send({code: 200, msg: 'logout succ'})
})
/**
 * 返回当前用户的登录信息
 * GET /user/sessiondata
 */
router.get("/message",(req,res)=>{
  // var uid = req.session
  // res.send({uid:req.session.loginUid})
  // console.log(uid)
  // var sql = 'SELECT uname,email,phone,hlg_name,picture,ctime,age,birthday,gender,alias,province,city,county FROM hlg_user WHERE uid=? LIMIT 1'
  // pool.query(sql,uid,(err,result) => {
  //   if(err) throw err
  //   if(result.length > 0){
  //     res.send(result)
  //   }
  // })
})


module.exports = router