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
    <div class="title">Date pickers - Colors</div>
    <div class="subtitle-1">Date picker colors can be set using the <kbd>color</kbd> and <kbd>header-color</kbd> props.
      If <kbd>header-color</kbd> prop is not provided header will use the <kbd>color</kbd> prop value.
    </div>
    <br/>
    <v-row justify="center">
      <v-col
        cols="12"
        md="8"
      >
        <v-card
          color="secondary"
          :dark="theme.dark"
        >
          <v-card-text>
            <v-row justify="space-around">
              <v-date-picker
                v-model="picker"
                :locale="config.locale"
                color="pink lighten-3"
                header-color="pink"
              ></v-date-picker>
              <v-date-picker
                v-model="picker2"
                :locale="config.locale"
                color="purple"
              ></v-date-picker>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!--=== Date pickers - Allowed dates ===-->
    <div class="title">Date pickers - Allowed dates</div>
    <div>You can specify allowed dates using arrays, objects, and functions.</div>
    <br/>
    <v-row justify="center">
      <v-col
        cols="12"
        md="4"
      >
        <v-card
          color="secondary"
          :dark="theme.dark"
        >
          <v-card-text>
            <v-row justify="center">
              <v-date-picker
                v-model="picker3"
                color="primary"
                :allowed-dates="allowedDates"
                class="mt-4"
                min="2016-06-15"
                max="2018-03-20"
                :locale="config.locale"
              ></v-date-picker>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!--=== Date pickers - Setting picker width ===-->
    <div class="title">Date pickers - Setting picker width</div>
    <div>You can specify allowed the picker's width or make it full width.</div>
    <br/>
    <v-row justify="center">
      <v-col
        cols="12"
        md="8"
      >
        <v-card
          color="secondary"
          :dark="theme.dark"
        >
          <v-card-text>
            <v-row align="center" justify="center">
              <v-date-picker
                v-model="date"
                :locale="config.locale"
                color="primary"
                width="290"
                class="mt-4"
              ></v-date-picker>
              <v-date-picker
                v-model="date"
                :locale="config.locale"
                color="primary"
                full-width
                :landscape="$vuetify.breakpoint.smAndUp"
                class="ma-4"
              ></v-date-picker>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>


    <!--=== Date pickers - react to displayed month/year change ===-->
    <div class="title">Date pickers - react to displayed month/year change</div>
    <div>You can watch the <kbd>pickerDate</kbd> which is the displayed month/year (depending on the picker type and
      active view) to perform some action when it changes.
    </div>
    <br/>
    <v-row justify="center">
      <v-col
        cols="12"
        md="6"
      >
        <v-card
          color="secondary"
          :dark="theme.dark"
        >
          <v-card-text>
            <v-row justify="center">
              <v-col cols="12" sm="6" class="my-2 px-1">
                <v-date-picker
                  ref="picker"
                  :locale="config.locale"
                  color="primary"
                  v-model="date"
                  :picker-date.sync="pickerDate"
                  full-width
                ></v-date-picker>
              </v-col>
              <v-col cols="12" sm="6" class="my-2 px-1">
                <div class="title">Month news ({{ pickerDate || 'change month...' }})</div>
                <div class="subheading">Change month to see other news</div>
                <ul class="ma-4">
                  <li v-for="note in notes" :key="note">{{ note }}</li>
                </ul>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!--=== Date pickers - Internationalization ===-->
    <div class="title">Date pickers - Internationalization</div>
    <div>The date picker supports internationalization through the JavaScript Date object. Specify a BCP 47
      language tag using the <kbd>locale</kbd> prop, and then set the first day of the week with the
      <kbd>first-day-of-week</kbd> prop.
    </div>
    <br/>
    <v-row justify="center">
      <v-col
        cols="12"
        md="6"
      >
        <v-card
          color="secondary"
          :dark="theme.dark"
        >
          <v-card-text>
            <v-row justify="space-around">
              <v-date-picker
                v-model="date"
                color="primary"
                :first-day-of-week="0"
                locale="zh-cn"
              ></v-date-picker>
              <v-date-picker
                v-model="date"
                color="primary"
                :first-day-of-week="1"
                locale="sv-se"
              ></v-date-picker>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!--=== Date pickers - icons ===-->
    <div class="title">Date pickers - icons</div>
    <div>You can override the default icons used in the picker.</div>
    <br/>
    <v-row justify="center">
      <v-col
        cols="12"
        md="4"
      >
        <v-card
          color="secondary"
          :dark="theme.dark"
        >
          <v-card-text>
            <v-row justify="center">
              <v-date-picker
                v-model="picker"
                color="primary"
                :locale="config.locale"
                year-icon="mdi-calendar-blank"
                prev-icon="mdi-skip-previous"
                next-icon="mdi-skip-next"
              ></v-date-picker>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!--=== Date pickers - read only ===-->
    <div class="title">Date pickers - read only</div>
    <div>Selecting new date could be disabled by adding <kbd>readonly</kbd> prop.</div>
    <br/>
    <v-row justify="center">
      <v-col
        cols="12"
        md="4"
      >
        <v-card
          color="secondary"
          :dark="theme.dark"
        >
          <v-card-text>
            <v-row justify="center">
              <v-date-picker v-model="date" color="primary" :locale="config.locale" readonly></v-date-picker>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!--=== Date pickers - current date indicator ===-->
    <div class="title">Date pickers - current date indicator</div>
    <div>By default the current date is displayed using outlined button - <kbd>show-current</kbd> prop allows you to remove
      the border or select different date to be displayed as the current one.</div>
    <br/>
    <v-row justify="center">
      <v-col
        cols="12"
        md="6"
      >
        <v-card
          color="secondary"
          :dark="theme.dark"
        >
          <v-card-text>
            <v-row justify="space-around">
              <v-date-picker v-model="date1" :locale="config.locale" :show-current="false" color="primary"></v-date-picker>
              <v-date-picker v-model="date2" :locale="config.locale" show-current="2013-07-13" color="primary"></v-date-picker>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!--=== Date pickers - In dialog and menu ===-->
    <div class="title">Date pickers - In dialog and menu</div>
    <div>When integrating a picker into a <kbd>v-text-field</kbd>, it is recommended to use the <kbd>readonly</kbd> prop. This will prevent
      mobile keyboards from triggering. To save vertical space, you can also hide the picker title.

      Pickers expose a slot that allow you to hook into save and cancel functionality. This will maintain an old value which can be replaced if the user cancels.</div>
    <br/>
    <v-row justify="center">
      <v-col
        cols="12"
        md="6"
      >
        <v-card
          color="secondary"
          :dark="theme.dark"
        >
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="date"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="date"
                      label="Picker in menu"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date" :locale="config.locale" color="primary" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-spacer></v-spacer>
              <v-col cols="12" sm="6" md="4">
                <v-dialog
                  ref="dialog"
                  v-model="modal"
                  :return-value.sync="date"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="date"
                      label="Picker in dialog"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date" :locale="config.locale" color="primary" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-menu
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="date"
                      label="Picker without buttons"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date" :locale="config.locale" color="primary" @input="menu2 = false"></v-date-picker>
                </v-menu>
              </v-col>
              <v-spacer></v-spacer>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!--=== Date pickers - formatting date ===-->
    <div class="title">Date pickers - formatting date</div>
    <div>If you need to display date in the custom format (different than YYYY-MM-DD) you need to use the formatting function.</div>
    <br/>
    <v-row justify="center">
      <v-col
        cols="12"
        md="6"
      >
        <v-card
          color="secondary"
          :dark="theme.dark"
        >
          <v-card-text>
            <v-row>
              <v-col cols="12" lg="6">
                <v-menu
                  ref="menu1"
                  v-model="menu1"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="dateFormatted"
                      label="Date"
                      hint="MM/DD/YYYY format"
                      persistent-hint
                      prepend-icon="mdi-calendar"
                      @blur="date = parseDate(dateFormatted)"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date" :locale="config.locale" no-title color="primary" @input="menu1 = false"></v-date-picker>
                </v-menu>
                <p>Date in ISO format: <strong>{{ date }}</strong></p>
              </v-col>
              <v-col cols="12" lg="6">
                <v-menu
                  v-model="menu2"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="computedDateFormatted"
                      label="Date (read only text field)"
                      hint="MM/DD/YYYY format"
                      persistent-hint
                      prepend-icon="mdi-calendar"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date" :locale="config.locale" no-title color="primary" @input="menu2 = false"></v-date-picker>
                </v-menu>
                <p>Date in ISO format: <strong>{{ date }}</strong></p>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!--=== Date pickers - formatting date using external libs ===-->
    <div class="title">Formatting dates is possible also with external libs such as Moment.js or date-fns</div>
    <div>If you need to display date in the custom format (different than YYYY-MM-DD) you need to use the formatting function.</div>
    <br/>
    <v-row justify="center">
      <v-col
        cols="12"
        md="6"
      >
        <v-card
          color="secondary"
          :dark="theme.dark"
        >
          <v-card-text>
            <v-row>
              <v-col cols="12" lg="6">
                <v-menu
                  v-model="menu1"
                  :close-on-content-click="false"
                  max-width="290"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      :value="computedDateFormattedMomentjs"
                      clearable
                      label="Formatted with Moment.js"
                      readonly
                      v-on="on"
                      @click:clear="date = null"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="date"
                    :locale="config.locale"
                    color="primary"
                    @change="menu1 = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="12" lg="6">
                <v-menu
                  v-model="menu2"
                  :close-on-content-click="false"
                  max-width="290"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      :value="computedDateFormattedMomentjs"
                      clearable
                      label="Formatted with Moment.js"
                      readonly
                      v-on="on"
                      @click:clear="date = null"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="date"
                    :locale="config.locale"
                    color="primary"
                    @change="menu2 = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!--=== Date pickers - Multiple ===-->
    <div class="title">Date pickers - Multiple</div>
    <div>Date picker can now select multiple dates with the <kbd>multiple</kbd> prop. If using <kbd>multiple</kbd> then date picker expects
      its model to be an array.</div>
    <br/>
    <v-row justify="center">
      <v-col
        cols="12"
        md="6"
      >
        <v-card
          color="secondary"
          :dark="theme.dark"
        >
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6">
                <v-date-picker
                  v-model="dates"
                  color="primary"
                  multiple
                ></v-date-picker>
              </v-col>
              <v-col cols="12" sm="6">
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="dates"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-combobox
                      v-model="dates"
                      multiple
                      chips
                      small-chips
                      label="Multiple picker in menu"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-on="on"
                    ></v-combobox>
                  </template>
                  <v-date-picker v-model="dates" :locale="config.locale" color="primary" multiple no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(dates)">OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!--=== Date pickers - Range ===-->
    <div class="title">Date pickers - Range</div>
    <div>Date picker can select date range with the <kbd>range</kbd> prop. When using <kbd>range</kbd> prop date picker expects its
      model to be an array of length 2 or empty.</div>
    <br/>
    <v-row justify="center">
      <v-col
        cols="12"
        md="6"
      >
        <v-card
          color="secondary"
          :dark="theme.dark"
        >
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6">
                <v-date-picker v-model="dates" :locale="config.locale" color="primary" range></v-date-picker>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="dateRangeText" label="Date range" prepend-icon="mdi-calendar" readonly></v-text-field>
                model: {{ dates }}
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!--=== Date pickers - birthday picker ===-->
    <div class="title">Date pickers - birthday picker</div>
    <div>Starting with year picker by default, resticting dates range and closing the picker menu after selecting
      the day make the perfect birthday picker.</div>
    <br/>
    <v-row justify="center">
      <v-col
        cols="12"
        md="4"
      >
        <v-card
          color="secondary"
          :dark="theme.dark"
        >
          <v-card-text>
            <v-menu
              ref="menu3"
              v-model="menu3"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="date3"
                  label="Birthday date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                ref="birthdayPicker"
                v-model="date3"
                :locale="config.locale"
                color="primary"
                :max="new Date().toISOString().substr(0, 10)"
                min="1950-01-01"
                @change="saveBirthday"
              ></v-date-picker>
            </v-menu>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!--=== Date pickers - Events ===-->
    <div class="title">Date pickers - Events</div>
    <div>You can specify events using arrays, objects or functions. To change the default color of the event
      use <kbd>event-color</kbd> prop. Your <kbd>events</kbd> function or object can return an array of colors (material or css)
      in case you want to display multiple event indicators.</div>
    <br/>
    <v-row justify="center">
      <v-col
        cols="12"
        md="6"
      >
        <v-card
          color="secondary"
          :dark="theme.dark"
        >
          <v-card-text>
            <v-row justify="space-between">
              <div>
                <div class="subheading">Defined by array</div>
                <v-date-picker
                  v-model="date"
                  :locale="config.locale"
                  color="primary"
                  :events="arrayEvents"
                  event-color="green lighten-1"
                ></v-date-picker>
              </div>
              <div>
                <div class="subheading">Defined by function</div>
                <v-date-picker
                  v-model="date1"
                  :locale="config.locale"
                  color="primary"
                  :event-color="date => date[9] % 2 ? 'red' : 'yellow'"
                  :events="functionEvents"
                ></v-date-picker>
              </div>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!--=== Month pickers - In dialog and menu ===-->
    <div class="title">Month pickers - In dialog and menu</div>
    <div>When integrating a picker into a <kbd>v-text-field</kbd>, it is recommended to use the <kbd>readonly</kbd> prop.
      This will prevent mobile keyboards from triggering. To save vertical space, you can also hide the picker title.

      Pickers expose a slot that allow you to hook into save and cancel functionality. This will maintain an old
      value which can be replaced if the user cancels.</div>
    <br/>
    <v-row justify="center">
      <v-col
        cols="12"
        md="6"
      >
        <v-card
          color="secondary"
          :dark="theme.dark"
        >
          <v-card-text>
            <v-row>
              <v-col cols="11" sm="5">
                <v-menu
                  ref="menu4"
                  v-model="menu4"
                  :locale="config.locale"
                  :close-on-content-click="false"
                  :return-value.sync="date4"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="date4"
                      label="Picker in menu"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="date4"
                    :locale="config.locale"
                    color="primary"
                    type="month"
                    no-title
                    scrollable
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu4 = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.menu4.save(date4)">OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-spacer></v-spacer>
              <v-col cols="11" sm="5">
                <v-dialog
                  ref="dialog"
                  v-model="modal2"
                  :return-value.sync="date4"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="date4"
                      label="Picker in dialog"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date4" :locale="config.locale" color="primary" type="month" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="modal2 = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.dialog.save(date4)">OK</v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import moment from 'moment'
  import AppPageHeader from '~/components/app/layout/AppPageHeader';

  export default {
    components: {
      AppPageHeader,
    },
    data(vm) {
      return {
        title: this.$t('date_picker.title'),
        description: this.$t('date_picker.description'),
        picker: new Date().toISOString().substr(0, 10),
        picker2: new Date().toISOString().substr(0, 10),
        picker3: '2018-03-02',
        date: new Date().toISOString().substr(0, 10),
        date1: new Date().toISOString().substr(0, 10),
        date2: '2013-07-29',
        date3: null,
        date4: new Date().toISOString().substr(0, 7),
        menu: false,
        menu1: false,
        menu2: false,
        menu3: false,
        menu4: false,
        modal: false,
        modal2: false,
        pickerDate: null,
        notes: [],
        allNotes: [
          'President met with prime minister',
          'New power plant opened',
          'Rocket launch announced',
          'Global warming discussion cancelled',
          'Company changed its location',
        ],
        dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
        dates: ['2018-09-15', '2018-09-20'],
        arrayEvents: null,
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
    mounted () {
      this.arrayEvents = [...Array(6)].map(() => {
        const day = Math.floor(Math.random() * 30);
        const d = new Date();
        d.setDate(day);
        return d.toISOString().substr(0, 10)
      })
    },
    watch: {
      pickerDate(val) {
        this.notes = [
          this.allNotes[Math.floor(Math.random() * 5)],
          this.allNotes[Math.floor(Math.random() * 5)],
          this.allNotes[Math.floor(Math.random() * 5)],
        ].filter((value, index, self) => self.indexOf(value) === index)
      },
      date (val) {
        this.dateFormatted = this.formatDate(this.date)
      },
      menu3 (val) {
        val && setTimeout(() => (this.$refs.birthdayPicker.activePicker = 'YEAR'))
      },
    },
    computed: {
      ...mapGetters({
        theme: 'getTheme',
        config: 'getConfig'
      }),
      computedDateFormatted () {
        return this.formatDate(this.date)
      },
      computedDateFormattedMomentjs () {
        return this.date ? moment(this.date).format('dddd, MMMM Do YYYY') : ''
      },
      dateRangeText () {
        return this.dates.join(' ~ ')
      },
    },
    methods: {
      allowedDates: val => parseInt(val.split('-')[2], 10) % 2 === 0,
      formatDate (date) {
        if (!date) return null;

        const [year, month, day] = date.split('-');
        return `${month}/${day}/${year}`
      },
      parseDate (date) {
        if (!date) return null;

        const [month, day, year] = date.split('/');
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },
      saveBirthday (date) {
        this.$refs.menu3.save(date)
      },
      functionEvents (date) {
        const [,, day] = date.split('-');
        if ([12, 17, 28].includes(parseInt(day, 10))) return true;
        if ([1, 19, 22].includes(parseInt(day, 10))) return ['red', '#00f'];
        return false
      },
    },
  }
</script>
