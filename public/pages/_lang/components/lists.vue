<template>
  <div>
    <!--=== Page Header ===-->
    <app-page-header
      :page-title="description"
    ></app-page-header>

    <!--=== Description ===-->
    <blockquote class="blockquote line-left"><em>The <kbd>v-list</kbd> component is used to display information.
      It can contain an avatar, content, actions, subheaders and much more. Lists present content in a way that makes
      it easy to identify a specific item in a collection. They provide a consistent styling for organizing groups of
      text and images.
    </em></blockquote>
    <br/>

    <flex-box :md="10">
      <v-alert type="info">
        If you are looking for stateful list items, please check out
        <a class="white--text" href="https://vuetifyjs.com/en/components/list-item-groups/" target="_blank">v-list-item-group</a>.
      </v-alert>
    </flex-box>

    <!--=== Usage ===-->
    <div class="title">Usage</div>
    <div class="subtitle-1">
      Lists come in three main variations. <kbd>single-line</kbd> (default), <kbd>two-line</kbd> and
      <kbd>three-line</kbd>. The line declaration
      specifies the minimum height of the item and can also be controlled from <kbd>v-list</kbd> with the same prop.
    </div>
    <v-divider class="my-5"></v-divider>

    <!--=== Disabled lists ===-->
    <div class="title">Disabled lists (Exx.1)</div>
    <div class="subtitle-1">
      You cannot interact with disabled <kbd>v-list</kbd>.
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
        <v-col
          cols="12"
          md="6"
        >
          <highlight-code :md="12" title="Template">
            <code2></code2>
          </highlight-code>
        </v-col>
      </v-row>
    </flex-box-panel>
    <br/>
    <!-- List -->
    <flex-box-list
      :md="3"
      :tile="true"
      :disabled="true"
    >
      <v-subheader>REPORTS</v-subheader>
      <v-list-item-group v-model="exx1Item" color="primary">
        <v-list-item
          v-for="(item, i) in exx1Items"
          :key="i"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </flex-box-list>
    <v-divider class="my-5"></v-divider>

    <!--=== Shaped lists ===-->
    <div class="title">Shaped lists (Exx.2)</div>
    <div class="subtitle-1">
      Shaped lists have rounded borders on one side of the <kbd>v-list-item</kbd>.
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
            <code3></code3>
          </highlight-code>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <highlight-code :md="12" title="Template">
            <code2></code2>
          </highlight-code>
        </v-col>
      </v-row>
    </flex-box-panel>
    <br/>
    <!-- List -->
    <flex-box-list
      :md="3"
      :tile="true"
      :shaped="true"
    >
      <v-subheader>REPORTS</v-subheader>
      <v-list-item-group v-model="exx2Item" color="primary">
        <v-list-item
          v-for="(item, i) in exx1Items"
          :key="i"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </flex-box-list>
    <v-divider class="my-5"></v-divider>

    <!--=== Dense ===-->
    <div class="title">Dense (Exx.3)</div>
    <div class="subtitle-1">
      <kbd>v-list</kbd> can be lowered with <kbd>dense</kbd> property.
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
            <code4></code4>
          </highlight-code>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <highlight-code :md="12" title="Template">
            <code2></code2>
          </highlight-code>
        </v-col>
      </v-row>
    </flex-box-panel>
    <br/>
    <!-- List -->
    <flex-box-list
      :md="3"
      :tile="true"
      :dense="true"
    >
      <v-subheader>REPORTS</v-subheader>
      <v-list-item-group v-model="exx3Item" color="primary">
        <v-list-item
          v-for="(item, i) in exx1Items"
          :key="i"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </flex-box-list>
    <v-divider class="my-5"></v-divider>

    <!--=== Flat ===-->
    <div class="title">Flat (Exx.4)</div>
    <div class="subtitle-1">
      Items don't change when selected in <kbd>v-list</kbd> with <kbd>flat</kbd> property.
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
            <code5></code5>
          </highlight-code>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <highlight-code :md="12" title="Template">
            <code2></code2>
          </highlight-code>
        </v-col>
      </v-row>
    </flex-box-panel>
    <br/>
    <!-- List -->
    <flex-box-list
      :md="3"
      :tile="true"
      :flat="true"
    >
      <v-subheader>REPORTS</v-subheader>
      <v-list-item-group v-model="exx4Item" color="primary">
        <v-list-item
          v-for="(item, i) in exx1Items"
          :key="i"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </flex-box-list>
    <v-divider class="my-5"></v-divider>

    <!--=== Rounded ===-->
    <div class="title">Rounded (Exx.5)</div>
    <div class="subtitle-1">
      You can make <kbd>v-list</kbd> items rounded.
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
            <code6></code6>
          </highlight-code>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <highlight-code :md="12" title="Template">
            <code2></code2>
          </highlight-code>
        </v-col>
      </v-row>
    </flex-box-panel>
    <br/>
    <!-- List -->
    <flex-box-list
      :md="3"
      :tile="true"
      :rounded="true"
    >
      <v-subheader>REPORTS</v-subheader>
      <v-list-item-group v-model="exx5Item" color="primary">
        <v-list-item
          v-for="(item, i) in exx1Items"
          :key="i"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </flex-box-list>
    <v-divider class="my-5"></v-divider>

    <!--=== Avatar with title and action ===-->
    <div class="title">Avatar with title and action (Exx.6)</div>
    <div class="subtitle-1">
      Lists also contain slots for a more explicit approach. If you choose this approach, remember you must
      provide additional props for correct spacing. In this example, we have a title with an avatar, so we must provide
      an <kbd>avatar</kbd> property.
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
            <code7></code7>
          </highlight-code>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <highlight-code :md="12" title="Template">
            <code8></code8>
          </highlight-code>
        </v-col>
      </v-row>
    </flex-box-panel>
    <br/>
    <!-- List -->
    <flex-box-list
      :md="4"
    >
      <template v-slot:tool-bar>
        <v-toolbar
          color="indigo"
          dark
        >
          <v-app-bar-nav-icon></v-app-bar-nav-icon>

          <v-toolbar-title>Inbox</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>

          <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </v-toolbar>
      </template>

      <v-list-item
        v-for="item in exx6Items"
        :key="item.title"
        @click=""
      >
        <v-list-item-icon>
          <v-icon v-if="item.icon" color="pink">mdi-star</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title v-text="item.title"></v-list-item-title>
        </v-list-item-content>

        <v-list-item-avatar>
          <v-img :src="item.avatar"></v-img>
        </v-list-item-avatar>
      </v-list-item>
    </flex-box-list>
    <v-divider class="my-5"></v-divider>

    <!--=== Icon with 2 lines and action ===-->
    <div class="title">Icon with 2 lines and action(Exx.7)</div>
    <div class="subtitle-1">
      Lists can contain subheaders, dividers, and can contain 1 or more lines. The subtitle will overflow with ellipsis
      if it extends past one line.
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
            <code9></code9>
          </highlight-code>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <highlight-code :md="12" title="Template">
            <code10></code10>
          </highlight-code>
        </v-col>
      </v-row>
    </flex-box-panel>
    <br/>
    <!-- List -->
    <flex-box-list
      :md="4"
      :twoLine="true"
      :subheader="true"
    >
      <template v-slot:tool-bar>
        <v-toolbar
          color="light-blue"
          dark
        >
          <v-app-bar-nav-icon></v-app-bar-nav-icon>

          <v-toolbar-title>My files</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>

          <v-btn icon>
            <v-icon>mdi-view-module</v-icon>
          </v-btn>
        </v-toolbar>
      </template>

      <v-subheader inset>Folders</v-subheader>

      <v-list-item
        v-for="item in exx7Items"
        :key="item.title"
        @click=""
      >
        <v-list-item-avatar>
          <v-icon
            :class="[item.iconClass]"
            v-text="item.icon"
          ></v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="item.title"></v-list-item-title>
          <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn icon>
            <v-icon color="grey lighten-1">mdi-information</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>

      <v-divider inset></v-divider>

      <v-subheader inset>Files</v-subheader>

      <v-list-item
        v-for="item in exx7Items2"
        :key="item.title"
        @click=""
      >
        <v-list-item-avatar>
          <v-icon
            :class="[item.iconClass]"
            v-text="item.icon"
          ></v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="item.title"></v-list-item-title>
          <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn icon>
            <v-icon color="grey lighten-1">mdi-information</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </flex-box-list>
    <v-divider class="my-5"></v-divider>

    <!--=== Avatar with 3 lines ===-->
    <div class="title">Avatar with 3 lines (Exx.8)</div>
    <div class="subtitle-1">
      For three line lists, the subtitle will clamp vertically at 2 lines and then ellipsis. This feature
      uses <a href="https://vuetifyjs.com/en/components/list-item-groups/" target="_blank">line-clamp</a> and is not
      supported in all browsers.
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
            <code11></code11>
          </highlight-code>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <highlight-code :md="12" title="Template">
            <code12></code12>
          </highlight-code>
        </v-col>
      </v-row>
    </flex-box-panel>
    <br/>
    <!-- List -->
    <flex-box-list
      :md="4"
      :threeLine="true"
    >
      <template v-slot:tool-bar>
        <v-toolbar
          color="cyan"
          dark
        >
          <v-app-bar-nav-icon></v-app-bar-nav-icon>

          <v-toolbar-title>Inbox</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </v-toolbar>
      </template>

      <template v-for="(item, index) in exx8Items">
        <v-subheader
          v-if="item.header"
          :key="item.header"
          v-text="item.header"
        ></v-subheader>

        <v-divider
          v-else-if="item.divider"
          :key="index"
          :inset="item.inset"
        ></v-divider>

        <v-list-item
          v-else
          :key="item.title"
          @click=""
        >
          <v-list-item-avatar>
            <v-img :src="item.avatar"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-html="item.title"></v-list-item-title>
            <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </flex-box-list>
    <v-divider class="my-5"></v-divider>

    <!--=== Avatar with title and action ===-->
    <div class="title">Avatar with title and action (Exx.9)</div>
    <div class="subtitle-1">
      Here we combine <kbd>v-list-item-avatar</kbd> and <kbd>v-list-item-icon</kbd> in a single-line list.
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
            <code13></code13>
          </highlight-code>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <highlight-code :md="12" title="Template">
            <code14></code14>
          </highlight-code>
        </v-col>
      </v-row>
    </flex-box-panel>
    <br/>
    <!-- List -->
    <flex-box-list
      :md="4"
      :vlists="2"
    >
      <template v-slot:tool-bar>
        <v-toolbar
          color="deep-purple accent-4"
          dark
        >
          <v-app-bar-nav-icon></v-app-bar-nav-icon>

          <v-toolbar-title>New Chat</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </v-toolbar>
      </template>

      <template v-slot:list1>
        <v-list
          color="secondary"
          :dark="theme.dark"
          subheader
        >
          <v-subheader>Recent chat</v-subheader>

          <v-list-item
            v-for="item in exx9Items"
            :key="item.title"
            @click=""
          >
            <v-list-item-avatar>
              <v-img :src="item.avatar"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>

            <v-list-item-icon>
              <v-icon :color="item.active ? 'orange' : 'grey'">mdi-chat</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
      </template>

      <template v-slot:list2>
        <v-list
          color="secondary"
          :dark="theme.dark"
          subheader
        >
          <v-subheader>Previous chats</v-subheader>

          <v-list-item
            v-for="item in exx9Items2"
            :key="item.title"
            @click=""
          >
            <v-list-item-avatar>
              <v-img :src="item.avatar"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>
    </flex-box-list>
    <v-divider class="my-5"></v-divider>

    <!--=== Nested lists ===-->
    <div class="title">Nested lists (Exx.10)</div>
    <div class="subtitle-1">
      Using the <kbd>v-list-group</kbd> component you can create up to <strong>2</strong> levels in depth
      using the <kbd>sub-group</kbd> prop.
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
            <code15></code15>
          </highlight-code>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <highlight-code :md="12" title="Template">
            <code16></code16>
          </highlight-code>
        </v-col>
      </v-row>
    </flex-box-panel>
    <br/>
    <!-- List -->
    <flex-box-list
      :md="3"
    >
      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>

        <v-list-item-title>Home</v-list-item-title>
      </v-list-item>

      <v-list-group
        prepend-icon="mdi-account-circle"
        value="true"
      >
        <template v-slot:activator>
          <v-list-item-title>Users</v-list-item-title>
        </template>

        <v-list-group
          no-action
          sub-group
          value="true"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Admin</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="(admin, i) in exx10Admins"
            :key="i"
            link
          >
            <v-list-item-title v-text="admin[0]"></v-list-item-title>
            <v-list-item-icon>
              <v-icon v-text="admin[1]"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>

        <v-list-group
          sub-group
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Actions</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="(crud, i) in exx10Cruds"
            :key="i"
            @click=""
          >
            <v-list-item-title v-text="crud[0]"></v-list-item-title>
            <v-list-item-action>
              <v-icon v-text="crud[1]"></v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-list-group>
      </v-list-group>
    </flex-box-list>
    <v-divider class="my-5"></v-divider>

    <!--=== Subheadings and dividers ===-->
    <div class="title">Subheadings and dividers (Exx.11)</div>
    <div class="subtitle-1">
      Lists can contain multiple subheaders and dividers.
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
            <code17></code17>
          </highlight-code>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <highlight-code :md="12" title="Template">
            <code18></code18>
          </highlight-code>
        </v-col>
      </v-row>
    </flex-box-panel>
    <br/>
    <!-- List -->
    <flex-box-list
      :md="4"
      :vlists="2"
    >
      <template v-slot:tool-bar>
        <v-toolbar
          color="teal"
          dark
        >
          <v-app-bar-nav-icon></v-app-bar-nav-icon>

          <v-toolbar-title>Settings</v-toolbar-title>
        </v-toolbar>
      </template>

      <template v-slot:list1>
        <v-list
          color="secondary"
          :dark="theme.dark"
          two-line
          subheader
        >
          <v-subheader>General</v-subheader>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Profile photo</v-list-item-title>
              <v-list-item-subtitle>Change your Google+ profile photo</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Show your status</v-list-item-title>
              <v-list-item-subtitle>Your status is visible to everyone</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>
      </template>

      <template v-slot:list2>
        <v-list
          color="secondary"
          :dark="theme.dark"
          subheader
          two-line
          flat
        >
          <v-subheader>Hangout notifications</v-subheader>

          <v-list-item-group
            v-model="exx11Settings"
            multiple
          >
            <v-list-item>
              <template v-slot:default="{ active, toggle }">
                <v-list-item-action>
                  <v-checkbox
                    v-model="active"
                    color="primary"
                    @click="toggle"
                  ></v-checkbox>
                </v-list-item-action>

                <v-list-item-content>
                  <v-list-item-title>Notifications</v-list-item-title>
                  <v-list-item-subtitle>Allow notifications</v-list-item-subtitle>
                </v-list-item-content>
              </template>
            </v-list-item>

            <v-list-item>
              <template v-slot:default="{ active, toggle }">
                <v-list-item-action>
                  <v-checkbox
                    v-model="active"
                    color="primary"
                    @click="toggle"
                  ></v-checkbox>
                </v-list-item-action>

                <v-list-item-content>
                  <v-list-item-title>Sound</v-list-item-title>
                  <v-list-item-subtitle>Hangouts message</v-list-item-subtitle>
                </v-list-item-content>
              </template>
            </v-list-item>

            <v-list-item>
              <template v-slot:default="{ active, toggle }">
                <v-list-item-action>
                  <v-checkbox
                    v-model="active"
                    color="primary"
                    @click="toggle"
                  ></v-checkbox>
                </v-list-item-action>

                <v-list-item-content>
                  <v-list-item-title>Video sounds</v-list-item-title>
                  <v-list-item-subtitle>Hangouts video call</v-list-item-subtitle>
                </v-list-item-content>
              </template>
            </v-list-item>

            <v-list-item>
              <template v-slot:default="{ active, toggle }">
                <v-list-item-action>
                  <v-checkbox
                    v-model="active"
                    color="primary"
                    @click="toggle"
                  ></v-checkbox>
                </v-list-item-action>

                <v-list-item-content>
                  <v-list-item-title>Invites</v-list-item-title>
                  <v-list-item-subtitle>Notify when receiving invites</v-list-item-subtitle>
                </v-list-item-content>
              </template>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </template>
    </flex-box-list>
    <v-divider class="my-5"></v-divider>

    <!--=== Card image with toolbar and list ===-->
    <div class="title">Card image with toolbar and list (Exx.12)</div>
    <div class="subtitle-1">
      A list can be combined with a card.
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
            <code19></code19>
          </highlight-code>
        </v-col>
      </v-row>
    </flex-box-panel>
    <br/>
    <!-- List -->
    <flex-box-list
      :md="3"
      :twoLine="true"
    >
      <template v-slot:card-img>
        <v-img
          src="https://cdn.vuetifyjs.com/images/lists/ali.png"
          height="300px"
          dark
        >
          <v-row class="fill-height">
            <v-card-title>
              <v-btn dark icon>
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>

              <v-spacer></v-spacer>

              <v-btn dark icon class="mr-4">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>

              <v-btn dark icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-card-title>

            <v-spacer></v-spacer>

            <v-card-title class="white--text pl-12 pt-12">
              <div class="display-1 pl-12 pt-12">Ali Conners</div>
            </v-card-title>
          </v-row>
        </v-img>
      </template>

      <v-list-item @click="">
        <v-list-item-icon>
          <v-icon color="primary">mdi-phone</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>(650) 555-1234</v-list-item-title>
          <v-list-item-subtitle>Mobile</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-icon>
          <v-icon>mdi-message-text</v-icon>
        </v-list-item-icon>
      </v-list-item>

      <v-list-item @click="">
        <v-list-item-action></v-list-item-action>

        <v-list-item-content>
          <v-list-item-title>(323) 555-6789</v-list-item-title>
          <v-list-item-subtitle>Work</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-icon>
          <v-icon>mdi-message-text</v-icon>
        </v-list-item-icon>
      </v-list-item>

      <v-divider inset></v-divider>

      <v-list-item @click="">
        <v-list-item-icon>
          <v-icon color="primary">mdi-email</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>aliconnors@example.com</v-list-item-title>
          <v-list-item-subtitle>Personal</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item @click="">
        <v-list-item-action></v-list-item-action>

        <v-list-item-content>
          <v-list-item-title>ali_connors@example.com</v-list-item-title>
          <v-list-item-subtitle>Work</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider inset></v-divider>

      <v-list-item @click="">
        <v-list-item-icon>
          <v-icon color="primary">mdi-map-marker</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>1400 Main Street</v-list-item-title>
          <v-list-item-subtitle>Orlando, FL 79938</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </flex-box-list>
    <v-divider class="my-5"></v-divider>

    <!--=== Title with sub-title, actions and action-text ===-->
    <div class="title">Title with sub-title, actions and action-text (Exx.13)</div>
    <div class="subtitle-1">
      A list can contain a stack within an action. This is useful when you need to display meta text next to your action
      item.
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
            <code20></code20>
          </highlight-code>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <highlight-code :md="12" title="Template">
            <code21></code21>
          </highlight-code>
        </v-col>
      </v-row>
    </flex-box-panel>
    <br/>
    <!-- List -->
    <flex-box-list
      :md="4"
      :twoLine="true"
    >
      <template v-slot:tool-bar>
        <v-toolbar
          color="pink"
          dark
        >
          <v-app-bar-nav-icon></v-app-bar-nav-icon>

          <v-toolbar-title>Inbox</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>

          <v-btn icon>
            <v-icon>mdi-checkbox-marked-circle</v-icon>
          </v-btn>
        </v-toolbar>
      </template>
      <v-list-item-group
        v-model="exx13Selected"
        multiple
        active-class="pink--text"
      >
        <template v-for="(item, index) in exx13Items">
          <v-list-item :key="item.title">
            <template v-slot:default="{ active, toggle }">
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
                <v-list-item-subtitle class="text--primary" v-text="item.headline"></v-list-item-subtitle>
                <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-list-item-action-text v-text="item.action"></v-list-item-action-text>
                <v-icon
                  v-if="!active"
                  color="grey lighten-1"
                >
                  mdi-star-outline
                </v-icon>

                <v-icon
                  v-else
                  color="orange"
                >
                  mdi-star
                </v-icon>
              </v-list-item-action>
            </template>
          </v-list-item>

          <v-divider
            v-if="index + 1 < exx13Items.length"
            :key="index"
          ></v-divider>
        </template>
      </v-list-item-group>
    </flex-box-list>
    <v-divider class="my-5"></v-divider>

    <!--=== Action with title and sub-title ===-->
    <div class="title">Action with title and sub-title (Exx.14)</div>
    <div class="subtitle-1">
      A <kbd>three-line</kbd> list with actions. Utilizing
      <a href="https://vuetifyjs.com/en/components/list-item-groups/" target="_blank">v-list-item-group</a>,
      easily connect actions to your tiles.
      item.
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
            <code22></code22>
          </highlight-code>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <highlight-code :md="12" title="Script">
            <code23></code23>
          </highlight-code>
        </v-col>
      </v-row>
    </flex-box-panel>
    <br/>
    <!-- List -->
    <flex-box-list
      :md="4"
      :threeLine="true"
      :subheader="true"
      :flat="true"
      :vlists="2"
    >
      <template v-slot:tool-bar>
        <v-toolbar
          color="purple"
          dark
        >
          <v-app-bar-nav-icon></v-app-bar-nav-icon>

          <v-toolbar-title>Settings</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </v-toolbar>
      </template>

      <template v-slot:list1>
        <v-list
          color="secondary"
          :dark="theme.dark"
          subheader
          three-line
        >
          <v-subheader>User Controls</v-subheader>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Content filtering</v-list-item-title>
              <v-list-item-subtitle>Set the content filtering level to restrict appts that can be downloaded
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Password</v-list-item-title>
              <v-list-item-subtitle>Require password for purchase or use password to restrict purchase
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
      </template>

      <template v-slot:list2>
        <v-list
          color="secondary"
          :dark="theme.dark"
          flat
          subheader
          three-line
        >
          <v-subheader>General</v-subheader>

          <v-list-item-group
            v-model="exx14Settings"
            multiple
            active-class=""
          >
            <v-list-item>
              <template v-slot:default="{ active }">
                <v-list-item-action>
                  <v-checkbox v-model="active"></v-checkbox>
                </v-list-item-action>

                <v-list-item-content>
                  <v-list-item-title>Notifications</v-list-item-title>
                  <v-list-item-subtitle>Notify me about updates to apps or games that I downloaded
                  </v-list-item-subtitle>
                </v-list-item-content>
              </template>
            </v-list-item>

            <v-list-item>
              <template v-slot:default="{ active }">
                <v-list-item-action>
                  <v-checkbox v-model="active"></v-checkbox>
                </v-list-item-action>

                <v-list-item-content>
                  <v-list-item-title>Sound</v-list-item-title>
                  <v-list-item-subtitle>Auto-update apps at any time. Data charges may apply</v-list-item-subtitle>
                </v-list-item-content>
              </template>
            </v-list-item>

            <v-list-item>
              <template v-slot:default="{ active }">
                <v-list-item-action>
                  <v-checkbox v-model="active"></v-checkbox>
                </v-list-item-action>

                <v-list-item-content>
                  <v-list-item-title>Auto-add widgets</v-list-item-title>
                  <v-list-item-subtitle>Automatically add home screen widgets when downloads complete
                  </v-list-item-subtitle>
                </v-list-item-content>
              </template>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </template>
    </flex-box-list>
    <v-divider class="my-5"></v-divider>

    <!--=== Expansion Lists ===-->
    <div class="title">Expansion Lists (Exx.15)</div>
    <div class="subtitle-1">
      A list can contain a group of items which will display on click. Expansion lists are also used within the
      <a href="https://vuetifyjs.com/en/components/list-item-groups/" target="_blank">v-navigation-drawer</a> component.
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
            <code24></code24>
          </highlight-code>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <highlight-code :md="12" title="Script">
            <code25></code25>
          </highlight-code>
        </v-col>
      </v-row>
    </flex-box-panel>
    <br/>
    <!-- List -->
    <flex-box-list
      :md="3"
    >
      <template v-slot:tool-bar>
        <v-toolbar
          color="teal"
          dark
        >
          <v-app-bar-nav-icon></v-app-bar-nav-icon>

          <v-toolbar-title>Topics</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </v-toolbar>
      </template>

      <v-list-group
        v-for="item in exx15Items"
        :key="item.title"
        v-model="item.active"
        :prepend-icon="item.action"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="subItem in item.items"
          :key="subItem.title"
          @click=""
        >
          <v-list-item-content>
            <v-list-item-title v-text="subItem.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </flex-box-list>
    <v-divider class="my-5"></v-divider>

    <!--=== Navigation lists ===-->
    <div class="title">Navigation lists (Exx.16)</div>
    <div class="subtitle-1">
      Lists can receive an alternative <kbd>nav</kbd> styling that reduces the width <kbd>v-list-item</kbd> takes up as well
      as adding a border radius.
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
            <code26></code26>
          </highlight-code>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <highlight-code :md="12" title="Script">
            <code27></code27>
          </highlight-code>
        </v-col>
      </v-row>
    </flex-box-panel>
    <br/>
    <!-- List -->
    <flex-box-ndrawer-list
      :md="3"
      :tile="true"
      :vlists="2"
    >
      <template v-slot:system-bar>
        <v-system-bar
          color="primary"
          dark
        ></v-system-bar>
      </template>
      <template v-slot:list1>
        <v-list
          color="secondary"
          :dark="theme.dark"
        >
          <v-list-item>
            <v-list-item-avatar>
              <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
            </v-list-item-avatar>
          </v-list-item>

          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title class="title">John Leider</v-list-item-title>
              <v-list-item-subtitle>john@vuetifyjs.com</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-icon>mdi-menu-down</v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
      </template>
      <template v-slot:list2>
        <v-list
          color="secondary"
          :dark="theme.dark"
          nav
          dense
        >
          <v-list-item-group v-model="exx16Item" color="primary">
            <v-list-item
              v-for="(item, i) in exx16Items"
              :key="i"
            >
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </template>
    </flex-box-ndrawer-list>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex';
  import AppPageHeader from '~/components/app/layout/AppPageHeader';
  import FlexBox from '~/components/widgets/containers/flex-box';
  import FlexBoxCard from '~/components/widgets/containers/flex-box-card';
  import FlexBoxList from '~/components/widgets/containers/flex-box-list';
  import FlexBoxNdrawerList from '~/components/widgets/containers/flex-box-ndrawer-list';
  import FlexBoxPanel from '~/components/widgets/containers/flex-box-panel';
  import HighlightCode from '~/components/widgets/highlight/highlight-code';
  import Code1 from '~/components/codes/components/lists/code-html-1';
  import Code2 from '~/components/codes/components/lists/code-js-2';
  import Code3 from '~/components/codes/components/lists/code-html-3';
  import Code4 from '~/components/codes/components/lists/code-html-4';
  import Code5 from '~/components/codes/components/lists/code-html-5';
  import Code6 from '~/components/codes/components/lists/code-html-6';
  import Code7 from '~/components/codes/components/lists/code-html-7';
  import Code8 from '~/components/codes/components/lists/code-js-8';
  import Code9 from '~/components/codes/components/lists/code-html-9';
  import Code10 from '~/components/codes/components/lists/code-js-10';
  import Code11 from '~/components/codes/components/lists/code-html-11';
  import Code12 from '~/components/codes/components/lists/code-js-12';
  import Code13 from '~/components/codes/components/lists/code-html-13';
  import Code14 from '~/components/codes/components/lists/code-js-14';
  import Code15 from '~/components/codes/components/lists/code-html-15';
  import Code16 from '~/components/codes/components/lists/code-js-16';
  import Code17 from '~/components/codes/components/lists/code-html-17';
  import Code18 from '~/components/codes/components/lists/code-js-18';
  import Code19 from '~/components/codes/components/lists/code-html-19';
  import Code20 from '~/components/codes/components/lists/code-html-20';
  import Code21 from '~/components/codes/components/lists/code-js-21';
  import Code22 from '~/components/codes/components/lists/code-html-22';
  import Code23 from '~/components/codes/components/lists/code-js-23';
  import Code24 from '~/components/codes/components/lists/code-html-24';
  import Code25 from '~/components/codes/components/lists/code-js-25';

  const debug = require('debug')('app:page.basicForms');

  export default {
    components: {
      AppPageHeader,
      FlexBox,
      FlexBoxCard,
      FlexBoxList,
      FlexBoxNdrawerList,
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
      Code14,
      Code15,
      Code16,
      Code17,
      Code18,
      Code19,
      Code20,
      Code21,
      Code22,
      Code23,
      Code24,
      Code25,
    },
    data() {
      return {
        title: this.$t('lists.title'),
        description: this.$t('lists.description'),
        panel: [],
        exx1Item: 1,
        exx1Items: [
          {text: 'Real-Time', icon: 'mdi-clock'},
          {text: 'Audience', icon: 'mdi-account'},
          {text: 'Conversions', icon: 'mdi-flag'},
        ],
        exx2Item: 1,
        exx3Item: 1,
        exx4Item: 1,
        exx5Item: 1,
        exx6Items: [
          {icon: true, title: 'Jason Oner', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'},
          {title: 'Travis Howard', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
          {title: 'Ali Connors', avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'},
          {title: 'Cindy Baker', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg'},
        ],
        exx7Items: [
          {
            icon: 'mdi-folder-outline',
            iconClass: 'grey lighten-1 white--text',
            title: 'Photos',
            subtitle: 'Jan 9, 2014'
          },
          {
            icon: 'mdi-folder-outline',
            iconClass: 'grey lighten-1 white--text',
            title: 'Recipes',
            subtitle: 'Jan 17, 2014'
          },
          {
            icon: 'mdi-folder-outline',
            iconClass: 'grey lighten-1 white--text',
            title: 'Work',
            subtitle: 'Jan 28, 2014'
          },
        ],
        exx7Items2: [
          {
            icon: 'mdi-text-box-outline',
            iconClass: 'blue white--text',
            title: 'Vacation itinerary',
            subtitle: 'Jan 20, 2014'
          },
          {
            icon: 'mdi-card-plus-outline',
            iconClass: 'amber white--text',
            title: 'Kitchen remodel',
            subtitle: 'Jan 10, 2014'
          },
        ],
        exx8Items: [
          {header: 'Today'},
          {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
            title: 'Brunch this weekend?',
            subtitle: "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
          },
          {divider: true, inset: true},
          {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
            title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
            subtitle: "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.",
          },
          {divider: true, inset: true},
          {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
            title: 'Oui oui',
            subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?",
          },
          {divider: true, inset: true},
          {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
            title: 'Birthday gift',
            subtitle: "<span class='text--primary'>Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?",
          },
          {divider: true, inset: true},
          {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
            title: 'Recipe to try',
            subtitle: "<span class='text--primary'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.",
          },
        ],
        exx9Items: [
          {active: true, title: 'Jason Oner', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'},
          {active: true, title: 'Ranee Carlson', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
          {title: 'Cindy Baker', avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'},
          {title: 'Ali Connors', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg'},
        ],
        exx9Items2: [
          {title: 'Travis Howard', avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg'},
        ],
        exx10Admins: [
          ['Management', 'mdi-account-multiple'],
          ['Settings', 'mdi-cog'],
        ],
        exx10Cruds: [
          ['Create', 'mdi-database-plus'],
          ['Read', 'mdi-database-search'],
          ['Update', 'mdi-database-refresh'],
          ['Delete', 'mdi-database-remove'],
        ],
        exx11Settings: [],
        exx13Selected: [2],
        exx13Items: [
          {
            action: '15 min',
            headline: 'Brunch this weekend?',
            title: 'Ali Connors',
            subtitle: "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
          },
          {
            action: '2 hr',
            headline: 'Summer BBQ',
            title: 'me, Scrott, Jennifer',
            subtitle: "Wish I could come, but I'm out of town this weekend.",
          },
          {
            action: '6 hr',
            headline: 'Oui oui',
            title: 'Sandra Adams',
            subtitle: 'Do you have Paris recommendations? Have you ever been?',
          },
          {
            action: '12 hr',
            headline: 'Birthday gift',
            title: 'Trevor Hansen',
            subtitle: 'Have any ideas about what we should get Heidi for her birthday?',
          },
          {
            action: '18hr',
            headline: 'Recipe to try',
            title: 'Britta Holt',
            subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
          },
        ],
        exx14Settings: [],
        exx15Items: [
          {
            action: 'mdi-star-face',
            title: 'Attractions',
            items: [
              {title: 'List Item'},
            ],
          },
          {
            action: 'mdi-food',
            title: 'Dining',
            active: true,
            items: [
              {title: 'Breakfast & brunch'},
              {title: 'New American'},
              {title: 'Sushi'},
            ],
          },
          {
            action: 'mdi-school',
            title: 'Education',
            items: [
              {title: 'List Item'},
            ],
          },
          {
            action: 'mdi-run',
            title: 'Family',
            items: [
              {title: 'List Item'},
            ],
          },
          {
            action: 'mdi-hospital-box-outline',
            title: 'Health',
            items: [
              {title: 'List Item'},
            ],
          },
          {
            action: 'mdi-content-cut',
            title: 'Office',
            items: [
              {title: 'List Item'},
            ],
          },
          {
            action: 'mdi-offer',
            title: 'Promotions',
            items: [
              {title: 'List Item'},
            ],
          },
        ],
        exx16Item: 0,
        exx16Items: [
          { text: 'My Files', icon: 'mdi-folder' },
          { text: 'Shared with me', icon: 'mdi-account-multiple' },
          { text: 'Starred', icon: 'mdi-star' },
          { text: 'Recent', icon: 'mdi-history' },
          { text: 'Offline', icon: 'mdi-check-circle' },
          { text: 'Uploads', icon: 'mdi-upload' },
          { text: 'Backups', icon: 'mdi-cloud-upload' },
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
    created: function () {
    },
    watch: {},
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
    },
  }
</script>
