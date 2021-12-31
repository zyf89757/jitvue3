<template>
  <div class="file-preview" id="EzFilePreview" v-if="show">
    <div @click="handleClose">
      <CloseOutlined class="close-icon" />
    </div>
    <iframe :src="props.src" :type="type" class="file-preview-content" id="file-preview"></iframe>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  export default defineComponent({
    name: 'EzFilePreview'
  });
</script>

<script lang="ts" setup>
  import { CloseOutlined } from '@ant-design/icons-vue';
  const show = ref(true);
  const props = defineProps({
    src: { default: '', type: String },
    type: { default: '', type: String }
  });
  function handleClose() {
    show.value = false;
  }
</script>

<style lang="less">
  #filePreview {
    position: absolute;
    z-index: 100000000;
    background-color: pink;
    top: 20px;
    bottom: 0;
    left: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
  }
  .file-preview {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: @preview-comp-z-index;
    background: rgba(0, 0, 0, 0.5);
    user-select: none;

    &-content {
      /* display: flex; */
      top: 60px;
      width: 100%;
      height: 100%;
      color: #fff;
      text-align: center;
      margin: 0 auto;
      position: relative;
    }
    body {
      text-align: center;
    }
    .close-icon {
      color: #fff;
      float: right;
      top: 20px;
      position: absolute;
      right: 20px;
      font-size: 20px;
      cursor: pointer;
    }
  }
</style>
