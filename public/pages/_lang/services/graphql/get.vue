<template>
  <div>
    <!--=== Page Header ===-->
    <app-page-header
      :page-title="description"
    ></app-page-header>
    <!--=== Services Graphql ===-->
    <services-graphql
      :sel-title="selTitle"
      :sel-tooltip="selTooltip"
      :tabs="tabs"
      :items="items"
    ></services-graphql>
  </div>
</template>

<script>
  import AppPageHeader from '~/components/app/layout/AppPageHeader';
  import ServicesGraphql from '~/components/app/services/graphql';
  import graphqlQuery from '~/api/graphql-query';

  export default {
    components: {
      AppPageHeader,
      ServicesGraphql,
    },
    data() {
      return {
        title: this.$t('graphql.title'),
        description: this.$t('graphql.description'),
        selTitle: this.$t('graphql.getData'),
        selTooltip: this.$t('graphql.getData'),
        tabs: ['Users', 'Roles', 'Teams'],
        items: [
          {key: 'getUser', value: graphqlQuery.getUser},
          {key: 'getRole', value: graphqlQuery.getRole},
          {key: 'getTeam', value: graphqlQuery.getTeam},
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
  }
</script>
