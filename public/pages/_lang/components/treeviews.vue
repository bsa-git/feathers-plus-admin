<template>
  <div>
    <!--=== Page Header ===-->
    <app-page-header
      :page-title="description"
    ></app-page-header>

    <!--=== Description ===-->
    <blockquote class="blockquote line-left"><em>
      The <kbd>v-treeview</kbd> component is useful for displaying large amounts of nested data.
    </em></blockquote>
    <br/>

    <!--=== Usage ===-->
    <div class="title">Usage (Exx.1)</div>
    <div class="subtitle-1">
      A basic example.
    </div>
    <!-- Template/Script -->
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
    <!-- TreeView -->
    <flex-box-treeview
      :md="4"
      :items="items"
      ></flex-box-treeview>
    <v-divider class="my-5"></v-divider>

    <!--=== Dense mode ===-->
    <div class="title">Dense mode (Exx.2)</div>
    <div class="subtitle-1">
      Dense mode provides more compact layout with decreased heights of the items.
    </div>
    <!-- Template/Script -->
    <flex-box-panel
      :md="10"
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
            <code2></code2>
          </highlight-code>
        </v-col>
      </v-row>
    </flex-box-panel>
    <br/>
    <!-- TreeView -->
    <flex-box-treeview
      :md="4"
      :items="items"
      :dense="true"
    ></flex-box-treeview>
    <v-divider class="my-5"></v-divider>

    <!--=== Checkbox color ===-->
    <div class="title">Checkbox color (Exx.3)</div>
    <div class="subtitle-1">
      You can control the color of the selected node checkbox.
    </div>
    <!-- Template/Script -->
    <flex-box-panel
      :md="10"
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
            <code4></code4>
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
    <!-- TreeView -->
    <flex-box-treeview
      :md="4"
      :selectable="true"
      selected-color="red"
      :items="items"
    ></flex-box-treeview>
    <v-divider class="my-5"></v-divider>

    <!--=== Color ===-->
    <div class="title">Color (Exx.4)</div>
    <div class="subtitle-1">
      You can control the text and background color of the active treeview node.
    </div>
    <!-- Template/Script -->
    <flex-box-panel
      :md="10"
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
            <code2></code2>
          </highlight-code>
        </v-col>
      </v-row>
    </flex-box-panel>
    <br/>
    <!-- TreeView -->
    <flex-box-treeview
      :md="4"
      :activatable="true"
      item-color="warning"
      :items="items"
    ></flex-box-treeview>
    <v-divider class="my-5"></v-divider>

    <!--=== Shaped ===-->
    <div class="title">Shaped (Exx.5)</div>
    <div class="subtitle-1">
      Shaped treeview's have rounded borders on one side of the nodes.
    </div>
    <!-- Template/Script -->
    <flex-box-panel
      :md="10"
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
            <code6></code6>
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
    <!-- TreeView -->
    <flex-box-treeview
      :md="4"
      :activatable="true"
      :shaped="true"
      :hoverable="true"
      :items="items"
    ></flex-box-treeview>
    <v-divider class="my-5"></v-divider>

    <!--=== Rounded ===-->
    <div class="title">Rounded (Exx.6)</div>
    <div class="subtitle-1">
      You can make treeview nodes rounded.
    </div>
    <!-- Template/Script -->
    <flex-box-panel
      :md="10"
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
            <code2></code2>
          </highlight-code>
        </v-col>
      </v-row>
    </flex-box-panel>
    <br/>
    <!-- TreeView -->
    <flex-box-treeview
      :md="4"
      :activatable="true"
      :rounded="true"
      :hoverable="true"
      :items="items"
    ></flex-box-treeview>
    <v-divider class="my-5"></v-divider>

    <!--=== Disabling nodes ===-->
    <div class="title">Disabling nodes (Exx.7)</div>
    <div class="subtitle-1">
      Setting <kbd>item-disabled</kbd> prop allows to control which node's property disables the node when set to <kbd>true</kbd>.
    </div>
    <!-- Template/Script -->
    <flex-box-panel
      :md="10"
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
            <code8></code8>
          </highlight-code>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <highlight-code :md="12" title="Script">
            <code9></code9>
          </highlight-code>
        </v-col>
      </v-row>
    </flex-box-panel>
    <br/>
    <!-- TreeView -->
    <flex-box-treeview
      :md="4"
      :selectable="true"
      item-disabled="locked"
      :items="exx7Items"
    ></flex-box-treeview>
    <v-divider class="my-5"></v-divider>

    <!--=== Selection type ===-->
    <div class="title">Selection type (Exx.8)</div>
    <div class="subtitle-1">
      Treeview now supports two different selection types. The default type is '<kbd>leaf</kbd>', which will only include
      leaf nodes in the v-model array, but will render parent nodes as either partially or fully selected.
      The alternative mode is '<kbd>independent</kbd>', which allows one to select parent nodes, but each node is
      independent of its parent and children.
    </div>
    <!-- Template/Script -->
    <flex-box-panel
      :md="10"
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
            <code10></code10>
          </highlight-code>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <highlight-code :md="12" title="Script">
            <code11></code11>
          </highlight-code>
        </v-col>
      </v-row>
    </flex-box-panel>
    <br/>
    <!-- TreeView -->
    <flex-box-card
      :md="4"
    >
      <template v-slot:card-title>
        <v-card-title>
          <v-select v-model="exx8SelectionType" :items="['leaf', 'independent']" label="Selection type"></v-select>
        </v-card-title>
      </template>
      <v-row>
        <v-col>
          <v-treeview
            v-model="exx8Selection"
            :items="exx8Items"
            :selection-type="exx8SelectionType"
            selectable
            return-object
            open-all
          ></v-treeview>
        </v-col>
        <v-divider vertical></v-divider>
        <v-col class="pa-6" cols="6">
          <template v-if="!exx8Selection.length">
            No nodes selected.
          </template>
          <template v-else>
            <div v-for="node in exx8Selection" :key="node.id">
              {{ node.name }}
            </div>
          </template>
        </v-col>
      </v-row>
    </flex-box-card>
    <v-divider class="my-5"></v-divider>
  </div>
