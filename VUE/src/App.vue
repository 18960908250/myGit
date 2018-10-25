<template>
  <div id="app">
    <mt-header title="">
      <div slot="left">
        <router-link to="/" icon="back" slot="left">
          <img src="http://m.kugou.com/v3/static/images/index/logo.png" alt="">
        </router-link>
      </div>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <router-view name="navbar"/>
    <div class="content">
      <mt-spinner type="triple-bounce" v-show="$store.state.isLoading"></mt-spinner>
      <router-view/>
      <mt-button type="default" @click="getNewSong">default</mt-button>
    </div>
  </div>
</template>

<script>
//  import axios from "axios"
  import * as api from '@/server'

  export default {
    name: 'App',
    data(){
      return {
        api
      }
    },
    created(){
      /*axios('/proxy/rank/list?json=true').then(({data}) => {

      })*/
      // this.getNewSong()
    },
    methods:{
      async getNewSong(){
        let {data} = await this.api.getRankList();
        console.log(data)
      }
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;
  color: #2c3e50;
  margin-top: 60px;*/
}
body,h1,h2,h3,h4,h5,h6,p,ul,li{padding: 0;margin: 0;}
  ul,li{list-style: none;}
  a{text-decoration: none;}
</style>
