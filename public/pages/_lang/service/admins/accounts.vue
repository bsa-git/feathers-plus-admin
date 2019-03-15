<template>
  <v-container fluid>
    <app-page-header
      :app-menu="appMenu"
      :home-path="config.homePath"
    ></app-page-header>
    <v-flex xs10 offset-xs1>
      <div class="text-xs-center">
        <!--<h1>{{ description }}</h1>-->
        <div class="exotic--light display-1 my-3">{{ description }}</div>
      </div>
      <div class="d-flex justify-between align-center mb-3">
        <v-btn color="primary" @click="open">{{ $t('accounts.open') }}</v-btn>
        <v-btn color="primary" @click="close">{{ $t('accounts.close') }}</v-btn>
      </div>

      <v-expansion-panel
        v-model="panel"
        expand
        light
      >
        <v-expansion-panel-content
          v-for="(item,i) in items"
          :key="i"
        >
          <template v-slot:header>
            <div> <v-icon>{{ item.icon }}</v-icon> {{ item.name }}</div>
          </template>
          <v-card>
            <v-card-text class="grey lighten-3">
              <v-treeview :items="item.data" activatable></v-treeview>
              <!--{{ item.data }}-->
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-flex>
  </v-container>
</template>

<script>
  import {mapState, mapGetters} from 'vuex'
  import appMenu from '~/api/data/app-menu';
  import AppPageHeader from '~/components/layout/AppPageHeader';

  const data = [
    {
      id: 1,
      name: 'Applications :',
      children: [
        { id: 2, name: 'Calendar : app' },
        { id: 3, name: 'Chrome : app' },
        { id: 4, name: 'Webstorm : app' }
      ]
    },
    {
      id: 5,
      name: 'Documents :',
      children: [
        {
          id: 6,
          name: 'vuetify :',
          children: [
            {
              id: 7,
              name: 'src :',
              children: [
                { id: 8, name: 'index : ts' },
                { id: 9, name: 'bootstrap : ts' }
              ]
            }
          ]
        },
        {
          id: 10,
          name: 'material2 :',
          children: [
            {
              id: 11,
              name: 'src :',
              children: [
                { id: 12, name: 'v-btn : ts' },
                { id: 13, name: 'v-card : ts' },
                { id: 14, name: 'v-window : ts' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 15,
      name: 'Downloads :',
      children: [
        { id: 16, name: 'October : pdf' },
        { id: 17, name: 'November : pdf' },
        { id: 18, name: 'Tutorial : html' }
      ]
    },
    {
      id: 19,
      name: 'Videos :',
      children: [
        {
          id: 20,
          name: 'Tutorials :',
          children: [
            { id: 21, name: 'Basic layouts : mp4' },
            { id: 22, name: 'Advanced techniques : mp4' },
            { id: 23, name: 'All about app : dir' }
          ]
        },
        { id: 24, name: 'Intro : mov' },
        { id: 25, name: 'Conference introduction : avi' }
      ]
    }
  ];


  export default {
    components: {
      AppPageHeader
    },
    data() {
      return {
        title: this.$t('accounts.title'),
        description: this.$t('accounts.description'),
        appMenu: appMenu,
        panel: [],
        items: [
          {
            name: this.$t('accounts.users'),
            icon: 'wc',
            data: data
          },
          {
            name: this.$t('accounts.roles'),
            icon: 'security',
            data: data
          },
          {
            name: this.$t('accounts.teams'),
            icon: 'group',
            data: data
          },
        ]
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
    created: function () {
    },
    computed: {
      ...mapGetters({
        config: 'getConfig',
      }),
      ...mapState('auth', [
        'user'
      ]),
    },
    methods: {
      // Create an array the length of our items
      // with all values as true
      open() {
        this.panel = this.items.map(item => true)
      },
      // Reset the panel
      close() {
        this.panel = []
      }
    }
  }
</script>
