<template>
  <el-container>
    <el-header>
      <el-row :gutter="20">
    		<el-menu :default-active="index" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    		  <el-menu-item index="index">首页</el-menu-item>
    		  <el-menu-item index="categories">分类管理</el-menu-item>
          <el-menu-item index="goods">商品管理</el-menu-item>
          <el-menu-item index="users">客户管理</el-menu-item>
    		</el-menu>
      </el-row>
    </el-header>
    <el-main>
      <slot name="body"></slot>
    </el-main>
  </el-container>
</template>

<script>
  import {
    Container,
    Header,
    Main,
    Col,
    Row
  } from 'element-ui'
  export default {
    name: 'landing-page',
    components: {
      Container,
      Header,
      Main,
      Col,
      Row
    },
    props: [
      'index'
    ],
    data () {
      return {
      }
    },
    methods: {
      handleSelect (key, keyPath) {
        this.$router.push({name: key + '-index'})
      }
    }
  }
</script>

<style>
</style>
