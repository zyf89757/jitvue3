<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="商品列表"
    @visible-change="handleVisibleChange"
    @ok="handelOk"
  >
    <div class="pt-3px pr-3px">
      <!-- 加载表单 -->
      <EzTable
        ref-name="dgBasicData"
        :data-source="dataSource"
        :page-size="10"
        :edit-mode="'row'"
        :show-more="true"
        :key-expr="'codeTs'"
        :from-mode="false"
        :parent-key-expr="'pid'"
        selection-mode="single"
        :selection-changed="onSelectionChanged"
        :form-mode-event="onFormModeEvent"
        :allow-adding="false"
        :allow-updating="false"
        :allow-deleting="false"
      >
        <DxColumn data-field="codeTs" caption="商品编码" width="90px" :fixed="true" />
        <DxColumn data-field="gname" caption="商品名称" width="100px" />
        <DxColumn data-field="noteS" caption="商品备注" />
      </EzTable>
    </div>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, nextTick } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
  import { Ez } from '/@/utils/devexpress';
  import { EzTable } from '/@/components/EzControls/EzTable';
  import { DxColumn } from 'devextreme-vue/data-grid';
  import { optionsList } from '../../api/basicdata';

  export default defineComponent({
    name: 'OpenList',
    components: { BasicModal, EzTable, DxColumn },
    props: {
      userData: { type: Object }
    },
    setup(props, { emit }) {
      //初始化list
      const dataSource = ref([]);
      const hscode = ref('');
      const [register] = useModalInner((data) => {
        console.log('listreceive' + data);
        data && onDataReceive(data);
      });

      async function onDataReceive(data) {
        console.log('Data Received', data);
        //加载路由
        // const url = `${
        //   Ez.GlobSetting().hsCodeUrl
        // }/odata/SWServerDatas/Data.GetHsCode_Records(buss_type='MerchElement')?$filter=contains(hscode,'0203119010')`;
        // dataSource.value = Ez.CreateStore({
        //   key: 'codeTs',
        //   loadUrl: `${url}`,
        //   // 额外的查询功能字段
        //   loadParams: {
        //     hscode: `${data.value}`
        //   }
        // });
        dataSource.value = await optionsList(data);
      }
      function onFormModeEvent(e) {
        var id = e?.data?.id ? e.data.id : 0;
        console.log(e);
      }

      function onSelectionChanged({ currentSelectedRowKeys }) {
        if (currentSelectedRowKeys.length > 0) {
          console.log('选择按钮事件' + currentSelectedRowKeys);
          hscode.value = currentSelectedRowKeys;
        }
      }
      function handelOk() {
        console.log('选择子组件ok');
        emit('handelOk', hscode.value);
      }
      function handleVisibleChange(v) {
        v && props.userData && nextTick(() => onDataReceive(props.userData));
      }

      return {
        register,
        dataSource,
        handelOk,
        handleVisibleChange,
        onFormModeEvent,
        onSelectionChanged
      };
    }
  });
</script>
