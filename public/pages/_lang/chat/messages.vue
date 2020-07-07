<template>
  <div>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    layout: 'chat',
    components: {
    },
    data() {
      return {
        title: this.$t('chatMessages.title'),
        description: this.$t('chatMessages.description'),
      }
    },
    head() {
      return {
        title: this.title,
        meta: [
          {hid: 'description', name: 'description', content: this.description}
        ],
      }
    },
    computed: {
      ...mapGetters({
        theme: 'getTheme',
        config: 'getConfig'
      }),
    },
    methods: {},
  }
</script>
