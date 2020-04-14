<template>
  <div>
    <!--=== Page Header ===-->
    <app-page-header
      :page-title="description"
    ></app-page-header>

    <!--=== Description ===-->
    <blockquote class="blockquote line-left"><em>Vuetify comes with a 12 point grid system built using <kbd>flex-box</kbd>.
      The grid is used to create specific layouts within an application's content. It contains 5 types of media
      breakpoints that are used for targeting specific screen sizes or orientations,
      <span class="font-weight-bold">xs, sm, md, lg</span> and <span class="font-weight-bold">xl</span>.
      These resolutions are defined below in the Viewport Breakpoints table and can be modified by customizing the
      <a href="https://vuetifyjs.com/en/customization/breakpoints/" target="_blank">Breakpoint service</a></em></blockquote>
    <br/>
    <v-alert type="info">
      1.x grid system has been deprecated in favor of the 2.x grid system. Documentation for 1.x grids can be found in the v1.5 docs
    </v-alert>

    <v-row justify="center">
      <v-col
        cols="12"
        md="8"
      >
        <v-card
          color="secondary"
          :dark="theme.dark"
        >
          <v-card-title class="d-flex justify-center">Material Design Viewport Breakpoints</v-card-title>
          <v-card-text>
            <simple-table
              height="350px"
              :thead="theadBreakpoints.thead"
              :tfoot="tfootBreakpoints.tfoot"
              :tbody="tbodyBreakpoints"
            ></simple-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!--=== Usage ===-->
    <div class="title">Usage</div>
    <div class="subtitle-1"><p>The Vuetify grid is heavily inspired by the
      <a href="https://getbootstrap.com/docs/4.0/layout/grid/" target="_blank">Bootstrap grid</a>. It is integrated by using a
      series of containers, rows, and columns to layout and align content. If you are new to flexbox,
      <a href="https://css-tricks.com/snippets/css/a-guide-to-flexbox/#flexbox-background" target="_blank">Read the
        CSS Tricks flexbox guide</a> for background, terminology, guidelines, and code snippets.</p>
      <p>In the example above, we created three equal-width columns on small, medium, large and extra large devices.
        The parent <kbd>v-container</kbd> to center the inner <kbd>v-cols</kbd>.</p>
      <ul>
        <li><kbd>v-container</kbd> provides the ability to center and horizontally pad your site's contents. You can also use the
          fluid prop to fully extend the container across all viewport and device sizes. Maintains previous 1.x
          functionality in which props are passed through as classes on v-container allowing for the application of
          helper classes (such as <span class="font-weight-bold">ma-#/pa-#/fill-height</span>) to easily be applied</li>
        <li><kbd>v-row</kbd> is a wrapper component for <kbd>v-col</kbd>. It utilizes flex properties to control the layout and flow of its
          inner columns. It uses a standard gutter of <kbd>24px</kbd>. This can be reduced with the <kbd>dense</kbd> prop or removed
          completely with <kbd>no-gutters</kbd>. This is the 2.x replacement for <kbd>v-layout</kbd> in 1.x.</li>
        <li><kbd>v-col</kbd> is a content holder that must be a direct child of <kbd>v-row</kbd>. This is the 2.x replacement for <kbd>v-flex</kbd> in 1.x.</li>
      </ul>
      <br/>
      <v-alert type="info" class="my-3">
        When using the grid system with IE11 you will need to set an explicit <kbd>height</kbd> as <kbd>min-height</kbd> will not
        suffice and cause undesired results.
      </v-alert>
    </div>
    <br/>

    <!--=== Auto sizing columns ===-->
    <div class="title">Auto sizing columns</div>
    <div class="subtitle-1">Columns will automatically take up an equal amount of space within their parent container.
      This can be modified using the <kbd>cols</kbd> prop. You can also utilize the <span class="font-weight-bold">sm, md, lg</span>
      and <span class="font-weight-bold">xl</span> props to further define how the column will be sized in different viewport sizes.
    </div>
    <br/>
    <v-row justify="center">
      <v-col
        cols="12"
        md="8"
      >
        <v-card
          color="secondary"
          :dark="theme.dark"
        >
          <v-card-text>
            <v-row
              v-for="n in 2"
              :key="n"
              :class="n === 1 ? 'mb-6' : ''"
              no-gutters
            >
              <v-col
                v-for="k in n + 1"
                :key="k"
              >
                <v-card
                  class="pa-2"
                  outlined
                  tile
                >
                  {{ k }} of {{ n + 1 }}
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import AppPageHeader from '~/components/app/layout/AppPageHeader';
  import SimpleTable from '~/components/widgets/table/SimpleTable';
  import viewportBreakpoints from '~/api/demo/ui-elements/viewport-breakpoints.json';

  export default {
    components: {
      AppPageHeader,
      SimpleTable
    },
    data() {
      return {
        title: this.$t('grids.title'),
        description: this.$t('grids.description'),
        theadBreakpoints: viewportBreakpoints.find(item => item.isThead),
        tfootBreakpoints: viewportBreakpoints.find(item => item.isTfoot),
        tbodyBreakpoints: viewportBreakpoints.filter(item => !item.isTfoot && !item.isThead),
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
        config: 'getConfig'
      }),
    },
    methods: {
    },
  }
</script>
