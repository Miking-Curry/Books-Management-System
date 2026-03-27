<template>
  <div class="reader-manage">
    <el-card class="search-card">
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="姓名">
          <el-input v-model="searchForm.name" placeholder="姓名" clearable style="width: 120px"></el-input>
        </el-form-item>
        <el-form-item label="读者证号">
          <el-input v-model="searchForm.cardNo" placeholder="证号" clearable style="width: 120px"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="状态" clearable style="width: 100px">
            <el-option label="正常" value="正常"></el-option>
            <el-option label="暂停" value="暂停"></el-option>
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
        <span class="title">读者列表</span>
        <el-button type="primary" size="small" icon="el-icon-plus" @click="handleAdd">新增</el-button>
      </div>
      <el-table :data="tableData" border stripe style="width: 100%">
        <el-table-column prop="id" label="编号" width="50" align="center"></el-table-column>
        <el-table-column prop="avatar" label="头像" width="50" align="center">
          <template slot-scope="scope">
            <el-avatar :size="36" :src="scope.row.avatar"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="80"></el-table-column>
        <el-table-column prop="cardNo" label="读者证号" width="120"></el-table-column>
        <el-table-column prop="phone" label="手机号" width="110"></el-table-column>
        <el-table-column prop="email" label="邮箱" min-width="140"></el-table-column>
        <el-table-column prop="status" label="状态" width="60" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status === '正常' ? 'success' : 'warning'" size="mini">{{ scope.row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="borrowCount" label="已借" width="50" align="center"></el-table-column>
        <el-table-column label="操作" width="140" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="handleEdit(scope.row)"></el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope.row)"></el-button>
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

    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="600px" :close-on-click-modal="false">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="读者证号" prop="cardNo">
          <el-input v-model="form.cardNo" placeholder="请输入读者证号"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio label="正常">正常</el-radio>
            <el-radio label="暂停">暂停</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ReaderManage',
  data() {
    return {
      searchForm: {
        name: '',
        cardNo: '',
        status: ''
      },
      tableData: [
        { id: 1, name: '张三', cardNo: 'RD20240001', phone: '13800138000', email: 'zhangsan@example.com', status: '正常', borrowCount: 2, avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png' },
        { id: 2, name: '李四', cardNo: 'RD20240002', phone: '13800138001', email: 'lisi@example.com', status: '正常', borrowCount: 1, avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png' },
        { id: 3, name: '王五', cardNo: 'RD20240003', phone: '13800138002', email: 'wangwu@example.com', status: '暂停', borrowCount: 0, avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png' },
        { id: 4, name: '赵六', cardNo: 'RD20240004', phone: '13800138003', email: 'zhaoliu@example.com', status: '正常', borrowCount: 3, avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png' }
      ],
      pagination: {
        current: 1,
        size: 10,
        total: 4
      },
      dialogVisible: false,
      dialogTitle: '',
      form: {
        id: null,
        name: '',
        cardNo: '',
        phone: '',
        email: '',
        status: '正常'
      },
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        cardNo: [{ required: true, message: '请输入读者证号', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleSearch() {
      console.log('搜索', this.searchForm)
    },
    handleReset() {
      this.searchForm = { name: '', cardNo: '', status: '' }
    },
    handleAdd() {
      this.form = { id: null, name: '', cardNo: '', phone: '', email: '', status: '正常' }
      this.dialogTitle = '新增读者'
      this.dialogVisible = true
    },
    handleEdit(row) {
      this.form = { ...row }
      this.dialogTitle = '编辑读者'
      this.dialogVisible = true
    },
    handleDelete(row) {
      this.$confirm('确认删除该读者?', '提示', { type: 'warning' }).then(() => {
        this.$message.success('删除成功')
      })
    },
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$message.success('保存成功')
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
.reader-manage {
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