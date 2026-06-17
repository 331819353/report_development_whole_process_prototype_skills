# 06j Component Mapping KPI And Time Fields

Load this file for `kpiEvidenceBinding`, `timePatternEvidenceBinding`, update triggers, layout spans, empty state, and validation cases. Compose it with `06h` and `06i` for the full `ComponentMapping` contract.

```ts
type ComponentMappingKpiAndTimeFields = {
  kpiEvidenceBinding?: {
    overview?: {
      overviewTopic: string;
      overviewPattern: KpiOverviewCardPattern;
      leadMetricId?: string;
      metrics: KpiOverviewMetricBinding[];
      visibleMetricLimit: number;
      localControlId?: string;
      localControlType?:
        | 'period-segmented'
        | 'period-dropdown'
        | 'metric-segmented'
        | 'unit-scale-segmented'
        | 'overflow-menu';
      localControlOptions?: string[];
      selectedControlField?: string;
      exactValuePayload: string[];
      detailRoute?: string;
    };
    singleIndicator?: {
      evidenceVisual: 'sparkline' | 'mini-bars' | 'ring' | 'area-sparkline' | 'semi-gauge';
      trendDatasetId?: string;
      trendCategoryField?: string;
      trendValueField?: string;
      latestPointField?: string;
      targetField?: string;
      attainmentRateField?: string;
      progressTrackField?: string;
      localControlId?: string;
      localControlType?: 'period-dropdown' | 'grain-segmented' | 'unit-toggle' | 'scale-toggle';
      localControlOptions?: string[];
      selectedControlField?: string;
      exactValuePayload: string[];
    };
    judgment?: {
      judgmentPattern: KpiJudgmentCardPattern;
      judgmentKind: 'status' | 'health' | 'rating' | 'score' | 'gauge' | 'risk' | 'progress';
      statusField?: string;
      scoreField?: string;
      scoreRange?: [number, number];
      levelField?: string;
      bands?: KpiJudgmentBandBinding[];
      thresholdFields?: string[];
      direction: 'higher-better' | 'lower-better' | 'range-target' | 'status-enum';
      heroVisual:
        | 'semantic-icon'
        | 'ring'
        | 'semi-gauge'
        | 'bullet-range'
        | 'dimension-bars'
        | 'rating-stars'
        | 'rating-distribution';
      dimensionDatasetId?: string;
      dimensionNameField?: string;
      dimensionScoreField?: string;
      ratingDistributionFields?: string[];
      comparisonStripFields?: string[];
      footerEvidenceFields: string[];
      exactValuePayload: string[];
    };
    goalExecution?: {
      goalPattern: KpiGoalExecutionCardPattern;
      goalExecutionKind: 'attainment' | 'gap' | 'progress' | 'milestone';
      direction: 'higher-better' | 'lower-better' | 'range-target' | 'schedule-target';
      actualField?: string;
      targetField?: string;
      attainmentRateField?: string;
      gapField?: string;
      gapRateField?: string;
      remainingField?: string;
      deadlineField?: string;
      dueStatusField?: string;
      planProgressField?: string;
      actualProgressField?: string;
      progressDeltaField?: string;
      remainingTimeField?: string;
      milestone?: KpiGoalMilestoneBinding;
      heroVisual:
        | 'ring'
        | 'semi-gauge'
        | 'linear-progress'
        | 'target-actual-bars'
        | 'dot-strip'
        | 'stepper'
        | 'timeline'
        | 'cumulative-line';
      comparisonStripFields?: string[];
      footerEvidenceFields: string[];
      exactValuePayload: string[];
    };
    timeSeries?: {
      timeSeriesPattern: KpiTimeSeriesCardPattern;
      temporalAnalysisKind: 'trend' | 'change' | 'yoy-mom' | 'cycle' | 'volatility' | 'forecast';
      direction: 'higher-better' | 'lower-better' | 'range-target' | 'neutral';
      datasetId: string;
      xField: string;
      yField: string;
      grainField?: string;
      latestPeriodField: string;
      tooltipPayload: string[];
      baselineLabelField?: string;
      baselineValueField?: string;
      deltaValueField?: string;
      deltaRateField?: string;
      yoyValueField?: string;
      yoyRateField?: string;
      momValueField?: string;
      momRateField?: string;
      priorYearComparableValueField?: string;
      priorPeriodValueField?: string;
      cycle?: {
        grainField: string;
        periodStartField: string;
        periodEndField: string;
        currentIndexField: string;
        totalCountField: string;
        progressField?: string;
        phaseStatusField?: string;
      };
      volatility?: {
        formula: string;
        volatilityRateField: string;
        levelField: string;
        maxField?: string;
        minField?: string;
        stdDevField?: string;
        thresholdBandFields?: string[];
      };
      forecast?: {
        forecastDatasetId: string;
        forecastStartField: string;
        forecastEndField?: string;
        horizonField?: string;
        forecastValueField: string;
        lowerBoundField?: string;
        upperBoundField?: string;
        forecastStatusField?: string;
      };
      footerEvidenceFields: string[];
      exactValuePayload: string[];
    };
    scatter?: {
      datasetId: string;
      objectIdField: string;
      objectNameField: string;
      xField: string;
      yField: string;
      xUnit: string;
      yUnit: string;
      sizeField?: string;
      colorField?: string;
      trendlineField?: string;
      referenceFields?: string[];
      thresholdFields?: string[];
      quadrantFields?: string[];
      pointLimit?: number;
    };
    map?: {
      datasetId: string;
      regionCodeField?: string;
      regionNameField?: string;
      valueField: string;
      visualMapField?: string;
      pointDatasetId?: string;
      lonField?: string;
      latField?: string;
      pointValueField?: string;
      categoryField?: string;
      projection: string;
      mapResource: string;
      legendFields?: string[];
      missingGeoPolicy: string;
    };
    comparison?: {
      leftPaneFields: string[];
      rightPaneFields: string[];
      baselineLabels: string[];
      valueFields: string[];
      deltaField?: string;
      gapField?: string;
      conclusionField: string;
      sharedUnit: string;
      sharedGrain: string;
    };
    comparisonAnalysis?: {
      comparisonPattern: KpiComparisonAnalysisCardPattern;
      comparisonAnalysisKind: 'direct' | 'group' | 'competitor' | 'benchmark' | 'variance';
      evidenceMode: KpiComparisonAnalysisEvidenceMode;
      direction: 'higher-better' | 'lower-better' | 'range-target' | 'neutral';
      datasetId: string;
      subjectIdField?: string;
      subjectNameField: string;
      subjectRoleField?: string;
      groupField?: string;
      competitorField?: string;
      metricField: string;
      metricNameField?: string;
      unit: string;
      grainField?: string;
      periodField?: string;
      filterScopeField?: string;
      currentValueField: string;
      comparisonValueField?: string;
      deltaValueField?: string;
      deltaRateField?: string;
      rankField?: string;
      shareField?: string;
      marketTotalField?: string;
      benchmarkSourceField?: string;
      benchmarkValueField?: string;
      benchmarkP50Field?: string;
      benchmarkP75Field?: string;
      benchmarkP90Field?: string;
      varianceFormula?: string;
      varianceValueField?: string;
      varianceRateField?: string;
      attainmentRateField?: string;
      normalizedScoreField?: string;
      seriesDatasetId?: string;
      xField?: string;
      yField?: string;
      seriesField?: string;
      radarDimensionField?: string;
      radarScoreField?: string;
      sortRule?: string;
      visibleSubjectLimit?: number;
      tooltipPayload: string[];
      footerEvidenceFields: string[];
      exactValuePayload: string[];
    };
  };
  timePatternEvidenceBinding?: {
    pattern: TimePatternCardPattern;
    datasetId: string;
    calendarSystem?: 'gregorian' | 'fiscal' | 'retail-445' | 'project-defined';
    timezone?: string;
    periodStartField: string;
    periodEndField?: string;
    grain: 'hour' | 'day' | 'week' | 'month' | 'quarter' | 'year' | 'custom';
    metricId: string;
    metricName: string;
    valueField: string;
    unit: string;
    aggregation: 'sum' | 'count' | 'avg' | 'max' | 'min' | 'rate' | 'custom';
    numericFormatContractId: string;
    tooltipPayload: string[];
    exactValueRoute?: string;
    sourceDataset?: string;
    freshnessField?: string;
    missingValuePolicy: string;
    zeroValuePolicy: string;
    dateField?: string;
    weekdayField?: string;
    monthField?: string;
    timeSlotField?: string;
    slotOrderField?: string;
    rowTimeField?: string;
    columnTimeField?: string;
    sampleCountField?: string;
    selectedDateField?: string;
    cellStatusField?: string;
    eventIdField?: string;
    eventNameField?: string;
    startDateTimeField?: string;
    endDateTimeField?: string;
    laneField?: string;
    statusField?: string;
    seriesNameField?: string;
    seriesRoleField?: string;
    baselineValueField?: string;
    cumulativeValueField?: string;
    targetCumulativeField?: string;
    expectedCurveField?: string;
    peakValueField?: string;
    peakTimeField?: string;
    valleyValueField?: string;
    valleyTimeField?: string;
    spreadField?: string;
    spreadRateField?: string;
    thresholdField?: string;
    volatilityField?: string;
    forecastValueField?: string;
    forecastTimeField?: string;
    forecastStartField?: string;
    lowerBoundField?: string;
    upperBoundField?: string;
    warningStatusField?: string;
    densityLimit: string;
    localControlIds?: string[];
    responsiveFallback: string[];
  };
  updateTriggers: string[];
  parentLayoutSpan?: string;
  subBlockLayout?: string;
  layoutSpan: string;
  emptyState: string;
  validationCases: string[];
};
```
