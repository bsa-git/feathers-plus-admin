<template>
  <div>
    <app-page-header
      :page-title="description"
    ></app-page-header>
    <v-row justify="center">
      <!-- mini statistic start -->
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
      <!-- mini statistic  end -->
    </v-row>
    <!--
    <blockquote :class="`exotic--${theme.name} exotic--font headline text-center`">
      &#8220;First, solve the problem. Then, write the code.&#8221;
      <footer>
        <small>
          <em>&mdash;John Johnson</em>
        </small>
      </footer>
    </blockquote>
    <v-row justify="center">
      <v-col
        v-for="n in 1"
        :key="n"
        :cols="12"
        md="6"
      >
        <v-data-table
          :headers="headers"
          :items="desserts"
          :items-per-page="5"
          class="elevation-1"
        ></v-data-table>
      </v-col>
    </v-row>
    -->
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import AppPageHeader from '~/components/layout/AppPageHeader';
  import MiniStatistic from '~/components/widgets/statistic/MiniStatistic';

  const debug = require('debug')('app:page.dashboard');

  export default {
    components: {
      AppPageHeader,
      MiniStatistic
    },
    head() {
      return {
        title: this.title,
        meta: [
          {hid: 'description', name: 'description', content: this.description}
        ],
      }
    },
    created() {
//      debug('getBaseRoles:', this.baseRoles())
    },
    computed: {
      ...mapGetters({
        theme: 'getTheme',
        baseRoles: 'getBaseRoles'
      }),
    },
    data() {
      return {
        title: this.$t('dashboard.title'),
        description: this.$t('dashboard.description'),
        headers: [
          {
            text: 'Dessert (100g serving)',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          {text: 'Calories', value: 'calories'},
          {text: 'Fat (g)', value: 'fat'},
          {text: 'Carbs (g)', value: 'carbs'},
          {text: 'Protein (g)', value: 'protein'},
          {text: 'Iron (%)', value: 'iron'}
        ],
        desserts: [
          {
            value: false,
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1%'
          },
          {
            value: false,
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: '1%'
          },
          {
            value: false,
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: '7%'
          },
          {
            value: false,
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: '8%'
          },
          {
            value: false,
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: '16%'
          },
          {
            value: false,
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: '0%'
          },
          {
            value: false,
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            iron: '2%'
          },
          {
            value: false,
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            iron: '45%'
          },
          {
            value: false,
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: '22%'
          },
          {
            value: false,
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: '6%'
          }
        ]
      }
    },
  }
</script>
