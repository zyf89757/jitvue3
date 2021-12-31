<template>
  <div
    class="modules"
    :class="compSize == 'large' ? 'opacity' : 'un-opacity'"
    @focusin="changeCompSize('large')"
    @focusout="changeCompSize('small')"
    v-if="applicationCode == 'xy'"
  >
    <Cascader
      :placeholder="placeHolderText"
      v-model:value="orgsValue"
      :options="allowOrganizations"
      :field-names="{ label: 'text', value: 'value', children: 'children' }"
      @change="handelOrgsChange"
      :allow-clear="false"
      :size="compSize"
    />
    <Cascader
      placeholder="请选择任务"
      v-model:value="taskValue"
      :options="allowOwners"
      :field-names="{ label: 'text', value: 'value', children: 'children' }"
      :size="compSize"
      :allow-clear="false"
      @change="handelTaskChange"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'Modules',
  });
</script>
<script lang="ts" setup>
  import { ref, unref, computed, watchEffect } from 'vue';
  import { useUserStore } from '/@/store/modules/user';
  import { Cascader } from 'ant-design-vue';
  import { ChangeDept, ChangeGroup, ChangeTask } from '/@/api/sys/user';
  const userStore = useUserStore();
  const userInfo = computed(() => userStore.getUserInfo);
  const applicationCode = ref(unref(userInfo)?.applicationCode);
  console.log(userInfo.value);
  const organizationId = ref(unref(userInfo)?.organizationId);
  // const organizationType = ref(3);
  const organizationType = ref(unref(userInfo)?.organizationType);
  const deptId = ref(unref(userInfo)?.deptId);
  const groupId = ref(unref(userInfo)?.groupId);
  const projectId = ref(unref(userInfo)?.projectId);
  const taskId = ref(unref(userInfo)?.taskId);
  const ownerId = ref(unref(userInfo)?.ownerId);
  // 赋值默认数据
  let orgsValue = ref<string[]>([]);
  if (organizationId.value && deptId.value && organizationType.value == 0) {
    orgsValue.value = [organizationId.value, deptId.value];
  } else if (organizationId.value && deptId.value && groupId.value && organizationType.value == 3) {
    orgsValue.value = [organizationId.value, deptId.value, groupId.value];
  }
  let taskValue = ref<string[]>([]);
  if (ownerId.value && projectId.value && taskId.value) {
    taskValue.value = [ownerId.value, projectId.value, taskId.value];
  }

  // JSON 数据
  const allowTasks = unref(userInfo)?.allowTasks;
  const allowProjects = unref(userInfo)?.allowProjects;
  const allowOwners = unref(userInfo)?.allowOwners;

  const allowOrganizations = unref(userInfo)?.allowOrganizations;
  const allowDepts = unref(userInfo)?.allowDepts;
  const allowGroups = unref(userInfo)?.allowGroups;
  const compSize: any = ref('small');
  const placeHolderText =
    organizationType.value == 0
      ? '请选择部门'
      : organizationType.value == 3
      ? '请选择小组'
      : '请选择';
  // 货主json数据
  if (unref(organizationType) == 0) {
    allowOrganizations?.forEach((items: never[]) => {
      items['children'] = allowDepts?.filter((item) => {
        return item['fKey'] == items['value'];
      });
    });
  } else if (unref(organizationType) == 3) {
    // 报关行json 数据
    allowOrganizations?.forEach((items: never[]) => {
      items['children'] = allowDepts?.filter((dItem) => {
        return dItem['fKey'] == items['value'];
      });
      items['children'].forEach((cItems: never[]) => {
        cItems['children'] = allowGroups?.filter((gItem) => {
          return gItem['fKey'] == cItems['value'];
        });
      });
    });
  }
  // 任务拼接数据
  allowOwners?.forEach((items: never[]) => {
    items['children'] = allowProjects?.filter((dItem) => {
      return dItem['fKey'] == items['value'];
    });
    items['children'].forEach((cItems: never[]) => {
      cItems['children'] = allowTasks?.filter((gItem) => {
        return gItem['fKey'] == cItems['value'];
      });
    });
  });

  watchEffect(() => {
    if (userInfo.value.organizationId && userInfo.value.deptId && organizationType.value == 0) {
      orgsValue.value = [userInfo.value.organizationId, userInfo.value.deptId];
    }
    if (
      userInfo.value.organizationId &&
      userInfo.value.deptId &&
      userInfo.value.groupId &&
      organizationType.value == 3
    ) {
      orgsValue.value = [
        userInfo.value.organizationId,
        userInfo.value.deptId,
        userInfo.value.groupId,
      ];
    }
    if (userInfo.value.ownerId && userInfo.value.projectId && userInfo.value.taskId) {
      taskValue.value = [userInfo.value.ownerId, userInfo.value.projectId, userInfo.value.taskId];
    }
    applicationCode.value = userInfo.value.applicationCode;
  });

  // 部门小组切换
  const handelOrgsChange = async (value) => {
    const key = value.pop();
    if (unref(organizationType) == 0) {
      // 提交货主选择的部门
      await ChangeDept(key);
      userStore.getUserInfoAction();
    } else if (unref(organizationType) == 3) {
      await ChangeGroup(key);
      userStore.getUserInfoAction();
    }
  };
  // 任务切换
  const handelTaskChange = async (value) => {
    const key = value.pop();
    await ChangeTask(key);
    userStore.getUserInfoAction();
  };
  //
  const changeCompSize = (key) => {
    compSize.value = key;
  };
</script>
<style lang="less" scoped>
  .modules {
    position: fixed;
    bottom: 10px;
    right: 24px;
    z-index: 100;
    padding: 5px 10px;
    opacity: 0.7;
  }

  [data-theme='light'] .modules {
    background: #fff;
    border: 1px solid #eee;

    &:hover {
      opacity: 1;
      background: #eee;
    }
  }

  .modules.opacity {
    opacity: 1 !important;
  }

  [data-theme='dark'] .modules {
    border: 1px solid #303030;

    &:hover {
      opacity: 1;
    }
  }
</style>
