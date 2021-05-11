<template>
  <v-input :error-messages="errorMessages">
    <vue-tel-input
      :inputOptions="{
        id: `tel_${Math.floor(Date.now())}`,
        placeholder: placeholder
      }"
      :label="label"
      autocomplete="off"
      :preferredCountries="preferredCountries"
      @input="onInputTel"
      :value="val"
    ></vue-tel-input>
  </v-input>
</template>
<script>
import { VueTelInput } from 'vue-tel-input'
import 'vue-tel-input/dist/vue-tel-input.css'
export default {
  name: 'AppFormInputTel',
  data () {
    return {
    }
  },
  props: {
    value: {
      type: [String, Object]
    },
    preferredCountries: {
      type: Array
    },
    disabled: {
      type: Boolean,
      default: false
    },
    disabledFetchingCountry: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String
    },
    label: {
      type: String
    },
    errorMessages: {
      type: [String, Array]
    }
  },
  components: {
    VueTelInput
  },
  computed: {
    val () {
      return typeof (this.value) === 'string' ? this.value : ''
    }
  },
  methods: {
    onInputTel (num, val) {
      if (val.valid) {
        this.$emit('input', val.number)
      }
    }
  }
}
</script>
<style scoped>
.vue-tel-input {
  width: inherit
}
</style>
