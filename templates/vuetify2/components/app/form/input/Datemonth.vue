<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :return-value.sync="date"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="auto"
  >
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
      v-model="date"
      type="month"
      no-title
      scrollable
      :min="min"
      :max="max"
    >
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
  name: 'AppFormInputDatemonth',
  data: function () {
    return {
      menu: false,
      tmp_datemonth: null,
      int_datemonth: null
    }
  },
  props: {
    value: {
      type: [String, Date],
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
    locale: {
      type: String,
      default: 'fr-fr'
    },
    errorMessages: {
      type: [String, Array]
    }
  },
  computed: {
    // eslint-disable-next-line
    date: {
      get () {
        const _d = this.tmp_datemonth ? this.$moment(this.tmp_datemonth) : this.$moment()
        return _d.format('YYYY-MM')
      },
      set (val) {
        this.tmp_datemonth = this.$moment(`${ val }`).format()
        return val
      }
    },
    formatDate () {
      return this.value ? this.$moment(this.value).format('MM/YYYY') : this.$moment().format('MM/YYYY')
    }
  },
  methods: {
    cleared () {
      this.$emit('cleared', true)
    },
    save () {
      this.menu = false
      this.$emit('input', this.tmp_datemonth)
    },
    cancel () {
      this.menu = false
    }
  }
}
</script>
