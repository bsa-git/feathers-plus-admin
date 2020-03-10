<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card class="error-box text-center pt-5">
          <!-- Card Media -->
          <img src="/static/img/error/error.png" alt="Error">
          <!-- Card Content -->
          <v-card-text>
            <h1 :class="`exotic--${theme.name}`">{{ statusCode }}</h1>
            <div :class="`exotic--${theme.name} my-3 headline`">{{ title }}</div>
            <div class="body-2">{{ description }}</div>
          </v-card-text>
          <v-divider></v-divider>
          <!-- Card Actions -->
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="goHome">{{ $t('error.go_home') }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import {mapGetters} from 'vuex';
//  import isNumber from 'lodash/isNumber';
  import typeOf from '~/plugins/lib/type-of';
  import createLogMessage from '~/plugins/service-helpers/create-log-message';

  export default {
    layout: 'default',
    props: ['error'],
    data() {
      return {
//        saveLogMessage: null
      }
    },
    head() {
      return {
        title: this.statusCode ? `Error: ${this.$HttpBox.getHttpCode(this.statusCode)}` : `${this.error.statusCode}: ${this.title}`,
        meta: [
          {hid: 'description', name: 'description', content: this.description}
        ]
      }
    },
    created() {
      if (process.client) {
        console.error(`Error message: ${this.error.message}; ${this.error.statusCode ? 'Status Code: ' + this.error.statusCode : ''}`);
        createLogMessage(this.$store)('ERROR-CLIENT', {error: this.error});
      }
    },
    computed: {
      title: function () {
        return this.error.message
      },
      description: function () {
        return this.$t('error.description');
      },
      statusCode: function () {
        return typeOf.isNumber(this.error.statusCode) ? this.error.statusCode : '';
      },
      ...mapGetters({
        config: 'getConfig',
        theme: 'getTheme',
      })
    },
    methods: {
      goHome() {
        this.$router.push({path: this.$i18n.path(this.config.homePath)});
      }
    }
  }
</script>
