<template>
  <v-fab-transition>
    <v-btn fab="fab" small fixed bottom right dark color="red" v-scroll="onScroll" v-show="fab" @click="toTop">
      <v-icon>mdi-chevron-up</v-icon>
    </v-btn>
  </v-fab-transition>
</template>

<script>
export default {
  data: () => ({
    fab: false
  }),

  methods: {
    onScroll () {
      if (typeof window === 'undefined') return;
      const top = window.pageYOffset || document.documentElement.offsetTop || 0;
      this.fab = top > 300;
    },
    toTop () {
      this.$router.push({ hash: '' });
      this.$vuetify.goTo(0);
    }
  }
};
</script>
