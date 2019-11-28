<template>
  <div>
    <app-page-header
      :page-title="description"
    ></app-page-header>
    <services-graphql
      :sel-title="selTitle"
      :sel-tooltip="selTooltip"
      :tabs="tabs"
      :items="items"
    ></services-graphql>
  </div>
</template>

<script>
  import AppPageHeader from '~/components/layout/AppPageHeader';
  import ServicesGraphql from '~/components/services/graphql';
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
        selTitle: this.$t('graphql.findData'),
        selTooltip: this.$t('graphql.findData'),
        tabs: ['Users', 'Roles', 'Teams'],
        items: [
          {key: 'findUser', value: graphqlQuery.findUser},
          {key: 'findRole', value: graphqlQuery.findRole},
          {key: 'findTeam', value: graphqlQuery.findTeam},
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
