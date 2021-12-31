<template>
  <EzToolBar :showLeftBorder="false">
    <div style="position: relative">
      <div class="ez-toolbar-left">
        <div class="ant-btn-group">
          <template v-if="toolbar && toolbar.length == 0">
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
          <template v-for="item in toolbar" :key="item.name">
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
          <a-button :size="AppSize" title="新增" @click="addRow">
            <svg
              t="1630847191422"
              class="ez-toolbar-icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="14696"
              width="1em"
              height="1em"
            >
              <path
                d="M938.692923 458.200615H557.922462V72.467692A44.898462 44.898462 0 0 0 512 28.514462a44.898462 44.898462 0 0 0-45.922462 43.95323v385.732923H85.307077A44.898462 44.898462 0 0 0 39.384615 502.153846c0 24.339692 20.48 44.032 45.922462 44.032h380.770461v383.606154c0 24.260923 20.558769 43.953231 45.922462 43.953231a44.898462 44.898462 0 0 0 45.922462-44.032v-383.606154h380.770461A44.898462 44.898462 0 0 0 984.615385 502.232615a44.898462 44.898462 0 0 0-45.922462-43.95323z"
                p-id="14697"
              />
            </svg>
          </a-button>
          <template v-if="editMode == 'batch'">
            <a-button :size="AppSize" title="保存" @click="saveEditData" :disabled="!CanSave">
              <svg
                t="1631017692892"
                class="ez-toolbar-icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="25259"
                width="20"
                height="20"
              >
                <path d="M853.333333 0H768v426.666667H256V0H0v1024h1024V170.666667z" p-id="25260" />
                <path d="M512 0h170.666667v256H512z" p-id="25261" />
              </svg>
            </a-button>
            <a-button :size="AppSize" title="撤销" @click="cancelEditData" :disabled="!CanSave">
              <svg
                t="1631016534677"
                class="ez-toolbar-icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="9339"
                width="1em"
                height="1em"
              >
                <path
                  d="M356.864 406.869333L296.533333 467.2 85.333333 256l211.2-211.2 60.330667 60.330667L248.661333 213.333333H554.666667a341.333333 341.333333 0 0 1 0 682.666667H170.666667v-85.333333h384a256 256 0 1 0 0-512H248.661333l108.202667 108.202666z"
                  p-id="9340"
                />
              </svg>
            </a-button>
          </template>
          <div class="ml"></div>
          <a-button :size="AppSize" title="刷新" @click="refresh">
            <svg
              class="ez-toolbar-icon"
              width="1em"
              height="1em"
              aria-hidden="true"
              viewBox="64 64 896 896"
            >
              <path
                d="M758.2 839.1C851.8 765.9 912 651.9 912 523.9 912 303 733.5 124.3 512.6 124 291.4 123.7 112 302.8 112 523.9c0 125.2 57.5 236.9 147.6 310.2 3.5 2.8 8.6 2.2 11.4-1.3l39.4-50.5c2.7-3.4 2.1-8.3-1.2-11.1-8.1-6.6-15.9-13.7-23.4-21.2a318.64 318.64 0 01-68.6-101.7C200.4 609 192 567.1 192 523.9s8.4-85.1 25.1-124.5c16.1-38.1 39.2-72.3 68.6-101.7 29.4-29.4 63.6-52.5 101.7-68.6C426.9 212.4 468.8 204 512 204s85.1 8.4 124.5 25.1c38.1 16.1 72.3 39.2 101.7 68.6 29.4 29.4 52.5 63.6 68.6 101.7 16.7 39.4 25.1 81.3 25.1 124.5s-8.4 85.1-25.1 124.5a318.64 318.64 0 01-68.6 101.7c-9.3 9.3-19.1 18-29.3 26L668.2 724a8 8 0 00-14.1 3l-39.6 162.2c-1.2 5 2.6 9.9 7.7 9.9l167 .8c6.7 0 10.5-7.7 6.3-12.9l-37.3-47.9z"
              />
            </svg>
          </a-button>
          <a-button :size="AppSize" title="自定义列" @click="showColumnChooser">
            <svg
              id="columnChoose-1630843482555"
              t="1630843482555"
              class="ez-toolbar-icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="13771"
              width="1em"
              height="1em"
            >
              <path
                d="M888 118.4h-784c-24 0-43.2 19.2-43.2 43.2 0 24 19.2 43.2 43.2 43.2h784c24 0 43.2-19.2 43.2-43.2 0-24-19.2-43.2-43.2-43.2zM390.4 352H104c-24 0-43.2 19.2-43.2 43.2 0 24 19.2 43.2 43.2 43.2h286.4c24 0 43.2-19.2 43.2-43.2 0-24-19.2-43.2-43.2-43.2zM323.2 585.6H104c-24 0-43.2 19.2-43.2 43.2C60.8 652.8 80 672 104 672h219.2c24 0 43.2-19.2 43.2-43.2 0-24-19.2-43.2-43.2-43.2zM390.4 819.2H104c-24 0-43.2 19.2-43.2 43.2 0 24 19.2 43.2 43.2 43.2h286.4c24 0 43.2-19.2 43.2-43.2 0-24-19.2-43.2-43.2-43.2z"
                p-id="13772"
              />
              <path
                d="M982.4 563.2c-3.2-17.6-12.8-27.2-24-27.2h-3.2c-40 0-72-35.2-72-76.8 0-14.4 6.4-28.8 6.4-28.8 6.4-14.4 1.6-32-11.2-41.6l-68.8-41.6h-1.6c-4.8-1.6-8-3.2-12.8-3.2-9.6 0-19.2 4.8-25.6 11.2-8 9.6-35.2 33.6-57.6 33.6s-48-24-57.6-33.6c-6.4-8-16-11.2-25.6-11.2-4.8 0-9.6 1.6-12.8 3.2L544 388.8c-12.8 9.6-17.6 27.2-11.2 41.6 0 0 6.4 16 6.4 28.8 0 41.6-32 76.8-72 76.8h-1.6c-11.2 0-20.8 11.2-24 27.2 0 1.6-6.4 33.6-6.4 57.6s6.4 56 6.4 57.6c3.2 16 12.8 27.2 24 27.2H464c40 0 72 35.2 72 76.8 0 14.4-6.4 28.8-6.4 28.8-6.4 14.4-1.6 32 11.2 41.6l68.8 40c4.8 1.6 8 3.2 12.8 3.2 9.6 0 19.2-4.8 25.6-11.2 8-9.6 35.2-35.2 57.6-35.2s49.6 25.6 59.2 36.8c6.4 8 16 11.2 25.6 11.2 4.8 0 9.6-1.6 12.8-3.2l70.4-41.6c12.8-9.6 17.6-27.2 11.2-41.6 0 0-6.4-16-6.4-28.8 0-41.6 32-76.8 72-76.8h3.2c11.2 0 20.8-11.2 24-27.2 0-1.6 6.4-33.6 6.4-57.6 3.2-24-1.6-56-1.6-57.6z m-180.8 148.8c-24 24-57.6 38.4-91.2 38.4-72 0-129.6-57.6-129.6-129.6s57.6-129.6 129.6-129.6 129.6 57.6 129.6 129.6c-1.6 35.2-14.4 67.2-38.4 91.2z"
                p-id="13773"
              />
            </svg>
          </a-button>
        </div>
      </div>
      <div style="clear: both"></div>
    </div>
  </EzToolBar>
  <div class="table-container p-1.5 pt-0.5 pr-2">
    <DxTreeList
      ref="ezTreeList"
      :data-source="dataSource"
      :width="width"
      :height="dgHeight"
      :focused-row-enabled="false"
      :column-hiding-enabled="false"
      :repaint-changes-only="true"
      :scrolling="{ showScrollbar: 'always', useNative: true }"
      :selection="{ mode: `multiple`, showCheckBoxesMode: 'always' }"
      :column-min-width="30"
      :grouping="{ autoExpandAll: true }"
      :group-panel="{ visible: false }"
      :row-alternation-enabled="true"
      :show-column-lines="true"
      :show-row-lines="true"
      :show-borders="true"
      :allow-column-reordering="true"
      :allow-column-resizing="true"
      :column-resizing-mode="'widget'"
      :column-auto-width="true"
      :column-fixing="{ enabled: true }"
      :remote-operations="{
        paging: true,
        filtering: true,
        sorting: true,
        grouping: true,
        summary: true,
        groupPaging: true
      }"
      :key-expr="keyExpr"
      :parent-id-expr="parentKeyExpr"
      @content-ready="onContentReady"
      :toolbar="{
        visible: false
      }"
      @focused-cell-changing="onFocusedCellChanging"
      @selection-changed="onSelectionChanged"
      @row-dbl-click="onRowDblClick"
      @focused-cell-changed="onFocusedCellChanged"
      @editing-start="onEditingStart"
      @init-new-row="onInitNewRow"
    >
      <slot></slot>
      <DxColumn
        :visible="allowDeleting || allowUpdating"
        type="buttons"
        :width="60"
        :fixed-position="'right'"
        caption="操作"
        :visible-index="998"
      >
        <DxButton name="edit" />
        <DxButton name="delete" />
      </DxColumn>
      <template v-if="showMore">
        <DxColumn
          :width="30"
          :allow-sorting="false"
          :allow-editing="false"
          :fixed-position="'right'"
          :visible-index="999"
          caption="#"
          :alignment="'center'"
          :cell-template="MoreItemTemplate"
        />
      </template>
      <DxKeyboardNavigation
        :edit-on-key-press="true"
        :enter-key-action="'moveFocus'"
        :enter-key-direction="'row'"
      />
      <DxEditing
        :mode="editMode"
        :allow-adding="allowAdding"
        :allow-deleting="allowDeleting"
        :allow-updating="allowUpdating"
        :select-text-on-edit-start="true"
        :start-edit-action="'click'"
      />
      <DxFilterRow :visible="true" />
      <DxPaging :page-size="pageSize" />
      <DxPager
        :show-page-size-selector="true"
        :show-info="true"
        :allowed-page-sizes="[10, 20, 50, 100]"
      />
    </DxTreeList>
  </div>
