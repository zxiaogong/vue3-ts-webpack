<script lang="ts" setup>
/**ts写法 */
import { ref } from "vue";
import httpApiRequest, { requestTypes } from "@apiCall/request"

const testRequest = () => {
  httpApiRequest({
    method: requestTypes.method.GET,
    url: "/home",
  })
}

</script>
<template>
  <div>
    <div class="alert alert-primary" role="alert">
      首页
    </div>
    <el-button type="primary" v-on:click="testRequest">http请求</el-button>
  </div>
</template>
<style lang="less" scoped>
@import "./index.less";
</style>

