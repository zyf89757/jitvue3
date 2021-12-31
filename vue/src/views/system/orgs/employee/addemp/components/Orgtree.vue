<template>
  <BasicTree
    title="部门列表"
    toolbar
    search
    :clickRowToExpand="false"
    :treeData="treeData"
    @select="handleSelect"
  />
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import { BasicTree } from '/@/components/Tree/index';
  import { TreeItem } from '/@/components/Tree/index';
  import { allOrgListApi } from '/@/api/system/customer';
  const treeData = ref<TreeItem[]>([]);
  export default defineComponent({
    name: 'OrgTree',
    components: { BasicTree },
    emits: ['select'],
    setup(_, { emit }) {
      // 请求数据
      async function fetch() {
        var data = await allOrgListApi();
        treeData.value = data.data;
        console.log(treeData.value, '@@@');
      }
      // 回调接收值
      function handleSelect(keys) {
        emit('select', keys[0]);
      }
      onMounted(() => {
        fetch();
      });
      return { treeData, handleSelect };
    }
  });
</script>
