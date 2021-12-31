<template>
  <div>
    <PageWrapper>
      <EzSearch>
        <BasicForm @register="register" @submit="handleSubmit1" />
      </EzSearch>
      <EzTable
        title="公告管理"
        ref-name="NoTice"
        :height="380"
        :data-source="dataSource"
        :page-size="20"
        :edit-mode="'row'"
        :show-more="true"
        :form-mode="true"
        :form-mode-event="onFormModeEvent"
        :more-items="[
          {
            name: 'enable',
            type: 'Button',
            title: '详情',
            click: toDetail,
            auth: '123'
          },
          {
            name: 'status',
            type: 'Button',
            title: '发布',
            click: toSend,
            auth: '123'
          }
        ]"
        :more-items-filter="onMoreItemsFilter"
        selection-mode="single"
      >
        <DxColumn data-field="level" caption="级别" width="100px">
          <DxLookup :data-source="level_type" value-expr="value" display-expr="text" />
        </DxColumn>
        <DxColumn data-field="type" caption="类型" width="100px">
          <DxLookup :data-source="user_types" value-expr="value" display-expr="text" />
        </DxColumn>
        <DxColumn data-field="cbyTime" caption="创建时间" format="yyyy-MM-dd" width="130px" />
        <DxColumn data-field="title" caption="标题" width="700px" />
        <DxColumn
          data-field="status"
          data-type="boolean"
          caption="状态"
          width="50px"
          :allowFiltering="false"
          :allow-editing="false"
          :cell-template="statusTemplate"
        />
      </EzTable>
    </PageWrapper>
    <!-- 注册抽屉 -->
    <NoticeDetail
      @register="registerDrawer"
      :on-submit-success="onSubmitSuccess"
      @okStaus="okStaus"
    />
    <InformModail @register="registers" :noticeScouce="noticeScouce" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({ name: 'NoTice' });
</script>
<script lang="ts" setup>
  import { EzTable } from '/@/components/EzControls/EzTable';
  import { useDrawer } from '/@/components/Drawer';
  import { DxColumn, DxLookup } from 'devextreme-vue/data-grid';
  import { BasicForm, useForm, FormSchema } from '/@/components/EzControls/EzSearchForm/index';
  import { ref, watchEffect, reactive } from 'vue';
  import { EzSearch } from '/@/components/EzControls/EzSearch';
  import { Ez } from '/@/utils/devexpress';
  import InformModail from './components/InformModail.vue';
  import NoticeDetail from './components/NoticeDetail.vue';
  import { useAppStore } from '/@/store/modules/app';
  import { useModal } from '/@/components/Modal';
  import { defHttp } from '/@/utils/http/axios';
  import { PageWrapper } from '/@/components/EzControls/EzPage';
  const user_types = [
    { value: '1', text: '通知' },
    { value: '2', text: '公告' }
  ];
  const level_type = [
    { value: 0, text: '租户' },
    { value: 1, text: '全站' }
  ];
  const dataSource = ref({});
  let loadParams = reactive({ noticeType: '', searchValue: '' });
  const [registers, { openModal: fork }] = useModal();
  const appSize = useAppStore().getAppSize;
  const noticeScouce = ref();
  function loadDataSource() {
    const url = `/api/notice`;
    dataSource.value = Ez.CreateStore({
      key: 'id',
      loadUrl: `${url}/list`,
      loadParams: { ...loadParams },
      insertUrl: `${url}/create-dev`,
      updateUrl: `${url}/update-dev`,
      deleteUrl: `${url}/delete`
    });
  }
  const schemas: FormSchema[] = [
    {
      field: 'title',
      component: 'Input',
      label: '请输入标题',
      colProps: {
        span: 8
      }
    },
    {
      field: 'configType',
      component: 'Select',
      label: '请选择类型',
      colProps: {
        span: 8
      },
      componentProps: {
        options: [
          {
            label: '通知',
            value: '1',
            key: '1'
          },
          {
            label: '公告',
            value: '2',
            key: '2'
          }
        ]
      }
    }
  ];
  async function toDetail(item, e) {
    fork(true);
    var obj = await defHttp.get({
      url: '/api/notice/detail?key=' + e.key
    });
    noticeScouce.value = obj.data;
  }
  const Api = `/api/notice/change/status`;
  async function toSend(item, e) {
    var parameter = {
      key: e.key,
      status: 1
    };
    await defHttp.post({ url: Api, params: parameter }, { isToastMsg: true });
    e.component.refresh();
  }
  function onMoreItemsFilter(items, e) {
    return (
      items.filter((it) => {
        return it.name != (e.data.receiveMessage == 'status');
      }) || []
    );
  }
  const [registerDrawer, { openDrawer }] = useDrawer();
  function onSubmitSuccess() {
    loadDataSource();
  }
  const [register, { getFieldsValue }] = useForm({
    labelWidth: 125,
    compact: true,
    schemas: schemas,
    actionColOptions: {
      span: 24
    },
    size: appSize.toString() == 'small' ? 'small' : 'default',
    showResetButton: true,
    showSubmitButton: true,
    showAdvancedButton: true,
    alwaysShowLines: 1
  });
  async function handleSubmit1() {
    var objvalue = await getFieldsValue();
    loadParams.searchValue = objvalue.title;
    loadParams.noticeType = objvalue.configType;
  }
  function statusTemplate(el, e) {
    const container = document.createElement('span');
    container.innerHTML =
      '<b' + (e.value ? '>发布' : ' class="ant-typography ant-typography-danger">草稿') + '</b>';
    return el.appendChild(container);
  }
  function okStaus(successStaus) {
    if (successStaus == 1) {
      loadDataSource();
    }
  }
  // 加载抽屉表单
  async function onFormModeEvent(isUpdate, e) {
    if (isUpdate) {
      e.data.status = e.data.status.toString();
      e.data.type = e.data.type.toString();
      e.data.level = e.data.level.toString();
      var obj = await defHttp.get({
        url: '/api/notice/user?key=' + e.key
      });
      e.data['noticeUserIdList'] = obj.data;
    }

    openDrawer(true, {
      record: e?.data,
      isUpdate: isUpdate
    });
  }
  watchEffect(() => {
    loadDataSource();
  });
</script>
<style></style>
