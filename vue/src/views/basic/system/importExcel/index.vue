<template>
  <div><HeadForm /> </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'Improt',
    components: { HeadForm },
  });
</script>
<script lang="ts" setup>
  import HeadForm from './HeadForm.vue';
</script>
