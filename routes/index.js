/**
 * 首页相关路由
 */
const express = require('express')
const pool = require('../pool')
var router = express.Router()

/**首页商品
 * GET /index
 */
router.get('/',(req,res) => {
  var output = {}
  var sql = `SELECT * FROM hlg_carousel;
             SELECT did,title,(SELECT sm FROM hlg_product_pic WHERE product_id=did LIMIT 1) AS sm FROM hlg_product_detail LIMIT 8;
             SELECT sid,shop_name,pic FROM hlg_shop LIMIT 4;
             SELECT did,subtitle,price,(SELECT md FROM hlg_product_pic WHERE product_id=did LIMIT 1) AS md FROM hlg_product_detail LIMIT 25`
  pool.query(sql,(err,result) => {
    if(err) throw err
    output.lbList = result[0]
    output.rmList = result[1]
    output.dpList = result[2]
    output.tjList = result[3]
    res.send(output)
  })             
})


module.exports = router