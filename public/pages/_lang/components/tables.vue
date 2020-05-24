<template>
  <div>
    <!--=== Page Header ===-->
    <app-page-header
      :page-title="description"
    ></app-page-header>

    <!--=== Description ===-->
    <blockquote class="blockquote line-left"><em>
      The <kbd>v-data-table</kbd> component is used for displaying tabular data. Features include sorting, searching,
      pagination, inline-editing, and row selection.
    </em></blockquote>
    <br/>

    <!--=== Usage ===-->
    <div class="title">Usage (Exx.1)</div>
    <div class="subtitle-1">
      The standard data-table will by default render your data as simple rows.
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
          <highlight-code :md="12" title="Script">
            <code2></code2>
          </highlight-code>
        </v-col>
      </v-row>
    </flex-box-panel>
    <br/>
    <!-- DataTable -->
    <flex-box-table
      color="indigo darken-2"
      :dark="true"
      title="Color Table"
      :headers="exx1Headers"
      :items="exx1Desserts"
      :outlined="true"
    ></flex-box-table>
    <v-divider class="my-5"></v-divider>

    <!--=== Selectable rows ===-->
    <div class="title">Selectable rows (Exx.2)</div>
    <div class="subtitle-1">
      The <kbd>show-select</kbd> prop will render a checkbox in the default header to toggle all rows, and a checkbox
      for
      each default row. You can customize these with the slots <kbd>header.data-table-select</kbd> and <kbd>item.data-table-select</kbd>
      respectively. You can also switch between allowing multiple selected rows at the same time or just one with the
      <kbd>single-select</kbd> prop.
    </div>
    <!-- Template/Script -->
    <flex-box-panel
      :md="10"
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
          <highlight-code :md="12" title="Script">
            <code4></code4>
          </highlight-code>
        </v-col>
      </v-row>
    </flex-box-panel>
    <br/>
    <!-- DataTable -->
    <flex-box-table
      :outlined="true"
      :model="exx2Selected"
      :headers="exx2Headers"
      :items="exx2Desserts"
      item-key="name"
      :single-select="exx2SingleSelect"
      :show-select="true"
    >
      <template v-slot:card-title>
        <v-card-title>
          <v-switch v-model="exx2SingleSelect" label="Single select" class="pa-3"></v-switch>
        </v-card-title>
      </template>
    </flex-box-table>
    <v-divider class="my-5"></v-divider>

    <!--=== Grouped rows ===-->
    <div class="title">Grouped rows (Exx.3)</div>
    <div class="subtitle-1">
      Using the <kbd>group-by</kbd> and <kbd>group-desc</kbd> props you can group rows on an item property.
      The <kbd>show-group-by</kbd> prop will show a group button in the default header.
    </div>
    <!-- Template/Script -->
    <flex-box-panel
      :md="10"
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
    <!-- DataTable -->
    <flex-box-table
      :md="4"
      :outlined="true"
      :headers="exx3Headers"
      :items="exx3Desserts"
      item-key="name"
      :items-per-page="10"
      :show-group-by="true"
      group-by="category"
    ></flex-box-table>
    <v-divider class="my-5"></v-divider>

    <!--=== Sort on multiple columns ===-->
    <div class="title">Sort on multiple columns (Exx.4)</div>
    <div class="subtitle-1">
      Using the <kbd>multi-sort</kbd> prop will enable you to sort on multiple columns at the same time. When enabled,
      you can pass arrays to both <kbd>sort-by</kbd> and <kbd>sort-desc</kbd> to programmatically control the sorting,
      instead of single values.
    </div>
    <!-- Template/Script -->
    <flex-box-panel
      :md="10"
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
    <!-- DataTable -->
    <flex-box-table
      :outlined="true"
      :headers="exx4Headers"
      :items="exx4Desserts"
      :sort-by="['calories', 'fat']"
      :sort-desc="[false, true]"
      :multi-sort="true"
    ></flex-box-table>
    <v-divider class="my-5"></v-divider>

    <!--=== Search ===-->
    <div class="title">Search (Exx.5)</div>
    <div class="subtitle-1">
      The data table exposes a <kbd>search</kbd> prop that allows you to filter your data.
    </div>
    <!-- Template/Script -->
    <flex-box-panel
      :md="10"
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
    <!-- DataTable -->
    <flex-box-table
      :outlined="true"
      :headers="exx5Headers"
      :items="exx5Desserts"
      :search="exx5Search"
    >
      <template v-slot:card-title>
        <v-card-title>
          Nutrition
          <v-spacer></v-spacer>
          <v-text-field
            v-model="exx5Search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
      </template>
    </flex-box-table>
    <v-divider class="my-5"></v-divider>

    <!--=== Remove default header and footer ===-->
    <div class="title">Remove default header and footer (Exx.6)</div>
    <div class="subtitle-1">
      You can apply the <kbd>hide-default-header</kbd> and <kbd>hide-default-footer</kbd> props to remove the default
      header and footer respectively.
    </div>
    <!-- Template/Script -->
    <flex-box-panel
      :md="10"
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
    <!-- DataTable -->
    <flex-box-table
      :outlined="true"
      :headers="exx6Headers"
      :items="exx6Desserts"
      :hide-default-header="true"
      :hide-default-footer="true"
    ></flex-box-table>
    <v-divider class="my-5"></v-divider>

    <!--=== Loading state ===-->
    <div class="title">Loading state (Exx.7)</div>
    <div class="subtitle-1">
      You can use the <kbd>loading</kbd> prop to indicate that data in the table is currently loading. If there is no
      data
      in the table, a loading message will also be displayed. This message can be customized using the
      <kbd>loading-text</kbd> prop
      or the <kbd>loading</kbd> slot.
    </div>
    <!-- Template/Script -->
    <flex-box-panel
      :md="10"
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
      </v-row>
    </flex-box-panel>
    <br/>
    <!-- DataTable -->
    <flex-box-table
      :outlined="true"
      item-key="name"
      :loading="true"
      loading-text="Loading... Please wait"
    ></flex-box-table>
    <v-divider class="my-5"></v-divider>

    <!--=== Dense ===-->
    <div class="title">Dense (Exx.8)</div>
    <div class="subtitle-1">
      Using the <kbd>dense</kbd> prop you are able to give your data tables an alternate style.
    </div>
    <!-- Template/Script -->
    <flex-box-panel
      :md="10"
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
            <code14></code14>
          </highlight-code>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <highlight-code :md="12" title="Script">
            <code15></code15>
          </highlight-code>
        </v-col>
      </v-row>
    </flex-box-panel>
    <br/>
    <!-- DataTable -->
    <flex-box-table
      :outlined="true"
      :headers="exx8Headers"
      :items="exx8Desserts"
      item-key="name"
      :dense="true"
    ></flex-box-table>
    <v-divider class="my-5"></v-divider>

    <!--=== Footer props ===-->
    <div class="title">Footer props (Exx.9)</div>
    <div class="subtitle-1">
      The <kbd>v-data-table</kbd> renders a default footer using the <kbd>v-data-footer</kbd> component. You can pass
      props to this
      component using <kbd>footer-props</kbd>.
    </div>
    <!-- Template/Script -->
    <flex-box-panel
      :md="10"
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
            <code16></code16>
          </highlight-code>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <highlight-code :md="12" title="Script">
            <code17></code17>
          </highlight-code>
        </v-col>
      </v-row>
    </flex-box-panel>
    <br/>
    <!-- DataTable -->
    <flex-box-table
      :outlined="true"
      :headers="exx9Headers"
      :items="exx9Desserts"
      item-key="name"
      :footer-props="{
      showFirstLastPage: true,
      firstIcon: 'mdi-arrow-collapse-left',
      lastIcon: 'mdi-arrow-collapse-right',
      prevIcon: 'mdi-minus',
      nextIcon: 'mdi-plus'
    }"
    ></flex-box-table>
    <v-divider class="my-5"></v-divider>

    <!--=== Filterable columns ===-->
    <div class="title">Filterable columns (Exx.10)</div>
    <div class="subtitle-1">
      You can easily disable specific columns from being included when searching through table rows by setting
      the property <kbd>filterable</kbd> to false on the header item(s). In the example below the dessert name column
      is no longer searchable.
    </div>
    <!-- Template/Script -->
    <flex-box-panel
      :md="10"
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
            <code18></code18>
          </highlight-code>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <highlight-code :md="12" title="Script">
            <code19></code19>
          </highlight-code>
        </v-col>
      </v-row>
    </flex-box-panel>
    <br/>
    <!-- DataTable -->
    <flex-box-table
      :outlined="true"
      :headers="exx10Headers"
      :items="exx10Desserts"
      item-key="name"
      :items-per-page="10"
      :search="exx10Search"
    >
      <template v-slot:card-title>
        <v-card-title>
          <v-text-field
            v-model="exx10Search"
            append-icon="mdi-database-search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
      </template>
    </flex-box-table>
    <v-divider class="my-5"></v-divider>

    <!--=== Slots ===-->
    <div class="title">Slots (Exx.11)</div>
    <div class="subtitle-1">
      The <kbd>v-data-table</kbd> provides a large number of slots for customizing the table. This example showcases
      some
      of these slots and what you can do with each. It is important to note some slot (eg: <kbd>item/body/header</kbd>)
      will
      completely takes over the internal rendering of the component which will require you to re-implement
      functionalities such as selection and expansion. Some slots will override each other such
      as: <kbd>body</kbd> > <kbd>item</kbd> > <kbd>item.name</kbd> and <kbd>header/header.name</kbd>.
    </div>
    <!-- Template/Script -->
    <flex-box-panel
      :md="10"
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
          <highlight-code :md="12" title="Script">
            <code21></code21>
          </highlight-code>
        </v-col>
      </v-row>
    </flex-box-panel>
    <br/>
    <!-- DataTable -->
    <flex-box-card
      :md="10"
      :outlined="true"
    >
        <v-select v-model="exx11Enabled" :items="exx11Slots" label="Slot" clearable></v-select>
        <v-data-table
          :class="theme.dark? 'grey darken-3' : 'grey lighten-5' "
          :dark="theme.dark"
          :headers="exx11Headers"
          :items="exx11Items"
          :search="exx11Search"
          :hide-default-header="exx11HideHeaders"
          :show-select="exx11ShowSelect"
          :loading="exx11IsLoading"
          hide-default-footer
          item-key="name"
        >
          <template v-if="exx11IsEnabled('top')" v-slot:top>
            <div>This is content above the actual table</div>
          </template>

          <template v-if="exx11IsEnabled('header.data-table-select')" v-slot:header.data-table-select="{ on, props }">
            <v-simple-checkbox color="purple" v-bind="props" v-on="on"></v-simple-checkbox>
          </template>

          <template v-if="exx11IsEnabled('header')" v-slot:header="{ props: { headers } }">
            <thead>
            <tr>
              <th :colspan="headers.length">
                This is a header
              </th>
            </tr>
            </thead>
          </template>

          <template v-if="exx11IsEnabled('progress')" v-slot:progress>
            <v-progress-linear color="purple" :height="10" indeterminate></v-progress-linear>
          </template>

          <template v-if="exx11IsEnabled('item.data-table-select')"
                    v-slot:item.data-table-select="{ isSelected, select }">
            <v-simple-checkbox color="green" :value="isSelected" @input="select($event)"></v-simple-checkbox>
          </template>

          <template v-if="exx11IsEnabled('item.<name>')" v-slot:item.name="{ item }">
            {{ item.name.toUpperCase() }}
          </template>

          <template v-if="exx11IsEnabled('body.prepend')" v-slot:body.prepend="{ headers }">
            <tr>
              <td :colspan="headers.length">
                This is a prepended row
              </td>
            </tr>
          </template>

          <template v-if="exx11IsEnabled('body')" v-slot:body="{ items }">
            <tbody>
            <tr v-for="item in items" :key="item.name">
              <td>{{ item.name }}</td>
              <td>CONTENT</td>
              <td>CONTENT</td>
              <td>CONTENT</td>
              <td>CONTENT</td>
              <td>CONTENT</td>
            </tr>
            </tbody>
          </template>

          <template v-if="exx11IsEnabled('no-data')" v-slot:no-data>
            NO DATA HERE!
          </template>

          <template v-if="exx11IsEnabled('no-results')" v-slot:no-results>
            NO RESULTS HERE!
          </template>

          <template v-if="exx11IsEnabled('body.append')" v-slot:body.append="{ headers }">
            <tr>
              <td :colspan="headers.length">
                This is an appended row
              </td>
            </tr>
          </template>

          <template v-if="exx11IsEnabled('footer')" v-slot:footer>
            <div>
              This is a footer
            </div>
          </template>
        </v-data-table>
    </flex-box-card>
    <v-divider class="my-5"></v-divider>

    <!--=== Simple Checkbox ===-->
    <div class="title">Simple Checkbox (Exx.12)</div>
    <div class="subtitle-1">
      When wanting to use a checkbox component inside of a slot template in your data tables, use the <kbd>v-simple-checkbox</kbd>
      component rather than the <kbd>v-checkbox</kbd> component. The <kbd>v-simple-checkbox</kbd> component is used
      internally and will respect header alignment.
    </div>
    <!-- Template/Script -->
    <flex-box-panel
      :md="10"
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
    <!-- DataTable -->
    <flex-box-card
      :md="10"
      :outlined="true"
    >
      <v-data-table
        :class="theme.dark? 'grey darken-3' : 'grey lighten-5' "
        :dark="theme.dark"
        :headers="exx12Headers"
        :items="exx12Desserts"
        :items-per-page="5"
      >
        <template v-slot:item.glutenFree="{ item }">
          <v-simple-checkbox v-model="item.glutenFree" disabled></v-simple-checkbox>
        </template>
      </v-data-table>
    </flex-box-card>
    <v-divider class="my-5"></v-divider>

    <!--=== Expandable rows ===-->
    <div class="title">Expandable rows (Exx.13)</div>
    <div class="subtitle-1">
      The <kbd>show-expand</kbd> prop will render an expand icon on each default row. You can customize this with the
      <kbd>item.data-table-expand</kbd> slot. The position of this slot can be customized by adding a column with
      <kbd>value: 'data-table-expand'</kbd> to the headers array. You can also switch between allowing multiple expanded
      rows at the same time or just one with the <kbd>single-expand</kbd> prop. The expanded rows are available on the
      synced prop <kbd>expanded.sync</kbd>.
    </div>
    <!-- Template/Script -->
    <flex-box-panel
      :md="10"
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
    <!-- DataTable -->
    <flex-box-card
      :md="10"
      :outlined="true"
    >
      <template v-slot:tool-bar>
        <v-toolbar color="secondary" flat>
          <v-toolbar-title>Expandable Table</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-switch v-model="exx13SingleExpand" label="Single expand" class="mt-2"></v-switch>
        </v-toolbar>
      </template>
      <v-data-table
        :class="theme.dark? 'grey darken-3' : 'grey lighten-5' "
        :dark="theme.dark"
        :headers="exx13Headers"
        :items="exx13Desserts"
        :items-per-page="5"
        :single-expand="exx13SingleExpand"
        :expanded.sync="exx13Expanded"
        item-key="name"
        show-expand
      >
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length" class="orange--text">More info about {{ item.name }}</td>
        </template>
      </v-data-table>
    </flex-box-card>
    <v-divider class="my-5"></v-divider>

    <!--=== Custom filtering ===-->
    <div class="title">Custom filtering (Exx.14)</div>
    <div class="subtitle-1">
      You can override the default filtering used with <kbd>search</kbd> prop by supplying a function to the <kbd>custom-filter</kbd>
      prop.
      If you need to customize the filtering of a specific column, you can supply a function to the <kbd>filter</kbd>
      property
      on header items. The signature is <kbd>(value: any, search: string | null, item: any) => boolean</kbd>. This
      function
      will always be run even if <kbd>search</kbd> prop has not been provided. Thus you need to make sure to exit early
      with a
      value of <kbd>true</kbd> if <kbd>filter</kbd> should not be applied.
    </div>
    <!-- Template/Script -->
    <flex-box-panel
      :md="10"
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
    <!-- DataTable -->
    <flex-box-card
      :md="10"
      :outlined="true"
    >
      <v-data-table
        :class="theme.dark? 'grey darken-3' : 'grey lighten-5' "
        :dark="theme.dark"
        :headers="exx14Headers"
        :items="exx14Desserts"
        item-key="name"
        :items-per-page="5"
        :search="exx14Search"
        :custom-filter="exx14FilterOnlyCapsText"
      >
        <template v-slot:top>
          <v-text-field v-model="exx14Search" label="Search (UPPER CASE ONLY)" class="mx-4"></v-text-field>
        </template>
        <template v-slot:body.append>
          <tr>
            <td></td>
            <td>
              <v-text-field v-model="exx14Calories" type="number" label="Less than"></v-text-field>
            </td>
            <td colspan="4"></td>
          </tr>
        </template>
      </v-data-table>
    </flex-box-card>
    <v-divider class="my-5"></v-divider>

    <!--=== Customizing default header ===-->
    <div class="title">Customizing default header (Exx.15)</div>
    <div class="subtitle-1">
      You can use the dynamic slots <kbd>header.name</kbd> to customize only certain columns. <kbd>name</kbd> is the
      name of the
      <kbd>value</kbd> property in the corresponding header item sent to <kbd>headers</kbd>.
    </div>
    <!-- Template/Script -->
    <flex-box-panel
      :md="10"
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
            <code28></code28>
          </highlight-code>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <highlight-code :md="12" title="Script">
            <code29></code29>
          </highlight-code>
        </v-col>
      </v-row>
    </flex-box-panel>
    <br/>
    <!-- DataTable -->
    <flex-box-card
      :md="10"
      :outlined="true"
    >
      <v-data-table
        :class="theme.dark? 'grey darken-3' : 'grey lighten-5' "
        :dark="theme.dark"
        :headers="exx15Headers"
        :items="exx15Desserts"
        :items-per-page="5"
      >
        <template v-slot:header.name="{ header }">
          {{ header.text.toUpperCase() }}
        </template>
      </v-data-table>
    </flex-box-card>
    <v-divider class="my-5"></v-divider>

    <!--=== Customizing default rows ===-->
    <div class="title">Customizing default rows (Exx.16)</div>
    <div class="subtitle-1">
      You can use the dynamic slots <kbd>item.name</kbd> to customize only certain columns. <kbd>name</kbd> is the name
      of the
      <kbd>value</kbd> property in the corresponding header item sent to <kbd>headers</kbd>. So to customize the
      calories column we're
      using the <kbd>item.calories</kbd> slot.
    </div>
    <!-- Template/Script -->
    <flex-box-panel
      :md="10"
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
            <code30></code30>
          </highlight-code>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <highlight-code :md="12" title="Script">
            <code31></code31>
          </highlight-code>
        </v-col>
      </v-row>
    </flex-box-panel>
    <br/>
    <!-- DataTable -->
    <flex-box-card
      :md="10"
      :outlined="true"
    >
      <v-data-table
        :class="theme.dark? 'grey darken-3' : 'grey lighten-5' "
        :dark="theme.dark"
        :headers="exx16Headers"
        :items="exx16Desserts"
        :items-per-page="5"
      >
        <template v-slot:item.calories="{ item }">
          <v-chip :color="exx16GetColor(item.calories)" dark>{{ item.calories }}</v-chip>
        </template>
      </v-data-table>
    </flex-box-card>
    <v-divider class="my-5"></v-divider>

    <!--=== External pagination ===-->
    <div class="title">External pagination (Exx.17)</div>
    <div class="subtitle-1">
      Pagination can be controlled externally by using the individual props, or by using the <kbd>options</kbd> prop.
      Remember that you must apply the <kbd>.sync</kbd> modifier.
    </div>
    <!-- Template/Script -->
    <flex-box-panel
      :md="10"
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
            <code32></code32>
          </highlight-code>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <highlight-code :md="12" title="Script">
            <code33></code33>
          </highlight-code>
        </v-col>
      </v-row>
    </flex-box-panel>
    <br/>
    <!-- DataTable -->
    <flex-box-card
      :md="10"
      :outlined="true"
    >
      <v-data-table
        :class="theme.dark? 'grey darken-3' : 'grey lighten-5' "
        :dark="theme.dark"
        :headers="exx17Headers"
        :items="exx17Desserts"
        :items-per-page="exx17ItemsPerPage"
        :page.sync="exx17Page"
        hide-default-footer
        @page-count="exx17PageCount = $event"
      ></v-data-table>
      <div class="text-center pt-2">
        <v-pagination v-model="exx17Page" :length="exx17PageCount"></v-pagination>
        <v-text-field
          :value="exx17ItemsPerPage"
          label="Items per page"
          type="number"
          min="-1"
          max="15"
          @input="exx17ItemsPerPage = parseInt($event, 10)"
        ></v-text-field>
      </div>
    </flex-box-card>
    <v-divider class="my-5"></v-divider>

    <!--=== External sorting ===-->
    <div class="title">External sorting (Exx.18)</div>
    <div class="subtitle-1">
      Sorting can also be controlled externally by using the individual props, or by using the the <kbd>options</kbd>
      prop.
      Remember that you must apply the <kbd>.sync</kbd> modifier.
    </div>
    <!-- Template/Script -->
    <flex-box-panel
      :md="10"
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
            <code34></code34>
          </highlight-code>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <highlight-code :md="12" title="Script">
            <code35></code35>
          </highlight-code>
        </v-col>
      </v-row>
    </flex-box-panel>
    <br/>
    <!-- DataTable -->
    <flex-box-card
      :md="10"
      :outlined="true"
    >
      <v-data-table
        :class="theme.dark? 'grey darken-3' : 'grey lighten-5' "
        :dark="theme.dark"
        :headers="exx18Headers"
        :items="exx18Desserts"
        :items-per-page="5"
        :sort-by.sync="exx18SortBy"
        :sort-desc.sync="exx18SortDesc"
      ></v-data-table>
      <div class="text-center pt-2">
        <v-btn color="primary" class="mr-2" @click="exx18ToggleOrder">Toggle sort order</v-btn>
        <v-btn color="primary" @click="exx18NextSort">Sort next column</v-btn>
      </div>
    </flex-box-card>
    <v-divider class="my-5"></v-divider>

    <!--=== Paginate and sort server-side ===-->
    <div class="title">Paginate and sort server-side (Exx.19)</div>
    <div class="subtitle-1">
      If you're loading data already paginated and sorted from a backend, you can use the <kbd>server-items-length</kbd>
      prop.
      Defining this prop will disable the built-in sorting and pagination, and you will instead need to use the
      available events (<kbd>update:page, update:sortBy, update:options</kbd>, etc) to know when to request new pages
      from your
      backend. Use the <kbd>loading</kbd> prop to display a progress bar while fetching data.
    </div>
    <!-- Template/Script -->
    <flex-box-panel
      :md="10"
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
            <code36></code36>
          </highlight-code>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <highlight-code :md="12" title="Script">
            <code37></code37>
          </highlight-code>
        </v-col>
      </v-row>
    </flex-box-panel>
    <br/>
    <!-- DataTable -->
    <flex-box-card
      :md="10"
      :outlined="true"
    >
      <v-data-table
        :class="theme.dark? 'grey darken-3' : 'grey lighten-5' "
        :dark="theme.dark"
        :headers="exx19Headers"
        :items="exx19Desserts"
        :items-per-page="5"
        :options.sync="exx19Options"
        :server-items-length="exx19TotalDesserts"
        :loading="exx19Loading"
      ></v-data-table>
    </flex-box-card>
    <v-divider class="my-5"></v-divider>

    <!--=== Content Editing ===-->
    <div class="title">Content Editing (Exx.20)</div>
    <div class="subtitle-1">
      The <kbd>v-edit-dialog</kbd> component can be used for editing data directly within a <kbd>v-data-table</kbd>. You
      can block the
      closing of the <kbd>v-edit-dialog</kbd> when clicked outside by adding the <kbd>persistent</kbd> prop.
    </div>
    <!-- Template/Script -->
    <flex-box-panel
      :md="10"
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
            <code38></code38>
          </highlight-code>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <highlight-code :md="12" title="Script">
            <code39></code39>
          </highlight-code>
        </v-col>
      </v-row>
    </flex-box-panel>
    <br/>
    <!-- DataTable -->
    <flex-box-card
      :md="10"
      :outlined="true"
    >
      <v-data-table
        :class="theme.dark? 'grey darken-3' : 'grey lighten-5' "
        :dark="theme.dark"
        :headers="exx20Headers"
        :items="exx20Desserts"
        :items-per-page="5"
      >
        <template v-slot:item.name="props">
          <v-edit-dialog
            :return-value.sync="props.item.name"
            @save="exx20Save"
            @cancel="exx20Cancel"
            @open="exx20Open"
            @close="exx20Close"
          > {{ props.item.name }}
            <template v-slot:input>
              <v-text-field
                v-model="props.item.name"
                :rules="[exx20Max25chars]"
                label="Edit"
                single-line
                counter
              ></v-text-field>
            </template>
          </v-edit-dialog>
        </template>
        <template v-slot:item.iron="props">
          <v-edit-dialog
            :return-value.sync="props.item.iron"
            large
            persistent
            @save="exx20Save"
            @cancel="exx20Cancel"
            @open="exx20Open"
            @close="exx20Close"
          >
            <div>{{ props.item.iron }}</div>
            <template v-slot:input>
              <div class="mt-4 title">Update Iron</div>
            </template>
            <template v-slot:input>
              <v-text-field
                v-model="props.item.iron"
                :rules="[exx20Max25chars]"
                label="Edit"
                single-line
                counter
                autofocus
              ></v-text-field>
            </template>
          </v-edit-dialog>
        </template>
      </v-data-table>

      <v-snackbar v-model="exx20Snack" :timeout="3000" :color="exx20SnackColor">
        {{ exx20SnackText }}
        <v-btn text @click="exx20Snack = false">Close</v-btn>
      </v-snackbar>
    </flex-box-card>
    <v-divider class="my-5"></v-divider>

    <!--=== CRUD Actions ===-->
    <div class="title">CRUD Actions (Exx.21)</div>
    <div class="subtitle-1">
      <kbd>v-data-table</kbd> with CRUD actions using a <kbd>v-dialog</kbd> component for editing each row
    </div>
    <!-- Template/Script -->
    <flex-box-panel
      :md="10"
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
            <code40></code40>
          </highlight-code>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <highlight-code :md="12" title="Script">
            <code41></code41>
          </highlight-code>
        </v-col>
      </v-row>
    </flex-box-panel>
    <br/>
    <!-- DataTable -->
    <flex-box-card
      :md="10"
      :outlined="true"
    >
      <v-data-table
        :class="theme.dark? 'grey darken-3' : 'grey lighten-5' "
        :dark="theme.dark"
        :headers="exx21Headers"
        :items="exx21Desserts"
        :items-per-page="5"
        sort-by="calories"
      >
        <template v-slot:top>
          <v-toolbar flat color="secondary">
            <v-toolbar-title>My CRUD</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="exx21Dialog" max-width="500px">
              <template v-slot:activator="{ on }">
                <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ exx21FormTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="exx21EditedItem.name" label="Dessert name"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="exx21EditedItem.calories" label="Calories"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="exx21EditedItem.fat" label="Fat (g)"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="exx21EditedItem.carbs" label="Carbs (g)"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="exx21EditedItem.protein" label="Protein (g)"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="exx21Close">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="exx21Save">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="exx21EditItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            @click="exx21DeleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="exx21Initialize">Reset</v-btn>
        </template>
      </v-data-table>
    </flex-box-card>
  </div>
