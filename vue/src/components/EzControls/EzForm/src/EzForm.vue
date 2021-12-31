<template>
  <EzToolBar :showLeftBorder="false">
    <div style="position: relative">
      <div class="ez-toolbar-left">
        <div class="ant-btn-group">
          <template v-if="leftToolbar && leftToolbar.length == 0">
            <a-button :size="AppSize" type="text">
              <svg
                t="1631147515119"
                class="ez-toolbar-icon mt"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="6025"
                width="20"
                height="20"
              >
                <path
                  d="M64 320h896v128H64zM64 576h384v128H64zM64 832h896v128H64zM64 64h384v128H64z"
                  p-id="6026"
                />
              </svg>
            </a-button>
          </template>
          <a-button v-if="title" :size="AppSize" type="text"
            ><b>{{ title }}</b></a-button
          >
          <template v-for="item in leftToolbar" :key="item.name">
            <a-button
              v-if="item.type == 'Button' && checked(item.auth)"
              :size="AppSize"
              @click="item.click"
            >
              {{ item.name }}
            </a-button>
          </template>
        </div>
      </div>
      <div class="ez-toolbar-right">
        <div class="ant-btn-group">
          <template v-for="item in leftToolbar" :key="item.name">
            <a-button
              v-if="item.type == 'Button' && checked(item.auth)"
              :size="AppSize"
              @click="item.click"
            >
              {{ item.name }}
            </a-button>
          </template>
        </div>
      </div>
      <div style="clear: both"></div>
    </div>
  </EzToolBar>
</template>
<script lang="ts" setup>
  import { EzToolBar } from '/@/components/EzControls/EzToolBar';
  import { useAppStore } from '/@/store/modules/app';

  const AppSize = useAppStore().getAppSize;
  defineProps({
    leftToolbar: {
      type: Array as PropType<ButtonProps[]>
    },
    rightToolbar: {
      type: Array as PropType<ButtonProps[]>
    },
    title: {
      type: String
    }
  });

  interface ButtonProps {
    name: string;
    title: string;
    type: string | 'Button' | 'Dropdown';
    click: any;
    auth: string;
  }

  function checked(auth) {
    if (Object.prototype.toString.call(auth) !== '[object Undefined]') return true;
    else return false;
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

  .table-container {
    background-color: @component-background;
  }
</style>
