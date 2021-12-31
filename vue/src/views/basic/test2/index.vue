<template>
  <PageWrapper>
    <EzForm :title="'123'" :leftToolbar="[]" />
  </PageWrapper>
  {{ register }}
</template>

<script lang="ts" setup>
  import { FormSchema, useForm } from '/@/components/EzControls/EzSearchForm/index';

  import { PageWrapper } from '/@/components/EzControls/EzPage';
  import { useAppStore } from '/@/store/modules/app';

  import { EzForm } from '/@/components/EzControls/EzForm';

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
        componentProps: {}
      },
      {
        field: 'field3',
        component: 'DatePicker',
        label: '字段3',
        colProps: {
          span: 8
        },
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
    size: appSize.toString() == 'small' ? 'small' : 'default',
    showAdvancedButton: true,
    alwaysShowLines: 1
  });
</script>
<style lang="less" scoped></style>
