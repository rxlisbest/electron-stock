<template>
  <el-container>
    <el-header>
      <el-row :gutter="20">
  		<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
		  <el-menu-item index="1">处理中心</el-menu-item>
		  <el-submenu index="2">
		    <template slot="title">我的工作台</template>
		    <el-menu-item index="2-1">选项1</el-menu-item>
		    <el-menu-item index="2-2">选项2</el-menu-item>
		    <el-menu-item index="2-3">选项3</el-menu-item>
		    <el-submenu index="2-4">
		      <template slot="title">选项4</template>
		      <el-menu-item index="2-4-1">选项1</el-menu-item>
		      <el-menu-item index="2-4-2">选项2</el-menu-item>
		      <el-menu-item index="2-4-3">选项3</el-menu-item>
		    </el-submenu>
		  </el-submenu>
		  <el-menu-item index="3" disabled>消息中心</el-menu-item>
		  <el-menu-item index="4"><a href="">订单管理</a></el-menu-item>
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
    data () {
      return {
      }
    },
    methods: {
      open (link) {
      }
    }
  }
</script>

<style>
</style>
