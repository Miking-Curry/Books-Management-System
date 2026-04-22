<template>
  <div class="borrow-manage">
    <el-card class="search-card">
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="书名">
          <el-input v-model="searchForm.bookName" placeholder="书名" clearable style="width: 120px"></el-input>
        </el-form-item>
        <el-form-item label="读者">
          <el-input v-model="searchForm.readerName" placeholder="读者" clearable style="width: 100px"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="状态" clearable style="width: 100px">
            <el-option label="借阅中" value="借阅中"></el-option>
            <el-option label="已归还" value="已归还"></el-option>
            <el-option label="已逾期" value="已逾期"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
          <el-button icon="el-icon-refresh" @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="table-card">
      <div slot="header" class="card-header">
        <span class="title">借阅记录</span>
        <el-button type="primary" size="small" icon="el-icon-plus" @click="handleAdd">借阅</el-button>
      </div>
      <el-table :data="tableData" border stripe style="width: 100%">
        <el-table-column prop="id" label="编号" width="50" align="center"></el-table-column>
        <el-table-column prop="bookName" label="图书" min-width="100"></el-table-column>
        <el-table-column prop="readerName" label="读者" width="70"></el-table-column>
        <el-table-column prop="readerCardNo" label="证号" width="100"></el-table-column>
        <el-table-column prop="borrowDate" label="借阅日期" width="90"></el-table-column>
        <el-table-column prop="dueDate" label="应还日期" width="90"></el-table-column>
        <el-table-column prop="status" label="状态" width="70" align="center">
          <template slot-scope="scope">
            <el-tag :type="getStatusType(scope.row.status)" size="mini">{{ scope.row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="140" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status === '借阅中' || scope.row.status === '已逾期'" size="mini" type="success" icon="el-icon-circle-check" @click="handleReturn(scope.row)"></el-button>
            <el-button v-if="scope.row.status === '借阅中'" size="mini" type="warning" icon="el-icon-time" @click="handleRenew(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.current"
        :page-sizes="[10, 20, 50]"
        :page-size="pagination.size"
        :total="pagination.total"
        layout="total, sizes, prev, pager, next"
        style="margin-top: 16px; text-align: right"
      >
      </el-pagination>
    </el-card>

    <el-dialog title="图书借阅" :visible.sync="dialogVisible" width="500px" :close-on-click-modal="false">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="选择读者" prop="readerId">
          <el-select v-model="form.readerId" placeholder="请选择读者" style="width: 100%">
            <el-option v-for="item in readers" :key="item.id" :label="item.name + ' (' + item.cardNo + ')'" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择图书" prop="bookId">
          <el-select v-model="form.bookId" placeholder="请选择图书" style="width: 100%">
            <el-option v-for="item in books" :key="item.id" :label="item.name + ' (库存:' + item.stock + ')'" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="借阅天数" prop="days">
          <el-input-number v-model="form.days" :min="1" :max="60" style="width: 100%"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定借阅</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'BorrowManage',
  data() {
    return {
      searchForm: {
        bookName: '',
        readerName: '',
        status: ''
      },
      tableData: [
        { id: 1, bookName: '红楼梦', readerName: '张三', readerCardNo: 'RD20240001', borrowDate: '2024-01-15', dueDate: '2024-02-15', returnDate: '', status: '借阅中' },
        { id: 2, bookName: '三体', readerName: '李四', readerCardNo: 'RD20240002', borrowDate: '2024-01-10', dueDate: '2024-02-10', returnDate: '2024-02-08', status: '已归还' },
        { id: 3, bookName: '人类简史', readerName: '张三', readerCardNo: 'RD20240001', borrowDate: '2023-12-20', dueDate: '2024-01-20', returnDate: '', status: '已逾期' },
        { id: 4, bookName: '活着', readerName: '赵六', readerCardNo: 'RD20240004', borrowDate: '2024-01-20', dueDate: '2024-02-20', returnDate: '', status: '借阅中' }
      ],
      pagination: {
        current: 1,
        size: 10,
        total: 4
      },
      dialogVisible: false,
      form: {
        readerId: null,
        bookId: null,
        days: 30
      },
      rules: {
        readerId: [{ required: true, message: '请选择读者', trigger: 'change' }],
        bookId: [{ required: true, message: '请选择图书', trigger: 'change' }]
      },
      readers: [
        { id: 1, name: '张三', cardNo: 'RD20240001' },
        { id: 2, name: '李四', cardNo: 'RD20240002' },
        { id: 3, name: '王五', cardNo: 'RD20240003' },
        { id: 4, name: '赵六', cardNo: 'RD20240004' }
      ],
      books: [
        { id: 1, name: '红楼梦', stock: 5 },
        { id: 2, name: '三体', stock: 8 },
        { id: 3, name: '人类简史', stock: 3 },
        { id: 4, name: '万历十五年', stock: 4 }
      ]
    }
  },
  methods: {
    getStatusType(status) {
      const types = {
        '借阅中': 'primary',
        '已归还': 'success',
        '已逾期': 'danger'
      }
      return types[status] || 'info'
    },
    handleSearch() {
      console.log('搜索', this.searchForm)
    },
    handleReset() {
      this.searchForm = { bookName: '', readerName: '', status: '' }
    },
    handleAdd() {
      this.form = { readerId: null, bookId: null, days: 30 }
      this.dialogVisible = true
    },
    handleReturn(row) {
      this.$confirm('确认归还该图书?', '提示', { type: 'info' }).then(() => {
        row.status = '已归还'
        row.returnDate = '2024-02-15'
        this.$message.success('归还成功')
      })
    },
    handleRenew(row) {
      this.$prompt('请输入续借天数', '续借', { inputValue: '30' }).then(({ value }) => {
        const days = parseInt(value) || 30
        const dueDate = new Date(row.dueDate)
        dueDate.setDate(dueDate.getDate() + days)
        row.dueDate = dueDate.toISOString().split('T')[0]
        this.$message.success('续借成功')
      })
    },
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$message.success('借阅成功')
          this.dialogVisible = false
        }
      })
    },
    handleSizeChange(val) {
      this.pagination.size = val
    },
    handleCurrentChange(val) {
      this.pagination.current = val
    }
  }
}
</script>

<style scoped>
.borrow-manage {
  width: 100%;
}

.search-card {
  margin-bottom: 12px;
  border-radius: 8px;
}

.table-card {
  border-radius: 8px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  font-size: 15px;
  font-weight: 600;
  color: #303133;
}
</style>