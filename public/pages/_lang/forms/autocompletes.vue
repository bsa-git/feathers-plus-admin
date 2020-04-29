<template>
  <div>
    <!--=== Page Header ===-->
    <app-page-header
      :page-title="description"
    ></app-page-header>

    <!--=== Description ===-->
    <blockquote class="blockquote line-left"><em>The <kbd>v-autocomplete</kbd> component offers simple and flexible
      type-ahead
      functionality. This is useful when searching large sets of data or even dynamically requesting information
      from an API.</em></blockquote>
    <br/>

    <!--=== Usage ===-->
    <div class="title">Usage</div>
    <div class="subtitle-1">
      The internal <kbd>v-form</kbd> component makes it easy to add validation to form inputs. All input components have
      a
      <kbd>rules</kbd> prop which takes an array of functions. These functions allow you to specify conditions in which
      the
      field is valid or invalid. Whenever the value of an input is changed, each function in the array will receive
      the new value. If a function returns false or a string, validation has failed.
    </div>
    <br/>
    <flex-box :md="10">
      <v-alert type="error">
        When using objects for the <span class="font-weight-bold">items</span> prop, you must associate
        <span class="font-weight-bold">item-text</span> and <span class="font-weight-bold">item-value</span>
        with existing properties on your objects. These values are defaulted to <span
        class="font-weight-bold">text</span>
        and <span class="font-weight-bold">value</span> and can be changed.
      </v-alert>
    </flex-box>
    <flex-box :md="10">
      <v-alert type="warning">
        The <span class="font-weight-bold">auto</span> property of <span class="font-weight-bold">menu-props</span> is
        only supported for the default input style.
      </v-alert>
    </flex-box>
    <flex-box :md="10">
      <v-alert type="info">
        Browser autocomplete is set to off by default, may vary by browser and may be ignored.
        <a
          class="white--text"
          href="https://developer.mozilla.org/en-US/docs/Web/Security/Securing_your_site/Turning_off_form_autocompletion"
          target="_blank">MDN</a>
      </v-alert>
    </flex-box>

    <!--=== Searching an API ===-->
    <div class="title">Searching an API (Exx.1)</div>
    <div class="subtitle-1">
      Easily hook up dynamic data and create a unique experience. The <kbd>v-autocomplete</kbd>'s expansive prop
      list makes it easy to fine tune every aspect of the input.
    </div>
    <flex-box-panel
      title="Template/Script"
      icon="mdi-contain"
      :model="panel"
      v-on:onTogglePanel="modelPanel"
    >
      <v-row
        justify="center"
      >
        <v-col
          cols="12"
          md="6"
        >
          <highlight-code :md="12" title="Template" :init="true">
            <code1></code1>
          </highlight-code>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <highlight-code :md="12" title="Script">
            <code2></code2>
          </highlight-code>
        </v-col>
      </v-row>
    </flex-box-panel>
    <br/>

    <flex-box>
      <v-card
        color="secondary"
        :dark="theme.dark"
      >
        <v-card-title class="headline primary white--text">
          Search for Public APIs
        </v-card-title>
        <v-card-text>
          <br>
          Explore hundreds of free API's ready for consumption! For more information visit
          <a
            href="https://github.com/toddmotto/public-apis"
            target="_blank"
          >the Github repository</a>.
        </v-card-text>
        <v-card-text>
          <!--    color="white"      -->
          <v-autocomplete
            v-model="exx1Model"
            :items="exx1Items"
            :loading="exx1IsLoading"
            :search-input.sync="exx1Search"
            :dark="theme.dark"
            hide-no-data
            hide-selected
            item-text="Description"
            item-value="API"
            label="Public APIs"
            placeholder="Start typing to Search"
            prepend-icon="mdi-database-search"
            return-object
          ></v-autocomplete>
        </v-card-text>
        <v-divider></v-divider>
        <v-expand-transition>
          <v-list v-if="exx1Model">
            <v-list-item
              v-for="(field, i) in exx1Fields"
              :key="i"
            >
              <v-list-item-content>
                <v-list-item-title v-text="field.value"></v-list-item-title>
                <v-list-item-subtitle v-text="field.key"></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-expand-transition>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :disabled="!exx1Model"
            color="primary"
            @click="exx1Model = null"
          >
            Clear
            <v-icon right>mdi-close-circle</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </flex-box>
    <br/>

  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex';
  import AppPageHeader from '~/components/app/layout/AppPageHeader';
  import FlexBox from '~/components/widgets/containers/flex-box';
  import FlexBoxPanel from '~/components/widgets/containers/flex-box-panel';
  import HighlightCode from '~/components/widgets/highlight/highlight-code';
  import Code1 from '~/components/codes/forms/autocompletes/code-html-1';
  import Code2 from '~/components/codes/forms/autocompletes/code-js-2';
  import Code3 from '~/components/codes/forms/basic/code-html-3';
  import Code4 from '~/components/codes/forms/basic/code-js-4';
  import Code5 from '~/components/codes/forms/basic/code-html-5';
  import Code6 from '~/components/codes/forms/basic/code-js-6';
  import Code7 from '~/components/codes/forms/basic/code-html-7';
  import Code8 from '~/components/codes/forms/basic/code-js-8';
  import Code9 from '~/components/codes/forms/basic/code-html-9';
  import Code10 from '~/components/codes/forms/basic/code-js-10';

  const debug = require('debug')('app:page.basicForms');

  export default {
    components: {
      AppPageHeader,
      FlexBox,
      FlexBoxPanel,
      HighlightCode,
      Code1,
      Code2,
      Code3,
      Code4,
      Code5,
      Code6,
      Code7,
      Code8,
      Code9,
      Code10
    },
    data() {
      return {
        title: this.$t('autocompletes_forms.title'),
        description: this.$t('autocompletes_forms.description'),
        panel: [],
        exx1DescriptionLimit: 60,
        exx1Entries: [],
        exx1IsLoading: false,
        exx1Model: null,
        exx1Search: null,
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
    created: function () {},
    watch: {
      exx1Search(val) {
        // Items have already been loaded
        if (this.exx1Items.length > 0) return;

        // Items have already been requested
        if (this.exx1IsLoading) return;

        this.exx1IsLoading = true;

        // Lazily load input items
        fetch('https://api.publicapis.org/entries')
          .then(res => res.json())
          .then(res => {
            const {count, entries} = res;
            this.exx1Count = count;
            this.exx1Entries = entries
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => (this.exx1IsLoading = false))
      },
    },
    computed: {
      ...mapGetters({
        theme: 'getTheme',
        config: 'getConfig',
        loading: 'getLoading'
      }),
      exx1Fields() {
        if (!this.exx1Model) return [];

        return Object.keys(this.exx1Model).map(key => {
          return {
            key,
            value: this.exx1Model[key] || 'n/a',
          }
        })
      },
      exx1Items() {
        return this.exx1Entries.map(entry => {
          const Description = entry.Description.length > this.exx1DescriptionLimit
            ? entry.Description.slice(0, this.exx1DescriptionLimit) + '...'
            : entry.Description;

          return Object.assign({}, entry, {Description})
        })
      },
    },
    methods: {
      ...mapMutations({
        setLoading: 'SET_LOADING',
        setLoadingDelay: 'SET_LOADING_DELAY',
      }),
      initPanelDelay: function (delay) {
        this.setLoadingDelay(delay);
        this.setLoading(true);
      },
      modelPanel: function (val) {
        if (val !== undefined) {
          this.initPanelDelay(2000);
        }
      }
    },
  }
</script>
