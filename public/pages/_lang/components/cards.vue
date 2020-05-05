<template>
  <div>
    <!--=== Page Header ===-->
    <app-page-header
      :page-title="description"
    ></app-page-header>

    <!--=== Description ===-->
    <blockquote class="blockquote line-left"><em>The <kbd>v-card</kbd> component is a versatile component that can be
      used
      for anything from a panel to a static image. The card component has numerous helper components to make
      markup as easy as possible. Components that have no listed options use <strong>Vue's</strong> functional component
      option
      for faster rendering and serve as markup sugar to make building easier.
    </em></blockquote>
    <br/>

    <!--=== Usage ===-->
    <div class="title">Usage</div>
    <div class="subtitle-1">
      A card has 4 basic components, <kbd>v-card-title</kbd>, <kbd>v-card-subtitle</kbd>, <kbd>v-card-text</kbd>
      and <kbd>v-card-actions</kbd>.
    </div>
    <div class="subtitle-1">
      Functional components:
      <ul>
        <li><code>v-card-actions</code>: The container used for placing actions for a card, such as <kbd>v-btn</kbd> or
          <kbd>v-menu</kbd>.
          Also applies special margin to buttons so that they properly line up with other card content areas.
        </li>
        <li><code>v-card-subtitle</code>: Provides a default <strong>font-size</strong> and <strong>padding</strong> for
          card subtitles. Font-size can be overwritten
          with <a href="https://vuetifyjs.com/en/styles/typography/" target="_blank">typography classes</a>.
        </li>
        <li><code>v-card-text</code>: Primarily used for <strong>text content</strong> in a card. Applies padding for
          text, reduces its font-size to .875rem.
        </li>
        <li><code>v-card-title</code>: Provides a default font-size and padding for card titles.
          Font-size can be overwritten with <a href="https://vuetifyjs.com/en/styles/typography/" target="_blank">typography classes</a>.
        </li>
      </ul>
    </div>
    <br/>

    <!--=== Outlined cards ===-->
    <div class="title">Outlined cards (Exx.1)</div>
    <div class="subtitle-1">
      An <kbd>outlined</kbd> card has 0 elevation and contains a soft border.
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
      </v-row>
    </flex-box-panel>
    <br/>
    <!-- Card -->
    <flex-box-card
      :md="3"
      color=""
      :outlined="true"
    >
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4">OVERLINE</div>
          <v-list-item-title class="headline mb-1">Headline 5</v-list-item-title>
          <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-avatar
          tile
          size="80"
          color="grey"
        ></v-list-item-avatar>
      </v-list-item>

      <v-card-actions>
        <v-btn text>Button</v-btn>
        <v-btn text>Button</v-btn>
      </v-card-actions>
    </flex-box-card>
    <br/>

    <!--=== Intermediate ===-->
    <div class="title">Intermediate (Exx.2)</div>
    <div class="subtitle-1">
      The <kbd>v-card</kbd> component is useful for wrapping content.
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
            <code2></code2>
          </highlight-code>
        </v-col>
      </v-row>
    </flex-box-panel>
    <br/>
    <!-- Card -->
    <flex-box-card
      :md="3"
      color=""
    >
      <v-container>
        <v-row justify="space-between">
          <v-col cols="auto">
            <v-img
              height="200"
              width="200"
              src="https://cdn.vuetifyjs.com/images/cards/store.jpg"
            ></v-img>
          </v-col>

          <v-col
            cols="auto"
            class="text-center pl-0"
          >
            <v-row
              class="flex-column ma-0 fill-height"
              justify="center"
            >
              <v-col class="px-0">
                <v-btn icon>
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
              </v-col>

              <v-col class="px-0">
                <v-btn icon>
                  <v-icon>mdi-bookmark</v-icon>
                </v-btn>
              </v-col>
              <v-col class="px-0">
                <v-btn icon>
                  <v-icon>mdi-share-variant</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </flex-box-card>
    <br/>

    <!--=== Information card ===-->
    <div class="title">Information card (Exx.3)</div>
    <div class="subtitle-1">
      Cards are entry points to more detailed information. To keep things concise, ensure to limit the number of actions
      the user can take.
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
      </v-row>
    </flex-box-panel>
    <br/>
    <!-- Card -->
    <flex-box-card
      :md="3"
    >
      <v-card-text>
        <div>Word of the Day</div>
        <p class="display-1 text--primary">
          be•nev•o•lent
        </p>
        <p>adjective</p>
        <div class="text--primary">
          well meaning and kindly.<br>
          "a benevolent smile"
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn
          text
          color="orange"
        >
          Learn More
        </v-btn>
      </v-card-actions>
    </flex-box-card>
    <br/>

    <!--=== Media with text ===-->
    <div class="title">Media with text (Exx.4)</div>
    <div class="subtitle-1">
      Using the layout system, we can add custom text anywhere within the background.
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
      </v-row>
    </flex-box-panel>
    <br/>
    <!-- Card -->
    <flex-box-card
      :md="4"
      color=""
    >
      <template v-slot:card-img>
        <v-img
          class="white--text align-end"
          height="200px"
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        >
          <v-card-title>Top 10 Australian beaches</v-card-title>
        </v-img>
      </template>

      <v-card-subtitle class="pb-0">Number 10</v-card-subtitle>

      <v-card-text class="text--primary">
        <div>Whitehaven Beach</div>

        <div>Whitsunday Island, Whitsunday Islands</div>
      </v-card-text>

      <v-card-actions>
        <v-btn
          color="orange"
          text
        >
          Share
        </v-btn>

        <v-btn
          color="orange"
          text
        >
          Explore
        </v-btn>
      </v-card-actions>
    </flex-box-card>
    <br/>

    <!--=== Grids ===-->
    <div class="title">Grids (Exx.5)</div>
    <div class="subtitle-1">
      Using grids, you can create beautiful layouts.
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
          <highlight-code :md="12" title="Script">
            <code6></code6>
          </highlight-code>
        </v-col>
      </v-row>
    </flex-box-panel>
    <br/>
    <!-- Card -->
    <flex-box-card
      :md="4"
      color=""
    >
      <template v-slot:system-bar>
        <v-system-bar
          color="indigo darken-2"
          dark
        >
          <v-spacer></v-spacer>

          <v-icon>mdi-window-minimize</v-icon>

          <v-icon>mdi-window-maximize</v-icon>

          <v-icon>mdi-close</v-icon>
        </v-system-bar>
      </template>

      <template v-slot:tool-bar>
        <v-toolbar
          color="indigo"
          dark
        >
          <v-app-bar-nav-icon></v-app-bar-nav-icon>

          <v-toolbar-title>Discover</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </v-toolbar>
      </template>

      <v-container fluid>
        <v-row dense>
          <v-col
            v-for="card in exx5Cards"
            :key="card.title"
            :cols="card.flex"
          >
            <v-card>
              <v-img
                :src="card.src"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
              >
                <v-card-title v-text="card.title"></v-card-title>
              </v-img>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn icon>
                  <v-icon>mdi-heart</v-icon>
                </v-btn>

                <v-btn icon>
                  <v-icon>mdi-bookmark</v-icon>
                </v-btn>

                <v-btn icon>
                  <v-icon>mdi-share-variant</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </flex-box-card>
    <br/>

    <!--=== Horizontal cards ===-->
    <div class="title">Horizontal cards (Exx.6)</div>
    <div class="subtitle-1">
      Using <kbd>v-flex</kbd>, you can create customized horizontal cards. Use the <kbd>contain</kbd> property to
      shrink the <kbd>v-img</kbd> to
      fit inside the container, instead of covering.
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
          <highlight-code :md="12" title="Script">
            <code8></code8>
          </highlight-code>
        </v-col>
      </v-row>
    </flex-box-panel>
    <br/>
    <!-- flex-box-card -->
    <flex-box-card
      :md="4"
      color=""
    >
      <template v-slot:system-bar>
        <v-system-bar
          color="pink darken-2"
          dark
        >
          <v-spacer></v-spacer>

          <v-icon>mdi-window-minimize</v-icon>

          <v-icon>mdi-window-maximize</v-icon>

          <v-icon>mdi-close</v-icon>
        </v-system-bar>
      </template>

      <template v-slot:app-bar>
        <v-app-bar
          dark
          color="pink"
        >
          <v-app-bar-nav-icon></v-app-bar-nav-icon>

          <v-toolbar-title>My Music</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </v-app-bar>
      </template>

      <v-container>
        <v-row dense>
          <v-col cols="12">
            <v-card
              color="#385F73"
              dark
            >
              <v-card-title class="headline">Unlimited music now</v-card-title>

              <v-card-subtitle>Listen to your favorite artists and albums whenever and wherever, online and offline.
              </v-card-subtitle>

              <v-card-actions>
                <v-btn text>Listen Now</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>

          <v-col
            v-for="(item, i) in exx6Items"
            :key="i"
            cols="12"
          >
            <v-card
              :color="item.color"
              dark
            >
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title
                    class="headline"
                    v-text="item.title"
                  ></v-card-title>

                  <v-card-subtitle v-text="item.artist"></v-card-subtitle>
                </div>

                <v-avatar
                  class="ma-3"
                  size="125"
                  tile
                >
                  <v-img :src="item.src"></v-img>
                </v-avatar>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </flex-box-card>
    <br/>

    <!--=== Custom actions ===-->
    <div class="title">Custom actions (Exx.7)</div>
    <div class="subtitle-1">
      With a simple conditional, you can easily add supplementary text that is hidden until opened.
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
          <highlight-code :md="12" title="Script">
            <code10></code10>
          </highlight-code>
        </v-col>
      </v-row>
    </flex-box-panel>
    <br/>
    <!-- Card -->
    <flex-box-card
      :md="4"
      color=""
    >
      <template v-slot:card-img>
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          height="200px"
        ></v-img>
      </template>
      <v-card-title>
        Top western road trips
      </v-card-title>

      <v-card-subtitle>
        1,000 miles of wonder
      </v-card-subtitle>

      <v-card-actions>
        <v-btn text>Share</v-btn>

        <v-btn
          color="orange"
          text
        >
          Explore
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn
          icon
          @click="exx7Show = !exx7Show"
        >
          <v-icon>{{ exx7Show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="exx7Show">
          <v-divider></v-divider>

          <v-card-text>
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for
            sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you
            add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to
            escape.
          </v-card-text>
        </div>
      </v-expand-transition>
    </flex-box-card>
    <br/>

    <!--=== Twitter card ===-->
    <div class="title">Twitter card (Exx.8)</div>
    <div class="subtitle-1">
      The <kbd>v-card</kbd> component has multiple children components that help you build complex examples without
      having to
      worry about spacing. This example is comprised of the <kbd>v-card-title</kbd>, <kbd>v-card-text</kbd> and <kbd>v-card-actions</kbd>
      components.
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
          <highlight-code :md="12" title="Script">
            <code12></code12>
          </highlight-code>
        </v-col>
      </v-row>
    </flex-box-panel>
    <br/>
    <!-- Card -->
    <flex-box-card
      :md="4"
      color="#26c6da"
    >
      <v-card-title>
        <v-icon
          large
          left
        >
          mdi-twitter
        </v-icon>
        <span class="title font-weight-light">Twitter</span>
      </v-card-title>

      <v-card-text class="headline font-weight-bold">
        {{ exx8TwitText }}
      </v-card-text>

      <v-card-actions>
        <v-list-item class="grow">
          <v-list-item-avatar color="grey darken-3">
            <v-img
              class="elevation-6"
              :src="exx8TwitAvatar()"
            ></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Evan You</v-list-item-title>
          </v-list-item-content>

          <v-row
            align="center"
            justify="end"
          >
            <v-icon class="mr-1">mdi-heart</v-icon>
            <span class="subheading mr-2">256</span>
            <span class="mr-1">·</span>
            <v-icon class="mr-1">mdi-share-variant</v-icon>
            <span class="subheading">45</span>
          </v-row>
        </v-list-item>
      </v-card-actions>
    </flex-box-card>
    <br/>

    <!--=== Loading card ===-->
    <div class="title">Loading card (Exx.9)</div>
    <div class="subtitle-1">
      Cards can be set to a loading state when processing a user action. This disables further actions and
      provides visual feedback with an indeterminate <a href="https://vuetifyjs.com/en/components/progress-linear/" target="_blank">v-progress-linear</a>.
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
          <highlight-code :md="12" title="Script">
            <code14></code14>
          </highlight-code>
        </v-col>
      </v-row>
    </flex-box-panel>
    <br/>
    <!-- Card -->
    <flex-box-card
      :md="4"
      color=""
      :loading="exx9Loading"
    >
      <template v-slot:card-img>
        <v-img
          height="250"
          src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
        ></v-img>
      </template>

      <v-card-title>Cafe Badilico</v-card-title>

      <v-card-text>
        <v-row
          align="center"
          class="mx-0"
        >
          <v-rating
            :value="4.5"
            color="amber"
            dense
            half-increments
            readonly
            size="14"
          ></v-rating>

          <div class="grey--text ml-4">4.5 (413)</div>
        </v-row>

        <div class="my-4 subtitle-1">
          $ • Italian, Cafe
        </div>

        <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-title>Tonight's availability</v-card-title>

      <v-card-text>
        <v-chip-group
          v-model="exx9Selection"
          active-class="deep-purple accent-4 white--text"
          column
        >
          <v-chip>5:30PM</v-chip>

          <v-chip>7:30PM</v-chip>

          <v-chip>8:00PM</v-chip>

          <v-chip>9:00PM</v-chip>
        </v-chip-group>
      </v-card-text>

      <v-card-actions>
        <v-btn
          color="orange"
          text
          @click="exx9Reserve"
        >
          Reserve
        </v-btn>
      </v-card-actions>
    </flex-box-card>
    <br/>

    <!--=== Weather card ===-->
    <div class="title">Weather card (Exx.10)</div>
    <div class="subtitle-1">
      Using <a href="https://vuetifyjs.com/en/components/lists/" target="_blank">v-list-items</a> and a
      <a href="https://vuetifyjs.com/en/components/sliders/" target="_blank">v-slider</a>, we are able to create a
      unique weather card. The list components ensure that we have consistent spacing and functionality while the
      slider component allows us to provide a useful interface of selection to the user.
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
          <highlight-code :md="12" title="Script">
            <code16></code16>
          </highlight-code>
        </v-col>
      </v-row>
    </flex-box-panel>
    <br/>
    <!-- Card -->
    <flex-box-card
      :md="4"

    >
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title class="headline">San Francisco</v-list-item-title>
          <v-list-item-subtitle>Mon, 12:30 PM, Mostly sunny</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-card-text>
        <v-row align="center">
          <v-col class="display-3" cols="6">
            23&deg;C
          </v-col>
          <v-col cols="6">
            <v-img
              src="https://cdn.vuetifyjs.com/images/cards/sun.png"
              alt="Sunny image"
              width="92"
            ></v-img>
          </v-col>
        </v-row>
      </v-card-text>

      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-send</v-icon>
        </v-list-item-icon>
        <v-list-item-subtitle>23 km/h</v-list-item-subtitle>
      </v-list-item>

      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-cloud-download</v-icon>
        </v-list-item-icon>
        <v-list-item-subtitle>48%</v-list-item-subtitle>
      </v-list-item>

      <v-slider
        v-model="exx10Time"
        :max="6"
        :tick-labels="exx10Labels"
        class="mx-4"
        ticks
      ></v-slider>

      <v-list class="transparent">
        <v-list-item
          v-for="item in exx10Forecast"
          :key="item.day"
        >
          <v-list-item-title>{{ item.day }}</v-list-item-title>

          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-subtitle class="text-right">
            {{ item.temp }}
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn text>Full Report</v-btn>
      </v-card-actions>
    </flex-box-card>
    <br/>

    <!--=== Advanced ===-->
    <div class="title">Advanced (Exx.11)</div>
    <div class="subtitle-1">
      Using <kbd>v-list-item</kbd> and <kbd>v-img</kbd> allows us to create unique card layouts in an advanced setting.
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
          <highlight-code :md="12" title="Template" :init="true"><code17></code17></highlight-code>
        </v-col>
      </v-row>
    </flex-box-panel>
    <br/>
    <!-- Card -->
    <flex-box-card
      :md="4"
    >
      <v-list-item>
        <v-list-item-avatar color="grey"></v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="headline">Our Changing Planet</v-list-item-title>
          <v-list-item-subtitle>by Kurt Wagner</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-img
        src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg"
        height="194"
      ></v-img>

      <v-card-text>
        Visit ten places on our planet that are undergoing the biggest changes today.
      </v-card-text>

      <v-card-actions>
        <v-btn
          text
          color="deep-purple accent-4"
        >
          Read
        </v-btn>
        <v-btn
          text
          color="deep-purple accent-4"
        >
          Bookmark
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-share-variant</v-icon>
        </v-btn>
      </v-card-actions>
    </flex-box-card>
    <br/>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex';
  import AppPageHeader from '~/components/app/layout/AppPageHeader';
  import FlexBox from '~/components/widgets/containers/flex-box';
  import FlexBoxCard from '~/components/widgets/containers/flex-box-card';
  import FlexBoxPanel from '~/components/widgets/containers/flex-box-panel';
  import HighlightCode from '~/components/widgets/highlight/highlight-code';
  import Code1 from '~/components/codes/components/cards/code-html-1';
  import Code2 from '~/components/codes/components/cards/code-html-2';
  import Code3 from '~/components/codes/components/cards/code-html-3';
  import Code4 from '~/components/codes/components/cards/code-html-4';
  import Code5 from '~/components/codes/components/cards/code-html-5';
  import Code6 from '~/components/codes/components/cards/code-js-6';
  import Code7 from '~/components/codes/components/cards/code-html-7';
  import Code8 from '~/components/codes/components/cards/code-js-8';
  import Code9 from '~/components/codes/components/cards/code-html-9';
  import Code10 from '~/components/codes/components/cards/code-js-10';
  import Code11 from '~/components/codes/components/cards/code-html-11';
  import Code12 from '~/components/codes/components/cards/code-js-12';
  import Code13 from '~/components/codes/components/cards/code-html-13';
  import Code14 from '~/components/codes/components/cards/code-js-14';
  import Code15 from '~/components/codes/components/cards/code-html-15';
  import Code16 from '~/components/codes/components/cards/code-js-16';
  import Code17 from '~/components/codes/components/cards/code-html-17';

  const debug = require('debug')('app:page.basicForms');

  export default {
    components: {
      AppPageHeader,
      FlexBox,
      FlexBoxCard,
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
      Code17
    },
    data() {
      return {
        title: this.$t('cards.title'),
        description: this.$t('cards.description'),
        panel: [],
        exx5Cards: [
          {title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 12},
          {title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 6},
          {title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6},
        ],
        exx6Items: [
          {
            color: '#1F7087',
            src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
            title: 'Supermodel',
            artist: 'Foster the People',
          },
          {
            color: '#952175',
            src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
            title: 'Halcyon Days',
            artist: 'Ellie Goulding',
          },
        ],
        exx7Show: false,
        exx8TwitText: '"Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well."',
        exx8Avatar: {
          host: 'https://avataaars.io',
          avatarStyle: 'Transparent',
          topType: 'ShortHairShortCurly',
          accessoriesType: 'Prescription02',
          hairColor: 'Black',
          facialHairType: 'Blank',
          clotheType: 'Hoodie',
          clotheColor: 'White',
          eyeType: 'Default',
          eyebrowType: 'DefaultNatural',
          mouthType: 'Default',
          skinColor: 'Light'
        },
        exx9Loading: false,
        exx9Selection: 1,
        exx10Labels: ['SU', 'MO', 'TU', 'WED', 'TH', 'FR', 'SA'],
        exx10Time: 0,
        exx10Forecast: [
          { day: 'Tuesday', icon: 'mdi-white-balance-sunny', temp: '24\xB0/12\xB0' },
          { day: 'Wednesday', icon: 'mdi-white-balance-sunny', temp: '22\xB0/14\xB0' },
          { day: 'Thursday', icon: 'mdi-cloud', temp: '25\xB0/15\xB0' },
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
      exx8TwitAvatar: function () {
        let url = '';
        const keys = Object.keys(this.exx8Avatar);
        keys.forEach(key => {
          if (key === 'host') {
            url = this.exx8Avatar[key] + '/?';
          } else {
            url = url + `${key}=${this.exx8Avatar[key]}&`
          }
        });
        return url
      },
      exx9Reserve () {
        this.exx9Loading = true;

        setTimeout(() => (this.exx9Loading = false), 2000)
      },
    },
  }
</script>
