<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li>{{asd}}</li>
      <li>{{5+5}}</li>
      <li><router-link to="/">回首页</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'This is test',
      asd: 'assdaadfadfa'
    }
  }
}
console.log($('.hello').eq(0).height());
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
