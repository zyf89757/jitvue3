<template>
  <a-col v-bind="actionColOpt" v-if="showActionButtonGroup">
    <div style="width: 100%" :style="{ textAlign: actionColOpt.style.textAlign }">
      <FormItem>
        <slot name="resetBefore"></slot>
        <Button
          type="default"
          class="mr-2"
          v-bind="getResetBtnOptions"
          @mousedown="resetAction"
          @keydown.enter="onKeyDown"
          v-if="showResetButton"
        >
          {{ getResetBtnOptions.text }}
        </Button>
        <slot name="submitBefore"></slot>

        <Button
          type="primary"
          class="mr-2"
          v-bind="getSubmitBtnOptions"
          @click="submitAction"
          @focus.once="submitAction"
          @keydown.enter="onKeyDown"
          v-if="showSubmitButton"
        >
          {{ getSubmitBtnOptions.text }}
        </Button>

        <slot name="advanceBefore"></slot>
        <Button
          type="link"
          size="small"
          @mousedown="toggleAdvanced"
          @keyup.enter="onKeyDown"
          v-if="showAdvancedButton && !hideAdvanceBtn"
        >
          {{ isAdvanced ? t('component.form.putAway') : t('component.form.unfold') }}
          <BasicArrow class="ml-1" :expand="!isAdvanced" up />
        </Button>
        <slot name="advanceAfter"></slot>
      </FormItem>
    </div>
  </a-col>
</template>
<script lang="ts">
  import type { ColEx } from '../types/index';
  //import type { ButtonProps } from 'ant-design-vue/es/button/buttonTypes';
  import { defineComponent, computed, PropType } from 'vue';
  import { Form, Col } from 'ant-design-vue';
  import { Button, ButtonProps } from '/@/components/Button';
  import { BasicArrow } from '/@/components/Basic';
  import { useFormContext } from '../hooks/useFormContext';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { propTypes } from '/@/utils/propTypes';

  type ButtonOptions = Partial<ButtonProps> & { text: string };

  export default defineComponent({
    name: 'BasicFormAction',
    components: {
      FormItem: Form.Item,
      Button,
      BasicArrow,
      [Col.name]: Col
    },
    props: {
      showActionButtonGroup: propTypes.bool.def(true),
      showResetButton: propTypes.bool.def(true),
      showSubmitButton: propTypes.bool.def(true),
      showAdvancedButton: propTypes.bool.def(true),
      resetButtonOptions: {
        type: Object as PropType<ButtonOptions>,
        default: () => ({})
      },
      submitButtonOptions: {
        type: Object as PropType<ButtonOptions>,
        default: () => ({})
      },
      actionColOptions: {
        type: Object as PropType<Partial<ColEx>>,
        default: () => ({})
      },
      actionSpan: propTypes.number.def(6),
      isAdvanced: propTypes.bool,
      hideAdvanceBtn: propTypes.bool
    },
    emits: ['toggle-advanced'],
    setup(props, { emit }) {
      const { t } = useI18n();

      const actionColOpt = computed(() => {
        const { showAdvancedButton, actionSpan: span, actionColOptions } = props;
        const actionSpan = 24 - span;
        const advancedSpanObj = showAdvancedButton
          ? { span: actionSpan < 6 ? 24 : actionSpan }
          : {};
        const actionColOpt: Partial<ColEx> = {
          style: { textAlign: 'right' },
          span: showAdvancedButton ? 6 : 4,
          ...advancedSpanObj,
          ...actionColOptions
        };
        return actionColOpt;
      });

      const getResetBtnOptions = computed((): ButtonOptions => {
        return Object.assign(
          {
            text: t('common.resetText')
          },
          props.resetButtonOptions
        );
      });

      const getSubmitBtnOptions = computed(() => {
        return Object.assign(
          {
            text: t('common.queryText')
          },
          props.submitButtonOptions
        );
      });

      function toggleAdvanced() {
        emit('toggle-advanced');
      }

      function onKeyDown(e: any) {
        // if (e.key === 'Enter' && e.target && e.target instanceof HTMLElement) {
        //   const target = e.target;
        //   let tempList = target.form;
        //   const srcEl = e.srcElement;
        //   for (var i = 0; i < tempList.length; i++) {
        //     if (tempList[i] == srcEl) {
        //       if (tempList[i + 1]) {
        //         tempList[i + 1].focus();
        //       } else {
        //         i = 0;
        //         tempList[i].focus();
        //       }
        //       break;
        //     }
        //   }
        // }
      }

      return {
        t,
        actionColOpt,
        getResetBtnOptions,
        getSubmitBtnOptions,
        toggleAdvanced,
        onKeyDown,
        ...useFormContext()
      };
    }
  });
</script>
