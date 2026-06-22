import type { DashboardConfig } from '../types/dashboard';

// 顶部栏滚动报表模板的唯一入口配置。
// 新页面通常只需要改这个文件：换 logo、改标题、调整 pages[id].layoutRows、配置筛选项和组件挂载关系。
export const cockpitConfig: DashboardConfig = {
  assets: {
    // 顶部栏左一 logo。浅色背景使用原色 logo。
    logoSrc: '/haier-logo.svg',
    logoAlt: 'Haier logo',
  },

  screen: {
    // 顶部栏左侧标题。
    title: '经营驾驶舱',
    // 顶部栏中间导航项。id 会优先绑定到同名 pages[id]；缺省时回退到 page。
    topbarNav: [
      { id: 'overview', label: '经营概览' },
      { id: 'sales', label: '销售分析' },
      { id: 'customers', label: '客户分析' },
      { id: 'products', label: '商品分析' },
      { id: 'channels', label: '渠道分析' },
      { id: 'regions', label: '区域分析' },
    ],
    defaultTopbarNavId: 'overview',
    // 右侧筛选抽屉标题。
    filterTitle: '筛选项',
    defaultTheme: 'light',
    defaultFiltersOpen: false,

    layout: {
      // 固定设计稿宽度。浏览器显示区域不够时，页面使用原生滚动条。
      designWidth: 1920,
      // 最小设计稿高度。单页报表内容超过 1080px 时允许页面继续向下增长并滚动，不压缩组件。
      designHeight: 1080,
      // 顶部菜单栏高度。内容区从 grid.contentStartY 开始；行高按剩余高度的 8 个可视行单元计算。
      topbarHeight: 160,
      // 数学分块不设 gap，保证 1920/12=160、(1080-160)/8=115；视觉间距由 cellPadding 和卡片 padding 承担。
      contentGap: 0,
    },

    grid: {
      // 内容区起始 y 坐标。默认等于 160px 顶部菜单栏高度。
      contentStartY: 160,
      // 内容区结束 y 坐标。默认铺到 1080px 底部。
      contentEndY: 1080,
      // 内容区 920px 按 8 行等分，得到单个分块行高 115px；页面可继续向下增加行并滚动。
      rowHeight: 115,
      cellPadding: 6,
      dominantTitleColor: '#0073E5',
      innerBackgroundColor: '#ffffff',
    },

    controls: {
      filters: '筛选',
      download: '下载',
      refresh: '刷新',
    },
  },

  // 默认内容配置。layoutRows 采用 12列*N行规则；首屏 rowHeight 按 8 个可视行单元计算：
  // 1. 每个字符串代表一行，每个字符代表一列，每行必须保持 12 个字符。
  // 2. 相邻且相同的字符会合并成一个矩形块，例如 "AAAA" 会横向跨四列。
  // 3. 同一个字符上下相邻也会合并，例如两行同列都是 "A" 会纵向合并。
  // 4. "." 或空格表示留空，不生成块。
  // 5. 字符本身就是当前块默认标题；大小写不同会被视为不同块。
  // 6. widgets 用于给某个块挂载组件，key 必须和 layoutRows 里的块字符一致。
  // 7. 模板默认不内置业务组件；复制 WidgetTemplate.vue 后，再到 registry.ts 和 types.ts 注册。
  // 8. 组件数据不要写死在这里。默认 JSON 数据放到 src/data/dashboard.dataset.json；
  //    常规 API 使用 data.id: 'apiData' + data.api 配置；复杂 API/provider 再到 src/dataSources/registry.ts 注册。
  //    这里仅保留引用关系。
  // 9. visualType 用来声明组件视觉类型，校验脚本会用它检查当前块占位是否合法；最小分块为 2*1，普通图表默认 3*2 且不超过 4*3。
  //    行数为 N，不设上限；更长报表继续按同一 rowHeight 向下滚动，不重新压缩行高。
  //    列表类组件必须声明 rowHeightPx、visibleRowCount、overflowStrategy；3x2 行动列表最多展示 2 行。
  //    完整折线/柱状/组合轴图必须声明 chartBodyH >= 180；不足时扩到 3 行以上或显式改为 compact-sparkline。
  //    笛卡尔图表默认多系列图例顶部居中、单系列隐藏图例；NPS/评分/比率/目标类图表动态计算 Y 轴范围；grid 四边紧凑；Y 轴标题放左右侧，X 轴标题放底部，目标线标签用 insideEndTop。
  // 10. filterScope 用来声明当前组件受哪些有 scope 的筛选项影响。
  //    没有 scope 的筛选项是全局筛选，所有组件都会收到。
  // 11. localFilters 用来声明组件内部本地筛选，只过滤组件已加载 data，不作为接口参数。
  //     可视标题、局部筛选、轻量链接等都由组件自己渲染，页面 Shell 只传递上下文和维护筛选值。
  //     单个筛选、多个筛选组、详情入口等控件形态由组件根据自身布局决定。
  // 12. 弹窗、跳转、下钻等业务交互由组件内部自行实现。
  //     如需让外部系统感知组件事件，可 emit('dashboard-action', { name, payload })；
  //     壳层只转发到 actions/registry.ts 的同名钩子或 dashboardAction 兜底钩子。
  page: {
    layoutRows: [
      'AAABBBCCCDDD',
      'AAABBBCCCDDD',
      'EEEFFFGGGHHH',
      'EEEFFFGGGHHH',
      'IIIJJJKKKLLL',
      'IIIJJJKKKLLL',
      'MMNNOOPPQQRR',
      'SSUUVVWWXXYY',
    ],
    widgets: {},
  },

  // 轻量多页面配置。每个 key 对应 topbarNav 的 id，先提供不同占位布局，后续可逐页补 widgets。
  pages: {
    overview: {
      layoutRows: [
        'AAABBBCCCDDD',
        'AAABBBCCCDDD',
        'EEEFFFGGGHHH',
        'EEEFFFGGGHHH',
        'IIIJJJKKKLLL',
        'IIIJJJKKKLLL',
        'MMNNOOPPQQRR',
        'SSUUVVWWXXYY',
      ],
      widgets: {},
    },
    sales: {
      layoutRows: [
        'AAABBBCCCDDD',
        'AAABBBCCCDDD',
        'EEEFFFGGGHHH',
        'EEEFFFGGGHHH',
        'IIIJJJKKKLLL',
        'IIIJJJKKKLLL',
        'MMNNOOPPQQRR',
        'SSUUVVWWXXYY',
      ],
      widgets: {},
    },
    customers: {
      layoutRows: [
        'AAABBBCCCDDD',
        'AAABBBCCCDDD',
        'EEEFFFGGGHHH',
        'EEEFFFGGGHHH',
        'IIIJJJKKKLLL',
        'IIIJJJKKKLLL',
        'MMNNOOPPQQRR',
        'SSUUVVWWXXYY',
      ],
      widgets: {},
    },
    products: {
      layoutRows: [
        'AAABBBCCCDDD',
        'AAABBBCCCDDD',
        'EEEFFFGGGHHH',
        'EEEFFFGGGHHH',
        'IIIJJJKKKLLL',
        'IIIJJJKKKLLL',
        'MMNNOOPPQQRR',
        'SSUUVVWWXXYY',
      ],
      widgets: {},
    },
    channels: {
      layoutRows: [
        'AAABBBCCCDDD',
        'AAABBBCCCDDD',
        'EEEFFFGGGHHH',
        'EEEFFFGGGHHH',
        'IIIJJJKKKLLL',
        'IIIJJJKKKLLL',
        'MMNNOOPPQQRR',
        'SSUUVVWWXXYY',
      ],
      widgets: {},
    },
    regions: {
      layoutRows: [
        'AAABBBCCCDDD',
        'AAABBBCCCDDD',
        'EEEFFFGGGHHH',
        'EEEFFFGGGHHH',
        'IIIJJJKKKLLL',
        'IIIJJJKKKLLL',
        'MMNNOOPPQQRR',
        'SSUUVVWWXXYY',
      ],
      widgets: {},
    },
  },

  // 筛选项配置。模板默认保持空白，只保留全局传参入口。
  // 需要新增筛选时，优先把选项写到 src/data/dashboard.dataset.json 的 filterData 中，
  // 再在这里增加 source 引用；若选项来自接口，使用 source.id: 'apiData' + source.api。
  // 不写 scope 即为全局筛选，会传给所有组件和预留接口。
  filters: [
    {
      id: 'globalParams',
      label: '全局传参',
      defaultValue: '',
      source: {
        id: 'filterData',
        params: {
          key: 'globalParameters',
        },
        labelField: 'label',
        valueField: 'id',
      },
    },
  ],
};
