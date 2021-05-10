<template>
  <v-text-field
    autocomplete="current-password"
    :placeholder="placeholder"
    :label="label"
    :error-messages="errorMessages"
    :append-icon="internalValue ? 'fa-eye' : 'fa-eye-slash'"
    @click:append="() => (internalValue = !internalValue)"
    :type="internalValue ? 'password' : 'text'"
    @input="onInputVal"
    :value="val"
  ></v-text-field>
</template>
<script>
export default {
  name: 'AppFormInputPassword',
  data () {
    return {
      internalValue: true
    }
  },
  props: {
    value: {
      type: [String, Object]
    },
    vvName: {
      type: String
    },
    vvAs: {
      type: String
    },
    vvVal: {
      type: String
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
  computed: {
    val () {
      return typeof (this.value) === 'string' ? this.value : ''
    }
  },
  methods: {
    onInputVal (val) {
      this.$emit('input', val)
    }
  }
}
</script>
