import { RouterView, RouterLink } from 'vue-router'
import router from '@router/router'
import { ElPageHeader } from 'element-plus'
import "./layout.less"
export default () => {
  return (
    <div class="layout-root">
      <div class="layout-head"></div>
      <div class="layout-content">
        <RouterView v-wechat-title={router.currentRoute.value.meta.title}></RouterView>
      </div>
    </div>
  )
}
