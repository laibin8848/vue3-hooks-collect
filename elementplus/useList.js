import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';

export default function useListMethods(options) {

  const pageParams = ref({
    page: 1,
    limit: options.limit || 10,
    total: 0,
    pageSize: [5, 10, 20],
    layout: "sizes,prev,pager,next,total",
    loading: false
  })

  const pageDatas = ref([])

  const fetchData = () => {
    if(!options.listLoader || typeof options.listLoader !== 'function') {
      console.error('请定义一个函数用于获取列表数据')
    }
    pageParams.value.loading = true
    options.listLoader().then(res => {
      pageParams.value.loading = false
      if(res.code == 200) {
        pageDatas.value = res.results
        pageParams.value.total = res.total
      }
    })
  }

  //首次加载
  fetchData()

  const onCurrentChange = (page)=> {
    pageParams.page = page
    fetchData()
  }

  const onSizeChange = (size)=> {
    pageParams.page = 1
    pageParams.limit = size
    fetchData()
  }

  const onRowDel = (row) => {
    if(!options.delFun || typeof options.delFun !== 'function') {
      console.error('请定义一个函数用于删除数据')
    }
    ElMessageBox.confirm('此操作将永久删除该数据, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      options.delFun(row).then(()=> {
        ElMessage({
          type: 'success',
          message: '删除成功'
        }).then(
          ()=> fetchData()
        )
      })
    })
  }

  return {
    fetchData,
    pageParams,
    onCurrentChange,
    onSizeChange,
    onRowDel,
    pageDatas
  }
}
