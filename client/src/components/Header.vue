<template>
  <div>
    <v-toolbar fixed dark style="background: #FF5252;">
      <v-toolbar-title class="mr-4">
        <span class="home"
        v-on:click="navigateTo({name: 'HelloWorld'})">
        Matching
        </span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-toolbar_items>
      <v-btn
          v-if="!$store.state.isUserLoggedIn"
          flat
          dark
          v-on:click="navigateTo({name: 'login'})">
          Login
        </v-btn>

        <v-btn
          v-if="!$store.state.isUserLoggedIn"
          flat
          dark
          v-on:click="navigateTo({name: 'register'})">
          Sign Up
        </v-btn>

        <v-btn
          v-if="$store.state.isUserLoggedIn"
          flat
          dark
          v-on:click="logout">
          Log Out
        </v-btn>
      </v-toolbar_items>
    </v-toolbar>
  </div>
</template>

<script>
  export default {
    name: "Header",
    methods: {
      navigateTo(route) {
        this.$router.push(route)
      },
      logout() {
        this.$store.dispatch('setToken', null)
        this.$store.dispatch('setUser', null)
        this.$router.push({
          name: 'root'
        })
      }
    },
    data: () => ({
      gradient: 'to top, #7B1FA2, #E1BEE7'
    })
  }
</script>

<style scoped>
  .home {
    cursor: pointer;
  }

  .home:hover {
    color: navajowhite;
  }
</style>
