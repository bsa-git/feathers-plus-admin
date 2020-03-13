<template>
  <div class="d-flex justify-space-around mb-3">
    <!-- Text+Icon Button -->
    <template v-if="btn1Text && btn1Icon">
      <v-btn
        color="primary"
        class="white--text"
        @click="clickBtn1"
      >
        <v-icon class="mr-3" dark>{{ btn1Icon }}</v-icon>
        {{ btn1Text }}
      </v-btn>
      <slot></slot>
      <v-btn
        color="primary"
        class="white--text"
        @click="clickBtn2"
      >
        <v-icon class="mr-3" dark>{{ btn2Icon }}</v-icon>
        {{ btn2Text }}
      </v-btn>
    </template>
    <!-- Text Button -->
    <template v-if="btn1Text && !btn1Icon">
      <v-btn text color="primary" @click="clickBtn1">{{ btn1Text }}</v-btn>
      <slot></slot>
      <v-btn text color="primary" @click="clickBtn2">{{ btn2Text }}</v-btn>
    </template>
    <!-- Fab+Title Button -->
    <template v-if="btn1Icon && !btn1Text">
      <v-btn fab small dark color="primary" @click="clickBtn1" :title="btn1Tooltip? btn1Tooltip : ''">
        <v-icon dark>{{ btn1Icon }}</v-icon>
      </v-btn>
      <slot></slot>
      <v-btn fab small dark color="primary" @click="clickBtn2" :title="btn2Tooltip? btn2Tooltip : ''">
        <v-icon dark>{{ btn2Icon }}</v-icon>
      </v-btn>
    </template>
  </div>
</template>

<script>
  export default {
    props: {
      btn1Text: String,
      btn1Icon: String,
      btn1Tooltip: String,
      clickBtn1: Function,
      btn2Text: String,
      btn2Icon: String,
      btn2Tooltip: String,
      clickBtn2: Function,
    },
  };
</script>
