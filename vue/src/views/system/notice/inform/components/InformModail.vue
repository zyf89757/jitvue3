<template>
  <div>
    <BasicModal
      v-bind="$attrs"
      title="通知公告详情"
      :helpMessage="['提示1', '提示2']"
      width="700px"
      class="head"

    >
      <div class="headiv">
        <p class="title">标题:{{ scouce?.title }}</p>
        <p class="sa">(发布时间:{{ scouce?.publicTime }})</p>
        <p class="sa">(发布人:{{ scouce?.publicUserName }})</p>
      </div>
      <div class="body">
        <p class="title">内容:{{ scouce?.content }}</p>
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
    noticeScouce: {
      type: Object
    }
  });
  const val = ref('');
  const scouce = ref();
  val.value = '1';
  function scoure() {
    scouce.value = props.noticeScouce;
  }

  watchEffect(() => {
    scoure();
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
    border-bottom: 1px solid lightgrey;
    height: 80px;
  }
</style>
