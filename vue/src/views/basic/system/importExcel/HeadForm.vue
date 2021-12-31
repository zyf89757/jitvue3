<template>
  <div class="divbig">
    <div class="formdiv">
      <a-button type="primary" class="subButton" @click="funct">保存</a-button>
      <a-button type="primary" class="subButton" @click="insub">入库</a-button>
      <div class="sonform">
        <BasicForm @register="register" class="formvbok">
          <template #add="{ field }">
            <a-button v-if="Number(field) === 0" @click="add" type="primary">启用</a-button>
            <a-button v-if="field > 0" @click="del(field)" type="primary">-</a-button>
          </template>
        </BasicForm>
      </div>
    </div>
    <SpreadSheets
      :formValues="formValues"
      :addinputValues="addinputValues"
      @getleft="getleft"
      @getright="getright"
      @getup="getup"
      @getdown="getdown"
      @getBodyArray="getBodyArray"
      @getBodyName="getBodyName"
    />
  </div>
  <div style="margin-top: 300px">
    <EzTable
      ref-name="HeadForm"
      title="表体"
      :height="300"
      :page-size="10"
      :edit-mode="'batch'"
      :toolbar="[]"
      :data-source="dataSource"
      :show-more="true"
      :more-items="[]"
      :cell-template="statusTemplate"
      class="eztable"
    >
      <DxColumn data-field="roleId" caption="项号" width="180px">
        <DxRequiredRule />
      </DxColumn>
      <DxColumn data-field="backId" caption="备案序号" width="180px">
        <DxRequiredRule />
      </DxColumn>
      <DxColumn data-field="sorckId" caption="商品编号" width="180px">
        <DxRequiredRule />
      </DxColumn>
      <DxColumn data-field="JokId" caption="检验检疫编码" width="180px">
        <DxRequiredRule />
      </DxColumn>
      <DxColumn data-field="ShopName" caption="商品名称" width="180px">
        <DxRequiredRule />
      </DxColumn>
      <!-- <DxColumn data-field="roleId" caption="规格型号" width="180px">
        <DxRequiredRule />
      </DxColumn>
      <DxColumn data-field="roleId" caption="成交数量" width="180px">
        <DxRequiredRule />
      </DxColumn>
      <DxColumn data-field="roleId" caption="成交计量单位" width="180px">
        <DxRequiredRule />
      </DxColumn>
      <DxColumn data-field="roleId" caption="单价" width="180px">
        <DxRequiredRule />
      </DxColumn>
      <DxColumn data-field="roleId" caption="总价" width="180px">
        <DxRequiredRule />
      </DxColumn>
      <DxColumn data-field="roleId" caption="币制" width="180px">
        <DxRequiredRule />
      </DxColumn>
      <DxColumn data-field="roleId" caption="法定第一数量" width="180px">
        <DxRequiredRule />
      </DxColumn>
      <DxColumn data-field="roleId" caption="法定第一计量单位" width="180px">
        <DxRequiredRule />
      </DxColumn>
      <DxColumn data-field="roleId" caption="加工成品版本号" width="180px">
        <DxRequiredRule />
      </DxColumn>
      <DxColumn data-field="roleId" caption="最终目的国（地区）" width="180px">
        <DxRequiredRule />
      </DxColumn>
      <DxColumn data-field="roleId" caption="法定第二数量" width="180px">
        <DxRequiredRule />
      </DxColumn> -->
    </EzTable>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'HeadForm',
    components: { BasicForm, SpreadSheets, EzTable }
  });
</script>

