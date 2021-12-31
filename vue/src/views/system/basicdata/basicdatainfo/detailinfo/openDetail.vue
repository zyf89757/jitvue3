<template>
  <BasicModal v-bind="$attrs" @register="register" title="商品规范申报" @ok="handlevalidate">
    <!-- @visible-change="handleVisibleChange" -->
    <div class="pt-3px pr-3px">
      <BasicForm @register="registerForm" />
    </div>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, nextTick, onMounted } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
  import { useAppStore } from '/@/store/modules/app';
  import { HscodeDetailAsync } from '../../api/basicdata';
  import { kMaxLength } from 'buffer';

  const schemas: FormSchema[] = [
    {
      field: 'rule',
      component: 'RadioGroup',
      label: '反填规则',
      colProps: {
        span: 24
      },
      componentProps: {
        options: [
          {
            label: '税号',
            value: '税号'
          },
          {
            label: 'GTIN',
            value: 'GTIN'
          },
          {
            label: '汽车零件号',
            value: '汽车零件号'
          },
          {
            label: 'GAS',
            value: 'GAS'
          }
        ]
      },
      defaultValue: '税号',
      required: true
    },
    {
      field: 'info',
      component: 'Input',
      label: '商品信息',
      colProps: {
        span: 24
      },
      dynamicDisabled: true
    },
    {
      field: 'divider-basic',
      //展示效果是分割，类别
      component: 'Divider',
      label: '规格型号(根据海关规定,以下要素全部填报)',
      colProps: {
        span: 24
      }
    }
  ];

  export default defineComponent({
    components: { BasicModal, BasicForm },
    props: {
      data: { type: Object }
    },
    setup(props, { emit }) {
      const appSize = useAppStore().getAppSize;
      //申报字段
      const removeName = ref(['applyrule']);
      const [
        registerForm,
        {
          validate,
          getFieldsValue,
          resetFields,
          setFieldsValue,
          appendSchemaByField,
          removeSchemaByFiled
        }
      ] = useForm({
        schemas,
        labelWidth: 120,
        actionColOptions: {
          span: 24
        },
        size: appSize.toString() == 'small' ? 'small' : 'default',
        showResetButton: false,
        showSubmitButton: false,
        autoSetPlaceHolder: true
      });
      const [register] = useModalInner((data) => {
        console.log('detailreceive' + data.data);
        setFieldsValue({
          info: data.data.gname
        });
        data && onDataReceive(data.data.codeTs);
      });

      async function onDataReceive(data) {
        console.log('detailData Received', data);
        removeName.value.forEach((item, index) => {
          debugger;
          removeSchemaByFiled(`${item}`);
        });
        init(data);
      }

      async function handlevalidate() {
        console.log('handlevalidate');
        const values = await validate();
        let info = values['applyrule'];
        // for (let k in values) {
        //   info = info + '|' + values[k];
        //   console.log(values[k]);
        // }
        emit('handelDetailOk', info);
      }

      function handleVisibleChange(v) {
        v && props.data && nextTick(() => onDataReceive(props.data));
      } //初始化form，table
      const init = async (data) => {
        let col = 'divider-basic';
        let returndata = await HscodeDetailAsync({ hscode: data });
        debugger;

        returndata.forEach((item: never[], i) => {
          //获得临时的填充字段，点击确定按钮要remove
          removeName.value.push(`${item['textName']}`);
          //下拉
          if (item['decFacCode'] != null && item['decFacCode'].length > 0) {
            const names = ref([]);
            names.value = item['decFacContent'].split('|');
            const options = ref([
              {
                label: '选项1',
                value: '1',
                key: '1'
              }
            ]);
            names.value.forEach((item: never[], i) => {
              options.value[i] = {
                label: `${item}`,
                value: `${i}`,
                key: `${i}`
              };
            });
            appendSchemaByField(
              {
                field: `${item['textName']}`,
                component: 'Select',
                label: `${item['textName']}`,
                colProps: {
                  span: 24
                },
                componentProps: ({ formModel, formActionType }) => {
                  return {
                    options: options.value,
                    // onChange: (e, target) => {
                    //   debugger;
                    //   const formvalues = getFieldsValue();
                    //   let info = '';
                    //   for (let k in formvalues) {
                    //     if (removeName.value.indexOf(k) > 0) {
                    //       if (info.length > 0) {
                    //         info = info + '|' + formvalues[k];
                    //       } else {
                    //         info = info + formvalues[k];
                    //       }
                    //     }
                    //   }
                    //   setFieldsValue({
                    //     applyrule: info
                    //   });
                    //   console.log('表单变更事件' + e);
                    // }
                    onblur: (e: any, target: string) => {
                      debugger;
                      const formvalues = getFieldsValue();
                      let info = '';
                      for (let k in formvalues) {
                        if (removeName.value.indexOf(k) > 0) {
                          if (info.length > 0) {
                            info = info + '|' + formvalues[k];
                          } else {
                            info = info + formvalues[k];
                          }
                        }
                      }
                      setFieldsValue({
                        applyrule: info
                      });
                      console.log('表单变更事件' + e.target.value);
                    }
                  };
                },
                required: item['requireCheck'].trim() == '1' ? true : false
              },
              col
            );
            col = `${item['textName']}`;
          } else {
            appendSchemaByField(
              {
                field: `${item['textName']}`,
                component: 'Input',
                label: `${item['textName']}`,
                colProps: {
                  span: 24
                },
                componentProps: ({ formModel, formActionType }) => {
                  return {
                    onblur: (e: any, target: string) => {
                      debugger;
                      const formvalues = getFieldsValue();
                      let info = '';
                      for (let k in formvalues) {
                        if (removeName.value.indexOf(k) > 0) {
                          if (info.length > 0) {
                            info = info + '|' + formvalues[k];
                          } else {
                            info = info + formvalues[k];
                          }
                        }
                      }
                      setFieldsValue({
                        applyrule: info
                      });
                      console.log('表单变更事件' + e.target.value);
                    }
                  };
                },
                required: item['requireCheck'].trim() == '1' ? true : false
              },
              col
            );
            col = `${item['textName']}`;
          }
        });
        //申报规格字段
        appendSchemaByField(
          {
            field: `applyrule`,
            component: 'InputTextArea',
            label: `申报规格`,
            componentProps: {
              showCount: true,
              maxLength: 1000
            },
            colProps: {
              span: 24
            }
          },
          col
        );
      };
      // setInterval(init, 3000);
      onMounted(() => {
        debugger;
        console.log('onMounted');
        init(props.data);
      });
      return {
        register,
        validate,
        registerForm,
        handlevalidate,
        handleVisibleChange
      };
    }
  });
</script>
