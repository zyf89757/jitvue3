<template>
  <div>
    <PageWrapper>
      <!-- 加载表单 -->
      <EzTable
        ref-name="dgBasicData"
        :show-toolbar="false"
        :allow-adding="false"
        :more-items="[]"
        :data-source="dataSource"
        :page-size="10"
        :edit-mode="'row'"
        :show-more="true"
        :key-expr="'id'"
        :from-mode="false"
        :parent-key-expr="'pid'"
        selection-mode="single"
        :selection-changed="onSelectionChanged"
      >
        <DxColumn
          data-field="fileOriginName"
          caption="文件名称"
          width="90px"
          :fixed="true"
          :fixed-position="'left'"
        />
        <DxColumn data-field="fileSuffix" caption="文件类型" width="100px">
          <DxRequiredRule />
        </DxColumn>
        <DxColumn data-field="fileSizeKb" caption="文件大小kb" />
        <DxColumn data-field="remark" caption="备注" width="100px">
          <DxRequiredRule />
        </DxColumn>
        <DxColumn data-field="lbyName" caption="修改人" width="80px" />
        <DxColumn
          data-field="lbyTime"
          caption="修改时间"
          format="yyyy-MM-dd"
          data-type="date"
          :allowFiltering="false"
          width="80px"
        />
        <DxColumn
          data-field="fileId"
          caption="操作"
          width="40px"
          :allowFiltering="false"
          :allow-editing="false"
          :cell-template="handlerTemplate"
        />
      </EzTable>
    </PageWrapper>
  </div>
</template>
<script lang="ts">
  import DxButton from 'devextreme-vue/button';
  import notify from 'devextreme/ui/notify';
  import { watchEffect, reactive, unref, defineComponent, onMounted } from 'vue';
  import { useForm } from '/@/components/EzControls/EzSearchForm/index';
  import { EzTable } from '/@/components/EzControls/EzTable';
  import { PageWrapper } from '/@/components/EzControls/EzPage';
  import { DxColumn, DxRequiredRule, DxLookup } from 'devextreme-vue/data-grid';
  import { BasicModal, useModal } from '/@/components/Modal';
  import { onActivated, ref } from 'vue';
  import { UploadApiResult } from '/@/api/sys/model/uploadModel';
  import { UploadFileParams } from '/#/axios';
  import { Ez } from '/@/utils/devexpress';
  import { defHttp } from '/@/utils/http/axios';
  // 应用查询page
  import { useAppStore } from '/@/store/modules/app';
  import { useGlobSetting } from '/@/hooks/setting';
  import { useRoute } from 'vue-router';

  export default defineComponent({
    name: 'Attachments',
    components: { PageWrapper, EzTable, DxColumn },
    props: {
      Id: {
        type: String
      },
      code: {
        type: String
      },
      clickName: {
        type: String
      },
      count: {
        type: Number
      },
      activeKey: { type: String }
    },
    setup(props, { emit }) {
      //初始化list
      const dataSource = ref({});
      const route = ref(useRoute());
      //加载表单数据带参
      function loadDataSource() {
        const url = `/api/service/file`;
        dataSource.value = Ez.CreateStore({
          key: 'id',
          loadUrl: `${url}/list`,
          loadParams: {
            code: props.code,
            businessid: props.Id
          },
          insertUrl: `${url}/create-dev`,
          updateUrl: `${url}/update-dev`,
          deleteUrl: `${url}/delete`
        });
      }
      //导出文件
      function handlerTemplate(el, e) {
        //const container = document.createElement('span');
        // container.innerHTML = '下载|浏览';
        // el.appendChild(container);
        const container = document.createElement('div');
        const download = document.createElement('a');

        download.onclick = function ({}) {
          downloadClick(e.key, e.data);
        };
        //download.setAttribute('download', e.data.fileOriginName);
        //download.setAttribute('href', '/dev/api/certificate/attachment-download/' + e.value);
        download.innerHTML = '下载';
        container.appendChild(download);

        // const span = document.createElement('span');
        // span.innerHTML = ' | ';
        // container.appendChild(span);

        // const preview = document.createElement('a');
        // preview.onclick = function ({}) {
        //   previewClick(e.key);
        // };
        // preview.setAttribute('target', '_blank');
        // preview.setAttribute('href', '/dev/api/certificate/attachment-preview/' + e.value);
        // preview.innerHTML = '浏览';
        // container.appendChild(preview);

        return el.appendChild(container);
      }
      function downloadClick(key, data) {
        //key就是主键id,fileName是文件名
        let fileName = data.fileOriginName;
        Ez.DownloadFile('/api/service/file/download?key=' + key, fileName);
      }
      function onFormModeEvent(e) {
        var id = e?.data?.id ? e.data.id : 0;
        console.log(e);
      }

      function onSelectionChanged({ currentSelectedRowKeys }) {
        if (currentSelectedRowKeys.length > 0) {
          console.log('选择按钮事件');
        }
      }
      watchEffect(() => {
        if ((unref(props.count) || 0) > 0) {
          switch (unref(props.clickName)) {
            case 'refresh':
              loadDataSource();
              break;
          }
        }
      });
      onMounted(() => {
        debugger;
        loadDataSource();
      });
      return {
        dataSource,
        onFormModeEvent,
        onSelectionChanged,
        handlerTemplate
      };
    }
  });
</script>
<style scoped></style>
