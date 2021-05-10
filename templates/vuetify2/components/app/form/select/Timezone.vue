<template>
  <v-autocomplete
    :error-messages="errorMessages"
    :required="true"
    v-model="item"
    :items="items"
    :label="$t('form.select.timezone')"
    @input="handleUpdateField($event)"
  />
</template>
<script>

export default {
  name: 'AppFormSelectTimezone',
  data () {
    return {
      items: []
    }
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    errorMessages: {
      type: [String, Array]
    }
  },
  computed: {
    // eslint-disable-next-line
    item: {
      get () {
        return this.value
      },
      set (val) {
        return val
      }
    },
    violations () {
      return this.errors || {}
    }
  },
  watch: {},
  created () {
    this.items = this.$moment.tz.names().filter(it => {
      const ar = it.split('/')
      if (ar.length === 1) return false
      if (ar[0].toLowerCase() === 'etc') return false
      return true
    }).map(it => {
      return { value: it, text: it }
    })
  },
  methods: {
    isInvalid (key) {
      if (!Object.keys(this.violations).length) {
        return
      }
      return !(Object.keys(this.violations).length > 0 && this.violations[key])
    },
    handleUpdateField (value) {
      this.$emit('input', value)
    }
  }
}
</script>
