import Vue from 'vue'
import Router from 'vue-router'
/*import NewSong from '@/views/newSong/newSong'
import Rank from '@/views/rank/rank'
import Navbar from '@/components/navbar'*/
import Search from '@/views/search/search'
import Searchbar from '@/components/searchBar'
import { routes} from './routers'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    ...routes,
    {
      path: '/search',
      name: 'Search',
      components:{
        navbar: Searchbar,
        default: Search
      }
    }
  ]
})
