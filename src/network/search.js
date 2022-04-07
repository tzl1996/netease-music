import { request } from './request'

/* 热搜列表 */
export const reqHotSearchList = () => request({
    url: '/search/hot/detail'
});

/* 搜索 */
export const reqSearch = (keyword,type) => request({
    url:'/search',
    params:{
        keywords:keyword,
        type:type,
    }
});
/**搜索建议 */
export function reqSuggest(keyword){
    return request({
        url:'/search/suggest',
        params:{
            keywords:keyword
        }
    })
}