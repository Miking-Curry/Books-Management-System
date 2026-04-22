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
      <el-table :data="filteredBooks" border stripe style="width: 100%" v-if="!isMobile" class="hover-table" v-loading="loading">
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
          <template slot-scope="scope">{{ formatPrice(scope.row.price) }}</template>
        </el-table-column>
        <el-table-column label="操作" width="160" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="handleEdit(scope.row)"></el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div v-else class="mobile-list">
        <div v-for="item in filteredBooks" :key="item.id" class="mobile-item">
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

    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="600px" :close-on-click-modal="false" @close="handleCloseDialog">
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
import { mapGetters, mapActions } from 'vuex'
import { businessRules, validateForm } from '@/utils/validators'
import { formatMoney } from '@/utils/formatters'
import { debounce } from '@/utils/helpers'

export default {
  name: 'BookManage',
  data() {
    return {
      searchForm: {
        name: '',
        isbn: '',
        category: ''
      },
      pagination: {
        current: 1,
        size: 10,
        total: 0
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
      rules: businessRules.book,
      loading: false,
      isMobile: false
    }
  },
  computed: {
    ...mapGetters('books', [
      'allBooks',
      'isLoading',
      'getError'
    ]),
    // 过滤后的图书列表
    filteredBooks() {
      let books = this.allBooks

      // 按搜索条件过滤
      if (this.searchForm.name) {
        books = books.filter(book =>
          book.name.toLowerCase().includes(this.searchForm.name.toLowerCase())
        )
      }
      if (this.searchForm.isbn) {
        books = books.filter(book =>
          book.isbn.toLowerCase().includes(this.searchForm.isbn.toLowerCase())
        )
      }
      if (this.searchForm.category) {
        books = books.filter(book => book.category === this.searchForm.category)
      }

      // 分页
      const start = (this.pagination.current - 1) * this.pagination.size
      const end = start + this.pagination.size
      this.pagination.total = books.length

      return books.slice(start, end)
    }
  },
  created() {
    this.checkMobile()
    window.addEventListener('resize', this.handleResize)
    // 使用防抖的搜索函数
    this.debouncedSearch = debounce(this.handleSearch, 300)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    ...mapActions('books', [
      'addBook',
      'updateBook',
      'deleteBook'
    ]),

    // 检查是否为移动设备
    checkMobile() {
      this.isMobile = window.innerWidth < 768
    },

    // 处理窗口大小变化
    handleResize() {
      this.checkMobile()
    },

    // 格式化价格
    formatPrice(price) {
      return formatMoney(price)
    },

    // 搜索图书
    handleSearch() {
      this.pagination.current = 1
      // filteredBooks 会自动根据 searchForm 更新
    },

    // 重置搜索
    handleReset() {
      this.searchForm = { name: '', isbn: '', category: '' }
      this.pagination.current = 1
    },

    // 新增图书
    handleAdd() {
      this.form = {
        id: null,
        name: '',
        author: '',
        isbn: '',
        category: '',
        stock: 0,
        price: 0,
        cover: '',
        description: ''
      }
      this.dialogTitle = '新增图书'
      this.dialogVisible = true
      // 重置表单验证
      this.$nextTick(() => {
        if (this.$refs.form) {
          this.$refs.form.clearValidate()
        }
      })
    },

    // 编辑图书
    handleEdit(row) {
      this.form = { ...row }
      this.dialogTitle = '编辑图书'
      this.dialogVisible = true
    },

    // 删除图书
    async handleDelete(row) {
      try {
        await this.$confirm('确认删除该图书吗？删除后将无法恢复。', '删除确认', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })

        this.loading = true
        const success = await this.deleteBook(row.id)

        if (success) {
          this.$message({
            type: 'success',
            message: '删除成功',
            duration: 2000
          })
        } else {
          this.$message({
            type: 'error',
            message: '删除失败',
            duration: 2000
          })
        }
      } catch (error) {
        if (error !== 'cancel') {
          this.$message({
            type: 'error',
            message: '删除失败：' + error.message,
            duration: 2000
          })
        }
      } finally {
        this.loading = false
      }
    },

    // 提交表单
    async handleSubmit() {
      try {
        await validateForm(this.$refs.form)
        this.loading = true

        let success
        if (this.form.id) {
          // 更新图书
          success = await this.updateBook(this.form)
        } else {
          // 新增图书
          success = await this.addBook(this.form)
        }

        if (success) {
          this.$message({
            type: 'success',
            message: this.form.id ? '更新成功' : '添加成功',
            duration: 2000
          })
          this.dialogVisible = false
        } else {
          this.$message({
            type: 'error',
            message: this.form.id ? '更新失败' : '添加失败',
            duration: 2000
          })
        }
      } catch (error) {
        if (error.message !== '表单验证失败') {
          this.$message({
            type: 'error',
            message: '操作失败：' + error.message,
            duration: 2000
          })
        }
      } finally {
        this.loading = false
      }
    },

    // 分页大小变化
    handleSizeChange(val) {
      this.pagination.size = val
      this.pagination.current = 1
    },

    // 当前页变化
    handleCurrentChange(val) {
      this.pagination.current = val
    },

    // 关闭对话框
    handleCloseDialog() {
      this.dialogVisible = false
      this.form = {
        id: null,
        name: '',
        author: '',
        isbn: '',
        category: '',
        stock: 0,
        price: 0,
        cover: '',
        description: ''
      }
    }
  },
  watch: {
    // 监听搜索表单变化，自动搜索
    searchForm: {
      handler() {
        this.debouncedSearch()
      },
      deep: true
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
  transition: var(--transform-shadow);
}

.search-card:hover,
.table-card:hover {
  box-shadow: var(--shadow-md);
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
    transition: var(--transition-background);
    animation: fadeInUp 0.3s ease;
  }

  .mobile-item:hover {
    background-color: var(--color-background-light);
  }

  .mobile-cover {
    width: 50px;
    height: 70px;
    border-radius: 4px;
    margin-right: 12px;
    flex-shrink: 0;
    transition: var(--transition-transform);
  }

  .mobile-item:hover .mobile-cover {
    transform: scale(1.05);
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
    transition: var(--transition-color);
  }

  .mobile-item:hover .mobile-name {
    color: var(--brand-primary);
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

/* 表格行动画 */
.hover-table .el-table__row {
  transition: var(--transition-background);
  animation: fadeIn 0.3s ease;
}

.hover-table .el-table__row:hover {
  background-color: var(--color-background-light) !important;
}

/* 图片悬停效果 */
.el-image {
  transition: var(--transition-transform);
  border-radius: var(--border-radius-sm);
  overflow: hidden;
}

.el-image:hover {
  transform: scale(1.1);
}

/* 按钮悬停效果 */
.el-button {
  transition: var(--transition-base);
}

.el-button:hover {
  transform: translateY(-1px);
}

.el-button:active {
  transform: translateY(0);
}

/* 对话框动画 */
.el-dialog {
  animation: scaleIn 0.3s ease;
}

/* 表单输入框动画 */
.el-input__inner,
.el-textarea__inner,
.el-select .el-input__inner {
  transition: var(--transition-base);
}

.el-input__inner:focus,
.el-textarea__inner:focus,
.el-select .el-input__inner:focus {
  border-color: var(--brand-primary);
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.1);
}
</style>