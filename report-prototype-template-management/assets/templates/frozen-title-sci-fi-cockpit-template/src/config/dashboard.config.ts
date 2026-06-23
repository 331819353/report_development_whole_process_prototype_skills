import type { DashboardConfig } from '../types/dashboard';

// 经营驾驶舱模板的唯一入口配置。
// 新页面通常只需要改这个文件：换图片、改标题、调位置、增删导航页、配置每页布局和筛选项。
export const cockpitConfig: DashboardConfig = {
  // 静态资源配置。文件放在 public 目录下时，路径以 "/" 开头。
  assets: {
    // 左上角 Haier logo，当前文件来自 public/haier-logo.svg。
    logoSrc: '/haier-logo.svg',
    // logo 的无障碍描述，图片加载失败时也会作为替代文本。
    logoAlt: 'Haier logo',
    // 标题栏背景图，当前按 1920px 宽展示，透明区域由 titleVisibleHeight 控制显示高度。
    titleBackgroundSrc: '/title-bg.png',
    // 页面整体背景图，按 backgroundTileWidth/backgroundTileHeight 平铺。
    backgroundSrc: '/cockpit-bg.jpg',
  },
  screen: {
    // 大屏主标题，显示在标题背景中心。
    title: '经营驾驶舱',
    // 导航抽屉顶部标题。
    navTitle: '功能导航',
    // 筛选抽屉顶部标题。
    filterTitle: '筛选项',
    // 默认主题。当前样式主要按 dark 设计，light 仅保留基础变量支持。
    defaultTheme: 'dark',
    // 首次进入页面时，导航抽屉是否默认打开。
    defaultNavOpen: false,
    // 首次进入页面时，筛选抽屉是否默认打开。
    defaultFiltersOpen: false,

    // 画布、标题栏和顶部控件的尺寸配置。除特别说明外，单位都是 px。
    layout: {
      // 大屏设计稿宽度。页面会固定为该宽度，浏览器不够宽时出现横向滚动。
      designWidth: 1920,
      // 大屏设计稿高度。页面内容区以这个高度为基准布局。
      designHeight: 1080,
      // 标题背景图片的原始展示宽度，需要和 title-bg.png 的设计宽度一致。
      titleBackgroundWidth: 1920,
      // 标题背景图片的原始高度。图片透明区域不会自动裁剪，需要配合 titleVisibleHeight。
      titleBackgroundHeight: 164,
      // 标题背景从图片 y=多少开始显示。当前非透明内容从顶部开始，所以为 0。
      titleVisibleTop: 0,
      // 标题/菜单区实际占用高度。当前顶部菜单栏视觉高度为 94px。
      titleVisibleHeight: 94,
      // 主标题文字的垂直微调。负数向上，正数向下。
      titleOffsetY: 8,
      // 顶部普通图标按钮尺寸，包括刷新、导航、筛选、下载等按钮高度。
      controlSize: 20,
      // 左侧 logo 的视觉宽度。
      controlLogoWidth: 48,
      // logo 横向微调。以左侧导航标题区域的左边界为基准，正数向右。
      controlLogoOffsetX: 0,
      // logo 相对下线工具行的上移距离；用于形成 logo 上线、导航/按钮下线的双基准。
      controlLogoLift: 59,
      // 普通图标按钮宽度。刷新、导航、筛选、下载保持这个宽度。
      controlIconWidth: 30,
      // 顶部工具按钮之间的间距。
      controlGroupGap: 10,
      // 顶部普通工具行距离标题区底部的距离。数值越大，按钮越向上。
      controlBottom: 1,
      // 左右两侧顶部控件距离画布边缘的距离。
      controlInset: 20,
      // 背景图平铺单元宽度，通常和设计稿宽度一致。
      backgroundTileWidth: 1920,
      // 背景图平铺单元高度，通常和设计稿高度一致。
      backgroundTileHeight: 1080,
      // 数学分块不设 gap，保证 1920/12=160、(1080-94)/8=123.25；视觉间距由 cellPadding 和卡片 padding 承担。
      contentGap: 0,
    },

    // 内容网格的公共样式配置。每个页面具体怎么分块，在 nav[].layoutRows 里配置。
    grid: {
      // 内容区起始 y 坐标。标题/菜单区冻结后，内容从 94px 位置开始。
      contentStartY: 94,
      // 内容区结束 y 坐标。默认铺到 1080px 底部。
      contentEndY: 1080,
      // 内容区 986px 按 8 行等分，得到单个分块行高 123.25px。
      rowHeight: 123.25,
      // 每个分块外层留白，控制透明块和块内背景之间的距离。
      cellPadding: 5,
      // 标题背景中占比最高的亮色，用于分块边框和高亮混色。
      dominantTitleColor: '#20a8ff',
      // 分块内部主体背景色。建议使用透明色，避免压住大屏背景。
      innerBackgroundColor: 'rgba(32, 168, 255, 0.16)',
    },

    // 顶部按钮的 aria-label/title 文案，也会作为浏览器悬浮提示。
    controls: {
      navigation: '显示或隐藏导航栏',
      filters: '显示或隐藏筛选项',
      download: '下载',
      refresh: '刷新',
      fullscreen: '全屏',
    },
  },

  // 导航页配置。数组里有几个对象，导航抽屉里就显示几个页面。
  // layoutRows 是当前导航页的分块布局，采用 12列*N行规则；首屏 rowHeight 按 8 个可视行单元计算：
  // 1. 每个字符串代表一行，每个字符代表一列。
  //    每行必须保持 12 个字符；默认首屏提供 8 行内容分块；最小分块为 2*1，普通图表默认 3*2 且不超过 4*3。
  // 2. 相邻且相同的字符会合并成一个块，例如 "gg" 会横向跨两列。
  // 3. 同一个字符上下相邻也会合并，例如两行同列都是 "A" 会纵向合并。
  // 4. "." 或空格表示留空，不生成块。
  // 5. 字符本身就是当前块的默认标题；大小写不同会被视为不同块。
  // 6. icon 可选值见 types/dashboard.ts 的 NavItem['icon']。
  // 7. widgets 用于给某个块挂载组件，key 必须和 layoutRows 里的块字符一致。
  // 8. 模板默认不内置业务组件；复制 WidgetTemplate.vue 后，再到 registry.ts 和 types.ts 注册。
  // 9. 组件数据不要写死在这里。默认 JSON 数据放到 src/data/dashboard.dataset.json；
  //    常规 API 使用 data.id: 'apiData' + data.api 配置；复杂 API/provider 再到 src/dataSources/registry.ts 注册。
  //    这里仅保留引用关系。
  // 10. visualType 用来声明组件视觉类型，校验脚本会用它检查当前块占位是否合法。
  //     列表类组件必须声明 rowHeightPx、visibleRowCount、overflowStrategy；3x2 行动列表最多展示 2 行。
  //     分块后先按 contentW = contentWidth / 12 * cols - cellPadding * 2、contentH = rowHeight * rows - cellPadding * 2 估算容器。
  //     完整折线/柱状/组合轴图必须声明 chartBodyH >= 180；contentW < 300 或 contentH < 200 不得使用完整轴图。
  //     contentW < 400、contentH < 250，或 contentW < 500 且类目密集/标签超过 4-6 字符时，必须声明 squeezeStrategy/axisLabelStrategy/dataZoomStrategy。
  //     密集标签优先使用 hideOverlap、30-45deg 旋转、抽样、dataZoom、TopN/其他或详情/表格兜底；不要用 interval: 0 强行展示所有标签。
  //     笛卡尔图表默认多系列图例顶部居中、单系列隐藏图例；NPS/评分/比率/目标类图表动态计算 Y 轴范围；grid 四边紧凑；Y 轴标题放左右侧，X 轴标题放底部，目标线标签用 insideEndTop。
  //     饼图/环图/玫瑰图必须配置 minAngle 或小扇区聚合/tooltip/detail 兜底，避免小数值扇区被挤到不可见。
  // 11. filterScope 用来声明当前组件受哪些有 scope 的筛选项影响。
  //     没有 scope 的筛选项是全局筛选，所有组件都会收到。
  // 12. localFilters 用来声明组件内部本地筛选，只过滤组件已加载 data，不作为接口参数。
  //     可视标题、局部筛选、轻量链接等都由组件自己渲染，页面 Shell 只传递上下文和维护筛选值。
  //     单个筛选、多个筛选组、详情入口等控件形态由组件根据自身布局决定。
  // 13. 弹窗、跳转、下钻等业务交互由组件内部自行实现。
  //     如需让外部系统感知组件事件，可 emit('dashboard-action', { name, payload })；
  //     壳层只转发到 actions/registry.ts 的同名钩子或 dashboardAction 兜底钩子。
  nav: [
    {
      // 页面唯一标识，用于记录当前选中导航页，不要重复。
      id: 'overview',
      // 导航抽屉显示名称，也会显示在标题区左侧当前导航位置。
      label: '经营总览',
      // 当前导航页图标。
      icon: 'Gauge',
      // 经营总览页布局：12列*N行示例；前三组是 12 个默认 3*2 主块，后两行是 12 个 2*1 补充块。
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
      id: 'industry',
      label: '产业经营',
      icon: 'Factory',
      // 产业经营页布局示例：8 行首屏分块。
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
      id: 'finance',
      label: '指标分析',
      icon: 'BarChart3',
      // 指标分析页布局示例：8 行首屏分块。
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
      id: 'network',
      label: '组织链路',
      icon: 'Network',
      // 组织链路页布局示例：左侧主块与右侧链路/列表块保持 12 列矩形。
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
      id: 'settings',
      label: '模板配置',
      icon: 'Settings',
      // 模板配置页布局示例：上方默认主块，下方多个 2*1 配置/审计块。
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