<script lang="ts" setup>
  import { ref, unref, reactive, onMounted } from 'vue';
  import { EzTable } from '/@/components/EzControls/EzTable';
  import { DxColumn, DxRequiredRule } from 'devextreme-vue/data-grid';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
  import { useAppStore } from '/@/store/modules/app';
  import { defHttp } from '/@/utils/http/axios';
  import { empMappingGroupApi } from '/@/api/sys/upfile';
  import SpreadSheets from '/@/components/SpreadSheets/SpreadSheets.vue';
  const options = ref<Recordable[]>([]);
  const sheetArrayValues = reactive<object[]>([]);
  const sheetTableValues = reactive<object[]>([]);
  const inserDbList = reactive<object[]>([]);
  const formValues = ref();
  const addinputValues = ref();
  const dataSource = ref();
  const seleFormValue = ref();
  const seleBodyValue = ref();
  const SeleValues = ref();
  const SeleId = ref();
  const schemas: FormSchema[] = [
    {
      field: 'divider-basic',
      component: 'Divider',
      label: '导入模板'
    },
    {
      field: 'field1',
      component: 'ApiSelect',
      label: '表格位置',
      rules: [{ required: true }],
      componentProps: ({ formModel }) => {
        return {
          api: empMappingGroupApi,
          resultField: 'data',
          labelField: 'text',
          valueField: 'value',
          showSearch: true,
          immediate: true,
          onChange: (e, target) => {
            console.log(e);
            console.log(target);
            formModel.fromCustomerName = target.label;

            if (target.label == '核对清单表头') {
              SeleId.value = e;
              SeleValues.value = target.label;
              console.log(1, SeleValues.value);
              seleFormValue.value = 1;
              seleBodyValue.value = 0;
            }
            if (target.label == '核对清单表体') {
              SeleId.value = e;
              SeleValues.value = target.label;
              console.log(2, SeleValues.value);
              seleFormValue.value = 0;
              seleBodyValue.value = 1;
            }
          }
        };
      },
      colProps: {
        span: 12
      }
    },
    // onChange: (e: any) => {
    //         seleFormValue.value = e;
    //         if (e == '表头') {
    //           seleFormValue.value = 1;
    //           seleBodyValue.value = 0;
    //         } else {
    //           seleFormValue.value = 0;
    //           seleBodyValue.value = 1;
    //         }
    //       }
    {
      field: 'field2',
      component: 'RadioGroup',
      label: '值位置',
      colProps: {
        span: 24
      },
      componentProps: {
        options: [
          {
            label: '上',
            value: '上'
          },
          {
            label: '下',
            value: '下'
          },
          {
            label: '左',
            value: '左'
          },
          {
            label: '右',
            value: '右'
          }
        ]
      },
      show: ({ values }) => {
        return (values.type = seleFormValue.value);
      }
    },
    {
      field: 'input1',
      component: 'Input',
      label: '进出口标识',
      colProps: {
        span: 24
      },
      ifShow: true,
      show: ({ values }) => {
        return (values.type = seleFormValue.value);
      }
      // ifShow: (setFormState.value == '1', false),
      // ifShow: () => {
      //   return setFormState.value == 'HiddenForm';
      // },
    },
    {
      field: 'input2',
      component: 'Input',
      label: '进/出口日期',
      colProps: {
        span: 24
      },
      show: ({ values }) => {
        return (values.type = seleFormValue.value);
      }
    },
    {
      field: 'input3',
      component: 'Input',
      label: '境外发货人代码',
      colProps: {
        span: 24
      },
      show: ({ values }) => {
        return (values.type = seleFormValue.value);
      }
    },
    {
      field: 'input4',
      component: 'Input',
      label: '消费使用单位代码',
      colProps: {
        span: 24
      },
      show: ({ values }) => {
        return (values.type = seleFormValue.value);
      }
    },
    {
      field: 'input5',
      component: 'Input',
      label: '运输方式',
      colProps: {
        span: 24
      },
      show: ({ values }) => {
        return (values.type = seleFormValue.value);
      }
    },
    {
      field: 'input6',
      component: 'Input',
      label: '商品序号',
      colProps: {
        span: 24
      },
      show: ({ values }) => {
        return (values.type = seleFormValue.value);
      }
    },
    {
      field: 'input7',
      component: 'Input',
      label: '列名',
      colProps: {
        span: 24
      },
      show: ({ values }) => {
        return (values.type = seleFormValue.value);
      }
    },
    {
      field: 'input8',
      component: 'Input',
      label: '发货单',
      colProps: {
        span: 24
      },
      show: ({ values }) => {
        return (values.type = seleFormValue.value);
      }
    },
    {
      field: 'input9',
      component: 'Input',
      label: '收货单',
      colProps: {
        span: 24
      },
      show: ({ values }) => {
        return (values.type = seleFormValue.value);
      }
    },
    {
      field: 'input10',
      component: 'Input',
      label: 'B/L号',
      colProps: {
        span: 24
      },
      show: ({ values }) => {
        return (values.type = seleFormValue.value);
      }
    },
    {
      field: 'input11',
      component: 'Input',
      label: '发货人',
      colProps: {
        span: 24
      },
      show: ({ values }) => {
        return (values.type = seleFormValue.value);
      }
    },
    //表体
    {
      field: 'bodyinput1',
      component: 'Input',
      label: '跳过行数',
      colProps: {
        span: 12
      },
      show: ({ values }) => {
        return (values.type = seleBodyValue.value);
      }
    },
    {
      field: 'bodyinput2',
      component: 'Input',
      label: '最大行数',
      colProps: {
        span: 12
      },
      show: ({ values }) => {
        return (values.type = seleBodyValue.value);
      }
    },
    {
      field: 'bodyinput3',
      component: 'Input',
      label: '跳过空行字段',
      colProps: {
        span: 8
      },
      show: ({ values }) => {
        return (values.type = seleBodyValue.value);
      },
      slot: 'add'
    },
    {
      field: '0',
      component: 'Input',
      label: '',
      colProps: {
        span: 8
      },
      show: ({ values }) => {
        return (values.type = seleBodyValue.value);
      },
      slot: 'add'
    }
  ];
  // function Onchange() {
  //   console.log(chvaluedata.value.field1, '下拉');
  // }
  const ayyayTable = reactive<object[]>([]);
  console.log(options.value, '+++');
  const chvaluedata = ref();
  const appSize = useAppStore().getAppSize;
  const [register, { getFieldsValue, setFieldsValue, appendSchemaByField, removeSchemaByFiled }] =
    useForm({
      labelWidth: 120,
      schemas: schemas,
      actionColOptions: {
        span: 24
      },
      size: appSize.toString() == 'small' ? 'small' : 'default',
      showResetButton: false,
      showSubmitButton: false,
      autoSetPlaceHolder: true
    });

  function getleft(leftSheetValues) {
    if (leftSheetValues.length < 0) {
      return;
    } else {
      for (var i = 0; i < leftSheetValues.length; i++) {
        let Title = leftSheetValues[i].leftTitle;
        let Values = leftSheetValues[i].leftValues;
        let place = leftSheetValues[i].leftplace;
        let row = leftSheetValues[i].leftrow;
        let col = leftSheetValues[i].leftcol;
        sheetArrayValues.push({
          Title: Title,
          Values: Values,
          place: place,
          Area: '左',
          row: row,
          col: col
        });
      }
    }
    leftSheetValues.length = 0;
    console.log(sheetArrayValues, '左值');
    // console.log(setFormState.value, '状态');
  }
  function getright(rightSheetValues) {
    if (rightSheetValues.length < 0) {
      return null;
    } else {
      for (var i = 0; i < rightSheetValues.length; i++) {
        let Title = rightSheetValues[i].rightTitle;
        let Values = rightSheetValues[i].rightValues;
        let place = rightSheetValues[i].rightPlace;
        let row = rightSheetValues[i].rightrow;
        let col = rightSheetValues[i].rightcol;
        sheetArrayValues.push({
          Title: Title,
          Values: Values,
          place: place,
          Area: '右',
          row: row,
          col: col
        });
      }
      rightSheetValues.length = 0;
      console.log(sheetArrayValues, '右值');
    }
  }
  function getup(upSheetValues) {
    if (upSheetValues.length < 0) {
      return;
    } else {
      for (var i = 0; i < upSheetValues.length; i++) {
        let Title = upSheetValues[i].upTitle;
        let Values = upSheetValues[i].upValues;
        let place = upSheetValues[i].upPlace;
        let row = upSheetValues[i].uprow;
        let col = upSheetValues[i].upcol;
        sheetArrayValues.push({
          Title: Title,
          Values: Values,
          place: place,
          Area: '上',
          row: row,
          col: col
        });
      }
      upSheetValues.length = 0;
      console.log(sheetArrayValues, '上值');
    }
  }
  function getdown(downSheetValues) {
    if (downSheetValues.length < 0) {
      return;
    } else {
      for (var i = 0; i < downSheetValues.length; i++) {
        let Title = downSheetValues[i].downTitle;
        let Values = downSheetValues[i].downValues;
        let place = downSheetValues[i].downPlace;
        let row = downSheetValues[i].downrow;
        let col = downSheetValues[i].downcol;
        sheetArrayValues.push({
          Title: Title,
          Values: Values,
          place: place,
          Area: '下',
          row: row,
          col: col
        });
      }
      downSheetValues.length = 0;

      console.log(sheetArrayValues, '总值');
    }
  }
  function getBodyArray(arrBody) {
    console.log(arrBody, 'kkk');
    if (arrBody.length < 0) {
      return;
    } else {
      for (var i = 0; i < arrBody.length; i++) {
        let One = arrBody[i][0]?.Value;
        let Two = arrBody[i][1]?.Value;
        let Three = arrBody[i][2]?.Value;
        let Four = arrBody[i][3]?.Value;
        let Five = arrBody[i][4]?.Value;
        sheetTableValues.push({
          One: One,
          Two: Two,
          Three: Three,
          Four: Four,
          Five: Five
        });
      }
      console.log(sheetTableValues, '子组件表格数据');
    }
  }
  function getBodyName(BodyName) {
    console.log(BodyName, 'Table名称');
    var nameLenght = BodyName.length;
    for (var i = 0; i < nameLenght; i++) {
      appendSchemaByField(
        {
          field: `Name${i}a`,
          component: 'Input',
          label: BodyName[i].Name,
          colProps: {
            span: 15
          },
          required: true
        },
        ''
      );
      const field = unref('Name' + i + 'a');
      setFieldsValue({
        [field]: BodyName[i].Place
      });
    }
  }
  function statusTemplate(el, e) {
    console.log(el, 'Sta1');
    console.log(e, 'Sta2');
  }
  function funct() {
    chvaluedata.value = getFieldsValue();
    formValues.value = chvaluedata.value;
    // let formSelect = chvaluedata.value;
    // console.log(chvaluedata.formCustomerName, 'Change');
    if (SeleValues.value == '核对清单表头') {
      console.log(schemas, 'From表单');
    }
    for (var i = 0; i < schemas.length; i++) {
      let labelName = schemas[2 + i]?.label;
      let infield = ref(schemas[2 + i]?.field);
      for (var j = 0; j < sheetArrayValues.length; j++) {
        debugger;
        let sheetName = sheetArrayValues[j]?.Title;
        let sheetValues = sheetArrayValues[j]?.Values;
        let sheetPlace = sheetArrayValues[j]?.place;
        if (labelName == sheetName) {
          console.log(
            sheetValues,
            '+++',
            sheetName,
            '---',
            sheetArrayValues.length,
            '长度',
            sheetArrayValues,
            '数组'
          );
          const field = unref(infield);
          setFieldsValue({
            [field]: sheetValues + '坐标' + sheetPlace
          });
        }
      }
    }
    if (sheetTableValues.length != 0) {
      for (var i = 0; i < sheetTableValues.length; i++) {
        let roleid = sheetTableValues[i]?.One;
        let backid = sheetTableValues[i]?.Two;
        let sorckid = sheetTableValues[i]?.Three;
        let JokId = sheetTableValues[i]?.Four;
        let ShopName = sheetTableValues[i]?.Five;
        ayyayTable.push({
          roleId: roleid,
          backId: backid,
          sorckId: sorckid,
          JokId: JokId,
          ShopName: ShopName
        });
      }
      console.log(ayyayTable, 'Table-ttt');
      dataSource.value = ayyayTable;
    }
  }
  const n = ref(1);
  function add() {
    setFieldsValue({
      bodyinput3: true
    });
    appendSchemaByField(
      {
        field: `jump${n.value}a`,
        component: 'Input',
        label: '字段' + n.value,
        colProps: {
          span: 15
        },
        required: true
      },
      ''
    );
    appendSchemaByField(
      {
        field: `${n.value}`,
        component: 'Input',
        label: ' ',
        colProps: {
          span: 8
        },
        slot: 'add'
      },
      ''
    );
    n.value++;
    addinputValues.value = n.value - 1;
    console.log(addinputValues.value, '变化++');
  }
  function del(field) {
    if (addinputValues.value > 1) {
      removeSchemaByFiled([`jump${field}a`, `jump${field}b`, `${field}`]);
      n.value--;
      addinputValues.value--;
    }

    console.log(addinputValues.value, '变化-');
  }
  function insub() {
    console.log(SeleId.value, 'id');
    console.log(SeleValues, '名称');
    console.log(schemas, '表单');
    console.log(sheetArrayValues, '表头数据');
    var dataindex = sheetArrayValues.length;
    var propertyindex = schemas.length;
    for (var i = 3; i <= propertyindex; i++) {
      var propName = schemas[i]?.label;
      for (var j = 0; j <= dataindex; j++) {
        var mappingName = sheetArrayValues[j]?.Title;
        if (propName == mappingName) {
          inserDbList.push({
            fromMapGroupId: SeleId.value,
            templateName: '核对清单模板',
            propertyName: propName,
            mappingName: mappingName,
            rowIndex: sheetArrayValues[j]?.row,
            columnIndex: sheetArrayValues[j]?.col,
            pageIndex: i,
            remark: '测试' + i
          });
          continue;
        }
      }
    }
    defHttp.post({ url: '/api/Mapping/create', params: inserDbList });
    inserDbList.length = 0;
    console.log(inserDbList, '12');
  }
  // `${field}`
  onMounted(() => {
    // dataSource.value = ayyayTable;
    // console.log(dataSource.value, '表');
    // getBodyArray();
  });
</script>
<style>
  .formdiv {
    width: 35%;
    float: right;
    margin: 0 auto;
  }
  .formvbok {
    height: 600px;
    overflow: auto;
  }
  .subButton {
    margin-left: 370px;
  }
  .eztable {
    margin-top: -200px;
    /* margin: 0 auto; */
  }
  .sonform {
    height: 500px;
    margin: 0 auto;
  }
</style>
