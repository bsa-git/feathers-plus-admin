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
  }
</script>
