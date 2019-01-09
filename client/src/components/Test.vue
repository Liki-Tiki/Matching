<template>
  <div>
    <div class="question">
      <v-text-field class="question"
                    label="Subject"
                    v-model="question"
                    single-line
                    full-width
                    hide-details
                    readonly
      ></v-text-field>
    </div>
    <div class="choice">
      <div class="a">
      </div>
      <div class="b">

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Test",
    data() {
      return {
        question: 'Tu es ',
        response: ''
      }
    }
  }
</script>

<style scoped>
  .question {
    margin: 3%;
    font-size: 25px;
    font-weight: bold;
    font-style: oblique;
    color: blue;
    overflow: hidden;
    word-wrap: break-word;
  }

  .choice {
    position: absolute;
    width: 100%;
    height: 500px;
    border: 1px solid black;
  }

  .a {
    width: 400px;
    height: 100%;
    border: 1px solid red;
    background-color: red;
    display: inline-block;
    margin-right: 5%;
  }


  .b {
    width: 400px;
    height: 100%;
    border: 1px solid blue;
    background-color: blue;
    display: inline-block;
    margin-left: 5%;
  }
</style>
