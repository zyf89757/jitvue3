<template>
  <div class="details-wrapper">
    <CollapseContainer :title="title">
      <EzToolBar class="ez-details-toolbar">
        <div style="position: relative">
          <div class="ez-toolbar-left">
            <div class="ant-btn-group">
              <div v-if="toolbarLeft && toolbarLeft.length > 0">
                <template v-for="item in toolbarLeft" :key="item.name">
                  <a-button
                    v-if="
                      checked(item.auth) &&
                      allowVisibled(item.visibled, ActiveKey) &&
                      item.type !== 'Upload'
                    "
                    :size="AppSize"
                    @click="toolbarClick(item, ActiveKey)"
                    :type="item.type"
                    :disabled="handelDisabled(item.enabled, ActiveKey)"
                    :color="item.color || ''"
                  >
                    {{ item.title }}
                  </a-button>
                  <BasicUpload
                    v-if="
                      checked(item.auth) &&
                      allowVisibled(item.visibled, ActiveKey) &&
                      item.type == 'Upload'
                    "
                    :btnText="item.title"
                    :maxSize="20"
                    :maxNumber="10"
                    :disabled="handelDisabled(item.enabled, ActiveKey)"
                    :api="item.props.apiUrl"
                    :uploadParams="item.props.uploadParams"
                    class="inline"
                  />
                </template>
              </div>
            </div>
          </div>
          <div class="ez-toolbar-right">
            <div class="ant-btn-group">
              <div v-if="toolbarRight && toolbarRight.length > 0">
                <template v-for="item in toolbarRight" :key="item.name">
                  <a-button
                    v-if="
                      checked(item.auth) &&
                      allowVisibled(item.visibled, ActiveKey) &&
                      item.type !== 'Upload'
                    "
                    :size="AppSize"
                    @click="toolbarClick(item, ActiveKey)"
                    :type="item.type"
                    :color="item.color || ''"
                    :disabled="handelDisabled(item.enabled, ActiveKey)"
                  >
                    {{ item.title }}
                  </a-button>
                  <BasicUpload
                    v-if="
                      checked(item.auth) &&
                      allowVisibled(item.visibled, ActiveKey) &&
                      item.type == 'Upload'
                    "
                    :btnText="item.title"
                    :maxSize="20"
                    :maxNumber="10"
                    :disabled="handelDisabled(item.enabled, ActiveKey)"
                    :api="item.props.apiUrl"
                    :uploadParams="item.props.uploadParams"
                    class="inline"
                  />
                </template>
              </div>
            </div>
          </div>
          <div style="clear: both"></div>
        </div>
      </EzToolBar>
      <Tabs
        type="line"
        v-model:activeKey="ActiveKey"
        :animated="false"
        :hideAdd="true"
        :tabBarGutter="5"
        :size="AppSize.appSize"
        @change="handlTabChange"
        @tab-click="handleTabClick"
        :on-prev-click="onNextClick"
        :on-next-click="onPrevClick"
      >
        <template v-for="item in tabList" :key="item.key">
          <TabPane :tab="item.title" :disabled="item.disabled">
            <component :is="item.component" v-bind="item.props" />
          </TabPane>
        </template>
      </Tabs>
      <slot></slot>
      <div>
        <a-alert message="表单快捷键" type="success">
          <template #description>
            <div>
              <ul class="shortcut">
                <li>Tab</li
                ><li>跳转到下一个输入框或控件，多选列表跳转到下一个选项。</li>
                <li>Shift + Tab</li
                ><li>跳回到上一个输入框或控件，多选列表跳回到上一个选项。</li>
                <li>空格键</li
                ><li>多选列表可以通过空格键选中值。</li>
                <li>↑ 、↓</li
                ><li>下拉列表可以通过 ↑ 、↓ 方向键来选择值。</li>
                <li>← 、→</li
                ><li>单选列表可以通过 ← 、→ 方向键来选择值。</li>
                <li>Enter</li
                ><li>提交表单。</li>
              </ul>
            </div>
          </template>
        </a-alert>
      </div>
    </CollapseContainer>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { Tabs } from 'ant-design-vue';

  export default defineComponent({
    name: 'DetailsWrapper',
    components: { Tabs, TabPane: Tabs.TabPane }
  });
