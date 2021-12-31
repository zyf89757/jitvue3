<template>
  <PageWrapper>
    <EzSearch>
      <BasicForm @register="register" @submit="alertNum" />
    </EzSearch>
    <EzTable
      :height="height"
      :data-source="dataSource"
      :page-size="2"
      :edit-mode="'row'"
      :init-new-row="onInitNewRow"
      :show-more="true"
      :more-items="[
        {
          name: 'string1',
          type: 'Button',
          title: '按钮1',
          click: test,
          auth: '123'
        },
        {
          name: 'string2',
          type: 'Button',
          title: '按钮2',
          click: test,
          auth: '123'
        }
      ]"
      :toolbar="[
        {
          name: 'string',
          type: 'Button',
          title: '按钮',
          click: test,
          auth: '123'
        }
      ]"
    >
      <DxColumn data-field="code" caption="系统编码" />
      <DxColumn data-field="name" caption="系统名称" />
      <DxColumn data-field="enName" caption="英文名称" />
      <DxColumn data-field="description" caption="系统描述" />
      <DxColumn data-field="isSeparated" data-type="boolean" caption="独立" />
      <DxColumn data-field="separateSite" caption="独立站点" />
      <DxColumn data-field="enabled" data-type="boolean" caption="启用" />
      <!-- <DxColumn :width="100" :allow-sorting="false" :cell-template="cellTemplate" /> -->
    </EzTable>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { BasicForm, FormSchema, useForm } from '/@/components/EzControls/EzSearchForm/index';
  import { EzSearch } from '/@/components/EzControls/EzSearch';
  import { EzTable } from '/@/components/EzControls/EzTable';
  import { PageWrapper } from '/@/components/EzControls/EzPage';
  import { useAppStore } from '/@/store/modules/app';
  import { DxColumn } from 'devextreme-vue/data-grid';
  import { Button } from '/@/components/DxButton';
  import { EzMore } from '/@/components/EzControls/EzMore';
  import { appCustomsApi } from '/@/api/sw/data';
  import { onMounted, ref } from 'vue';
  import { Ez } from '/@/utils/devexpress';
  const appSize = useAppStore().getAppSize;
  const getSchamas = (): FormSchema[] => {
    return [
      {
        field: 'field1',
        component: 'Input',
        label: '字段1',
        colProps: {
          span: 8
        },
        componentProps: {
          placeholder: '自定义placeholder',
          onChange: (e: any) => {
            console.log(e);
          }
        }
      },
      {
        field: 'field2',
        component: 'Input',
        label: '字段2',
        colProps: {
          span: 8
        },
        required: true,
        componentProps: {}
      },
      {
        field: 'field4',
        component: 'Select',
        label: '字段4',
        colProps: {
          span: 8
        },
        componentProps: {
          options: [
            {
              label: '选项1',
              value: '1',
              key: '1'
            },
            {
              label: '选项2',
              value: '2',
              key: '2'
            }
          ]
          // onKeydown: (e) => {
          //   debugger;
          //   console.log(e.target.form[3]);
          //   e.target.form[3].focus();
          // }
        }
      },
      {
        field: 'field41',
        component: 'ApiSelect',
        label: '海关字段',
        colProps: {
          span: 8
        },
        componentProps: () => {
          return {
            autofocus: false,
            showSearch: true,
            api: appCustomsApi,
            labelField: 'full_text',
            valueField: 'value',
            params: { cType: 'CIQ_ORIGIN_PLACE', parameters: params.value },
            resultField: 'data',
            immediate: true,
            onSearch: (val: string) => {
              params.value.filter = `["index","contains","-${val}"]`;
            },
            filterOption: false
          };
        }
      },
      {
        field: 'field5',
        component: 'CheckboxGroup',
        label: '字段5',
        colProps: {
          span: 8
        },
        componentProps: {
          options: [
            {
              label: '选项1',
              value: '1'
            },
            {
              label: '选项2',
              value: '2'
            }
          ]
        }
      },
      {
        field: 'field7',
        component: 'RadioGroup',
        label: '字段7',
        colProps: {
          span: 8
        },
        componentProps: {
          options: [
            {
              label: '选项1',
              value: '1'
            },
            {
              label: '选项2',
              value: '2'
            }
          ]
        }
      },
      {
        field: 'field8',
        component: 'RadioGroup',
        label: '字段8',
        colProps: {
          span: 8
        },
        componentProps: {
          options: [
            {
              label: '选项1',
              value: '1'
            },
            {
              label: '选项2',
              value: '2'
            }
          ]
        }
      }
    ];
  };

  const [register] = useForm({
    labelWidth: 120,
    schemas: getSchamas(),
    actionColOptions: {
      span: 24
    },
    compact: true,
    size: appSize == 'small' ? 'small' : 'default',
    showAdvancedButton: true,
    alwaysShowLines: 1
  });
  const items = ['1', '2', '3'];
  const params = ref({ Skip: 0, Take: 20, filter: '' });

  function cellTemplate(el, e) {
    //console.log(1);
    //return el;
    return Ez.RenderComponent(el, Button, { text: e.data.name });
  }
  function cellTemplate2(el, e) {
    //console.log(1);
    //return el;
    return Ez.RenderComponent(el, EzMore, {
      items: ['123', '234', '345'],
      onItemClick: function (item) {
        console.log(item);
        console.log(e);
      }
    });
  }
  const height = ref(0);
  const dataSource = ref({});
  loadDataSource();
  function loadDataSource() {
    const url = `/api/application`;
    dataSource.value = Ez.CreateStore({
      key: 'id',
      loadUrl: `${url}/list`,
      insertUrl: `${url}/create-dev`,
      updateUrl: `${url}/update-dev`,
      deleteUrl: `${url}/delete`
    });
  }

  function onInitNewRow(e) {
    e.data.enabled = true;
    e.data.isSeparated = false;
  }

  function test(el, e) {
    console.log(11111);
    console.log(el);
    console.log(e);
    e.refresh();
  }

  function alertNum() {
    alert('11');
  }

  onMounted(
    (window.onresize = function () {
      height.value = window.innerHeight - 200;
    })
  );
</script>
<style lang="less" scoped></style>
