<template>
  <div class="newSong">
    <div class="swipeImg">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="item in banner" :key="item.id">
          <img :src="item.imgurl" >
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="list">
      <mt-cell class="song-sell" v-for="item in list" :key="item.hash"  :title="item.filename" is-link></mt-cell>
    </div>
  </div>
</template>

<script>
  import {getNewSongs} from '@/server'

  export default {
    data (){
      return {
        banner:[],
        list:[]
      }
    },
    async created (){
      let self_=this;
      let {data} = await getNewSongs();
      self_.banner = data.banner;
      self_.list = data.data;

      console.log(self_)
    }

  }
</script>

<style>
.swipeImg{
  height:140px;
}
  .swipeImg img{
    width:100%;
  }
</style>
