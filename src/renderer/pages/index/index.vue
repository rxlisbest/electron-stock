<template>
  <el-container>
    <el-header></el-header>
    <el-main class="my-index">
      <el-row :gutter="30">
        <el-col :span="12">
          <el-card shadow="hover" @click.native="open('categories')">
            <p><i class="el-icon-menu"></i></p>
            分类管理
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card shadow="hover" @click.native="open('goods')">
            <p><i class="el-icon-goods"></i></p>
            商品管理
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="12">
          <el-card shadow="hover" @click.native="open('users')">
            <p><i class="el-icon-service"></i></p>
            客户管理
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card shadow="hover" @click.native="open('orders')">
            <p><i class="el-icon-sold-out"></i></p>
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
  .my-index .el-card {
    cursor: pointer;
    font-size: 30px;
    text-align: center;
  }
  .el-col {
    text-align: center;
  }
</style>
