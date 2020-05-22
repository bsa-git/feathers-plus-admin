<template>
  <div>
    <!--=== Page Header ===-->
    <app-page-header
      :page-title="description"
    ></app-page-header>

    <!--=== Description ===-->
    <blockquote class="blockquote line-left"><em>The <kbd>v-date-picker</kbd> is stand-alone component that can be
      utilized
      in many existing Vuetify components. It offers the user a visual representation for selecting date/month.</em>
    </blockquote>
    <br/>

    <!--=== Date pickers - Colors ===-->
    <div class="title">Date pickers - Colors (Exx.1)</div>
    <div class="subtitle-1">Date picker colors can be set using the <kbd>color</kbd> and <kbd>header-color</kbd> props.
      If <kbd>header-color</kbd> prop is not provided header will use the <kbd>color</kbd> prop value.
    </div>
    <br/>
    <flex-box-cols>
      <template v-slot:col1>
        <v-date-picker
          v-model="exx1Picker"
          :locale="config.locale"
          color="pink lighten-3"
          header-color="pink"
        ></v-date-picker>
      </template>
      <template v-slot:col2>
        <v-date-picker
          v-model="exx1Picker2"
          :locale="config.locale"
          color="purple"
        ></v-date-picker>
      </template>
    </flex-box-cols>
    <v-divider class="my-5"></v-divider>

    <!--=== Date pickers - Allowed dates ===-->
    <div class="title">Date pickers - Allowed dates (Exx.2)</div>
    <div>You can specify allowed dates using arrays, objects, and functions.</div>
    <br/>
    <row-box>
      <v-date-picker
        v-model="exx2Picker"
        color="primary"
        :allowed-dates="exx2AllowedDates"
        class="mt-4"
        min="2016-06-15"
        max="2018-03-20"
        :locale="config.locale"
      ></v-date-picker>
    </row-box>
    <v-divider class="my-5"></v-divider>

    <!--=== Date pickers - Setting picker width ===-->
    <div class="title">Date pickers - Setting picker width (Exx.3)</div>
    <div>You can specify allowed the picker's width or make it full width.</div>
    <br/>
    <flex-box-cols
      :md="5"
      :vcols="1"
    >
      <template v-slot:col1>
        <v-date-picker
          v-model="exx3Date"
          :locale="config.locale"
          color="primary"
          width="290"
          class="mt-4"
        ></v-date-picker>
        <v-date-picker
          v-model="exx3Date"
          :locale="config.locale"
          color="primary"
          full-width
          :landscape="$vuetify.breakpoint.smAndUp"
          class="ma-4"
        ></v-date-picker>
      </template>
    </flex-box-cols>

    <v-divider class="my-5"></v-divider>

    <!--=== Date pickers - react to displayed month/year change ===-->
    <div class="title">Date pickers - react to displayed month/year change (Exx.4)</div>
    <div>You can watch the <kbd>pickerDate</kbd> which is the displayed month/year (depending on the picker type and
      active view) to perform some action when it changes.
    </div>
    <br/>
    <flex-box-card :md="6" class-value="px-6">
      <v-row justify="center">
        <v-col cols="12" sm="6" class="my-2 px-1">
          <v-date-picker
            ref="exx4Picker"
            :locale="config.locale"
            color="primary"
            v-model="exx4Date"
            :picker-date.sync="exx4PickerDate"
          ></v-date-picker>
        </v-col>
        <v-col cols="12" sm="6" class="my-2 px-1">
          <div class="title">Month news ({{ exx4PickerDate || 'change month...' }})</div>
          <div class="subheading">Change month to see other news</div>
          <ul class="ma-4">
            <li v-for="note in exx4Notes" :key="note">{{ note }}</li>
          </ul>
        </v-col>
      </v-row>
    </flex-box-card>
    <v-divider class="my-5"></v-divider>

    <!--=== Date pickers - Internationalization ===-->
    <div class="title">Date pickers - Internationalization (Exx.5)</div>
    <div>The date picker supports internationalization through the JavaScript Date object. Specify a BCP 47
      language tag using the <kbd>locale</kbd> prop, and then set the first day of the week with the
      <kbd>first-day-of-week</kbd> prop.
    </div>
    <br/>
    <flex-box-cols>
      <template v-slot:col1>
        <v-date-picker
          v-model="exx5Picker"
          color="primary"
          :first-day-of-week="0"
          locale="zh-cn"
        ></v-date-picker>
      </template>
      <template v-slot:col2>
        <v-date-picker
          v-model="exx5Picker"
          color="primary"
          :first-day-of-week="1"
          locale="sv-se"
        ></v-date-picker>
      </template>
    </flex-box-cols>
    <v-divider class="my-5"></v-divider>

    <!--=== Date pickers - icons ===-->
    <div class="title">Date pickers - icons (Exx.6)</div>
    <div>You can override the default icons used in the picker.</div>
    <br/>
    <row-box>
      <v-date-picker
        v-model="exx6Picker"
        color="primary"
        :locale="config.locale"
        year-icon="mdi-calendar-blank"
        prev-icon="mdi-skip-previous"
        next-icon="mdi-skip-next"
      ></v-date-picker>
    </row-box>
    <v-divider class="my-5"></v-divider>

    <!--=== Date pickers - read only ===-->
    <div class="title">Date pickers - read only (Exx.7)</div>
    <div>Selecting new date could be disabled by adding <kbd>readonly</kbd> prop.</div>
    <br/>
    <row-box>
      <v-date-picker
        v-model="exx7Date"
        color="primary"
        :locale="config.locale"
        readonly
      ></v-date-picker>
    </row-box>
    <v-divider class="my-5"></v-divider>

    <!--=== Date pickers - current date indicator ===-->
    <div class="title">Date pickers - current date indicator (Exx.8)</div>
    <div>By default the current date is displayed using outlined button - <kbd>show-current</kbd> prop allows you to
      remove
      the border or select different date to be displayed as the current one.
    </div>
    <br/>
    <flex-box-cols>
      <template v-slot:col1>
        <v-date-picker
          v-model="exx8Date1"
          :locale="config.locale"
          :show-current="false"
          color="primary"
        ></v-date-picker>
      </template>
      <template v-slot:col2>
        <v-date-picker
          v-model="exx8Date2"
          :locale="config.locale"
          show-current="2013-07-13"
          color="primary"
        ></v-date-picker>
      </template>
    </flex-box-cols>
    <v-divider class="my-5"></v-divider>

    <!--=== Date pickers - In dialog and menu ===-->
    <div class="title">Date pickers - In dialog and menu (Exx.9)</div>
    <div>When integrating a picker into a <kbd>v-text-field</kbd>, it is recommended to use the <kbd>readonly</kbd>
      prop. This will prevent
      mobile keyboards from triggering. To save vertical space, you can also hide the picker title.

      Pickers expose a slot that allow you to hook into save and cancel functionality. This will maintain an old value
      which can be replaced if the user cancels.
    </div>
    <br/>
    <flex-box-card :md="6">
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-menu
            ref="exx9Menu"
            v-model="exx9Menu"
            :close-on-content-click="false"
            :return-value.sync="exx9Date"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="exx9Date"
                label="Picker in menu"
                prepend-icon="mdi-calendar"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="exx9Date" :locale="config.locale" color="primary" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="exx9Menu = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.exx9Menu.save(exx9Date)">OK</v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="12" sm="6" md="4">
          <v-dialog
            ref="exx9Dialog"
            v-model="exx9Modal"
            :return-value.sync="exx9Date"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="exx9Date"
                label="Picker in dialog"
                prepend-icon="mdi-calendar"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="exx9Date" :locale="config.locale" color="primary" scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="exx9Modal = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.exx9Dialog.save(exx9Date)">OK</v-btn>
            </v-date-picker>
          </v-dialog>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-menu
            v-model="exx9Menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="exx9Date"
                label="Picker without buttons"
                prepend-icon="mdi-calendar"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="exx9Date" :locale="config.locale" color="primary"
                           @input="exx9Menu2 = false"></v-date-picker>
          </v-menu>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
    </flex-box-card>
    <v-divider class="my-5"></v-divider>

    <!--=== Date pickers - formatting date ===-->
    <div class="title">Date pickers - formatting date (Exx.10)</div>
    <div>If you need to display date in the custom format (different than YYYY-MM-DD) you need to use the formatting
      function.
    </div>
    <br/>
    <flex-box-card :md="6">
      <v-row>
        <v-col cols="12" lg="6">
          <v-menu
            ref="exx10Menu1"
            v-model="exx10Menu1"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="exx10DateFormatted"
                label="Date"
                hint="MM/DD/YYYY format"
                persistent-hint
                prepend-icon="mdi-calendar"
                @blur="exx10Date = exx10ParseDate(exx10DateFormatted)"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="exx10Date" :locale="config.locale" no-title color="primary"
                           @input="exx10Menu1 = false"></v-date-picker>
          </v-menu>
          <p>Date in ISO format: <strong>{{ exx10Date }}</strong></p>
        </v-col>
        <v-col cols="12" lg="6">
          <v-menu
            v-model="exx10Menu2"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="exx10ComputedDateFormatted"
                label="Date (read only text field)"
                hint="MM/DD/YYYY format"
                persistent-hint
                prepend-icon="mdi-calendar"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="exx10Date" :locale="config.locale" no-title color="primary"
                           @input="exx10Menu2 = false"></v-date-picker>
          </v-menu>
          <p>Date in ISO format: <strong>{{ exx10Date }}</strong></p>
        </v-col>
      </v-row>
    </flex-box-card>
    <v-divider class="my-5"></v-divider>

    <!--=== Date pickers - formatting date using external libs ===-->
    <div class="title">Formatting dates is possible also with external libs such as Moment.js or date-fns (Exx.11)</div>
    <div>If you need to display date in the custom format (different than YYYY-MM-DD) you need to use the formatting
      function.
    </div>
    <br/>
    <flex-box-card :md="6">
      <v-row>
        <v-col cols="12" lg="6">
          <v-menu
            v-model="exx11Menu1"
            :close-on-content-click="false"
            max-width="290"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                :value="exx11ComputedDateFormattedMomentjs"
                clearable
                label="Formatted with Moment.js"
                readonly
                v-on="on"
                @click:clear="exx11Date = null"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="exx11Date"
              :locale="config.locale"
              color="primary"
              @change="exx11Menu1 = false"
            ></v-date-picker>
          </v-menu>
        </v-col>

        <v-col cols="12" lg="6">
          <v-menu
            v-model="exx11Menu2"
            :close-on-content-click="false"
            max-width="290"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                :value="exx11ComputedDateFormattedMomentjs"
                clearable
                label="Formatted with Moment.js"
                readonly
                v-on="on"
                @click:clear="exx11Date = null"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="exx11Date"
              :locale="config.locale"
              color="primary"
              @change="exx11Menu2 = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
    </flex-box-card>
    <v-divider class="my-5"></v-divider>

    <!--=== Date pickers - Multiple ===-->
    <div class="title">Date pickers - Multiple (Exx.12)</div>
    <div>Date picker can now select multiple dates with the <kbd>multiple</kbd> prop. If using <kbd>multiple</kbd> then
      date picker expects
      its model to be an array.
    </div>
    <br/>
    <flex-box-card :md="6" class-value="px-6">
      <v-row>
        <v-col cols="12" sm="6">
          <v-date-picker
            v-model="exx12Dates"
            color="primary"
            :locale="config.locale"
            multiple
          ></v-date-picker>
        </v-col>
        <v-col cols="12" sm="6">
          <v-menu
            ref="exx12Menu"
            v-model="exx12Menu"
            :close-on-content-click="false"
            :return-value.sync="exx12Dates"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-combobox
                v-model="exx12Dates"
                multiple
                chips
                small-chips
                label="Multiple picker in menu"
                prepend-icon="mdi-calendar"
                readonly
                v-on="on"
              ></v-combobox>
            </template>
            <v-date-picker v-model="exx12Dates" :locale="config.locale" color="primary" multiple no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="exx12Menu = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.exx12Menu.save(exx12Dates)">OK</v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
    </flex-box-card>
    <v-divider class="my-5"></v-divider>

    <!--=== Date pickers - Range ===-->
    <div class="title">Date pickers - Range (Exx.13)</div>
    <div>Date picker can select date range with the <kbd>range</kbd> prop. When using <kbd>range</kbd> prop date picker
      expects its
      model to be an array of length 2 or empty.
    </div>
    <br/>
    <flex-box-card :md="6" class-value="px-6">
      <v-row>
        <v-col cols="12" sm="6">
          <v-date-picker v-model="exx13Dates" :locale="config.locale" color="primary" range></v-date-picker>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field v-model="exx13DateRangeText" label="Date range" prepend-icon="mdi-calendar"
                        readonly></v-text-field>
          model: {{ exx13Dates }}
        </v-col>
      </v-row>
    </flex-box-card>
    <v-divider class="my-5"></v-divider>

    <!--=== Date pickers - birthday picker ===-->
    <div class="title">Date pickers - birthday picker (Exx.14)</div>
    <div>Starting with year picker by default, resticting dates range and closing the picker menu after selecting
      the day make the perfect birthday picker.
    </div>
    <br/>
    <flex-box-card :md="4">
      <v-menu
        ref="exx14Menu"
        v-model="exx14Menu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="exx14Date"
            label="Birthday date"
            prepend-icon="mdi-calendar"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          ref="exx14Picker"
          v-model="exx14Date"
          :locale="config.locale"
          color="primary"
          :max="new Date().toISOString().substr(0, 10)"
          min="1950-01-01"
          @change="exx14SaveBirthday"
        ></v-date-picker>
      </v-menu>
    </flex-box-card>
    <v-divider class="my-5"></v-divider>

    <!--=== Date pickers - Events ===-->
    <div class="title">Date pickers - Events (Exx.15)</div>
    <div>You can specify events using arrays, objects or functions. To change the default color of the event
      use <kbd>event-color</kbd> prop. Your <kbd>events</kbd> function or object can return an array of colors (material
      or css)
      in case you want to display multiple event indicators.
    </div>
    <br/>
    <flex-box-cols>
      <template v-slot:col1>
        <div>
          <div class="subheading">Defined by array</div>
          <v-date-picker
            v-model="exx15Date1"
            :locale="config.locale"
            color="primary"
            :events="exx15ArrayEvents"
            event-color="green lighten-1"
          ></v-date-picker>
        </div>
      </template>
      <template v-slot:col2>
        <div>
          <div class="subheading">Defined by function</div>
          <v-date-picker
            v-model="exx15Date2"
            :locale="config.locale"
            color="primary"
            :event-color="date => date[9] % 2 ? 'red' : 'yellow'"
            :events="exx15FunctionEvents"
          ></v-date-picker>
        </div>
      </template>
    </flex-box-cols>
    <v-divider class="my-5"></v-divider>

    <!--=== Month pickers - In dialog and menu ===-->
    <div class="title">Month pickers - In dialog and menu (Exx.16)</div>
    <div>When integrating a picker into a <kbd>v-text-field</kbd>, it is recommended to use the <kbd>readonly</kbd>
      prop.
      This will prevent mobile keyboards from triggering. To save vertical space, you can also hide the picker title.

      Pickers expose a slot that allow you to hook into save and cancel functionality. This will maintain an old
      value which can be replaced if the user cancels.
    </div>
    <br/>
    <flex-box-card :md="6">
      <v-row>
        <v-col cols="11" sm="5">
          <v-menu
            ref="exx16Menu"
            v-model="exx16Menu"
            :locale="config.locale"
            :close-on-content-click="false"
            :return-value.sync="exx16Date"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="exx16Date"
                label="Picker in menu"
                prepend-icon="mdi-calendar"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="exx16Date"
              :locale="config.locale"
              color="primary"
              type="month"
              no-title
              scrollable
            >
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="exx16Menu = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.exx16Menu.save(exx16Date)">OK</v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="11" sm="5">
          <v-dialog
            ref="exx16Dialog"
            v-model="exx16Modal"
            :return-value.sync="exx16Date"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="exx16Date"
                label="Picker in dialog"
                prepend-icon="mdi-calendar"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="exx16Date" :locale="config.locale" color="primary" type="month" scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="exx16Modal = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.exx16Dialog.save(exx16Date)">OK</v-btn>
            </v-date-picker>
          </v-dialog>
        </v-col>
      </v-row>
    </flex-box-card>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import moment from 'moment'
  import AppPageHeader from '~/components/app/layout/AppPageHeader';
  import FlexBoxCard from '~/components/widgets/containers/flex-box-card';
  import RowBox from '~/components/widgets/containers/row-box';
  import FlexBoxCols from '~/components/widgets/containers/flex-box-cols';

  export default {
    components: {
      AppPageHeader,
      FlexBoxCard,
      RowBox,
      FlexBoxCols
    },
    data(vm) {
      return {
        title: this.$t('date_picker.title'),
        description: this.$t('date_picker.description'),
        exx1Picker: new Date().toISOString().substr(0, 10),
        exx1Picker2: new Date().toISOString().substr(0, 10),
        exx2Picker: '2018-03-02',
        exx3Date: new Date().toISOString().substr(0, 10),
        exx4Date: new Date().toISOString().substr(0, 10),
        exx4PickerDate: null,
        exx4Notes: [],
        exx4AllNotes: [
          'President met with prime minister',
          'New power plant opened',
          'Rocket launch announced',
          'Global warming discussion cancelled',
          'Company changed its location',
        ],
        exx5Picker: new Date().toISOString().substr(0, 10),
        exx6Picker: new Date().toISOString().substr(0, 10),
        exx7Date: new Date().toISOString().substr(0, 10),
        exx8Date1: new Date().toISOString().substr(0, 10),
        exx8Date2: '2013-07-29',
        exx9Date: new Date().toISOString().substr(0, 10),
        exx9Menu: false,
        exx9Modal: false,
        exx9Menu2: false,
        exx10Date: new Date().toISOString().substr(0, 10),
        exx10DateFormatted: vm.exx10FormatDate(new Date().toISOString().substr(0, 10)),
        exx10Menu1: false,
        exx10Menu2: false,
        exx11Date: new Date().toISOString().substr(0, 10),
        exx11Menu1: false,
        exx11Menu2: false,
        exx12Dates: ['2018-09-15', '2018-09-20'],
        exx12Menu: false,
        exx13Dates: ['2019-09-10', '2019-09-20'],
        exx14Date: null,
        exx14Menu: false,
        exx15ArrayEvents: null,
        exx15Date1: new Date().toISOString().substr(0, 10),
        exx15Date2: new Date().toISOString().substr(0, 10),
        exx16Date: new Date().toISOString().substr(0, 7),
        exx16Menu: false,
        exx16Modal: false,
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
      this.exx15ArrayEvents = [...Array(6)].map(() => {
        const day = Math.floor(Math.random() * 30);
        const d = new Date();
        d.setDate(day);
        return d.toISOString().substr(0, 10)
      })
    },
    watch: {
      exx4PickerDate(val) {
        this.exx4Notes = [
          this.exx4AllNotes[Math.floor(Math.random() * 5)],
          this.exx4AllNotes[Math.floor(Math.random() * 5)],
          this.exx4AllNotes[Math.floor(Math.random() * 5)],
        ].filter((value, index, self) => self.indexOf(value) === index)
      },
      exx10Date(val) {
        this.exx10DateFormatted = this.exx10FormatDate(this.date)
      },
      exx14Menu(val) {
        val && setTimeout(() => (this.$refs.exx14Picker.activePicker = 'YEAR'))
      },
    },
    computed: {
      ...mapGetters({
        theme: 'getTheme',
        config: 'getConfig'
      }),
      exx10ComputedDateFormatted() {
        return this.exx10FormatDate(this.exx10Date)
      },
      exx11ComputedDateFormattedMomentjs() {
        return this.exx11Date ? moment(this.exx11Date).format('dddd, MMMM Do YYYY') : ''
      },
      exx13DateRangeText() {
        return this.exx13Dates.join(' ~ ')
      },
    },
    methods: {
      exx2AllowedDates: val => parseInt(val.split('-')[2], 10) % 2 === 0,
      exx10FormatDate(date) {
        if (!date) return null;

        const [year, month, day] = date.split('-');
        return `${month}/${day}/${year}`
      },
      exx10ParseDate(date) {
        if (!date) return null;

        const [month, day, year] = date.split('/');
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },
      exx14SaveBirthday(date) {
        this.$refs.exx14Menu.save(date)
      },
      exx15FunctionEvents(date) {
        const [, , day] = date.split('-');
        if ([12, 17, 28].includes(parseInt(day, 10))) return true;
        if ([1, 19, 22].includes(parseInt(day, 10))) return ['red', '#00f'];
        return false
      },
    },
  }
</script>
