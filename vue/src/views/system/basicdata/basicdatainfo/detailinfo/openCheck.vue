<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="检验检疫编码列表"
    @visible-change="handleVisibleChange"
    @ok="checkconfirm"
  >
    <div class="pt-3px pr-3px">
      <!-- 加载表单 -->
      <EzTable
        ref-name="dgCheckData"
        :data-source="dataSource"
        :page-size="10"
        :edit-mode="'row'"
        :show-more="true"
        :key-expr="'hscode'"
        :from-mode="false"
        selection-mode="single"
        :selection-changed="onSelectionChanged"
        :form-mode-event="onFormModeEvent"
        :allow-adding="false"
        :allow-updating="false"
        :allow-deleting="false"
      >
        <DxColumn data-field="ciqname" caption="名称" width="100px" />
        <DxColumn data-field="classifyCnnm" caption="类型" width="100px" />
        <DxColumn data-field="hscode" caption="HS代码" width="90px" />
        <DxColumn data-field="hsname" caption="HS名称" />
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

  export default defineComponent({
    name: 'OpenCheck',
    components: { BasicModal, EzTable, DxColumn },
    props: {
      userData: { type: Object }
    },
    setup(props, { emit }) {
      const checkvalue = ref('');
      //初始化list
      const dataSource = ref({});
      const [register] = useModalInner((data) => {
        data && onDataReceive(data);
      });

      function onDataReceive(data) {
        console.log('Data Received', data);
        //加载路由
        const url = `${
          Ez.GlobSetting().hsCodeUrl
        }/odata/SWServerDatas/Data.GetHsCode_Records(buss_type='MerchElement')?$filter=contains(hscode,'${
          data.data
        }')`;
        dataSource.value = Ez.CreateStore({
          key: 'hscode',
          loadUrl: `${url}/testcheck`,
          // 额外的查询功能字段
          loadParams: {
            hscode: `${data.value}`
          }
        });
      }
      function onFormModeEvent(e) {
        var id = e?.data?.id ? e.data.id : 0;
        console.log(e);
      }
      //确定按钮事件，发送到夫组件
      function checkconfirm() {
        emit('handelCheckOk', checkvalue.value);
      }
      function onSelectionChanged({ currentSelectedRowKeys }) {
        if (currentSelectedRowKeys.length > 0) {
          console.log('选择按钮事件');
          checkvalue.value = currentSelectedRowKeys;
        }
      }
      function handleVisibleChange(v) {
        v && props.userData && nextTick(() => onDataReceive(props.userData));
      }

      return {
        register,
        dataSource,
        handleVisibleChange,
        onFormModeEvent,
        checkconfirm,
        onSelectionChanged
      };
    }
  });
</script>
