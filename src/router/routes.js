
import Individuation from 'views/individuation/Individuation';
const AllMusicList = () => import('views/music-list/all-music-list')
const RankList = () => import('views/rank-list/rank-list')
const ArtistList = () => import('views/artist-list/artist-category')
const ArtistDetail =  () => import('views/artist-detail/artist-detail')
const Mv = () => import('views/mv/mv')
const NewSongs = () => import('views/new-songs/new-songs')
const MusicListDetail = () => import('views/list-detail/MusicListDetail');
const SearchDetail = () => import('views/search-detail/SearchDetail');
const SearchSongs = () => import('views/search-detail/childComps/SearchSongs')
const SearchArtists = () => import('views/search-detail/childComps/SearchArtists')
const SearchAlbums= () => import('views/search-detail/childComps/SearchAlbums')
const SearchPlayLists = () => import('views/search-detail/childComps/SearchPlayLists')
const SearchMv = () => import('views/search-detail/childComps/SearchMv')
const MvDetail = () => import('views/mv/mv-detail');
const routes = [
  {
    path: '/',
    redirect: '/individuation'
  },
  //个性推荐
  {
    path: '/individuation',
    component: Individuation
  },
  //歌单
  {
    path: '/allmusiclist',
    component: AllMusicList
  },
  //歌单详情页
  {/* id:歌单的id time：？ */
    name: 'musiclistdetail',
    path: '/musiclistdetail/:id/:time',
    component: MusicListDetail
  },
  //排行榜
  {
    path: '/ranklist',
    component: RankList
  },
  //歌手
  {
    path: '/artist-list',
    component: ArtistList
  },
  //歌手详情页
  {
    path: '/artist-detail',
    component: ArtistDetail,
    name:'artist-detail'
  },
  //MV
  {
    path: '/mv',
    component: Mv
  },
  {
    path: '/mv-detail/:mvId',
    name:'mv-detail',
    component: MvDetail
  },
  {
    path: '/new-songs',
    component: NewSongs
  },
  {
    path:'/search-detail/:keyword',
    // name:'search-detail',
    component:SearchDetail,
    children:[
      /* 重定向 */
      {
        path: '/',
        redirect: 'songs'
    },
      {
        path:'songs',
        name:'songs',
        component:SearchSongs,
      },
      {
        path:'artists',
        component:SearchArtists,
      },
      {
        path:'albums',
        component:SearchAlbums,
      },
      {
        path:'playlists',
        component:SearchPlayLists,
      },
      {
        path:'mv',
        component:SearchMv,
      },
    ]
  }

]
export default routes;