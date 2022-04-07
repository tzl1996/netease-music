import { request } from "./request";

/* 获取轮播图数据 */
export const reqBanner = () => request({ url: '/banner', method: 'get' });

/* 推荐歌单 */
export const reqGetPersonalized = (config) => request({
    url: '/personalized',
    params: {
        limit: config
    }
})
/* 独家放送 */
export const reqGetPrivateContent = () => request({ url: "/personalized/privatecontent", method: 'get' })

/**获取每日新歌 */
export const reqGetNewSong = () => request({url:'/personalized/newsong'})

/**获取排行榜数据 */
export function reqGetRankList() {
  return request({
      url: '/toplist',
  })
}
/**歌手 */
export function reqGetArtist(area, type, name = -1,limit,offset=1) {
  return request({
      url: '/artist/list',
      params: {
          area: area,
          type: type,
          limit: limit,
          initial:name,
          offset:offset
      }
  })
}

/**最新歌曲 */
export function reqGetTopSongs(type) {
  return request({
      url: '/top/song',
      params: {
          type: type
      }
  })
}