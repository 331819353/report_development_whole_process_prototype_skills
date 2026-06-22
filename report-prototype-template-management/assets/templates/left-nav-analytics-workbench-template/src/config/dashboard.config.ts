import type { DashboardConfig } from '../types/dashboard';

// 左侧导航分析工作台模板的唯一入口配置。
// 新项目通常先改这里：换 logo、改标题、增删导航页、调整每页 layoutRows、配置筛选项和组件挂载关系。
export const cockpitConfig: DashboardConfig = {
  assets: {
    // 左侧导航顶部 logo。文件放在 public 目录下时，路径以 "/" 开头。
    logoSrc: '/haier-logo.svg',
    // logo 的无障碍描述，图片加载失败时也会作为替代文本。
    logoAlt: '海尔 logo',
  },

  screen: {
    // 左侧品牌区标题。右侧区域只渲染内容分块，不额外渲染页面头和页脚。
    title: '经营分析工作台',
    // 左侧导航的无障碍标题。
    navTitle: '功能导航',
    // 筛选浮层标题。
    filterTitle: '查询筛选',
    // 该框架按浅色企业分析台设计；如果改为 dark，需要同步调整 src/styles/index.scss 的变量。
    defaultTheme: 'light',
    // 左侧导航默认展开。用户点击底部“收起导航”后会折叠为图标栏。
    defaultNavOpen: true,
    // 首次进入页面时筛选浮层是否默认打开。
    defaultFiltersOpen: false,

    layout: {
      // 固定设计稿宽度。浏览器显示区域不够时，页面使用原生滚动条。
      designWidth: 1920,
      // 固定设计稿高度。右侧内容区内部支持纵向滚动。
      designHeight: 1080,
      // 左侧导航展开宽度，对应参考稿中的 256px 侧栏。
      sidebarWidth: 256,
      // 左侧导航折叠宽度，只保留图标和 logo。
      sidebarCollapsedWidth: 80,
      // 数学分块不设 gap，保证右侧内容区列宽按 12 列切分、行高按 8 个可视行单元计算；视觉间距由 cellPadding 和卡片 padding 承担。
      contentGap: 0,
    },

    grid: {
      // 右侧内容区从顶部到下方全部用于页面内容。纵向菜单只扣宽度，不扣高度。
      // contentEndY - contentStartY 是右侧内容画布的基准高度。
      contentStartY: 0,
      contentEndY: 1080,
      // 右侧内容区 1080px 按 8 行等分，得到单个分块行高 135px；
      // 如果超过 8 个可视行单元，右侧内容区会出现纵向滚动条。
      rowHeight: 135,
      // 每个分块外层留白。用于提供视觉间距，不参与数学分块尺寸计算。
      cellPadding: 6,
      // 保留给组件卡片的主题色，框架样式会用它做弱高亮。
      dominantTitleColor: '#004ac6',
      // 分块内部主体背景色。这里使用白色卡片，业务组件可在自己的 scoped style 中覆盖内部视觉。
      innerBackgroundColor: '#ffffff',
    },

    controls: {
      // 底部工具区按钮文案，也作为 aria-label/title。
      navigation: '收起',
      filters: '筛选',
      download: '下载',
      refresh: '刷新',
      fullscreen: '全屏',
    },
  },

  // 导航页配置。数组里有几个对象，左侧导航就显示几个页面。
  // layoutRows 是当前导航页的内容分块布局，采用 12列*N行规则；首屏 rowHeight 按 8 个可视行单元计算：
  // 1. 每个字符串代表一行，每个字符代表一列。
  // 2. 每行必须保持 12 个字符，即固定 12 列；数组有几行就是 N。
  // 3. 相邻且相同的字符会合并成一个块，例如 "AAAA" 会横向跨四列。
  // 4. 同一个字符上下相邻也会合并，例如两行同列都是 "A" 会纵向合并。
  // 5. "." 或空格表示留空，不生成块。
  // 6. 字符本身就是当前块默认标题；大小写不同会被视为不同块。
  // 7. widgets 用于给某个块挂载组件，key 必须和 layoutRows 里的块字符一致。
  // 8. 模板默认不内置业务组件；复制 WidgetTemplate.vue 后，再到 registry.ts 和 types.ts 注册。
  // 9. 组件数据不要写死在这里。默认 JSON 数据放到 src/data/dashboard.dataset.json；
  //    常规 API 使用 data.id: 'apiData' + data.api 配置；复杂 API/provider 再到 src/dataSources/registry.ts 注册。
  //    这里仅保留引用关系。
  // 10. visualType 用来声明组件视觉类型，校验脚本会用它检查当前块占位是否合法；最小分块为 2*1，普通图表默认 3*2 且不超过 4*3。
  //     行数为 N，不设上限；更长报表继续按同一 rowHeight 向下滚动，不重新压缩行高。
  //     列表类组件必须声明 rowHeightPx、visibleRowCount、overflowStrategy；3x2 行动列表最多展示 2 行。
  //     分块后先按 contentW = contentWidth / 12 * cols - cellPadding * 2、contentH = rowHeight * rows - cellPadding * 2 估算容器。
  //     完整折线/柱状/组合轴图必须声明 chartBodyH >= 180；contentW < 300 或 contentH < 200 不得使用完整轴图。
  //     contentW < 400、contentH < 250，或 contentW < 500 且类目密集/标签超过 4-6 字符时，必须声明 squeezeStrategy/axisLabelStrategy/dataZoomStrategy。
  //     密集标签优先使用 hideOverlap、30-45deg 旋转、抽样、dataZoom、TopN/其他或详情/表格兜底；不要用 interval: 0 强行展示所有标签。
  //     笛卡尔图表默认多系列图例顶部居中、单系列隐藏图例；NPS/评分/比率/目标类图表动态计算 Y 轴范围；grid 四边紧凑；Y 轴标题放左右侧，X 轴标题放底部，目标线标签用 insideEndTop。
  //     饼图/环图/玫瑰图必须配置 minAngle 或小扇区聚合/tooltip/detail 兜底，避免小数值扇区被挤到不可见。
  // 11. filterScope 用来声明当前组件受哪些有 scope 的筛选项影响。
  //     组件的数据源用 filterFields 映射筛选字段；用 requiredFilters 防止漏配后静默失效；
  //     用 ignoredFilters + ignoredFilterReasons 显式声明组件不受某些全局筛选影响。
  // 12. localFilters 用来声明组件内部本地筛选，只过滤组件已加载 data，不作为接口参数。
  //     可视标题、局部筛选、轻量链接等都由组件自己渲染，页面 Shell 只传递上下文和维护筛选值。
  //     单个筛选、多个筛选组、详情入口等控件形态由组件根据自身布局决定。
  // 13. 弹窗、跳转、下钻等业务交互由组件内部自行实现。
  //     如需让外部系统感知组件事件，可 emit('dashboard-action', { name, payload })；
  //     壳层只转发到 actions/registry.ts 的同名钩子或 dashboardAction 兜底钩子。
  nav: [
    {
      id: 'dashboard',
      label: '数据看板',
      icon: 'Gauge',
      // 12列*N行示例：前三组是 12 个默认 3*2 主块，后两行是 12 个 2*1 补充块。
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
    },
    {
      id: 'analytics',
      label: '分析查询',
      icon: 'BarChart3',
      // 12列*N行示例：适合明细表、筛选结果、趋势卡片混排；超过 8 行时右侧滚动。
      layoutRows: [
        'AAAABBBBCCCC',
        'AAAABBBBCCCC',
        'DDDEEEFFFGGG',
        'DDDEEEFFFGGG',
        'HHHIIIJJJKKK',
        'HHHIIIJJJKKK',
        'LLMMNNOOPPQQ',
        'RRSSUUVVWWXX',
      ],
    },
    {
      id: 'reports',
      label: '报表中心',
      icon: 'Factory',
      // 12列*N行示例：左右重点区 + 底部多个小块。
      layoutRows: [
        'AAAABBBCCCDD',
        'AAAABBBCCCDD',
        'EEEFFFGGGHHH',
        'EEEFFFGGGHHH',
        'IIIJJJKKKLLL',
        'IIIJJJKKKLLL',
        'MMNNOOPPQQRR',
        'SSUUVVWWXXYY',
      ],
    },
    {
      id: 'team',
      label: '组织协同',
      icon: 'Network',
      // 12列*N行示例：左侧高块 + 右侧列表块。
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
    },
    {
      id: 'security',
      label: '安全审计',
      icon: 'Settings',
      // 12列*N行示例：配置、审计、告警类内容占位。
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
    },
  ],

  // 筛选项配置。模板默认保持空白，只保留全局传参入口。
  // 需要新增筛选时，优先把选项写到 src/data/dashboard.dataset.json 的 filterData 中，
  // 再在这里增加 source 引用；若选项来自接口，使用 source.id: 'apiData' + source.api。
  // 不写 scope 即为全局筛选，会传给所有页面、组件和预留接口。
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
