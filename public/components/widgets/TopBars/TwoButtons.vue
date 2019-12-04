<template>
  <div class="d-flex justify-space-around mb-3">
    <v-btn text color="primary" @click="clickBtn1">{{ btn1Text }}</v-btn>
    <v-btn text color="primary" @click="clickBtn2">{{ btn2Text }}</v-btn>
  </div>
</template>

<script>
  export default {
    props: {
      btn1Text: String,
      btn2Text: String,
      clickBtn1: Function,
      clickBtn2: Function,
    },
  };
</script>
