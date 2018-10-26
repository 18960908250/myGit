<template>
<div>
  <mt-navbar v-model="selected">
    <mt-tab-item :id="item.path" v-for="item in routes" :key="item.path">
      <router-link tag="div" :to="{path:item.path}">{{item.title}}</router-link>
    </mt-tab-item>
  </mt-navbar>
</div>
</template>

<script>
  import { routes} from '@/router/routers'
  export default {
    data(){
      return {
        selected: '/',
        routes
      }
    }
  }
</script>

<style>

</style>
