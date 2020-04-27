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
    <flex-box-card
      title="Material Design Viewport Breakpoints"
      :md="8"
      :outlined="true"
    >
      <simple-table
        height="350px"
        :thead="theadBreakpoints.thead"
        :tfoot="tfootBreakpoints.tfoot"
        :tbody="tbodyBreakpoints"
      ></simple-table>
    </flex-box-card>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import AppPageHeader from '~/components/app/layout/AppPageHeader';
  import SimpleTable from '~/components/widgets/table/SimpleTable';
  import FlexBoxCard from '~/components/widgets/containers/flex-box-card';
  import viewportBreakpoints from '~/api/demo/ui-elements/viewport-breakpoints.json';

  export default {
    components: {
      AppPageHeader,
      SimpleTable,
      FlexBoxCard
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
