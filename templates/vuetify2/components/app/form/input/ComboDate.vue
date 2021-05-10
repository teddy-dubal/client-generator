<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="auto"
  >
    <!-- :return-value.sync="date" -->
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        :disabled="disabled"
        :value="formatDate"
        :label="label"
        prepend-icon="fa-calendar-alt"
        :error-messages="errorMessages"
        @click:clear="cleared"
        readonly
        :clearable="clearable"
        :locale="locale"
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      v-show="month"
      v-model="dateM"
      type="month"
      no-title
      scrollable
      :range="rangeMonth"
      :min="min_date_prop"
      :max="max_date_prop"
    >
      <v-btn text color="default" @click="toggle()">
        \{{ $t('common.form.datemonth.dates') }}
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="menu = false">
        \{{ $t('common.form.datemonth.cancel') }}
      </v-btn>
      <v-btn text color="primary" @click="save">
        \{{ $t('common.form.datemonth.validate') }}
      </v-btn>
    </v-date-picker>
    <v-date-picker
      v-show="!month"
      v-model="dateD"
      type="date"
      no-title
      scrollable
      :range="rangeDate"
      :min="min_date_prop"
      :max="max_date_prop"
    >
      <v-btn text color="default" @click="toggle()">
        \{{ $t('common.form.datemonth.month') }}
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="menu = false">
        \{{ $t('common.form.datemonth.cancel') }}
      </v-btn>
      <v-btn text color="primary" @click="save">
        \{{ $t('common.form.datemonth.validate') }}
      </v-btn>
    </v-date-picker>
  </v-menu>
</template>
<script>
export default {
  name: 'AppFormInputComboDate',
  props: {
    value: {
      type: [String, Date, Array],
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: true
    },
    clearable: {
      type: Boolean,
      default: false
    },
    label: {
      type: String
    },
    min: {
      type: String
    },
    max: {
      type: String
    },
    rangeMonth: {
      type: Boolean,
      default: false
    },
    rangeDate: {
      type: Boolean,
      default: false
    },
    locale: {
      type: String,
      default: 'fr-fr'
    },
    errorMessages: {
      type: [String, Array]
    }
  },
  data: function () {
    return {
      menu: false,
      month: true,
      dateD: null,
      dateM: null,
      tmp_datemonth: null,
      max_date_prop: this.max,
      min_date_prop: this.min,
      max_month_prop: this.max ? this.$moment(this.max).format('YYYY-MM') : null,
      min_month_prop: this.min ? this.$moment(this.min).format('YYYY-MM') : null
    }
  },
  computed: {
    // eslint-disable-next-line
    date () {
      return this.month ? this.dateM : this.dateD
    },
    formatDate () {
      if (!this.value) {
        return this.$moment().format('MM/YYYY')
      }
      if (this.month) {
        if (this.rangeMonth && Array.isArray(this.value)) {
          return this.$t('common.widget.month.range.format', { v1: this.$moment(this.value[0]).format('MM/YYYY'), v2: this.$moment(this.value[1]).format('MM/YYYY') })
        }
        return Array.isArray(this.value) ? this.$moment(this.value[0]).format('MM/YYYY') : this.$moment(this.value).format('MM/YYYY')
      }
      if (this.rangeDate && Array.isArray(this.value)) {
        return this.$t('common.widget.date.range.format', { v1: this.$moment(this.value[0]).format('DD/MM/YYYY'), v2: this.$moment(this.value[1]).format('DD/MM/YYYY') })
      }
      return this.$moment(this.value).format('MM/YYYY')
    }
  },
  methods: {
    toggle () {
      this.dateD = null
      this.dateM = null
      this.month = !this.month
    },
    cleared () {
      this.$emit('cleared', true)
    },
    save () {
      this.menu = false
      if (this.month) {
        this.$emit('input', this.dateM)
      } else {
        this.$emit('input', this.dateD)
      }
    },
    cancel () {
      this.menu = false
    }
  }
}
</script>
