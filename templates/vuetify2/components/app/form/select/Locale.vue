<template>
  <v-autocomplete
    :error-messages="errorMessages"
    :required="true"
    v-model="item"
    :items="items"
    :label="$t('form.select.locale')"
    @input="handleUpdateField($event)"
    @change="handleChangeField($event)"
  />
</template>
<script>
import { get, call } from 'vuex-pathify'

export default {
  name: 'AppFormSelectLocale',

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
    ...get({
      error: 'app/setting/error',
      isLoading: 'app/setting/isLoading',
      retrieved: 'app/setting/retrieved'
    }),
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
  watch: {
    retrieved (it) {
      this.items = Object.keys(it.locales).map(key => {
        return { value: key, text: it.locales[key] }
      })
    }
  },
  created () {
    this.retrieve(['locales'])
  },
  methods: {
    ...call(['app/setting/retrieve']),
    isInvalid (key) {
      if (!Object.keys(this.violations).length) {
        return
      }
      return !Object.keys(this.violations).length > 0 && this.violations[key]
    },
    handleUpdateField (value) {
      this.$emit('input', value)
    },
    handleChangeField (value) {
      this.$emit('change', value)
    }
  }
}
</script>
