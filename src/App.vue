<template>
  <v-app>
    <v-main class="gradientbg">
      <Todo />
    </v-main>
  </v-app>
</template>

<script>
import Todo from './components/Todo';

export default {
  name: 'App',

  components: {
    Todo,
  },

  data: () => ({
    //
  }),
};
</script>
<style scoped>
.gradientbg{
  background-image: linear-gradient(45deg, #874da2 0%, #c43a30 100%);
}
</style>
