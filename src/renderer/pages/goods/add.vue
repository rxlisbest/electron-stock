<template>
  <layout index="goods">
    <template slot="body">
      <el-row>
        <el-col :span="18">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ name: 'goods-index' }">商品管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ name: 'goods-add' }">新增</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
      </el-row>
      
      <el-form ref="ruleForm" :model="form" :rules="rules" label-width="80px" class="demo-ruleForm">
        <el-form-item prop="name" label="商品名称">
          <el-col :span="8">
            <el-input v-model="form.name"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item prop="category_id" label="分类">
          <el-select v-model="form.category_id" placeholder="请选择">
            <el-option
              v-for="item in categories"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="price" label="单价">
          <el-input-number v-model="form.price" :precision="2" :step="1" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item prop="amount" label="库存">
          <el-input-number v-model="form.amount" :precision="2" :step="1" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item prop="unit" label="单位">
          <el-col :span="3">
            <el-input v-model="form.unit"></el-input>
          </el-col>（例：千克、个... ...）
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
  import Category from '../../db/category'
  // Goods.all(function (err, rows) {
  //   console.log(err)
  //   console.log(rows)
  // })
  // Goods.edit({name: 'test', create_time: 1234567890}, {name: 'test123', create_time: 1234567890})

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
    data () {
      function repeatName (rule, value, callback) {
        Goods.all({where: {name: value}}, function (err, rows) {
          if (err !== null) {
            callback(new Error(err))
          }
          if (rows.length > 0) {
            callback(new Error())
          } else {
            callback()
          }
        })
      }
      return {
        form: {
          name: '',
          category_id: '',
          amount: 0.00,
          price: 0.00,
          unit: ''
        },
        categories: [],
        rules: {
          name: [
            { required: true, message: '请输入商品名称', trigger: 'blur' },
            { validator: repeatName, message: '商品名称重复', trigger: 'blur' }
          ],
          category_id: [
            { required: true, message: '请选择分类', trigger: 'change' }
          ],
          price: [
            { required: true, message: '请输入单价', trigger: 'blur' }
          ],
          amount: [
            { required: true, message: '请输入库存', trigger: 'blur' }
          ],
          unit: [
            { required: true, message: '请输入单位', trigger: 'blur' }
          ]
        }
      }
    },
    created () {
      this.getCategories()
    },
    methods: {
      onSubmit () {
        let _this = this
        _this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            _this.form.create_time = new Date().getTime()
            Goods.add(_this.form, function (err, rows) {
              if (err === null) {
                _this.$router.push({name: 'goods-index'})
              } else {
                console.error(err)
              }
            })
          }
        })
      },
      onCancle () {
        this.$router.go(-1)
      },
      getCategories () {
        let _this = this
        Category.all({order: 'id DESC'}, (err, rows) => {
          if (err !== null) {
            console.error(err)
            return false
          }
          _this.categories = rows
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
