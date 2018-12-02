<template>
  <layout index="categories">
    <template slot="body">
      <el-row>
        <el-col :span="18">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ name: 'categories-index' }">分类管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ name: 'categories-add' }">新增</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
      </el-row>
      
      <el-form ref="ruleForm" :model="form" :rules="rules" label-width="80px" class="demo-ruleForm">
        <el-form-item prop="name" label="分类名称">
          <el-col :span="8">
            <el-input v-model="form.name"></el-input>
          </el-col>
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

  import Category from '../../db/category'
  // Category.all(function (err, rows) {
  //   console.log(err)
  //   console.log(rows)
  // })
  // Category.edit({name: 'test', create_time: 1234567890}, {name: 'test123', create_time: 1234567890})

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
      let _this = this
      function repeatName (rule, value, callback) {
        Category.all({where: {name: value, id: ['<>', _this.$route.params.id]}}, function (err, rows) {
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
          id: 0,
          name: '',
          create_time: 0
        },
        rules: {
          name: [
            { required: true, message: '请输入分类名称', trigger: 'blur' },
            { validator: repeatName, message: '分类名称重复', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      onSubmit () {
        let _this = this
        _this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            _this.form.create_time = new Date().getTime()
            Category.edit({id: _this.form.id}, _this.form, function (err, rows) {
              if (err === null) {
                _this.$router.push({name: 'categories-index'})
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
      handleInfo () {
        let _this = this
        let id = _this.$route.params.id
        let o = {}
        o.where = {id: id}
        Category.get(o, function (err, row) {
          if (err === null) {
            _this.form = row
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
