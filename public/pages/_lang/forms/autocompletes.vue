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
    <!--  Template/Script  -->
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
    <!-- Form -->
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

    <!--=== Custom filter on autocomplete ===-->
    <div class="title">Custom filter on autocomplete (Exx.2)</div>
    <div class="subtitle-1">
      The <kbd>filter</kbd> prop can be used to filter each individual item with custom logic. In this example we filter items by name
    </div>
    <!--  Template/Script  -->
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
            <code3></code3>
          </highlight-code>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <highlight-code :md="12" title="Script">
            <code4></code4>
          </highlight-code>
        </v-col>
      </v-row>
    </flex-box-panel>
    <br/>

    <!-- Form -->
    <flex-box>
      <v-card
        color="secondary"
        :dark="theme.dark"
      >
        <v-toolbar
          flat
          color="primary"
          dark
        >
          <v-icon>mdi-account</v-icon>
          <v-toolbar-title class="font-weight-light">User Profile</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn
            fab
            small
            @click="exx2IsEditing = !exx2IsEditing"
          >
            <v-icon v-if="exx2IsEditing">mdi-close</v-icon>
            <v-icon v-else>mdi-pencil</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <v-text-field
            :disabled="!exx2IsEditing"
            color="white"
            label="Name"
          ></v-text-field>
          <v-autocomplete
            :disabled="!exx2IsEditing"
            :items="exx2States"
            :filter="exx2CustomFilter"
            color="white"
            item-text="name"
            label="State"
          ></v-autocomplete>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :disabled="!exx2IsEditing"
            color="primary"
            @click="exx2Save"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </flex-box>

    <!--=== Slots ===-->
    <div class="title">Slots (Exx.3)</div>
    <div class="subtitle-1">
      With the power of slots, you can customize the visual output of the select. In this example we add a profile
      picture for both the chips and list items.
    </div>

    <!--  Template/Script  -->
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
            <code5></code5>
          </highlight-code>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <highlight-code :md="12" title="Script">
            <code6></code6>
          </highlight-code>
        </v-col>
      </v-row>
    </flex-box-panel>
    <br/>

    <!--  Form  -->
    <flex-box>
      <v-card
        color="secondary"
        :dark="theme.dark"
      >
        <template v-slot:progress>
          <v-progress-linear
            absolute
            color="green lighten-3"
            height="4"
            indeterminate
          ></v-progress-linear>
        </template>
        <v-img
          height="200"
          src="https://cdn.vuetifyjs.com/images/cards/dark-beach.jpg"
        >
          <v-row>
            <v-col
              class="text-right"
              cols="12"
            >
              <v-menu
                bottom
                left
                transition="slide-y-transition"
              >
                <template v-slot:activator="{ on }">
                  <v-btn
                    icon
                    v-on="on"
                  >
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list
                  :color="theme.dark? 'secondary' : ''"
                  :dark="theme.dark"
                >
                  <v-list-item @click="exx3IsUpdating = true">
                    <v-list-item-action>
                      <v-icon>mdi-cog</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>Update</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-col>
            <v-row
              class="pa-4"
              align="center"
              justify="center"
            >
              <v-col class="text-center">
                <h3 class="headline white--text">{{ exx3Name }}</h3>
                <span class="grey--text text--lighten-1">{{ exx3Title }}</span>
              </v-col>
            </v-row>
          </v-row>
        </v-img>
        <v-form>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                md="6"
              >
                <v-text-field
                  v-model="exx3Name"
                  :disabled="exx3IsUpdating"
                  filled
                  color="blue-grey lighten-2"
                  label="Name"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                md="6"
              >
                <v-text-field
                  v-model="exx3Title"
                  :disabled="exx3IsUpdating"
                  filled
                  color="blue-grey lighten-2"
                  label="Title"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-autocomplete
                  v-model="exx3Friends"
                  :disabled="exx3IsUpdating"
                  :items="exx3People"
                  filled
                  chips
                  color="blue-grey lighten-2"
                  label="Select"
                  item-text="name"
                  item-value="name"
                  multiple
                >
                  <template v-slot:selection="data">
                    <v-chip
                      v-bind="data.attrs"
                      :input-value="data.selected"
                      close
                      @click="data.select"
                      @click:close="exx3Remove(data.item)"
                    >
                      <v-avatar left>
                        <v-img :src="data.item.avatar"></v-img>
                      </v-avatar>
                      {{ data.item.name }}
                    </v-chip>
                  </template>
                  <template v-slot:item="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-item-content v-text="data.item"></v-list-item-content>
                    </template>
                    <template v-else>
                      <v-list-item-avatar>
                        <img :src="data.item.avatar">
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title v-html="data.item.name"></v-list-item-title>
                        <v-list-item-subtitle v-html="data.item.group"></v-list-item-subtitle>
                      </v-list-item-content>
                    </template>
                  </template>
                </v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <v-divider></v-divider>
        <v-card-actions>
          <v-switch
            v-model="exx3AutoUpdate"
            :disabled="exx3IsUpdating"
            class="mt-0"
            color="primary"
            hide-details
            label="Auto Update"
          ></v-switch>
          <v-spacer></v-spacer>
          <v-btn
            :disabled="exx3AutoUpdate"
            :loading="exx3IsUpdating"
            color="primary"
            depressed
            @click="exx3IsUpdating = true"
          >
            <v-icon left>mdi-update</v-icon>
            Update Now
          </v-btn>
        </v-card-actions>
      </v-card>
    </flex-box>

    <!--=== Asynchronous items ===-->
    <div class="title">Asynchronous items (Exx.4)</div>
    <div class="subtitle-1">
      Sometimes you need to load data externally based upon a search query. Use the <kbd>search-input</kbd> prop with
      the .sync modifier when using the <kbd>autocomplete</kbd> prop. We also make use of the new <kbd>cache-items</kbd> prop.
      This will keep a unique list of all items that have been passed to the <kbd>items</kbd> prop and is <strong>REQUIRED</strong>
      when using asynchronous items and the <kbd>multiple</kbd> prop.
    </div>
    <!--  Template/Script  -->
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
            <code7></code7>
          </highlight-code>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <highlight-code :md="12" title="Script">
            <code8></code8>
          </highlight-code>
        </v-col>
      </v-row>
    </flex-box-panel>
    <br/>

    <!-- Form -->
    <flex-box>
      <v-card
        color="secondary"
        :dark="theme.dark"
      >
        <v-toolbar
          dark
          color="primary"
        >
          <v-toolbar-title>State selection</v-toolbar-title>
          <v-autocomplete
            v-model="exx4Select"
            :loading="exx4Loading"
            :items="exx4Items"
            :search-input.sync="exx4Search"
            cache-items
            class="mx-4"
            flat
            hide-no-data
            hide-details
            label="What state are you from?"
            solo-inverted
          ></v-autocomplete>
          <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </v-toolbar>
      </v-card>
    </flex-box>

    <!--=== Advanced slots ===-->
    <div class="title">Advanced slots (Exx.5)</div>
    <div class="subtitle-1">
      The <kbd>v-autocomplete</kbd> component is extremely flexible and can fit in just about any <kbd>use-case</kbd>.
      Create custom displays for <strong>no-data</strong>, <strong>item</strong> and <strong>selection</strong> slots to provide a unique user experience.
      Using slots enables you to easily customize the desired look for your application.
    </div>
    <!--  Template/Script  -->
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
            <code9></code9>
          </highlight-code>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <highlight-code :md="12" title="Script">
            <code10></code10>
          </highlight-code>
        </v-col>
      </v-row>
    </flex-box-panel>
    <br/>

    <!-- Form -->
    <flex-box>
      <v-card
        color="secondary"
        :dark="theme.dark"
      >
        <v-toolbar color="primary" dark>
          <v-app-bar-nav-icon class="hidden-sm-and-down"></v-app-bar-nav-icon>
          <v-toolbar-title class="title mr-6 hidden-sm-and-down">Cryptocurrency</v-toolbar-title>
          <v-autocomplete
            v-model="exx5Model"
            :items="exx5Items"
            :loading="exx5IsLoading"
            :search-input.sync="exx5Search"
            chips
            clearable
            hide-details
            hide-selected
            item-text="name"
            item-value="symbol"
            label="Search for a coin..."
            solo
          >
            <template v-slot:no-data>
              <v-list-item>
                <v-list-item-title>
                  Search for your favorite
                  <strong>Cryptocurrency</strong>
                </v-list-item-title>
              </v-list-item>
            </template>
            <template v-slot:selection="{ attr, on, item, selected }">
              <v-chip
                v-bind="attr"
                :input-value="selected"
                color="blue-grey"
                class="white--text"
                v-on="on"
              >
                <v-icon left>mdi-bitcoin</v-icon>
                <span v-text="item.name"></span>
              </v-chip>
            </template>
            <template v-slot:item="{ item }">
              <v-list-item-avatar
                color="indigo"
                class="headline font-weight-light white--text"
              >
                {{ item.name.charAt(0) }}
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-text="item.name"></v-list-item-title>
                <v-list-item-subtitle v-text="item.symbol"></v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-icon>mdi-bitcoin</v-icon>
              </v-list-item-action>
            </template>
          </v-autocomplete>
          <template v-slot:extension>
            <v-tabs
              v-model="exx5Tab"
              :hide-slider="!exx5Model"
              color="white"
              slider-color="white"
            >
              <v-tab :disabled="!exx5Model">News</v-tab>
              <v-tab :disabled="!exx5Model">Trading</v-tab>
              <v-tab :disabled="!exx5Model">Blog</v-tab>
            </v-tabs>
          </template>
        </v-toolbar>
      </v-card>
    </flex-box>

    <!--=== State selector ===-->
    <div class="title">State selector (Exx.6)</div>
    <div class="subtitle-1">
      Using a combination of <kbd>v-autocomplete</kbd> slots and transitions, you can create a stylish toggleable
      autocomplete field such as this state selector.
    </div>
    <!--  Template/Script  -->
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
            <code11></code11>
          </highlight-code>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <highlight-code :md="12" title="Script">
            <code12></code12>
          </highlight-code>
        </v-col>
      </v-row>
    </flex-box-panel>
    <br/>

    <!-- Form -->
    <flex-box>
      <v-card
        color="secondary"
        :dark="theme.dark"
      >
        <v-card-title class="headline font-weight-regular primary white--text">Profile</v-card-title>
        <v-card-text>
          <v-subheader class="pa-0">Where do you live?</v-subheader>
          <v-autocomplete
            v-model="exx6Model"
            :hint="!exx6IsEditing ? 'Click the icon to edit' : 'Click the icon to save'"
            :items="exx6States"
            :readonly="!exx6IsEditing"
            :label="`State — ${exx6IsEditing ? 'Editable' : 'Readonly'}`"
            persistent-hint
            prepend-icon="mdi-city"
          >
            <template v-slot:append-outer>
              <v-slide-x-reverse-transition
                mode="out-in"
              >
                <v-icon
                  :key="`icon-${exx6IsEditing}`"
                  :color="exx6IsEditing ? 'success' : 'primary'"
                  @click="exx6IsEditing = !exx6IsEditing"
                  v-text="exx6IsEditing ? 'mdi-check-outline' : 'mdi-circle-edit-outline'"
                ></v-icon>
              </v-slide-x-reverse-transition>
            </template>
          </v-autocomplete>
        </v-card-text>
      </v-card>
    </flex-box>
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
  import Code3 from '~/components/codes/forms/autocompletes/code-html-3';
  import Code4 from '~/components/codes/forms/autocompletes/code-js-4';
  import Code5 from '~/components/codes/forms/autocompletes/code-html-5';
  import Code6 from '~/components/codes/forms/autocompletes/code-js-6';
  import Code7 from '~/components/codes/forms/autocompletes/code-html-7';
  import Code8 from '~/components/codes/forms/autocompletes/code-js-8';
  import Code9 from '~/components/codes/forms/autocompletes/code-html-9';
  import Code10 from '~/components/codes/forms/autocompletes/code-js-10';
  import Code11 from '~/components/codes/forms/autocompletes/code-html-11';
  import Code12 from '~/components/codes/forms/autocompletes/code-js-12';

  const debug = require('debug')('app:page.basicForms');
  const isLog = true;

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
      Code10,
      Code11,
      Code12,
    },
    data() {
      const srcs = {
        1: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        2: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        3: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        4: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
        5: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
      };
      return {
        title: this.$t('autocompletes_forms.title'),
        description: this.$t('autocompletes_forms.description'),
        panel: [],
        exx1DescriptionLimit: 60,
        exx1Entries: [],
        exx1IsLoading: false,
        exx1Model: null,
        exx1Search: null,
        exx1Count: 0,
        exx2HasSaved: false,
        exx2IsEditing: null,
        exx2Model: null,
        exx2States: [
          { name: 'Florida', abbr: 'FL', id: 1 },
          { name: 'Georgia', abbr: 'GA', id: 2 },
          { name: 'Nebraska', abbr: 'NE', id: 3 },
          { name: 'California', abbr: 'CA', id: 4 },
          { name: 'New York', abbr: 'NY', id: 5 },
        ],
        exx3AutoUpdate: true,
        exx3Friends: ['Sandra Adams', 'Britta Holt'],
        exx3IsUpdating: false,
        exx3Name: 'Midnight Crew',
        exx3People: [
          { header: 'Group 1' },
          { name: 'Sandra Adams', group: 'Group 1', avatar: srcs[1] },
          { name: 'Ali Connors', group: 'Group 1', avatar: srcs[2] },
          { name: 'Trevor Hansen', group: 'Group 1', avatar: srcs[3] },
          { name: 'Tucker Smith', group: 'Group 1', avatar: srcs[2] },
          { divider: true },
          { header: 'Group 2' },
          { name: 'Britta Holt', group: 'Group 2', avatar: srcs[4] },
          { name: 'Jane Smith ', group: 'Group 2', avatar: srcs[5] },
          { name: 'John Smith', group: 'Group 2', avatar: srcs[1] },
          { name: 'Sandra Williams', group: 'Group 2', avatar: srcs[3] },
        ],
        exx3Title: 'The summer breeze',
        exx4Loading: false,
        exx4Items: [],
        exx4Search: null,
        exx4Select: null,
        exx4States: [
          'Alabama',
          'Alaska',
          'American Samoa',
          'Arizona',
          'Arkansas',
          'California',
          'Colorado',
          'Connecticut',
          'Delaware',
          'District of Columbia',
          'Federated States of Micronesia',
          'Florida',
          'Georgia',
          'Guam',
          'Hawaii',
          'Idaho',
          'Illinois',
          'Indiana',
          'Iowa',
          'Kansas',
          'Kentucky',
          'Louisiana',
          'Maine',
          'Marshall Islands',
          'Maryland',
          'Massachusetts',
          'Michigan',
          'Minnesota',
          'Mississippi',
          'Missouri',
          'Montana',
          'Nebraska',
          'Nevada',
          'New Hampshire',
          'New Jersey',
          'New Mexico',
          'New York',
          'North Carolina',
          'North Dakota',
          'Northern Mariana Islands',
          'Ohio',
          'Oklahoma',
          'Oregon',
          'Palau',
          'Pennsylvania',
          'Puerto Rico',
          'Rhode Island',
          'South Carolina',
          'South Dakota',
          'Tennessee',
          'Texas',
          'Utah',
          'Vermont',
          'Virgin Island',
          'Virginia',
          'Washington',
          'West Virginia',
          'Wisconsin',
          'Wyoming',
        ],
        exx5IsLoading: false,
        exx5Items: [],
        exx5Model: null,
        exx5Search: null,
        exx5Tab: null,
        exx6IsEditing: false,
        exx6Model: null,
        exx6States: [
          'Alabama', 'Alaska', 'American Samoa', 'Arizona',
          'Arkansas', 'California', 'Colorado', 'Connecticut',
          'Delaware', 'District of Columbia', 'Federated States of Micronesia',
          'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho',
          'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
          'Louisiana', 'Maine', 'Marshall Islands', 'Maryland',
          'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
          'Missouri', 'Montana', 'Nebraska', 'Nevada',
          'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
          'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio',
          'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico',
          'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee',
          'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia',
          'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
        ],
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
            if(isLog) debug('watch.exx1Search.res:', res);
            const {count, entries} = res;
            this.exx1Count = count;
            this.exx1Entries = entries
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => (this.exx1IsLoading = false))
      },
      exx2HasSaved(val) {
        if(val){
          this.showSuccess('Your profile has been updated');
          this.exx2HasSaved = false;
        }
      },
      exx3IsUpdating (val) {
        if (val) {
          setTimeout(() => (this.exx3IsUpdating = false), 3000)
        }
      },
      exx4Search (val) {
        val && val !== this.exx4Select && this.exx4QuerySelections(val)
      },
      exx5Model (val) {
        if (val != null) this.exx5Tab = 0;
        else this.exx5Tab = null
      },
      exx5Search (val) {
        // Items have already been loaded
        if (this.exx5Items.length > 0) return;

        this.exx5IsLoading = true;

        // Lazily load input items
        fetch('https://api.coingecko.com/api/v3/coins/list')
          .then(res => res.clone().json())
          .then(res => {
            this.exx5Items = res
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => (this.exx5IsLoading = false))
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

        if(isLog) debug('computed.exx1Fields.exx1Model:', this.exx1Model);
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
        showSuccess: 'SHOW_SUCCESS',
        showError: 'SHOW_ERROR',
      }),
      initPanelDelay: function (delay) {
        this.setLoadingDelay(delay);
        this.setLoading(true);
      },
      modelPanel: function (val) {
        if (val !== undefined) {
          this.initPanelDelay(2000);
        }
      },
      exx2CustomFilter (item, queryText, itemText) {
        const textOne = item.name.toLowerCase();
        const textTwo = item.abbr.toLowerCase();
        const searchText = queryText.toLowerCase();

        return textOne.indexOf(searchText) > -1 ||
          textTwo.indexOf(searchText) > -1
      },
      exx2Save () {
        this.exx2IsEditing = !this.exx2IsEditing;
        this.exx2HasSaved = true
      },
      exx3Remove (item) {
        const index = this.exx3Friends.indexOf(item.name);
        if (index >= 0) this.exx3Friends.splice(index, 1)
      },
      exx4QuerySelections (v) {
        this.exx4Loading = true;
        // Simulated ajax query
        setTimeout(() => {
          this.exx4Items = this.exx4States.filter(e => {
            return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
          });
          this.exx4Loading = false
        }, 500)
      },
    },
  }
</script>
