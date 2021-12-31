<template>
  <BasicTree
    title="部门列表"
    toolbar
    search
    :clickRowToExpand="false"
    :treeData="treeData"
    @select="handleSelect"
  />
  <!-- 替换树的读取字段 -->
  <!-- :replaceFields="{ key: 'id', title: 'deptName' }" -->
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import { BasicTree } from '/@/components/Tree/index';
  // import { treeData } from './data';
  import { CollapseContainer } from '/@/components/Container/index';
  import { TreeItem } from '/@/components/Tree/index';
  import { allOrgListApi } from '/@/api/system/customer';
  const treeData = ref<TreeItem[]>([]);
  export default defineComponent({
    name: 'OrgTree',
    components: { BasicTree, CollapseContainer },
    emits: ['select'],
    setup(_, { emit }) {
      // 请求数据
      async function fetch() {
        var data = await allOrgListApi();
        treeData.value = data.data;
      }
      // 回调接收值
      function handleSelect(keys) {
        emit('select', keys[0]);
      }
      onMounted(() => {
        fetch();
      });
      return { treeData, handleSelect };
    },
  });
</script>
