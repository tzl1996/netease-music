import {request} from './request'

/* 获取歌单分类 */
export const reqGetCatList = () => request({url:'/playlist/catlist'});

/**获取热门歌单 */
export const reqGetMusicListHot= () => request({
  url:'/playlist/hot',
});

/**获取歌单--网友精选碟，全部歌单 */
export function reqGetPlayList(cat,limit,offset){
  return request({
      url:'/top/playlist',
      params:{
          cat:cat,
          limit:limit,
          offset
      }
  })
}