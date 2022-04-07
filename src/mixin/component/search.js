/**search获取搜索关键词 */
export const search = {
    inject: {
        search: {
            default: ""
        }
    },
    computed: {
        keyword() {
            return this.search.keyword;
        },
    },
    watch: {
        keyword() {
            this.Search();
        },
    },
}