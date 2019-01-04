<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs10 offset-xs1>
        <v-card class="error-box text-xs-center" hover raised>
          <br/>
          <br/>
          <!-- Card Media -->
          <img src="/static/img/error/error.png" alt="Error">
          <!-- Card Content -->
          <v-card-text>
            <h1>{{ statusCode }}</h1>
            <div class="headline">{{ title }}</div>
            <div class="body-2">{{ description }}</div>
          </v-card-text>
          <v-divider></v-divider>
          <!-- Card Actions -->
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              round
              color="primary"
              :to="homePath"
              class="white--text"
            >
              {{ $t('error.go_home') }}
              <v-icon right dark>home</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import isNumber from 'lodash/isNumber';

  export default {
    props: ['error'],
    data() {
      return {
        homePath: this.$i18n.path(process.env.HOME_PATH)
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
        return isNumber(this.error.statusCode) ? this.error.statusCode : '';
      },
    }
  }
</script>

<style lang="stylus" scoped>
  .error-box img
    height: 20vh
  .error-box h1 {
    font-size: 150px;
    line-height: 150px;
    font-weight: 700;
    color: #252932;
    text-shadow: rgba(61, 61, 61, 0.3) 1px 1px, rgba(61, 61, 61, 0.2) 2px 2px, rgba(61, 61, 61, 0.3) 3px 3px;
  }
</style>
