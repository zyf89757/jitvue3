<template>
  <div>
    <BasicModal
      v-bind="$attrs"
      title="短信详情"
      :helpMessage="['提示1', '提示2']"
      width="700px"
      class="head"
    >
      <div class="headiv">
        <p class="title">短信类型:{{ scouce?.title }}</p>
        <p class="title">应用名称:{{ scouce?.module }}</p>
        <p class="title">短信模板:{{ scouce?.template }}</p>
        <p class="title">手机号:{{ scouce?.phoneNum }}</p>
        <p class="title">内容:{{ scouce?.content }}</p>
        <p class="sa">(发送时间:{{ scouce?.lbyTime }})</p>
        <p class="sa">(状态:{{ scouce?.requestStaus ? '成功' : '失败' }})</p>
        <p class="sa">(发布人:{{ scouce?.userId }})</p>
      </div>
    </BasicModal>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    components: { BasicModal }
  });
</script>
<script lang="ts" setup>
  import { BasicModal } from '/@/components/Modal';
  import { watchEffect, ref } from 'vue';
  const props = defineProps({
    detailScoure: {
      type: Object
    }
  });
  const scouce = ref();

  function scoures() {
    scouce.value = props.detailScoure;
  }

  watchEffect(() => {
    scoures();
  });
</script>
<style>
  .title {
    font-size: 20px;
    margin-left: 20px;
  }

  .sa {
    display: inline;
    float: right;
    margin-left: 30px;
  }

  .headiv {
    height: 80px;
  }
</style>
