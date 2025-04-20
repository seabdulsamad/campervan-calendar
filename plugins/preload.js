import Vue from "vue";
import VueLodash from "vue-lodash";
import lodash from "lodash";

import numeral from "numeral";
import numFormat from "vue-filter-number-format";

Vue.use(VueLodash, { name: "$_", lodash });
Vue.filter("numFormat", numFormat(numeral));