</template>

<script>
  import moment from 'moment';
  import {mapGetters, mapMutations} from 'vuex';
  import AppPageHeader from '~/components/app/layout/AppPageHeader';
  import FlexBox from '~/components/widgets/containers/flex-box';
  import FlexBoxCard from '~/components/widgets/containers/flex-box-card';
  import FlexBoxTable from '~/components/widgets/containers/flex-box-table';
  import FlexBoxPanel from '~/components/widgets/containers/flex-box-panel';
  import HighlightCode from '~/components/widgets/highlight/highlight-code';
  import {headers, desserts} from '~/api/demo/ui-elements/desserts-table.json';
  import {groupHeaders, groupDesserts} from '~/api/demo/ui-elements/desserts-group-table.json';
  import {checkboxHeaders, checkboxDesserts} from '~/api/demo/ui-elements/desserts-checkbox-table.json';
  import Code1 from '~/components/codes/components/tables/code-html-1';
  import Code2 from '~/components/codes/components/tables/code-js-2';
  import Code3 from '~/components/codes/components/tables/code-html-3';
  import Code4 from '~/components/codes/components/tables/code-js-4';
  import Code5 from '~/components/codes/components/tables/code-html-5';
  import Code6 from '~/components/codes/components/tables/code-js-6';
  import Code7 from '~/components/codes/components/tables/code-html-7';
  import Code8 from '~/components/codes/components/tables/code-js-8';
  import Code9 from '~/components/codes/components/tables/code-html-9';
  import Code10 from '~/components/codes/components/tables/code-js-10';
  import Code11 from '~/components/codes/components/tables/code-html-11';
  import Code12 from '~/components/codes/components/tables/code-js-12';
  import Code13 from '~/components/codes/components/tables/code-html-13';
  import Code14 from '~/components/codes/components/tables/code-html-14';
  import Code15 from '~/components/codes/components/tables/code-js-15';
  import Code16 from '~/components/codes/components/tables/code-html-16';
  import Code17 from '~/components/codes/components/tables/code-js-17';
  import Code18 from '~/components/codes/components/tables/code-html-18';
  import Code19 from '~/components/codes/components/tables/code-js-19';
  import Code20 from '~/components/codes/components/tables/code-html-20';
  import Code21 from '~/components/codes/components/tables/code-js-21';
  import Code22 from '~/components/codes/components/tables/code-html-22';
  import Code23 from '~/components/codes/components/tables/code-js-23';
  import Code24 from '~/components/codes/components/tables/code-html-24';
  import Code25 from '~/components/codes/components/tables/code-js-25';
  import Code26 from '~/components/codes/components/tables/code-html-26';
  import Code27 from '~/components/codes/components/tables/code-js-27';
  import Code28 from '~/components/codes/components/tables/code-html-28';
  import Code29 from '~/components/codes/components/tables/code-js-29';
  import Code30 from '~/components/codes/components/tables/code-html-30';
  import Code31 from '~/components/codes/components/tables/code-js-31';
  import Code32 from '~/components/codes/components/tables/code-html-32';
  import Code33 from '~/components/codes/components/tables/code-js-33';
  import Code34 from '~/components/codes/components/tables/code-html-34';
  import Code35 from '~/components/codes/components/tables/code-js-35';
  import Code36 from '~/components/codes/components/tables/code-html-36';
  import Code37 from '~/components/codes/components/tables/code-js-37';
  import Code38 from '~/components/codes/components/tables/code-html-38';
  import Code39 from '~/components/codes/components/tables/code-js-39';
  import Code40 from '~/components/codes/components/tables/code-html-40';
  import Code41 from '~/components/codes/components/tables/code-js-41';

  const debug = require('debug')('app:page.basicForms');

  export default {
    components: {
      AppPageHeader,
      FlexBox,
      FlexBoxCard,
      FlexBoxTable,
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
      Code26,
      Code27,
      Code28,
      Code29,
      Code30,
      Code31,
      Code32,
      Code33,
      Code34,
      Code35,
      Code36,
      Code37,
      Code38,
      Code39,
      Code40,
      Code41,
    },
    data() {
      const exx10Headers = headers.map((h, index) => {
        h["filterable"] = !!index;
        return Object.assign({}, h);
      });

      return {
        title: this.$t('tables.title'),
        description: this.$t('tables.description'),
        panel: [],
        exx1Headers: headers,
        exx1Desserts: desserts,
        exx2SingleSelect: false,
        exx2Selected: [],
        exx2Headers: headers,
        exx2Desserts: desserts,
        exx3Headers: groupHeaders,
        exx3Desserts: groupDesserts,
        exx4Headers: headers,
        exx4Desserts: desserts,
        exx5Search: '',
        exx5Headers: headers,
        exx5Desserts: desserts,
        exx6Headers: headers,
        exx6Desserts: desserts,
        exx8Headers: headers,
        exx8Desserts: desserts,
        exx9Headers: headers,
        exx9Desserts: desserts,
        exx10Search: '',
        exx10Headers,
        exx10Desserts: desserts,
        exx11Headers: headers,
        exx11Desserts: desserts,
        exx11Enabled: null,
        exx11Items: desserts,
        exx11Search: null,
        exx11Slots: [
          'body',
          'body.append',
          'body.prepend',
          'footer',
          'header.data-table-select',
          'header',
          'progress',
          'item.data-table-select',
          'item.<name>',
          'no-data',
          'no-results',
          'top',
        ],
        exx12Headers: checkboxHeaders,
        exx12Desserts: checkboxDesserts,
        exx13Expanded: [],
        exx13SingleExpand: false,
        exx13Desserts: desserts,
        exx13Headers: [
          {
            text: 'Dessert (100g serving)',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          {text: 'Calories', value: 'calories'},
          {text: 'Fat (g)', value: 'fat'},
          {text: 'Carbs (g)', value: 'carbs'},
          {text: 'Protein (g)', value: 'protein'},
          {text: 'Iron (%)', value: 'iron'},
          {text: '', value: 'data-table-expand'},
        ],
        exx14Search: '',
        exx14Calories: '',
        exx14Desserts: desserts,
        exx15Headers: headers,
        exx15Desserts: desserts,
        exx16Headers: headers,
        exx16Desserts: desserts,
        exx17Page: 1,
        exx17PageCount: 0,
        exx17ItemsPerPage: 5,
        exx17Headers: headers,
        exx17Desserts: desserts,
        exx18SortBy: 'fat',
        exx18SortDesc: false,
        exx18Headers: headers,
        exx18Desserts: desserts,
        exx19TotalDesserts: 0,
        exx19Desserts: [],
        exx19Loading: true,
        exx19Options: {},
        exx19Headers: headers,
        exx20Snack: false,
        exx20SnackColor: '',
        exx20SnackText: '',
        exx20Max25chars: v => v.length <= 25 || 'Input too long!',
        exx20Pagination: {},
        exx20Headers: headers,
        exx20Desserts: desserts,
        exx21Dialog: false,
        exx21Headers: [
          {
            text: 'Dessert (100g serving)',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          {text: 'Calories', value: 'calories'},
          {text: 'Fat (g)', value: 'fat'},
          {text: 'Carbs (g)', value: 'carbs'},
          {text: 'Protein (g)', value: 'protein'},
          {text: 'Actions', value: 'actions', sortable: false},
        ],
        exx21Desserts: [],
        exx21EditedIndex: -1,
        exx21EditedItem: {
          name: '',
          calories: 0,
          fat: 0,
          carbs: 0,
          protein: 0,
        },
        exx21DefaultItem: {
          name: '',
          calories: 0,
          fat: 0,
          carbs: 0,
          protein: 0,
        },
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
    mounted() {
      this.exx19GetDataFromApi()
        .then(data => {
          this.exx19Desserts = data.items
          this.exx19TotalDesserts = data.total
        });
      this.exx21Initialize();
    },
    watch: {
      exx11Enabled(slot) {
        if (slot === 'no-data') {
          this.exx11Items = []
        } else if (slot === 'no-results') {
          this.exx11Search = '...'
        } else {
          this.exx11Search = null;
          this.exx11Items = desserts
        }
      },
      exx19Options: {
        handler() {
          this.exx19GetDataFromApi()
            .then(data => {
              this.exx19Desserts = data.items;
              this.exx19TotalDesserts = data.total
            })
        },
        deep: true,
      },
      exx21Dialog(val) {
        val || this.exx21Close()
      },
    },
    computed: {
      ...mapGetters({
        theme: 'getTheme',
        config: 'getConfig',
        loading: 'getLoading'
      }),
      exx11ShowSelect() {
        return this.exx11IsEnabled('header.data-table-select') || this.exx11IsEnabled('item.data-table-select')
      },
      exx11HideHeaders() {
        return !this.exx11ShowSelect
      },
      exx11IsLoading() {
        return this.exx11IsEnabled('progress')
      },
      exx14Headers() {
        return [
          {
            text: 'Dessert (100g serving)',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          {
            text: 'Calories',
            value: 'calories',
            filter: value => {
              if (!this.exx14Calories) return true;
              return value < parseInt(this.exx14Calories)
            },
          },
          {text: 'Fat (g)', value: 'fat'},
          {text: 'Carbs (g)', value: 'carbs'},
          {text: 'Protein (g)', value: 'protein'},
          {text: 'Iron (%)', value: 'iron'},
        ]
      },
      exx21FormTitle() {
        return this.exx21EditedIndex === -1 ? 'New Item' : 'Edit Item'
      },
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
      exx11IsEnabled(slot) {
        return this.exx11Enabled === slot
      },
      exx14FilterOnlyCapsText(value, search, item) {
        return value != null &&
          search != null &&
          typeof value === 'string' &&
          value.toString().toLocaleUpperCase().indexOf(search) !== -1
      },
      exx16GetColor(calories) {
        if (calories > 400) return 'red';
        else if (calories > 200) return 'orange';
        else return 'green'
      },
      exx18ToggleOrder() {
        this.exx18SortDesc = !this.exx18SortDesc
      },
      exx18NextSort() {
        let index = this.exx18Headers.findIndex(h => h.value === this.exx18SortBy);
        index = (index + 1) % this.exx18Headers.length;
        this.exx18SortBy = this.exx18Headers[index].value
      },
      exx19GetDataFromApi() {
        this.exx19Loading = true;
        return new Promise((resolve, reject) => {
          const {sortBy, sortDesc, page, itemsPerPage} = this.exx19Options;

          let items = this.exx19GetDesserts();
          const total = items.length;

          if (sortBy.length === 1 && sortDesc.length === 1) {
            items = items.sort((a, b) => {
              const sortA = a[sortBy[0]];
              const sortB = b[sortBy[0]];

              if (sortDesc[0]) {
                if (sortA < sortB) return 1;
                if (sortA > sortB) return -1;
                return 0
              } else {
                if (sortA < sortB) return -1;
                if (sortA > sortB) return 1;
                return 0
              }
            })
          }

          if (itemsPerPage > 0) {
            items = items.slice((page - 1) * itemsPerPage, page * itemsPerPage)
          }

          setTimeout(() => {
            this.exx19Loading = false;
            resolve({
              items,
              total,
            })
          }, 1000)
        })
      },
      exx19GetDesserts() {
        return desserts
      },
      exx20Save() {
        this.exx20Snack = true;
        this.exx20SnackColor = 'success';
        this.exx20SnackText = 'Data saved'
      },
      exx20Cancel() {
        this.exx20Snack = true;
        this.exx20SnackColor = 'error';
        this.exx20SnackText = 'Canceled'
      },
      exx20Open() {
        this.exx20Snack = true;
        this.exx20SnackColor = 'info';
        this.exx20SnackText = 'Dialog opened'
      },
      exx20Close() {
        console.log('Dialog closed')
      },
      exx21Initialize() {
        this.exx21Desserts = desserts
      },

      exx21EditItem(item) {
        this.exx21EditedIndex = this.exx21Desserts.indexOf(item);
        this.exx21EditedItem = Object.assign({}, item);
        this.exx21Dialog = true
      },

      exx21DeleteItem(item) {
        const index = this.exx21Desserts.indexOf(item);
        confirm('Are you sure you want to delete this item?') && this.exx21Desserts.splice(index, 1)
      },

      exx21Close() {
        this.exx21Dialog = false;
        this.$nextTick(() => {
          this.exx21EditedItem = Object.assign({}, this.exx21DefaultItem);
          this.exx21EditedIndex = -1
        })
      },

      exx21Save() {
        if (this.exx21EditedIndex > -1) {
          Object.assign(this.exx21Desserts[this.exx21EditedIndex], this.exx21EditedItem)
        } else {
          this.exx21Desserts.push(this.exx21EditedItem)
        }
        this.exx21Close()
      },
    },
  }
</script>
