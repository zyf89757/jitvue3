<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    title="系统应用选择"
    height="auto"
    placement="top"
  >
    <div :class="`${prefixCls}__content`">
      <a-list>
        <a-row :gutter="16">
          <template v-for="item in list" :key="item.id">
            <div class="md:w-1/3 lg:w-1/4 xs:w-1/2 app-list">
              <a-list-item :class="applicationId == item.id ? 'checked' : ''">
                <a-card :hoverable="true" :class="`${prefixCls}__card`" @click="handleSubmit(item)">
                  <div :class="`${prefixCls}__card-title`">
                    <Icon class="icon" v-if="item.icon" :icon="item.icon" :color="item.color" />
                    {{ item.name }}
                    <Icon
                      class="icon icon-checked"
                      v-if="applicationId == item.id"
                      icon="ant-design:check-circle-outlined"
                    />
                  </div>
                  <div :class="`${prefixCls}__card-detail`">
                    {{ item.description }}
                  </div>
                </a-card>
              </a-list-item>
            </div>
          </template>
        </a-row>
      </a-list>
    </div>
  </BasicDrawer>
</template>

<script lang="ts">
  import { defineComponent, computed, unref, ref, watchEffect } from 'vue';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { Card, Row, Col, List } from 'ant-design-vue';
  import { useUserStore } from '/@/store/modules/user';

  export default defineComponent({
    name: 'AppDrawer',
    components: {
      BasicDrawer,
      [Card.name]: Card,
      [List.name]: List,
      [List.Item.name]: List.Item,
      [Row.name]: Row,
      [Col.name]: Col
    },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async () => {
        setDrawerProps({ confirmLoading: false });
        // 需要在setFieldsValue之前先填充treeData，否则Tree组件可能会报key not exist警告
      });
      async function handleSubmit(app) {
        await emit('success', app);
        closeDrawer();
      }
      //从用户上下文中获取用户授权的系统应用列表
      const userStore = useUserStore();
      const userInfo = computed(() => userStore.getUserInfo);
      const cardList = unref(userInfo).allowApplications;
      let applicationId = ref(unref(userInfo).applicationId);
      watchEffect(() => {
        applicationId.value = unref(userInfo).applicationId;
      });
      return {
        prefixCls: 'list-card',
        list: cardList,
        applicationId,
        registerDrawer,
        handleSubmit
      };
    }
  });
</script>
<style lang="less" scoped>
  .jit-basic-drawer .ant-drawer-body .scrollbar__wrap {
    padding: 0 16px 16px 16px !important;
    margin-bottom: 0 !important;
  }

  .app-list {
    margin-top: -6px;
    margin-bottom: 8px;

    li {
      margin-right: 5px;
      padding-top: 0;
    }
  }

  .checked .ant-card-bordered {
    border: 1px solid rgba(77, 175, 27, 0.79);
  }

  .icon-checked {
    float: right;
    color: rgba(77, 175, 27, 0.79);
  }

  .list-card {
    &__link {
      margin-top: 10px;
      font-size: 14px;

      a {
        margin-right: 30px;
      }

      span {
        margin-left: 5px;
      }
    }

    &__card {
      width: 100%;
      margin-bottom: -8px;

      .ant-card-body {
        padding: 16px;
      }

      &-title {
        margin-bottom: 5px;
        font-size: 16px;
        font-weight: 500;
        color: @text-color;

        .icon {
          margin-top: -5px;
          margin-right: 10px;
          font-size: 38px !important;
        }
      }

      &-detail {
        padding-top: 10px;
        padding-left: 30px;
        font-size: 14px;
        color: @text-color-secondary;
      }
    }
  }
</style>
