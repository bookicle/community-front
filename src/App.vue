<template >
  <el-config-provider :locale="zhCn" :message="config">
    <RouterView />
  </el-config-provider>
</template>

<script setup>
import { reactive } from "vue";
import zhCn from "element-plus/es/locale/lang/zh-cn";
const locale = zhCn;
const config = reactive({
  max: 1,
});

</script>

<style scoped></style>
