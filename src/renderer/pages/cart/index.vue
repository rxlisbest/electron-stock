<template>
  <el-container style="height: 500px;">
    <el-row style="width: 100%;">
      <el-col :span="6">
        <div style="height: 500px; border: 1px solid #eee; overflow: auto;">
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
        </div>
      </el-col>
      <el-col :span="6">
        <div style="height: 500px; border: 1px solid #eee; overflow: auto;">
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
        </div>
      </el-col>
      <el-col :span="12">
        <div style="height: 450px; border: 1px solid #eee; overflow: auto;">
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              label="名称" prop="name">
            </el-table-column>
            <el-table-column
              label="单价" prop="price" width="80">
            </el-table-column>
            <el-table-column label="数量" width="150">
              <template slot-scope="scope">
                <el-input-number size="mini" v-model="num6" style="width: 100%;"></el-input-number>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="60">
              <template slot-scope="scope">
                <el-button size="mini" type="danger" icon="el-icon-delete" circle></el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div style="width: 100%; position: relative; height: 48px; border: 1px solid #eee;">
          <el-row type="flex" class="row-bg" justify="space-between" style="height: 100%;">
            <el-col :md="8" style="text-align: center;">
              合计
            </el-col>
            <el-col :md="8" style="text-align: center;">
              ￥1000.00
            </el-col>
          </el-row>
        </div>
        </div>
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
    InputNumber,
    Button,
    Table
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
      InputNumber,
      Button,
      Table
    },
    data () {
      return {
        tableData: [{
          name: '测试1',
          price: '1.00'
        }, {
          name: '测试1',
          price: '1.00'
        }, {
          name: '测试1',
          price: '1.00'
        }, {
          name: '测试1',
          price: '1.00'
        }, {
          name: '测试1',
          price: '1.00'
        }, {
          name: '测试1',
          price: '1.00'
        }, {
          name: '测试1',
          price: '1.00'
        }, {
          name: '测试1',
          price: '1.00'
        }, {
          name: '测试1',
          price: '1.00'
        }, {
          name: '测试1',
          price: '1.00'
        }, {
          name: '测试1',
          price: '1.00'
        }, {
          name: '测试1',
          price: '1.00'
        }, {
          name: '测试1',
          price: '1.00'
        }, {
          name: '测试1',
          price: '1.00'
        }]
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
