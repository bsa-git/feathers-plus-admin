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
      Treeview now supports two different selection types. The default type is '<kbd>leaf</kbd>', which will only
      include
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

    <!--=== Selectable ===-->
    <div class="title">Selectable (Exx.9)</div>
    <div class="subtitle-1">
      You can easily select treeview nodes and children.
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
            <code12></code12>
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
      :items="items"
    ></flex-box-treeview>
    <v-divider class="my-5"></v-divider>

    <!--=== Activatable ===-->
    <div class="title">Activatable (Exx.10)</div>
    <div class="subtitle-1">
      Treeview nodes can be activated by clicking on them.
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
            <code13></code13>
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
      :items="items"
    ></flex-box-treeview>
    <v-divider class="my-5"></v-divider>

    <!--=== Hoverable ===-->
    <div class="title">Hoverable (Exx.11)</div>
    <div class="subtitle-1">
      Treeview nodes can have a hover effect.
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
            <code14></code14>
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
      :hoverable="true"
      :items="items"
    ></flex-box-treeview>
    <v-divider class="my-5"></v-divider>

    <!--=== Open-all ===-->
    <div class="title">Open-all (Exx.12)</div>
    <div class="subtitle-1">
      Treeview nodes can be pre-opened on page load.
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
            <code15></code15>
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
      :open-all="true"
      :items="items"
    ></flex-box-treeview>
    <v-divider class="my-5"></v-divider>

    <!--=== Slots ===-->
    <div class="title">Slots (Exx.13)</div>
    <div class="subtitle-1">
      Using slots we are able to create an intuitive file explorer. Apart from the <kbd>prepend</kbd> slot, there is
      also
      one for the <kbd>label</kbd>, and an <kbd>append</kbd> slot.
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
            <code16></code16>
          </highlight-code>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <highlight-code :md="12" title="Script">
            <code17></code17>
          </highlight-code>
        </v-col>
      </v-row>
    </flex-box-panel>
    <br/>
    <!-- TreeView -->
    <flex-box-card
      :md="4"
      :outlined="true"
    >
      <v-treeview
        v-model="exx13Tree"
        :open="exx13Open"
        :items="exx13Items"
        activatable
        item-key="name"
        open-on-click
      >
        <template v-slot:prepend="{ item, open }">
          <v-icon v-if="!item.file">
            {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
          </v-icon>
          <v-icon v-else>
            {{ exx13Files[item.file] }}
          </v-icon>
        </template>
      </v-treeview>
    </flex-box-card>
    <v-divider class="my-5"></v-divider>

    <!--=== Searching a directory ===-->
    <div class="title">Searching a directory (Exx.14)</div>
    <div class="subtitle-1">
      Easily filter your treeview by using the <kbd>search</kbd> prop. You can easily apply your custom filtering
      function
      if you need case-sensitive or fuzzy filtering by setting the <kbd>filter</kbd> prop. This works similar to the
      <a href="https://vuetifyjs.com/ru/components/autocompletes/" target="_blank">v-autocomplete</a> component..
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
            <code18></code18>
          </highlight-code>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <highlight-code :md="12" title="Script">
            <code19></code19>
          </highlight-code>
        </v-col>
      </v-row>
    </flex-box-panel>
    <br/>
    <!-- TreeView -->
    <flex-box-card
      :md="4"
      :outlined="true"
    >
      <template v-slot:card-title>
        <v-card-title class="primary" style="display: block">
          <v-text-field
            v-model="exx14Search"
            label="Search Company Directory"
            dark
            flat
            solo-inverted
            hide-details
            clearable
            clear-icon="mdi-close-circle-outline"
          ></v-text-field>
          <v-checkbox
            v-model="exx14CaseSensitive"
            color="white"
            dark
            hide-details
            label="Case sensitive search"
          ></v-checkbox>
        </v-card-title>
      </template>
      <v-treeview
        :items="exx14Items"
        :search="exx14Search"
        :filter="exx14Filter"
        :open.sync="exx14Open"
      >
        <template v-slot:prepend="{ item }">
          <v-icon
            v-if="item.children"
            v-text="`mdi-${item.id === 1 ? 'home-variant' : 'folder-network'}`"
          ></v-icon>
        </template>
      </v-treeview>
    </flex-box-card>
    <v-divider class="my-5"></v-divider>

    <!--=== Async items ===-->
    <div class="title">Async items (Exx.15)</div>
    <div class="subtitle-1">
      You can dynamically load child data by supplying a Promise callback to the <kbd>load-children</kbd> prop. This callback
      will be executed the first time a user tries to expand an item that has a children property that is an empty array.
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
            <code20></code20>
          </highlight-code>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <highlight-code :md="12" title="Script">
            <code21></code21>
          </highlight-code>
        </v-col>
      </v-row>
    </flex-box-panel>
    <br/>
    <!-- TreeView -->
    <flex-box-card
      :md="8"
      :outlined="true"
    >
      <template v-slot:card-title>
        <v-card-title class="indigo white--text headline">
          User Directory
        </v-card-title>
      </template>
      <v-row
        class="pa-4"
        justify="space-between"
      >
        <v-col cols="5">
          <v-treeview
            :active.sync="exx15Active"
            :items="exx15Items"
            :load-children="exx15FetchUsers"
            :open.sync="exx15Open"
            activatable
            color="warning"
            open-on-click
            transition
          >
            <template v-slot:prepend="{ item, active }">
              <v-icon v-if="!item.children">mdi-account</v-icon>
            </template>
          </v-treeview>
        </v-col>

        <v-divider vertical></v-divider>

        <v-col
          class="d-flex text-center"
        >
          <v-scroll-y-transition mode="out-in">
            <div
              v-if="!exx15Selected"
              class="title grey--text text--lighten-1 font-weight-light"
              style="align-self: center;"
            >
              Select a User
            </div>
            <v-card
              v-else
              :key="exx15Selected.id"
              class="pt-6 mx-auto"
              flat
              max-width="400"
            >
              <v-card-text>
                <v-avatar
                  v-if="exx15Avatar"
                  size="88"
                >
                  <v-img
                    :src="`https://avataaars.io/${exx15Avatar}`"
                    class="mb-6"
                  ></v-img>
                </v-avatar>
                <h3 class="headline mb-2">
                  {{ exx15Selected.name }}
                </h3>
                <div class="blue--text mb-2">{{ exx15Selected.email }}</div>
                <div class="blue--text subheading font-weight-bold">{{ exx15Selected.username }}</div>
              </v-card-text>
              <v-divider></v-divider>
              <v-row
                class="text-left"
                tag="v-card-text"
              >
                <v-col class="text-right mr-4 mb-2" tag="strong" cols="5">Company:</v-col>
                <v-col>{{ exx15Selected.company.name }}</v-col>
                <v-col class="text-right mr-4 mb-2" tag="strong" cols="5">Website:</v-col>
                <v-col>
                  <a :href="`//${exx15Selected.website}`" target="_blank">{{ exx15Selected.website }}</a>
                </v-col>
                <v-col class="text-right mr-4 mb-2" tag="strong" cols="5">Phone:</v-col>
                <v-col>{{ exx15Selected.phone }}</v-col>
              </v-row>
            </v-card>
          </v-scroll-y-transition>
        </v-col>
      </v-row>
    </flex-box-card>
    <v-divider class="my-5"></v-divider>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex';
  import AppPageHeader from '~/components/app/layout/AppPageHeader';
  import FlexBox from '~/components/widgets/containers/flex-box';
  import FlexBoxCard from '~/components/widgets/containers/flex-box-card';
  import FlexBoxTreeview from '~/components/widgets/containers/flex-box-treeview';
  import FlexBoxPanel from '~/components/widgets/containers/flex-box-panel';
  import HighlightCode from '~/components/widgets/highlight/highlight-code';
  import {treeItems} from '~/api/demo/ui-elements/treeview-items.json';
  import {treeItems2} from '~/api/demo/ui-elements/treeview-items2.json';
  import {treeItems3} from '~/api/demo/ui-elements/treeview-items3.json';
  import {treeItems4} from '~/api/demo/ui-elements/treeview-items4.json';
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
  import Code12 from '~/components/codes/components/treeviews/code-html-12';
  import Code13 from '~/components/codes/components/treeviews/code-html-13';
  import Code14 from '~/components/codes/components/treeviews/code-html-14';
  import Code15 from '~/components/codes/components/treeviews/code-html-15';
  import Code16 from '~/components/codes/components/treeviews/code-html-16';
  import Code17 from '~/components/codes/components/treeviews/code-js-17';
  import Code18 from '~/components/codes/components/treeviews/code-html-18';
  import Code19 from '~/components/codes/components/treeviews/code-js-19';
  import Code20 from '~/components/codes/components/treeviews/code-html-20';
  import Code21 from '~/components/codes/components/treeviews/code-js-21';

  const debug = require('debug')('app:page.basicForms');

  const avatars = [
    '?accessoriesType=Blank&avatarStyle=Circle&clotheColor=PastelGreen&clotheType=ShirtScoopNeck&eyeType=Wink&eyebrowType=UnibrowNatural&facialHairColor=Black&facialHairType=MoustacheMagnum&hairColor=Platinum&mouthType=Concerned&skinColor=Tanned&topType=Turban',
    '?accessoriesType=Sunglasses&avatarStyle=Circle&clotheColor=Gray02&clotheType=ShirtScoopNeck&eyeType=EyeRoll&eyebrowType=RaisedExcited&facialHairColor=Red&facialHairType=BeardMagestic&hairColor=Red&hatColor=White&mouthType=Twinkle&skinColor=DarkBrown&topType=LongHairBun',
    '?accessoriesType=Prescription02&avatarStyle=Circle&clotheColor=Black&clotheType=ShirtVNeck&eyeType=Surprised&eyebrowType=Angry&facialHairColor=Blonde&facialHairType=Blank&hairColor=Blonde&hatColor=PastelOrange&mouthType=Smile&skinColor=Black&topType=LongHairNotTooLong',
    '?accessoriesType=Round&avatarStyle=Circle&clotheColor=PastelOrange&clotheType=Overall&eyeType=Close&eyebrowType=AngryNatural&facialHairColor=Blonde&facialHairType=Blank&graphicType=Pizza&hairColor=Black&hatColor=PastelBlue&mouthType=Serious&skinColor=Light&topType=LongHairBigHair',
    '?accessoriesType=Kurt&avatarStyle=Circle&clotheColor=Gray01&clotheType=BlazerShirt&eyeType=Surprised&eyebrowType=Default&facialHairColor=Red&facialHairType=Blank&graphicType=Selena&hairColor=Red&hatColor=Blue02&mouthType=Twinkle&skinColor=Pale&topType=LongHairCurly',
  ]

  const pause = ms => new Promise(resolve => setTimeout(resolve, ms))

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
      Code12,
      Code13,
      Code14,
      Code15,
      Code16,
      Code17,
      Code18,
      Code19,
      Code20,
      Code21,
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
        exx8Items: treeItems2,
        exx13Open: ['public'],
        exx13Files: {
          html: 'mdi-language-html5',
          js: 'mdi-nodejs',
          json: 'mdi-json',
          md: 'mdi-markdown',
          pdf: 'mdi-file-pdf',
          png: 'mdi-file-image',
          txt: 'mdi-file-document-outline',
          xls: 'mdi-file-excel',
        },
        exx13Tree: [],
        exx13Items: treeItems3,
        exx14Open: [1, 2],
        exx14Search: null,
        exx14CaseSensitive: false,
        exx14Items: treeItems4,
        exx15Active: [],
        exx15Avatar: null,
        exx15Open: [],
        exx15Users: [],
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
    watch: {
      exx15Selected: 'exx15RandomAvatar',
    },
    computed: {
      ...mapGetters({
        theme: 'getTheme',
        config: 'getConfig',
        loading: 'getLoading'
      }),
      exx14Filter() {
        return this.exx14CaseSensitive
          ? (item, search, textKey) => item[textKey].indexOf(search) > -1
          : undefined
      },
      exx15Items () {
        return [
          {
            name: 'Users',
            children: this.exx15Users,
          },
        ]
      },
      exx15Selected () {
        if (!this.exx15Active.length) return undefined

        const id = this.exx15Active[0]

        return this.exx15Users.find(user => user.id === id)
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
      },
      async exx15FetchUsers (item) {
        // Remove in 6 months and say
        // you've made optimizations! :)
        await pause(1500)

        return fetch('https://jsonplaceholder.typicode.com/users')
          .then(res => res.json())
          .then(json => (item.children.push(...json)))
          .catch(err => console.warn(err))
      },
      exx15RandomAvatar () {
        this.exx15Avatar = avatars[Math.floor(Math.random() * avatars.length)]
      },
    },
  }
</script>
