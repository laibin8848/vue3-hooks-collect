<template>
  <div class="global-tab-con">
    <el-row>
      <el-col :span="8" align="left">
        <el-button type="primary" icon="el-icon-plus" size="small">新增</el-button>
        <el-button type="success" icon="el-icon-refresh" size="small" @click="fetchData">刷新</el-button>
      </el-col>
    </el-row>
    <br />
    <el-table v-loading="pageParams.loading" :data="pageDatas" class="table">
      <el-table-column prop="xxx" label="xxx" align="center"></el-table-column>
        <template #default="scope">
            <el-button type="text">编辑</el-button>
            <el-button type="text" @click="onRowDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="global-pagination">
      <el-pagination
        :current-page="pageParams.page"
        :page-size="pageParams.limit"
        :layout="pageParams.layout"
        :page-sizes="pageParams.pageSize"
        :total="pageParams.total"
        background
        @current-change="onCurrentChange"
        @size-change="onSizeChange">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import { defineComponent } from 'vue'
  import useList from './useList'

  export default defineComponent({
    name: 'list',
    setup() {
      return {
        ...useList({})
      }
    }
  })
</script>
