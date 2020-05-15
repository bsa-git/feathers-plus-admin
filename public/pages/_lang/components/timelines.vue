<template>
  <div>
    <!--=== Page Header ===-->
    <app-page-header
      :page-title="description"
    ></app-page-header>

    <!--=== Description ===-->
    <blockquote class="blockquote line-left"><em>
      The <kbd>v-timeline</kbd> is useful for stylistically displaying chronological information.
    </em></blockquote>
    <br/>

    <!--=== Usage ===-->
    <div class="title">Usage (Exx.1)</div>
    <div class="subtitle-1">
      <kbd>v-timeline</kbd>'s in their simplest form display a vertical timeline that should contain at least one <kbd>v-timeline-item</kbd>.
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
      </v-row>
    </flex-box-panel>
    <br/>
    <!-- TimeLine -->
    <flex-box>
      <v-timeline>
        <v-timeline-item>timeline item</v-timeline-item>
        <v-timeline-item class="text-right">timeline item</v-timeline-item>
        <v-timeline-item>timeline item</v-timeline-item>
      </v-timeline>
    </flex-box>
    <v-divider class="my-5"></v-divider>

    <!--=== Small dots ===-->
    <div class="title">Small dots (Exx.2)</div>
    <div class="subtitle-1">
      The <kbd>small</kbd> prop allows alternate styles to provide a unique design.
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
          md="8"
        >
          <highlight-code :md="12" title="Template" :init="true">
            <code2></code2>
          </highlight-code>
        </v-col>
      </v-row>
    </flex-box-panel>
    <br/>
    <!-- TimeLine -->
    <flex-box
      :md="10"
    >
      <v-timeline :dense="$vuetify.breakpoint.smAndDown">
        <v-timeline-item
          color="purple lighten-2"
          fill-dot
          right
        >
          <v-card>
            <v-card-title class="purple lighten-2">
              <v-icon
                dark
                size="42"
                class="mr-4"
              >
                mdi-magnify
              </v-icon>
              <h2 class="display-1 white--text font-weight-light">Title 1</h2>
            </v-card-title>
            <v-container>
              <v-row>
                <v-col cols="12" md="10">
                  Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod
                  convenire principes at. Est et nobis iisque percipit.
                </v-col>
                <v-col
                  class="hidden-sm-and-down text-right"
                  md="2"
                >
                  <v-icon size="64">mdi-calendar-text</v-icon>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-timeline-item>

        <v-timeline-item
          color="amber lighten-1"
          fill-dot
          left
          small
        >
          <v-card>
            <v-card-title class="amber lighten-1 justify-end">
              <h2 class="display-1 mr-4 white--text font-weight-light">Title 2</h2>
              <v-icon
                dark
                size="42"
              >mdi-home-outline
              </v-icon>
            </v-card-title>
            <v-container>
              <v-row>
                <v-col cols="12" md="8">
                  Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod
                  convenire principes at. Est et nobis iisque percipit.
                </v-col>
                <v-col cols="12" md="4">
                  Lorem ipsum dolor sit amet, no nam oblique veritus.
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-timeline-item>

        <v-timeline-item
          color="cyan lighten-1"
          fill-dot
          right
        >
          <v-card>
            <v-card-title class="cyan lighten-1">
              <v-icon
                class="mr-4"
                dark
                size="42"
              >
                mdi-email-outline
              </v-icon>
              <h2 class="display-1 white--text font-weight-light">Title 3</h2>
            </v-card-title>
            <v-container>
              <v-row>
                <v-col
                  v-for="n in 3"
                  :key="n"
                  cols="12"
                  md="4"
                >
                  Lorem ipsum dolor sit amet, no nam oblique veritus no nam oblique.
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-timeline-item>

        <v-timeline-item
          color="red lighten-1"
          fill-dot
          left
          small
        >
          <v-card>
            <v-card-title class="red lighten-1 justify-end">
              <h2 class="display-1 mr-4 white--text font-weight-light">Title 4</h2>
              <v-icon
                dark
                size="42"
              >
                mdi-account-multiple-outline
              </v-icon>
            </v-card-title>
            <v-container>
              <v-row>
                <v-col class="hidden-sm-and-down" md="2">
                  <v-icon size="64">mdi-server-network</v-icon>
                </v-col>
                <v-col cols="12" md="10">
                  Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod
                  convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus.
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-timeline-item>

        <v-timeline-item
          color="green lighten-1"
          fill-dot
          right
        >
          <v-card>
            <v-card-title class="green lighten-1">
              <v-icon
                class="mr-4"
                dark
                size="42"
              >
                mdi-phone-in-talk
              </v-icon>
              <h2 class="display-1 white--text font-weight-light">Title 5</h2>
            </v-card-title>
            <v-container>
              <v-row>
                <v-col>
                  Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod
                  convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an
                  salutandi sententiae.
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-timeline-item>
      </v-timeline>
    </flex-box>
    <v-divider class="my-5"></v-divider>

    <!--=== Icon dots ===-->
    <div class="title">Icon dots (Exx.3)</div>
    <div class="subtitle-1">
      Conditionally use icons within the <kbd>v-timeline-item</kbd>'s dot to provide additional context.
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
            <code4></code4>
          </highlight-code>
        </v-col>
      </v-row>
    </flex-box-panel>
    <br/>
    <!-- TimeLine -->
    <flex-box
      :md="10"
    >
      <v-timeline align-top :dense="$vuetify.breakpoint.smAndDown">
        <v-timeline-item
          v-for="(item, i) in exx3Items"
          :key="i"
          :color="item.color"
          :icon="item.icon"
          fill-dot
        >
          <v-card
            :color="item.color"
            dark
          >
            <v-card-title class="title">Lorem Ipsum Dolor</v-card-title>
            <v-card-text class="white black--text">
              <br>
              <p>Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod
                convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an
                salutandi sententiae.</p>
              <v-btn
                :color="item.color"
                class="mx-0"
                outlined
              >
                Button
              </v-btn>
            </v-card-text>
          </v-card>
        </v-timeline-item>
      </v-timeline>
    </flex-box>
    <v-divider class="my-5"></v-divider>

    <!--=== Reverse direction ===-->
    <div class="title">Reverse direction (Exx.4)</div>
    <div class="subtitle-1">
      You can reverse the direction of the timeline items by using the <kbd>reverse</kbd> prop. This works both
      in default and <kbd>dense</kbd> mode.
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
            <code6></code6>
          </highlight-code>
        </v-col>
      </v-row>
    </flex-box-panel>
    <br/>
    <!-- TimeLine -->
    <flex-box
      :md="10"
    >
      <v-switch v-model="exx4Reverse" label="Toggle reverse"></v-switch>
      <v-timeline :reverse="exx4Reverse" :dense="$vuetify.breakpoint.smAndDown">
        <v-timeline-item
          v-for="n in 2"
          :key="n"
        >
          <span slot="opposite">Tus eu perfecto</span>
          <v-card class="elevation-2">
            <v-card-title class="headline">Lorem ipsum</v-card-title>
            <v-card-text>
              Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod
              convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an
              salutandi sententiae.
            </v-card-text>
          </v-card>
        </v-timeline-item>
      </v-timeline>
      <v-timeline :reverse="exx4Reverse" dense>
        <v-timeline-item
          v-for="n in 2"
          :key="n"
        >
          <span slot="opposite">Tus eu perfecto</span>
          <v-card class="elevation-2">
            <v-card-title class="headline">Lorem ipsum</v-card-title>
            <v-card-text>
              Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod
              convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an
              salutandi sententiae.
            </v-card-text>
          </v-card>
        </v-timeline-item>
      </v-timeline>
    </flex-box>
    <v-divider class="my-5"></v-divider>

    <!--=== Timeline card ===-->
    <div class="title">Timeline card (Exx.5)</div>
    <div class="subtitle-1">
      If you place a <kbd>v-card</kbd> inside of a <kbd>v-timeline-item</kbd>, a caret will appear on the side of the
      card.
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
          md="8"
        >
          <highlight-code :md="12" title="Template" :init="true">
            <code7></code7>
          </highlight-code>
        </v-col>
      </v-row>
    </flex-box-panel>
    <br/>
    <!-- TimeLine -->
    <flex-box
      :md="10"
    >
      <v-timeline>
        <v-timeline-item
          v-for="n in 3"
          :key="n"
          color="red lighten-2"
          large
        >
          <template v-slot:opposite>
            <span>Tus eu perfecto</span>
          </template>
          <v-card class="elevation-2">
            <v-card-title class="headline">Lorem ipsum</v-card-title>
            <v-card-text>
              Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod
              convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an
              salutandi sententiae.
            </v-card-text>
          </v-card>
        </v-timeline-item>
      </v-timeline>
    </flex-box>
    <v-divider class="my-5"></v-divider>

    <!--=== Dense alert ===-->
    <div class="title">Dense alert (Exx.6)</div>
    <div class="subtitle-1">
      <kbd>dense</kbd> timelines position all content to the right. In this example, <kbd>v-alert</kbd> replaces
      the card to provide a different design.
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
    <!-- TimeLine -->
    <flex-box-card
      :md="6"
    >
      <template v-slot:card-title>
        <v-card-title
          class="blue-grey white--text"
        >
          <span class="title">Logs</span>
          <v-spacer></v-spacer>
          <v-btn
            :outlined="exx6Interval === null"
            :color="exx6Interval === null ? 'white' : 'primary'"
            dark
            depressed
            @click="exx6Interval === null ? exx6Start() : exx6Stop()"
          >
            {{ exx6Interval === null ? 'Start Logging' : 'Stop Logging' }}
          </v-btn>
        </v-card-title>
      </template>
      <v-timeline dense>
        <v-slide-x-reverse-transition
          group
          hide-on-leave
        >
          <v-timeline-item
            v-for="item in exx6Items"
            :key="item.id"
            :color="item.color"
            small
            fill-dot
          >
            <v-alert
              :value="true"
              :color="item.color"
              :icon="item.icon"
              class="white--text"
            >
              Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod
              convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an
              salutandi sententiae.
            </v-alert>
          </v-timeline-item>
        </v-slide-x-reverse-transition>
      </v-timeline>
    </flex-box-card>
    <v-divider class="my-5"></v-divider>

    <!--=== Opposite slot ===-->
    <div class="title">Opposite slot (Exx.7)</div>
    <div class="subtitle-1">
      The <kbd>opposite</kbd> slot provides an additional layer of customization within your timelines.
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
    <!-- TimeLine -->
    <flex-box
      :md="10"
    >
      <v-timeline>
        <v-timeline-item
          v-for="(year, i) in exx7Years"
          :key="i"
          :color="year.color"
          small
        >
          <template v-slot:opposite>
        <span
          :class="`headline font-weight-bold ${year.color}--text`"
          v-text="year.year"
        ></span>
          </template>
          <div class="py-4">
            <h2 :class="`headline font-weight-light mb-4 ${year.color}--text`">Lorem ipsum</h2>
            <div>
              Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod
              convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an
              salutandi sententiae.
            </div>
          </div>
        </v-timeline-item>
      </v-timeline>
    </flex-box>
    <v-divider class="my-5"></v-divider>

    <!--=== Avatar dots ===-->
    <div class="title">Avatar dots (Exx.8)</div>
    <div class="subtitle-1">
      Insert avatars into dots with use of the <kbd>icon</kbd> slot and <kbd>v-avatar</kbd>.
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
          md="8"
        >
          <highlight-code :md="12" title="Template" :init="true">
            <code12></code12>
          </highlight-code>
        </v-col>
      </v-row>
    </flex-box-panel>
    <br/>
    <!-- TimeLine -->
    <flex-box
      :md="10"
    >
      <v-timeline>
        <v-timeline-item
          v-for="n in 4"
          :key="n"
          large
        >
          <template v-slot:icon>
            <v-avatar>
              <img src="http://i.pravatar.cc/64">
            </v-avatar>
          </template>
          <template v-slot:opposite>
            <span>Tus eu perfecto</span>
          </template>
          <v-card class="elevation-2">
            <v-card-title class="headline">Lorem ipsum</v-card-title>
            <v-card-text>Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed
              euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an
              salutandi sententiae.
            </v-card-text>
          </v-card>
        </v-timeline-item>
      </v-timeline>
    </flex-box>
    <v-divider class="my-5"></v-divider>

    <!--=== Colored dots ===-->
    <div class="title">Colored dots (Exx.9)</div>
    <div class="subtitle-1">
      Colored dots create visual breakpoints that make your timelines easier to read.
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
          md="8"
        >
          <highlight-code :md="12" title="Template" :init="true">
            <code13></code13>
          </highlight-code>
        </v-col>
      </v-row>
    </flex-box-panel>
    <br/>
    <!-- TimeLine -->
    <flex-box-card
      :md="4"
    >
      <template v-slot:tool-bar>
        <v-toolbar
          color="purple lighten-3"
          dark
        >
          <v-app-bar-nav-icon></v-app-bar-nav-icon>

          <v-toolbar-title>Timeline</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
          <v-avatar>
            <v-img
              :src="exx9TopAvatar"></v-img>
          </v-avatar>
        </v-toolbar>
      </template>
      <template v-slot:card-img>
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/forest.jpg"
          gradient="to top, rgba(0,0,0,.44), rgba(0,0,0,.44)"
          class="white--text"
        >
          <v-container class="fill-height">
            <v-row align="center">
              <strong class="display-4 font-weight-regular mx-6">8</strong>
              <div class="headline font-weight-light">Monday</div>
              <div class="text-uppercase font-weight-light ml-5">February 2015</div>
            </v-row>
          </v-container>
        </v-img>
      </template>
      <v-btn
        absolute
        bottom
        color="pink"
        right
        fab
      >
        <v-icon color="white">mdi-plus</v-icon>
      </v-btn>
      <v-timeline
        align-top
        dense
      >
        <v-timeline-item
          color="pink"
          small
        >
          <v-row class="pt-1">
            <v-col cols="3">
              <strong>5pm</strong>
            </v-col>
            <v-col>
              <strong>New Icon</strong>
              <div class="caption">Mobile App</div>
            </v-col>
          </v-row>
        </v-timeline-item>

        <v-timeline-item
          color="teal lighten-3"
          small
        >
          <v-row class="pt-1">
            <v-col cols="3">
              <strong>3-4pm</strong>
            </v-col>
            <v-col>
              <strong>Design Stand Up</strong>
              <div class="caption mb-2">Hangouts</div>
              <v-avatar>
                <v-img
                  :src="exx9Avatar1"
                ></v-img>
              </v-avatar>
              <v-avatar>

                <v-img
                  :src="exx9Avatar2"
                ></v-img>
              </v-avatar>
              <v-avatar>
                <v-img
                  :src="exx9Avatar3"
                ></v-img>
              </v-avatar>
            </v-col>
          </v-row>
        </v-timeline-item>

        <v-timeline-item
          color="pink"
          small
        >
          <v-row class="pt-1">
            <v-col cols="3">
              <strong>12pm</strong>
            </v-col>
            <v-col>
              <strong>Lunch break</strong>
            </v-col>
          </v-row>
        </v-timeline-item>

        <v-timeline-item
          color="teal lighten-3"
          small
        >
          <v-row class="pt-1">
            <v-col cols="3">
              <strong>9-11am</strong>
            </v-col>
            <v-col>
              <strong>Finish Home Screen</strong>
              <div class="caption">Web App</div>
            </v-col>
          </v-row>
        </v-timeline-item>
      </v-timeline>
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
  import FlexBoxPanel from '~/components/widgets/containers/flex-box-panel';
  import HighlightCode from '~/components/widgets/highlight/highlight-code';
  import Code1 from '~/components/codes/components/timelines/code-html-1';
  import Code2 from '~/components/codes/components/timelines/code-html-2';
  import Code3 from '~/components/codes/components/timelines/code-html-3';
  import Code4 from '~/components/codes/components/timelines/code-js-4';
  import Code5 from '~/components/codes/components/timelines/code-html-5';
  import Code6 from '~/components/codes/components/timelines/code-js-6';
  import Code7 from '~/components/codes/components/timelines/code-html-7';
  import Code8 from '~/components/codes/components/timelines/code-html-8';
  import Code9 from '~/components/codes/components/timelines/code-js-9';
  import Code10 from '~/components/codes/components/timelines/code-html-10';
  import Code11 from '~/components/codes/components/timelines/code-js-11';
  import Code12 from '~/components/codes/components/timelines/code-html-12';
  import Code13 from '~/components/codes/components/timelines/code-html-13';

  const debug = require('debug')('app:page.basicForms');

  const COLORS = [
    'info',
    'warning',
    'error',
    'success',
  ];
  const ICONS = {
    info: 'mdi-information',
    warning: 'mdi-alert',
    error: 'mdi-alert-circle',
    success: 'mdi-check-circle',
  };

  export default {
    components: {
      AppPageHeader,
      FlexBox,
      FlexBoxCard,
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
    },
    data() {
      return {
        title: this.$t('timelines.title'),
        description: this.$t('timelines.description'),
        panel: [],
        exx3Items: [
          {
            color: 'red lighten-2',
            icon: 'mdi-star',
          },
          {
            color: 'purple darken-1',
            icon: 'mdi-book-variant',
          },
          {
            color: 'green lighten-1',
            icon: 'mdi-airballoon',
          },
          {
            color: 'indigo',
            icon: 'mdi-buffer',
          },
        ],
        exx4Reverse: true,
        exx6Interval: null,
        exx6Items: [
          {
            id: 1,
            color: 'info',
            icon: ICONS['info'],
          },
        ],
        exx6Nonce: 2,
        exx7Years: [
          {
            color: 'cyan',
            year: '1960',
          },
          {
            color: 'green',
            year: '1970',
          },
          {
            color: 'pink',
            year: '1980',
          },
          {
            color: 'amber',
            year: '1990',
          },
          {
            color: 'orange',
            year: '2000',
          },
        ],
        exx9TopAvatar: 'https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light',
        exx9Avatar1: 'https://avataaars.io/?avatarStyle=Circle&topType=LongHairFrida&accessoriesType=Kurt&hairColor=Red&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=GraphicShirt&clotheColor=Gray01&graphicType=Skull&eyeType=Wink&eyebrowType=RaisedExcitedNatural&mouthType=Disbelief&skinColor=Brown',
        exx9Avatar2: 'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairFrizzle&accessoriesType=Prescription02&hairColor=Black&facialHairType=MoustacheMagnum&facialHairColor=BrownDark&clotheType=BlazerSweater&clotheColor=Black&eyeType=Default&eyebrowType=FlatNatural&mouthType=Default&skinColor=Tanned',
        exx9Avatar3: 'https://avataaars.io/?avatarStyle=Circle&topType=LongHairMiaWallace&accessoriesType=Sunglasses&hairColor=BlondeGolden&facialHairType=Blank&clotheType=BlazerSweater&eyeType=Surprised&eyebrowType=RaisedExcited&mouthType=Smile&skinColor=Pale',
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
    beforeDestroy() {
      this.exx6Stop()
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
      exx6AddEvent() {
        let {color, icon} = this.exx6GenAlert();

        const previousColor = this.exx6Items[0].color;

        while (previousColor === color) {
          color = this.exx6GenColor()
        }

        this.exx6Items.unshift({
          id: this.exx6Nonce++,
          color,
          icon,
        });

        if (this.exx6Nonce > 6) {
          this.exx6Items.pop()
        }
      },
      exx6GenAlert() {
        const color = this.exx6GenColor();

        return {
          color,
          icon: this.exx6GenIcon(color),
        }
      },
      exx6GenColor() {
        return COLORS[Math.floor(Math.random() * 3)]
      },
      exx6GenIcon(color) {
        return ICONS[color]
      },
      exx6Start() {
        this.exx6Interval = window.setInterval(this.exx6AddEvent, 3000)
      },
      exx6Stop() {
        window.clearInterval(this.exx6Interval);
        this.exx6Interval = null
      },
    },
  }
</script>
