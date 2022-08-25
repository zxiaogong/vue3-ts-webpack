const actions = {
    updataPage: (context: any, pageInfo: string) => {
        context.commit('setPageInfo', pageInfo)
        return
    }
}

export default actions