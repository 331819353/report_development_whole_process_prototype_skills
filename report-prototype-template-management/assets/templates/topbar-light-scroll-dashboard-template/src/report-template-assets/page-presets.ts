import type { DashboardPageConfig } from '../types/dashboard';

export const componentSamplePage: DashboardPageConfig = {
  "layoutRows": [
    "BBCCDDEEFFGG",
    "BBCCDDEEFFGG",
    "HHIIJJKKLLMM",
    "HHIIJJKKLLMM",
    "NNOOPPQQRRSS",
    "NNOOPPQQRRSS",
    "XXYYZZ......",
    "XXYYZZ......",
    "bbbcccdddeee",
    "bbbcccdddeee",
    "fffggghhhiii",
    "fffggghhhiii",
    "jjjkkklllmmm",
    "jjjkkklllmmm",
    "nnnooopppqqq",
    "nnnooopppqqq",
    "rrrssstttuuu",
    "rrrssstttuuu",
    "vvvwww......",
    "vvvwww......",
    "000011112222",
    "000011112222",
    "000011112222"
  ],
  "widgets": {
    "0": {
      "type": "S2ReportTableWidget",
      "visualType": "pivot",
      "dataPolicy": "static",
      "displayTitle": "透视表模板",
      "titlePills": [
        {
          "id": "renderer",
          "label": "S2"
        },
        {
          "id": "mode",
          "label": "透视"
        },
        {
          "id": "agg",
          "label": "SUM"
        }
      ],
      "auxMetrics": [
        {
          "label": "行维度",
          "value": "2"
        },
        {
          "label": "列维度",
          "value": "1"
        },
        {
          "label": "指标",
          "value": "2"
        },
        {
          "label": "聚合",
          "value": "SUM"
        }
      ],
      "bodySummary": "结论：S2透视表按大区、渠道与季度交叉汇总销售额和毛利额，支持小计、总计、冻结表头与tooltip明细。",
      "props": {
        "variant": "pivot",
        "rowFields": [
          "region",
          "channel"
        ],
        "columnFields": [
          "quarter"
        ],
        "valueFields": [
          "sales",
          "margin"
        ],
        "valueInCols": true,
        "cornerText": "经营透视",
        "rawData": [
          {
            "region": "华东",
            "channel": "线上直营",
            "quarter": "Q1",
            "sales": 2180,
            "margin": 630
          },
          {
            "region": "华东",
            "channel": "线上直营",
            "quarter": "Q2",
            "sales": 2460,
            "margin": 718
          },
          {
            "region": "华东",
            "channel": "经销商",
            "quarter": "Q1",
            "sales": 1660,
            "margin": 402
          },
          {
            "region": "华东",
            "channel": "经销商",
            "quarter": "Q2",
            "sales": 1820,
            "margin": 454
          },
          {
            "region": "华南",
            "channel": "线上直营",
            "quarter": "Q1",
            "sales": 1940,
            "margin": 566
          },
          {
            "region": "华南",
            "channel": "线上直营",
            "quarter": "Q2",
            "sales": 2320,
            "margin": 690
          },
          {
            "region": "华南",
            "channel": "门店",
            "quarter": "Q1",
            "sales": 1490,
            "margin": 361
          },
          {
            "region": "华南",
            "channel": "门店",
            "quarter": "Q2",
            "sales": 1710,
            "margin": 421
          },
          {
            "region": "华北",
            "channel": "经销商",
            "quarter": "Q1",
            "sales": 1260,
            "margin": 282
          },
          {
            "region": "华北",
            "channel": "经销商",
            "quarter": "Q2",
            "sales": 1540,
            "margin": 348
          },
          {
            "region": "华北",
            "channel": "门店",
            "quarter": "Q1",
            "sales": 1180,
            "margin": 251
          },
          {
            "region": "华北",
            "channel": "门店",
            "quarter": "Q2",
            "sales": 1320,
            "margin": 295
          },
          {
            "region": "海外",
            "channel": "线上直营",
            "quarter": "Q1",
            "sales": 1740,
            "margin": 472
          },
          {
            "region": "海外",
            "channel": "线上直营",
            "quarter": "Q2",
            "sales": 2090,
            "margin": 601
          },
          {
            "region": "海外",
            "channel": "经销商",
            "quarter": "Q1",
            "sales": 1510,
            "margin": 356
          },
          {
            "region": "海外",
            "channel": "经销商",
            "quarter": "Q2",
            "sales": 1840,
            "margin": 446
          }
        ],
        "meta": [
          {
            "field": "region",
            "name": "大区"
          },
          {
            "field": "channel",
            "name": "渠道"
          },
          {
            "field": "quarter",
            "name": "季度"
          },
          {
            "field": "sales",
            "name": "销售额",
            "unit": "万元"
          },
          {
            "field": "margin",
            "name": "毛利额",
            "unit": "万元"
          }
        ],
        "pivotContract": {
          "rowDimensions": [
            "region",
            "channel"
          ],
          "columnDimensions": [
            "quarter"
          ],
          "measures": [
            "sales",
            "margin"
          ],
          "aggregation": "SUM",
          "rateFormula": "No percent/rate measure is rendered by default; if added, rateFormula must recompute totals from numerator and denominator with weighted rules.",
          "subtotal": true,
          "grandTotal": true,
          "frozen": "AntV S2 frozen colCount keeps the two row dimension columns fixed: 大区 and 渠道.",
          "tooltip": "tooltip exposes exact row path, column path, measure name, SUM aggregation formula, and source evidence values.",
          "drilldown": "drilldown/detail is reserved through tooltipPayload or dashboard-action for row path, column path, measure, and source records.",
          "states": [
            "loading",
            "empty",
            "error",
            "noPermission"
          ]
        },
        "displayBudget": {
          "rowHeightPx": 32,
          "visibleRowCount": 4,
          "rowHeaderW": 86,
          "headerRowH": 28,
          "measureColumnW": 96,
          "overflowStrategy": "AntV S2 TableSheet keeps 大区 and 渠道 frozen on the left, with canvas scroll, horizontal scroll, tooltip, drilldown/detail fallback, and fullscreen when wired."
        }
      }
    },
    "1": {
      "type": "S2ReportTableWidget",
      "visualType": "table",
      "dataPolicy": "static",
      "displayTitle": "明细表模板",
      "titlePills": [
        {
          "id": "detail",
          "label": "明细"
        },
        {
          "id": "fixed",
          "label": "固定列"
        },
        {
          "id": "page",
          "label": "分页"
        }
      ],
      "auxMetrics": [
        {
          "label": "主键",
          "value": "订单号"
        },
        {
          "label": "列数",
          "value": "11"
        },
        {
          "label": "默认排序",
          "value": "金额"
        },
        {
          "label": "单位",
          "value": "万元/%"
        }
      ],
      "bodySummary": "结论：明细表按订单粒度展示业务记录，订单号和客户固定在左侧，金额、毛利率、状态等字段保持列级对齐并支持搜索、筛选和分页。",
      "localFilters": [
        {
          "id": "detailTableStatus",
          "label": "状态筛选",
          "field": "status",
          "mode": "buttons",
          "maxButtonOptions": 4
        }
      ],
      "props": {
        "variant": "detail",
        "rowKey": "orderId",
        "detailTableContract": {
          "rowKey": "orderId",
          "primaryKey": "orderId",
          "rowGrain": "订单明细，一行一订单",
          "defaultSort": {
            "field": "amount",
            "order": "descending"
          },
          "visibleColumns": [
            "orderId",
            "customerName",
            "region",
            "channel",
            "productLine",
            "amount",
            "grossMargin",
            "status",
            "owner",
            "updatedAt",
            "operation"
          ],
          "columnPriority": {
            "orderId": 1,
            "customerName": 1,
            "amount": 1,
            "status": 1,
            "grossMargin": 2,
            "region": 2,
            "channel": 2,
            "productLine": 3,
            "owner": 3,
            "updatedAt": 4
          },
          "columnSettings": "低优先级列进入列设置或详情抽屉。",
          "maxVisibleColumns": 7,
          "hiddenColumns": [],
          "pageSize": 4,
          "currentPage": 1,
          "pagination": "local pagination and table body scroll",
          "virtual": "height-driven virtual row budget",
          "loadMore": "reserved provider loadMore when API pagination is wired",
          "search": "keyword search on orderId/customerName/region/channel/productLine/owner",
          "keyword": "",
          "query": "component-local query only",
          "filterFields": [
            "orderId",
            "customerName",
            "region",
            "channel",
            "productLine",
            "owner"
          ],
          "localFilter": "status",
          "exportScope": "filteredRows",
          "exportRows": "current filtered rows",
          "detail": "row detail",
          "rowDetail": "rowDetail dashboard-action",
          "drawer": "reserved detail drawer",
          "onRowClick": "emits rowDetail",
          "operation": "查看",
          "actions": [
            "rowDetail"
          ],
          "states": [
            "loading",
            "empty",
            "error",
            "noPermission"
          ]
        },
        "displayBudget": {
          "rowHeightPx": 32,
          "visibleRowCount": 4,
          "maxVisibleItems": 7,
          "overflowStrategy": "AntV S2 TableSheet frozen columns + horizontalScroll + pagination; secondary fields use columnSettings or detail drawer when wired"
        }
      }
    },
    "2": {
      "type": "S2ReportTableWidget",
      "visualType": "table",
      "dataPolicy": "static",
      "displayTitle": "复杂表模板",
      "titlePills": [
        {
          "id": "header",
          "label": "多级表头"
        },
        {
          "id": "freeze",
          "label": "冻结列"
        },
        {
          "id": "sort",
          "label": "排序筛选"
        }
      ],
      "auxMetrics": [
        {
          "label": "表头层级",
          "value": "2"
        },
        {
          "label": "叶子列",
          "value": "14"
        },
        {
          "label": "冻结列",
          "value": "2"
        },
        {
          "label": "单位",
          "value": "万元/%"
        }
      ],
      "bodySummary": "结论：复杂表按大区、渠道冻结主键列，右侧用多级表头承载经营、履约、风险和动作字段，适合横向字段较多的明细分析。",
      "localFilters": [
        {
          "id": "complexTableChannel",
          "label": "组件局部筛选",
          "field": "channel",
          "mode": "buttons",
          "maxButtonOptions": 4
        }
      ],
      "props": {
        "variant": "complex",
        "rowKey": "recordId",
        "complexTableContract": {
          "rowKey": "recordId",
          "primaryKey": "recordId",
          "rowGrain": "大区 x 渠道经营明细",
          "defaultSort": {
            "field": "revenue",
            "order": "descending"
          },
          "columnTree": "groupedColumns/columnTree uses multiLevelHeader with nested children.",
          "leafColumns": [
            "region",
            "channel",
            "revenue",
            "revenueYoY",
            "grossMargin",
            "orderCount",
            "fulfillmentRate",
            "avgDelivery",
            "complaintRate",
            "stockRisk",
            "overdueAmount",
            "status",
            "owner",
            "nextAction"
          ],
          "spanRules": {
            "maxDepth": 2,
            "leafColumnCount": 14,
            "colSpan": "parent colSpan = child leafColumnCount; computedSpan comes from getLeafCount(column).",
            "rowSpan": "leaf rowSpan fills maxDepth when the column has no children."
          },
          "frozenColumns": [
            "大区",
            "渠道"
          ],
          "localFilters": [
            "全部",
            "直营",
            "经销",
            "预警"
          ],
          "columnHeaderFilters": [
            "大区",
            "渠道",
            "库存风险",
            "状态"
          ],
          "tooltip": "show-overflow-tooltip exposes unit, definition, formula, formatter result and exact row detail values.",
          "densityFallback": "4x3 keeps fixed header and frozen columns; overflow-x uses horizontalScroll, columnSettings, fullscreen, pagination/virtual row budget, and detailRoute fallback.",
          "detailRoute": "/reports/complex-table/detail",
          "states": [
            "loading",
            "empty",
            "error",
            "noPermission"
          ]
        },
        "displayBudget": {
          "rowHeightPx": 32,
          "visibleRowCount": 4,
          "maxVisibleItems": 6,
          "overflowStrategy": "fixed header + frozen primary columns + horizontalScroll + virtual/pagination row budget; secondary fields collapse through columnSettings or detailRoute when wired"
        }
      }
    },
    "B": {
      "type": "ProgressGaugeWidget",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "进度或健康度模板",
      "titlePills": [
        {
          "id": "progress",
          "label": "进度"
        },
        {
          "id": "health",
          "label": "健康"
        },
        {
          "id": "trend",
          "label": "趋势"
        }
      ],
      "auxMetrics": [
        {
          "label": "环比",
          "value": "+2.1%"
        },
        {
          "label": "单位",
          "value": "%"
        }
      ],
      "bodySummary": "结论：当前进度 78%，整体处于稳定区间，后续继续关注健康度变化。",
      "props": {
        "progress": 78,
        "tone": "primary",
        "showCopy": false,
        "shape": "circle"
      }
    },
    "C": {
      "type": "StatusRowsWidget",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "清单、列表模板",
      "titlePills": [
        {
          "id": "all",
          "label": "全部"
        },
        {
          "id": "watch",
          "label": "关注"
        },
        {
          "id": "risk",
          "label": "风险"
        }
      ],
      "bodySummary": "状态列表适合承载少量对象的达成/关注/风险状态。",
      "props": {
        "tone": "warning",
        "displayBudget": {
          "rowHeightPx": 32,
          "visibleRowCount": 10,
          "maxVisibleItems": 10,
          "overflowStrategy": "show up to 10 adaptive rows with computed font size; use Element Plus scrollbar and tooltip/detail for overflow beyond 10"
        },
        "items": [
          {
            "label": "收入达成",
            "value": "达成",
            "status": "success"
          },
          {
            "label": "费用偏差",
            "value": "关注",
            "status": "warning"
          },
          {
            "label": "库存周转",
            "value": "正常",
            "status": "primary"
          },
          {
            "label": "交付准时",
            "value": "准时",
            "status": "success"
          },
          {
            "label": "质量投诉",
            "value": "低位",
            "status": "success"
          },
          {
            "label": "现金回款",
            "value": "良好",
            "status": "primary"
          },
          {
            "label": "目标缺口",
            "value": "收敛",
            "status": "warning"
          },
          {
            "label": "风险预警",
            "value": "预警",
            "status": "danger"
          },
          {
            "label": "任务闭环",
            "value": "完成",
            "status": "success"
          },
          {
            "label": "数据质量",
            "value": "可信",
            "status": "neutral"
          }
        ]
      }
    },
    "D": {
      "type": "MiniBarTrendWidget",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "柱状图模板",
      "titlePills": [
        {
          "id": "current",
          "label": "本期"
        },
        {
          "id": "target",
          "label": "目标"
        },
        {
          "id": "compare",
          "label": "同比"
        }
      ],
      "bodySummary": "结论：收入持续抬升，最近一期达到 92 万元，目标差距继续收敛。",
      "auxMetrics": [
        {
          "label": "同比",
          "value": "+8.4%"
        },
        {
          "label": "目标",
          "value": "95%"
        },
        {
          "label": "单位",
          "value": "万元"
        }
      ],
      "props": {
        "label": "收入趋势",
        "value": "92",
        "unit": "万元",
        "seriesName": "收入",
        "categories": [
          "1月",
          "2月",
          "3月",
          "4月",
          "5月",
          "6月"
        ],
        "series": [
          42,
          58,
          46,
          64,
          72,
          92
        ],
        "tone": "primary"
      }
    },
    "E": {
      "type": "TemplateEChartWidget",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "折线图模板",
      "titlePills": [
        {
          "id": "revenue",
          "label": "收入"
        },
        {
          "id": "profit",
          "label": "利润"
        },
        {
          "id": "cost",
          "label": "费用"
        }
      ],
      "bodySummary": "结论：折线趋势持续上行，最近一期达到 88 万元，波动区间保持可控。",
      "auxMetrics": [
        {
          "label": "同比",
          "value": "+7.8%"
        },
        {
          "label": "峰值",
          "value": "88"
        },
        {
          "label": "单位",
          "value": "万元"
        }
      ],
      "props": {
        "chartKind": "line",
        "seriesName": "收入",
        "unit": "万元",
        "categories": [
          "1月",
          "2月",
          "3月",
          "4月",
          "5月",
          "6月"
        ],
        "values": [
          42,
          58,
          52,
          67,
          74,
          88
        ],
        "tone": "primary"
      }
    },
    "F": {
      "type": "TemplateEChartWidget",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "饼图模板",
      "titlePills": [
        {
          "id": "channel",
          "label": "渠道"
        },
        {
          "id": "region",
          "label": "区域"
        },
        {
          "id": "product",
          "label": "品类"
        }
      ],
      "bodySummary": "结论：线上渠道占比最高，门店与经销结构稳定，其他渠道占比保持低位。",
      "auxMetrics": [
        {
          "label": "最大",
          "value": "42%"
        },
        {
          "label": "合计",
          "value": "100%"
        },
        {
          "label": "单位",
          "value": "%"
        }
      ],
      "props": {
        "chartKind": "pie",
        "seriesName": "渠道结构",
        "unit": "%",
        "pieData": [
          {
            "name": "线上",
            "value": 42
          },
          {
            "name": "门店",
            "value": 31
          },
          {
            "name": "经销",
            "value": 18
          },
          {
            "name": "其他",
            "value": 9
          }
        ],
        "tone": "primary"
      }
    },
    "G": {
      "type": "TemplateEChartWidget",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "散点图模板",
      "titlePills": [
        {
          "id": "store",
          "label": "门店"
        },
        {
          "id": "region",
          "label": "区域"
        },
        {
          "id": "sample",
          "label": "样本"
        }
      ],
      "bodySummary": "结论：高转化样本集中在健康度 80 分以上，低转化点需要继续拆解原因。",
      "auxMetrics": [
        {
          "label": "样本",
          "value": "6"
        },
        {
          "label": "高值",
          "value": "2"
        },
        {
          "label": "单位",
          "value": "分"
        }
      ],
      "props": {
        "chartKind": "scatter",
        "seriesName": "门店样本",
        "unit": "分",
        "points": [
          {
            "name": "华东A",
            "value": [
              42,
              76,
              18
            ]
          },
          {
            "name": "华南B",
            "value": [
              58,
              82,
              24
            ]
          },
          {
            "name": "华北C",
            "value": [
              66,
              69,
              16
            ]
          },
          {
            "name": "海外D",
            "value": [
              74,
              88,
              28
            ]
          },
          {
            "name": "线上E",
            "value": [
              81,
              91,
              30
            ]
          },
          {
            "name": "线下F",
            "value": [
              49,
              63,
              12
            ]
          }
        ],
        "tone": "primary"
      }
    },
    "H": {
      "type": "TemplateEChartWidget",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "地图模板",
      "titlePills": [
        {
          "id": "sales",
          "label": "销售"
        },
        {
          "id": "profit",
          "label": "利润"
        },
        {
          "id": "risk",
          "label": "风险"
        }
      ],
      "bodySummary": "结论：海外与华东贡献领先，华北仍处于爬坡区间，需要关注区域差距。",
      "auxMetrics": [
        {
          "label": "最高",
          "value": "92"
        },
        {
          "label": "区域",
          "value": "4"
        },
        {
          "label": "单位",
          "value": "万元"
        }
      ],
      "props": {
        "chartKind": "map",
        "seriesName": "区域贡献",
        "unit": "万元",
        "mapData": [
          {
            "name": "华东",
            "value": 88
          },
          {
            "name": "华南",
            "value": 76
          },
          {
            "name": "华北",
            "value": 64
          },
          {
            "name": "海外",
            "value": 92
          }
        ],
        "tone": "primary"
      }
    },
    "I": {
      "type": "TemplateEChartWidget",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "K线图模板",
      "titlePills": [
        {
          "id": "price",
          "label": "价格"
        },
        {
          "id": "volume",
          "label": "成交"
        },
        {
          "id": "risk",
          "label": "波动"
        }
      ],
      "bodySummary": "结论：价格区间震荡上移，最后一期收盘高于开盘，短期动能偏强。",
      "auxMetrics": [
        {
          "label": "涨跌",
          "value": "+3.1%"
        },
        {
          "label": "振幅",
          "value": "8.4%"
        },
        {
          "label": "单位",
          "value": "元"
        }
      ],
      "props": {
        "chartKind": "candlestick",
        "seriesName": "价格",
        "unit": "元",
        "candles": [
          {
            "date": "周一",
            "open": 24,
            "close": 29,
            "low": 21,
            "high": 31
          },
          {
            "date": "周二",
            "open": 29,
            "close": 26,
            "low": 24,
            "high": 32
          },
          {
            "date": "周三",
            "open": 26,
            "close": 34,
            "low": 25,
            "high": 36
          },
          {
            "date": "周四",
            "open": 34,
            "close": 31,
            "low": 29,
            "high": 35
          },
          {
            "date": "周五",
            "open": 31,
            "close": 38,
            "low": 30,
            "high": 40
          }
        ],
        "tone": "primary"
      }
    },
    "J": {
      "type": "MetricValueWidget",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "指标卡模板",
      "titlePills": [
        {
          "id": "current",
          "label": "本期"
        },
        {
          "id": "target",
          "label": "目标"
        },
        {
          "id": "compare",
          "label": "同比"
        }
      ],
      "bodySummary": "结论：核心指标保持高位运行，当前值完整展示并保留千分位格式。",
      "auxMetrics": [
        {
          "label": "上期",
          "value": "113,729,537"
        },
        {
          "label": "目标",
          "value": "130,000,000"
        },
        {
          "label": "单位",
          "value": "元"
        }
      ],
      "props": {
        "value": 128063459,
        "unit": "元",
        "yearOverYear": "+12.6%",
        "monthOverMonth": "+4.8%",
        "maxDecimals": 0
      }
    },
    "K": {
      "type": "RankingCardWidget",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "排名卡片模板",
      "titlePills": [
        {
          "id": "sales",
          "label": "销售"
        },
        {
          "id": "profit",
          "label": "利润"
        },
        {
          "id": "growth",
          "label": "增长"
        }
      ],
      "bodySummary": "结论：华东大区保持第一，前三项贡献集中，线上渠道增势继续扩大。",
      "auxMetrics": [
        {
          "label": "Top1",
          "value": "32%"
        },
        {
          "label": "对象",
          "value": "5"
        },
        {
          "label": "单位",
          "value": "元"
        }
      ],
      "props": {
        "valueUnit": "元",
        "displayBudget": {
          "rowHeightPx": 32,
          "visibleRowCount": 5,
          "maxVisibleItems": 5,
          "overflowStrategy": "show top 5 ranked rows in compact rows with medal colors; expose remaining rows through tooltip/detail when wired"
        },
        "items": [
          {
            "rank": 1,
            "label": "华东大区",
            "value": 32680000
          },
          {
            "rank": 2,
            "label": "线上渠道",
            "value": 28460000
          },
          {
            "rank": 3,
            "label": "华南大区",
            "value": 21930000
          },
          {
            "rank": 4,
            "label": "海外市场",
            "value": 18750000
          },
          {
            "rank": 5,
            "label": "华北大区",
            "value": 15320000
          }
        ]
      }
    },
    "L": {
      "type": "UniversalCardWidget",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "目标达成卡模板",
      "titlePills": [
        {
          "id": "actual",
          "label": "实际"
        },
        {
          "id": "target",
          "label": "目标"
        },
        {
          "id": "gap",
          "label": "差距"
        }
      ],
      "bodySummary": "结论：当前达成进度 63%，较目标周期偏差 18天。",
      "props": {
        "cardKind": "target",
        "value": "63",
        "unit": "%",
        "target": "30天",
        "gap": "18天",
        "status": "48天",
        "displayBudget": {
          "rowHeightPx": 32,
          "visibleRowCount": 3,
          "maxVisibleItems": 3,
          "overflowStrategy": "show large achievement rate, target/current/deviation fields, and a progress bar with target marker; reveal extra target fields through tooltip/detail when wired"
        },
        "rows": [
          {
            "label": "目标",
            "value": "30天"
          },
          {
            "label": "当前",
            "value": "48天"
          },
          {
            "label": "偏差",
            "value": "18天",
            "tone": "warning"
          }
        ]
      }
    },
    "M": {
      "type": "AdvancedEChartWidget",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "雷达图模板",
      "titlePills": [
        {
          "id": "score",
          "label": "评分"
        },
        {
          "id": "ability",
          "label": "能力"
        },
        {
          "id": "risk",
          "label": "风险"
        }
      ],
      "bodySummary": "结论：综合能力处于较高水平，体验与效率表现突出，风险维度仍需持续收敛。",
      "auxMetrics": [
        {
          "label": "最高",
          "value": "91"
        },
        {
          "label": "最低",
          "value": "64"
        },
        {
          "label": "单位",
          "value": "分"
        }
      ],
      "props": {
        "chartKind": "radar",
        "seriesName": "综合能力",
        "unit": "分",
        "radarIndicators": [
          {
            "name": "效率",
            "max": 100
          },
          {
            "name": "质量",
            "max": 100
          },
          {
            "name": "成本",
            "max": 100
          },
          {
            "name": "体验",
            "max": 100
          },
          {
            "name": "风险",
            "max": 100
          }
        ],
        "radarValues": [
          86,
          78,
          72,
          91,
          64
        ]
      }
    },
    "N": {
      "type": "UniversalCardWidget",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "异常预警卡模板",
      "titlePills": [
        {
          "id": "risk",
          "label": "风险"
        },
        {
          "id": "reason",
          "label": "原因"
        },
        {
          "id": "state",
          "label": "状态"
        }
      ],
      "bodySummary": "结论：逾期金额已达245万元，超过预警上限150万元，超限进度163%。",
      "props": {
        "cardKind": "warning",
        "riskLevel": "高风险",
        "metricName": "逾期金额",
        "value": "245",
        "unit": "万",
        "target": "150万",
        "gap": "+63%",
        "status": "163%",
        "displayBudget": {
          "rowHeightPx": 32,
          "visibleRowCount": 3,
          "maxVisibleItems": 3,
          "overflowStrategy": "show overdue amount, month-over-month change, warning limit, and 0-200 percent over-limit progress; reveal more warning context through tooltip/detail when wired"
        },
        "rows": [
          {
            "label": "较上月",
            "value": "+63%",
            "tone": "danger"
          },
          {
            "label": "预警上限",
            "value": "¥150万"
          },
          {
            "label": "触发规则",
            "value": "超过上限",
            "tone": "danger"
          }
        ]
      }
    },
    "O": {
      "type": "AdvancedEChartWidget",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "盒须图模板",
      "titlePills": [
        {
          "id": "sample",
          "label": "样本"
        },
        {
          "id": "median",
          "label": "中位"
        },
        {
          "id": "outlier",
          "label": "异常"
        }
      ],
      "bodySummary": "结论：海外样本上四分位更高，华北波动偏大，异常点需要结合样本明细复核。",
      "auxMetrics": [
        {
          "label": "样本",
          "value": "144"
        },
        {
          "label": "异常",
          "value": "2"
        },
        {
          "label": "单位",
          "value": "分"
        }
      ],
      "props": {
        "chartKind": "boxplot",
        "seriesName": "区域分布",
        "unit": "分",
        "boxplotCategories": [
          "华东",
          "华南",
          "华北",
          "海外"
        ],
        "boxplotData": [
          [
            48,
            62,
            70,
            82,
            94
          ],
          [
            42,
            55,
            63,
            76,
            88
          ],
          [
            36,
            49,
            58,
            68,
            83
          ],
          [
            52,
            64,
            73,
            86,
            96
          ]
        ],
        "boxplotOutliers": [
          [
            1,
            94
          ],
          [
            2,
            31
          ]
        ]
      }
    },
    "P": {
      "type": "UniversalCardWidget",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "迷你表格卡模板",
      "titlePills": [
        {
          "id": "metric",
          "label": "指标"
        },
        {
          "id": "value",
          "label": "数值"
        },
        {
          "id": "change",
          "label": "变化"
        }
      ],
      "bodySummary": "结论：核心明细保持正向表现，费用端继续收敛。",
      "auxMetrics": [
        {
          "label": "行数",
          "value": "4"
        },
        {
          "label": "进行中",
          "value": "2"
        },
        {
          "label": "单位",
          "value": "项"
        }
      ],
      "props": {
        "cardKind": "mini-grid",
        "displayBudget": {
          "rowHeightPx": 32,
          "visibleRowCount": 4,
          "maxVisibleItems": 4,
          "overflowStrategy": "show four compact task rows with priority, completion rate, and status; expose extended fields through tooltip/detail when wired"
        },
        "rows": [
          {
            "label": "用户调研分析",
            "value": "高",
            "subValue": "100%",
            "status": "已完成",
            "tone": "danger"
          },
          {
            "label": "产品原型设计",
            "value": "中",
            "subValue": "75%",
            "status": "进行中",
            "tone": "warning"
          },
          {
            "label": "接口开发联调",
            "value": "高",
            "subValue": "60%",
            "status": "进行中",
            "tone": "danger"
          },
          {
            "label": "测试用例编写",
            "value": "低",
            "subValue": "30%",
            "status": "未开始",
            "tone": "success"
          }
        ]
      }
    },
    "Q": {
      "type": "UniversalCardWidget",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "漏斗转化卡模板",
      "titlePills": [
        {
          "id": "lead",
          "label": "线索"
        },
        {
          "id": "opp",
          "label": "商机"
        },
        {
          "id": "deal",
          "label": "成交"
        }
      ],
      "bodySummary": "结论：线索到商机转化稳定，成交端仍有提升空间。",
      "auxMetrics": [
        {
          "label": "转化",
          "value": "33%"
        },
        {
          "label": "流失",
          "value": "440"
        },
        {
          "label": "单位",
          "value": "个"
        }
      ],
      "props": {
        "cardKind": "funnel",
        "displayBudget": {
          "rowHeightPx": 32,
          "visibleRowCount": 3,
          "maxVisibleItems": 3,
          "overflowStrategy": "render three funnel stages with ECharts; reveal full stage chain through tooltip/detail when wired"
        },
        "rows": [
          {
            "label": "线索",
            "value": "1,280",
            "percent": 100
          },
          {
            "label": "商机",
            "value": "860",
            "percent": 67
          },
          {
            "label": "成交",
            "value": "420",
            "percent": 33
          }
        ]
      }
    },
    "R": {
      "type": "AdvancedEChartWidget",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "热力图模板",
      "titlePills": [
        {
          "id": "quarter",
          "label": "季度"
        },
        {
          "id": "metric",
          "label": "指标"
        },
        {
          "id": "zone",
          "label": "区域"
        }
      ],
      "bodySummary": "结论：收入与利润热度持续升温，费用热区集中在 Q3，库存存在一个缺失观测点。",
      "auxMetrics": [
        {
          "label": "峰值",
          "value": "91"
        },
        {
          "label": "缺失",
          "value": "1"
        },
        {
          "label": "单位",
          "value": "分"
        }
      ],
      "props": {
        "chartKind": "heatmap",
        "seriesName": "经营热度",
        "unit": "分"
      }
    },
    "S": {
      "type": "UniversalCardWidget",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "结论摘要卡模板",
      "titlePills": [
        {
          "id": "summary",
          "label": "结论"
        },
        {
          "id": "proof",
          "label": "依据"
        },
        {
          "id": "watch",
          "label": "关注"
        }
      ],
      "props": {
        "cardKind": "summary",
        "headline": "客户满意度",
        "value": "92",
        "unit": "分",
        "displayBudget": {
          "rowHeightPx": 32,
          "visibleRowCount": 3,
          "maxVisibleItems": 3,
          "overflowStrategy": "split the component area vertically into 1/2 core conclusion and 1/2 detailed explanation rows; reveal supporting notes through tooltip/detail when wired"
        },
        "rows": [
          {
            "label": "NPS 较上季提升",
            "value": "8 分",
            "tone": "primary"
          },
          {
            "label": "服务响应时长缩短",
            "value": "27%",
            "tone": "primary"
          },
          {
            "label": "重点客群正向评价",
            "value": "显著增加",
            "tone": "warning"
          }
        ]
      }
    },
    "X": {
      "type": "AdvancedEChartWidget",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "旭日图模板",
      "titlePills": [
        {
          "id": "ring",
          "label": "环层"
        },
        {
          "id": "share",
          "label": "占比"
        },
        {
          "id": "depth",
          "label": "深度"
        }
      ],
      "bodySummary": "结论：旭日图用于观察层级结构占比，内外环共同呈现一级与二级贡献。",
      "auxMetrics": [
        {
          "label": "层级",
          "value": "2"
        },
        {
          "label": "节点",
          "value": "9"
        },
        {
          "label": "单位",
          "value": "万"
        }
      ],
      "props": {
        "chartKind": "sunburst",
        "seriesName": "层级结构",
        "unit": "万"
      }
    },
    "Y": {
      "type": "AdvancedEChartWidget",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "平行坐标系模板",
      "titlePills": [
        {
          "id": "sample",
          "label": "样本"
        },
        {
          "id": "axis",
          "label": "维度"
        },
        {
          "id": "risk",
          "label": "异常"
        }
      ],
      "bodySummary": "结论：华北样本在费用与库存维度偏离明显，适合继续做异常样本筛选。",
      "auxMetrics": [
        {
          "label": "样本",
          "value": "4"
        },
        {
          "label": "维度",
          "value": "5"
        },
        {
          "label": "单位",
          "value": "分"
        }
      ],
      "props": {
        "chartKind": "parallel",
        "seriesName": "多维样本",
        "unit": "分"
      }
    },
    "Z": {
      "type": "AdvancedEChartWidget",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "桑基图模板",
      "titlePills": [
        {
          "id": "node",
          "label": "节点"
        },
        {
          "id": "flow",
          "label": "流量"
        },
        {
          "id": "loss",
          "label": "流失"
        }
      ],
      "bodySummary": "结论：线索到商机为最大流向，报价后流失仍较明显，需关注末端转化。",
      "auxMetrics": [
        {
          "label": "流量",
          "value": "1,280"
        },
        {
          "label": "成交",
          "value": "420"
        },
        {
          "label": "单位",
          "value": "个"
        }
      ],
      "props": {
        "chartKind": "sankey",
        "seriesName": "转化流向",
        "unit": "个"
      }
    },
    "b": {
      "type": "ProgressGaugeWidget",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "进度或健康度模板",
      "titlePills": [
        {
          "id": "progress",
          "label": "进度"
        },
        {
          "id": "health",
          "label": "健康"
        },
        {
          "id": "trend",
          "label": "趋势"
        }
      ],
      "auxMetrics": [
        {
          "label": "环比",
          "value": "+2.1%"
        },
        {
          "label": "单位",
          "value": "%"
        }
      ],
      "bodySummary": "结论：当前进度 78%，整体处于稳定区间，后续继续关注健康度变化。",
      "props": {
        "progress": 78,
        "tone": "primary",
        "showCopy": false,
        "shape": "circle"
      }
    },
    "c": {
      "type": "StatusRowsWidget",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "清单、列表模板",
      "titlePills": [
        {
          "id": "all",
          "label": "全部"
        },
        {
          "id": "watch",
          "label": "关注"
        },
        {
          "id": "risk",
          "label": "风险"
        }
      ],
      "bodySummary": "状态列表适合承载少量对象的达成/关注/风险状态。",
      "props": {
        "tone": "warning",
        "displayBudget": {
          "rowHeightPx": 32,
          "visibleRowCount": 2,
          "maxVisibleItems": 2,
          "overflowStrategy": "show first 2 adaptive rows in 3x2; route remaining status rows to tooltip/detail/drawer"
        },
        "items": [
          {
            "label": "收入达成",
            "value": "达成",
            "status": "success"
          },
          {
            "label": "费用偏差",
            "value": "关注",
            "status": "warning"
          },
          {
            "label": "库存周转",
            "value": "正常",
            "status": "primary"
          },
          {
            "label": "交付准时",
            "value": "准时",
            "status": "success"
          },
          {
            "label": "质量投诉",
            "value": "低位",
            "status": "success"
          },
          {
            "label": "现金回款",
            "value": "良好",
            "status": "primary"
          },
          {
            "label": "目标缺口",
            "value": "收敛",
            "status": "warning"
          },
          {
            "label": "风险预警",
            "value": "预警",
            "status": "danger"
          },
          {
            "label": "任务闭环",
            "value": "完成",
            "status": "success"
          },
          {
            "label": "数据质量",
            "value": "可信",
            "status": "neutral"
          }
        ]
      }
    },
    "d": {
      "type": "MiniBarTrendWidget",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "柱状图模板",
      "titlePills": [
        {
          "id": "current",
          "label": "本期"
        },
        {
          "id": "target",
          "label": "目标"
        },
        {
          "id": "compare",
          "label": "同比"
        }
      ],
      "bodySummary": "结论：收入持续抬升，最近一期达到 92 万元，目标差距继续收敛。",
      "auxMetrics": [
        {
          "label": "同比",
          "value": "+8.4%"
        },
        {
          "label": "目标",
          "value": "95%"
        },
        {
          "label": "单位",
          "value": "万元"
        }
      ],
      "props": {
        "label": "收入趋势",
        "value": "92",
        "unit": "万元",
        "seriesName": "收入",
        "categories": [
          "1月",
          "2月",
          "3月",
          "4月",
          "5月",
          "6月"
        ],
        "series": [
          42,
          58,
          46,
          64,
          72,
          92
        ],
        "tone": "primary"
      }
    },
    "e": {
      "type": "TemplateEChartWidget",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "折线图模板",
      "titlePills": [
        {
          "id": "revenue",
          "label": "收入"
        },
        {
          "id": "profit",
          "label": "利润"
        },
        {
          "id": "cost",
          "label": "费用"
        }
      ],
      "bodySummary": "结论：折线趋势持续上行，最近一期达到 88 万元，波动区间保持可控。",
      "auxMetrics": [
        {
          "label": "同比",
          "value": "+7.8%"
        },
        {
          "label": "峰值",
          "value": "88"
        },
        {
          "label": "单位",
          "value": "万元"
        }
      ],
      "props": {
        "chartKind": "line",
        "seriesName": "收入",
        "unit": "万元",
        "categories": [
          "1月",
          "2月",
          "3月",
          "4月",
          "5月",
          "6月"
        ],
        "values": [
          42,
          58,
          52,
          67,
          74,
          88
        ],
        "tone": "primary"
      }
    },
    "f": {
      "type": "TemplateEChartWidget",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "饼图模板",
      "titlePills": [
        {
          "id": "channel",
          "label": "渠道"
        },
        {
          "id": "region",
          "label": "区域"
        },
        {
          "id": "product",
          "label": "品类"
        }
      ],
      "bodySummary": "结论：线上渠道占比最高，门店与经销结构稳定，其他渠道占比保持低位。",
      "auxMetrics": [
        {
          "label": "最大",
          "value": "42%"
        },
        {
          "label": "合计",
          "value": "100%"
        },
        {
          "label": "单位",
          "value": "%"
        }
      ],
      "props": {
        "chartKind": "pie",
        "seriesName": "渠道结构",
        "unit": "%",
        "pieData": [
          {
            "name": "线上",
            "value": 42
          },
          {
            "name": "门店",
            "value": 31
          },
          {
            "name": "经销",
            "value": 18
          },
          {
            "name": "其他",
            "value": 9
          }
        ],
        "tone": "primary"
      }
    },
    "g": {
      "type": "TemplateEChartWidget",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "散点图模板",
      "titlePills": [
        {
          "id": "store",
          "label": "门店"
        },
        {
          "id": "region",
          "label": "区域"
        },
        {
          "id": "sample",
          "label": "样本"
        }
      ],
      "bodySummary": "结论：高转化样本集中在健康度 80 分以上，低转化点需要继续拆解原因。",
      "auxMetrics": [
        {
          "label": "样本",
          "value": "6"
        },
        {
          "label": "高值",
          "value": "2"
        },
        {
          "label": "单位",
          "value": "分"
        }
      ],
      "props": {
        "chartKind": "scatter",
        "seriesName": "门店样本",
        "unit": "分",
        "points": [
          {
            "name": "华东A",
            "value": [
              42,
              76,
              18
            ]
          },
          {
            "name": "华南B",
            "value": [
              58,
              82,
              24
            ]
          },
          {
            "name": "华北C",
            "value": [
              66,
              69,
              16
            ]
          },
          {
            "name": "海外D",
            "value": [
              74,
              88,
              28
            ]
          },
          {
            "name": "线上E",
            "value": [
              81,
              91,
              30
            ]
          },
          {
            "name": "线下F",
            "value": [
              49,
              63,
              12
            ]
          }
        ],
        "tone": "primary"
      }
    },
    "h": {
      "type": "TemplateEChartWidget",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "地图模板",
      "titlePills": [
        {
          "id": "sales",
          "label": "销售"
        },
        {
          "id": "profit",
          "label": "利润"
        },
        {
          "id": "risk",
          "label": "风险"
        }
      ],
      "bodySummary": "结论：海外与华东贡献领先，华北仍处于爬坡区间，需要关注区域差距。",
      "auxMetrics": [
        {
          "label": "最高",
          "value": "92"
        },
        {
          "label": "区域",
          "value": "4"
        },
        {
          "label": "单位",
          "value": "万元"
        }
      ],
      "props": {
        "chartKind": "map",
        "seriesName": "区域贡献",
        "unit": "万元",
        "mapData": [
          {
            "name": "华东",
            "value": 88
          },
          {
            "name": "华南",
            "value": 76
          },
          {
            "name": "华北",
            "value": 64
          },
          {
            "name": "海外",
            "value": 92
          }
        ],
        "tone": "primary"
      }
    },
    "i": {
      "type": "TemplateEChartWidget",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "K线图模板",
      "titlePills": [
        {
          "id": "price",
          "label": "价格"
        },
        {
          "id": "volume",
          "label": "成交"
        },
        {
          "id": "risk",
          "label": "波动"
        }
      ],
      "bodySummary": "结论：价格区间震荡上移，最后一期收盘高于开盘，短期动能偏强。",
      "auxMetrics": [
        {
          "label": "涨跌",
          "value": "+3.1%"
        },
        {
          "label": "振幅",
          "value": "8.4%"
        },
        {
          "label": "单位",
          "value": "元"
        }
      ],
      "props": {
        "chartKind": "candlestick",
        "seriesName": "价格",
        "unit": "元",
        "candles": [
          {
            "date": "周一",
            "open": 24,
            "close": 29,
            "low": 21,
            "high": 31
          },
          {
            "date": "周二",
            "open": 29,
            "close": 26,
            "low": 24,
            "high": 32
          },
          {
            "date": "周三",
            "open": 26,
            "close": 34,
            "low": 25,
            "high": 36
          },
          {
            "date": "周四",
            "open": 34,
            "close": 31,
            "low": 29,
            "high": 35
          },
          {
            "date": "周五",
            "open": 31,
            "close": 38,
            "low": 30,
            "high": 40
          }
        ],
        "tone": "primary"
      }
    },
    "j": {
      "type": "MetricValueWidget",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "指标卡模板",
      "titlePills": [
        {
          "id": "current",
          "label": "本期"
        },
        {
          "id": "target",
          "label": "目标"
        },
        {
          "id": "compare",
          "label": "同比"
        }
      ],
      "bodySummary": "结论：核心指标保持高位运行，当前值完整展示并保留千分位格式。",
      "auxMetrics": [
        {
          "label": "上期",
          "value": "113,729,537"
        },
        {
          "label": "目标",
          "value": "130,000,000"
        },
        {
          "label": "单位",
          "value": "元"
        }
      ],
      "props": {
        "value": 128063459,
        "unit": "元",
        "yearOverYear": "+12.6%",
        "monthOverMonth": "+4.8%",
        "maxDecimals": 0
      }
    },
    "k": {
      "type": "RankingCardWidget",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "排名卡片模板",
      "titlePills": [
        {
          "id": "sales",
          "label": "销售"
        },
        {
          "id": "profit",
          "label": "利润"
        },
        {
          "id": "growth",
          "label": "增长"
        }
      ],
      "bodySummary": "结论：华东大区保持第一，前三项贡献集中，线上渠道增势继续扩大。",
      "auxMetrics": [
        {
          "label": "Top1",
          "value": "32%"
        },
        {
          "label": "对象",
          "value": "5"
        },
        {
          "label": "单位",
          "value": "元"
        }
      ],
      "props": {
        "valueUnit": "元",
        "displayBudget": {
          "rowHeightPx": 32,
          "visibleRowCount": 5,
          "maxVisibleItems": 5,
          "overflowStrategy": "show top 5 ranked rows in compact rows with medal colors; expose remaining rows through tooltip/detail when wired"
        },
        "items": [
          {
            "rank": 1,
            "label": "华东大区",
            "value": 32680000
          },
          {
            "rank": 2,
            "label": "线上渠道",
            "value": 28460000
          },
          {
            "rank": 3,
            "label": "华南大区",
            "value": 21930000
          },
          {
            "rank": 4,
            "label": "海外市场",
            "value": 18750000
          },
          {
            "rank": 5,
            "label": "华北大区",
            "value": 15320000
          }
        ]
      }
    },
    "l": {
      "type": "UniversalCardWidget",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "目标达成卡模板",
      "titlePills": [
        {
          "id": "actual",
          "label": "实际"
        },
        {
          "id": "target",
          "label": "目标"
        },
        {
          "id": "gap",
          "label": "差距"
        }
      ],
      "bodySummary": "结论：当前达成进度 63%，较目标周期偏差 18天。",
      "props": {
        "cardKind": "target",
        "value": "63",
        "unit": "%",
        "target": "30天",
        "gap": "18天",
        "status": "48天",
        "displayBudget": {
          "rowHeightPx": 32,
          "visibleRowCount": 3,
          "maxVisibleItems": 3,
          "overflowStrategy": "show large achievement rate, target/current/deviation fields, and a progress bar with target marker; reveal extra target fields through tooltip/detail when wired"
        },
        "rows": [
          {
            "label": "目标",
            "value": "30天"
          },
          {
            "label": "当前",
            "value": "48天"
          },
          {
            "label": "偏差",
            "value": "18天",
            "tone": "warning"
          }
        ]
      }
    },
    "m": {
      "type": "AdvancedEChartWidget",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "雷达图模板",
      "titlePills": [
        {
          "id": "score",
          "label": "评分"
        },
        {
          "id": "ability",
          "label": "能力"
        },
        {
          "id": "risk",
          "label": "风险"
        }
      ],
      "bodySummary": "结论：综合能力处于较高水平，体验与效率表现突出，风险维度仍需持续收敛。",
      "auxMetrics": [
        {
          "label": "最高",
          "value": "91"
        },
        {
          "label": "最低",
          "value": "64"
        },
        {
          "label": "单位",
          "value": "分"
        }
      ],
      "props": {
        "chartKind": "radar",
        "seriesName": "综合能力",
        "unit": "分",
        "radarIndicators": [
          {
            "name": "效率",
            "max": 100
          },
          {
            "name": "质量",
            "max": 100
          },
          {
            "name": "成本",
            "max": 100
          },
          {
            "name": "体验",
            "max": 100
          },
          {
            "name": "风险",
            "max": 100
          }
        ],
        "radarValues": [
          86,
          78,
          72,
          91,
          64
        ]
      }
    },
    "n": {
      "type": "UniversalCardWidget",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "异常预警卡模板",
      "titlePills": [
        {
          "id": "risk",
          "label": "风险"
        },
        {
          "id": "reason",
          "label": "原因"
        },
        {
          "id": "state",
          "label": "状态"
        }
      ],
      "bodySummary": "结论：逾期金额已达245万元，超过预警上限150万元，超限进度163%。",
      "props": {
        "cardKind": "warning",
        "riskLevel": "高风险",
        "metricName": "逾期金额",
        "value": "245",
        "unit": "万",
        "target": "150万",
        "gap": "+63%",
        "status": "163%",
        "displayBudget": {
          "rowHeightPx": 32,
          "visibleRowCount": 3,
          "maxVisibleItems": 3,
          "overflowStrategy": "show overdue amount, month-over-month change, warning limit, and 0-200 percent over-limit progress; reveal more warning context through tooltip/detail when wired"
        },
        "rows": [
          {
            "label": "较上月",
            "value": "+63%",
            "tone": "danger"
          },
          {
            "label": "预警上限",
            "value": "¥150万"
          },
          {
            "label": "触发规则",
            "value": "超过上限",
            "tone": "danger"
          }
        ]
      }
    },
    "o": {
      "type": "AdvancedEChartWidget",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "盒须图模板",
      "titlePills": [
        {
          "id": "sample",
          "label": "样本"
        },
        {
          "id": "median",
          "label": "中位"
        },
        {
          "id": "outlier",
          "label": "异常"
        }
      ],
      "bodySummary": "结论：海外样本上四分位更高，华北波动偏大，异常点需要结合样本明细复核。",
      "auxMetrics": [
        {
          "label": "样本",
          "value": "144"
        },
        {
          "label": "异常",
          "value": "2"
        },
        {
          "label": "单位",
          "value": "分"
        }
      ],
      "props": {
        "chartKind": "boxplot",
        "seriesName": "区域分布",
        "unit": "分",
        "boxplotCategories": [
          "华东",
          "华南",
          "华北",
          "海外"
        ],
        "boxplotData": [
          [
            48,
            62,
            70,
            82,
            94
          ],
          [
            42,
            55,
            63,
            76,
            88
          ],
          [
            36,
            49,
            58,
            68,
            83
          ],
          [
            52,
            64,
            73,
            86,
            96
          ]
        ],
        "boxplotOutliers": [
          [
            1,
            94
          ],
          [
            2,
            31
          ]
        ]
      }
    },
    "p": {
      "type": "UniversalCardWidget",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "迷你表格卡模板",
      "titlePills": [
        {
          "id": "metric",
          "label": "指标"
        },
        {
          "id": "value",
          "label": "数值"
        },
        {
          "id": "change",
          "label": "变化"
        }
      ],
      "bodySummary": "结论：核心明细保持正向表现，费用端继续收敛。",
      "auxMetrics": [
        {
          "label": "行数",
          "value": "4"
        },
        {
          "label": "进行中",
          "value": "2"
        },
        {
          "label": "单位",
          "value": "项"
        }
      ],
      "props": {
        "cardKind": "mini-grid",
        "displayBudget": {
          "rowHeightPx": 32,
          "visibleRowCount": 2,
          "maxVisibleItems": 2,
          "overflowStrategy": "show first 2 compact task rows in 3x2; expose remaining rows through tooltip/detail/drawer"
        },
        "rows": [
          {
            "label": "用户调研分析",
            "value": "高",
            "subValue": "100%",
            "status": "已完成",
            "tone": "danger"
          },
          {
            "label": "产品原型设计",
            "value": "中",
            "subValue": "75%",
            "status": "进行中",
            "tone": "warning"
          },
          {
            "label": "接口开发联调",
            "value": "高",
            "subValue": "60%",
            "status": "进行中",
            "tone": "danger"
          },
          {
            "label": "测试用例编写",
            "value": "低",
            "subValue": "30%",
            "status": "未开始",
            "tone": "success"
          }
        ]
      }
    },
    "q": {
      "type": "UniversalCardWidget",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "漏斗转化卡模板",
      "titlePills": [
        {
          "id": "lead",
          "label": "线索"
        },
        {
          "id": "opp",
          "label": "商机"
        },
        {
          "id": "deal",
          "label": "成交"
        }
      ],
      "bodySummary": "结论：线索到商机转化稳定，成交端仍有提升空间。",
      "auxMetrics": [
        {
          "label": "转化",
          "value": "33%"
        },
        {
          "label": "流失",
          "value": "440"
        },
        {
          "label": "单位",
          "value": "个"
        }
      ],
      "props": {
        "cardKind": "funnel",
        "displayBudget": {
          "rowHeightPx": 32,
          "visibleRowCount": 3,
          "maxVisibleItems": 3,
          "overflowStrategy": "render three funnel stages with ECharts; reveal full stage chain through tooltip/detail when wired"
        },
        "rows": [
          {
            "label": "线索",
            "value": "1,280",
            "percent": 100
          },
          {
            "label": "商机",
            "value": "860",
            "percent": 67
          },
          {
            "label": "成交",
            "value": "420",
            "percent": 33
          }
        ]
      }
    },
    "r": {
      "type": "AdvancedEChartWidget",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "热力图模板",
      "titlePills": [
        {
          "id": "quarter",
          "label": "季度"
        },
        {
          "id": "metric",
          "label": "指标"
        },
        {
          "id": "zone",
          "label": "区域"
        }
      ],
      "bodySummary": "结论：收入与利润热度持续升温，费用热区集中在 Q3，库存存在一个缺失观测点。",
      "auxMetrics": [
        {
          "label": "峰值",
          "value": "91"
        },
        {
          "label": "缺失",
          "value": "1"
        },
        {
          "label": "单位",
          "value": "分"
        }
      ],
      "props": {
        "chartKind": "heatmap",
        "seriesName": "经营热度",
        "unit": "分"
      }
    },
    "s": {
      "type": "UniversalCardWidget",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "结论摘要卡模板",
      "titlePills": [
        {
          "id": "summary",
          "label": "结论"
        },
        {
          "id": "proof",
          "label": "依据"
        },
        {
          "id": "watch",
          "label": "关注"
        }
      ],
      "props": {
        "cardKind": "summary",
        "headline": "客户满意度",
        "value": "92",
        "unit": "分",
        "displayBudget": {
          "rowHeightPx": 32,
          "visibleRowCount": 3,
          "maxVisibleItems": 3,
          "overflowStrategy": "split the component area vertically into 1/2 core conclusion and 1/2 detailed explanation rows; reveal supporting notes through tooltip/detail when wired"
        },
        "rows": [
          {
            "label": "NPS 较上季提升",
            "value": "8 分",
            "tone": "primary"
          },
          {
            "label": "服务响应时长缩短",
            "value": "27%",
            "tone": "primary"
          },
          {
            "label": "重点客群正向评价",
            "value": "显著增加",
            "tone": "warning"
          }
        ]
      }
    },
    "t": {
      "type": "AdvancedEChartWidget",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "旭日图模板",
      "titlePills": [
        {
          "id": "ring",
          "label": "环层"
        },
        {
          "id": "share",
          "label": "占比"
        },
        {
          "id": "depth",
          "label": "深度"
        }
      ],
      "bodySummary": "结论：旭日图用于观察层级结构占比，内外环共同呈现一级与二级贡献。",
      "auxMetrics": [
        {
          "label": "层级",
          "value": "2"
        },
        {
          "label": "节点",
          "value": "9"
        },
        {
          "label": "单位",
          "value": "万"
        }
      ],
      "props": {
        "chartKind": "sunburst",
        "seriesName": "层级结构",
        "unit": "万"
      }
    },
    "u": {
      "type": "AdvancedEChartWidget",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "平行坐标系模板",
      "titlePills": [
        {
          "id": "sample",
          "label": "样本"
        },
        {
          "id": "axis",
          "label": "维度"
        },
        {
          "id": "risk",
          "label": "异常"
        }
      ],
      "bodySummary": "结论：华北样本在费用与库存维度偏离明显，适合继续做异常样本筛选。",
      "auxMetrics": [
        {
          "label": "样本",
          "value": "4"
        },
        {
          "label": "维度",
          "value": "5"
        },
        {
          "label": "单位",
          "value": "分"
        }
      ],
      "props": {
        "chartKind": "parallel",
        "seriesName": "多维样本",
        "unit": "分"
      }
    },
    "v": {
      "type": "AdvancedEChartWidget",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "桑基图模板",
      "titlePills": [
        {
          "id": "node",
          "label": "节点"
        },
        {
          "id": "flow",
          "label": "流量"
        },
        {
          "id": "loss",
          "label": "流失"
        }
      ],
      "bodySummary": "结论：线索到商机为最大流向，报价后流失仍较明显，需关注末端转化。",
      "auxMetrics": [
        {
          "label": "流量",
          "value": "1,280"
        },
        {
          "label": "成交",
          "value": "420"
        },
        {
          "label": "单位",
          "value": "个"
        }
      ],
      "props": {
        "chartKind": "sankey",
        "seriesName": "转化流向",
        "unit": "个"
      }
    },
    "w": {
      "type": "AdvancedEChartWidget",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "四象限图模板",
      "titlePills": [
        {
          "id": "value",
          "label": "价值"
        },
        {
          "id": "growth",
          "label": "增长"
        },
        {
          "id": "focus",
          "label": "关注"
        }
      ],
      "bodySummary": "结论：旗舰客户位于高价值高增长象限，成长客户增长强但价值仍需培育。",
      "auxMetrics": [
        {
          "label": "样本",
          "value": "6"
        },
        {
          "label": "高潜",
          "value": "2"
        },
        {
          "label": "单位",
          "value": "分"
        }
      ],
      "props": {
        "chartKind": "quadrant",
        "seriesName": "客户贡献",
        "unit": "分",
        "quadrantXName": "价值潜力",
        "quadrantYName": "增长表现",
        "quadrantXSplit": 50,
        "quadrantYSplit": 50,
        "quadrantLabels": {
          "topRight": "重点突破",
          "topLeft": "潜力培育",
          "bottomLeft": "观察维护",
          "bottomRight": "效率优化"
        },
        "quadrantPoints": [
          {
            "name": "旗舰客户",
            "x": 82,
            "y": 86,
            "value": 34
          },
          {
            "name": "成长客户",
            "x": 38,
            "y": 78,
            "value": 22
          },
          {
            "name": "效率客户",
            "x": 76,
            "y": 34,
            "value": 18
          },
          {
            "name": "观察客户",
            "x": 31,
            "y": 28,
            "value": 12
          },
          {
            "name": "潜力客户",
            "x": 58,
            "y": 64,
            "value": 26
          },
          {
            "name": "流失风险",
            "x": 62,
            "y": 22,
            "value": 14
          }
        ]
      }
    }
  }
};

