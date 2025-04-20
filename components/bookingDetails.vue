<template>
  <v-navigation-drawer v-model="drawer" right temporary app :width="500">
    <template v-if="booking">
      <v-app-bar dark color="primary"> Booking #{{ booking.id }}</v-app-bar>
      <v-flex sm12>
        <detail-list-item label="Order Number">
          {{ booking.id }}
        </detail-list-item>
        <v-divider />
        <detail-list-item label="Customer Name">
          {{ booking.customerName }}
        </detail-list-item>
        <v-divider />
        <detail-list-item label="Duration">
          {{ booking.end | dateDiff(booking.start) }}
        </detail-list-item>
        <v-divider />
        <v-layout row wrap>
          <v-flex sm6>
            <detail-list-item label="Start Date">
              {{ booking.start | fullDateTime }}
            </detail-list-item>
          </v-flex>
          <v-flex sm6>
            <detail-list-item label="End Date">
              {{ booking.end | fullDateTime }}
            </detail-list-item>
          </v-flex>
        </v-layout>
        <v-divider />
        <detail-list-item v-if="station" label="Pickup-Return Station">
          {{ station.name }}
        </detail-list-item>
      </v-flex>
    </template>
    <v-flex v-else-if="loading">
      <v-progress-circular indeterminate />
    </v-flex>
    <v-flex v-else> Booking bookings not available. </v-flex>
  </v-navigation-drawer>
</template>
<script>
export default {
  name: "BookingDetails",
  props: {
    bookingId: { type: String, required: true },
  },
  data: () => ({
    loading: false,
    drawer: false,
    booking: null,
  }),
  computed: {
    station() {
      return this.$auth.$storage.getState("currentStation");
    },
  },
  methods: {
    fetchBookingInfo() {
      this.loading = true;
      this.$axios
        .get(`/stations/${this.station.id}/bookings/${this.bookingId}`)
        .then((response) => {
          this.loading = false;
          this.booking = response.data;
          if (this.booking.startDate) {
            this.booking.startDate =
              this.$options.filters.transformToCurrentYearDate(
                this.booking.startDate
              );
            this.booking.start = this.$moment(
              new Date(this.booking.startDate)
            ).format("YYYY-MM-DD HH:mm");
          }
          if (this.booking.endDate) {
            this.booking.endDate =
              this.$options.filters.transformToCurrentYearDate(
                this.booking.endDate
              );

            this.booking.end = this.$moment(
              new Date(this.booking.endDate)
            ).format("YYYY-MM-DD HH:mm");
          }
        });
    },
  },
  watch: {
    drawer() {
      if (!this.drawer) this.$emit("onClose");
    },
    bookingId: {
      immediate: true,
      handler() {
        if (this.bookingId) {
          this.drawer = true;
          this.fetchBookingInfo();
        }
      },
    },
  },
};
</script>
