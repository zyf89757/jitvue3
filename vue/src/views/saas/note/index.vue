<template>
  <div>
    <PageWrapper>
      <div class="flex">
        <EzTable
          title="短信管理"
          :height="380"
          :data-source="dataSource"
          :page-size="20"
          :edit-mode="'row'"
          :show-more="true"
          :form-mode="true"
          :form-mode-event="onFormModeEvent"
          selection-mode="single"
          :allow-deleting="false"
          :allow-updating="false"
          :more-items="[
            {
              name: 'enable',
              type: 'Button',
              title: '详情',
              click: toDetail,
              auth: '123'
            },
            {
              name: 'Againsend',
              type: 'Button',
              title: '重新发送',
              click: toAgainSend,
              auth: '123'
            }
          ]"
          :more-items-filter="onMoreItemsFilter"
        >
          <DxColumn data-field="module" caption="应用名称" width="130px" />
          <DxColumn data-field="template" caption="短信模板" width="100px" />
          <DxColumn data-field="title" caption="短信类型" width="90px" />
          <DxColumn
            data-field="cbyTime"
            caption="发送时间"
            data-type="date"
            width="120px"
            format="yyyy-MM-dd HH:mm:ss"
          />
          <DxColumn caption="#" width="30px" />
          <DxColumn
            data-field="requestStaus"
            data-type="boolean"
            caption="状态"
            width="50px"
            :allowFiltering="false"
            :allow-editing="false"
            :fixed="true"
            :fixed-position="'right'"
            :cell-template="statusTemplate"
          />
        </EzTable>
      </div>
    </PageWrapper>
  </div>
  <!-- 注册抽屉 -->
  <NoteDetail @register="registerDrawer" :on-submit-success="onSubmitSuccess" @okStaus="okStaus" />
  <NoteDrawer @register="registers" :detailScoure="detailScoure" />
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'SmsMessage'
  });
</script>
<script lang="ts" setup>
  import { EzTable } from '/@/components/EzControls/EzTable';
  import { ref, reactive, watchEffect } from 'vue';
  import { Ez } from '/@/utils/devexpress';
  import { DxColumn } from 'devextreme-vue/data-grid';
  import { defHttp } from '/@/utils/http/axios';
  import { useModal } from '/@/components/Modal';
  import NoteDetail from './components/NoteDetail.vue';
  import { PageWrapper } from '/@/components/EzControls/EzPage';
  import { useDrawer } from '/@/components/Drawer';
  import NoteDrawer from './components/NoteDrawer.vue';
  const dataSource = ref({});
  const detailScoure = ref();
  let loadParams = reactive({ typeName: '' });
  function loadDataSource() {
    const url = `/api/message`;
    dataSource.value = Ez.CreateStore({
      key: 'id',
      loadUrl: `${url}/list`,
      loadParams: { ...loadParams }
    });
  }
  const [registers, { openModal: fork }] = useModal();
  const [registerDrawer, { openDrawer }] = useDrawer();

  // 加载抽屉表单
  async function onFormModeEvent(isUpdate, e) {
    openDrawer(true, {
      record: e?.data,
      isUpdate: isUpdate
    });
  }
  function onSubmitSuccess() {
    loadDataSource();
  }
  function okStaus(successStaus) {
    if (successStaus == 1) {
      loadDataSource();
    }
  }
  function onMoreItemsFilter(items, e) {
    return (
      items.filter((it) => {
        return it.name != (e.data.requestStaus ? 'Againsend' : '');
      }) || []
    );
  }
  function statusTemplate(el, e) {
    const container = document.createElement('span');
    container.innerHTML =
      '<b' + (e.value ? '>成功' : ' class="ant-typography ant-typography-danger">失败') + '</b>';
    return el.appendChild(container);
  }
  async function toDetail(item, e) {
    fork(true);
    var obj = await defHttp.get({
      url: '/api/message/single?key=' + e.key
    });
    detailScoure.value = obj.data;
  }
  async function toAgainSend(item, e) {
    await defHttp.get({
      url: '/api/message/resend?key=' + e.key
    });
  }
  watchEffect(() => {
    loadDataSource();
  });
</script>
