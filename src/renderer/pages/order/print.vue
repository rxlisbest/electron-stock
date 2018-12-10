<template>
  <el-container class="print-container">
    <el-main class="print" style="padding-left: 0px; padding-right: 0px;">
      <el-row class="el-row-bottom-0" v-if="visiable">
        <el-col :span="2">
          <el-button type="primary" icon="el-icon-back" @click="goBack()" title="返回"></el-button>
        </el-col>
        <el-col :offset="20" :span="2">
          <el-button type="primary" icon="el-icon-printer" @click="print()" class="button-right" title="打印"></el-button>
        </el-col>
      </el-row>
      <div @click="showButton(true)">
        <el-row class="el-row-bottom-0">
          <el-col :span="24">
            客户：{{user.name}}
          </el-col>
        </el-row>
        <el-row class="el-row-bottom-0">
          <el-col :span="24">
            时间：{{Moment(order.create_time).format("YYYY-MM-DD HH:mm:ss")}}
          </el-col>
        </el-row>
        <el-row class="el-row-bottom-0">
          <el-col :span="10">名称</el-col>
          <el-col :span="8">单价*数量</el-col>
          <el-col :span="6" class="el-col-price">小结</el-col>
        </el-row>
        <el-row v-for="v in list">
          <el-col :span="10">{{v.name}}</el-col>
          <el-col :span="8">{{v.price}}*{{v.amount}}</el-col>
          <el-col :span="6" class="el-col-price">{{getRowTotal(v)}}</el-col>
        </el-row>
        <div class="bottom clearfix">
          <el-row>
            <el-col :offset="18" :span="6" class="el-col-price">{{order.total.toFixed(2)}}</el-col>
          </el-row>
        </div>
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
  import User from '../../db/user'
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
        },
        user: {
          name: '',
          phone: ''
        },
        visiable: true
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
            _this.handleUser(row.user_id)
          } else {
            console.error(err)
          }
        })
      },
      handleUser (userId) {
        let _this = this
        let o = {}
        o.where = {id: userId}
        User.get(o, function (err, row) {
          if (err === null) {
            _this.user = row
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
        this.showButton(false)
        new Promise((resolve, reject) => {
          resolve(true)
        }).then(() => {
          ipcRenderer.send('print')
        })
      },
      goBack () {
        this.$router.go(-1)
      },
      showButton (visiable) {
        this.visiable = visiable
      }
    }
  }
</script>

<style>
  .el-col {
    text-align: left;
  }
  .bottom {
    border-top: 1px solid #000000;
  }
  .button-right {
    float: right;
  }
  .el-row-bottom-0 {
    margin-bottom: 0px !importment;
    border-bottom: 1px solid #000000;
  }
  .el-col-price {
    text-align: right;
  }
  .print {
    cursor: pointer;
    font-size: 9px;
  }
  .print-container {
    margin: -8px;
  }
  .print-container .el-row {
    margin-bottom: 0px;
  }
  .print-container .el-main {
    padding: 0px;
  }
</style>