export const genericTemplatePage: DashboardPageConfig = {
  "layoutRows": [
    "AA..........",
    "AA..........",
    "BBB.........",
    "BBB.........",
    "CCCCDDDD....",
    "CCCCDDDD....",
    "EEEEEFFFFF..",
    "EEEEEFFFFF..",
    "GGGGGGHHHHHH",
    "GGGGGGHHHHHH",
    "IIIIIIJJJJJJ",
    "IIIIIIJJJJJJ",
    "KKKKKKK.....",
    "KKKKKKK.....",
    "LLLLLLL.....",
    "LLLLLLL.....",
    "MMMMMMM.....",
    "MMMMMMM.....",
    "NNNNNNN.....",
    "NNNNNNN.....",
    "OOOOOOO.....",
    "OOOOOOO.....",
    "PPPPPPPP....",
    "PPPPPPPP....",
    "QQQQQQQQ....",
    "QQQQQQQQ....",
    "RRRRRRRR....",
    "RRRRRRRR....",
    "SSSSSSSS....",
    "SSSSSSSS....",
    "TTTTTTTT....",
    "TTTTTTTT....",
    "UUUUUUUU....",
    "UUUUUUUU....",
    "VVVVVVVV....",
    "VVVVVVVV....",
    "WWWWWWWW....",
    "WWWWWWWW....",
    "XXXXXXXXX...",
    "XXXXXXXXX...",
    "YYYYYYYYY...",
    "YYYYYYYYY...",
    "ZZZZZZZZZ...",
    "ZZZZZZZZZ...",
    "aaaaaaaaa...",
    "aaaaaaaaa...",
    "bbbbbbbbb...",
    "bbbbbbbbb...",
    "ccccccccc...",
    "ccccccccc...",
    "ddddddddd...",
    "ddddddddd...",
    "eeeeeeeee...",
    "eeeeeeeee...",
    "fffffffff...",
    "fffffffff...",
    "ggggggggg...",
    "ggggggggg...",
    "hhhhhhhhh...",
    "hhhhhhhhh...",
    "iiiiiiiiii..",
    "iiiiiiiiii..",
    "jjjjjjjjjj..",
    "jjjjjjjjjj..",
    "kkkkkkkkkk..",
    "kkkkkkkkkk..",
    "llllllllll..",
    "llllllllll..",
    "mmmmmmmmmm..",
    "mmmmmmmmmm..",
    "nnnnnnnnnn..",
    "nnnnnnnnnn..",
    "oooooooooo..",
    "oooooooooo..",
    "pppppppppp..",
    "pppppppppp..",
    "qqqqqqqqqq..",
    "qqqqqqqqqq..",
    "rrrrrrrrrr..",
    "rrrrrrrrrr..",
    "ssssssssss..",
    "ssssssssss..",
    "tttttttttt..",
    "tttttttttt..",
    "uuuuuuuuuu..",
    "uuuuuuuuuu..",
    "vvvvvvvvvv..",
    "vvvvvvvvvv..",
    "wwwwwwwwww..",
    "wwwwwwwwww..",
    "xxxxxxxxxx..",
    "xxxxxxxxxx..",
    "yyyyyyyyyy..",
    "yyyyyyyyyy..",
    "zzzzzzzzzzz.",
    "zzzzzzzzzzz.",
    "00000000000.",
    "00000000000.",
    "11111111111.",
    "11111111111.",
    "22222222222.",
    "22222222222.",
    "33333333333.",
    "33333333333.",
    "44444444444.",
    "44444444444.",
    "55555555555.",
    "55555555555.",
    "66666666666.",
    "66666666666.",
    "77777777777.",
    "77777777777.",
    "88888888888.",
    "88888888888.",
    "99999999999.",
    "99999999999.",
    "一一一一一一一一一一一.",
    "一一一一一一一一一一一.",
    "丁丁丁丁丁丁丁丁丁丁丁.",
    "丁丁丁丁丁丁丁丁丁丁丁.",
    "丂丂丂丂丂丂丂丂丂丂丂.",
    "丂丂丂丂丂丂丂丂丂丂丂.",
    "七七七七七七七七七七七.",
    "七七七七七七七七七七七.",
    "丄丄丄丄丄丄丄丄丄丄丄.",
    "丄丄丄丄丄丄丄丄丄丄丄.",
    "丅丅丅丅丅丅丅丅丅丅丅.",
    "丅丅丅丅丅丅丅丅丅丅丅.",
    "丆丆丆丆丆丆丆丆丆丆丆.",
    "丆丆丆丆丆丆丆丆丆丆丆.",
    "万万万万万万万万万万万.",
    "万万万万万万万万万万万.",
    "丈丈丈丈丈丈丈丈丈丈丈.",
    "丈丈丈丈丈丈丈丈丈丈丈.",
    "三三三三三三三三三三三.",
    "三三三三三三三三三三三.",
    "上上上上上上上上上上上.",
    "上上上上上上上上上上上.",
    "下下下下下下下下下下下.",
    "下下下下下下下下下下下.",
    "丌丌丌丌丌丌丌丌丌丌丌.",
    "丌丌丌丌丌丌丌丌丌丌丌.",
    "不不不不不不不不不不不不",
    "不不不不不不不不不不不不",
    "与与与与与与与与与与与与",
    "与与与与与与与与与与与与",
    "丏丏丏丏丏丏丏丏丏丏丏丏",
    "丏丏丏丏丏丏丏丏丏丏丏丏",
    "丐丐丐丐丐丐丐丐丐丐丐丐",
    "丐丐丐丐丐丐丐丐丐丐丐丐",
    "丑丑丑丑丑丑丑丑丑丑丑丑",
    "丑丑丑丑丑丑丑丑丑丑丑丑",
    "丒丒丒丒丒丒丒丒丒丒丒丒",
    "丒丒丒丒丒丒丒丒丒丒丒丒",
    "专专专专专专专专专专专专",
    "专专专专专专专专专专专专",
    "且且且且且且且且且且且且",
    "且且且且且且且且且且且且",
    "丕丕丕丕丕丕丕丕丕丕丕丕",
    "丕丕丕丕丕丕丕丕丕丕丕丕",
    "世世世世世世世世世世世世",
    "世世世世世世世世世世世世",
    "丗丗丗丗丗丗丗丗丗丗丗丗",
    "丗丗丗丗丗丗丗丗丗丗丗丗",
    "丘丘丘丘丘丘丘丘丘丘丘丘",
    "丘丘丘丘丘丘丘丘丘丘丘丘",
    "丙丙丙丙丙丙丙丙丙丙丙丙",
    "丙丙丙丙丙丙丙丙丙丙丙丙",
    "业业业业业业业业业业业业",
    "业业业业业业业业业业业业",
    "丛丛丛丛丛丛丛丛丛丛丛丛",
    "丛丛丛丛丛丛丛丛丛丛丛丛",
    "东东东东东东东东东东东东",
    "东东东东东东东东东东东东",
    "丝丝丝丝丝丝丝丝丝丝丝丝",
    "丝丝丝丝丝丝丝丝丝丝丝丝",
    "丞丞丞丞丞丞丞丞丞丞丞丞",
    "丞丞丞丞丞丞丞丞丞丞丞丞",
    "丟丟丟丟丟丟丟丟丟丟丟丟",
    "丟丟丟丟丟丟丟丟丟丟丟丟",
    "丠丠丠丠丠丠丠丠丠丠丠丠",
    "丠丠丠丠丠丠丠丠丠丠丠丠",
    "両両両両両両両両両両両両",
    "両両両両両両両両両両両両",
    "丢丢丢丢丢丢丢丢丢丢丢丢",
    "丢丢丢丢丢丢丢丢丢丢丢丢",
    "丣丣丣丣丣丣丣丣丣丣丣丣",
    "丣丣丣丣丣丣丣丣丣丣丣丣",
    "两两两两两两两两两两两两",
    "两两两两两两两两两两两两",
    "严严严严严严严严严严严严",
    "严严严严严严严严严严严严",
    "並並並並並並並並並並並並",
    "並並並並並並並並並並並並",
    "丧丧丧丧丧丧丧丧丧丧丧丧",
    "丧丧丧丧丧丧丧丧丧丧丧丧",
    "丨丨丨丨丨丨丨丨丨丨丨丨",
    "丨丨丨丨丨丨丨丨丨丨丨丨",
    "丩丩丩丩丩丩丩丩丩丩丩丩",
    "丩丩丩丩丩丩丩丩丩丩丩丩",
    "个个个个个个个个个个个个",
    "个个个个个个个个个个个个",
    "丫丫丫丫丫丫丫丫丫丫丫丫",
    "丫丫丫丫丫丫丫丫丫丫丫丫",
    "丬丬丬丬丬丬丬丬丬丬丬丬",
    "丬丬丬丬丬丬丬丬丬丬丬丬",
    "中中中中中中中中中中中中",
    "中中中中中中中中中中中中",
    "丮丮丮丮丮丮丮丮丮丮丮丮",
    "丮丮丮丮丮丮丮丮丮丮丮丮",
    "丯丯丯丯丯丯丯丯丯丯丯丯",
    "丯丯丯丯丯丯丯丯丯丯丯丯",
    "丰丰丰丰丰丰丰丰丰丰丰丰",
    "丰丰丰丰丰丰丰丰丰丰丰丰",
    "丱丱丱.........",
    "丱丱丱.........",
    "丱丱丱.........",
    "串串串串丳丳丳丳....",
    "串串串串丳丳丳丳....",
    "串串串串丳丳丳丳....",
    "临临临临临丵丵丵丵丵..",
    "临临临临临丵丵丵丵丵..",
    "临临临临临丵丵丵丵丵..",
    "丶丶丶丶丶丶丷丷丷丷丷丷",
    "丶丶丶丶丶丶丷丷丷丷丷丷",
    "丶丶丶丶丶丶丷丷丷丷丷丷",
    "丸丸丸丸丸丸丹丹丹丹丹丹",
    "丸丸丸丸丸丸丹丹丹丹丹丹",
    "丸丸丸丸丸丸丹丹丹丹丹丹",
    "为为为为为为为.....",
    "为为为为为为为.....",
    "为为为为为为为.....",
    "主主主主主主主.....",
    "主主主主主主主.....",
    "主主主主主主主.....",
    "丼丼丼丼丼丼丼.....",
    "丼丼丼丼丼丼丼.....",
    "丼丼丼丼丼丼丼.....",
    "丽丽丽丽丽丽丽.....",
    "丽丽丽丽丽丽丽.....",
    "丽丽丽丽丽丽丽.....",
    "举举举举举举举.....",
    "举举举举举举举.....",
    "举举举举举举举.....",
    "丿丿丿丿丿丿丿丿....",
    "丿丿丿丿丿丿丿丿....",
    "丿丿丿丿丿丿丿丿....",
    "乀乀乀乀乀乀乀乀....",
    "乀乀乀乀乀乀乀乀....",
    "乀乀乀乀乀乀乀乀....",
    "乁乁乁乁乁乁乁乁....",
    "乁乁乁乁乁乁乁乁....",
    "乁乁乁乁乁乁乁乁....",
    "乂乂乂乂乂乂乂乂....",
    "乂乂乂乂乂乂乂乂....",
    "乂乂乂乂乂乂乂乂....",
    "乃乃乃乃乃乃乃乃....",
    "乃乃乃乃乃乃乃乃....",
    "乃乃乃乃乃乃乃乃....",
    "乄乄乄乄乄乄乄乄....",
    "乄乄乄乄乄乄乄乄....",
    "乄乄乄乄乄乄乄乄....",
    "久久久久久久久久....",
    "久久久久久久久久....",
    "久久久久久久久久....",
    "乆乆乆乆乆乆乆乆....",
    "乆乆乆乆乆乆乆乆....",
    "乆乆乆乆乆乆乆乆....",
    "乇乇乇乇乇乇乇乇乇...",
    "乇乇乇乇乇乇乇乇乇...",
    "乇乇乇乇乇乇乇乇乇...",
    "么么么么么么么么么...",
    "么么么么么么么么么...",
    "么么么么么么么么么...",
    "义义义义义义义义义...",
    "义义义义义义义义义...",
    "义义义义义义义义义...",
    "乊乊乊乊乊乊乊乊乊...",
    "乊乊乊乊乊乊乊乊乊...",
    "乊乊乊乊乊乊乊乊乊...",
    "之之之之之之之之之...",
    "之之之之之之之之之...",
    "之之之之之之之之之...",
    "乌乌乌乌乌乌乌乌乌...",
    "乌乌乌乌乌乌乌乌乌...",
    "乌乌乌乌乌乌乌乌乌...",
    "乍乍乍乍乍乍乍乍乍...",
    "乍乍乍乍乍乍乍乍乍...",
    "乍乍乍乍乍乍乍乍乍...",
    "乎乎乎乎乎乎乎乎乎...",
    "乎乎乎乎乎乎乎乎乎...",
    "乎乎乎乎乎乎乎乎乎...",
    "乏乏乏乏乏乏乏乏乏...",
    "乏乏乏乏乏乏乏乏乏...",
    "乏乏乏乏乏乏乏乏乏...",
    "乐乐乐乐乐乐乐乐乐...",
    "乐乐乐乐乐乐乐乐乐...",
    "乐乐乐乐乐乐乐乐乐...",
    "乑乑乑乑乑乑乑乑乑...",
    "乑乑乑乑乑乑乑乑乑...",
    "乑乑乑乑乑乑乑乑乑...",
    "乒乒乒乒乒乒乒乒乒乒..",
    "乒乒乒乒乒乒乒乒乒乒..",
    "乒乒乒乒乒乒乒乒乒乒..",
    "乓乓乓乓乓乓乓乓乓乓..",
    "乓乓乓乓乓乓乓乓乓乓..",
    "乓乓乓乓乓乓乓乓乓乓..",
    "乔乔乔乔乔乔乔乔乔乔..",
    "乔乔乔乔乔乔乔乔乔乔..",
    "乔乔乔乔乔乔乔乔乔乔..",
    "乕乕乕乕乕乕乕乕乕乕..",
    "乕乕乕乕乕乕乕乕乕乕..",
    "乕乕乕乕乕乕乕乕乕乕..",
    "乖乖乖乖乖乖乖乖乖乖..",
    "乖乖乖乖乖乖乖乖乖乖..",
    "乖乖乖乖乖乖乖乖乖乖..",
    "乗乗乗乗乗乗乗乗乗乗..",
    "乗乗乗乗乗乗乗乗乗乗..",
    "乗乗乗乗乗乗乗乗乗乗..",
    "乘乘乘乘乘乘乘乘乘乘..",
    "乘乘乘乘乘乘乘乘乘乘..",
    "乘乘乘乘乘乘乘乘乘乘..",
    "乙乙乙乙乙乙乙乙乙乙..",
    "乙乙乙乙乙乙乙乙乙乙..",
    "乙乙乙乙乙乙乙乙乙乙..",
    "乚乚乚乚乚乚乚乚乚乚..",
    "乚乚乚乚乚乚乚乚乚乚..",
    "乚乚乚乚乚乚乚乚乚乚..",
    "乛乛乛乛乛乛乛乛乛乛..",
    "乛乛乛乛乛乛乛乛乛乛..",
    "乛乛乛乛乛乛乛乛乛乛..",
    "乜乜乜乜乜乜乜乜乜乜..",
    "乜乜乜乜乜乜乜乜乜乜..",
    "乜乜乜乜乜乜乜乜乜乜..",
    "九九九九九九九九九九..",
    "九九九九九九九九九九..",
    "九九九九九九九九九九..",
    "乞乞乞乞乞乞乞乞乞乞..",
    "乞乞乞乞乞乞乞乞乞乞..",
    "乞乞乞乞乞乞乞乞乞乞..",
    "也也也也也也也也也也..",
    "也也也也也也也也也也..",
    "也也也也也也也也也也..",
    "习习习习习习习习习习..",
    "习习习习习习习习习习..",
    "习习习习习习习习习习..",
    "乡乡乡乡乡乡乡乡乡乡..",
    "乡乡乡乡乡乡乡乡乡乡..",
    "乡乡乡乡乡乡乡乡乡乡..",
    "乢乢乢乢乢乢乢乢乢乢..",
    "乢乢乢乢乢乢乢乢乢乢..",
    "乢乢乢乢乢乢乢乢乢乢..",
    "乣乣乣乣乣乣乣乣乣乣乣.",
    "乣乣乣乣乣乣乣乣乣乣乣.",
    "乣乣乣乣乣乣乣乣乣乣乣.",
    "乤乤乤乤乤乤乤乤乤乤乤.",
    "乤乤乤乤乤乤乤乤乤乤乤.",
    "乤乤乤乤乤乤乤乤乤乤乤.",
    "乥乥乥乥乥乥乥乥乥乥乥.",
    "乥乥乥乥乥乥乥乥乥乥乥.",
    "乥乥乥乥乥乥乥乥乥乥乥.",
    "书书书书书书书书书书书.",
    "书书书书书书书书书书书.",
    "书书书书书书书书书书书.",
    "乧乧乧乧乧乧乧乧乧乧乧.",
    "乧乧乧乧乧乧乧乧乧乧乧.",
    "乧乧乧乧乧乧乧乧乧乧乧.",
    "乨乨乨乨乨乨乨乨乨乨乨.",
    "乨乨乨乨乨乨乨乨乨乨乨.",
    "乨乨乨乨乨乨乨乨乨乨乨.",
    "乩乩乩乩乩乩乩乩乩乩乩.",
    "乩乩乩乩乩乩乩乩乩乩乩.",
    "乩乩乩乩乩乩乩乩乩乩乩.",
    "乪乪乪乪乪乪乪乪乪乪乪.",
    "乪乪乪乪乪乪乪乪乪乪乪.",
    "乪乪乪乪乪乪乪乪乪乪乪.",
    "乫乫乫乫乫乫乫乫乫乫乫.",
    "乫乫乫乫乫乫乫乫乫乫乫.",
    "乫乫乫乫乫乫乫乫乫乫乫.",
    "乬乬乬乬乬乬乬乬乬乬乬.",
    "乬乬乬乬乬乬乬乬乬乬乬.",
    "乬乬乬乬乬乬乬乬乬乬乬.",
    "乭乭乭乭乭乭乭乭乭乭乭.",
    "乭乭乭乭乭乭乭乭乭乭乭.",
    "乭乭乭乭乭乭乭乭乭乭乭.",
    "乮乮乮乮乮乮乮乮乮乮乮.",
    "乮乮乮乮乮乮乮乮乮乮乮.",
    "乮乮乮乮乮乮乮乮乮乮乮.",
    "乯乯乯乯乯乯乯乯乯乯乯.",
    "乯乯乯乯乯乯乯乯乯乯乯.",
    "乯乯乯乯乯乯乯乯乯乯乯.",
    "买买买买买买买买买买买.",
    "买买买买买买买买买买买.",
    "买买买买买买买买买买买.",
    "乱乱乱乱乱乱乱乱乱乱乱.",
    "乱乱乱乱乱乱乱乱乱乱乱.",
    "乱乱乱乱乱乱乱乱乱乱乱.",
    "乲乲乲乲乲乲乲乲乲乲乲.",
    "乲乲乲乲乲乲乲乲乲乲乲.",
    "乲乲乲乲乲乲乲乲乲乲乲.",
    "乳乳乳乳乳乳乳乳乳乳乳.",
    "乳乳乳乳乳乳乳乳乳乳乳.",
    "乳乳乳乳乳乳乳乳乳乳乳.",
    "乴乴乴乴乴乴乴乴乴乴乴.",
    "乴乴乴乴乴乴乴乴乴乴乴.",
    "乴乴乴乴乴乴乴乴乴乴乴.",
    "乵乵乵乵乵乵乵乵乵乵乵.",
    "乵乵乵乵乵乵乵乵乵乵乵.",
    "乵乵乵乵乵乵乵乵乵乵乵.",
    "乶乶乶乶乶乶乶乶乶乶乶.",
    "乶乶乶乶乶乶乶乶乶乶乶.",
    "乶乶乶乶乶乶乶乶乶乶乶.",
    "乷乷乷乷乷乷乷乷乷乷乷.",
    "乷乷乷乷乷乷乷乷乷乷乷.",
    "乷乷乷乷乷乷乷乷乷乷乷.",
    "乸乸乸乸乸乸乸乸乸乸乸.",
    "乸乸乸乸乸乸乸乸乸乸乸.",
    "乸乸乸乸乸乸乸乸乸乸乸.",
    "乹乹乹乹乹乹乹乹乹乹乹.",
    "乹乹乹乹乹乹乹乹乹乹乹.",
    "乹乹乹乹乹乹乹乹乹乹乹.",
    "乺乺乺乺乺乺乺乺乺乺乺.",
    "乺乺乺乺乺乺乺乺乺乺乺.",
    "乺乺乺乺乺乺乺乺乺乺乺.",
    "乻乻乻乻乻乻乻乻乻乻乻乻",
    "乻乻乻乻乻乻乻乻乻乻乻乻",
    "乻乻乻乻乻乻乻乻乻乻乻乻",
    "乼乼乼乼乼乼乼乼乼乼乼乼",
    "乼乼乼乼乼乼乼乼乼乼乼乼",
    "乼乼乼乼乼乼乼乼乼乼乼乼",
    "乽乽乽乽乽乽乽乽乽乽乽乽",
    "乽乽乽乽乽乽乽乽乽乽乽乽",
    "乽乽乽乽乽乽乽乽乽乽乽乽",
    "乾乾乾乾乾乾乾乾乾乾乾乾",
    "乾乾乾乾乾乾乾乾乾乾乾乾",
    "乾乾乾乾乾乾乾乾乾乾乾乾",
    "乿乿乿乿乿乿乿乿乿乿乿乿",
    "乿乿乿乿乿乿乿乿乿乿乿乿",
    "乿乿乿乿乿乿乿乿乿乿乿乿",
    "亀亀亀亀亀亀亀亀亀亀亀亀",
    "亀亀亀亀亀亀亀亀亀亀亀亀",
    "亀亀亀亀亀亀亀亀亀亀亀亀",
    "亁亁亁亁亁亁亁亁亁亁亁亁",
    "亁亁亁亁亁亁亁亁亁亁亁亁",
    "亁亁亁亁亁亁亁亁亁亁亁亁",
    "亂亂亂亂亂亂亂亂亂亂亂亂",
    "亂亂亂亂亂亂亂亂亂亂亂亂",
    "亂亂亂亂亂亂亂亂亂亂亂亂",
    "亃亃亃亃亃亃亃亃亃亃亃亃",
    "亃亃亃亃亃亃亃亃亃亃亃亃",
    "亃亃亃亃亃亃亃亃亃亃亃亃",
    "亄亄亄亄亄亄亄亄亄亄亄亄",
    "亄亄亄亄亄亄亄亄亄亄亄亄",
    "亄亄亄亄亄亄亄亄亄亄亄亄",
    "亅亅亅亅亅亅亅亅亅亅亅亅",
    "亅亅亅亅亅亅亅亅亅亅亅亅",
    "亅亅亅亅亅亅亅亅亅亅亅亅",
    "了了了了了了了了了了了了",
    "了了了了了了了了了了了了",
    "了了了了了了了了了了了了",
    "亇亇亇亇亇亇亇亇亇亇亇亇",
    "亇亇亇亇亇亇亇亇亇亇亇亇",
    "亇亇亇亇亇亇亇亇亇亇亇亇",
    "予予予予予予予予予予予予",
    "予予予予予予予予予予予予",
    "予予予予予予予予予予予予",
    "争争争争争争争争争争争争",
    "争争争争争争争争争争争争",
    "争争争争争争争争争争争争",
    "亊亊亊亊亊亊亊亊亊亊亊亊",
    "亊亊亊亊亊亊亊亊亊亊亊亊",
    "亊亊亊亊亊亊亊亊亊亊亊亊",
    "事事事事事事事事事事事事",
    "事事事事事事事事事事事事",
    "事事事事事事事事事事事事",
    "二二二二二二二二二二二二",
    "二二二二二二二二二二二二",
    "二二二二二二二二二二二二",
    "亍亍亍亍亍亍亍亍亍亍亍亍",
    "亍亍亍亍亍亍亍亍亍亍亍亍",
    "亍亍亍亍亍亍亍亍亍亍亍亍",
    "于于于于于于于于于于于于",
    "于于于于于于于于于于于于",
    "于于于于于于于于于于于于",
    "亏亏亏亏亏亏亏亏亏亏亏亏",
    "亏亏亏亏亏亏亏亏亏亏亏亏",
    "亏亏亏亏亏亏亏亏亏亏亏亏",
    "亐亐亐亐亐亐亐亐亐亐亐亐",
    "亐亐亐亐亐亐亐亐亐亐亐亐",
    "亐亐亐亐亐亐亐亐亐亐亐亐",
    "云云云云云云云云云云云云",
    "云云云云云云云云云云云云",
    "云云云云云云云云云云云云",
    "互互互互互互互互互互互互",
    "互互互互互互互互互互互互",
    "互互互互互互互互互互互互",
    "亓亓亓亓亓亓亓亓亓亓亓亓",
    "亓亓亓亓亓亓亓亓亓亓亓亓",
    "亓亓亓亓亓亓亓亓亓亓亓亓",
    "五五五五五五五五五五五五",
    "五五五五五五五五五五五五",
    "五五五五五五五五五五五五",
    "井井井井井井井井井井井井",
    "井井井井井井井井井井井井",
    "井井井井井井井井井井井井",
    "亖亖亖亖亖亖亖亖亖亖亖亖",
    "亖亖亖亖亖亖亖亖亖亖亖亖",
    "亖亖亖亖亖亖亖亖亖亖亖亖",
    "亗亗亗亗亗亗亗亗亗亗亗亗",
    "亗亗亗亗亗亗亗亗亗亗亗亗",
    "亗亗亗亗亗亗亗亗亗亗亗亗",
    "亘亘亘亘亘亘亘亘亘亘亘亘",
    "亘亘亘亘亘亘亘亘亘亘亘亘",
    "亘亘亘亘亘亘亘亘亘亘亘亘",
    "亙亙亙亙亙亙亙亙亙亙亙亙",
    "亙亙亙亙亙亙亙亙亙亙亙亙",
    "亙亙亙亙亙亙亙亙亙亙亙亙",
    "亚亚亚亚亚亚亚亚亚亚亚亚",
    "亚亚亚亚亚亚亚亚亚亚亚亚",
    "亚亚亚亚亚亚亚亚亚亚亚亚",
    "些些些些些些些些些些些些",
    "些些些些些些些些些些些些",
    "些些些些些些些些些些些些",
    "亜亜亜亜亜亜亜亜亜亜亜亜",
    "亜亜亜亜亜亜亜亜亜亜亜亜",
    "亜亜亜亜亜亜亜亜亜亜亜亜",
    "亝亝亝亝亝亝亝亝亝亝亝亝",
    "亝亝亝亝亝亝亝亝亝亝亝亝",
    "亝亝亝亝亝亝亝亝亝亝亝亝",
    "亞亞亞亞亞亞亞亞亞亞亞亞",
    "亞亞亞亞亞亞亞亞亞亞亞亞",
    "亞亞亞亞亞亞亞亞亞亞亞亞",
    "亟亟亟亟亠亠亠亠....",
    "亟亟亟亟亠亠亠亠....",
    "亟亟亟亟亠亠亠亠....",
    "亟亟亟亟亠亠亠亠....",
    "亡亡亡亡亡亢亢亢亢亢..",
    "亡亡亡亡亡亢亢亢亢亢..",
    "亡亡亡亡亡亢亢亢亢亢..",
    "亡亡亡亡亡亢亢亢亢亢..",
    "亣亣亣亣亣亣交交交交交交",
    "亣亣亣亣亣亣交交交交交交",
    "亣亣亣亣亣亣交交交交交交",
    "亣亣亣亣亣亣交交交交交交",
    "亥亥亥亥亥亥亦亦亦亦亦亦",
    "亥亥亥亥亥亥亦亦亦亦亦亦",
    "亥亥亥亥亥亥亦亦亦亦亦亦",
    "亥亥亥亥亥亥亦亦亦亦亦亦",
    "产产产产产产产.....",
    "产产产产产产产.....",
    "产产产产产产产.....",
    "产产产产产产产.....",
    "亨亨亨亨亨亨亨.....",
    "亨亨亨亨亨亨亨.....",
    "亨亨亨亨亨亨亨.....",
    "亨亨亨亨亨亨亨.....",
    "亩亩亩亩亩亩亩.....",
    "亩亩亩亩亩亩亩.....",
    "亩亩亩亩亩亩亩.....",
    "亩亩亩亩亩亩亩.....",
    "亪亪亪亪亪亪亪.....",
    "亪亪亪亪亪亪亪.....",
    "亪亪亪亪亪亪亪.....",
    "亪亪亪亪亪亪亪.....",
    "享享享享享享享.....",
    "享享享享享享享.....",
    "享享享享享享享.....",
    "享享享享享享享.....",
    "京京京京京京京京....",
    "京京京京京京京京....",
    "京京京京京京京京....",
    "京京京京京京京京....",
    "亭亭亭亭亭亭亭亭....",
    "亭亭亭亭亭亭亭亭....",
    "亭亭亭亭亭亭亭亭....",
    "亭亭亭亭亭亭亭亭....",
    "亮亮亮亮亮亮亮亮....",
    "亮亮亮亮亮亮亮亮....",
    "亮亮亮亮亮亮亮亮....",
    "亮亮亮亮亮亮亮亮....",
    "亯亯亯亯亯亯亯亯....",
    "亯亯亯亯亯亯亯亯....",
    "亯亯亯亯亯亯亯亯....",
    "亯亯亯亯亯亯亯亯....",
    "亰亰亰亰亰亰亰亰....",
    "亰亰亰亰亰亰亰亰....",
    "亰亰亰亰亰亰亰亰....",
    "亰亰亰亰亰亰亰亰....",
    "亱亱亱亱亱亱亱亱....",
    "亱亱亱亱亱亱亱亱....",
    "亱亱亱亱亱亱亱亱....",
    "亱亱亱亱亱亱亱亱....",
    "亲亲亲亲亲亲亲亲....",
    "亲亲亲亲亲亲亲亲....",
    "亲亲亲亲亲亲亲亲....",
    "亲亲亲亲亲亲亲亲....",
    "亳亳亳亳亳亳亳亳....",
    "亳亳亳亳亳亳亳亳....",
    "亳亳亳亳亳亳亳亳....",
    "亳亳亳亳亳亳亳亳....",
    "亴亴亴亴亴亴亴亴亴...",
    "亴亴亴亴亴亴亴亴亴...",
    "亴亴亴亴亴亴亴亴亴...",
    "亴亴亴亴亴亴亴亴亴...",
    "亵亵亵亵亵亵亵亵亵...",
    "亵亵亵亵亵亵亵亵亵...",
    "亵亵亵亵亵亵亵亵亵...",
    "亵亵亵亵亵亵亵亵亵...",
    "亶亶亶亶亶亶亶亶亶...",
    "亶亶亶亶亶亶亶亶亶...",
    "亶亶亶亶亶亶亶亶亶...",
    "亶亶亶亶亶亶亶亶亶...",
    "亷亷亷亷亷亷亷亷亷...",
    "亷亷亷亷亷亷亷亷亷...",
    "亷亷亷亷亷亷亷亷亷...",
    "亷亷亷亷亷亷亷亷亷...",
    "亸亸亸亸亸亸亸亸亸...",
    "亸亸亸亸亸亸亸亸亸...",
    "亸亸亸亸亸亸亸亸亸...",
    "亸亸亸亸亸亸亸亸亸...",
    "亹亹亹亹亹亹亹亹亹...",
    "亹亹亹亹亹亹亹亹亹...",
    "亹亹亹亹亹亹亹亹亹...",
    "亹亹亹亹亹亹亹亹亹...",
    "人人人人人人人人人...",
    "人人人人人人人人人...",
    "人人人人人人人人人...",
    "人人人人人人人人人...",
    "亻亻亻亻亻亻亻亻亻...",
    "亻亻亻亻亻亻亻亻亻...",
    "亻亻亻亻亻亻亻亻亻...",
    "亻亻亻亻亻亻亻亻亻...",
    "亼亼亼亼亼亼亼亼亼...",
    "亼亼亼亼亼亼亼亼亼...",
    "亼亼亼亼亼亼亼亼亼...",
    "亼亼亼亼亼亼亼亼亼...",
    "亽亽亽亽亽亽亽亽亽...",
    "亽亽亽亽亽亽亽亽亽...",
    "亽亽亽亽亽亽亽亽亽...",
    "亽亽亽亽亽亽亽亽亽...",
    "亾亾亾亾亾亾亾亾亾...",
    "亾亾亾亾亾亾亾亾亾...",
    "亾亾亾亾亾亾亾亾亾...",
    "亾亾亾亾亾亾亾亾亾...",
    "亿亿亿亿亿亿亿亿亿亿..",
    "亿亿亿亿亿亿亿亿亿亿..",
    "亿亿亿亿亿亿亿亿亿亿..",
    "亿亿亿亿亿亿亿亿亿亿..",
    "什什什什什什什什什什..",
    "什什什什什什什什什什..",
    "什什什什什什什什什什..",
    "什什什什什什什什什什..",
    "仁仁仁仁仁仁仁仁仁仁..",
    "仁仁仁仁仁仁仁仁仁仁..",
    "仁仁仁仁仁仁仁仁仁仁..",
    "仁仁仁仁仁仁仁仁仁仁..",
    "仂仂仂仂仂仂仂仂仂仂..",
    "仂仂仂仂仂仂仂仂仂仂..",
    "仂仂仂仂仂仂仂仂仂仂..",
    "仂仂仂仂仂仂仂仂仂仂..",
    "仃仃仃仃仃仃仃仃仃仃..",
    "仃仃仃仃仃仃仃仃仃仃..",
    "仃仃仃仃仃仃仃仃仃仃..",
    "仃仃仃仃仃仃仃仃仃仃..",
    "仄仄仄仄仄仄仄仄仄仄..",
    "仄仄仄仄仄仄仄仄仄仄..",
    "仄仄仄仄仄仄仄仄仄仄..",
    "仄仄仄仄仄仄仄仄仄仄..",
    "仅仅仅仅仅仅仅仅仅仅..",
    "仅仅仅仅仅仅仅仅仅仅..",
    "仅仅仅仅仅仅仅仅仅仅..",
    "仅仅仅仅仅仅仅仅仅仅..",
    "仆仆仆仆仆仆仆仆仆仆..",
    "仆仆仆仆仆仆仆仆仆仆..",
    "仆仆仆仆仆仆仆仆仆仆..",
    "仆仆仆仆仆仆仆仆仆仆..",
    "仇仇仇仇仇仇仇仇仇仇..",
    "仇仇仇仇仇仇仇仇仇仇..",
    "仇仇仇仇仇仇仇仇仇仇..",
    "仇仇仇仇仇仇仇仇仇仇..",
    "仈仈仈仈仈仈仈仈仈仈..",
    "仈仈仈仈仈仈仈仈仈仈..",
    "仈仈仈仈仈仈仈仈仈仈..",
    "仈仈仈仈仈仈仈仈仈仈..",
    "仉仉仉仉仉仉仉仉仉仉..",
    "仉仉仉仉仉仉仉仉仉仉..",
    "仉仉仉仉仉仉仉仉仉仉..",
    "仉仉仉仉仉仉仉仉仉仉..",
    "今今今今今今今今今今..",
    "今今今今今今今今今今..",
    "今今今今今今今今今今..",
    "今今今今今今今今今今..",
    "介介介介介介介介介介..",
    "介介介介介介介介介介..",
    "介介介介介介介介介介..",
    "介介介介介介介介介介..",
    "仌仌仌仌仌仌仌仌仌仌..",
    "仌仌仌仌仌仌仌仌仌仌..",
    "仌仌仌仌仌仌仌仌仌仌..",
    "仌仌仌仌仌仌仌仌仌仌..",
    "仍仍仍仍仍仍仍仍仍仍..",
    "仍仍仍仍仍仍仍仍仍仍..",
    "仍仍仍仍仍仍仍仍仍仍..",
    "仍仍仍仍仍仍仍仍仍仍..",
    "从从从从从从从从从从..",
    "从从从从从从从从从从..",
    "从从从从从从从从从从..",
    "从从从从从从从从从从..",
    "仏仏仏仏仏仏仏仏仏仏..",
    "仏仏仏仏仏仏仏仏仏仏..",
    "仏仏仏仏仏仏仏仏仏仏..",
    "仏仏仏仏仏仏仏仏仏仏..",
    "仐仐仐仐仐仐仐仐仐仐仐.",
    "仐仐仐仐仐仐仐仐仐仐仐.",
    "仐仐仐仐仐仐仐仐仐仐仐.",
    "仐仐仐仐仐仐仐仐仐仐仐.",
    "仑仑仑仑仑仑仑仑仑仑仑.",
    "仑仑仑仑仑仑仑仑仑仑仑.",
    "仑仑仑仑仑仑仑仑仑仑仑.",
    "仑仑仑仑仑仑仑仑仑仑仑.",
    "仒仒仒仒仒仒仒仒仒仒仒.",
    "仒仒仒仒仒仒仒仒仒仒仒.",
    "仒仒仒仒仒仒仒仒仒仒仒.",
    "仒仒仒仒仒仒仒仒仒仒仒.",
    "仓仓仓仓仓仓仓仓仓仓仓.",
    "仓仓仓仓仓仓仓仓仓仓仓.",
    "仓仓仓仓仓仓仓仓仓仓仓.",
    "仓仓仓仓仓仓仓仓仓仓仓.",
    "仔仔仔仔仔仔仔仔仔仔仔.",
    "仔仔仔仔仔仔仔仔仔仔仔.",
    "仔仔仔仔仔仔仔仔仔仔仔.",
    "仔仔仔仔仔仔仔仔仔仔仔.",
    "仕仕仕仕仕仕仕仕仕仕仕.",
    "仕仕仕仕仕仕仕仕仕仕仕.",
    "仕仕仕仕仕仕仕仕仕仕仕.",
    "仕仕仕仕仕仕仕仕仕仕仕.",
    "他他他他他他他他他他他.",
    "他他他他他他他他他他他.",
    "他他他他他他他他他他他.",
    "他他他他他他他他他他他.",
    "仗仗仗仗仗仗仗仗仗仗仗.",
    "仗仗仗仗仗仗仗仗仗仗仗.",
    "仗仗仗仗仗仗仗仗仗仗仗.",
    "仗仗仗仗仗仗仗仗仗仗仗.",
    "付付付付付付付付付付付.",
    "付付付付付付付付付付付.",
    "付付付付付付付付付付付.",
    "付付付付付付付付付付付.",
    "仙仙仙仙仙仙仙仙仙仙仙.",
    "仙仙仙仙仙仙仙仙仙仙仙.",
    "仙仙仙仙仙仙仙仙仙仙仙.",
    "仙仙仙仙仙仙仙仙仙仙仙.",
    "仚仚仚仚仚仚仚仚仚仚仚.",
    "仚仚仚仚仚仚仚仚仚仚仚.",
    "仚仚仚仚仚仚仚仚仚仚仚.",
    "仚仚仚仚仚仚仚仚仚仚仚.",
    "仛仛仛仛仛仛仛仛仛仛仛.",
    "仛仛仛仛仛仛仛仛仛仛仛.",
    "仛仛仛仛仛仛仛仛仛仛仛.",
    "仛仛仛仛仛仛仛仛仛仛仛.",
    "仜仜仜仜仜仜仜仜仜仜仜.",
    "仜仜仜仜仜仜仜仜仜仜仜.",
    "仜仜仜仜仜仜仜仜仜仜仜.",
    "仜仜仜仜仜仜仜仜仜仜仜.",
    "仝仝仝仝仝仝仝仝仝仝仝.",
    "仝仝仝仝仝仝仝仝仝仝仝.",
    "仝仝仝仝仝仝仝仝仝仝仝.",
    "仝仝仝仝仝仝仝仝仝仝仝.",
    "仞仞仞仞仞仞仞仞仞仞仞.",
    "仞仞仞仞仞仞仞仞仞仞仞.",
    "仞仞仞仞仞仞仞仞仞仞仞.",
    "仞仞仞仞仞仞仞仞仞仞仞.",
    "仟仟仟仟仟仟仟仟仟仟仟.",
    "仟仟仟仟仟仟仟仟仟仟仟.",
    "仟仟仟仟仟仟仟仟仟仟仟.",
    "仟仟仟仟仟仟仟仟仟仟仟.",
    "仠仠仠仠仠仠仠仠仠仠仠.",
    "仠仠仠仠仠仠仠仠仠仠仠.",
    "仠仠仠仠仠仠仠仠仠仠仠.",
    "仠仠仠仠仠仠仠仠仠仠仠.",
    "仡仡仡仡仡仡仡仡仡仡仡.",
    "仡仡仡仡仡仡仡仡仡仡仡.",
    "仡仡仡仡仡仡仡仡仡仡仡.",
    "仡仡仡仡仡仡仡仡仡仡仡.",
    "仢仢仢仢仢仢仢仢仢仢仢.",
    "仢仢仢仢仢仢仢仢仢仢仢.",
    "仢仢仢仢仢仢仢仢仢仢仢.",
    "仢仢仢仢仢仢仢仢仢仢仢.",
    "代代代代代代代代代代代.",
    "代代代代代代代代代代代.",
    "代代代代代代代代代代代.",
    "代代代代代代代代代代代.",
    "令令令令令令令令令令令.",
    "令令令令令令令令令令令.",
    "令令令令令令令令令令令.",
    "令令令令令令令令令令令.",
    "以以以以以以以以以以以.",
    "以以以以以以以以以以以.",
    "以以以以以以以以以以以.",
    "以以以以以以以以以以以.",
    "仦仦仦仦仦仦仦仦仦仦仦.",
    "仦仦仦仦仦仦仦仦仦仦仦.",
    "仦仦仦仦仦仦仦仦仦仦仦.",
    "仦仦仦仦仦仦仦仦仦仦仦.",
    "仧仧仧仧仧仧仧仧仧仧仧.",
    "仧仧仧仧仧仧仧仧仧仧仧.",
    "仧仧仧仧仧仧仧仧仧仧仧.",
    "仧仧仧仧仧仧仧仧仧仧仧.",
    "仨仨仨仨仨仨仨仨仨仨仨仨",
    "仨仨仨仨仨仨仨仨仨仨仨仨",
    "仨仨仨仨仨仨仨仨仨仨仨仨",
    "仨仨仨仨仨仨仨仨仨仨仨仨",
    "仩仩仩仩仩仩仩仩仩仩仩仩",
    "仩仩仩仩仩仩仩仩仩仩仩仩",
    "仩仩仩仩仩仩仩仩仩仩仩仩",
    "仩仩仩仩仩仩仩仩仩仩仩仩",
    "仪仪仪仪仪仪仪仪仪仪仪仪",
    "仪仪仪仪仪仪仪仪仪仪仪仪",
    "仪仪仪仪仪仪仪仪仪仪仪仪",
    "仪仪仪仪仪仪仪仪仪仪仪仪",
    "仫仫仫仫仫仫仫仫仫仫仫仫",
    "仫仫仫仫仫仫仫仫仫仫仫仫",
    "仫仫仫仫仫仫仫仫仫仫仫仫",
    "仫仫仫仫仫仫仫仫仫仫仫仫",
    "们们们们们们们们们们们们",
    "们们们们们们们们们们们们",
    "们们们们们们们们们们们们",
    "们们们们们们们们们们们们",
    "仭仭仭仭仭仭仭仭仭仭仭仭",
    "仭仭仭仭仭仭仭仭仭仭仭仭",
    "仭仭仭仭仭仭仭仭仭仭仭仭",
    "仭仭仭仭仭仭仭仭仭仭仭仭",
    "仮仮仮仮仮仮仮仮仮仮仮仮",
    "仮仮仮仮仮仮仮仮仮仮仮仮",
    "仮仮仮仮仮仮仮仮仮仮仮仮",
    "仮仮仮仮仮仮仮仮仮仮仮仮",
    "仯仯仯仯仯仯仯仯仯仯仯仯",
    "仯仯仯仯仯仯仯仯仯仯仯仯",
    "仯仯仯仯仯仯仯仯仯仯仯仯",
    "仯仯仯仯仯仯仯仯仯仯仯仯",
    "仰仰仰仰仰仰仰仰仰仰仰仰",
    "仰仰仰仰仰仰仰仰仰仰仰仰",
    "仰仰仰仰仰仰仰仰仰仰仰仰",
    "仰仰仰仰仰仰仰仰仰仰仰仰",
    "仱仱仱仱仱仱仱仱仱仱仱仱",
    "仱仱仱仱仱仱仱仱仱仱仱仱",
    "仱仱仱仱仱仱仱仱仱仱仱仱",
    "仱仱仱仱仱仱仱仱仱仱仱仱",
    "仲仲仲仲仲仲仲仲仲仲仲仲",
    "仲仲仲仲仲仲仲仲仲仲仲仲",
    "仲仲仲仲仲仲仲仲仲仲仲仲",
    "仲仲仲仲仲仲仲仲仲仲仲仲",
    "仳仳仳仳仳仳仳仳仳仳仳仳",
    "仳仳仳仳仳仳仳仳仳仳仳仳",
    "仳仳仳仳仳仳仳仳仳仳仳仳",
    "仳仳仳仳仳仳仳仳仳仳仳仳",
    "仴仴仴仴仴仴仴仴仴仴仴仴",
    "仴仴仴仴仴仴仴仴仴仴仴仴",
    "仴仴仴仴仴仴仴仴仴仴仴仴",
    "仴仴仴仴仴仴仴仴仴仴仴仴",
    "仵仵仵仵仵仵仵仵仵仵仵仵",
    "仵仵仵仵仵仵仵仵仵仵仵仵",
    "仵仵仵仵仵仵仵仵仵仵仵仵",
    "仵仵仵仵仵仵仵仵仵仵仵仵",
    "件件件件件件件件件件件件",
    "件件件件件件件件件件件件",
    "件件件件件件件件件件件件",
    "件件件件件件件件件件件件",
    "价价价价价价价价价价价价",
    "价价价价价价价价价价价价",
    "价价价价价价价价价价价价",
    "价价价价价价价价价价价价",
    "仸仸仸仸仸仸仸仸仸仸仸仸",
    "仸仸仸仸仸仸仸仸仸仸仸仸",
    "仸仸仸仸仸仸仸仸仸仸仸仸",
    "仸仸仸仸仸仸仸仸仸仸仸仸",
    "仹仹仹仹仹仹仹仹仹仹仹仹",
    "仹仹仹仹仹仹仹仹仹仹仹仹",
    "仹仹仹仹仹仹仹仹仹仹仹仹",
    "仹仹仹仹仹仹仹仹仹仹仹仹",
    "仺仺仺仺仺仺仺仺仺仺仺仺",
    "仺仺仺仺仺仺仺仺仺仺仺仺",
    "仺仺仺仺仺仺仺仺仺仺仺仺",
    "仺仺仺仺仺仺仺仺仺仺仺仺",
    "任任任任任任任任任任任任",
    "任任任任任任任任任任任任",
    "任任任任任任任任任任任任",
    "任任任任任任任任任任任任",
    "仼仼仼仼仼仼仼仼仼仼仼仼",
    "仼仼仼仼仼仼仼仼仼仼仼仼",
    "仼仼仼仼仼仼仼仼仼仼仼仼",
    "仼仼仼仼仼仼仼仼仼仼仼仼",
    "份份份份份份份份份份份份",
    "份份份份份份份份份份份份",
    "份份份份份份份份份份份份",
    "份份份份份份份份份份份份",
    "仾仾仾仾仾仾仾仾仾仾仾仾",
    "仾仾仾仾仾仾仾仾仾仾仾仾",
    "仾仾仾仾仾仾仾仾仾仾仾仾",
    "仾仾仾仾仾仾仾仾仾仾仾仾",
    "仿仿仿仿仿仿仿仿仿仿仿仿",
    "仿仿仿仿仿仿仿仿仿仿仿仿",
    "仿仿仿仿仿仿仿仿仿仿仿仿",
    "仿仿仿仿仿仿仿仿仿仿仿仿",
    "伀伀伀伀伀伀伀伀伀伀伀伀",
    "伀伀伀伀伀伀伀伀伀伀伀伀",
    "伀伀伀伀伀伀伀伀伀伀伀伀",
    "伀伀伀伀伀伀伀伀伀伀伀伀",
    "企企企企企企企企企企企企",
    "企企企企企企企企企企企企",
    "企企企企企企企企企企企企",
    "企企企企企企企企企企企企",
    "伂伂伂伂伂伂伂伂伂伂伂伂",
    "伂伂伂伂伂伂伂伂伂伂伂伂",
    "伂伂伂伂伂伂伂伂伂伂伂伂",
    "伂伂伂伂伂伂伂伂伂伂伂伂",
    "伃伃伃伃伃伃伃伃伃伃伃伃",
    "伃伃伃伃伃伃伃伃伃伃伃伃",
    "伃伃伃伃伃伃伃伃伃伃伃伃",
    "伃伃伃伃伃伃伃伃伃伃伃伃",
    "伄伄伄伄伄伄伄伄伄伄伄伄",
    "伄伄伄伄伄伄伄伄伄伄伄伄",
    "伄伄伄伄伄伄伄伄伄伄伄伄",
    "伄伄伄伄伄伄伄伄伄伄伄伄",
    "伅伅伅伅伅伅伅伅伅伅伅伅",
    "伅伅伅伅伅伅伅伅伅伅伅伅",
    "伅伅伅伅伅伅伅伅伅伅伅伅",
    "伅伅伅伅伅伅伅伅伅伅伅伅",
    "伆伆伆伆伆伆伆伆伆伆伆伆",
    "伆伆伆伆伆伆伆伆伆伆伆伆",
    "伆伆伆伆伆伆伆伆伆伆伆伆",
    "伆伆伆伆伆伆伆伆伆伆伆伆",
    "伇伇伇伇伇伇伇伇伇伇伇伇",
    "伇伇伇伇伇伇伇伇伇伇伇伇",
    "伇伇伇伇伇伇伇伇伇伇伇伇",
    "伇伇伇伇伇伇伇伇伇伇伇伇",
    "伈伈伈伈伈伈伈伈伈伈伈伈",
    "伈伈伈伈伈伈伈伈伈伈伈伈",
    "伈伈伈伈伈伈伈伈伈伈伈伈",
    "伈伈伈伈伈伈伈伈伈伈伈伈",
    "伉伉伉伉伉伉伉伉伉伉伉伉",
    "伉伉伉伉伉伉伉伉伉伉伉伉",
    "伉伉伉伉伉伉伉伉伉伉伉伉",
    "伉伉伉伉伉伉伉伉伉伉伉伉",
    "伊伊伊伊伊伊伊伊伊伊伊伊",
    "伊伊伊伊伊伊伊伊伊伊伊伊",
    "伊伊伊伊伊伊伊伊伊伊伊伊",
    "伊伊伊伊伊伊伊伊伊伊伊伊",
    "伋伋伋伋伋伋伋伋伋伋伋伋",
    "伋伋伋伋伋伋伋伋伋伋伋伋",
    "伋伋伋伋伋伋伋伋伋伋伋伋",
    "伋伋伋伋伋伋伋伋伋伋伋伋"
  ],
  "widgets": {
    "0": {
      "type": "Span11x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "11*2 AABBCCDDDEE通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBCCDDDEE",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "1": {
      "type": "Span11x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "11*2 AABBCCCDDEE通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBCCCDDEE",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "2": {
      "type": "Span11x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "11*2 AABBCCCDDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBCCCDDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "3": {
      "type": "Span11x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "11*2 AABBCCCCDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBCCCCDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "4": {
      "type": "Span11x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "11*2 AABBBCCDDEE通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBCCDDEE",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "5": {
      "type": "Span11x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "11*2 AABBBCCDDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBCCDDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "6": {
      "type": "Span11x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "11*2 AABBBCCCDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBCCCDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "7": {
      "type": "Span11x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "11*2 AABBBCCCCDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBCCCCDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "8": {
      "type": "Span11x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "11*2 AABBBBCCDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBBCCDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "9": {
      "type": "Span11x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "11*2 AABBBBCCCDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBBCCCDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "A": {
      "type": "Span02x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "2*2 AA通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AA",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "B": {
      "type": "Span03x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "3*2 AAA通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAA",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "C": {
      "type": "Span04x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "4*2 AABB通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABB",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "D": {
      "type": "Span04x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "4*2 AAAA通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAAA",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "E": {
      "type": "Span05x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "5*2 AABBB通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBB",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "F": {
      "type": "Span05x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "5*2 AAABB通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABB",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "G": {
      "type": "Span06x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "6*2 AABBCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "H": {
      "type": "Span06x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "6*2 AAABBB通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBB",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "I": {
      "type": "Span06x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "6*2 AABBBB通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBB",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "J": {
      "type": "Span06x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "6*2 BBBBAA通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "BBBBAA",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "K": {
      "type": "Span07x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "7*2 AABBCCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBCCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "L": {
      "type": "Span07x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "7*2 AAABBBB通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBBB",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "M": {
      "type": "Span07x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "7*2 AABBBCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "N": {
      "type": "Span07x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "7*2 AAAABBB通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAAABBB",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "O": {
      "type": "Span07x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "7*2 AAABBCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "P": {
      "type": "Span08x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "8*2 AABBCCDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBCCDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "Q": {
      "type": "Span08x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "8*2 AABBCCCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBCCCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "R": {
      "type": "Span08x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "8*2 AABBBCCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBCCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "S": {
      "type": "Span08x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "8*2 AABBBBCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBBCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "T": {
      "type": "Span08x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "8*2 AAABBCCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBCCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "U": {
      "type": "Span08x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "8*2 AAABBBCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBBCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "V": {
      "type": "Span08x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "8*2 AAAABBCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAAABBCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "W": {
      "type": "Span08x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "8*2 AAAABBBB通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAAABBBB",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "X": {
      "type": "Span09x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "9*2 AABBCCDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBCCDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "Y": {
      "type": "Span09x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "9*2 AABBCCCDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBCCCDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "Z": {
      "type": "Span09x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "9*2 AABBBCCDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBCCDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "a": {
      "type": "Span09x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "9*2 AABBBCCCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBCCCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "b": {
      "type": "Span09x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "9*2 AABBBBCCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBBCCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "c": {
      "type": "Span09x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "9*2 AAABBCCDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBCCDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "d": {
      "type": "Span09x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "9*2 AAABBCCCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBCCCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "e": {
      "type": "Span09x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "9*2 AAABBBCCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBBCCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "f": {
      "type": "Span09x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "9*2 AAABBBBCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBBBCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "g": {
      "type": "Span09x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "9*2 AAAABBCCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAAABBCCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "h": {
      "type": "Span09x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "9*2 AAAABBBCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAAABBBCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "i": {
      "type": "Span10x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "10*2 AABBCCDDEE通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBCCDDEE",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "j": {
      "type": "Span10x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "10*2 AABBCCDDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBCCDDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "k": {
      "type": "Span10x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "10*2 AABBCCCDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBCCCDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "l": {
      "type": "Span10x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "10*2 AABBCCCCDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBCCCCDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "m": {
      "type": "Span10x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "10*2 AABBBCCDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBCCDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "n": {
      "type": "Span10x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "10*2 AABBBCCCDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBCCCDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "o": {
      "type": "Span10x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "10*2 AABBBBCCDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBBCCDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "p": {
      "type": "Span10x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "10*2 AABBBBCCCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBBCCCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "q": {
      "type": "Span10x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "10*2 AAABBCCDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBCCDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "r": {
      "type": "Span10x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "10*2 AAABBCCCDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBCCCDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "s": {
      "type": "Span10x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "10*2 AAABBBCCDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBBCCDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "t": {
      "type": "Span10x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "10*2 AAABBBCCCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBBCCCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "u": {
      "type": "Span10x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "10*2 AAABBBBCCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBBBCCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "v": {
      "type": "Span10x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "10*2 AAAABBCCDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAAABBCCDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "w": {
      "type": "Span10x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "10*2 AAAABBCCCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAAABBCCCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "x": {
      "type": "Span10x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "10*2 AAAABBBCCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAAABBBCCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "y": {
      "type": "Span10x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "10*2 AAAABBBBCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAAABBBBCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "z": {
      "type": "Span11x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "11*2 AABBCCDDEEE通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBCCDDEEE",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "一": {
      "type": "Span11x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "11*2 AAABBCCDDEE通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBCCDDEE",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "丁": {
      "type": "Span11x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "11*2 AAABBCCDDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBCCDDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "丂": {
      "type": "Span11x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "11*2 AAABBCCCDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBCCCDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "七": {
      "type": "Span11x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "11*2 AAABBCCCCDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBCCCCDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "丄": {
      "type": "Span11x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "11*2 AAABBBCCDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBBCCDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "丅": {
      "type": "Span11x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "11*2 AAABBBCCCDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBBCCCDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "丆": {
      "type": "Span11x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "11*2 AAABBBBCCDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBBBCCDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "万": {
      "type": "Span11x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "11*2 AAABBBBCCCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBBBCCCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "丈": {
      "type": "Span11x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "11*2 AAAABBCCDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAAABBCCDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "三": {
      "type": "Span11x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "11*2 AAAABBCCCDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAAABBCCCDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "上": {
      "type": "Span11x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "11*2 AAAABBBCCDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAAABBBCCDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "下": {
      "type": "Span11x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "11*2 AAAABBBCCCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAAABBBCCCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "丌": {
      "type": "Span11x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "11*2 AAAABBBBCCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAAABBBBCCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "不": {
      "type": "Span12x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*2 AABBCCDDEEFF通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBCCDDEEFF",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "与": {
      "type": "Span12x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*2 AABBCCDDEEEE通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBCCDDEEEE",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "丏": {
      "type": "Span12x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*2 AABBCCDDDEEE通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBCCDDDEEE",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "丐": {
      "type": "Span12x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*2 AABBCCDDDDEE通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBCCDDDDEE",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "丑": {
      "type": "Span12x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*2 AABBCCCDDEEE通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBCCCDDEEE",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "丒": {
      "type": "Span12x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*2 AABBCCCDDDEE通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBCCCDDDEE",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "专": {
      "type": "Span12x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*2 AABBCCCCDDEE通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBCCCCDDEE",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "且": {
      "type": "Span12x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*2 AABBCCCCDDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBCCCCDDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "丕": {
      "type": "Span12x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*2 AABBBCCDDEEE通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBCCDDEEE",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "世": {
      "type": "Span12x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*2 AABBBCCDDDEE通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBCCDDDEE",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "丗": {
      "type": "Span12x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*2 AABBBCCCDDEE通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBCCCDDEE",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "丘": {
      "type": "Span12x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*2 AABBBCCCDDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBCCCDDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "丙": {
      "type": "Span12x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*2 AABBBCCCCDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBCCCCDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "业": {
      "type": "Span12x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*2 AABBBBCCDDEE通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBBCCDDEE",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "丛": {
      "type": "Span12x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*2 AABBBBCCDDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBBCCDDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "东": {
      "type": "Span12x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*2 AABBBBCCCDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBBCCCDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "丝": {
      "type": "Span12x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*2 AABBBBCCCCDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBBCCCCDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "丞": {
      "type": "Span12x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*2 AAABBCCDDEEE通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBCCDDEEE",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "丟": {
      "type": "Span12x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*2 AAABBCCDDDEE通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBCCDDDEE",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "丠": {
      "type": "Span12x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*2 AAABBCCCDDEE通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBCCCDDEE",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "両": {
      "type": "Span12x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*2 AAABBCCCDDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBCCCDDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "丢": {
      "type": "Span12x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*2 AAABBCCCCDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBCCCCDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "丣": {
      "type": "Span12x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*2 AAABBBCCDDEE通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBBCCDDEE",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "两": {
      "type": "Span12x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*2 AAABBBCCDDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBBCCDDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "严": {
      "type": "Span12x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*2 AAABBBCCCDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBBCCCDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "並": {
      "type": "Span12x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*2 AAABBBCCCCDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBBCCCCDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "丧": {
      "type": "Span12x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*2 AAABBBBCCDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBBBCCDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "丨": {
      "type": "Span12x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*2 AAABBBBCCCDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBBBCCCDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "丩": {
      "type": "Span12x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*2 AAAABBCCDDEE通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAAABBCCDDEE",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "个": {
      "type": "Span12x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*2 AAAABBCCDDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAAABBCCDDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "丫": {
      "type": "Span12x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*2 AAAABBCCCDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAAABBCCCDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "丬": {
      "type": "Span12x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*2 AAAABBCCCCDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAAABBCCCCDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "中": {
      "type": "Span12x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*2 AAAABBBCCDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAAABBBCCDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "丮": {
      "type": "Span12x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*2 AAAABBBCCCDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAAABBBCCCDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "丯": {
      "type": "Span12x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*2 AAAABBBBCCDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAAABBBBCCDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "丰": {
      "type": "Span12x02Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*2 AAAABBBBCCCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAAABBBBCCCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "丱": {
      "type": "Span03x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "3*3 AAA通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAA",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "串": {
      "type": "Span04x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "4*3 AABB通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABB",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "丳": {
      "type": "Span04x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "4*3 AAAA通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAAA",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "临": {
      "type": "Span05x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "5*3 AABBB通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBB",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "丵": {
      "type": "Span05x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "5*3 AAABB通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABB",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "丶": {
      "type": "Span06x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "6*3 AABBCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "丷": {
      "type": "Span06x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "6*3 AAABBB通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBB",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "丸": {
      "type": "Span06x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "6*3 AABBBB通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBB",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "丹": {
      "type": "Span06x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "6*3 BBBBAA通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "BBBBAA",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "为": {
      "type": "Span07x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "7*3 AABBCCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBCCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "主": {
      "type": "Span07x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "7*3 AAABBBB通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBBB",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "丼": {
      "type": "Span07x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "7*3 AABBBCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "丽": {
      "type": "Span07x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "7*3 AAAABBB通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAAABBB",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "举": {
      "type": "Span07x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "7*3 AAABBCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "丿": {
      "type": "Span08x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "8*3 AABBCCDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBCCDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "乀": {
      "type": "Span08x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "8*3 AABBCCCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBCCCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "乁": {
      "type": "Span08x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "8*3 AABBBCCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBCCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "乂": {
      "type": "Span08x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "8*3 AABBBBCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBBCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "乃": {
      "type": "Span08x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "8*3 AAABBCCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBCCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "乄": {
      "type": "Span08x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "8*3 AAABBBCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBBCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "久": {
      "type": "Span08x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "8*3 AAAABBCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAAABBCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "乆": {
      "type": "Span08x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "8*3 AAAABBBB通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAAABBBB",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "乇": {
      "type": "Span09x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "9*3 AABBCCDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBCCDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "么": {
      "type": "Span09x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "9*3 AABBCCCDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBCCCDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "义": {
      "type": "Span09x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "9*3 AABBBCCDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBCCDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "乊": {
      "type": "Span09x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "9*3 AABBBCCCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBCCCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "之": {
      "type": "Span09x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "9*3 AABBBBCCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBBCCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "乌": {
      "type": "Span09x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "9*3 AAABBCCDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBCCDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "乍": {
      "type": "Span09x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "9*3 AAABBCCCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBCCCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "乎": {
      "type": "Span09x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "9*3 AAABBBCCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBBCCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "乏": {
      "type": "Span09x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "9*3 AAABBBBCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBBBCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "乐": {
      "type": "Span09x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "9*3 AAAABBCCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAAABBCCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "乑": {
      "type": "Span09x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "9*3 AAAABBBCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAAABBBCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "乒": {
      "type": "Span10x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "10*3 AABBCCDDEE通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBCCDDEE",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "乓": {
      "type": "Span10x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "10*3 AABBCCDDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBCCDDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "乔": {
      "type": "Span10x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "10*3 AABBCCCDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBCCCDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "乕": {
      "type": "Span10x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "10*3 AABBCCCCDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBCCCCDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "乖": {
      "type": "Span10x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "10*3 AABBBCCDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBCCDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "乗": {
      "type": "Span10x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "10*3 AABBBCCCDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBCCCDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "乘": {
      "type": "Span10x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "10*3 AABBBBCCDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBBCCDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "乙": {
      "type": "Span10x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "10*3 AABBBBCCCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBBCCCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "乚": {
      "type": "Span10x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "10*3 AAABBCCDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBCCDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "乛": {
      "type": "Span10x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "10*3 AAABBCCCDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBCCCDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "乜": {
      "type": "Span10x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "10*3 AAABBBCCDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBBCCDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "九": {
      "type": "Span10x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "10*3 AAABBBCCCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBBCCCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "乞": {
      "type": "Span10x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "10*3 AAABBBBCCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBBBCCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "也": {
      "type": "Span10x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "10*3 AAAABBCCDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAAABBCCDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "习": {
      "type": "Span10x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "10*3 AAAABBCCCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAAABBCCCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "乡": {
      "type": "Span10x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "10*3 AAAABBBCCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAAABBBCCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "乢": {
      "type": "Span10x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "10*3 AAAABBBBCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAAABBBBCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "乣": {
      "type": "Span11x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "11*3 AABBCCDDEEE通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBCCDDEEE",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "乤": {
      "type": "Span11x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "11*3 AABBCCDDDEE通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBCCDDDEE",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "乥": {
      "type": "Span11x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "11*3 AABBCCCDDEE通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBCCCDDEE",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "书": {
      "type": "Span11x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "11*3 AABBCCCDDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBCCCDDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "乧": {
      "type": "Span11x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "11*3 AABBCCCCDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBCCCCDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "乨": {
      "type": "Span11x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "11*3 AABBBCCDDEE通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBCCDDEE",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "乩": {
      "type": "Span11x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "11*3 AABBBCCDDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBCCDDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "乪": {
      "type": "Span11x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "11*3 AABBBCCCDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBCCCDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "乫": {
      "type": "Span11x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "11*3 AABBBCCCCDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBCCCCDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "乬": {
      "type": "Span11x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "11*3 AABBBBCCDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBBCCDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "乭": {
      "type": "Span11x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "11*3 AABBBBCCCDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBBCCCDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "乮": {
      "type": "Span11x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "11*3 AAABBCCDDEE通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBCCDDEE",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "乯": {
      "type": "Span11x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "11*3 AAABBCCDDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBCCDDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "买": {
      "type": "Span11x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "11*3 AAABBCCCDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBCCCDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "乱": {
      "type": "Span11x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "11*3 AAABBCCCCDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBCCCCDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "乲": {
      "type": "Span11x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "11*3 AAABBBCCDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBBCCDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "乳": {
      "type": "Span11x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "11*3 AAABBBCCCDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBBCCCDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "乴": {
      "type": "Span11x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "11*3 AAABBBBCCDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBBBCCDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "乵": {
      "type": "Span11x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "11*3 AAABBBBCCCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBBBCCCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "乶": {
      "type": "Span11x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "11*3 AAAABBCCDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAAABBCCDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "乷": {
      "type": "Span11x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "11*3 AAAABBCCCDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAAABBCCCDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "乸": {
      "type": "Span11x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "11*3 AAAABBBCCDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAAABBBCCDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "乹": {
      "type": "Span11x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "11*3 AAAABBBCCCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAAABBBCCCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "乺": {
      "type": "Span11x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "11*3 AAAABBBBCCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAAABBBBCCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "乻": {
      "type": "Span12x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*3 AABBCCDDEEFF通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBCCDDEEFF",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "乼": {
      "type": "Span12x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*3 AABBCCDDEEEE通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBCCDDEEEE",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "乽": {
      "type": "Span12x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*3 AABBCCDDDEEE通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBCCDDDEEE",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "乾": {
      "type": "Span12x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*3 AABBCCDDDDEE通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBCCDDDDEE",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "乿": {
      "type": "Span12x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*3 AABBCCCDDEEE通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBCCCDDEEE",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "亀": {
      "type": "Span12x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*3 AABBCCCDDDEE通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBCCCDDDEE",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "亁": {
      "type": "Span12x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*3 AABBCCCCDDEE通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBCCCCDDEE",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "亂": {
      "type": "Span12x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*3 AABBCCCCDDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBCCCCDDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "亃": {
      "type": "Span12x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*3 AABBBCCDDEEE通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBCCDDEEE",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "亄": {
      "type": "Span12x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*3 AABBBCCDDDEE通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBCCDDDEE",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "亅": {
      "type": "Span12x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*3 AABBBCCCDDEE通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBCCCDDEE",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "了": {
      "type": "Span12x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*3 AABBBCCCDDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBCCCDDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "亇": {
      "type": "Span12x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*3 AABBBCCCCDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBCCCCDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "予": {
      "type": "Span12x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*3 AABBBBCCDDEE通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBBCCDDEE",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "争": {
      "type": "Span12x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*3 AABBBBCCDDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBBCCDDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "亊": {
      "type": "Span12x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*3 AABBBBCCCDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBBCCCDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "事": {
      "type": "Span12x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*3 AABBBBCCCCDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBBCCCCDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "二": {
      "type": "Span12x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*3 AAABBCCDDEEE通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBCCDDEEE",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "亍": {
      "type": "Span12x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*3 AAABBCCDDDEE通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBCCDDDEE",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "于": {
      "type": "Span12x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*3 AAABBCCCDDEE通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBCCCDDEE",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "亏": {
      "type": "Span12x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*3 AAABBCCCDDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBCCCDDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "亐": {
      "type": "Span12x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*3 AAABBCCCCDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBCCCCDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "云": {
      "type": "Span12x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*3 AAABBBCCDDEE通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBBCCDDEE",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "互": {
      "type": "Span12x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*3 AAABBBCCDDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBBCCDDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "亓": {
      "type": "Span12x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*3 AAABBBCCCDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBBCCCDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "五": {
      "type": "Span12x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*3 AAABBBCCCCDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBBCCCCDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "井": {
      "type": "Span12x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*3 AAABBBBCCDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBBBCCDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "亖": {
      "type": "Span12x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*3 AAABBBBCCCDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBBBCCCDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "亗": {
      "type": "Span12x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*3 AAAABBCCDDEE通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAAABBCCDDEE",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "亘": {
      "type": "Span12x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*3 AAAABBCCDDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAAABBCCDDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "亙": {
      "type": "Span12x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*3 AAAABBCCCDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAAABBCCCDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "亚": {
      "type": "Span12x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*3 AAAABBCCCCDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAAABBCCCCDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "些": {
      "type": "Span12x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*3 AAAABBBCCDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAAABBBCCDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "亜": {
      "type": "Span12x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*3 AAAABBBCCCDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAAABBBCCCDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "亝": {
      "type": "Span12x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*3 AAAABBBBCCDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAAABBBBCCDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "亞": {
      "type": "Span12x03Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*3 AAAABBBBCCCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAAABBBBCCCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "亟": {
      "type": "Span04x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "4*4 AABB通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABB",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "亠": {
      "type": "Span04x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "4*4 AAAA通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAAA",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "亡": {
      "type": "Span05x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "5*4 AABBB通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBB",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "亢": {
      "type": "Span05x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "5*4 AAABB通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABB",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "亣": {
      "type": "Span06x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "6*4 AABBCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "交": {
      "type": "Span06x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "6*4 AAABBB通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBB",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "亥": {
      "type": "Span06x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "6*4 AABBBB通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBB",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "亦": {
      "type": "Span06x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "6*4 BBBBAA通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "BBBBAA",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "产": {
      "type": "Span07x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "7*4 AABBCCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBCCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "亨": {
      "type": "Span07x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "7*4 AAABBBB通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBBB",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "亩": {
      "type": "Span07x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "7*4 AABBBCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "亪": {
      "type": "Span07x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "7*4 AAAABBB通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAAABBB",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "享": {
      "type": "Span07x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "7*4 AAABBCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "京": {
      "type": "Span08x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "8*4 AABBCCDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBCCDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "亭": {
      "type": "Span08x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "8*4 AABBCCCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBCCCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "亮": {
      "type": "Span08x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "8*4 AABBBCCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBCCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "亯": {
      "type": "Span08x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "8*4 AABBBBCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBBCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "亰": {
      "type": "Span08x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "8*4 AAABBCCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBCCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "亱": {
      "type": "Span08x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "8*4 AAABBBCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBBCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "亲": {
      "type": "Span08x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "8*4 AAAABBCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAAABBCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "亳": {
      "type": "Span08x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "8*4 AAAABBBB通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAAABBBB",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "亴": {
      "type": "Span09x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "9*4 AABBCCDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBCCDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "亵": {
      "type": "Span09x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "9*4 AABBCCCDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBCCCDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "亶": {
      "type": "Span09x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "9*4 AABBBCCDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBCCDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "亷": {
      "type": "Span09x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "9*4 AABBBCCCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBCCCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "亸": {
      "type": "Span09x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "9*4 AABBBBCCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBBCCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "亹": {
      "type": "Span09x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "9*4 AAABBCCDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBCCDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "人": {
      "type": "Span09x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "9*4 AAABBCCCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBCCCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "亻": {
      "type": "Span09x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "9*4 AAABBBCCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBBCCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "亼": {
      "type": "Span09x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "9*4 AAABBBBCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBBBCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "亽": {
      "type": "Span09x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "9*4 AAAABBCCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAAABBCCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "亾": {
      "type": "Span09x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "9*4 AAAABBBCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAAABBBCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "亿": {
      "type": "Span10x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "10*4 AABBCCDDEE通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBCCDDEE",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "什": {
      "type": "Span10x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "10*4 AABBCCDDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBCCDDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "仁": {
      "type": "Span10x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "10*4 AABBCCCDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBCCCDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "仂": {
      "type": "Span10x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "10*4 AABBCCCCDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBCCCCDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "仃": {
      "type": "Span10x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "10*4 AABBBCCDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBCCDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "仄": {
      "type": "Span10x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "10*4 AABBBCCCDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBCCCDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "仅": {
      "type": "Span10x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "10*4 AABBBBCCDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBBCCDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "仆": {
      "type": "Span10x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "10*4 AABBBBCCCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBBCCCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "仇": {
      "type": "Span10x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "10*4 AAABBCCDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBCCDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "仈": {
      "type": "Span10x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "10*4 AAABBCCCDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBCCCDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "仉": {
      "type": "Span10x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "10*4 AAABBBCCDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBBCCDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "今": {
      "type": "Span10x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "10*4 AAABBBCCCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBBCCCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "介": {
      "type": "Span10x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "10*4 AAABBBBCCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBBBCCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "仌": {
      "type": "Span10x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "10*4 AAAABBCCDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAAABBCCDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "仍": {
      "type": "Span10x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "10*4 AAAABBCCCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAAABBCCCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "从": {
      "type": "Span10x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "10*4 AAAABBBCCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAAABBBCCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "仏": {
      "type": "Span10x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "10*4 AAAABBBBCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAAABBBBCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "仐": {
      "type": "Span11x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "11*4 AABBCCDDEEE通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBCCDDEEE",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "仑": {
      "type": "Span11x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "11*4 AABBCCDDDEE通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBCCDDDEE",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "仒": {
      "type": "Span11x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "11*4 AABBCCCDDEE通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBCCCDDEE",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "仓": {
      "type": "Span11x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "11*4 AABBCCCDDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBCCCDDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "仔": {
      "type": "Span11x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "11*4 AABBCCCCDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBCCCCDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "仕": {
      "type": "Span11x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "11*4 AABBBCCDDEE通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBCCDDEE",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "他": {
      "type": "Span11x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "11*4 AABBBCCDDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBCCDDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "仗": {
      "type": "Span11x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "11*4 AABBBCCCDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBCCCDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "付": {
      "type": "Span11x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "11*4 AABBBCCCCDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBCCCCDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "仙": {
      "type": "Span11x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "11*4 AABBBBCCDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBBCCDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "仚": {
      "type": "Span11x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "11*4 AABBBBCCCDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBBCCCDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "仛": {
      "type": "Span11x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "11*4 AAABBCCDDEE通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBCCDDEE",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "仜": {
      "type": "Span11x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "11*4 AAABBCCDDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBCCDDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "仝": {
      "type": "Span11x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "11*4 AAABBCCCDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBCCCDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "仞": {
      "type": "Span11x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "11*4 AAABBCCCCDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBCCCCDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "仟": {
      "type": "Span11x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "11*4 AAABBBCCDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBBCCDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "仠": {
      "type": "Span11x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "11*4 AAABBBCCCDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBBCCCDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "仡": {
      "type": "Span11x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "11*4 AAABBBBCCDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBBBCCDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "仢": {
      "type": "Span11x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "11*4 AAABBBBCCCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBBBCCCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "代": {
      "type": "Span11x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "11*4 AAAABBCCDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAAABBCCDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "令": {
      "type": "Span11x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "11*4 AAAABBCCCDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAAABBCCCDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "以": {
      "type": "Span11x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "11*4 AAAABBBCCDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAAABBBCCDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "仦": {
      "type": "Span11x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "11*4 AAAABBBCCCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAAABBBCCCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "仧": {
      "type": "Span11x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "11*4 AAAABBBBCCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAAABBBBCCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "仨": {
      "type": "Span12x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*4 AABBCCDDEEFF通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBCCDDEEFF",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "仩": {
      "type": "Span12x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*4 AABBCCDDEEEE通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBCCDDEEEE",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "仪": {
      "type": "Span12x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*4 AABBCCDDDEEE通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBCCDDDEEE",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "仫": {
      "type": "Span12x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*4 AABBCCDDDDEE通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBCCDDDDEE",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "们": {
      "type": "Span12x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*4 AABBCCCDDEEE通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBCCCDDEEE",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "仭": {
      "type": "Span12x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*4 AABBCCCDDDEE通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBCCCDDDEE",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "仮": {
      "type": "Span12x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*4 AABBCCCCDDEE通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBCCCCDDEE",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "仯": {
      "type": "Span12x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*4 AABBCCCCDDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBCCCCDDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "仰": {
      "type": "Span12x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*4 AABBBCCDDEEE通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBCCDDEEE",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "仱": {
      "type": "Span12x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*4 AABBBCCDDDEE通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBCCDDDEE",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "仲": {
      "type": "Span12x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*4 AABBBCCCDDEE通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBCCCDDEE",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "仳": {
      "type": "Span12x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*4 AABBBCCCDDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBCCCDDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "仴": {
      "type": "Span12x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*4 AABBBCCCCDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBCCCCDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "仵": {
      "type": "Span12x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*4 AABBBBCCDDEE通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBBCCDDEE",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "件": {
      "type": "Span12x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*4 AABBBBCCDDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBBCCDDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "价": {
      "type": "Span12x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*4 AABBBBCCCDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBBCCCDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "仸": {
      "type": "Span12x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*4 AABBBBCCCCDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AABBBBCCCCDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "仹": {
      "type": "Span12x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*4 AAABBCCDDEEE通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBCCDDEEE",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "仺": {
      "type": "Span12x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*4 AAABBCCDDDEE通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBCCDDDEE",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "任": {
      "type": "Span12x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*4 AAABBCCCDDEE通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBCCCDDEE",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "仼": {
      "type": "Span12x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*4 AAABBCCCDDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBCCCDDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "份": {
      "type": "Span12x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*4 AAABBCCCCDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBCCCCDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "仾": {
      "type": "Span12x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*4 AAABBBCCDDEE通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBBCCDDEE",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "仿": {
      "type": "Span12x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*4 AAABBBCCDDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBBCCDDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "伀": {
      "type": "Span12x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*4 AAABBBCCCDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBBCCCDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "企": {
      "type": "Span12x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*4 AAABBBCCCCDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBBCCCCDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "伂": {
      "type": "Span12x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*4 AAABBBBCCDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBBBCCDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "伃": {
      "type": "Span12x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*4 AAABBBBCCCDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAABBBBCCCDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "伄": {
      "type": "Span12x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*4 AAAABBCCDDEE通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAAABBCCDDEE",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "伅": {
      "type": "Span12x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*4 AAAABBCCDDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAAABBCCDDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "伆": {
      "type": "Span12x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*4 AAAABBCCCDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAAABBCCCDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "伇": {
      "type": "Span12x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*4 AAAABBCCCCDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAAABBCCCCDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "伈": {
      "type": "Span12x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*4 AAAABBBCCDDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAAABBBCCDDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "伉": {
      "type": "Span12x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*4 AAAABBBCCCDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAAABBBCCCDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "伊": {
      "type": "Span12x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*4 AAAABBBBCCDD通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAAABBBBCCDD",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    },
    "伋": {
      "type": "Span12x04Layout",
      "visualType": "other",
      "dataPolicy": "static",
      "displayTitle": "标题区",
      "titlePills": [
        {
          "id": "capsule",
          "label": "胶囊按钮区"
        }
      ],
      "auxMetrics": [
        {
          "label": "辅助信息区（指标）"
        },
        {
          "label": "辅助信息区（单位）"
        }
      ],
      "bodySummary": "说明区（说明、结论）",
      "props": {
        "title": "12*4 AAAABBBBCCCC通用模板",
        "note": "通用模板占位结构",
        "placeholder": "组件区域",
        "zonePatternLabel": "",
        "componentRegionPattern": "AAAABBBBCCCC",
        "showChrome": false,
        "showFooter": false,
        "secondary": "auto",
        "density": "auto"
      }
    }
  }
};
