<template>
  <el-container>
    <el-header>
      <el-row :gutter="20">
        <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="16"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
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
