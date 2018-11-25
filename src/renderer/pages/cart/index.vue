<template>
  <el-container style="height: 500px;">
    <el-row>
      <el-col :span="8">
        <el-aside style="height: 500px; border: 1px solid #eee">
          <el-menu :default-openeds="['1', '2']">
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
            <el-menu-item index="1-3">选项3</el-menu-item>
            <el-menu-item index="1-4">选项4</el-menu-item>
            <el-menu-item index="1-5">选项5</el-menu-item>
            <el-menu-item index="1-6">选项6</el-menu-item>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
            <el-menu-item index="1-3">选项3</el-menu-item>
            <el-menu-item index="1-4">选项4</el-menu-item>
            <el-menu-item index="1-5">选项5</el-menu-item>
            <el-menu-item index="1-6">选项6</el-menu-item>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
            <el-menu-item index="1-3">选项3</el-menu-item>
            <el-menu-item index="1-4">选项4</el-menu-item>
            <el-menu-item index="1-5">选项5</el-menu-item>
            <el-menu-item index="1-6">选项6</el-menu-item>
          </el-menu>
        </el-aside>
      </el-col>
      <el-col :span="8">
        <el-aside style="height: 500px; border: 1px solid #eee">
          <el-row class="row-bg">
            <el-col :span="8"><div class="grid-content bg-purple">1</div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple-light">2</div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple">3</div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple-light">4</div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple">5</div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple-light">6</div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple">1</div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple-light">2</div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple">3</div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple-light">4</div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple">5</div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple-light">6</div></el-col>
          </el-row>
        </el-aside>
      </el-col>
      <el-col :span="8">
        <el-aside style="height: 500px; border: 1px solid #eee">
          <el-menu :default-openeds="['1', '2']">
            <el-menu-item index="1-1">
              选项1
              <el-input-number size="mini" v-model="num6"></el-input-number>
            </el-menu-item>
            <el-menu-item index="1-1">
              选项1
              <el-input-number size="small" v-model="num6"></el-input-number>
            </el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
            <el-menu-item index="1-3">选项3</el-menu-item>
            <el-menu-item index="1-4">选项4</el-menu-item>
            <el-menu-item index="1-5">选项5</el-menu-item>
            <el-menu-item index="1-6">选项6</el-menu-item>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
            <el-menu-item index="1-3">选项3</el-menu-item>
            <el-menu-item index="1-4">选项4</el-menu-item>
            <el-menu-item index="1-5">选项5</el-menu-item>
            <el-menu-item index="1-6">选项6</el-menu-item>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
            <el-menu-item index="1-3">选项3</el-menu-item>
            <el-menu-item index="1-4">选项4</el-menu-item>
            <el-menu-item index="1-5">选项5</el-menu-item>
            <el-menu-item index="1-6">选项6</el-menu-item>
          </el-menu>
        </el-aside>
      </el-col>
    </el-row>
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
    InputNumber
  } from 'element-ui'
  import Layout from '../../components/layout'

  export default {
    name: 'landing-page',
    components: {
      Container,
      Header,
      Main,
      Col,
      Row,
      Layout,
      Aside,
      Menu,
      Submenu,
      MenuItem,
      InputNumber
    },
    methods: {
      open (link) {
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
