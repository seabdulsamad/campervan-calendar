<template>
  <v-layout row wrap>
    <v-flex sm12>
      <v-img
        src="https://roadsurfer.com/wp-content/uploads/rv-and-women-parked-next-to-the-ocean-us.jpg.webp"
        :height="400"
        aspect-ratio="1.33"
      >
        <v-container class="full-height">
          <v-layout row wrap class="full-height" align-center>
            <v-flex sm4>
              <v-card outlined class="pa-4">
                <v-card-title>
                  <h2 class="pb-3">Station Bookings</h2>
                </v-card-title>
                <v-card-text>
                  <station-selection
                    v-model="station"
                    outlined
                    label="Station"
                    placeholder="Please choose"
                    persistent-placeholder
                    clearable
                    hint="Type at least 3 characters to search"
                    persistent-hint
                    return-object
                  />
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-img>
    </v-flex>
    <v-container>
      <v-layout row wrap>
        <v-flex sm12>
          <v-card outlined>
            <v-card-text>
              <v-layout row wrap align-center>
                <v-flex shrink>
                  <v-btn icon class="ma-2" @click="$refs.calendar.prev()">
                    <v-icon>mdi-chevron-left</v-icon>
                  </v-btn>
                  {{ label }}
                  <v-btn icon class="ma-2" @click="$refs.calendar.next()">
                    <v-icon>mdi-chevron-right</v-icon>
                  </v-btn>
                </v-flex>
                <v-flex v-if="station && _.size(station.bookings)">
                  We have found {{ _.size(station.bookings) }}
                  {{ _.size(station.bookings) > 1 ? "bookings" : "booking" }} on
                  the specified station
                </v-flex>
                <v-spacer />
                <v-flex shrink>
                  <v-btn-toggle v-model="viewType" mandatory>
                    <v-btn value="week">Week</v-btn>
                    <v-btn value="day">Day</v-btn>
                  </v-btn-toggle>
                </v-flex>
              </v-layout>
              <v-calendar
                ref="calendar"
                v-model="currentDate"
                color="primary"
                :events="station ? station.bookings : []"
                :type="viewType"
                event-overlap-mode="stack"
                @change="onCalendarChange"
                @click:event="($event) => (bookingId = $event.event.id)"
                @click:date="($event) => (viewType = 'day')"
              >
              </v-calendar>
            </v-card-text>
          </v-card>
        </v-flex>
        <booking-details
          v-if="bookingId"
          :booking-id="bookingId"
          @onClose="bookingId = null"
        />
      </v-layout>
    </v-container>
  </v-layout>
</template>
<script>
export default {
  name: "IndexPage",
  data: () => ({
    station: null,
    stationId: null,
    viewType: "week",
    currentDate: new Date().toISOString().substr(0, 10),
    bookings: [],
    label: null,
    bookingId: null,
  }),
  created() {
    this.viewType = this.$vuetify.breakpoint.smAndDown ? "day" : "week";
  },
  methods: {
    onCalendarChange(event) {
      this.label =
        event.start.date === event.end.date
          ? this.$moment(event.start.date).format("LL")
          : this.$moment(event.start.date).format("LL") +
            " - " +
            this.$moment(event.end.date).format("LL");
    },
    fetchBookings(stationId) {
      if (stationId) {
        this.$axios.get(`/stations/${stationId}`).then((response) => {
          this.bookings = _.map(response.data.bookings, (item) => {
            return {
              ...item,
              name: `Booking #${item.id} - ${
                item.customerName
              } - ${this.$moment(
                this.$options.filters.transformToCurrentYearDate(item.startDate)
              ).format("hh:mm A")}`,
              start: new Date(
                this.$options.filters.transformToCurrentYearDate(item.startDate)
              ),
              end: new Date(
                this.$options.filters.transformToCurrentYearDate(item.endDate)
              ),
              timed: false,
              startDate: new Date(
                this.$options.filters.transformToCurrentYearDate(item.startDate)
              ),
              endDate: new Date(
                this.$options.filters.transformToCurrentYearDate(item.endDate)
              ),
            };
          });
        });
      } else {
        this.bookings = [];
      }
    },
  },
  watch: {
    station() {
      if (this.station) {
        this.$auth.$storage.setState("currentStation", {
          id: this.station.id,
          name: this.station.name,
        });
        _.map(this.station.bookings, (item) => {
          item.name = `Booking #${item.id} - ${
            item.customerName
          } - ${this.$moment(
            this.$options.filters.transformToCurrentYearDate(item.startDate)
          ).format("hh:mm A")}`;

          item.startDate = this.$options.filters.transformToCurrentYearDate(
            item.startDate
          );

          item.endDate = this.$options.filters.transformToCurrentYearDate(
            item.endDate
          );

          item.start = this.$moment(new Date(item.startDate)).format(
            "YYYY-MM-DD HH:mm"
          );
          item.end = this.$moment(new Date(item.endDate)).format(
            "YYYY-MM-DD HH:mm"
          );
          item.timed = false;
        });
      } else {
        this.$auth.$storage.setState("currentStation", null);
      }
    },
  },
};
</script>
