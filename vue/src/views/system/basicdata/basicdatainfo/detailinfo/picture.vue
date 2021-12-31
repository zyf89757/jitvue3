<template>
  <div>
    <List :class="prefixCls">
      <a-row :gutter="16">
        <template v-for="item in list" :key="item.id">
          <a-col :span="6">
            <ListItem>
              <Card :hoverable="true" :class="`${prefixCls}__card`">
                <img :src="item.filePath" />
                <div :class="`${prefixCls}__card-content`">
                  <span>图片名称</span>{{ item.fileOriginName }}
                </div>
                <div :class="`${prefixCls}__card-content`">
                  <span>图片大小</span>{{ item.fileSizeKb }}
                </div>
                <Icon
                  :class="`${prefixCls}__card-preview`"
                  @click="preview(item, null)"
                  :icon="iconprestr"
                />
                <Icon
                  :class="`${prefixCls}__card-download`"
                  @click="handleDownloadByUrl(item, null)"
                  :icon="icondowstr"
                />
                <Icon
                  :class="`${prefixCls}__card-delete`"
                  @click="handledelete(item, null)"
                  :icon="icondelstr"
                />
              </Card>
            </ListItem>
          </a-col>
        </template>
      </a-row>
    </List>
  </div>
</template>
<script lang="ts">
  //引用组件
  import {
    computed,
    defineComponent,
    unref,
    ref,
    onMounted,
    reactive,
    nextTick,
    watchEffect
  } from 'vue';
  import { List, Card, Row, Col } from 'ant-design-vue';
  import { BasicUpload } from '/@/components/Upload';
  import { BasicPictureAsync, BasicFileDeleteAsync } from '../../api/basicdata';
  import { BasicPictureUploadAsync } from '/@/api/sys/upload';
  import Icon from '/@/components/Icon/index';
  import { downloadByUrl } from '/@/utils/file/download';
  import { Ez } from '/@/utils/devexpress';
  import { useRoute } from 'vue-router';

  export default defineComponent({
    name: 'Records',
    components: {
      List,
      ListItem: List.Item,
      Card,
      Icon,
      [Row.name]: Row,
      [Col.name]: Col
    },
    props: {
      activeKey: {
        type: String
      },
      clickName: {
        type: String
      },
      count: {
        type: Number
      },
      // eslint-disable-next-line vue/prop-name-casing
      Id: {
        type: String
      },
      onSubmitSuccess: {
        type: Function
      },
      onSubmitError: {
        type: Function
      }
    },
    setup(props, { emit }) {
      const route = ref(useRoute());

      //下载图片
      function handleDownloadByUrl(item, e) {
        let fileName = item.fileOriginName;
        Ez.DownloadFile('/api/certificate/attachment-download/' + item.id, fileName);
      }
      //删除
      function handledelete(item, e) {
        BasicFileDeleteAsync(item);
        getprojects();
      }
      //声明值
      const projectList = ref([]);
      const icondelstr = 'fluent:delete-24-regular';
      const icondowstr = 'ci:download';
      const iconprestr = 'fluent:picture-in-picture-24-regular';
      //加载值
      const getprojects = async () => {
        let returndata = await BasicPictureAsync({ id: route.value.params?.id.toString() });
        console.log(returndata);
        projectList.value = returndata.data;
      };

      //预览
      function preview(item, e) {
        debugger;
        Ez.PreviewFile('/api/service/file/preview?key=' + item.id);
      }
      watchEffect(() => {
        if ((unref(props.count) || 0) > 0) {
          switch (unref(props.clickName)) {
            case 'refresh':
              getprojects();
              break;
          }
        }
      });
      onMounted(() => {
        debugger;
        getprojects();
      });
      return {
        handleDownloadByUrl,
        handledelete,
        preview,
        prefixCls: 'center-project',
        list: projectList,
        icondelstr,
        icondowstr,
        iconprestr,
        BasicPictureUploadAsync,
        handleChange: getprojects
      };
    }
  });
</script>
<style lang="less">
  .center-project {
    &__card {
      width: 100%;

      .ant-card-body {
        padding: 0 0 24px 0;
      }

      img {
        width: 100%;
        height: 130px;
      }

      &-title {
        margin: 5px 10px;
        font-size: 16px;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.85);
      }

      &-content {
        margin: 5px 10px;
      }
      &-download {
        float: right;
        font-size: 20px !important;
        color: @primary-color;
      }
      &-delete {
        float: right;
        font-size: 20px !important;
        color: @primary-color;
      }
      &-preview {
        float: right;
        font-size: 20px !important;
        color: @primary-color;
      }
    }
  }
</style>
