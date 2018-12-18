<template>
  <v-app>
    <h1>Trouve ton match idéal</h1>
    <v-container fluid>
      <v-layout justify-space-around>
        <v-flex xs5>
          <v-layout column>
            <v-img
              src="/static/assets/wedding.png"
              aspect-ratio="0.7"
              max-height="500"
              contain>
            </v-img>
            <p>Les BDE vous souhaitent de passer une excellente soirée, n'oubliez pas d'echanger vos 06 ;)</p>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
  font-family: "Arial Black";
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