</template>
<script lang="ts" setup>
  import { EzToolBar } from '/@/components/EzControls/EzToolBar';
  import {
    DxTreeList,
    DxPaging,
    DxPager,
    DxEditing,
    DxFilterRow,
    DxColumn,
    DxButton,
    DxKeyboardNavigation
  } from 'devextreme-vue/tree-list';
  import { Ez } from '/@/utils/devexpress';
  import { EzMore } from '/@/components/EzControls/EzMore';
  import { useAppStore } from '/@/store/modules/app';
  import { ref, onMounted } from 'vue';

  const props = defineProps({
    refName: {
      type: String
    },
    keyExpr: { type: String },
    parentKeyExpr: { type: String },
    toolbar: {
      type: Array as PropType<ButtonProps[]>
    },
    title: {
      type: String
    },
    pageSize: {
      type: Number,
      default: 20
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: Number,
      default: 0
    },
    dataSource: {
      type: Object
    },
    exportFileName: {
      type: String,
      default: 'ReFileName'
    },
    showFilterRow: {
      type: Boolean,
      default: true
    },
    showMore: {
      type: Boolean,
      default: true
    },
    editMode: {
      type: String,
      validator: (value: string) => ['row', 'batch'].includes(value),
      default: 'row'
    },
    allowAdding: {
      type: Boolean,
      default: true
    },
    allowDeleting: {
      type: Boolean,
      default: true
    },
    allowUpdating: {
      type: Boolean,
      default: true
    },
    allowDbClickStartEdit: {
      type: Boolean,
      default: true
    },
    canSave: {
      type: Boolean,
      default: false
    },
    initNewRow: {
      type: Function
    },
    selectionChanged: {
      type: Function
    },
    selectionMode: {
      type: String,
      default: 'single'
    },
    moreItems: {
      type: Array as PropType<ButtonProps[]>
    },
    moreItemsFilter: {
      type: Function
    },
    formMode: {
      type: Boolean,
      default: false
    },
    formModeEvent: {
      type: Function
    }
  });

  interface ButtonProps {
    name: string;
    title: string;
    type: string;
    click: any;
    auth: string;
  }

  const ezTreeList = ref();
  const dgHeight = ref(0);
  let CanSave = ref(false);

  const AppSize = useAppStore().getAppSize;

  function checked(auth) {
    if (Object.prototype.toString.call(auth) !== '[object Undefined]') return true;
    else return false;
  }

  function onFocusedCellChanging(e) {
    e.isHighlighted = props.editMode == 'batch';
  }

  function onFocusedCellChanged(e) {
    CanSave.value = props.editMode == 'batch' && e.component.hasEditData();
  }

  function saveEditData() {
    ezTreeList.value.instance.saveEditData();
    CanSave.value = false;
  }

  function onEditingStart(e) {
    if (props.formMode) {
      e.cancel = true;
      cancelEditData();
      if (props.formModeEvent) props.formModeEvent(true, e);
    } else {
      CanSave.value = props.editMode == 'batch' && e.component.hasEditData();
    }
  }

  function cancelEditData() {
    ezTreeList.value.instance.cancelEditData();
    CanSave.value = false;
  }

  function onSelectionChanged(e) {
    if (props.selectionMode == 'single') {
      if (e.currentSelectedRowKeys.length > 0) {
        let currentKey = e.currentSelectedRowKeys[0];
        let removeKeys: any[] = [];
        if (e.selectedRowKeys.length > 0) {
          for (let i = 0; i < e.selectedRowKeys.length; i++) {
            if (e.selectedRowKeys[i] != currentKey) {
              removeKeys.push(e.selectedRowKeys[i]);
            }
          }
        }
        if (removeKeys.length > 0) {
          e.component.deselectRows(removeKeys);
        }
        if (props.selectionChanged) {
          props.selectionChanged(e);
        }
      }
      if (e.currentDeselectedRowKeys.length > 0) {
        if (props.selectionChanged) {
          props.selectionChanged(e);
        }
      }
    } else {
      if (props.selectionChanged) {
        props.selectionChanged(e);
      }
    }
  }

  function addRow() {
    if (props.formModeEvent) {
      if (props.formModeEvent) props.formModeEvent(false);
    } else {
      ezTreeList.value.instance.addRow();
    }
  }

  function refresh() {
    ezTreeList.value.instance.refresh();
  }

  function onRowDblClick(e) {
    if (props.allowDbClickStartEdit && props.editMode != 'batch') {
      if (!e.isNewRow) {
        e.component.editRow(e.rowIndex);
      }
    }
  }

  function showColumnChooser() {
    ezTreeList.value.instance.showColumnChooser();
  }

  function MoreItemTemplate(el, e) {
    if (props.moreItems && props.moreItems?.length > 0) {
      let tempItems = props.moreItemsFilter
        ? props.moreItemsFilter(props.moreItems, e)
        : props.moreItems;

      return Ez.RenderComponent(el, EzMore, {
        items: tempItems,
        displayExpr: 'title',
        keyExpr: 'name',
        onItemClick: function (item) {
          item.itemData.click(item.itemData, e);
          setTimeout(function () {
            refresh();
          }, 300);
        }
      });
    } else {
      return el;
    }
  }

  function onInitNewRow(e) {
    if (props.initNewRow) {
      props.initNewRow(e);
    }
  }

  function onContentReady() {
    var el = document.querySelector(
      '.dx-datagrid-headers .dx-datagrid-table .dx-header-row .dx-command-edit'
    );
    if (el) el.innerHTML = '操作';
  }
  onMounted(
    (window.onresize = function () {
      dgHeight.value = props.height > 0 ? props.height : window.innerHeight - 200;
    })
  );
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
