/**http请求类型 */
export enum MethodEnum {
    POST = "POST",
    GET = "GET",
    PUT = "PUT",
    DELETE = "DELETE",
}

export interface RequestTypes {
    /**请求地址 */
    url: string,
    /**请求类型 */
    method: MethodEnum,
    /**post请求参数 */
    data?: { [dataName: string]: {} },
    /**get请求参数 */
    params?: { [dataName: string]: {} },
    /**请求完成后是否弹出弱提示，默认true */
    isTip?: boolean
}