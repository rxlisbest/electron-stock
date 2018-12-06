<template>
  <el-container>
    <el-header></el-header>
    <el-main>
      <el-row :gutter="12">
        <el-col :span="8">
          <el-card shadow="hover" @click.native="open('categories')">
            <p><i class="el-icon-delete"></i></p>
            分类管理
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover" @click.native="open('goods')">
            <p><i class="el-icon-goods"></i></p>
            商品管理
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover" @click.native="open('users')">
            <p><i class="el-icon-delete"></i></p>
            客户管理
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="8">
          <el-card shadow="hover" @click.native="open('orders')">
            <p><i class="el-icon-delete"></i></p>
            订单管理
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
  import {
    Container,
    Header,
    Main,
    Footer,
    Col,
    Row
  } from 'element-ui'

  export default {
    name: 'landing-page',
    components: {
      Container,
      Header,
      Main,
      Footer,
      Col,
      Row
    },
    methods: {
      open (index) {
        this.$router.push({name: index + '-index'})
      }
    }
  }
</script>

<style>
  .el-card {
    cursor: pointer;
  }
  .el-col {
    text-align: center;
  }
</style>
