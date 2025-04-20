<template>
  <v-app :style="{ background: $vuetify.theme.themes['light'].background }">
    <v-app-bar dark fixed app color="primary">
      <img
        src="https://roadsurfer.com/wp-content/themes/roadsurfer/_/img/logo/logo.svg"
        height="30"
        alt="Roadsurfer"
      />
    </v-app-bar>
    <v-main>
      <v-container fluid grid-list-lg class="pa-0">
        <v-layout row wrap>
          <v-flex sm12>
            <Nuxt />
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
export default {
  name: "DefaultLayout",
};
</script>
