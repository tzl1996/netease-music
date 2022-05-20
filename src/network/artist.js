import {request} from './request'
/**获取歌手热门五十首歌曲 */
export function reqGetArtistHot50(id){
  return request({
      url:'/artist/top/song',
      params:{
          id:id
      }
  })
}

export function reqGetArtistDesc(id){
  return request({
      url:'/artist/desc',
      params:{
          id:id
      }
  })
}
/**获取歌手描述 */
export function reqGetArtistDescDetail(id){
  return request({
      url:'/artist/desc',
      params:{
          id:id
      }
  })
}
/**获取歌手专辑 */
export function reqGetArtistAlbum(id){
  return request({
      url:'/artist/album',
      params:{
          id:id
      }
  })
}
/**获取专辑内容 */
export function reqGetAlbum(id){
  return request({
      url:'/album',
      params:{
          id:id
      }
  })
}

/**mv */
export function reqGetArtistMv(id){
  return request({
      url:'/artist/mv',
      params:{
          id:id
      }
  })
}