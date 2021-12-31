<template>
  <DxDropDownButton
    :items="items"
    text=""
    class="ddd-more"
    :drop-down-options="{ width: 80 }"
    @item-click="onItemClick"
  />
</template>

<script>
  import { defineComponent } from 'vue';
  import { DxDropDownButton } from 'devextreme-vue/drop-down-button';

  export default defineComponent({
    name: 'EzMore',
    components: {
      DxDropDownButton,
    },
    props: {
      items: {
        type: Array,
        default: () => {
          return [];
        },
      },
      onItemClick: {
        type: Function,
        default: null,
      },
    },
  });
</script>

<style lang="less">
  html[data-theme='light'] .ddd-more,
  html[data-theme='dark'] .ddd-more {
    .dx-button,
    .dx-button-content,
    .dx-button-has-text .dx-button-content {
      border: none;
      border-radius: 2px;
      padding: 0;
    }

    .dx-button-has-text {
      .dx-button-content {
        border: none;
        border-radius: 2px;
        padding: 0;
      }
    }

    .dx-dropdownbutton-action.dx-buttongroup-last-item.dx-button {
      .dx-button-content {
        border: none;
        border-radius: 2px;
        padding: 0;
      }
    }
  }
</style>
