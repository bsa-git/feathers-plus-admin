<template>
  <div>
    <!-- Response dialog -->
    <v-dialog v-model="responseDialog" scrollable max-width="500px">
      <v-card>
        <v-card-title>
          <v-icon class="mr-3">search</v-icon>
          <span>{{ $t('graphql.responseToRequest') }}</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text style="">
          <v-textarea
            outline
            auto-grow
            name="text-response"
            :value="textResponse"
          ></v-textarea>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="responseDialog = false">{{ $t('management.close') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Select Query -->
    <v-container fluid>
      <app-page-header
        :app-menu="appMenu"
        :home-path="config.homePath"
      ></app-page-header>
      <v-layout row>
        <v-flex xs8 offset-xs2>
          <div class="text-xs-center">
            <div class="exotic--light display-1 my-3">{{ description }}</div>
          </div>
          <div>
            <v-toolbar
              color="primary"
              dark
              tabs
            >
              <v-toolbar-side-icon></v-toolbar-side-icon>
              <v-toolbar-title>{{ selTitle }}</v-toolbar-title>

              <v-spacer></v-spacer>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on:click="request">
                    <v-icon v-on="on">search</v-icon>
                  </v-btn>
                </template>
                <span>{{ selTooltip }}</span>
              </v-tooltip>
              <template v-slot:extension>
                <v-tabs
                  v-model="selTab"
                  color="primary"
                  grow
                  show-arrows
                  v-on:change="changeTab"
                >
                  <v-tabs-slider color="yellow"></v-tabs-slider>

                  <v-tab
                    v-for="(tab, index) in tabs"
                    :key="`tab-${index + 1}`"
                  >
                    {{ tab }}
                  </v-tab>
                </v-tabs>
              </template>
            </v-toolbar>
            <v-tabs-items v-model="selTab">
              <v-tab-item
                v-for="(item, index) in items"
                :key="`item-${index + 1}`"
              >
                <v-textarea
                  clearable
                  counter="512"
                  outline
                  auto-grow
                  :name="`text-${index + 1}`"
                  :label="$t('graphql.searchQuery')"
                  :value="item.value"
                  v-model="item.value"
                  :rows="(index && item.value.split('\n').length > 5)? item.value.split('\n').length - 1 : -1"
                  :hint="$t('graphql.enterGraphLQuery')"
                  persistent-hint
                ></v-textarea>
              </v-tab-item>
            </v-tabs-items>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'
  import appMenu from '~/api/data/app-menu';
  import AppPageHeader from '~/components/layout/AppPageHeader';
  import feathersClient from '~/plugins/lib/feathers-client';

  const debug = require('debug')('app:page.services-graphql-find');

  const isLog = true;
  const isDebug = true;

  export default {
    components: {
      AppPageHeader
    },
    props: {
      tabs: Array,
      items: Array,
      selTitle: String,
      selTooltip: String,
    },
    data() {
      return {
        title: this.$t('graphql.title'),
        description: this.$t('graphql.description'),
        responseDialog: false,
        appMenu: appMenu,
        textResponse: '',
        selTab: null,
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
    },
    methods: {

      changeTab: function (index) {
        if (isDebug) debug('changeTab.index:', index);
      },

      request: async function () {
        try {
          // GraphQL
          const graphql = feathersClient.service('/graphql');
          const strQuery = this.items[this.selTab].value.trim();
          const response = await graphql.find({query: {query: strQuery}});
          if (isLog) debug('request.response:', response);
          const strResponse = JSON.stringify(response, null, '  ');
          this.textResponse = strResponse;
          this.responseDialog = true;
        } catch (ex) {
          if (isLog) debug('graphql.find.error:', ex);
          const msgError = ex.errors.length? ex.errors[0].message : ex.message;
          this.showError(msgError);
        }
      },
      ...mapMutations({
        showSuccess: 'SHOW_SUCCESS',
        showError: 'SHOW_ERROR',
      }),
    }
  }
</script>
