<template>
  <div>
    <!--=== Page Header ===-->
    <app-page-header
      :page-title="description"
    ></app-page-header>

    <!--=== Description ===-->
    <blockquote class="blockquote line-left"><em>Vuetify comes with a 12 point grid system built using
      <kbd>flex-box</kbd>.
      The grid is used to create specific layouts within an application's content. It contains 5 types of media
      breakpoints that are used for targeting specific screen sizes or orientations,
      <span class="font-weight-bold">xs, sm, md, lg</span> and <span class="font-weight-bold">xl</span>.
      These resolutions are defined below in the Viewport Breakpoints table and can be modified by customizing the
      <a href="https://vuetifyjs.com/en/customization/breakpoints/" target="_blank">Breakpoint service</a></em>
    </blockquote>
    <br/>
    <flex-box :md="10">
      <v-alert type="info">
        1.x grid system has been deprecated in favor of the 2.x grid system. Documentation for 1.x grids can be found in
        the v1.5 docs
      </v-alert>
    </flex-box>

    <flex-box :md="8">
      <v-card
        color="secondary"
        :dark="theme.dark"
        outlined
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
    </flex-box>

    <!--=== Usage ===-->
    <div class="title">Usage</div>
    <div class="subtitle-1"><p>The Vuetify grid is heavily inspired by the
      <a href="https://getbootstrap.com/docs/4.0/layout/grid/" target="_blank">Bootstrap grid</a>. It is integrated by
      using a
      series of containers, rows, and columns to layout and align content. If you are new to flexbox,
      <a href="https://css-tricks.com/snippets/css/a-guide-to-flexbox/#flexbox-background" target="_blank">Read the
        CSS Tricks flexbox guide</a> for background, terminology, guidelines, and code snippets.</p>
      <p>In the example above, we created three equal-width columns on small, medium, large and extra large devices.
        The parent <kbd>v-container</kbd> to center the inner <kbd>v-cols</kbd>.</p>
      <ul>
        <li><kbd>v-container</kbd> provides the ability to center and horizontally pad your site's contents. You can
          also use the
          fluid prop to fully extend the container across all viewport and device sizes. Maintains previous 1.x
          functionality in which props are passed through as classes on v-container allowing for the application of
          helper classes (such as <span class="font-weight-bold">ma-#/pa-#/fill-height</span>) to easily be applied
        </li>
        <li><kbd>v-row</kbd> is a wrapper component for <kbd>v-col</kbd>. It utilizes flex properties to control the
          layout and flow of its
          inner columns. It uses a standard gutter of <kbd>24px</kbd>. This can be reduced with the <kbd>dense</kbd>
          prop or removed
          completely with <kbd>no-gutters</kbd>. This is the 2.x replacement for <kbd>v-layout</kbd> in 1.x.
        </li>
        <li><kbd>v-col</kbd> is a content holder that must be a direct child of <kbd>v-row</kbd>. This is the 2.x
          replacement for <kbd>v-flex</kbd> in 1.x.
        </li>
      </ul>
      <br/>
      <flex-box :md="10">
        <v-alert type="info" class="my-3">
          When using the grid system with IE11 you will need to set an explicit <kbd>height</kbd> as
          <kbd>min-height</kbd>
          will not
          suffice and cause undesired results.
        </v-alert>
      </flex-box>
    </div>
    <br/>

    <!--=== Auto sizing columns ===-->
    <div class="title">Auto sizing columns</div>
    <div class="subtitle-1">Columns will automatically take up an equal amount of space within their parent container.
      This can be modified using the <kbd>cols</kbd> prop. You can also utilize the <span class="font-weight-bold">sm, md, lg</span>
      and <span class="font-weight-bold">xl</span> props to further define how the column will be sized in different
      viewport sizes.
    </div>
    <br/>

    <flex-box-card :md="8" justify="left">
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
    </flex-box-card>

    <!--=== One column width ===-->
    <div class="title">One column width</div>
    <div class="subtitle-1">When using the auto-layout, you can define the width of only one column and still have its
      siblings to automatically resize around it.
    </div>
    <br/>
    <flex-box-card :md="8" justify="left">
      <v-row
        class="mb-6"
        no-gutters
      >
        <v-col
          v-for="n in 3"
          :key="n"
          :cols="n === 2 ? 6 : undefined"
        >
          <v-card
            class="pa-2"
            outlined
            tile
          >
            {{ n }} of 3 {{ n === 2 ? '(wider)' : '' }}
          </v-card>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col
          v-for="n in 3"
          :key="n"
          :cols="n === 2 ? 5 : undefined"
        >
          <v-card
            class="pa-2"
            outlined
            tile
          >
            {{ n }} of 3 {{ n === 2 ? '(wider)' : '' }}
          </v-card>
        </v-col>
      </v-row>
    </flex-box-card>

    <!--=== Variable content width ===-->
    <div class="title">Variable content width</div>
    <div class="subtitle-1">Assigning breakpoint width for columns can be configured to resize based upon the nature
      width of their content.
    </div>
    <br/>
    <flex-box-card :md="8" justify="left">
      <v-row
        class="mb-6"
        justify="center"
        no-gutters
      >
        <v-col lg="2">
          <v-card
            class="pa-2"
            outlined
            tile
          >
            1 of 3
          </v-card>
        </v-col>
        <v-col md="auto">
          <v-card
            class="pa-2"
            outlined
            tile
          >
            Variable width content
          </v-card>
        </v-col>
        <v-col lg="2">
          <v-card
            class="pa-2"
            outlined
            tile
          >
            3 of 3
          </v-card>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col>
          <v-card
            class="pa-2"
            outlined
            tile
          >
            1 of 3
          </v-card>
        </v-col>
        <v-col md="auto">
          <v-card
            class="pa-2"
            outlined
            tile
          >
            Variable width content
          </v-card>
        </v-col>
        <v-col lg="2">
          <v-card
            class="pa-2"
            outlined
            tile
          >
            3 of 3
          </v-card>
        </v-col>
      </v-row>
    </flex-box-card>

    <!--=== Grow and Shrink ===-->
    <div class="title">Grow and Shrink</div>
    <div class="subtitle-1">By default, flex components will automatically fill the available space in a row or column.
      They will also shrink relative to the rest of the flex items in the flex container when a specific size is
      not designated. You can define the column width of the <kbd>v-col</kbd> by using the cols prop and providing
      a value from <span class="font-weight-bold">1 to 12</span>.
    </div>
    <br/>
    <flex-box-card :md="8" justify="left">
      <v-row
        class="mb-6"
        no-gutters
      >
        <v-col
          v-for="n in 4"
          :key="n"
        >
          <v-card
            class="pa-2"
            tile
            outlined
          >
            col
          </v-card>
        </v-col>
      </v-row>

      <v-row no-gutters>
        <v-col
          v-for="n in 2"
          :key="n"
          :cols="n === 1 ? 8 : 4"
        >
          <v-card
            class="pa-2"
            tile
            outlined
          >
            col-{{ n === 1 ? 8 : 4 }}
          </v-card>
        </v-col>
      </v-row>
    </flex-box-card>

    <!--=== Row and column breakpoints ===-->
    <div class="title">Row and column breakpoints</div>
    <div class="subtitle-1">Dynamically change your layout based upon resolution. (resize your screen and watch
      the <kbd>top row</kbd> layout change on <span class="font-weight-bold">sm, md, and lg</span> breakpoints)
    </div>
    <br/>
    <flex-box-card :md="8" justify="left">
      <v-row
        class="mb-6"
        no-gutters
      >
        <v-col
          v-for="n in 2"
          :key="n"
          :lg="cols[n - 1]"
          :md="6"
          :sm="cols[n - 1]"
        >
          <v-card
            class="pa-2"
            outlined
            tile
          >
            col-{{ cols[n - 1] }}
          </v-card>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col
          v-for="n in 3"
          :key="n"
          cols="sm"
        >
          <v-card
            class="pa-2"
            outlined
            tile
          >
            col
          </v-card>
        </v-col>
      </v-row>
    </flex-box-card>

    <!--=== Unique layouts ===-->
    <div class="title">Unique layouts</div>
    <div class="subtitle-1">The power and flexibility of the Vuetify grid system allows you to create amazing user
      interfaces.
    </div>
    <br/>
    <flex-box-card :md="8" justify="left">
      <!-- Stack the columns on mobile by making one full-width and the other half-width -->
      <v-row>
        <v-col
          cols="12"
          md="8"
        >
          <v-card
            class="pa-2"
            outlined
            tile
          >
            .col-12 .col-md-8
          </v-card>
        </v-col>
        <v-col
          cols="6"
          md="4"
        >
          <v-card
            class="pa-2"
            outlined
            tile
          >
            .col-6 .col-md-4
          </v-card>
        </v-col>
      </v-row>
      <!-- Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop -->
      <v-row>
        <v-col
          v-for="n in 3"
          :key="n"
          cols="6"
          md="4"
        >
          <v-card
            class="pa-2"
            outlined
            tile
          >
            .col-6 .col-md-4
          </v-card>
        </v-col>
      </v-row>

      <!-- Columns are always 50% wide, on mobile and desktop -->
      <v-row>
        <v-col
          v-for="n in 2"
          :key="n"
          cols="6"
        >
          <v-card
            class="pa-2"
            outlined
            tile
          >
            .col-6
          </v-card>
        </v-col>
      </v-row>
    </flex-box-card>

    <!--=== Vertical alignment ===-->
    <div class="title">Vertical alignment</div>
    <div class="subtitle-1">Change the vertical alignment of flex items and their parents using the
      <kbd>align</kbd> and <kbd>align-self</kbd> properties.
    </div>
    <br/>
    <flex-box-card :md="8" justify="left">
      <v-container
        v-for="align in alignments"
        :key="align"
        class="grey lighten-5 mb-6"
      >
        <v-row
          :align="align"
          no-gutters
          style="height: 150px;"
        >
          <v-col
            v-for="n in 3"
            :key="n"
          >
            <v-card
              class="pa-2"
              outlined
              tile
            >
              One of three columns
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <v-container class="grey lighten-5">
        <v-row
          no-gutters
          style="height: 150px;"
        >
          <v-col
            v-for="align in alignments"
            :key="align"
            :align-self="align"
          >
            <v-card
              class="pa-2"
              outlined
              tile
            >
              One of three columns
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </flex-box-card>

    <!--=== Horizontal alignment ===-->
    <div class="title">Horizontal alignment</div>
    <div class="subtitle-1">Change the horizontal alignment of flex items and their parents using the
      <kbd>justify</kbd> and <kbd>justify-self</kbd> properties.
    </div>
    <br/>
    <flex-box-card :md="8" justify="left">
      <v-row
        v-for="j in justify"
        :key="j"
        :justify="j"
      >
        <v-col
          v-for="k in 2"
          :key="k"
          md="4"
        >
          <v-card
            class="pa-2"
            outlined
            tile
          >
            One of two columns
          </v-card>
        </v-col>
      </v-row>
    </flex-box-card>

    <!--=== No gutters ===-->
    <div class="title">No gutters</div>
    <div class="subtitle-1">You can remove the negative margins from <kbd>v-row</kbd> and the padding from its direct
      <kbd>v-col</kbd> children using the <kbd>no-gutters</kbd> property.
    </div>
    <br/>
    <flex-box-card :md="8" justify="left">
      <v-row no-gutters>
        <v-col
          cols="12"
          sm="6"
          md="8"
        >
          <v-card
            class="pa-2"
            outlined
            tile
          >
            .col-12 .col-sm-6 .col-md-8
          </v-card>
        </v-col>
        <v-col
          cols="6"
          md="4"
        >
          <v-card
            class="pa-2"
            outlined
            tile
          >
            .col-6 .col-md-4
          </v-card>
        </v-col>
      </v-row>
    </flex-box-card>

    <!--=== Column wrapping ===-->
    <div class="title">Column wrapping</div>
    <div class="subtitle-1">When more than 12 columns are placed within a given row (that is not using the
      <kbd>.flex-nowrap</kbd> utility class), each group of extra columns will wrap onto a new line.
    </div>
    <br/>
    <flex-box-card :md="8" justify="left">
      <v-row no-gutters>
        <v-col cols="9">
          <v-card
            class="pa-2"
            outlined
            tile
          >
            .col-9
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card
            class="pa-2"
            outlined
            tile
          >
            .col-4<br>Since 9 + 4 = 13 &gt; 12, this 4-column-wide div gets wrapped onto a new line as one
            contiguous unit.
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card
            class="pa-2"
            outlined
            tile
          >
            .col-6<br>Subsequent columns continue along the new line.
          </v-card>
        </v-col>
      </v-row>
    </flex-box-card>

    <!--=== Order classes ===-->
    <div class="title">Order classes</div>
    <div class="subtitle-1">You can control the ordering of grid items. As with offsets, you can set different orders
      for different sizes. Design specialized screen layouts that accommodate to any application.
    </div>
    <br/>
    <flex-box-card :md="8" justify="left">
      <v-row no-gutters>
        <v-col>
          <v-card
            class="pa-2"
            outlined
            tile
          >
            First, but unordered
          </v-card>
        </v-col>
        <v-col order="12">
          <v-card
            class="pa-2"
            outlined
            tile
          >
            Second, but last
          </v-card>
        </v-col>
        <v-col order="1">
          <v-card
            class="pa-2"
            outlined
            tile
          >
            Third, but first
          </v-card>
        </v-col>
      </v-row>
    </flex-box-card>

    <!--=== Order last / first ===-->
    <div class="title">Order last / first</div>
    <div class="subtitle-1">You can also designate explicitly <kbd>first</kbd> or <kbd>last</kbd> which will assign -1
      or 13 values
      respectively to the order CSS property.
    </div>
    <br/>
    <flex-box-card :md="8" justify="left">
      <v-row no-gutters>
        <v-col order="last">
          <v-card
            class="pa-2"
            outlined
            tile
          >
            First, but last
          </v-card>
        </v-col>
        <v-col>
          <v-card
            class="pa-2"
            outlined
            tile
          >
            Second, but unordered
          </v-card>
        </v-col>
        <v-col order="first">
          <v-card
            class="pa-2"
            outlined
            tile
          >
            Third, but first
          </v-card>
        </v-col>
      </v-row>
    </flex-box-card>

    <!--=== Offset ===-->
    <div class="title">Offset</div>
    <div class="subtitle-1">Offsets are useful for compensating for elements that may not be visible yet, or to
      control the position of content. Just as with breakpoints, you can set an offset for any available sizes.
      This allows you to fine tune your application layout precisely to your needs.
    </div>
    <br/>
    <flex-box-card :md="8" justify="left">
      <v-row
        class="mb-6"
        no-gutters
      >
        <v-col md="4">
          <v-card
            class="pa-2"
            outlined
            tile
          >
            .col-md-4
          </v-card>
        </v-col>
        <v-col
          md="4"
          offset-md="4"
        >
          <v-card
            class="pa-2"
            outlined
            tile
          >
            .col-md-4 .offset-md-4
          </v-card>
        </v-col>
      </v-row>
      <v-row
        class="mb-6"
        no-gutters
      >
        <v-col
          md="3"
          offset-md="3"
        >
          <v-card
            class="pa-2"
            outlined
            tile
          >
            .col-md-3 .offset-md-3
          </v-card>
        </v-col>
        <v-col
          md="3"
          offset-md="3"
        >
          <v-card
            class="pa-2"
            outlined
            tile
          >
            .col-md-3 .offset-md-3
          </v-card>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col
          md="6"
          offset-md="3"
        >
          <v-card
            class="pa-2"
            outlined
            tile
          >
            .col-md-6 .offset-md-3
          </v-card>
        </v-col>
      </v-row>
    </flex-box-card>

    <!--=== Offset breakpoint ===-->
    <div class="title">Offset breakpoint</div>
    <div class="subtitle-1">Offset can also be applied on a per breakpoint basis.
    </div>
    <br/>
    <flex-box-card :md="8" justify="left">
      <v-row
        class="mb-6"
        no-gutters
      >
        <v-col
          sm="5"
          md="6"
        >
          <v-card
            class="pa-2"
            outlined
            tile
          >
            .col-sm-5 .col-md-6
          </v-card>
        </v-col>
        <v-col
          sm="5"
          offset-sm="2"
          md="6"
          offset-md="0"
        >
          <v-card
            class="pa-2"
            outlined
            tile
          >
            .col-sm-5 .offset-sm-2 .col-md-6 .offset-md-0
          </v-card>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col
          sm="6"
          md="5"
          lg="6"
        >
          <v-card
            class="pa-2"
            outlined
            tile
          >
            .col-sm-6 .col-md-5 .col-lg-6
          </v-card>
        </v-col>
        <v-col
          sm="6"
          md="5"
          offset-md="2"
          lg="6"
          offset-lg="0"
        >
          <v-card
            class="pa-2"
            outlined
            tile
          >
            .col-sm-6 .col-md-5 .offset-md-2 .col-lg-6 .offset-lg-0
          </v-card>
        </v-col>
      </v-row>
    </flex-box-card>

    <!--=== Margin utilities ===-->
    <div class="title">Margin utilities</div>
    <div class="subtitle-1">Using the <a href="https://vuetifyjs.com/en/styles/flex/#auto-margins" target="_blank">auto
      margin helper utilities</a>
      you can force sibling columns away from each other.
    </div>
    <br/>
    <flex-box-card :md="8" justify="left">
      <v-row>
        <v-col md="4">
          <v-card
            class="pa-2"
            outlined
            tile
          >
            .col-md-4
          </v-card>
        </v-col>
        <v-col
          md="4"
          class="ml-auto"
        >
          <v-card
            class="pa-2"
            outlined
            tile
          >
            .col-md-4 .ml-auto
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          md="3"
          class="ml-md-auto"
        >
          <v-card
            class="pa-2"
            outlined
            tile
          >
            .col-md-3 .ml-md-auto
          </v-card>
        </v-col>
        <v-col
          md="3"
          class="ml-md-auto"
        >
          <v-card
            class="pa-2"
            outlined
            tile
          >
            .col-md-3 .ml-md-auto
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="auto"
          class="mr-auto"
        >
          <v-card
            class="pa-2"
            outlined
            tile
          >
            .col-auto .mr-auto
          </v-card>
        </v-col>
        <v-col cols="auto">
          <v-card
            class="pa-2"
            outlined
            tile
          >
            .col-auto
          </v-card>
        </v-col>
      </v-row>
    </flex-box-card>

    <!--=== Nested grid ===-->
    <div class="title">Nested grid</div>
    <div class="subtitle-1">Grids can be nested, similar to other frameworks, in order to achieve very custom layouts.
    </div>
    <br/>
    <flex-box-card :md="8" justify="left">
      <v-row>
        <v-col sm="9">
          <v-card
            class="pa-2"
            outlined
            tile
          >
            Level 1: .col-sm-9
          </v-card>
          <v-row no-gutters>
            <v-col
              cols="8"
              sm="6"
            >
              <v-card
                class="pa-2"
                outlined
                style="background-color: lightgrey;"
                tile
                light
              >
                Level 2: .col-8 .col-sm-6
              </v-card>
            </v-col>
            <v-col
              cols="4"
              sm="6"
            >
              <v-card
                class="pa-2"
                outlined
                style="background-color: lightgrey;"
                tile
                light
              >
                Level 3: .col-4 .col-sm-6
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </flex-box-card>

    <!--=== Spacers ===-->
    <div class="title">Spacers</div>
    <div class="subtitle-1">The <kbd>v-spacer</kbd> component is useful when you want to fill available space or make
      space
      between two components.
    </div>
    <br/>
    <flex-box-card :md="8" justify="left">
      <v-row>
        <v-col>
          <v-card
            class="pa-2"
            outlined
            tile
          >
            .col
          </v-card>
        </v-col>

        <v-spacer></v-spacer>

        <v-col>
          <v-card
            class="pa-2"
            outlined
            tile
          >
            .col
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col
          cols="auto"
          lg="3"
        >
          <v-card
            class="pa-2"
            outlined
            tile
          >
            .col-auto
          </v-card>
        </v-col>

        <v-spacer></v-spacer>

        <v-col>
          <v-card
            class="pa-2"
            outlined
            tile
          >
            .col
          </v-card>
        </v-col>

        <v-spacer></v-spacer>

        <v-col md="5">
          <v-card
            class="pa-2"
            cols="auto"
            outlined
            tile
          >
            .col-md-5
          </v-card>
        </v-col>
      </v-row>
    </flex-box-card>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import AppPageHeader from '~/components/app/layout/AppPageHeader';
  import FlexBox from '~/components/widgets/containers/flex-box';
  import FlexBoxCard from '~/components/widgets/containers/flex-box-card';
  import SimpleTable from '~/components/widgets/table/SimpleTable';
  import viewportBreakpoints from '~/api/demo/ui-elements/viewport-breakpoints.json';

  export default {
    components: {
      AppPageHeader,
      SimpleTable,
      FlexBox,
      FlexBoxCard
    },
    data() {
      return {
        title: this.$t('grids.title'),
        description: this.$t('grids.description'),
        theadBreakpoints: viewportBreakpoints.find(item => item.isThead),
        tfootBreakpoints: viewportBreakpoints.find(item => item.isTfoot),
        tbodyBreakpoints: viewportBreakpoints.filter(item => !item.isTfoot && !item.isThead),
        alignments: [
          'start',
          'center',
          'end',
        ],
        justify: [
          'start',
          'center',
          'end',
          'space-around',
          'space-between',
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
        config: 'getConfig'
      }),
      cols() {
        const {lg, sm} = this.$vuetify.breakpoint
        return lg ? [3, 9] : sm ? [9, 3] : [6, 6]
      },
    },
    methods: {},
  }
</script>
