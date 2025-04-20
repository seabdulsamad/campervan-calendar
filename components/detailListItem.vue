<template>
  <v-list-item>
    <v-list-item-content>
      <v-list-item-subtitle class="overline">
        {{ label }}
      </v-list-item-subtitle>
      <v-list-item-title class="pt-2">
        <slot></slot>
      </v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>
<script>
export default {
  name: "DetailListItem",
  props: {
    label: { type: String, required: true },
  },
};
</script>
