<template>
  <section>
    <v-snackbar
      v-for="(snackbar, index) in snackbars.filter((s) => s.show)"
      :key="snackbar.text + Math.random()"
      class="v-snackbar--material"
      :timeout="snackbar.timeout || 6000"
      :color="snackbar.color"
      v-model="snackbar.show"
      :style="`bottom: ${index * 60}px`"
    >
      <span v-html="snackbar.text">\{{ index }}</span>
      <template v-slot:action="{ attrs }">
        <v-btn dark icon v-bind="attrs" @click="snackbar.show = false">
          <v-icon>fa-times</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </section>
</template>

<script>
import { get } from 'vuex-pathify'

export default {
  name: 'AppSnackbar',
  computed: {
    snackbars: get('notify/create/snackbar')
  }
}
</script>
