<template>
  <services-graphql
    :sel-title="selTitle"
    :sel-tooltip="selTooltip"
    :tabs="tabs"
    :items="items"
  ></services-graphql>
</template>

<script>
  import ServicesGraphql from '~/components/services/graphql';
  import graphqlQuery from '~/api/graphql-query';

  export default {
    components: {
      ServicesGraphql,
    },
    data() {
      return {
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
  }
</script>
