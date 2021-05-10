<template>
  <v-overlay :value="overlay.show">
    <v-progress-circular indeterminate size="110"
      >\{{ overlay.text }}</v-progress-circular
    >
  </v-overlay>
</template>

<script>
import { get } from 'vuex-pathify'

export default {
  name: 'AppOverlay',
  computed: {
    overlay: get('notify/create/overlay')
  }
}
</script>
