<template>
  <div>
    <!--=== Page Header ===-->
    <app-page-header
      :page-title="description"
    ></app-page-header>

    <!--=== Simple table ===-->
    <div class="title">Simple table</div>
    <div class="subtitle-1">The <kbd>v-simple-table</kbd> component is a simple wrapper component around the <code>table</code> element.
      Inside the component you can use all the regular table elements such as <code>thead</code>, <code>tbody</code>, <code>tr</code>, etc.
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
        title: this.$t('table_widget.title'),
        description: this.$t('table_widget.description'),
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
    methods: {},
  }
</script>
