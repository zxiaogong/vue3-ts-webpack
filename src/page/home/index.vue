<script lang="ts" setup>
/**ts写法 */
import { ref } from "vue";
import httpApiRequest, { requestTypes } from "@apiCall/request"

const testRequest = () => {
  httpApiRequest({
    method: requestTypes.method.GET,
    url: "/home",
    /**
     * get请求时，使用params
     * post请求时，使用data
     */
    params:{
      name:"test"
    }
  })
}

</script>
<template>
  <div>
    <div class="alert alert-primary" role="alert">
      首页
    </div>
    <el-button @click="testRequest">请求接口</el-button>
  </div>
</template>
<style lang="less" scoped>
@import "./index.less";
</style>

