<template>
  <div class="book-manage">
    <el-card class="search-card">
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="书名">
          <el-input v-model="searchForm.name" placeholder="书名" clearable style="width: 140px"></el-input>
        </el-form-item>
        <el-form-item label="ISBN">
          <el-input v-model="searchForm.isbn" placeholder="ISBN" clearable style="width: 140px"></el-input>
        </el-form-item>
        <el-form-item label="分类">
          <el-select v-model="searchForm.category" placeholder="分类" clearable style="width: 120px">
            <el-option label="文学" value="文学"></el-option>
            <el-option label="科技" value="科技"></el-option>
            <el-option label="历史" value="历史"></el-option>
            <el-option label="艺术" value="艺术"></el-option>
            <el-option label="教育" value="教育"></el-option>
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
        <span class="title">图书列表</span>
        <el-button type="primary" size="small" icon="el-icon-plus" @click="handleAdd">新增</el-button>
      </div>
      <el-table :data="tableData" border stripe style="width: 100%" v-if="!isMobile">
        <el-table-column prop="id" label="编号" width="60" align="center"></el-table-column>
        <el-table-column prop="cover" label="封面" width="60" align="center">
          <template slot-scope="scope">
            <el-image :src="scope.row.cover" fit="cover" style="width: 40px; height: 50px"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="书名" min-width="120"></el-table-column>
        <el-table-column prop="author" label="作者" width="100"></el-table-column>
        <el-table-column prop="isbn" label="ISBN" width="120"></el-table-column>
        <el-table-column prop="category" label="分类" width="80" align="center"></el-table-column>
        <el-table-column prop="stock" label="库存" width="60" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.stock > 0 ? 'success' : 'danger'" size="mini">{{ scope.row.stock }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="价格" width="80" align="center">
          <template slot-scope="scope">¥{{ scope.row.price }}</template>
        </el-table-column>
        <el-table-column label="操作" width="160" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="handleEdit(scope.row)"></el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div v-else class="mobile-list">
        <div v-for="item in tableData" :key="item.id" class="mobile-item">
          <el-image :src="item.cover" fit="cover" class="mobile-cover"></el-image>
          <div class="mobile-info">
            <div class="mobile-name">{{ item.name }}</div>
            <div class="mobile-detail">{{ item.author }} | {{ item.category }}</div>
            <div class="mobile-stock">库存: <el-tag :type="item.stock > 0 ? 'success' : 'danger'" size="mini">{{ item.stock }}</el-tag></div>
          </div>
          <div class="mobile-actions">
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="handleEdit(item)"></el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(item)"></el-button>
          </div>
        </div>
      </div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.current"
        :page-sizes="[10, 20, 50]"
        :page-size="pagination.size"
        :total="pagination.total"
        layout="total, sizes, prev, pager, next, jumper"
        style="margin-top: 16px; text-align: right"
      >
      </el-pagination>
    </el-card>

    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="600px" :close-on-click-modal="false">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="书名" prop="name">
          <el-input v-model="form.name" placeholder="请输入书名"></el-input>
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="form.author" placeholder="请输入作者"></el-input>
        </el-form-item>
        <el-form-item label="ISBN" prop="isbn">
          <el-input v-model="form.isbn" placeholder="请输入ISBN"></el-input>
        </el-form-item>
        <el-form-item label="分类" prop="category">
          <el-select v-model="form.category" placeholder="请选择分类" style="width: 100%">
            <el-option label="文学" value="文学"></el-option>
            <el-option label="科技" value="科技"></el-option>
            <el-option label="历史" value="历史"></el-option>
            <el-option label="艺术" value="艺术"></el-option>
            <el-option label="教育" value="教育"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="库存" prop="stock">
          <el-input-number v-model="form.stock" :min="0" style="width: 100%"></el-input-number>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input-number v-model="form.price" :min="0" :precision="2" style="width: 100%"></el-input-number>
        </el-form-item>
        <el-form-item label="封面" prop="cover">
          <el-input v-model="form.cover" placeholder="请输入封面图片URL"></el-input>
        </el-form-item>
        <el-form-item label="简介" prop="description">
          <el-input type="textarea" v-model="form.description" :rows="3" placeholder="请输入图书简介"></el-input>
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
  name: 'BookManage',
  data() {
    return {
      searchForm: {
        name: '',
        isbn: '',
        category: ''
      },
      tableData: [
        { id: 1, name: '红楼梦', author: '曹雪芹', isbn: '978-7-5329-5501-9', category: '文学', stock: 5, price: 68.00, cover: 'https://img9.doubanio.com/view/subject/l/public/s29948730.jpg', description: '中国古典四大名著之一' },
        { id: 2, name: '三体', author: '刘慈欣', isbn: '978-7-5362-4590-1', category: '科技', stock: 8, price: 38.00, cover: 'https://img3.doubanio.com/view/subject/l/public/s26639742.jpg', description: '科幻小说' },
        { id: 3, name: '人类简史', author: '尤瓦尔·赫拉利', isbn: '978-7-5322-8089-1', category: '历史', stock: 3, price: 68.00, cover: 'https://img3.doubanio.com/view/subject/l/public/s27215081.jpg', description: '从动物到上帝' },
        { id: 4, name: '活着', author: '余华', isbn: '978-7-5322-5512-9', category: '文学', stock: 0, price: 28.00, cover: 'https://img2.doubanio.com/view/subject/l/public/s23812232.jpg', description: '讲述农民福贵的一生' },
        { id: 5, name: '万历十五年', author: '黄仁宇', isbn: '978-7-5322-1527-8', category: '历史', stock: 4, price: 42.00, cover: 'https://img1.doubanio.com/view/subject/l/public/s10440402.jpg', description: '明代历史的横切面' }
      ],
      pagination: {
        current: 1,
        size: 10,
        total: 5
      },
      dialogVisible: false,
      dialogTitle: '',
      form: {
        id: null,
        name: '',
        author: '',
        isbn: '',
        category: '',
        stock: 0,
        price: 0,
        cover: '',
        description: ''
      },
      rules: {
        name: [{ required: true, message: '请输入书名', trigger: 'blur' }],
        author: [{ required: true, message: '请输入作者', trigger: 'blur' }],
        isbn: [{ required: true, message: '请输入ISBN', trigger: 'blur' }],
        category: [{ required: true, message: '请选择分类', trigger: 'change' }]
      }
    }
  },
  computed: {
    isMobile() {
      return window.innerWidth < 768
    }
  },
  methods: {
    handleSearch() {
      console.log('搜索', this.searchForm)
    },
    handleReset() {
      this.searchForm = { name: '', isbn: '', category: '' }
    },
    handleAdd() {
      this.form = { id: null, name: '', author: '', isbn: '', category: '', stock: 0, price: 0, cover: '', description: '' }
      this.dialogTitle = '新增图书'
      this.dialogVisible = true
    },
    handleEdit(row) {
      this.form = { ...row }
      this.dialogTitle = '编辑图书'
      this.dialogVisible = true
    },
    handleDelete(row) {
      this.$confirm('确认删除该图书?', '提示', { type: 'warning' }).then(() => {
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
.book-manage {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.search-card,
.table-card {
  width: 100%;
  box-sizing: border-box;
}

.search-form {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.el-table {
  width: 100% !important;
}

.search-card {
  margin-bottom: 12px;
  border-radius: 8px;
}

.search-form {
  margin-bottom: 0;
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

.dialog-footer {
  text-align: center;
}

.mobile-list {
  display: none;
}

@media (max-width: 768px) {
  .mobile-list {
    display: block;
  }
  
  .mobile-item {
    display: flex;
    align-items: center;
    padding: 12px;
    border-bottom: 1px solid #eee;
  }
  
  .mobile-cover {
    width: 50px;
    height: 70px;
    border-radius: 4px;
    margin-right: 12px;
    flex-shrink: 0;
  }
  
  .mobile-info {
    flex: 1;
    min-width: 0;
  }
  
  .mobile-name {
    font-size: 15px;
    font-weight: 600;
    color: #303133;
    margin-bottom: 4px;
  }
  
  .mobile-detail {
    font-size: 13px;
    color: #909399;
    margin-bottom: 4px;
  }
  
  .mobile-stock {
    font-size: 13px;
    color: #606266;
  }
  
  .mobile-actions {
    display: flex;
    gap: 8px;
    flex-shrink: 0;
  }
}
</style>