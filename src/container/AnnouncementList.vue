<template>
  <div class="container">
    <div class="header clearfix">
      <h2>公告</h2>
      <div class="right">
        <el-button type="primary" size="small" @click="searchOpen">查询</el-button>
      </div>
    </div>
    <div class="table">
      <el-table
        :data="tableData"
        size="mini"
        show-overflow-tooltip
        header-cell-class-name="table-th"
        @row-click="rowClick"
        :row-style="tableRowStyle"
        style="width: 100%">
        <el-table-column
          v-for="(item,index) in table"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          show-overflow-tooltip
          header-align="center"
          align="center"
        ></el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        prev-text="上一页"
        next-text="下一页"
        @current-change="currentChange"
        :total="1000">
      </el-pagination>
    </div>
    <el-dialog
      v-show="searchShow"
      title="查询"
      :visible.sync="searchShow"
      width="30%"
      :before-close="searchClose"
    >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="searchShow = false">取 消</el-button>
        <el-button type="primary" @click="searchShow = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
    export default {
      data () {
        return {
          searchShow: false,
          table: [
            {
              prop: 'id',
              label: '公告ID'
            },
            {
              prop: 'title',
              label: '公告标题'
            },
            {
              prop: 'content',
              label: '公告内容'
            },
            {
              prop: 'createTime',
              label: '公告添加时间'
            }
          ],
          tableData: [
            {
              id: 'GG123123',
              title: '支付系统升级通知',
              content: '各位用户，接到银行通知，对于支付系统有一些升级变动',
              createTime: '2017-11-09',
              readed: false
            },
            {
              id: 'GG123123',
              title: '支付系统升级通知',
              content: '各位用户，接到银行通知，对于支付系统有一些升级变动',
              createTime: '2017-11-09',
              readed: true
            }
          ]
        }
      },
      methods: {
        tableRowStyle ({row}) {
          return row.readed === true ? { color: '#ccc' } : {}
        },
        searchOpen () {
          this.searchShow = true
        },
        searchClose () {
          this.searchShow = false
        },
        rowClick (row) {
          const id = row.id
          console.log('rowClick', id)
          this.$router.push('/announcement?id=' + id)
//          this.$router.push({path: 'announcement', params: {'id': id}})
        },
        currentChange (currentPage) {
          console.log('currentChange', currentPage)
        }
      }
    }
</script>
<style>
</style>
