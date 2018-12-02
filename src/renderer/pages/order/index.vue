<template>
  <layout index="orders">
    <template slot="body">
      <el-row>
        <el-col :span="18">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ name: 'orders-index' }">订单管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ name: 'orders-index' }">列表</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
      </el-row>

      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          type="index"
          width="80">
        </el-table-column>
        <el-table-column
          label="金额">
          <template slot-scope="scope">
            ￥{{scope.row.total.toFixed(2)}}
          </template>
        </el-table-column>
        <el-table-column
          label="客户">
          <template slot-scope="scope">
            {{scope.row.user_id}}
          </template>
        </el-table-column>
        <el-table-column
          label="下单时间">
          <template slot-scope="scope">
            {{Moment(scope.row.create_time).format("YYYY-MM-DD HH:mm:ss")}}
          </template>
        </el-table-column>
        <el-table-column
          width="60"
          label="操作">
          <template slot-scope="scope">
            <el-button @click="open({name: 'orders-detail', query: {id: scope.row.id}})" type="primary" icon="el-icon-tickets" circle></el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        background
        layout="prev, pager, next"
        :current-page="pagination.page"
        :page-size="pagination.pageSize"
        @current-change="handleCurrentChange"
        :total="pagination.count" class="pagination">
      </el-pagination>
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
    Table,
    TableColumn,
    Pagination
  } from 'element-ui'
  import Layout from '../../components/layout'
  import Order from '../../db/order'
  import Moment from 'moment'

  export default {
    name: 'landing-page',
    components: {
      Container,
      Header,
      Main,
      Col,
      Row,
      Table,
      TableColumn,
      Pagination,
      Layout
    },
    data () {
      return {
        tableData: [],
        pagination: {
          page: 1,
          pageSize: 8,
          pages: 1
        }
      }
    },
    created () {
      this.handleCurrentChange()
    },
    methods: {
      Moment: Moment,
      open (link) {
        this.$router.push(link)
      },
      handleCurrentChange (page) {
        let _this = this
        let o = {}
        o.order = 'id DESC'
        o.pageSize = this.pagination.pageSize
        o.page = page || this.pagination.page
        Order.pagination(o, function (data) {
          _this.tableData = data.list
          _this.pagination.pages = data.pages
          _this.pagination.count = data.count
          _this.pagination.page = data.page
          _this.pagination.pageSize = data.pageSize
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
  .pagination{
    margin: 10px auto;
    text-align: center;
  }
  .el-col-button {
    text-align: right;
  }
</style>
