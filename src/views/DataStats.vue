<template>
  <div class="data-stats">
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon stat-icon-primary">
          <i class="el-icon-collection"></i>
        </div>
        <div class="stat-content">
          <div class="stat-value">1,234</div>
          <div class="stat-label">图书总数</div>
          <div class="stat-trend up">
            <i class="el-icon-top"></i> +12.5%
          </div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon stat-icon-danger">
          <i class="el-icon-user"></i>
        </div>
        <div class="stat-content">
          <div class="stat-value">567</div>
          <div class="stat-label">读者数量</div>
          <div class="stat-trend up">
            <i class="el-icon-top"></i> +8.3%
          </div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon stat-icon-warning">
          <i class="el-icon-s-order"></i>
        </div>
        <div class="stat-content">
          <div class="stat-value">89</div>
          <div class="stat-label">当前借阅</div>
          <div class="stat-trend down">
            <i class="el-icon-bottom"></i> -2.1%
          </div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon stat-icon-success">
          <i class="el-icon-success"></i>
        </div>
        <div class="stat-content">
          <div class="stat-value">2,456</div>
          <div class="stat-label">累计借阅</div>
          <div class="stat-trend up">
            <i class="el-icon-top"></i> +15.7%
          </div>
        </div>
      </div>
    </div>

    <div class="charts-grid">
      <div class="chart-container">
        <div class="chart-header">
          <div class="chart-title">图书分类统计</div>
          <div class="chart-actions">
            <el-button size="mini" icon="el-icon-refresh" circle></el-button>
          </div>
        </div>
        <div ref="categoryChart" class="chart-body"></div>
      </div>
      <div class="chart-container">
        <div class="chart-header">
          <div class="chart-title">月度借阅趋势</div>
          <div class="chart-actions">
            <el-button size="mini" icon="el-icon-refresh" circle></el-button>
          </div>
        </div>
        <div ref="trendChart" class="chart-body"></div>
      </div>
    </div>

    <div class="charts-grid">
      <div class="chart-container">
        <div class="chart-header">
          <div class="chart-title">图书库存状态</div>
          <div class="chart-actions">
            <el-button size="mini" icon="el-icon-refresh" circle></el-button>
          </div>
        </div>
        <div ref="stockChart" class="chart-body"></div>
      </div>
      <div class="chart-container">
        <div class="chart-header">
          <div class="chart-title">热门图书Top5</div>
          <div class="chart-actions">
            <el-button size="mini" icon="el-icon-refresh" circle></el-button>
          </div>
        </div>
        <div ref="hotChart" class="chart-body"></div>
      </div>
    </div>
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
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)',
          backgroundColor: 'rgba(50, 50, 50, 0.9)',
          borderColor: '#333',
          borderWidth: 1,
          textStyle: { color: '#fff' }
        },
        legend: {
          bottom: '0%',
          left: 'center',
          textStyle: { color: '#606266' }
        },
        series: [{
          name: '图书分类',
          type: 'pie',
          radius: ['45%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 8,
            borderColor: '#fff',
            borderWidth: 3
          },
          label: { show: false },
          emphasis: {
            label: {
              show: true,
              fontSize: 16,
              fontWeight: 'bold',
              color: '#303133'
            },
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          animationType: 'expansion',
          animationEasing: 'exponentialInOut',
          animationDelay: function (idx) {
            return idx * 100
          },
          data: [
            { value: 350, name: '文学', itemStyle: { color: '#667eea' } },
            { value: 280, name: '科技', itemStyle: { color: '#764ba2' } },
            { value: 220, name: '历史', itemStyle: { color: '#f093fb' } },
            { value: 180, name: '艺术', itemStyle: { color: '#f5576c' } },
            { value: 204, name: '教育', itemStyle: { color: '#4facfe' } }
          ]
        }]
      })
    },
    initTrendChart() {
      const chart = echarts.init(this.$refs.trendChart)
      chart.setOption({
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(50, 50, 50, 0.9)',
          borderColor: '#333',
          borderWidth: 1,
          textStyle: { color: '#fff' }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['1月', '2月', '3月', '4月', '5月', '6月'],
          axisLine: { lineStyle: { color: '#dcdfe6' } },
          axisLabel: { color: '#606266' }
        },
        yAxis: {
          type: 'value',
          axisLine: { show: false },
          axisTick: { show: false },
          splitLine: { lineStyle: { color: '#f0f2f5', type: 'dashed' } },
          axisLabel: { color: '#909399' }
        },
        series: [{
          name: '借阅量',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 8,
          showSymbol: false,
          lineStyle: {
            color: '#667eea',
            width: 3,
            shadowColor: 'rgba(102, 126, 234, 0.3)',
            shadowBlur: 10
          },
          itemStyle: {
            color: '#667eea',
            borderColor: '#fff',
            borderWidth: 2
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(102, 126, 234, 0.4)' },
              { offset: 1, color: 'rgba(102, 126, 234, 0.05)' }
            ])
          },
          data: [120, 150, 180, 140, 170, 200],
          animationDuration: 2000,
          animationEasing: 'cubicOut'
        }]
      })
    },
    initStockChart() {
      const chart = echarts.init(this.$refs.stockChart)
      chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' },
          backgroundColor: 'rgba(50, 50, 50, 0.9)',
          borderColor: '#333',
          borderWidth: 1,
          textStyle: { color: '#fff' }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['文学', '科技', '历史', '艺术', '教育'],
          axisLine: { lineStyle: { color: '#dcdfe6' } },
          axisLabel: { color: '#606266' }
        },
        yAxis: {
          type: 'value',
          axisLine: { show: false },
          axisTick: { show: false },
          splitLine: { lineStyle: { color: '#f0f2f5', type: 'dashed' } },
          axisLabel: { color: '#909399' }
        },
        series: [{
          name: '库存量',
          type: 'bar',
          barWidth: '45%',
          itemStyle: {
            borderRadius: [6, 6, 0, 0],
            color: function(params) {
              const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe']
              return colors[params.dataIndex % colors.length]
            }
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.3)'
            }
          },
          animationDelay: function (idx) {
            return idx * 100
          },
          data: [
            { value: 350 },
            { value: 280 },
            { value: 220 },
            { value: 180 },
            { value: 204 }
          ]
        }]
      })
    },
    initHotChart() {
      const chart = echarts.init(this.$refs.hotChart)
      chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' },
          backgroundColor: 'rgba(50, 50, 50, 0.9)',
          borderColor: '#333',
          borderWidth: 1,
          textStyle: { color: '#fff' }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          axisLine: { show: false },
          axisTick: { show: false },
          splitLine: { lineStyle: { color: '#f0f2f5', type: 'dashed' } },
          axisLabel: { color: '#909399' }
        },
        yAxis: {
          type: 'category',
          data: ['三体', '红楼梦', '活着', '人类简史', '万历十五年'],
          axisLine: { lineStyle: { color: '#dcdfe6' } },
          axisLabel: { color: '#606266' }
        },
        series: [{
          name: '借阅次数',
          type: 'bar',
          barWidth: '55%',
          itemStyle: {
            borderRadius: [0, 6, 6, 0],
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: '#667eea' },
              { offset: 0.5, color: '#764ba2' },
              { offset: 1, color: '#f093fb' }
            ])
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(102, 126, 234, 0.5)'
            }
          },
          animationDelay: function (idx) {
            return idx * 100
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
  padding: var(--spacing-md);
}

