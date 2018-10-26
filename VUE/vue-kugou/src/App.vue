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
    </div>
  </div>
</template>

<script>
//  import * as api from '@/server'

  export default {
    name: 'App',
    data(){
      return {

      }
    },
    created(){
    },
    methods:{

    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
