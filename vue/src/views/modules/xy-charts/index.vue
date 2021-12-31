<template>
  <div>
    <PageWrapper>
      <EzSearch>
        <BasicForm @register="register" @submit="handleSubmit1" />
      </EzSearch>
      <Chart :options="chartOptionsxy" :callback="myCallback" />
      <Chart :options="chartOptionsds" :callback="myCallback" />
    </PageWrapper>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({ name: 'DecChart' });
</script>
<script lang="ts" setup>
  import { BasicForm, useForm } from '/@/components/EzControls/EzSearchForm/index';
  import { EzSearch } from '/@/components/EzControls/EzSearch';
  import { PageWrapper } from '/@/components/EzControls/EzPage';
  import { Chart } from 'highcharts-vue';
  import { getOptions } from './chart';
  import { ref } from 'vue';
  import { searchSchemas } from './search.data';
  import { useAppStore } from '/@/store/modules/app';
  import { defHttp } from '/@/utils/http/axios';
  const appSize = useAppStore().getAppSize;

  const [register] = useForm({
    labelWidth: 130,
    schemas: searchSchemas,
    actionColOptions: {
      span: 24
    },
    compact: true,
    size: appSize.toString() == 'small' ? 'small' : 'default',
    showAdvancedButton: true,
    alwaysShowLines: 1
  });

  enum Api {
    UPDATE_CHART = '/api/data/dec/update-chart'
  }

  async function handleSubmit1(values: any) {
    debugger;
    var searchDate = new Date(values.year, 2, 2);
    const result = await defHttp.post(
      { url: Api.UPDATE_CHART, params: { year: searchDate } },
      { isTransformResponse: false }
    );
    if (result && result.code == 200) {
      xyData.value[0].data = result.data.xy[0];
      xyData.value[1].data = result.data.xy[1];
      xyData.value[2].data = result.data.xy[2];
      xyData.value[3].data = result.data.xy[3];
      xyData.value[4].data = result.data.xy[4];
      xyData.value[5].data = result.data.xy[5];

      dsData.value[0].data = result.data.ds[0];
      dsData.value[1].data = result.data.ds[1];
      dsData.value[2].data = result.data.ds[2];
      dsData.value[3].data = result.data.ds[3];
      dsData.value[4].data = result.data.ds[4];
      dsData.value[5].data = result.data.ds[5];
    }
  }

  function myCallback() {
    console.log('this is callback function');
  }

  const xyData = ref(<any>[]);
  const dsData = ref(<any>[]);
  xyData.value = [
    {
      name: '缺失详情',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      stack: 'xy-d',
      color: '#6e0302'
    },
    {
      name: '已获取详情',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      stack: 'xy-d'
    },
    {
      name: '缺失回执',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      stack: 'xy-r',
      color: '#8e0302'
    },
    {
      name: '已获取回执',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      stack: 'xy-r'
    },
    {
      name: '缺失单证',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      stack: 'xy-w',
      color: '#6e0302'
    },
    {
      name: '已获取单证',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      stack: 'xy-w'
    },
    {
      type: 'pie',
      name: '缺失原因',
      data: [
        {
          name: '小张',
          y: 13
        },
        {
          name: '小潘',
          y: 23
        },
        {
          name: '小王',
          y: 19
        }
      ],
      center: [100, 80],
      size: 100,
      showInLegend: false,
      dataLabels: {
        enabled: false
      }
    }
  ];

  dsData.value = [
    {
      name: '缺失详情',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      stack: 'ds-d',
      color: '#3e0302'
    },
    {
      name: '已获取详情',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      stack: 'ds-d'
    },
    {
      name: '缺失回执',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      stack: 'ds-r',
      color: '#3e0302'
    },
    {
      name: '已获取回执',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      stack: 'ds-r'
    },
    {
      name: '缺失单证',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      stack: 'ds-w',
      color: '#6e0302'
    },
    {
      name: '已获取单证',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      stack: 'ds-w'
    }
  ];

  const chartOptionsxy = getOptions('兴亚数据完整性统计', '----2021年度', xyData.value);

  const chartOptionsds = getOptions('丹砂数据完整性统计', '----2021年度', dsData.value);
</script>
<style lang="less" scoped></style>
