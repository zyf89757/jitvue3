<template>
  <div style="width: 75%">
    <div class="titlediv">
      <a href="javascript:;" class="file"
        >上传文件
        <input type="file" name="uploadExcel" id="btnfile" @change="excelClick" />
        <a>{{ importName?.value }}</a>
      </a>
      <input type="button" id="saveExcel" value="导出" class="button" @click="saveExcel" />
      <a-button type="primary" class="okbutton" @click="oksub">发送</a-button>
      <a-button type="primary" class="rebutton" @click="resetsub">重置</a-button>
    </div>
      <div style="width: 100%">
      <div ref="ssHost" style="height: 650px; width: 85%; text-align: left"> </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { onMounted, ref, reactive, defineComponent } from 'vue';
  export default defineComponent({
    name: 'SpreadSheets'
  });
</script>
<script lang="ts" setup>
  import '@grapecity/spread-sheets/styles/gc.spread.sheets.excel2013white.css';
  import GC from '@grapecity/spread-sheets';
  import { IO } from '@grapecity/spread-excelio';
  import { useMessage } from '/@/hooks/web/useMessage';
  // np
  // import { spread } from 'lodash';
  import saveAs from 'file-saver';
  const ssHost = ref('');
  var workspread = ref();
  const spreadSheet = ref();
  const importName = ref();
  const fieldSelectOut = ref();
  const fieldRadioOut = ref();
  const bodyjumpmaxRow = ref();
  const bodyjumpCol = ref();
  const bodyjumpFieldNull = ref();
  const BodyList = reactive<object[]>([]);
  const BodyName = reactive<object[]>([]);
  const BodyJump = reactive<object[]>([]);
  const BodyInputName = ref();
  const InputArray = ref();
  const letterArray = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z'
  ];
  const { createMessage } = useMessage();
  const leftSheetValues = reactive<object[]>([]);
  const rightSheetValues = reactive<object[]>([]);
  const upSheetValues = reactive<object[]>([]);
  const downSheetValues = reactive<object[]>([]);
  const sendBody = reactive<object[]>([]);
  const arrBody = reactive<object[]>([]);
  const props = defineProps({
    formValues: {
      type: Object
    },
    addinputValues: {
      type: Object
    }
  });

  const emit = defineEmits([
    'getleft',
    'getright',
    'getup',
    'getdown',
    'getBodyArray',
    'getBodyName'
  ]);
  onMounted(() => {
    let spread = new GC.Spread.Sheets.Workbook(ssHost.value);
    let spreadNS = GC.Spread.Sheets;
    var sheet = spread.getActiveSheet();
    sheet.setValue(0, 1, '1234567');
    // let zortValue = [];
    workspread.value = spread;
    spreadSheet.value = sheet;
    spread.bind(spreadNS.Events.SelectionChanged, function (e, args) {
      console.log(e, 'tyiop');
      let selection = args.newSelections[0];
      console.log(selection, 'nmbv');
      let spreadNS = GC.Spread.Sheets;
      let spreadSheet = spread.getActiveSheet();
      console.log(props.formValues, 'jok');
      var propForm = props.formValues;
      if (propForm != null) {
        fieldSelectOut.value = propForm.fromCustomerName;
        fieldRadioOut.value = propForm.field2;
        bodyjumpCol.value = propForm.bodyinput1;
        bodyjumpmaxRow.value = propForm.bodyinput2;
        bodyjumpFieldNull.value = propForm?.bodyinput3;
        // console.log(fieldSelectOut, 'llll');

        if (fieldRadioOut.value == '左') {
          //左
          for (var i = 0; i < selection.rowCount; i++) {
            var leftValues = spreadSheet.getValue(
              selection.row + i,
              selection.col - 1,
              spreadNS.SheetArea.viewport,
              spreadNS.ValueType.richText
            );
            var leftTitle = spreadSheet.getValue(
              selection.row + i,
              selection.col,
              spreadNS.SheetArea.viewport,
              spreadNS.ValueType.richText
            );
            if (leftValues == null || leftTitle == null) {
              continue;
            }
            leftSheetValues.push({
              leftTitle: leftTitle,
              leftValues: leftValues,
              leftplace: letterArray[selection.col] + String(Number(selection.row + 1 + i)),
              leftrow: selection.row + i,
              leftcol: selection.col
            });
            console.log(leftSheetValues, '左数组值');
          }
        }
        if (fieldRadioOut.value == '右') {
          //右
          for (var i = 0; i < selection.rowCount; i++) {
            var rightValues = spreadSheet.getValue(
              selection.row + i,
              selection.col + 1,
              spreadNS.SheetArea.viewport,
              spreadNS.ValueType.richText
            );
            var rightTitle = spreadSheet.getValue(
              selection.row + i,
              selection.col,
              spreadNS.SheetArea.viewport,
              spreadNS.ValueType.richText
            );
            if (rightValues == null || rightTitle == null) {
              continue;
            }
            rightSheetValues.push({
              rightTitle: rightTitle,
              rightValues: rightValues,
              rightPlace: letterArray[selection.col] + String(Number(selection.row + 1 + i)),
              rightrow: selection.row + i,
              rightcol: selection.col
            });
            console.log(rightSheetValues, '右数组值');
          }
        }
        if (fieldRadioOut.value == '上') {
          //上
          for (var i = 0; i < selection.colCount; i++) {
            var upValues = spreadSheet.getValue(
              selection.row - 1,
              selection.col + i,
              spreadNS.SheetArea.viewport,
              spreadNS.ValueType.richText
            );
            var upTitle = spreadSheet.getValue(
              selection.row,
              selection.col + i,
              spreadNS.SheetArea.viewport,
              spreadNS.ValueType.richText
            );
            if (upValues == null || upTitle == null) {
              continue;
            }
            upSheetValues.push({
              upTitle: upTitle,
              upValues: upValues,
              upPlace: letterArray[selection.col + i] + String(Number(selection.row + 1)),
              uprow: selection.row,
              upcol: selection.col + i
            });
            console.log(upSheetValues, '上数组值');
          }
        }
        if (fieldRadioOut.value == '下') {
          //下
          for (var i = 0; i < selection.colCount; i++) {
            var downValues = spreadSheet.getValue(
              selection.row + 1,
              selection.col + i,
              spreadNS.SheetArea.viewport,
              spreadNS.ValueType.richText
            );
            var downTitle = spreadSheet.getValue(
              selection.row,
              selection.col + i,
              spreadNS.SheetArea.viewport,
              spreadNS.ValueType.richText
            );
            if (downValues == null || downTitle == null) {
              continue;
            }
            downSheetValues.push({
              downTitle: downTitle,
              downValues: downValues,
              downPlace: letterArray[selection.col + i] + String(Number(selection.row + 1)),
              downrow: selection.row,
              downcol: selection.col + i
            });
            console.log(downSheetValues, '下数组值');
          }
        }

        if (fieldSelectOut.value == '核对清单表体') {
          if (bodyjumpFieldNull.value == true) {
            var addinput = Number(props.addinputValues);
            for (var i = 1; i <= addinput; i++) {
              BodyInputName.value = Object('jump' + i + 'a');
              Object.entries(propForm).forEach((key, b, z) => {
                // window.console.log(key);
                // window.console.log(b);
                // window.console.log(z);
                InputArray.value = z;
              });
              BodyJump.push({
                Name: InputArray.value[3 + i][0],
                Values: InputArray.value[3 + i][1]
              });
              // BodyJump.push({
              //   Name: JumpFieldNull,
              // });
              // console.log(JumpFieldNull, 'True长度');
            }
            console.log(BodyJump, 'True长度');
          }
          let startRow = selection.row;
          let maxRow = bodyjumpmaxRow.value - (startRow + 1);
          let colCount = selection.colCount;
          let allJump = bodyjumpCol.value - startRow;
          // let rowCount = selection.rowCount;
          for (var k = 1; k <= maxRow; k++) {
            for (var j = 0; j < colCount; j++) {
              //跳过行数;
              if (allJump - 1 == k) {
                console.log(k, 'K值');
                continue;
              }
              //取坐标
              var coodvalue = letterArray[selection.col + j] + String(Number(selection.row + 1));
              //取值
              var anyvalues = spreadSheet.getValue(
                selection.row + k,
                selection.col + j,
                spreadNS.SheetArea.viewport,
                spreadNS.ValueType.richText
              );
              //取名称
              if (k >= 1) {
                var Namevalues = spreadSheet.getValue(
                  selection.row,
                  selection.col + j,
                  spreadNS.SheetArea.viewport,
                  spreadNS.ValueType.richText
                );
                if (k == 1) {
                  BodyName.push({
                    Name: Namevalues,
                    Place: coodvalue
                  });
                }
                // console.log(BodyName, 'Name');
              }
              BodyList.push({
                Value: anyvalues,
                ['Value' + k]: k,
                Name: Namevalues
              });
              // console.log(anyvalues, 'List');
            }
          }
          var bolenght = BodyList.length;
          let lineNum = bolenght % 3 == 0 ? bolenght / 3 : Math.floor(bolenght / 3 + 1);
          console.log(lineNum);
          for (let i = 0; i < lineNum; i++) {
            let temp = BodyList.slice(i * colCount, i * colCount + colCount);
            sendBody.push(JSON.parse(JSON.stringify(temp)));
          }
          console.log(sendBody, 'L数组');
          var checkLength = BodyJump?.length;
          var nameLength = BodyName?.length;
          if (checkLength != 0) {
            var j = 0;
            for (j = 0; j <= nameLength; j++) {}
            sendBody.forEach((value, index) => {
              if (value.Name == BodyJump[j]) {
                var obj = value.filter((item) => item.Value == null);
              }
              if (obj.length == 0) {
                arrBody.push(value);
              }
            });
            console.log(arrBody);
          }
        }
      }
    });
  });
  function excelClick(e) {
    console.log(e.target.value, '2');
    console.log(letterArray, '----$56');
    let file = e.target.value;
    let fileName = file.substring(file.lastIndexOf('\\') + 1, file.lastIndexOf('.'));
    importName.value = fileName;
    console.log(fileName, '11111');
    let fileFormat = file.substring(file.lastIndexOf('.'));
    if (fileFormat != '.xlsx' && fileFormat != '.xlx') {
      createMessage.warning('您上传的文件格式不正确');
    }
    console.log(fileName, '名称');
    console.log(e, 'Jink');

    let importExcelFile = e.target.files[0];
    let excelIo = new IO();
    let excelFile = importExcelFile;
    excelIo.open(
      excelFile,
      function (json) {
        let workbookObj = json;
        workspread.value.fromJSON(workbookObj);
      },
      function (e) {
        alert(e.errorMessage);
      }
    );
  }
  function oksub() {
    // let ouForm = props.formValues;
    if (fieldSelectOut.value == null) {
      createMessage.warning('请先选择表格位置');
    }
    if (fieldSelectOut.value == '表头' && fieldRadioOut.value == null) {
      createMessage.warning('请先选择单选框方向');
    }
    if (fieldRadioOut.value != null) {
      console.log(fieldSelectOut.value, '值');
      emit('getleft', leftSheetValues);
      leftSheetValues.length = 0;
      emit('getright', rightSheetValues);
      rightSheetValues.length = 0;
      emit('getup', upSheetValues);
      upSheetValues.length = 0;
      emit('getdown', downSheetValues);
      downSheetValues.length = 0;
    }
    if (fieldSelectOut.value == '核对清单表体') {
      if (bodyjumpmaxRow.value == null) {
        createMessage.warning('请输入最大行数');
        return;
      }
      console.log(fieldSelectOut.value, '下拉');
      console.log(arrBody, '发送');
      if (sendBody.length > 0) {
        emit('getBodyArray', sendBody);
      } else if (arrBody.length > 0) {
        emit('getBodyArray', arrBody);
      }
      emit('getBodyName', BodyName);

      console.log(arrBody, '发送外部');
    }
  }
  function saveExcel() {
    let spread = workspread.value;
    let excelIo = new IO();
    let fileName = importName.value;
    let json = spread.toJSON();
    // here is excel IO API
    excelIo.save(
      json,
      function (blob) {
        saveAs(blob, fileName);
      },
      function (e) {
        // process error
        console.log(e);
      }
    );
  }
  function resetsub() {
    leftSheetValues.length = 0;
    rightSheetValues.length = 0;
    upSheetValues.length = 0;
    downSheetValues.length = 0;
    sendBody.length = 0;
    console.log(downSheetValues, '清空值');
  }
