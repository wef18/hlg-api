/**
 * 分类相关路由
 */
const express = require('express')
const pool = require('../pool')
var router = express.Router()

/**
 * GET /classify
 * 获取所有商品(按品牌进行分类)
 */
router.get('/',(req,res) => {
  var sql = 'SELECT pid,brand FROM hlg_brand ORDER BY pid'
  pool.query(sql,(err,result) => {
    if(err) throw err
    var classifyList = result
    var count = 0
    for(let c of classifyList){
      var sql1 = 'SELECT did,subtitle,price,(SELECT md FROM hlg_product_pic WHERE product_id=did LIMIT 1) AS md FROM hlg_product_detail WHERE brand_id=? ORDER BY did'
      pool.query(sql1,c.pid,(err,result) => {
        if(err) throw err
        c.goodsList = result
        count ++
        if(count == classifyList.length){
          res.send(classifyList)
        }
      })
    }
  })
})
/**
 * 获取指定商品的全部信息
 * GET /classify/detail/:did
 */
router.get('/detail/:did',(req,res) => {
  var did = req.params.did
  var output = {}
  var sql = `SELECT * FROM hlg_product_detail WHERE did=?;
             SELECT lg FROM hlg_product_pic WHERE product_id=?;
             SELECT shop_id,(SELECT shop_name FROM hlg_shop WHERE shop_id=sid) AS shop_name,(SELECT pic FROM hlg_shop WHERE shop_id=sid) AS pic FROM hlg_product_detail WHERE did=?`
  pool.query(sql,[did,did,did],(err,result) => {
    if(err) throw err
    output.detailList = result[0]
    output.picList = result[1]
    output.shopList = result[2]
    res.send(output)
  })
})

module.exports = router