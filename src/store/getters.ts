const getters = {
    getCurrentPageInfo: (state: any) => (data: any) => {
        return `${data.temp}: ${state.pageInfo}`
    }
}

export default getters