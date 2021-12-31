<template>
  <div :class="[prefixCls, { left_border: showLeftBorder }]">
    <CollapseTransition :enable="canExpan" class="pl-1.5 pr-2 pt-1 pb-0">
      <Skeleton v-if="loading" :active="loading" />
      <div :class="`${prefixCls}__body`" v-else v-show="show">
        <slot></slot>
      </div>
    </CollapseTransition>
  </div>
</template>
<script lang="ts">
  import type { PropType } from 'vue';
  import { defineComponent, ref } from 'vue';
  // component
  import { Skeleton } from 'ant-design-vue';
  import { SearchOutlined } from '@ant-design/icons-vue';
  import { CollapseTransition } from '/@/components/Transition';
  import { triggerWindowResize } from '/@/utils/event';
  // hook
  import { useTimeoutFn } from '/@/hooks/core/useTimeout';
  import { useDesign } from '/@/hooks/web/useDesign';

  const props = {
    showLeftBorder: { type: Boolean, default: true },
    title: { type: String, default: '' },
    loading: { type: Boolean },
    /**
     *  Can it be expanded
     */
    canExpan: { type: Boolean, default: true },
    /**
     * Warm reminder on the right side of the title
     */
    helpMessage: {
      type: [Array, String] as PropType<string[] | string>,
      default: '',
    },
    /**
     * Whether to trigger window.resize when expanding and contracting,
     * Can adapt to tables and forms, when the form shrinks, the form triggers resize to adapt to the height
     */
    triggerWindowResize: { type: Boolean },
    /**
     * Delayed loading time
     */
    lazyTime: { type: Number, default: 0 },
  };

  export default defineComponent({
    name: 'CollapseContainer',
    components: {
      Skeleton,
      CollapseTransition,
      SearchOutlined,
    },
    props,
    setup(props) {
      const show = ref(true);

      const { prefixCls } = useDesign('eztoolbar-collapse-container');

      /**
       * @description: Handling development events
       */
      function handleExpand() {
        show.value = !show.value;
        if (props.triggerWindowResize) {
          // 200 milliseconds here is because the expansion has animation,
          useTimeoutFn(triggerWindowResize, 200);
        }
      }

      return {
        show,
        handleExpand,
        prefixCls,
      };
    },
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-eztoolbar-collapse-container';

  .left_border {
    border-left: 2px solid @primary-color;
  }

  .@{prefix-cls} {
    background-color: @component-background;
    border-radius: 2px;
    transition: all 0.3s ease-in-out;

    &__header {
      display: flex;
      height: 32px;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid @border-color-light;
    }

    &__footer {
      border-top: 1px solid @border-color-light;
    }

    &__action {
      display: flex;
      text-align: right;
      flex: 1;
      align-items: center;
      justify-content: flex-end;
    }
  }
</style>
