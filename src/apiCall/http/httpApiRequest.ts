// 封装请求参数
import http from './httpConfig'
import { RequestTypes, MethodEnum } from './types'
import { ElMessage } from 'element-plus'
import Qs from 'qs'

async function request({ method, url, data = {}, params = {}, isTip = true }: RequestTypes) {
    const res = await http({
        /** 
         *  @Qs.stringify
         * 禁止重复请求
         * */
        method: Qs.stringify(method),
        url,
        data,
        params,
    })
    if (isTip && res.data.msg) {
        if (Number(res.data.code) === 200) {
            ElMessage.success({
                message: res.data.msg,
                center: true
            })
            
        } else {
            ElMessage.error({
                message: res.data.msg,
                center: true
            })
        }
    }

    return res.data.data

}

export default request