<template>
  <div class="data-stats">
    <el-row :gutter="16" type="flex" justify="space-between">
      <el-col :xs="12" :sm="12" :md="6" :lg="6">
        <el-card class="stat-card" shadow="hover">
          <div class="stat-icon" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
            <i class="el-icon-collection"></i>
          </div>
          <div class="stat-content">
            <div class="stat-value">1,234</div>
            <div class="stat-label">图书总数</div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="12" :sm="12" :md="6" :lg="6">
        <el-card class="stat-card" shadow="hover">
          <div class="stat-icon" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%)">
            <i class="el-icon-user"></i>
          </div>
          <div class="stat-content">
            <div class="stat-value">567</div>
            <div class="stat-label">读者数量</div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="12" :sm="12" :md="6" :lg="6">
        <el-card class="stat-card" shadow="hover">
          <div class="stat-icon" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)">
            <i class="el-icon-s-order"></i>
          </div>
          <div class="stat-content">
            <div class="stat-value">89</div>
            <div class="stat-label">当前借阅</div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="12" :sm="12" :md="6" :lg="6">
        <el-card class="stat-card" shadow="hover">
          <div class="stat-icon" style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)">
            <i class="el-icon-success"></i>
          </div>
          <div class="stat-content">
            <div class="stat-value">2,456</div>
            <div class="stat-label">累计借阅</div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="16" type="flex" justify="space-between" style="margin-top: 16px">
      <el-col :xs="24" :sm="24" :md="12" :lg="12">
        <el-card class="chart-card">
          <div slot="header" class="card-header">
            <span>图书分类统计</span>
          </div>
          <div ref="categoryChart" style="height: 280px"></div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12">
        <el-card class="chart-card">
          <div slot="header" class="card-header">
            <span>月度借阅趋势</span>
          </div>
          <div ref="trendChart" style="height: 280px"></div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="16" type="flex" justify="space-between" style="margin-top: 16px">
      <el-col :xs="24" :sm="24" :md="12" :lg="12">
        <el-card class="chart-card">
          <div slot="header" class="card-header">
            <span>图书库存状态</span>
          </div>
          <div ref="stockChart" style="height: 280px"></div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12">
        <el-card class="chart-card">
          <div slot="header" class="card-header">
            <span>热门图书Top5</span>
          </div>
          <div ref="hotChart" style="height: 280px"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'DataStats',
  mounted() {
    this.initCategoryChart()
    this.initTrendChart()
    this.initStockChart()
    this.initHotChart()
  },
  methods: {
    initCategoryChart() {
      const chart = echarts.init(this.$refs.categoryChart)
      chart.setOption({
        tooltip: { trigger: 'item' },
        legend: { bottom: '0%' },
        series: [{
          name: '图书分类',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: { borderRadius: 10, borderColor: '#fff', borderWidth: 2 },
          label: { show: false },
          emphasis: { label: { show: true, fontSize: 14, fontWeight: 'bold' } },
          data: [
            { value: 350, name: '文学', itemStyle: { color: '#5470c6' } },
            { value: 280, name: '科技', itemStyle: { color: '#91cc75' } },
            { value: 220, name: '历史', itemStyle: { color: '#fac858' } },
            { value: 180, name: '艺术', itemStyle: { color: '#ee6666' } },
            { value: 204, name: '教育', itemStyle: { color: '#73c0de' } }
          ]
        }]
      })
    },
    initTrendChart() {
      const chart = echarts.init(this.$refs.trendChart)
      chart.setOption({
        tooltip: { trigger: 'axis' },
        grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
        xAxis: { type: 'category', boundaryGap: false, data: ['1月', '2月', '3月', '4月', '5月', '6月'] },
        yAxis: { type: 'value' },
        series: [{
          name: '借阅量',
          type: 'line',
          smooth: true,
          areaStyle: { color: 'rgba(64, 158, 255, 0.2)' },
          lineStyle: { color: '#409eff', width: 3 },
          itemStyle: { color: '#409eff' },
          data: [120, 150, 180, 140, 170, 200]
        }]
      })
    },
    initStockChart() {
      const chart = echarts.init(this.$refs.stockChart)
      chart.setOption({
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
        xAxis: { type: 'category', data: ['文学', '科技', '历史', '艺术', '教育'] },
        yAxis: { type: 'value' },
        series: [{
          name: '库存量',
          type: 'bar',
          barWidth: '40%',
          itemStyle: { borderRadius: [5, 5, 0, 0] },
          data: [
            { value: 350, itemStyle: { color: '#5470c6' } },
            { value: 280, itemStyle: { color: '#91cc75' } },
            { value: 220, itemStyle: { color: '#fac858' } },
            { value: 180, itemStyle: { color: '#ee6666' } },
            { value: 204, itemStyle: { color: '#73c0de' } }
          ]
        }]
      })
    },
    initHotChart() {
      const chart = echarts.init(this.$refs.hotChart)
      chart.setOption({
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
        xAxis: { type: 'value' },
        yAxis: { type: 'category', data: ['三体', '红楼梦', '活着', '人类简史', '万历十五年'] },
        series: [{
          name: '借阅次数',
          type: 'bar',
          barWidth: '50%',
          itemStyle: { 
            borderRadius: [0, 5, 5, 0],
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: '#667eea' },
              { offset: 1, color: '#764ba2' }
            ])
          },
          data: [156, 142, 128, 115, 98]
        }]
      })
    }
  }
}
</script>

<style scoped>
.data-stats {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.stat-card {
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 16px;
  margin-bottom: 12px;
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  flex-shrink: 0;
}

.stat-icon i {
  font-size: 22px;
  color: #fff;
}

.stat-content {
  flex: 1;
  min-width: 0;
}

.stat-value {
  font-size: 22px;
  font-weight: 700;
  color: #303133;
}

.stat-label {
  font-size: 13px;
  color: #909399;
  margin-top: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.chart-card {
  border-radius: 8px;
  margin-bottom: 12px;
}

.card-header {
  font-size: 15px;
  font-weight: 600;
  color: #303133;
}

@media (max-width: 768px) {
  .stat-card {
    padding: 12px;
  }
  
  .stat-icon {
    width: 40px;
    height: 40px;
  }
  
  .stat-icon i {
    font-size: 18px;
  }
  
  .stat-value {
    font-size: 18px;
  }
}
</style>