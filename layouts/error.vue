<template>
  <v-layout
    row
    align-content-center
    class="text-center"
    :style="{ height: '85vh' }"
  >
    <v-flex>
      <v-img
        :src="`images/error/${error.statusCode}.svg`"
        aspect-ratio="6.5"
        contain
      />
      <h2 class="mt-8">Opps!!!</h2>
      <p>{{ error.message || defaultMessage }}</p>
      <v-btn color="primary" depressed @click="$router.go(-1)"> Go back </v-btn>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  name: 'ErrorPage',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data: () => ({
    defaultMessage: 'An unexpected error has occurred.',
  }),
  head() {
    const title = this.error ? this.error.message : this.defaultMessage
    return { title }
  },
}
</script>
