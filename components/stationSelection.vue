<template>
  <v-autocomplete
    v-model="selection"
    v-bind="$attrs"
    :items="items"
    item-text="name"
    item-value="id"
    :search-input.sync="search"
    :loading="loading"
    @input="$emit('input', selection)"
  ></v-autocomplete>
</template>
<script>
import * as _ from 'lodash'
export default {
  name: 'StationSelection',
  data: () => ({
    items: [],
    loading: false,
    search: null,
    selection: null,
  }),
  watch: {
    search() {
      if (this.search && !this.selection) {
        this.searchStations(this.search)
      }
    },
  },
  methods: {
    searchStations: _.debounce(function (val) {
      if (val && val.length > 2) {
        this.loading = true
        this.$axios
          .get(`stations/?name=${val}`)
          .then((response) => {
            this.items = response.data
          })
          .finally(() => {
            this.loading = false
          })
      }else{
        this.items = [];
      }
    }, 1000),
  },
}
</script>
