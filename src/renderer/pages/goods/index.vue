<template>
  <layout index="goods">
    <template slot="body">
      <el-row>
        <el-col :span="18">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ name: 'goods-index' }">商品管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ name: 'goods-index' }">详情</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
        <el-col :span="6" class="el-col-button">
          <el-button type="primary" @click="open({name: 'goods-add'})" icon="el-icon-plus"></el-button>
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
          prop="name"
          label="名称">
        </el-table-column>
        <el-table-column
          label="单价">
          <template slot-scope="scope">
            ￥{{scope.row.price.toFixed(2)}} / {{scope.row.unit}}
          </template>
        </el-table-column>
        <el-table-column
          label="库存">
          <template slot-scope="scope">
            {{scope.row.amount}} {{scope.row.unit}}
          </template>
        </el-table-column>
        <el-table-column
          width="200"
          label="操作">
          <template slot-scope="scope">
            <el-button @click="open({name: 'goods-amount', query: {id: scope.row.id}})" type="primary" icon="el-icon-plus" circle title="入库"></el-button>
            <el-button @click="open({name: 'goods-detail', query: {id: scope.row.id}})" type="primary" icon="el-icon-tickets" circle title="详情"></el-button>
            <el-button @click="edit(scope.row.id)" type="primary" icon="el-icon-edit" circle title="编辑"></el-button>
            <el-button @click="del(scope.row.id)" type="danger" icon="el-icon-delete" circle title="删除"></el-button>
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
  import Goods from '../../db/goods'

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
      open (link) {
        this.$router.push(link)
      },
      del (id) {
        var _this = this
        this.$confirm('确定删除这条记录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          Goods.del({id: id}, function (err, rows) {
            if (err === null) {
              _this.$message({
                type: 'success',
                message: '删除成功!'
              })
              _this.handleCurrentChange(1)
            } else {
              _this.$message.error(err)
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      edit (id) {
        this.$router.push({name: 'goods-edit', params: {id: id}})
      },
      handleCurrentChange (page) {
        let _this = this
        let o = {}
        o.order = 'id DESC'
        o.pageSize = this.pagination.pageSize
        o.page = page || this.pagination.page
        Goods.pagination(o, function (data) {
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
