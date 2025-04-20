import Vue from "vue";
export default ({ app }) => {
  const fullDate = "DD MMM YYYY";
  const fullDateTime = "DD MMM YYYY [at] hh:mm a";
  const dateTime = "DD MMM [at] hh:mm a";

  Vue.filter("dateRange", (fromDate, toDate, isShortForm) => {
    let yearOption = isShortForm ? "" : " YYYY";
    if (toDate == null) {
      return fromDate
        ? app
            .$moment(fromDate)
            .format("DD MMM" + yearOption)
            .toString()
        : null;
    } else if (fromDate != null) {
      if (
        app.$moment(fromDate).format("MM") !=
          app.$moment(toDate).format("MM") &&
        app.$moment(fromDate).format("YYYY") ==
          app.$moment(toDate).format("YYYY")
      ) {
        return (
          app.$moment(fromDate).format("DD MMM") +
          " - " +
          app.$moment(toDate).format("DD MMM" + yearOption)
        );
      } else if (
        app.$moment(fromDate).format("DD MMM") ===
        app.$moment(toDate).format("DD MMM")
      ) {
        return app.$moment(fromDate).format("DD MMM" + yearOption);
      } else if (
        app.$moment(fromDate).format("MMM YYYY") ===
        app.$moment(toDate).format("MMM YYYY")
      ) {
        return (
          app.$moment(fromDate).format("DD[-]") +
          app.$moment(toDate).format("DD ") +
          app.$moment(fromDate).format("MMM" + yearOption)
        );
      } else {
        return (
          app.$moment(fromDate).format("DD MMM" + yearOption) +
          " - " +
          app.$moment(toDate).format("DD MMM" + yearOption)
        );
      }
    } else {
      return "-";
    }
  });

  // Default format : DD MMM YYYY
  Vue.filter("fullDate", (date) => {
    return date ? app.$moment(date).format(fullDate) : "";
  });

  // Default format : DD MMM YYYY [at] hh:mm a
  Vue.filter("fullDateTime", (date) => {
    return date ? app.$moment.utc(date).local().format(fullDateTime) : "";
  });

  // Default format : DD MMM [at] hh:mm a
  Vue.filter("dateTime", (date) => {
    return date ? app.$moment.utc(date).local().format(dateTime) : "";
  });

  // Default format : hh:mm a
  Vue.filter("time", (date) => {
    return date ? app.$moment.utc(date).local().format("hh:mm a") : "";
  });

  Vue.filter("fromNow", (val) => {
    if (app.$moment(val).isValid()) {
      app.$moment.updateLocale("en", {
        calendar: {
          sameDay: `[${app.$moment.utc(val).fromNow()}]`,
          nextDay: "DD/MM/YYYY [at] hh:mm a",
          nextWeek: "DD/MM/YYYY [at] hh:mm a",
          lastDay: `[Yesterday at ${app.$moment
            .utc(val)
            .local()
            .format("hh:mm a")}]`,
          lastWeek: "DD/MM/YYYY [at] hh:mm a",
          sameElse: "DD/MM/YYYY [at] hh:mm a",
        },
      });
      return app.$moment(val).calendar();
    }
  });

  Vue.filter("fromNowTime", (val) => {
    app.$moment.updateLocale("en", {
      calendar: {
        sameDay: `[${app.$moment.utc(val).fromNow()}]`,
        lastDay: `[Yesterday at ${app.$moment
          .utc(val)
          .local()
          .format("hh:mm A")}]`,
        lastWeek: "hh:mm A",
        sameElse: "hh:mm A",
      },
    });
    return app.$moment(val).calendar();
  });

  Vue.filter("dateDiff", (fromDate, toDate) => {
    const from = fromDate ? app.$moment(fromDate) : app.$moment(new Date());
    const to = toDate ? app.$moment(toDate) : app.$moment(new Date());
    const duration = app.$moment.duration(from.diff(to));
    const parts = [];
    const years = duration.years();
    const months = duration.months();
    const days = duration.days();
    if (years > 0) {
      parts.push(`${years} ${years === 1 ? "year" : "years"}`);
    }
    if (months > 0) {
      parts.push(`${months} ${months === 1 ? "month" : "months"}`);
    }
    if (days > 0) {
      parts.push(`${days} ${days === 1 ? "day" : "days"}`);
    }
    return parts.join(" ");
  });

  Vue.filter("transformToCurrentYearDate", (val) => {
    const currentYear = app.$moment().year();
    return app.$moment(val).year(currentYear).toISOString();
  });
};