/* 统计卡片网格 */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
}

.stat-card {
  background: var(--color-white);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-base);
  padding: var(--spacing-lg);
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  transition: var(--transition-base);
  cursor: pointer;
  animation: fadeInUp 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.stat-icon {
  width: 56px;
  height: 56px;
  border-radius: var(--border-radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: var(--color-white);
  transition: var(--transition-transform);
  flex-shrink: 0;
}

.stat-card:hover .stat-icon {
  transform: scale(1.1) rotate(5deg);
}

.stat-icon-primary {
  background: var(--gradient-primary);
}

.stat-icon-success {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
}

.stat-icon-warning {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
}

.stat-icon-danger {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.stat-content {
  flex: 1;
  min-width: 0;
}

.stat-value {
  font-size: var(--font-size-xxl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  transition: var(--transition-color);
}

.stat-card:hover .stat-value {
  color: var(--brand-primary);
}

.stat-label {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-xs);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.stat-trend {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  display: flex;
  align-items: center;
  gap: 4px;
}

.stat-trend.up {
  color: var(--color-success);
}

.stat-trend.down {
  color: var(--color-danger);
}

/* 图表网格 */
.charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
}

.chart-container {
  background: var(--color-white);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-base);
  padding: var(--spacing-lg);
  transition: var(--transform-shadow);
  animation: fadeIn 0.3s ease;
}

.chart-container:hover {
  box-shadow: var(--shadow-md);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
}

.chart-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}

.chart-actions {
  display: flex;
  gap: var(--spacing-xs);
}

.chart-body {
  height: 300px;
  position: relative;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }

  .charts-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .data-stats {
    padding: var(--spacing-sm);
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-md);
  }

  .stat-card {
    padding: var(--spacing-md);
  }

  .stat-icon {
    width: 48px;
    height: 48px;
    font-size: 20px;
  }

  .stat-value {
    font-size: var(--font-size-xl);
  }

  .chart-container {
    padding: var(--spacing-md);
  }

  .chart-body {
    height: 250px;
  }
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .stat-card {
    padding: var(--spacing-sm);
  }

  .stat-icon {
    width: 40px;
    height: 40px;
    font-size: 18px;
  }

  .stat-value {
    font-size: var(--font-size-lg);
  }

  .chart-header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-sm);
  }

  .chart-body {
    height: 200px;
  }
}
</style>