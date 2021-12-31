<template>
  <div class="Shuttle">
    <p class="pp">通知的人</p>
    <Transfer
      :data-source="mockData"
      class="bop"
      :titles="['所有人', '已存在']"
      show-search
      :filter-option="filterOption"
      :render="(item) => `${item.title}`"
      :target-keys="targetKeys"
      @change="handleChange"
    />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    components: { Transfer }
  });
</script>

<script lang="ts" setup>
  import { ref, watchEffect } from 'vue';
  import { Transfer } from 'ant-design-vue';
  interface MockData {
    key: string;
    title: string;
    description: string;
    chosen: boolean;
  }
  const emit = defineEmits(['changeData']);
  const mockData = ref<MockData[]>([]);
  const Afterdata = ref();
  const targetKeys = ref<string[]>([]);
  watchEffect(() => {
    getData();
  });
  const props = defineProps({
    editSeleData: {
      type: Object,
      default: null
    },
    userdata: {
      type: Object,
      default: null
    }
  });

  const filterOption = (inputValue: string, option: MockData) => {
    return option.description.indexOf(inputValue) > -1;
  };
  const handleChange = (keys: string[], direction: string, moveKeys: string[]) => {
    targetKeys.value = keys;
    emit('changeData', targetKeys.value);
  };
  async function getData() {
    const chabData = ref();
    Afterdata.value = props?.userdata;
    const keys = [];
    if (Afterdata.value?.length != 0) {
      var datavalue = Afterdata.value;
      let leftindex = datavalue?.length;
      chabData.value = props?.editSeleData;
      const mData = [];
      for (let i = 0; i < leftindex; i++) {
        let leftKey = datavalue[i].value;
        const data = {
          key: leftKey,
          title: datavalue[i]?.text,
          description: `description of ${datavalue[i]?.text}`,
          chosen: Math.random() * 2 > 1
        };
        if (chabData.value != null) {
          for (let j = 0; j < chabData.value; j++) {
            let rightKey = chabData.value[j]?.value;
            if (leftKey === rightKey) {
              keys.push(rightKey as never);
              break;
            }
            continue;
          }
        }
        mData.push(data as never);
      }
      mockData.value = mData;
      targetKeys.value = keys;
    }
  }
</script>
<style>
  .pp {
    margin-left: -70px;
  }

  .Shuttle {
    margin-left: 120px;
    margin-top: -40px;
  }

  .bop {
    margin-top: -30px;
  }
</style>