</template>

<script>
  import moment from 'moment';
  import {mapGetters, mapMutations} from 'vuex';
  import AppPageHeader from '~/components/app/layout/AppPageHeader';
  import FlexBox from '~/components/widgets/containers/flex-box';
  import FlexBoxCard from '~/components/widgets/containers/flex-box-card';
  import FlexBoxTreeview from '~/components/widgets/containers/flex-box-treeview';
  import FlexBoxPanel from '~/components/widgets/containers/flex-box-panel';
  import HighlightCode from '~/components/widgets/highlight/highlight-code';
  import {treeItems} from '~/api/demo/ui-elements/treeview-items.json';
  import Code1 from '~/components/codes/components/treeviews/code-html-1';
  import Code2 from '~/components/codes/components/treeviews/code-js-2';
  import Code3 from '~/components/codes/components/treeviews/code-html-3';
  import Code4 from '~/components/codes/components/treeviews/code-html-4';
  import Code5 from '~/components/codes/components/treeviews/code-html-5';
  import Code6 from '~/components/codes/components/treeviews/code-html-6';
  import Code7 from '~/components/codes/components/treeviews/code-html-7';
  import Code8 from '~/components/codes/components/treeviews/code-html-8';
  import Code9 from '~/components/codes/components/treeviews/code-js-9';
  import Code10 from '~/components/codes/components/treeviews/code-html-10';
  import Code11 from '~/components/codes/components/treeviews/code-js-11';

  const debug = require('debug')('app:page.basicForms');

  export default {
    components: {
      AppPageHeader,
      FlexBox,
      FlexBoxCard,
      FlexBoxTreeview,
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
    },
    data() {
      const exx7Items = treeItems.map((item, index) => {
        item["locked"] = index === 0;
        return Object.assign({}, item);
      });
      return {
        title: this.$t('treeviews.title'),
        description: this.$t('treeviews.description'),
        panel: [],
        items: treeItems,
        exx7Items,
        exx8SelectionType: 'leaf',
        exx8Selection: [],
        exx8Items: [
          {
            id: 1,
            name: 'Root',
            children: [
              { id: 2, name: 'Child #1' },
              { id: 3, name: 'Child #2' },
              {
                id: 4,
                name: 'Child #3',
                children: [
                  { id: 5, name: 'Grandchild #1' },
                  { id: 6, name: 'Grandchild #2' },
                ],
              },
            ],
          },
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
    computed: {
      ...mapGetters({
        theme: 'getTheme',
        config: 'getConfig',
        loading: 'getLoading'
      }),
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
      },
    },
  }
</script>
