/**
 * Created by llb on 2018/10/23.
 */

import Navbar from '@/components/navbar'

let NewSong = () => import(`@/views/newSong/newSong`)
let Rank = () => import(`@/views/rank/rank`)
let PList = () => import(`@/views/pList/pList`)
let Singer = () => import(`@/views/singer/singer`)

export let routes = [
  {
    path: '/',
    title: '新歌',
    name: 'NewSong',
    components:{
      navbar: Navbar,
      default: NewSong
    }
  },
  {
    path: '/rank',
    title: '排行',
    name: 'Rank',
    components:{
      navbar: Navbar,
      default: Rank
    }
  },
  {
    path: '/PList',
    title: '歌单',
    name: 'PList',
    components:{
      navbar: Navbar,
      default: PList
    }
  },
  {
    path: '/Singer',
    title: '歌手',
    name: 'Singer',
    components:{
      navbar: Navbar,
      default: Singer
    }
  }
]