</script>
<script lang="ts" setup>
  import { EzToolBar } from '/@/components/EzControls/EzToolBar';
  import { useAppStore } from '/@/store/modules/app';
  import { ButtonProps, TabListType } from '/@/api/interface/common';
  import { BasicUpload } from '/@/components/Upload';
  import { ref } from 'vue';
  import { CollapseContainer } from '/@/components/Container';
  import { isFunction, isArray, isUnDef, isEmpty, isString } from '/@/utils/is';

  const AppSize = useAppStore().getAppSize;

  const props = defineProps({
    title: {
      type: String
    },
    toolbarLeft: {
      type: Array as PropType<ButtonProps[]>,
      // eslint-disable-next-line vue/valid-define-props
      default: ref<ButtonProps[]>([])
    },
    toolbarRight: {
      type: Array as PropType<ButtonProps[]>,
      // eslint-disable-next-line vue/valid-define-props
      default: ref<ButtonProps[]>([])
    },
    tabList: {
      type: Array as PropType<TabListType[]>
    },
    tabActiveKey: {
      type: String
    },
    onChange: Object as PropType<((activeKey: string) => void) & ((...args: any[]) => any)>,
    onTabClick: Object as PropType<(...args: any[]) => any>,
    onNextClick: Object as PropType<(e: MouseEvent) => void>,
    onPrevClick: Object as PropType<(e: MouseEvent) => void>
  });

  const ActiveKey = ref('');

  function init() {
    ActiveKey.value = props.tabActiveKey || '';
  }
  init();
  function allowVisibled(visibled, activeKey) {
    return checkAllowStatus(visibled, activeKey, true);
  }

  function handelDisabled(enabled, activeKey) {
    return !checkAllowStatus(enabled, activeKey, true);
  }

  function checkAllowStatus(status: any | Array<string> | Function, activeKey, defaultValue) {
    if (isUnDef(status) || isEmpty(status)) return defaultValue;
    if (isFunction(status)) return status(activeKey);
    if (isArray(status)) return status.indexOf(activeKey) > -1;
    if (isString(status)) return status == activeKey;
  }

  function handlTabChange(e) {
    props.onChange && isFunction(props.onChange) && props.onChange.call(undefined, e);
  }
  function handleTabClick(e) {
    props.onTabClick && isFunction(props.onTabClick) && props.onTabClick.call(undefined, e);
  }
  function checked(auth) {
    if (Object.prototype.toString.call(auth) !== '[object Undefined]') return true;
    else return false;
  }

  function toolbarClick(item, key) {
    if (item.click) item.click(item, key);
  }
</script>
<style lang="less" scoped>
  .ez-toolbar-icon {
    width: 1.4em;
    height: 1.4em;
    font-weight: 400;

    path {
      fill: @text-color-base;
    }
  }

  .ant-btn-sm {
    .ez-toolbar-icon {
      width: 1em;
      height: 1em;
    }

    b {
      font-size: 1.1em;
      line-height: 1.3em;
    }
  }

  .ez-toolbar-right {
    float: right;

    button {
      padding: 4px 6px;
    }

    .is-disabled {
      path {
        fill: lighten(@text-color-base, 50%);
      }
    }

    .ml {
      width: 0.25em;
    }
  }

  .ez-toolbar-left {
    float: left;

    button {
      margin-top: 0;
    }

    .mt {
      margin-top: 0.2em;

      path {
        fill: lighten(@primary-color, 10%);
      }
    }

    b {
      font-size: 1.25em;
      line-height: 1.4em;
    }

    .ant-btn-text {
      padding-left: 0;
    }
  }
</style>
<style lang="less">
  .details-wrapper {
    margin: 10px 12px;

    .ez-details-toolbar {
      background-color: rgb(222, 232, 236);
      padding-bottom: 3px;
    }
    .ant-tabs-bar {
      margin-top: 1px;
    }
    .ant-tabs-top-bar {
      background-color: @component-background;
    }

    .ant-tabs-nav .ant-tabs-tab {
      height: 100%;
      padding: 7px 20px 5px 20px;
    }

    .ant-input-number,
    .ant-calendar-picker {
      width: 100%;
    }
  }
  .shortcut {
    margin-bottom: 0;
    li {
      position: relative;
    }

    li:nth-child(odd) {
      width: 100px;
      position: absolute;
      font-weight: bold;
    }
    li:nth-child(even) {
      margin-left: 105px;
    }
  }
</style>
