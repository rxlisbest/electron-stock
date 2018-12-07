<template>
  <layout index="goods">
    <template slot="body">
      <el-row>
        <el-col :span="18">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ name: 'goods-index' }">商品管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ name: 'goods-amount' }">入库</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
      </el-row>
      
      <el-form ref="ruleForm" :model="form" :rules="rules" label-width="80px" class="demo-ruleForm">
        <el-form-item prop="name" label="商品名称">
          <el-col :span="8">
            <el-input v-model="form.name" :disabled="true"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item prop="price" label="单价">
          <el-input-number v-model="form.price" :precision="2" :step="1" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item prop="amount" label="库存">
          <el-input-number v-model="form.amount" :precision="2" :step="1" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button @click="onCancle">取消</el-button>
        </el-form-item>
      </el-form>
    </template>
  </layout>
</template>

<script>
  import {
    Container,
    Header,
    Main,
    Col,
    Row,
    Form,
    FormItem,
    Input,
    Button
  } from 'element-ui'
  import Layout from '../../components/layout'

  import Goods from '../../db/goods'

  export default {
    name: 'landing-page',
    components: {
      Container,
      Header,
      Main,
      Col,
      Row,
      Form,
      FormItem,
      Input,
      Button,
      Layout
    },
    created () {
      this.handleInfo()
    },
    data () {
      return {
        form: {
          id: 0,
          name: '',
          amount: 0.00,
          price: 0.00
        },
        categories: [],
        rules: {
          price: [
            { required: true, message: '请输入单价', trigger: 'blur' }
          ],
          amount: [
            { required: true, message: '请输入库存', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      onSubmit () {
        let _this = this
        _this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            Goods.addGoodsLog(_this.form, function () {
              _this.$message({
                type: 'success',
                message: '入库成功!',
                duration: 1000,
                onClose: () => {
                  _this.$router.push({name: 'goods-index'})
                }
              })
            })
          }
        })
      },
      onCancle () {
        this.$router.go(-1)
      },
      handleInfo () {
        let _this = this
        let id = _this.$route.query.id
        let o = {}
        o.where = {id: id}
        Goods.get(o, function (err, row) {
          if (err === null) {
            _this.form.name = row.name
            _this.form.id = row.id
          } else {
            _this.$message.error(err)
          }
        })
      }
    }
  }
</script>

<style>
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
