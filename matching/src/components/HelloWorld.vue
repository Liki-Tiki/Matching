<template>
  <div class="hello">
    <form @click.prevent="authToken" method="POST">
      <input type="text" placeholder="name" name="name">
      <input type="text" placeholder="quote" name="quote">
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }, methods: {
        authToken() {
            this.$http.post("http://localhost:4200/quotes").then(response => {
                return response;
            });
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