</script>
<style>
  .file {
    position: relative;
    display: inline-block;
    background: #d0eeff;
    border: 1px solid #99d3f5;
    border-radius: 4px;
    padding: 8px 20px;
    overflow: hidden;
    color: #1e88c7;
    text-decoration: none;
    text-indent: 0;
    line-height: 20px;
  }

  .radioFu {
    margin-left: 10px;
  }
  .abutton {
    margin-left: 80%;
  }
  .div1 {
    background-color: rosybrown;
    width: 35%;
    height: 650px;
    margin-left: 60%;
    margin-top: -650px;
  }
  .bta {
    margin-left: 10px;
    padding-right: 20px;
  }
  .select {
    border: darkgray;
    width: 300px;
    margin-top: 30px;
    margin-left: 15px;
    height: 30px;
  }
  .div2 {
    margin-top: 15px;
  }
  .file input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
  }
  .file:hover {
    background: #aadffd;
    border-color: #78c3f3;
    color: #004974;
    text-decoration: none;
  }
  .rebutton {
    background-color: darkgrey;
    border-color: darkgrey;
    float: right;
  }
  .okbutton {
    /* margin-left: 730px;
    margin-top  : -200px; */
    float: right;
  }
  .titlediv {
    width: 85%;
    height: 40px;
  }
</style>
