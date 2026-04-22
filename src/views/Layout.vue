<template>
  <el-container class="layout-container">
    <!-- 移动端遮罩层 -->
    <div
      class="sidebar-overlay"
      :class="{ active: mobileMenuOpen }"
      @click="mobileMenuOpen = false"
    ></div>

    <el-aside width="200px" class="sidebar" :class="{ 'mobile-open': mobileMenuOpen }">
      <div class="logo">
        <i class="el-icon-reading"></i>
        <span>图书管理系统</span>
      </div>
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical"
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
          <!-- 移动端菜单按钮 -->
          <el-button
            class="mobile-menu-btn"
            icon="el-icon-s-fold"
            @click="mobileMenuOpen = !mobileMenuOpen"
            v-if="isMobile"
          ></el-button>
          <span class="page-title">{{ pageTitle }}</span>
        </div>
        <div class="header-right">
          <!-- 通知图标 -->
          <div class="notification-icon">
            <i class="el-icon-bell"></i>
            <span class="notification-badge"></span>
          </div>
          <!-- 设置图标 -->
          <div class="settings-icon">
            <i class="el-icon-setting"></i>
          </div>
          <!-- 用户信息 -->
          <el-dropdown>
            <span class="user-info">
              <div class="user-avatar">管</div>
              <span>管理员</span>
              <i class="el-icon-arrow-down"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <i class="el-icon-user"></i> 个人中心
              </el-dropdown-item>
              <el-dropdown-item>
                <i class="el-icon-setting"></i> 系统设置
              </el-dropdown-item>
              <el-dropdown-item divided>
                <i class="el-icon-switch-button"></i> 退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main class="main-content">
        <transition name="page" mode="out-in">
          <router-view :key="$route.path" />
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Layout',
  data() {
    return {
      mobileMenuOpen: false,
      isMobile: false
    }
  },
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
  },
  mounted() {
    this.checkMobile()
    window.addEventListener('resize', this.checkMobile)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkMobile)
  },
  methods: {
    checkMobile() {
      this.isMobile = window.innerWidth < 768
      if (!this.isMobile) {
        this.mobileMenuOpen = false
      }
    }
  }
}
</script>

<style scoped>
/* 移动端菜单按钮 */
.mobile-menu-btn {
  display: none;
  margin-right: var(--spacing-sm);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .mobile-menu-btn {
    display: inline-flex;
  }
}
</style>