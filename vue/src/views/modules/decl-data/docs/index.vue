<template>
  <div>
    <div v-html="htmlData"></div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({ name: 'DocsList' });
</script>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { getHtmlData } from './data';

  const htmlData = ref({});
  const cusCiqNo = ref({});
  const route = useRoute();
  htmlData.value = '<div>暂无数据</div>';

  function loadDataSource() {
    getData();
  }

  async function getData() {
    cusCiqNo.value = route.params?.id ?? '';
    if (cusCiqNo.value != null && cusCiqNo.value != '') {
      const result = await getHtmlData({ cusCiqNo: cusCiqNo.value });
      htmlData.value = result.data == '' ? '<div>暂无数据</div>' : result.data;
    }
    // document.getElementById('htmlApp')?.innerHTML(htmlData.value.toString());
    // document.getElementById('htmlApp')?.innerHTML = htmlData.value;
    // document.getElementById('htmlApp')?.setAttribute('innerHTML', htmlData.value.toString());
  }

  loadDataSource();
</script>
<style lang="less">
  @import './docs.css';
</style>
