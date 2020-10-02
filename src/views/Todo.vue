<template>
  <div class="home">
    <Todo />
  </div>
</template>

<script>
// @ is an alias to /src
import Todo from '@/components/Todo.vue'

export default {
  name: 'Todo',
  components: {
    Todo
  }
}
</script>

<style scoped>
html, body{
  background: #DE6262;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #FFB88C, #DE6262);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #FFB88C, #DE6262); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
