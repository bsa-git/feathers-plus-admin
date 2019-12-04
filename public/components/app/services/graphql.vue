<template>
  <div>
    <!--=== Response dialog ===-->
    <view-dialog
      :dialog="responseDialog"
      :max-width="500"
      header-icon="mdi-search-web"
      :header-title="$t('graphql.responseToRequest')"
      :action-text="$t('management.close')"
      v-on:onClose="responseDialog = false"
    >
      <div slot="view-content">
        <v-textarea
          outline
          auto-grow
          name="text-response"
          :value="textResponse"
        ></v-textarea>
      </div>
    </view-dialog>

    <!--=== Select Query ===-->
    <div>
      <v-row justify="center">
        <v-col cols="12" sm="8">
          <v-card
            :loading="isLoading"
          >
            <v-toolbar
              color="primary"
              dark
              tabs
            >
              <v-app-bar-nav-icon></v-app-bar-nav-icon>
              <v-toolbar-title>{{ selTitle }}</v-toolbar-title>

              <v-spacer></v-spacer>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on:click="request">
                    <v-icon v-on="on">mdi-search-web</v-icon>
                  </v-btn>
                </template>
                <span>{{ selTooltip }}</span>
              </v-tooltip>
              <template v-slot:extension>
                <v-tabs
                  v-model="selTab"
                  dark
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
                  class="pa-5"
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
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'
  import feathersClient from '~/plugins/lib/feathers-client';
  import ViewDialog from '~/components/dialogs/ViewDialog';

  const debug = require('debug')('app:page.services-graphql-find');

  const isLog = true;
  const isDebug = true;

  export default {
    components: {
      ViewDialog
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
        textResponse: '',
        selTab: null,
        isLoading: false
      }
    },
    methods: {
      changeTab: function (index) {
        if (isDebug) debug('changeTab.index:', index);
      },
      request: async function () {
        try {
          // GraphQL
          this.isLoading = true;
          const graphql = feathersClient.service('/graphql');
          const strQuery = this.items[this.selTab].value.trim();
          const response = await graphql.find({query: {query: strQuery}});
          if (isLog) debug('request.response:', response);
          const strResponse = JSON.stringify(response, null, '  ');
          this.textResponse = strResponse;
          this.responseDialog = true;
          this.isLoading = false;
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
