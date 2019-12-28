<template>
  <div>
    <!--=== Page Header ===-->
    <app-page-header
      :page-title="description"
    ></app-page-header>

    <v-row justify="center">
      <!--=== Mini Statistic ===-->
      <v-col cols="12" sm="6" lg="3">
        <mini-statistic
          icon="fab fa-facebook-f"
          title="100+"
          sub-title="Likes"
          color="indigo"
        >
        </mini-statistic>
      </v-col>
      <v-col cols="12" sm="6" lg="3">
        <mini-statistic
          icon="fab fa-google"
          title="150+"
          sub-title="Connections"
          color="red"
        >
        </mini-statistic>
      </v-col>
      <v-col cols="12" sm="6" lg="3">
        <mini-statistic
          icon="fab fa-twitter"
          title="200+"
          sub-title="Followers"
          color="light-blue"
        >
        </mini-statistic>
      </v-col>
      <v-col cols="12" sm="6" lg="3">
        <mini-statistic
          icon="fab fa-instagram"
          title="50+"
          sub-title="Shots"
          color="purple"
        >
        </mini-statistic>
      </v-col>


    </v-row>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import AppPageHeader from '~/components/app/layout/AppPageHeader';
  import MiniStatistic from '~/components/widgets/statistic/MiniStatistic';

  const debug = require('debug')('app:page.dashboard');

  export default {
    components: {
      AppPageHeader,
      MiniStatistic
    },
    data() {
      return {
        title: this.$t('dashboard.title'),
        description: this.$t('dashboard.description'),
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
    created() {},
    computed: {
      ...mapGetters({
        theme: 'getTheme',
        baseRoles: 'getBaseRoles'
      }),
    },
  }
</script>
