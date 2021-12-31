<template>
  <div>
    <EzTable
      title="消息管理"
      ref-name="MessAge"
      :height="380"
      :data-source="dataSource"
      :page-size="10"
      :edit-mode="'row'"
      :show-more="true"
      :key-expr="'id'"
      :from-mode="false"
      :allow-adding="false"
      :allow-updating="false"
      :parent-key-expr="'pid'"
      :form-mode="true"
      selection-mode="single"
      :toolbar="[
        {
          name: 'readed',
          type: 'Button',
          title: '已读消息',
          click: readOne,
          auth: '123'
        },
        {
          name: 'read',
          type: 'Button',
          title: '未读消息',
          click: readOw,
          auth: '123'
        },
        {
          name: 'outer',
          type: 'Button',
          title: '外链消息',
          click: outerMessage,
          auth: '123'
        }
      ]"
      :more-items="[
        {
          name: 'enable',
          type: 'Button',
          title: '详情',
          click: toDetail,
          auth: '123'
        }
      ]"
    >
      <DxColumn
        data-field="readStatus"
        data-type="boolean"
        caption="状态"
        width="50px"
        :allowFiltering="false"
        :allow-editing="false"
        :cell-template="statusTemplate"
      />
      <DxColumn data-field="type" caption="类型" width="100px">
        <DxLookup :data-source="user_types" value-expr="value" display-expr="text" />
      </DxColumn>
      <DxColumn data-field="publicTime" caption="发布时间" width="130px" />
      <DxColumn data-field="title" caption="标题" />
    </EzTable>
  </div>
  <MessageModail @register="registers" :noticeScouce="noticeScouce"
/></template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({ name: 'MessAge' });
</script>
<script lang="ts" setup>
  import { EzTable } from '/@/components/EzControls/EzTable';
  import { DxColumn, DxLookup } from 'devextreme-vue/data-grid';
  import { ref, watchEffect, reactive } from 'vue';
  import { useModal } from '/@/components/Modal';
  import { Ez } from '/@/utils/devexpress';
  import MessageModail from './components/MessageModail.vue';
  import { defHttp } from '/@/utils/http/axios';
  const user_types = [
    { value: '1', text: '通知' },
    { value: '2', text: '公告' }
  ];
  const noticeScouce = ref();
  const reKey = ref();
  const [registers, { openModal: fork }] = useModal();
  async function toDetail(item, e) {
    var obj = await defHttp.get({
      url: '/api/noticeuser/detail?key=' + e.key
    });
    console.log(obj.data);
    reKey.value = e.key;
    noticeScouce.value = obj.data;
    fork(true);
    if (obj.data.src == '外链消息') {
      fork(false);
      window.open(`${obj.data.content}`);
    }
    readStatus();
  }

  async function readStatus() {
    await defHttp.post(
      { url: '/api/noticeuser/readstaus', params: { Key: reKey.value } },
      { isPopupMsg: false }
    );
  }
  let loadParams = reactive({ NoticeStaus: '', OuterMessage: '' });
  const dataSource = ref();
  function loadDataSource() {
    const url = `/api/noticeuser`;
    dataSource.value = Ez.CreateStore({
      key: 'id',
      loadUrl: `${url}/usernotice`,
      loadParams: { ...loadParams },
      deleteUrl: `${url}/delete`
    });
  }

  function statusTemplate(el, e) {
    const container = document.createElement('span');
    container.innerHTML =
      '<b' + (e.value ? '>已读' : ' class="ant-typography ant-typography-danger">未读') + '</b>';
    return el.appendChild(container);
  }
  function outerMessage() {
    loadParams.OuterMessage = '外链';
  }
  function readOne() {
    loadParams.NoticeStaus = '1';
  }
  function readOw() {
    loadParams.NoticeStaus = '0';
  }
  watchEffect(() => {
    loadDataSource();
  });
</script>

<style></style>
