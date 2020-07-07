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
        title: this.$t('chatContacts.title'),
        description: this.$t('chatContacts.description'),
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
