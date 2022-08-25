declare module '*.vue' {
    import type { DefineComponent, Ref } from 'vue'
    const component:{[name:string]:any}
    export default component
}
declare module "vue/types/vue" {
    interface Vue {
    }
}

declare module 'vue-wechat-title' 