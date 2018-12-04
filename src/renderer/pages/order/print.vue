<template>
  <el-container>
    <el-main class="print" style="padding-left: 0px; padding-right: 0px;">
      <el-row class="el-row-bottom-0">
        <el-col :span="20"><span>小票</span></el-col>
        <el-col :span="2">
          <el-button type="primary" icon="el-icon-back" @click="goBack()" class="button-right"></el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" icon="el-icon-printer" @click="print()" class="button-right"></el-button>
        </el-col>
      </el-row>
      <el-row v-for="v in list">
        <el-col :span="10">{{v.name}}</el-col>
        <el-col :span="8">￥{{v.price.toFixed(2)}} * {{v.amount}}</el-col>
        <el-col :span="6" class="el-col-price">￥{{getRowTotal(v)}}</el-col>
      </el-row>
      <div class="bottom clearfix">
        <el-row>
          <el-col :span="18">时间：{{Moment(order.create_time).format("YYYY-MM-DD HH:mm:ss")}}</el-col>
          <el-col :span="6" class="el-col-price">￥{{order.total.toFixed(2)}}</el-col>
        </el-row>
      </div>
    </el-main>
  </el-container>
</template>

<script>
  import {
    Container,
    Header,
    Main,
    Col,
    Row,
    Aside,
    Menu,
    Submenu,
    MenuItem,
    Input,
    Button,
    Table
  } from 'element-ui'
  import OrderGoods from '../../db/order_goods'
  import Order from '../../db/order'
  import Decimal from 'decimal.js'
  import Moment from 'moment'
  import { ipcRenderer } from 'electron'

  export default {
    name: 'cart-index',
    components: {
      Container,
      Header,
      Main,
      Col,
      Row,
      Aside,
      Menu,
      Submenu,
      MenuItem,
      Input,
      Button,
      Table
    },
    created () {
      this.handleCurrentChange()
      this.handleInfo()
    },
    data () {
      return {
        list: [],
        id: 0,
        order: {
          user_id: 0,
          total: 0.00,
          create_time: 0
        }
      }
    },
    methods: {
      Moment: Moment,
      handleCurrentChange (page) {
        let _this = this
        let id = _this.$route.query.id
        let o = {}
        o.where = {order_id: id}
        o.order = 'id DESC'
        OrderGoods.all(o, function (err, rows) {
          if (err === null) {
            _this.list = rows
          } else {
            console.error(err)
          }
        })
      },
      handleInfo () {
        let _this = this
        let id = _this.$route.query.id
        let o = {}
        o.where = {id: id}
        Order.get(o, function (err, row) {
          if (err === null) {
            _this.order = row
          } else {
            console.error(err)
          }
        })
      },
      getTotal () {
        let total = 0.00
        let amount = 0
        for (let v of this.cart) {
          if (v.order_amount === undefined) {
            v.order_amount = 0.00
          }
          let one = new Decimal(v.order_amount).mul(new Decimal(v.price)).toNumber()
          total = new Decimal(total).add(new Decimal(one)).toNumber()
          // 商品总数量
          amount = new Decimal(amount).add(new Decimal(v.order_amount)).toNumber()
        }
        this.order.total = total
        this.amount = amount
      },
      getRowTotal (goods) {
        return new Decimal(goods.amount).mul(new Decimal(goods.price)).toNumber().toFixed(2)
      },
      print () {
        ipcRenderer.send('print')
      },
      goBack () {
        this.$router.go(-1)
      }
    }
  }
</script>

<style>
  .el-col {
    text-align: left;
  }
  .bottom {
    border-top: 1px solid #eee;
  }
  .box-card {
    font-size: 12px;
  }
  .button-right {
    float: right;
  }
  .el-row-bottom-0 {
    margin-bottom: 0px !importment;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
  }
  .el-col-price {
    text-align: right;
  }
  .print {
    font-size: 12px;
  }
</style>
