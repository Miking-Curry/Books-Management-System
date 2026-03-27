<template>
  <el-container class="layout-container">
    <el-aside width="200px" class="sidebar">
      <div class="logo">
        <i class="el-icon-reading"></i>
        <span>图书管理系统</span>
      </div>
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical"
        background-color="#1a2332"
        text-color="#b8c7ce"
        active-text-color="#409eff"
        router
      >
        <el-menu-item index="/books">
          <i class="el-icon-collection"></i>
          <span slot="title">图书管理</span>
        </el-menu-item>
        <el-menu-item index="/readers">
          <i class="el-icon-user"></i>
          <span slot="title">读者管理</span>
        </el-menu-item>
        <el-menu-item index="/borrow">
          <i class="el-icon-s-order"></i>
          <span slot="title">借阅管理</span>
        </el-menu-item>
        <el-menu-item index="/stats">
          <i class="el-icon-data-analysis"></i>
          <span slot="title">数据统计</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container class="main-container">
      <el-header class="header">
        <div class="header-left">
          <span class="page-title">{{ pageTitle }}</span>
        </div>
        <div class="header-right">
          <el-dropdown>
            <span class="user-info">
              <i class="el-icon-user-solid"></i>
              <span>管理员</span>
            </span>
          </el-dropdown>
        </div>
      </el-header>
      <el-main class="main-content">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Layout',
  computed: {
    pageTitle() {
      const titles = {
        '/books': '图书管理',
        '/readers': '读者管理',
        '/borrow': '借阅管理',
        '/stats': '数据统计'
      }
      return titles[this.$route.path] || '图书管理系统'
    }
  }
}
</script>

<style scoped>
.layout-container {
  height: 100vh;
  width: 100%;
  display: flex;
  overflow: hidden;
}

.sidebar {
  width: 200px !important;
  background: linear-gradient(180deg, #1a2332 0%, #2c3e50 100%);
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
  flex-shrink: 0;
}

.main-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
  max-width: none;
}

/* 覆盖 Element UI 的默认样式 */
.el-container {
  width: 100%;
}

.el-main {
  width: 100%;
  max-width: none;
}

.logo {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  white-space: nowrap;
}

.logo i {
  font-size: 24px;
  margin-right: 10px;
  color: #409eff;
}

.el-menu-vertical {
  border-right: none;
}

.el-menu-item {
  height: 56px;
  line-height: 56px;
}

.el-menu-item:hover {
  background: rgba(64, 158, 255, 0.2) !important;
}

.el-menu-item.is-active {
  background: linear-gradient(90deg, #409eff 0%, #66b1ff 100%) !important;
  color: #fff !important;
  position: relative;
}

.el-menu-item.is-active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 4px;
  background: #fff;
  border-radius: 0 2px 2px 0;
}

.header {
  height: 50px !important;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.header-left {
  display: flex;
  align-items: center;
}

.page-title {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
}

.header-right {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 20px;
  transition: background 0.3s;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  font-size: 14px;
  font-weight: 500;
}

.user-info:hover {
  background: linear-gradient(135deg, #5a6fd6 0%, #6a4190 100%);
  transform: scale(1.02);
}

.user-info i {
  font-size: 18px;
  color: #fff;
  margin-right: 8px;
}

.main-content {
  background: #f0f2f5;
  padding: 16px;
  height: calc(100vh - 50px);
  overflow-y: auto;
  width: 100%;
  box-sizing: border-box;
}
</style>