<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" sm="8">
        <v-card
          color="secondary"
          :dark="theme.dark"
        >
          <!-- Toolbar -->
          <v-toolbar color="primary"  dark>
            <v-icon class="mr-3" v-if="pageIcon">{{ pageIcon }}</v-icon>
            <v-app-bar-nav-icon v-else></v-app-bar-nav-icon>
            <v-toolbar-title>{{ nodalItem.title }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              :label="$t('management.search')"
              hide-details
              clearable
              clear-icon="mdi-close"
              append-icon="fas fa-search"
              class="hidden-sm-and-down"
            ></v-text-field>
          </v-toolbar>
          <v-card-text>
            <v-treeview
              :items="menuItems"
              :search="search"
              :active.sync="active"
              :open.sync="open"
              activatable
              open-on-click
              active-class="primary--text"
              transition
            >
              <template v-slot:prepend="{ item, active }">
                <v-icon v-if="item.id.startsWith('item.description_')">mdi-check</v-icon>
              </template>
            </v-treeview>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  const debug = require('debug')('app:comp.admins-accounts-roles');
  const isLog = false;

  export default {
    components: {
    },
    props: {
      nodalName: String,
      pageName: String,
      appMenu: Array,
    },
    data() {
      return {
        search: '',
        active: [],
        open: [],
        pageIcon: '',
        nodalItem: {},
      }
    },
    created() {
      this.nodalItem = this.appMenu.find(item =>  item.name? (item.name === this.nodalName) : false);
      if(this.nodalItem.name !== this.pageName){
        this.nodalItem = this.nodalItem.items.find(item =>  item.name? (item.name === this.pageName) : false);
      }
      this.pageIcon = this.nodalItem['icon']? this.nodalItem['icon'] : '';
      if(isLog) debug('nodalItem:', this.nodalItem);
    },
    computed: {
      ...mapGetters({
        theme: 'getTheme',
      }),
      menuItems() {
        const data = [];
        const items = this.nodalItem.items? this.nodalItem.items : this.nodalItem.children;
        items.forEach(item => {
          const childs = [];
          if(item.children){
            item.children.forEach(child => {
              if(!child.inactive){
                const _child = {
                  id: `item.title_${child.name}`,
                  name: `${child.title} :`,
                  children: [
                    {
                      id: `item.description_${child.name}`,
                      name: this.$t(`${child.alias}.description`)
                    },
                  ]
                };
                childs.push(_child);
              }
            });
          }
          if(!item.inactive){
            const _item = {
              id: `item.title_${item.name}`,
              name: `${item.title} :`,
              children: childs.length? childs : [
                {
                  id: `item.description_${item.name}`,
                  name: this.$t(`${item.alias}.description`),
                }
              ]
            };
            data.push(_item);
          }
        });
        if (isLog) debug('computed.menuItems.data:', data);
        return data
      },
      selected() {
        if (!this.active.length) return undefined;
        return this.active[0];
      }
    },
    watch: {
      selected: function (val) {
        if (val) {
          if (isLog) debug('watch.selected.val:', val);
          const nameItem = val.split('_')[1];
          const items = this.nodalItem.items? this.nodalItem.items : this.nodalItem.children;
          let findItem = items.find(item => item.name === nameItem);
          if(findItem){
            if (isLog) debug('watch.selected.findItem:', findItem);
            const path = this.$i18n.path(findItem.to);
            if (isLog) debug('watch.selected.path:', path);
            this.$redirect(path);
          }else {
            items.forEach(item => {
              if(item.children){
                const childs = item.children;
                findItem = childs.find(child => child.name === nameItem);
                if(findItem){
                  if (isLog) debug('watch.selected.findItem:', findItem);
                  const path = this.$i18n.path(findItem.to);
                  if (isLog) debug('watch.selected.path:', path);
                  this.$redirect(path);
                }
              }
            })
          }
        };
      }
    },
  }
</script>
